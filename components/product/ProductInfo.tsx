import { SendEventOnView } from "../../components/Analytics.tsx";
import AddToCartButtonPDP from "../../islands/AddToCartButton/vtexPDP.tsx"
import { useSignal } from "@preact/signals";

import OutOfStock from "../../islands/OutOfStock.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
    isKit: boolean
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability
  } = useOffer(offers);
  const brandName = product.brand.name;
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
  const similarsList = product.isSimilarTo;
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });
  const fullName = isVariantOf?.name
  const isKit = fullName.includes('Kit')
  return (
    <div class="flex flex-col px-4 cs-all-tablet:max-w-[340px] cs-all-tablet:p-0" id={id}>
      {/* Code and name */}
      <div class="flex flex-col gap-5 full-phone:gap-0 cs-all-tablet:gap-3">
        <div>
          {gtin && <span class="text-base font-normal text-gray-13 full-phone:hidden cs-all-tablet:text-[#ABABAB]">EAN: {gtin}</span>}
        </div>
        <h1>
          <span class="text-larger font-medium leading-7 text-black-1 full-phone:text-large full-phone:leading-[26px] cs-all-tablet:text-bigger">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
          </span>
        </h1>

      </div>
      <div class="max-w-[350px] full-phone:max-w-[320px]">
        {
          similarsList.length > 0 && (
            <div class="font-normal text-big leading-[21px] text-black-1 mb-2.5 mt-5 cs-all-tablet:mt-3">
              Opções de sabores:
            </div>
          )
        }
        <div class={similarsList.length > 5 ? "similars-list pb-4 flex gap-[5px] overflow-x-scroll scroll-snap snap-x snap-mandatory" : "flex gap-[5px] cs-all-tablet:overflow-x-scroll"}>
          {similarsList?.map((item, index: number) => {
            return (
              <div class={`item-similar item-similar-${index}-cy max-w-[66px] pt-1.5 w-full border rounded-[3px] border-gray-16 border-solid snap-center min-w-[66px]`} >
                <div class=" item-similar-inner hidden absolute bottom-[0] w-full h-[65%] rounded-tr-[8px] rounded-tl-[8px] rounded-bl-[5px] rounded-br-[5px]" style={{ backgroundColor: brandColor }}></div>
                <a class="flex flex-col items-center z-10 relative" href={item.isVariantOf.url}>
                  <img class=" w-full" src={item.isVariantOf.hasVariant[0].image[0].url} alt="" srcset="" />
                  <div class="text-[13px] font-normal text-gray-2 leading-[10px] text-center py-2.5">
                    {item.isVariantOf.additionalProperty.find(subitem => subitem.name === "Sabor")?.value}
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Prices */}
      <div class={isKit ? "mt-4" : "mt-24 full-phone:mt-[95px]"}>
        <div class="flex flex-row gap-2 items-center mb-2 full-phone:flex-col full-phone:relative full-phone:items-start full-phone:gap-0">
          {/* código comentado somente para validação do QA */}
          {/* {(listPrice ?? 0) > price && (
            <span class="line-through text-black-1">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )} */}
          <span class="line-through text-base font-normal text-gray-2">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
          <span class="font-bold text-[26px] text-black-1 leading-8">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {availability === "https://schema.org/InStock" &&(
            <span class="text-base font-medium leading-[18px] text-white p-1 bg-blue-1 rounded-[3px] full-phone:absolute full-phone:left-[40%] full-phone:bottom-1">
              {listPrice && price
                ? `- ${Math.round(((listPrice - price) / listPrice) * 100)
                }% `
                : ""
              }
            </span>
          )}

        </div>
        
        {availability === "https://schema.org/InStock"
          ? (
            <div class="flex flex-col gap-1.5">
              <span class="flex items-center gap-1 text-blue-1 text-base font-medium">
                <Icon size={16} id="boletoIcon" strokeWidth={2} />
                No boleto à vista (5% off)
              </span>
              <span class="text-small font-medium leading-3 text-left text-black-1">
                {installments}
              </span>
            </div>
          )
          :
          ("")
        }
      </div>

      {/* Add to Cart button */}
      <div class={availability === "https://schema.org/InStock" ? "pt-10 flex relative cs-all-tablet:pt-3" : "pt-10 flex relative cs-all-tablet:pt-3 justify-center"}>
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonPDP
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                    isKit={isKit}
                  />
                </>
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
