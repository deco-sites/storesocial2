import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import Icon from "../components/ui/Icon.tsx";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
    /** @description RegExp para habilitar este banner na URL atual. Use, por exemplo, /feminino/* para exibir este conteúdo na categoria feminina  */
    matcher: string;
    image: {
        /** @description Imagem do banner para telas grandes */
        desktop: ImageWidget;
        /** @description Imagem do banner para telas pequenas */
        mobile: ImageWidget;
        /** @description Alt da Imagem */
        alt?: string;
    };
    /**
    * @title Título conteúdo
    * @description Título da sessão de conteúdo
    */
    titleContent?: string;
    /**
   * @title Cor do título conteúdo
   * @description use padrão HEX. Exepmplo: #00B4FF
   */
    titleContentColor?: string;
    /**
   * @title Subtítulo conteúdo
   * @description Subtítulo da sessão de conteúdo
   */
    subtitleContent?: string;
    /**
    * @title Cor do subtítulo conteúdo
    * @description use padrão HEX. Exepmplo: #00B4FF
    */
    subtitleContentColor?: string;
    /**
     * @title Texto conteúdo
     * @description texto da sessão de conteúdo
    */
    textContent?: string;
    /**
    * @title Ícone conteúdo
    * @description Ícone da sessão de conteúdo
    */
    iconContent?: ImageWidget;
}
const DEFAULT_PROPS = {
    banners: [
        {
            image: {
                mobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
                desktop: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
                alt: "a",
            },
            titleContent: "Woman",
            titleContentColor: "#000",
            subtitleContent: "NOT",
            subtitleContentColor: "#00B4FF",
            textContent: "As",
            matcher: "/*",
            iconContent: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af"
        },
    ],
};
function Banner(props: SectionProps<ReturnType<typeof loader>>) {
    const { banner } = props;
    if (!banner) {
        return null;
    }
    const textCategoryState = useSignal(false);
    const { titleContent, titleContentColor, subtitleContent, subtitleContentColor, textContent, image, iconContent, title, matcher } = banner;
    return (<div class="flex flex-col md-tablet:mt-4">
      <Picture preload class="relative flex justify-center">
        <Source src={image.mobile} width={360} height={120} media="(max-width: 767px)"/>
        <Source src={image.desktop} width={1440} height={200} media="(min-width: 767px)"/>
        <img class="w-full" src={image.desktop} alt={titleContent}/>
        <div class="brand-breadcrumb max-w-[1340px] mx-auto my-0 w-full absolute bottom-4 ml-5">
            <div class="flex items-center max-w-fit gap-[10px] px-[10px] py-[6px] bg-[#00000099] shadow-[0_4px_30px_0px_rgba(0,0,0,0.1)] backdrop-filter backdrop-blur-[0px] rounded-[5px]">
              <div>
                <a class="text-white text-base font-normal leading-[18px]" href="/">
                  Início
                </a>
              </div>
              <div>
                <Icon size={10} id="ChevronRightBreadcrumb" strokeWidth={2}/> 
              </div>
              <div>
                <a class="text-white text-base font-normal leading-[18px]" href={matcher}>
                  {title}
                </a>
              </div>
            </div>
        </div>
      </Picture>

      <div class="flex max-w-[1340px] mx-auto my-0 gap-12 md-tablet:gap-3 justify-center items-start py-10  md-tablet:flex-col px-5 md-tablet:px-0 md-tablet:mx-4 md-tablet:border-b md-tablet:border-solid md-tablet:border-gray-15 md-tablet:pb-5 md-tablet:mb-5">
        {/* Content Mobile/Tablet */}
        <div class="md-tablet:flex cs-min-full-desktop:hidden md-tablet:justify-between full-tablet:w-full ">
          <div class="w-[200px] ">
            <h1 class="flex flex-col">
              <span class="text-[42px] font-bold max-w-[200px] leading-[42px] " style={{ color: titleContentColor }}>
                {titleContent}
              </span>
              <span class="text-[42px] font-bold  max-w-[200px] leading-[42px]" style={{ color: subtitleContentColor }}>
                {subtitleContent}
              </span>
            </h1>
          </div>
          <div>
            <img class="max-w-20 w-20" src={iconContent} alt={titleContent}/>
          </div>
        </div>
        {/* Content Desktop */}
        <div class="w-[200px] md-tablet:hidden cs-min-full-desktop:block">
          <h1 class="flex flex-col">
            <span class="text-[42px] font-bold max-w-[200px] leading-[42px] " style={{ color: titleContentColor }}>
              {titleContent}
            </span>
            <span class="text-[42px] font-bold  max-w-[200px] leading-[42px]" style={{ color: subtitleContentColor }}>
              {subtitleContent}
            </span>
          </h1>
        </div>
        <div class="md-tablet:hidden ">
          <img class="max-w-20 w-20" src={iconContent} alt={titleContent}/>
        </div>
        <div class="max-w-[960px] flex flex-col">
          <h2>
            <span class={`text-bigger font-normal text-black texto-conteudo-categoria  ${textCategoryState.value === true ? "text-complete" : "text-hidden"}`}>
              {textContent}
            </span>
          </h2>
          <button onClick={() => { textCategoryState.value = !textCategoryState.value; }} class="text-base font-semibold underline mt-5">
            Ver {textCategoryState.value === true ? (<span>menos</span>) : (<span>mais</span>)}
          </button>
        </div>
      </div>
    </div>);
}
export interface Props {
    banners?: Banner[];
}
export const loader = (props: Props, req: Request) => {
    const { banners } = { ...DEFAULT_PROPS, ...props };
    const banner = banners.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { banner };
};
export default Banner;
