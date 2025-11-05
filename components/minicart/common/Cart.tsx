import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { useUI } from "../../../sdk/useUI.ts";
import Icon from "../../../components/ui/Icon.tsx";

import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;
  const itemsQuantity = items.length;
  return (
    <div class="flex flex-col items-center overflow-hidden  minicart-content justify-between flex-1">
      {isEmtpy
        ? (
          <div class="flex flex-col items-center mt-[100px]">
            <Icon
              id="emptyCartNotCo"
              size={120}
              strokeWidth={2}
              class="mb-11"
            />
            <span class="text-gray-1 text-larger font-medium leading-7 mb-2.5">
              Sua sacola está vazia
            </span>
            <span class="text-big font-normal leading-5 text-center mb-6 max-w-[320px]">
              Para continuar comprando, navegue pelas categorias e faça uma
              busca por produtos.
            </span>
            <Button
              class="bg-black hover:bg-black text-white font-medium rounded-[50px] py-4 w-48"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            <div class="flex justify-center items-center absolute top-[20px] right-[165px] full-phone:right-[145px] full-phone:top-[20px]">
              <div class="relative">
                <Icon id="ShoppingCartNotCoBlack" size={28} strokeWidth={2} />
                <div class="absolute top-2.5 right-2/4 translate-x-1/2  text-big text-black font-normal leading-none">
                  {itemsQuantity}
                </div>
              </div>
              {itemsQuantity > 1
                ? <div class="pt-[6px] pl-[6px]">itens</div>
                : <div class="pt-[6px] pl-[6px]">item</div>}
            </div>
            {/* Free Shipping Bar */}
            <div class="w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 flex-grow overflow-y-auto flex flex-col gap-[15px] w-full full-phone:mb-12"
            >
              {items.map((item, index) => (
                <li key={index} class={`minicart-cart-item Header-minicart-item-${index + 1}-cy`}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full max-w-[345px] bg-white-1 rounded-tl-[20px] rounded-tr-[20px] mt-[70px] Header-minicart-footer-cy full-phone:mt-5">
              {/* Total */}
              <div class="flex flex-col justify-end  gap-2 items-center right-2/4 pt-[20px] px-[20px] pb-0 m-0 Header-minicart-total-cy">
                <div class="mr-auto">
                  <span class="text-big font-medium leading-[22px]  text-gray-1">
                    Resumo do pedido
                  </span>
                </div>
                <div class="flex justify-between items-center w-full">
                  <span class="text-big font-medium leading-[22px] text-black">
                    Total
                  </span>
                  <span class="text-large font-semibold leading-[27px]">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                <span class="text-small text-center">
                  Taxas e fretes serão calculados no checkout
                </span>
              </div>

              <div class="px-[15px] pt-[10px] pb-[30px]">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="Header-minicart-finalizar-cy bg-blue-1 rounded-[5px] w-full border-none py-[12px] text-white text-big font-semibold hover:bg-blue-1"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem =>
                              Boolean(x)
                            ),
                        },
                      });
                    }}
                  >
                    Finalizar compra
                  </Button>
                </a>
                <Button
                  class="Header-minicart-continuar-comprando-cy bg-[transparent] rounded-[5px] w-full py-[12px] text-gray-1 text-big font-semibold hover:bg-[transparent] border-[2px] border-solid	 border-gray-1 hover:border-gray-1 mt-[15px]"
                  onClick={() => {
                    displayCart.value = false;
                  }}
                >
                  Continuar comprando
                </Button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
