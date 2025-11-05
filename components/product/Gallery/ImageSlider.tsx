import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import SliderJS from "../../../islands/SliderJS.tsx";
import { useId } from "../../../sdk/useId.ts";
import { useSignal } from "@preact/signals";


export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout,
  } = props;

  const brandName = props.page.product.brand.name;
  const brandColor = useSignal('');
  if (brandName === "NotMilk") {
    brandColor.value = "#00B4FF"
  }
  if (brandName === "NotMilk High Protein" || brandName === "NotMayo") {
    brandColor.value = "#FF0091"
  }
  if (brandName === "NotCreme") {
    brandColor.value = "#FF8C00"
  }
  const { width, height } = layout || { width: 500, height: 500 };


  return (
    <div id={id} class="flex-col flex  basis-[500px] max-w-[500px] items-center full-phone:max-w-full full-phone:basis-full cs-all-tablet:max-w-[340px]">
      {/* Image Slider */}
      <div class="relative order-1 max-w-[500px]">
        <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw] max-w-[500px] cs-all-tablet:w-full">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full justify-center item-img-slider relative"
            >
              <div class="absolute z-20 top-2 left-2 text-[14px] leading-4 px-2 py-0.5 bg-gray-18 rounded-[16px]">
              {index + 1} / {images.length}
              </div>
              <Image
                class="w-full max-w-[500px] max-h-[500px] border border-solid border-gray-14 rounded-[5px] full-phone:border-none z-10"
                sizes="(max-width: 500px)"
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div class="absolute bottom-[0] w-full h-[35%]" style={{ backgroundColor: brandColor }}></div>
            </Slider.Item>
          ))}
        </Slider>

        <div class="absolute top-1/2 w-full flex justify-between max-w-[450px] left-0 right-0 ml-auto mr-auto full-phone:hidden z-20">
          <Slider.PrevButton
            class="bg-gray-17 border-none btn btn-circle hover:bg-gray-17 no-animation disabled:bg-gray-17"
            disabled
          >
            <Icon size={20} id="arrowProdRight" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="bg-gray-17 border-none btn btn-circle hover:bg-gray-17 no-animation disabled:bg-gray-17"
            disabled={images.length < 2}
          >
            <Icon size={20} id="arrowProdLeft" strokeWidth={3} />
          </Slider.NextButton>
        </div>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full hidden">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-1 px-4 sm:px-0  order-2 justify-center full-phone:max-w-full max-w-[500px]">
        {images.map((_, index) => (
          <li class="carousel-item">
          <Slider.Dot index={index}>
              <div class="py-2">
                <div
                    class="w-16 h-[3px] rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(246, 246, 246, 1)] to-[length:var(--dot-progress)] button-slider-dot-child  md-tablet:w-8"
                />
                
              </div>
          </Slider.Dot>
        </li>
        ))}
      </ul>

      <SliderJS rootId={id}  />
    </div>
  );
}
