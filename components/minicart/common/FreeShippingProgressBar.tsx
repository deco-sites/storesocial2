import { formatPrice } from "../../../sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2 full-phone:px-5 full-phone:mt-5">
      <div class="flex justify-start items-center gap-2 text-black">
        {remaining > 0
          ? (
            <span>
              Faltam {formatPrice(remaining, currency, locale)}{" "}
              para conseguir frete grátis
            </span>
          )
          : <span>Você ganhou frete grátis!</span>}
      </div>
      <progress
        class="progress progress-primary w-full max-w-[335px] bg-gray-4"
        value={percent}
        max={100}
      />
    </div>
  );
}

export default FreeShippingProgressBar;
