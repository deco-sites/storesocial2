import { useId } from "../../../sdk/useId.ts";
import type { Props as PropsFirstContentNotMilk } from "../../../sections/Product/ProductSpecialContent.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


interface Props {
  page: ProductDetailsPage | null;
  /**
   * @title Tag highlight primeiro conteúdo NotMilk   
   */
  contentTag?: string;
  /**
   * @title Cor da Tag highlight primeiro conteúdo NotMilk   
   */
  contentTagColor?: string;
  /**
   * @title Título primeiro conteúdo NotMilk   
   */
  contentTitle?: string;
  /**
  * @title Texto primeiro conteúdo NotMilk   
  */
  contentText?: string;
  /**
  * @title Imagem principal primeiro conteúdo NotMilk   
  */
  imgDesk: ImageWidget;
}


function FirstContentNotMilk({ page, firstContentNotMilk }: PropsFirstContentNotMilk) {

  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;
  const brandName = product.brand.name;

  return (
    <div class="flex px-4" id={id}>

      <div>
      {
        brandName === "NotMilk" ?(
          <div class="flex full-phone:flex-col items-center gap-20 full-phone:gap-3.5">
            <div class="flex full-phone:order-2">
              <img src={firstContentNotMilk.imgDesk} alt="" srcset="" />
            </div>
            <div class="flex flex-col max-w-[520px] gap-3.5 cs-all-tablet:max-w-[334px] ">
              <div class="text-base font-bold full-phone:hidden" style={{ color: firstContentNotMilk.contentTagColor }}>
                {firstContentNotMilk?.contentTag}
              </div>
              <div class="text-black-1 text-[28px] font-bold leading-9 full-phone:order-1">
                {firstContentNotMilk?.contentTitle}
              </div>
              <div class="text-big text-black-1 font-normal leading-5 full-phone:order-3">
                {firstContentNotMilk?.contentText}
              </div>
            </div>

          </div>
        ):
        ('')
      }
      </div>
    </div>
  );
}

export default FirstContentNotMilk;
