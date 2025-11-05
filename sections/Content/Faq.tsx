export interface Question {
  question: string;
  /** @format html */
  answer: string;
}

export interface Props {
  title?: string;
  description?: string;
  questions?: Question[];
}

const DEFAULT_PROPS = {
  title: "",
  description: "",
  questions: [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ]
};

function Question({ question, answer }: Question) {
  return (
    <div class="mb-[1px]  border-t border-solid border-[#DEDEDE] last:border-b">
      <details class="collapse collapse-arrow join-item border-t border-base-200">
        <summary class="collapse-title text-bigger font-bold px-5 py-4 flex items-center cs-min-full-phone:pr-7">
          {question}
        </summary>
        <div
          class="collapse-content pb-0"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </details>
    </div>
    
  );
}


export default function FAQ(props: Props) {
  const {
    questions = [],
    title,
    description,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <>
        <div class="flex full-phone:flex-col w-full container cs-all-tablet:px-8 px-4 py-8 lg:py-10  max-w-[1254px] gap-20 full-phone:gap-2.5">
          <div class="order-1 w-full max-w-[256px] full-phone:max-w-full">
            <div class="flex flex-col gap-2 justify-center ">
              <h1 class="text-[35px] font-bold leading-[48px] text-left uppercase full-phone:text-[28px] full-phone:text-center">
                {title}
              </h1>
              <h2 class="text-larger font-normal leading-[29.33px] text-left uppercase full-phone:text-large full-phone:text-center">
                {description}
              </h2>
            </div>
          </div>
          <div class="order-2 w-full">
            <div class="join join-vertical w-full">
              {questions.map((question) => <Question {...question} />)}
            </div>
          </div>
        </div>
    </>
  );
}
