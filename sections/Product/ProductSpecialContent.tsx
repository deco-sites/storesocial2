import { ProductDetailsPage } from "apps/commerce/types.ts";
import NotFound from "../../sections/Product/NotFound.tsx";
import type { Props as firstContentNotMilkProps } from "../../components/product/ProductContent/FirstContentNotMilk.tsx";
import type { Props as secondContentNotMilkProps } from "../../components/product/ProductContent/SecondContentNotMilk.tsx";
import type { Props as firstContentNotMilkHighProteinProps } from "../../components/product/ProductContent/FirstContentNotMilkHighProtein.tsx";
import type { Props as secondContentNotMilkHighProteinProps } from "../../components/product/ProductContent/SecondContentNotMilkHighProtein.tsx";
import type { Props as firstContentNotMayoProps } from "../../components/product/ProductContent/FirstContentNotMayo.tsx";
import type { Props as secondContentNotMayoProps } from "../../components/product/ProductContent/SecondContentNotMayo.tsx";
import FirstContentNotMilk from "../../components/product/ProductContent/FirstContentNotMilk.tsx";
import SecondContentNotMilk from "../../components/product/ProductContent/SecondContentNotMilk.tsx";
import FirstContentNotMilkHighProtein from "../../components/product/ProductContent/FirstContentNotMilkHighProtein.tsx";
import SecondContentNotMilkHighProtein from "../../components/product/ProductContent/SecondContentNotMilkHighProtein.tsx";
import FirstContentNotMayo from "../../components/product/ProductContent/FirstContentNotMayo.tsx";
import SecondContentNotMayo from "../../components/product/ProductContent/SecondContentNotMayo.tsx";
import { type SectionProps } from "@deco/deco";
export interface Props {
    /** @title Integration */
    page: ProductDetailsPage | null;
    firstContentNotMilk?: firstContentNotMilkProps;
    secondContentNotMilk?: secondContentNotMilkProps;
    firstContentNotMayo?: firstContentNotMayoProps;
    secondContentNotMayo?: secondContentNotMayoProps;
    firstContentNotMilkHighProtein?: firstContentNotMilkHighProteinProps;
    secondContentNotMilkHighProtein?: secondContentNotMilkHighProteinProps;
}
export default function ProductSpecialContent({ page, firstContentNotMilk, secondContentNotMilk, firstContentNotMilkHighProtein, secondContentNotMilkHighProtein, firstContentNotMayo, secondContentNotMayo }: SectionProps<typeof loader>) {
    if (!page?.seo) {
        return <NotFound />;
    }
    const { product } = page;
    const brandName = product.brand.name;
    return (<div class="w-full container py-8 flex flex-col gap-6 lg:py-10 cs-all-tablet:pb-0">
			<div class="max-w-[1120px] flex gap-10 justify-center flex-col mx-auto my-0 full-phone:gap-0">
				{brandName === "NotMilk" && (<div class="max-w-[1120px] flex gap-10 justify-center flex-col mx-auto my-0 full-phone:gap-5">
							<FirstContentNotMilk page={page} firstContentNotMilk={firstContentNotMilk}/>
							<SecondContentNotMilk page={page} secondContentNotMilk={secondContentNotMilk}/>
						</div>)}
				{brandName === "NotMilk High Protein" && (<div class="max-w-[1120px] flex gap-10 justify-center flex-col mx-auto my-0 full-phone:gap-5">
							<FirstContentNotMilkHighProtein page={page} firstContentNotMilkHighProtein={firstContentNotMilkHighProtein}/>
							<SecondContentNotMilkHighProtein page={page} secondContentNotMilkHighProtein={secondContentNotMilkHighProtein}/>
						</div>)}
				{brandName === "NotMayo" && (<div class="max-w-[1120px] flex gap-10 justify-center flex-col mx-auto my-0 full-phone:gap-5">
							<FirstContentNotMayo page={page} firstContentNotMayo={firstContentNotMayo}/>
							<SecondContentNotMayo page={page} secondContentNotMayo={secondContentNotMayo}/>
						</div>)}
			</div>
		</div>);
}
export const loader = (props: Props, _req: Request) => {
    return { ...props };
};
export function LoadingFallback() {
    return (<div style={{ height: "710px" }} class="w-full flex justify-center items-center">
			<span class="loading loading-spinner"/>
		</div>);
}
