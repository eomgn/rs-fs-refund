// selecionando elementos do formulário
const form = document.querySelector("form");
const amountInput = document.querySelector("#amount");
const expenseInput = document.querySelector("#expense");
const categoryInput = document.querySelector("#category");

// verificando quando o conteudo do input mudou
amountInput.addEventListener("change", () => {
  // obtem o valor atual do input e remove os caracteres nao numericos
  let value = amountInput.value.replace(/\D/g, "");

  // transformando o valor em centavos (ex: 150/100 = 1.5 que é equivalente a R$ 1,50)
  value = Number(value) / 100;

  // atualiza o valor do input
  amountInput.value = formatCurrencyBRL(value);
});

// amountInput.oninput = () => {
//   console.log("conteudo mudou!!");
// };

// formatando como moeda
function formatCurrencyBRL(value) {
  // formatando no padrão BRL (R$)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // retorna o valor formatado
  return value;
}

// form.onsubmit;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expenseInput.value,
    category_id: categoryInput.value,
    category_name: categoryInput.options[categoryInput.selectedIndex].text,
    amount: amountInput.value,
    created_at: new Date(),
  };

  console.log(newExpense);
});
