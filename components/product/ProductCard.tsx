import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import Icon from "../ui/Icon.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const newUrl = new URL(url);
  const clusterFlagValue = product?.additionalProperty?.find(item =>
    item.name === "cluster"
    && item.description === "highlight"
  )?.value;
  newUrl.searchParams.delete("skuId");
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const relativeUrl = relative(url);
  var discountValue = listPrice - price;
  const skuSelector = variants.map(([value, link]) => {
  const relativeLink = relative(link);

    return (
      <li class="ProductCardSearchShelf">
        <a href={relativeLink}>
          <Avatar
            variant={relativeLink === relativeUrl
              ? "active"
              : relativeLink
              ? "default"
              : "disabled"}
            content={value}
          />
        </a>
      </li>
    );
  });
  const cta = (
    <a
      href={newUrl && relative(newUrl)}
      aria-label="view product"
      class="btn-cta-shelf gap-2"
    >
      <Icon size={22} id="CartWhite" strokeWidth={2} />
      {l?.basics?.ctaText || "Comprar"}
    </a>
  );
  return (
    <div
      id={id}
      class={`card card-compact group w-full card-item-shelf text-start full-phone:gap-2.5`}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure class="relative overflow-hidden px-1.5 full-phone:flex-1 full-phone:p-0">
        {/* Wishlist button */}

        <div
          class={`absolute top-2 z-10 flex items-center
            ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
            
          `}
        >
          {/* Discount % */}
          {!l?.hide?.discount ||
            discountValue > 0 && (
                <div class="text-sm bg-base-100 p-[10px]">
                  <span class="text-base-content font-bold">
                    {listPrice && price
                      ? `${
                        Math.round(((listPrice - price) / listPrice) * 100)
                      }% `
                      : ""}
                  </span>
                  OFF
                </div>
              )}
        </div>

        {/* Product Images */}
        <a
          href={newUrl && relative(newUrl)}
          aria-label="view product"
          class=" w-full full-phone:flex full-phone:justify-center full-phone:items-center"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`ProductShelf-item-${index + 1}-image-cy rounded w-full  full-phone:h-[140px] full-phone:w-auto cs-all-tablet:max-h-[208px] cs-all-tablet:w-auto cs-all-tablet:mx-[auto] cs-all-tablet:my-[0] ${l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125 "
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {clusterFlagValue && (
            <span class="absolute uppercase top-2 left-6 px-[10px] py-[9px] rounded-s-lg -rotate-90 font-arial font-bold -tracking-tighter text-[11px] text-white bg-blue">
              {clusterFlagValue}
            </span>
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col px-1.5 py-1.5 full-phone:p-0 full-phone:flex-1 full-phone:gap-3">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector
              ? (
                ""
              )
              : (
                <ul>
                  {skuSelector}
                </ul>
              )}
          </>
        )}

        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-0 px-2.5 mb-2.5 full-phone:mb-0 full-phone:h-12">
              {l?.hide?.productName
                ? (
                  ""
                )
                : (
                  <h2
                    class={`text-big leading-[16px] font-medium text-black-1 font-afacad h-[50px] full-phone:h-auto ProductShelf-item-${index + 1}-name-cy product-shelf-item-title` }
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
            </div>
          )}
        {l?.hide?.allPrices
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-2 mb-[25px] full-phone:mb-0">
              <div
                class={`flex gap-0 items-center px-2.5 justify-start full-phone:flex-col full-phone:items-start full-phone:relative`}
              >
                {listPrice === price
                  ? (
                    ""
                  ) : (
                    <div class={`line-through text-[13px] text-gray-5 flex h-[24px] items-center leading-none mr-[10px] ProductShelf-item-${index + 1}-oldPrice-cy`}>
                      {formatPrice(listPrice, offers?.priceCurrency)}
                    </div>
                  )}
                <div class="line-through text-[13px] text-gray-5 flex h-[24px] items-center leading-none mr-[10px]">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
                <div class="text-black-1 text-large font-bold font-josefin flex h-[24px] items-center leading-none pt-[2px] cs-all-sm-tablet:text-big relative">
                  {formatPrice(price, offers?.priceCurrency)}
                  <div class="flex h-[24px] text-small items-center leading-none relative">
                    <div class={`bg-blue-1 p-0 rounded font-medium text-white my-0 ml-1.5 mr-0 px-1 py-1 ProductShelf-item-${index + 1}-desconto-cy absolute -right-10`}>
                      {listPrice && price
                        ? `- ${
                          Math.round(((listPrice - price) / listPrice) * 100)
                        }% `
                        : ""}
                    </div>
                  </div>
                </div>
                {listPrice === price
                  ? (
                    ""
                  ) : (
                    <div class="flex h-[24px] text-small items-center leading-none relative">
                    <div class={`bg-blue-1 p-0 rounded font-medium text-white my-0 ml-1.5 mr-0 px-1 py-1 ProductShelf-item-${index + 1}-desconto-cy absolute -right-10`}>
                      {listPrice && price
                        ? `- ${Math.round(((listPrice - price) / listPrice) * 100)}% `
                        : ""}
                    </div>
                  </div>
                  )
                }
              </div>
            </div>
          )}
        {!l?.hide?.cta
          ? (
            <div
              class={`flex items-end bg-black text-white rounded-[4px] full-phone:mt-0 full-phone:mb-2.5 full-phone:mx-2.5 full-phone:block ProductShelf-item-${index + 1}-cta-cy`}
            >
              {cta}
            </div>
          )
          : (
            ""
          )}
      </div>
    </div>
  );
}

export default ProductCard;
