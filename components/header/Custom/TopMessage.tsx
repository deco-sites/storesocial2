import { useId } from "../../../sdk/useId.ts";
import type { Props as PropsTopMessage } from "../../../components/header/Header.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Top Bar Message - Mensagem Destaque
   * @description Mensagem destacada do topbar
   * @default "Oferta relâmpago"
   */
  HighlightMessage?: string;

  /**
   * @title Top Bar Message - Mensagem Destaque (Cor)
   * @description Cor da mensagem destacada do topbar
   * @default #FFCD00
   */
  HighlightMessageColor?: string;
  /**
   * @title Top Bar Message - Mensagem Padrão
   * @description Mensagem padrão sem formatação do topbar
   * @default "Compre 2 NotMilk e leve 3"
   */
  HighlightMessage2?: string;

  /**
   * @title Top Bar Message - Ícone
   * @description ícone do topbar
   */
  icon: ImageWidget;
}

function TopMessage({
  topMessage,
}: PropsTopMessage) {
  const id = useId();
  return (
    <div id={id} class="border-b-2 border-white border-solid full-phone:border-none Topbar-cy" >
      <div class="w-full bg-black flex ">
        <div className="item-msg flex justify-center w-full py-[10px] gap-2.5 items-center full-phone:px-[15px] full-phone:gap-0">
          {
            topMessage.icon &&
            (<img class="w-[9px] h-[14px] full-phone:mr-[5px] Topbar-icon-cy" src={topMessage?.icon} />)
          }
          <div class="text-bigger leading-6 font-bold font-afacad uppercase full-phone:mr-[10px] Topbar-mensagem-1-cy" style={{ color: topMessage?.HighlightMessageColor }}>
            {topMessage?.HighlightMessage}
          </div>
          <div class="text-bigger leading-[22px] text-white font-bold font-afacad full-phone:text-big Topbar-mensagem-2-cy">
            {topMessage?.HighlightMessage2}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMessage;
