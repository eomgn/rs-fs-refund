// selecionando elementos do formulário
const form = document.querySelector("form");
const amountInput = document.querySelector("#amount");
const expenseInput = document.querySelector("#expense");
const categoryInput = document.querySelector("#category");

// selecionando elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

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
  // previvir o comportamento padrão de recarregar a página
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

    // limpar o formulário pra adicionar um novo item
    formClear();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

// atualizar os totais
function updateTotals() {
  try {
    // recuperar todos os itens (li) da lista (ul)
    const items = expenseList.children;

    expensesQuantity.textContent = `
      ${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    // variavel para incrementar o total
    let total = 0;

    // percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // removendo caracteres NÃO numericos e substitui a virgula pelo ponto
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // converte para float
      value = parseFloat(value);

      // verifica se de fato é um numero
      if (isNaN(value)) {
        alert(
          "Não foi possivel calcular o total. O valor não parecer ser um número."
        );
      }

      // incrementa o valor
      total += Number(value);
    }

    // cria a span para adicioanr o R$ formatando
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // formata o valor e remove o R$ que sera exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // limpa o conteudo do elemento
    expenseTotal.innerHTML = "";

    // adiciona e o valor total formatado
    expenseTotal.append(symbolBRL, total);
  } catch (error) {
    alert("Não foi possível atualizar os totais.");
    console.log(error);
  }
}

// evento que captura o clique nos itens da lista
expenseList.addEventListener("click", (event) => {
  // verifica se o elemento clicado é o icone de remove
  if (event.target.classList.contains("remove-icon")) {
    // obter a li pai do elemento clicado
    const item = event.target.closest(".expense");

    // remove o item da lista
    item.remove();
  }

  // atualiza os totais
  updateTotals();
});

function formClear() {
  //limpar inputs
  expenseInput.value = "";
  categoryInput.value = "";
  amountInput.value = "";

  // coloca o foco no expanseInput
  expenseInput.focus();
}
