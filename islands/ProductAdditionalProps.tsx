import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import Icon from "../components/ui/Icon.tsx";

interface Props {
	page: ProductDetailsPage | null;
}

function ProductAdditionalProps({ page }: Props) {
	const { product } = page;
	const description = product.description;
	const additionalProps = product?.isVariantOf?.additionalProperty;
	const fieldDesc = useSignal(false);
	const fieldEspec = useSignal(false);
	const fieldTable = useSignal(false);
	const fieldIngr = useSignal(false);
	const productFieldsIngredients = {
		field: {
			name: "Ingredientes",
			value: additionalProps?.find(item => item.name === "Itens")?.value
		}
	}

	const productFieldsNutricional = {
		field: {
			name: "Tabela Nutricional",
			value: additionalProps?.find(item => item.name === "Nutricional")?.value
		}
	}

	const productFieldsEspecific = [
		{
			field: {
				name: "Sabor",
				value: additionalProps?.find(item => item.name === "Sabor")?.value
			}
		},
		{
			field: {
				name: "Livre de lactose",
				value: additionalProps?.find(item => item.name === "Livre de lactose")?.value
			}
		},
		{
			field: {
				name: "Livre de glúten",
				value: additionalProps?.find(item => item.name === "Livre de glúten")?.value
			}
		},
		{
			field: {
				name: "Vegano",
				value: additionalProps?.find(item => item.name === "Vegano")?.value
			}
		},
		{
			field: {
				name: "Conservação do produto",
				value: additionalProps?.find(item => item.name === "Conservação do produto")?.value
			}
		},
		{
			field: {
				name: "É de soja",
				value: additionalProps?.find(item => item.name === "É de soja")?.value
			}
		},
		{
			field: {
				name: "Variedade da soja",
				value: additionalProps?.find(item => item.name === "Variedade da soja")?.value
			}
		},
		{
			field: {
				name: "Livre de gordura trans",
				value: additionalProps?.find(item => item.name === "Livre de gordura trans")?.value
			}
		},
		{
			field: {
				name: "Livre de Colesterol",
				value: additionalProps?.find(item => item.name === "Livre de Colesterol")?.value
			}
		},
		{
			field: {
				name: "Fonte de vitaminas",
				value: additionalProps?.find(item => item.name === "Fonte de vitaminas")?.value
			}
		},
		{
			field: {
				name: "Alergênicos",
				value: additionalProps?.find(item => item.name === "Alergênicos")?.value
			}
		}
	]
	return (
		<div class="mt-4 sm:mt-6 max-w-[560px] w-full cs-all-tablet:max-w-full cs-all-tablet:px-5">
			<span class="text-sm">
				{description && (
					<details onClick={() => { fieldDesc.value = !fieldDesc.value; }}>
						<summary class="list-none cursor-pointer text-big leading-[22px] font-bold text-black uppercase py-4 border-t border-b border-gray-10 border-solid relative">
							Descrição
							<div class="absolute right-[0]" style="top: calc(50% - 9px);">
								{fieldDesc.value === true ? (<Icon size={18} id={"ArrowUpPDP"} strokeWidth={2} />) : (<Icon size={18} id={"ArrowDownPDP"} strokeWidth={2} />)}
							</div>
						</summary>
						<div
							class="p-4 text-bigger text-black leading-6"
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</details>
				)}
				{productFieldsIngredients && (
					<details onClick={() => { fieldIngr.value = !fieldIngr.value; }}>
						<summary class={`list-none cursor-pointer text-big leading-[22px] font-bold text-black uppercase py-4 border-b border-gray-10 border-solid relative`}>
							{productFieldsIngredients.field.name}
							<div class="absolute right-[0]" style="top: calc(50% - 9px);">
								{fieldIngr.value === true ? (<Icon size={18} id={"ArrowUpPDP"} strokeWidth={2} />) : (<Icon size={18} id={"ArrowDownPDP"} strokeWidth={2} />)}
							</div>
						</summary>
						<div class="p-4 text-bigger text-black leading-6">
							<div class={`item-tabela-cy`}>
								{productFieldsIngredients.field.value !== undefined ? productFieldsIngredients.field.value : "Não informado"}
							</div>
						</div>
					</details>
				)}
				{productFieldsNutricional && (
					<details onClick={() => { fieldTable.value = !fieldTable.value; }}>
						<summary class={`list-none cursor-pointer text-big leading-[22px] font-bold text-black uppercase py-4 border-b border-gray-10 border-solid relative`}>
							{productFieldsNutricional?.field.name}
							<div class="absolute right-[0]" style="top: calc(50% - 9px);">
								{fieldTable.value === true ? (<Icon size={18} id={"ArrowUpPDP"} strokeWidth={2} />) : (<Icon size={18} id={"ArrowDownPDP"} strokeWidth={2} />)}
							</div>
						</summary>
						<div class="p-4 text-bigger text-black ">
							<div class={`item-tabela-cy`}>
								<img src={productFieldsNutricional?.field.value} alt="" srcset="" />
							</div>
						</div>
					</details>
				)}
				{productFieldsEspecific && (
					<details onClick={() => { fieldEspec.value = !fieldEspec.value; }}>
						<summary class={`list-none cursor-pointer text-big leading-[22px] font-bold text-black uppercase py-4 border-b border-gray-10 border-solid relative`}>
							Especificações
							<div class="absolute right-[0]" style="top: calc(50% - 9px);">
								{fieldEspec.value === true ? (<Icon size={18} id={"ArrowUpPDP"} strokeWidth={2} />) : (<Icon size={18} id={"ArrowDownPDP"} strokeWidth={2} />)}
							</div>
						</summary>
						<div class="p-4 text-bigger text-black leading-6">
							{productFieldsEspecific?.map((item, index) => {
								return (
									<div class={`item-espec-${index}-cy mb-3`}>
										<b>{item.field.name}</b> : {item.field.value !== undefined ? item.field.value : "Não informado"}
									</div>
								)
							})}
						</div>
					</details>
				)}
			</span>
		</div>
	);
}

export default ProductAdditionalProps;
