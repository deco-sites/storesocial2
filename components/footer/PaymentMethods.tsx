import Icon from "../../components/ui/Icon.tsx";

export interface PaymentItem {
  label:
    | "MastercardNotCo"
    | "DinersNotCo"
    | "VisaNotCo"
    | "AENotCo"
    | "HyperCardNotCo"
    | "EloNotCo"
    | "PixNotCo"
    | "BoletoNotCo";
  width: string;
  height: string;
}

export default function PaymentMethods(
  { content }: {
    content?: {
      title?: string;
      items?: PaymentItem[];
      height?: string;
      width?: string;
    };
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && <h3 class="text-lg">{content.title}</h3>}
          <ul class="flex items-center gap-8 flex-wrap full-phone:gap-2 full-phone:mb-8 cs-all-tablet:gap-4">
            {content.items.map((item, index) => {
              return (
                <li
                  title={item.label}
                  class="item-payment-icon"
                >
                  <Icon
                    class={`Footer-PaymentItem-${index + 1}-cy`}
                    width={item.width}
                    height={item.height}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
