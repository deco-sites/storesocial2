import { useSignal } from "@preact/signals";
import { invoke } from "../../runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const errorText = useSignal("");
  const successText = useSignal("");
  const regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (name !== "" && email !== "" && regex.test(email)) {
        await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
        successText.value = "E-mail cadastrado com sucesso. Avisaremos quando o produto retornar aos estoques."
        errorText.value = "";
        setTimeout(()=>{
          successText.value = "";
          errorText.value = "";
        }, 5000)
      }
      
      else if (name === "" && !regex.test(email)) {
        errorText.value = "Digite seu nome e um e-mail válido";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
      
      else if (name !== "" && !regex.test(email)) {
        errorText.value = "Digite um e-mail válido";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
      
      else if (name === "" && regex.test(email)) {
        errorText.value = "Digite seu nome";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
      
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2 -mt-10 items-center" onSubmit={handleSubmit}>
      <span class="text-base">Este produto está indisponivel no momento</span>
      <span class="text-sm">Avise-me quando estiver disponivel</span>

      <input placeholder="Nome" class="input input-bordered rounded-[24px]" name="name" />
      <input placeholder="Email" class="input input-bordered rounded-[24px]" name="email" />

      <button class="btn disabled:loading bg-black text-white hover:bg-black  min-h-8 h-8 px-[20px] py-[0] w-auto rounded-[20px] " disabled={loading}>Enviar</button>
      {errorText.value !== "" && (
        <span class="text-red-500 text-xs font-montserrat font-bold -tracking-tighter">
          {errorText.value}
        </span>
      )}
      {successText.value !== "" && (
        <span class="text-green-700 text-xs font-montserrat font-bold -tracking-tighter">
          {successText.value}
        </span>
      )}
    </form>
  );
}

export default Notify;
