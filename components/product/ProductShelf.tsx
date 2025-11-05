import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";

import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
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

function Dots({ products, interval = 0 }: Props) {
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
      <div class="carousel justify-center col-span-full z-10 row-start-4 w-full full-phone:absolute full-phone:-bottom-11 full-phone:px-4 full-phone:py-0">
        {products?.map((_, index) => (
          <div class="carousel-item item-shelf-prod">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-[15px] full-phone:w-[30px] h-[3px]  group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0)] to-[length:var(--dot-progress)] button-slider-dot-child "
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </div>
        ))}
      </div>
    </>
  );
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  dots,
  interval,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-12 ProductShelf-cy cs-all-tablet:max-w-fit md-tablet:py-[50px] ">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class={clx(
          "",
          layout?.showArrows && "",
          "px-0 cs-min-full-phone:px-8 container flex justify-center relative ShelfWithImageArrowsWrapper full-phone:px-6 cs-min-full-phone:flex-col",
        )}
      >
        <Slider class="carousel carousel-end cs-min-full-phone:gap-[10px] max-w-[1220px] mx-auto my-0 full-phone:gap-[12px] full-phone:justify-start cs-all-tablet:max-w-full">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                `max-h-[373px] carousel-item max-w-56 full-phone:max-w-40 ProductShelf-item-${index + 1}-cy cs-all-tablet:w-[33%] cs-all-tablet:max-w-full`,
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <div class="w-full absolute h-[50px] top-2/4 left-2/4 -translate-x-1/2 flex justify-between max-w-[1340px] ShelfWithImageArrows full-phone:hidden cs-all-tablet:w-[100%]">
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

        {dots && <Dots products={products} interval={interval} />}
        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />

        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
