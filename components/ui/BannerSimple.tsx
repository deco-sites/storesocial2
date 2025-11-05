import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
    /** @description desktop otimized image */
    desktop: ImageWidget;
    /** @description mobile otimized image */
    mobile: ImageWidget;
    /** @description Image's alt text */
    alt: string;
    action?: {
      /** @description when user clicks on the image, go to this link */
      href: string;
      /** @description Button label */
      label: string;
    };
  }
  
  export interface Props {
    images?: Banner[];
    /**
     * @description Check this option when this banner is the biggest image on the screen for image optimizations
     */
    preload?: boolean;
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /**
     * @title Show dots
     * @description show dots to navigate through the images
     */
    dots?: boolean;
    /**
     * @title Autoplay interval
     * @description time (in seconds) to start the carousel autoplay
     */
    interval?: number;
  }
  
  const DEFAULT_PROPS = {
    images: [
      {
        alt: "/feminino",
        action: {
          
          label: "Compre agora",
          href: "/",
        },
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
      }
    ],
    preload: true,
  };
  
  function BannerItem(
    { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
  ) {
    const {
      alt,
      mobile,
      desktop,
      action,
    } = image;
  
    return ( 
      <a
        id={id}
        href={action?.href ?? "#"}
        aria-label={action?.label}
        class="relative overflow-y-hidden w-full full-phone:rounded-[5px]"
      >
        <div class="bottom-10 full-phone:-bottom-2.5 m-0 absolute left-2/4 -translate-x-1/2 -translate-y-1/2 cs-all-tablet:bottom-0">
          <Button class="text-big text-black font-normal leading-5 text-center bg-white rounded-[5px] shadow-simpleBanner px-11 py-2.5 uppercase full-phone:px-7 full-phone:py-4" aria-label={action?.label} >
              {action?.label}
          </Button>
        </div>
        <Picture preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={430}
            height={590}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={1440}
            height={612}
          />
          <img
            class="object-cover w-full h-full cs-min-full-phone:max-h-[612px] "
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
         
        </Picture>
      </a>
    );
  }
  
  function Dots({ images, interval = 0 }: Props) {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
          }}
        />
        <ul class="carousel justify-center col-span-full gap-6 z-10 row-start-4">
          
          {
           
          images?.map((_, index) => (
            images.length > 1 && (
              <li class="carousel-item">
                <Slider.Dot index={index}>
                    <div class="py-5">
                      <div
                          class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)] button-slider-dot-child"
                          style={{ animationDuration: `${interval}s` }}
                      />
                    </div>
                </Slider.Dot>
              </li>
            )
          ))}
        </ul>
      </>
    );
  }
  
  function Buttons() {
    return (
      <div class="flex w-full justify-between absolute left-[5%] right-[5%] cs-all-tablet:max-w-[967px] cs-all-tablet:left-0 cs-all-tablet:right-0 top-[40%] max-w-[1240px] mx-[auto] my-[0] full-phone:hidden">
        <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
          <Slider.PrevButton >
            <Icon
              size={40}
              id="ChevronLeftNotCo"
              strokeWidth={3}
            />
          </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
          <Slider.NextButton>
            <Icon
              size={40}
              id="ChevronRightNotCo"
              strokeWidth={3}
            />
          </Slider.NextButton>
        </div>
      </div>
    );
  }
  
  function BannerSimple(props: Props) {
    const id = useId();
    const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };
    return (
      <div
        id={id}
        class="cs-min-full-phone:max-h-[612px] full-tablet:min-h-min relative flex flex-col items-center cs-min-full-phone:pb-12 full-phone:mt-10 full-phone:px-2.5 cs-all-tablet:px-5"
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 max-w-[1340px] BannerSimple-cy">
          {images?.map((image, index) => {
            const params = { promotion_name: image.alt };
            return (
              <Slider.Item index={index} class={`carousel-item w-full BannerSimple-item-${index + 1}-cy`}>
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            );
          })}
        </Slider>
  
        {props.arrows && <Buttons />}
  
        {props.dots && <Dots images={images} interval={interval} />}
  
        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
  );
}


export default BannerSimple;
