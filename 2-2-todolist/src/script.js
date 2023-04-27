// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const done = document.querySelector("#done");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}
//檢查是否全是空白 函式
function notOnlySpace(str) {
  return str.trim().length > 0;
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;

  if (inputValue.length > 0 && notOnlySpace(inputValue)) {
    addItem(inputValue);
  }
});
//Enter輸入
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const inputValue = input.value;
    if (inputValue.length > 0 && notOnlySpace(inputValue)) {
      addItem(inputValue);
    }
  }
});

// Delete and check
list.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    done.appendChild(target.parentElement);
  }
});

done.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    list.appendChild(target.parentElement);
  }
});
