// selecionando elementos do formulário
const form = document.querySelector("form");
const amountInput = document.querySelector("#amount");
const expenseInput = document.querySelector("#expense");
const categoryInput = document.querySelector("#category");

// selecionando elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");

// verificando quando o conteudo do input mudou
amountInput.addEventListener("change", () => {
  // obtem o valor atual do input e remove os caracteres nao numericos
  let value = amountInput.value.replace(/\D/g, "");

  // transformando o valor em centavos (ex: 150/100 = 1.5 que é equivalente a R$ 1,50)
  value = Number(value) / 100;

  // atualiza o valor do input
  amountInput.value = formatCurrencyBRL(value);
});

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

// captura o evento de submit do formulario para obter os valores
form.addEventListener("submit", (event) => {
  // previre o comportamento padrão de recarregar a página
  event.preventDefault();

  // cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expenseInput.value,
    category_id: categoryInput.value,
    category_name: categoryInput.options[categoryInput.selectedIndex].text,
    amount: amountInput.value,
    created_at: new Date(),
  };

  // console.log(newExpense);

  // chama a funcao que ira adicionar o item na lista
  expenseAdd(newExpense);
});

//adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // cria o elemento li para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // ---
    // cria o icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // ---
    // cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // adicionar nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory);

    // ---
    // cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `
      <small>R$</small>
      ${newExpense.amount.toUpperCase().replace("R$", "")}
      `;

    // ---
    // cria o icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.setAttribute("src", "/img/remove.svg");
    removeIcon.setAttribute("alt", "remover");
    removeIcon.classList.add("remove-icon");

    // ---
    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // ---
    // adiciona o item na lista
    expenseList.append(expenseItem);

    // atualiza os totais
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}
