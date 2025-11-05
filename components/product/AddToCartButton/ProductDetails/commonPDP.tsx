import Button from "../../../ui/Button.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { useUI } from "../../../../sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Icon from "../../../ui/Icon.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButtonPDP(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button {...btnProps} class=" -ml-[2px] w-full max-w-[182px] flex gap-2.5 bg-black text-base font-medium text-white leading-[18px] py-2.5 px-4 rounded-[5px] hover:bg-black cs-all-tablet:text-[0px] cs-all-tablet:max-w-[70px] btn-pdp-add-to-cart">
      <Icon size={24} id="CartWhite" strokeWidth={2} /> Adicionar à sacola
    </Button>
  );
}