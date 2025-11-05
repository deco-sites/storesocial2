import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
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

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const nome = (e.currentTarget.elements.namedItem("nome") as RadioNodeList)
        ?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email, nome });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4",
        tiled && "lg:flex-row lg:w-full lg:justify-between",
      )}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h4
            class={tiled
              ? "text-2xl lg:text-3xl"
              : " text-white uppercase text-larger font-bold leading-[29.33px] text-center"}
          >
            {content?.title}
          </h4>
        )}
        {content?.description && (
          <div class="text-white text-[17px] font-medium leading-6 text-center">
            {content?.description}
          </div>
        )}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 max-w-sm relative">
            <input
              name="nome"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content rounded-[24px] px-10 py-2.5 field-form-nw"
              placeholder={"Nome"} 
            />
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content rounded-[24px] px-10 py-2.5 field-form-nw"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn disabled:loading rounded-[24px] bg-black hover:bg-black text-[#fff] text-big font-normal px-7 py-2 h-auto absolute right-0 bottom-0"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        {content?.form?.helpText && (
          <div class="flex gap-2.5 items-center">
            <div>
              <input type="checkbox" name="checkNw" id="checkNw" />
            </div>
            <div
              class="text-base text-white font-normal"
              dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
