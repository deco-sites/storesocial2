import { invoke } from "../runtime.ts";
import { clx } from "../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const aceiteState = useSignal(false);
  const errorText = useSignal("");
  const successText = useSignal("");
  const regex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const aceite = aceiteState.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const nome = (e.currentTarget.elements.namedItem("nome") as RadioNodeList)
        ?.value;

      if (email !== "" && regex.test(email) && nome !== "" && aceite == true) {
        await invoke.vtex.actions.masterdata.createDocument({
          data: { email, nome, aceite },
          acronym: "NL",
        });
        successText.value = "Inscrito com sucesso!";
        errorText.value = "";
        setTimeout(() => {
          successText.value = "";
        }, 5000);
      } else if (email !== "" && !regex.test(email)) {
        errorText.value = "Digite um e-mail válido";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      } else if (email == "" && nome !== "") {
        errorText.value = "É necessário o preenchimento do campo E-mail";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      } else if (nome == "" && email !== "") {
        errorText.value = "É necessário o preenchimento do campo Nome";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      } else if (nome == "" && email == "") {
        errorText.value = "É necessário o preenchimento dos campos";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      } else if (aceite == false && nome !== "" && email !== "") {
        errorText.value =
          "É necessário aceitar os termos da Política de Privacidade";
        setTimeout(() => {
          errorText.value = "";
        }, 5000);
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "Newsletter-cy flex flex-col gap-4 cs-all-tablet:flex-row cs-all-tablet:w-full cs-all-tablet:justify-evenly cs-all-tablet:gap-[20px]",
        tiled && "lg:flex-row lg:w-full lg:justify-between",
      )}
    >
      <div class="flex flex-col gap-4 Newsletter-header-cy full-phone:px-10 full-phone:gap-0 cs-all-tablet:max-w-44 cs-all-tablet:gap-2">
        {content?.title && (
          <h4
            class={tiled
              ? "text-2xl lg:text-3xl"
              : " text-white uppercase text-larger font-bold leading-[29.33px] text-center cs-all-tablet:text-left cs-all-tablet:leading-[22px]"}
          >
            {content?.title}
          </h4>
        )}
        {content?.description && (
          <div class="text-white text-[17px] font-medium leading-6 text-center cs-all-tablet:text-bigger cs-all-tablet:text-left">
            {content?.description}
          </div>
        )}
      </div>
      <div class="flex flex-col gap-4 cs-all-sm-tablet:w-full cs-all-tablet:flex-1 cs-all-tablet:max-w-[495px]">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 max-w-sm relative cs-all-tablet:max-w-full">
            <input
              name="nome"
              class="Newsletter-input-nome-cy flex-auto md:flex-none input input-bordered md:w-80 text-base-content rounded-[24px] px-10 py-2.5 field-form-nw cs-all-tablet:max-h-[38px] cs-all-tablet:w-full"
              placeholder={"Nome"}
            />
            <input
              name="email"
              class="Newsletter-input-email-cy flex-auto md:flex-none input input-bordered md:w-80 text-base-content rounded-[24px] px-10 py-2.5 field-form-nw cs-all-tablet:max-h-[38px] cs-all-tablet:w-full"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class={`Newsletter-button-submit-cy btn disabled:loading rounded-[24px] bg-black hover:bg-black text-[#fff] text-big font-normal px-7 py-2 h-auto absolute right-0 bottom-0 cs-all-tablet:max-h-[38px] cs-all-tablet:min-h-fit   cs-all-tablet:h-full ${
                aceiteState.value === true ? "avaliable" : "unavaliable"
              }`}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
          {errorText.value !== "" && (
            <p class="Newsletter-message-error-cy text-red-500   text-xs font-afacad text-center  pt-3 font-bold -tracking-tighter">
              {errorText.value}
            </p>
          )}
          {successText.value !== "" && (
            <p class="Newsletter-message-success-cy text-green-700  text-xs font-afacad text-center pt-3 font-bold -tracking-tighter">
              {successText.value}
            </p>
          )}
        </form>
        {content?.form?.helpText && (
          <div class="flex gap-2.5 items-center">
            <div>
              <input
                class="Newsletter-input-aceite-cy"
                type="checkbox"
                name="aceite"
                id="aceite"
                onClick={() => {
                  aceiteState.value = !aceiteState.value;
                }}
              />
            </div>
            <div
              class="Newsletter-message-politica-cy text-base text-white font-normal"
              dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
