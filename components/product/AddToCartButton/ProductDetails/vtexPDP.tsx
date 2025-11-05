import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./commonPDP.tsx";
import { useSignal } from "@preact/signals";
import Icon from "../../../ui/Icon.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  isKit: boolean;
}

function AddToCartButtonPDP({ seller, productID, eventParams, isKit }: Props) {
  
  const quantity: any = useSignal(1);
  const unitySelected = useSignal(true);
  const kitSelected = useSignal(false);

  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: quantity
      }],
    });

  return (
    <>
      {!isKit &&(
        <div class="absolute -top-[10rem] full-phone:-top-44 flex flex-col gap-[5px]">
          <div class="text-big text-black-1 font-normal">
            Quantidade
          </div>
          <div class="flex gap-2">
            <button class={`${unitySelected.value === true ? "bg-blue-2 text-white border !border-blue-2 border-solid " : " "} flex items-center gap-2 px-2.5 py-2 border-[1px] border-solid border-gray-2 rounded-[5px] text-gray-2 text-base`} onClick={() => {quantity.value =  1; kitSelected.value = false; unitySelected.value = true } }>
              Unidade
            </button>
            <button class={`${kitSelected.value === true ? "bg-blue-2 text-white border !border-blue-2 border-solid " : " "}flex items-center gap-2 px-2.5 py-2 border-[1px] border-solid border-gray-2 rounded-[5px] text-gray-2 text-base`} onClick={() =>  {quantity.value = 6; kitSelected.value = true; unitySelected.value = false}}>
              <Icon size={14} id={kitSelected.value === true? "boxNotCoWhite" : "boxNotCo"} strokeWidth={2} /> Caixa com 6
            </button>
          </div>
        </div>
      )}
      
      <div class="w-full max-w-[169px] flex items-center justify-center border rounded-tl-[5px] rounded-bl-[5px] rounded-tr-none rounded-br-none">
        <div class="flex items-center justify-between">
          <button class="px-5" onClick={() => quantity.value > 1 ? quantity.value = quantity.value - 1 : null}>
            <Icon size={18} id="MinusSignNotCoBlack" strokeWidth={2} />
          </button>
            <input type="number" class=" pointer-events-none text-[20px] font-bold text-black max-w-14 text-center" value={quantity.value} />
          <button class="px-5" onClick={() => quantity.value = quantity.value + 1 }>
            <Icon size={18} id="PlusSignNotCoBlack" strokeWidth={2} />
          </button>
        </div>
      </div>
      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </>
  )
}

export default AddToCartButtonPDP;
