import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
}

export interface Props {
  banners: Banner[] | null;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      tablet?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    showArrows?: boolean;
  };
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

function Dots({ banners, interval = 0 }: Props) {
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
      <ul class="carousel justify-center col-span-full z-10 row-start-4 w-full full-phone:absolute full-phone:-bottom-11 full-phone:px-4 full-phone:py-0">
        {banners?.map((_, index) => (
          <li class="carousel-item item-shelf-prod ">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-[15px] full-phone:w-[30px] h-[3px]  group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0)] to-[length:var(--dot-progress)] button-slider-dot-child"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function BannerFeed({
  banners,
  layout,
  interval,
  dots,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!banners || banners.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "cs-min-full-desktop:w-full",
    2: "cs-min-full-desktop:w-1/2",
    3: "cs-min-full-desktop:w-1/3",
    4: "cs-min-full-desktop:w-1/4",
    5: "cs-min-full-desktop:w-1/5",
  };

  const slideTablet = {
    1: "cs-all-tablet:w-full",
    2: "cs-all-tablet:w-1/2",
    3: "cs-all-tablet:w-[350px]",
    4: "cs-all-tablet:w-1/4",
    5: "cs-all-tablet:w-1/5",
  };

  const slideMobile = {
    1: "full-phone:w-full",
    2: "full-phone:w-1/2",
    3: "full-phone:w-1/3",
    4: "full-phone:w-1/4",
    5: "full-phone:w-1/5",
  };
  return (
    <div class="w-full  py-8 flex flex-col gap-6 lg:py-12 BannerFeed-cy">
      <div
        id={id}
        class={clx(
          "",
          layout?.showArrows && "",
          "px-0 md:px-5 flex justify-center relative cs-min-full-phone:flex-col",
        )}
      >
        <Slider class="w-full carousel carousel-end cs-min-full-phone:gap-[20px] full-phone:gap-[12px] md-tablet:flex md-tablet:justify-start">
          {banners?.map((banner, index) => (
            <Slider.Item
              index={index}
              class={clx(
                `carousel-item  BannerFeed-item-${index + 1}-cy`,
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideTablet[layout?.numberOfSliders?.tablet ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
                <Picture class="full-phone:w-full">
                    <Source
                      media="(max-width: 767px)"
                      fetchPriority={"auto"}
                      src={banner.mobile}
                      width={350}
                      height={350}
                    />
                    <Source
                      media="(min-width: 768px)"
                      fetchPriority={"auto"}
                      src={banner.desktop}
                      width={530}
                      height={530}
                    />
                    <img
                      class="object-cover w-full h-full cs-min-full-phone:max-h-[612px] "
                      loading={"lazy"}
                      src={banner.desktop}
                      alt={banner.alt}
                    />
                </Picture>
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <div class="w-full absolute h-[50px] top-[37%] left-2/4 -translate-x-1/2 flex justify-between max-w-[1340px] md-tablet:hidden">
            <div class="block z-10">
              <Slider.PrevButton class="w-12 h-12 flex justify-center items-center">
                <Icon size={30} id="ArrowLeftGray" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="block z-10">
              <Slider.NextButton class="w-12 h-12 flex justify-center items-center">
                <Icon size={30} id="ArrowRightGray" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </div>
        )}
        {dots && <Dots banners={banners} interval={interval} />}
        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </div>
  );
}

export default BannerFeed;
