import { useId } from "../../../sdk/useId.ts";
import type { Props as PropsSecondContentNotMilkHighProtein } from "../../../sections/Product/ProductSpecialContent.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Tag highlight segundo conteúdo NotMilk High Protein   
   */
  contentTag?: string;
  /**
   * @title Cor da Tag highlight segundo conteúdo NotMilk High Protein   
   */
  contentTagColor?: string;
  /**
   * @title Título segundo conteúdo NotMilk High Protein   
   */
  contentTitle?: string;
  /**
  * @title Texto segundo conteúdo NotMilk High Protein   
  */
  contentText?: string;
   /**
  * @title Imagem principal segundo conteúdo NotMilk High Protein   
  */
  imgDesk?: ImageWidget;
  /**
  * @title Cor base do primeiro gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph1ColorBase?: string;
  /**
   *   /**
  * @title Cor de fundo do primeiro gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph1ColorBg?: string;
  /**
  * @title Porcentagem primeiro gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph1Value?: number;
  /**
  * @title ícone primeiro gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph1Icon?: ImageWidget;
  /**
  * @title Título primeiro gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph1Title?: string;
  /**
  * @title Texto primeiro gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph1Text?: string;
 /**
  * @title Cor base do segundo gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph2ColorBase?: string;
  /**
    *   /**
  * @title Cor de fundo do segundo gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph2ColorBg?: string;
  /**
  * @title Porcentagem segundo gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph2Value?: string;
  /**
  * @title ícone segundo gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph2Icon?: ImageWidget;
  /**
  * @title Título segundo gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph2Title?: string;
  /**
  * @title Texto segundo gráfico do segundo conteúdo NotMilk High Protein   
  */
  graph2Text?: string;
}


function SecondContentNotMilk({ page, secondContentNotMilkHighProtein }: PropsSecondContentNotMilkHighProtein) {

  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const brandName = product.brand.name;
  const graph1BarHeight = 100 - secondContentNotMilkHighProtein.graph1Value;
  const graph1BarHeightPorcentage = graph1BarHeight+"%"
  const graph2BarHeight = 100 - secondContentNotMilkHighProtein.graph2Value;
  const graph2BarHeightPorcentage = graph2BarHeight+"%"
  return (
    <div class="flex flex-col px-4" id={id}>

      <div>
      {
        brandName === "NotMilk High Protein" ?(
        <div class="flex  full-phone:flex-col gap-20">
          <div class="flex flex-col max-w-[520px] gap-3.5 cs-all-tablet:max-w-[334px]">
            <div class="text-base font-bold" style={{ color: secondContentNotMilkHighProtein.contentTagColor }}>
              {secondContentNotMilkHighProtein?.contentTag}
            </div>
            <div class="text-black-1 text-[28px] font-bold leading-9">
              {secondContentNotMilkHighProtein?.contentTitle}
            </div>
            <div class="text-bigger text-black font-normal leading-6">
              {secondContentNotMilkHighProtein?.contentText}
            </div>
            <div class="flex mt-1.5">
              <div class="max-w-[200px] flex flex-col justify-center items-center">
                <div class="graph flex h-[265px] w-[150px] justify-center items-center relative" style={{backgroundColor: secondContentNotMilkHighProtein.graph1ColorBg}}>
                  <div class="rotate-[270deg] text-[34px] font-bold leading-[45px]" style={{color: secondContentNotMilkHighProtein.graph1ColorBase}}>
                    {secondContentNotMilkHighProtein.graph1Value}%
                  </div>
                  <div class={`absolute bottom-0 w-full `} style={{backgroundColor: secondContentNotMilkHighProtein.graph1ColorBase, height: graph1BarHeightPorcentage}}>

                  </div>
                </div>
                <div class="icon py-1.5">
                  <img src={secondContentNotMilkHighProtein.graph1Icon} alt={secondContentNotMilkHighProtein.graph1Title} />
                </div>
                <div class="title text-big font-bold leading-[22px]">
                  {secondContentNotMilkHighProtein.graph1Title}
                </div>
                <div class="text text-big font-normal leading-[22px] text-center">
                  {secondContentNotMilkHighProtein.graph1Text}
                </div>
              </div>

              <div class="max-w-[200px] flex flex-col justify-center items-center">
                <div class="graph flex h-[265px] w-[150px] justify-center items-center relative" style={{backgroundColor: secondContentNotMilkHighProtein.graph2ColorBg}}>
                  <div class="rotate-[270deg] text-[34px] font-bold leading-[45px]" style={{color: secondContentNotMilkHighProtein.graph2ColorBase}}>
                    {secondContentNotMilkHighProtein.graph2Value}%
                  </div>
                  <div class={`absolute bottom-0 w-full `} style={{backgroundColor: secondContentNotMilkHighProtein.graph2ColorBase, height: graph2BarHeightPorcentage}}>

                  </div>
                </div>
                <div class="icon py-1.5">
                  <img src={secondContentNotMilkHighProtein.graph2Icon} alt={secondContentNotMilkHighProtein.graph2Title} />
                </div>
                <div class="title text-big font-bold leading-[22px]">
                  {secondContentNotMilkHighProtein.graph2Title}
                </div>
                <div class="text text-big font-normal leading-[22px] text-center">
                  {secondContentNotMilkHighProtein.graph2Text}
                </div>
              </div>
              
            </div>
          </div>
          <div class="flex full-phone:hidden items-start cs-all-tablet:items-center">
            <img src={secondContentNotMilkHighProtein.imgDesk} alt="" srcset="" />
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
