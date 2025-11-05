import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;
  const singleInstallment = (billingIncrement / billingDuration)
  // Código comentado para utilização futura. Mantive o return abaixo para simular o que o figma sugere, porém exibirá parcelamento em 1x. 
  // if(billingDuration > 1){
  //   return `ou  R$ ${billingIncrement} em até ${billingDuration}x de ${singleInstallment} ${
  //     withTaxes ? "com juros" : "sem juros"
  //   }`;
  // }else{
  //   return null
  // }
  return `ou  R$ ${billingIncrement} em até ${billingDuration}x de ${singleInstallment} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer?.availability;

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    installments: installment && price
      ? installmentToString(installment, price)
      : null,
  };
};
