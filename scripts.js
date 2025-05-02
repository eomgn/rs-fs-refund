// selecionando elementos do formulário
const amountInput = document.querySelector("#amount");

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
