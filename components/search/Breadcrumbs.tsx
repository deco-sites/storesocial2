import type { BreadcrumbList, ProductListingPage } from "apps/commerce/types.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";


export interface Props {
    page: ProductListingPage | null;
}
const Breadcrumbs = ({ page }: Props) => {

    const breadcrumbList: BreadcrumbList | null = page?.breadcrumbList;
    const breadcrumb: any = {
        ...breadcrumbList,
        itemListElement: breadcrumbList?.itemListElement.slice(0, -1)
    };

    return (
        <>
            <Breadcrumb itemListElement={breadcrumb.itemListElement} />
        </>
    )
}

export default Breadcrumbs