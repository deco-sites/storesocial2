import { useId } from "../../../sdk/useId.ts";
import type { Props as PropsSecondContentNotMilk } from "../../../sections/Product/ProductSpecialContent.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Tag highlight segundo conteúdo NotMilk   
   */
  contentTag?: string;
  /**
   * @title Cor da Tag highlight segundo conteúdo NotMilk   
   */
  contentTagColor?: string;
  /**
   * @title Título segundo conteúdo NotMilk   
   */
  contentTitle?: string;
  /**
  * @title Texto segundo conteúdo NotMilk   
  */
  contentText?: string;
   /**
  * @title Imagem principal segundo conteúdo NotMilk   
  */
  imgDesk?: ImageWidget;
  /**
  * @title Cor base do primeiro gráfico do segundo conteúdo NotMilk   
  */
  graph1ColorBase?: string;
  /**
   *   /**
  * @title Cor de fundo do primeiro gráfico do segundo conteúdo NotMilk   
  */
  graph1ColorBg?: string;
  /**
  * @title Porcentagem primeiro gráfico do segundo conteúdo NotMilk   
  */
  graph1Value?: number;
  /**
  * @title ícone primeiro gráfico do segundo conteúdo NotMilk   
  */
  graph1Icon?: ImageWidget;
  /**
  * @title Título primeiro gráfico do segundo conteúdo NotMilk   
  */
  graph1Title?: string;
  /**
  * @title Texto primeiro gráfico do segundo conteúdo NotMilk   
  */
  graph1Text?: string;
 /**
  * @title Cor base do segundo gráfico do segundo conteúdo NotMilk   
  */
  graph2ColorBase?: string;
  /**
    *   /**
  * @title Cor de fundo do segundo gráfico do segundo conteúdo NotMilk   
  */
  graph2ColorBg?: string;
  /**
  * @title Porcentagem segundo gráfico do segundo conteúdo NotMilk   
  */
  graph2Value?: string;
  /**
  * @title ícone segundo gráfico do segundo conteúdo NotMilk   
  */
  graph2Icon?: ImageWidget;
  /**
  * @title Título segundo gráfico do segundo conteúdo NotMilk   
  */
  graph2Title?: string;
  /**
  * @title Texto segundo gráfico do segundo conteúdo NotMilk   
  */
  graph2Text?: string;
}


function SecondContentNotMilk({ page, secondContentNotMilk }: PropsSecondContentNotMilk) {

  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const brandName = product.brand.name;
  const graph1BarHeight = 100 - secondContentNotMilk.graph1Value;
  const graph1BarHeightPorcentage = graph1BarHeight+"%"
  const graph2BarHeight = 100 - secondContentNotMilk.graph2Value;
  const graph2BarHeightPorcentage = graph2BarHeight+"%"
  return (
    <div class="flex flex-col px-4" id={id}>

      <div>
      {
        brandName === "NotMilk" ?(
        <div class="flex  full-phone:flex-col gap-20">
          <div class="flex flex-col max-w-[520px] gap-3.5 cs-all-tablet:max-w-[334px]">
            <div class="text-base font-bold" style={{ color: secondContentNotMilk.contentTagColor }}>
              {secondContentNotMilk?.contentTag}
            </div>
            <div class="text-black-1 text-[28px] font-bold leading-9">
              {secondContentNotMilk?.contentTitle}
            </div>
            <div class="text-bigger text-black font-normal leading-6">
              {secondContentNotMilk?.contentText}
            </div>
            <div class="flex mt-1.5">
              <div class="max-w-[200px] flex flex-col justify-center items-center">
                <div class="graph flex h-[265px] w-[150px] justify-center items-center relative" style={{backgroundColor: secondContentNotMilk.graph1ColorBg}}>
                  <div class="rotate-[270deg] text-[34px] font-bold leading-[45px]" style={{color: secondContentNotMilk.graph1ColorBase}}>
                    {secondContentNotMilk.graph1Value}%
                  </div>
                  <div class={`absolute bottom-0 w-full `} style={{backgroundColor: secondContentNotMilk.graph1ColorBase, height: graph1BarHeightPorcentage}}>

                  </div>
                </div>
                <div class="icon py-1.5">
                  <img src={secondContentNotMilk.graph1Icon} alt={secondContentNotMilk.graph1Title} />
                </div>
                <div class="title text-big font-bold leading-[22px]">
                  {secondContentNotMilk.graph1Title}
                </div>
                <div class="text text-big font-normal leading-[22px] text-center">
                  {secondContentNotMilk.graph1Text}
                </div>
              </div>

              <div class="max-w-[200px] flex flex-col justify-center items-center">
                <div class="graph flex h-[265px] w-[150px] justify-center items-center relative" style={{backgroundColor: secondContentNotMilk.graph2ColorBg}}>
                  <div class="rotate-[270deg] text-[34px] font-bold leading-[45px]" style={{color: secondContentNotMilk.graph2ColorBase}}>
                    {secondContentNotMilk.graph2Value}%
                  </div>
                  <div class={`absolute bottom-0 w-full `} style={{backgroundColor: secondContentNotMilk.graph2ColorBase, height: graph2BarHeightPorcentage}}>

                  </div>
                </div>
                <div class="icon py-1.5">
                  <img src={secondContentNotMilk.graph2Icon} alt={secondContentNotMilk.graph2Title} />
                </div>
                <div class="title text-big font-bold leading-[22px]">
                  {secondContentNotMilk.graph2Title}
                </div>
                <div class="text text-big font-normal leading-[22px] text-center">
                  {secondContentNotMilk.graph2Text}
                </div>
              </div>
              
            </div>
          </div>
          <div class="flex full-phone:hidden items-start cs-all-tablet:items-center">
            <img src={secondContentNotMilk.imgDesk} alt="" srcset="" />
          </div>
        </div>
        ):
        ('')
      }
      </div>
    </div>
  );
}

export default SecondContentNotMilk;
