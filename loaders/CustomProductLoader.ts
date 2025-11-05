import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export interface ProductProps {
  productAs: any;
}

export default async function CustomProductLoader({ page }: Props): Promise<ProductProps | null> {
  
  const productId = page?.product?.inProductGroupWithID;
  const urlFetch = `https://notcob2c.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=productId:${productId}`;
  const product = await fetch(urlFetch);
  const fetchedProduct = await product.json();

  return {
    productAs: fetchedProduct
  }
}