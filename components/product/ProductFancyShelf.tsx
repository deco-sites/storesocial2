import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductFancyCard, {
  Layout as cardLayout,
} from "../../components/product/ProductFancyCard.tsx";
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
}
function Dots({ products }: Props) {
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
      <div class="carousel justify-center col-span-full z-10 row-start-4 w-full full-phone:absolute full-phone:bottom-0 full-phone:px-4 full-phone:py-0 absolute bottom-[0] mx-[auto] my-[0] left-[0]">
        {products?.map((_, index) => (
          <div class="carousel-item item-shelf-prod">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div class="w-[60px] full-phone:w-[30px] h-[3px]  group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0)] to-[length:var(--dot-progress)] button-slider-dot-child " />
              </div>
            </Slider.Dot>
          </div>
        ))}
      </div>
    </>
  );
}

function ProductFancyShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
  dots
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
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10 relative full-phone:pb-0">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class={clx(
          "grid",
          layout?.showArrows && "grid-cols-[0px_1fr_0px] full-phone:pb-9",
          "px-0 md:px-5 container",
        )}
      >
        <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5 ">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item !w-[375px]",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <ProductFancyCard
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
          <>
            <div class="relative block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center -top-[115px] border border-solid border-black-1 rounded-[5px] translate-x-4">
                <Icon size={18} id="ArrowLeftSquare" strokeWidth={2} class="w-5" />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10 col-start-3 row-start-3 -translate-x-[48px]">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center -top-[115px] border border-solid border-black-1 rounded-[5px] -translate-x-4">
                <Icon size={18} id="ArrowRightSquare" strokeWidth={2} />
              </Slider.NextButton>
            </div>
          </>
        )}
        {dots && <Dots products={products} />}
        <SliderJS rootId={id} />
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

export default ProductFancyShelf;
