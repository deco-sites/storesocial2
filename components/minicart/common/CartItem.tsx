import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import QuantitySelector from "../../../components/ui/QuantitySelector.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);
  const discountValue = sale - list;
  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div class="flex px-1.5 py-1.5 gap-2.5 full-phone:px-[20px] full-phone:pt-[15px] full-phone:pb-[15px]">
      <div class="border-solid border-white-1 border rounded-[5px]">
        <Image
          {...image}
          src={image.src.replace("55-55", "255-255")}
          style={{ aspectRatio: "90 / 90" }}
          width={90}
          height={90}
          class="h-full object-contain rounded-[5px]"
        />
      </div>
      <div class="flex flex-col justify-end gap-[7px]">
        <div class="leading-[19px] max-w-[205px] text-base font-medium text-black">
          {name}
        </div>
        <div class="flex items-end gap-[10px]">
          <div>
            <QuantitySelector
              disabled={loading || isGift}
              quantity={quantity}
              onChange={withLoading(async (quantity) => {
                const analyticsItem = itemToAnalyticsItem(index);
                const diff = quantity - item.quantity;

                await onUpdateQuantity(quantity, index);

                if (analyticsItem) {
                  sendEvent({
                    name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                    params: {
                      items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                    },
                  });
                }
              })}
            />
          </div>
          <div>
            <div class="flex">
              {discountValue > 0 && (
                <span class="line-through text-[12px] font-normal leading-[16px] text-gray-2">
                  {formatPrice(list, currency, locale)}
                </span>
              )}
            </div>
            <div class="flex">
              <span class="text-big font-semibold leading-[22px] text-gray-1">
                {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-auto flex items-end">
        <Button
          disabled={loading || isGift}
          loading={loading}
          class="min-h-fit h-auto flex p-0 hover:bg-[transparent] hover:border-[transparent]"
          onClick={withLoading(async () => {
            const analyticsItem = itemToAnalyticsItem(index);

            await onUpdateQuantity(0, index);

            analyticsItem && sendEvent({
              name: "remove_from_cart",
              params: { items: [analyticsItem] },
            });
          })}
        >
          <div class="flex flex-col justify-center items-center">
            <Icon id="TrashNotCo" size={23} />
            <p class="text-tiny text-gray-3 font-normal">Remover</p>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
