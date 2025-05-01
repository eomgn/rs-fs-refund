// selecionando elementos do formulário
const amountInput = document.querySelector("#amount");

// amountInput.oninput = () => {
//   console.log("conteudo mudou!!");
// };

// verificando quando o conteudo do input mudou
amountInput.addEventListener("change", () => {
  let value = amountInput.value.replace(/\D/g, "");

  amountInput.value = value;
});
