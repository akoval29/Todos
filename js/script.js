const main = document.querySelector(".main");
const girl = document.querySelector(".main__girl");

const taskInput = document.querySelector(".block-bottom__input");
const taskGo = document.querySelector(".block-bottom__btn");

const entryBox = document.querySelector(".block-bottom__entries");
const entries = document.querySelectorAll(".block-bottom__entry");

const num = document.querySelectorAll(".block-bottom__num");
const cleaner = document.querySelector(".block-bottom__cleaner");

// перший запуск
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("todo") === "[]") {
    localStorage.clear();
  } // Bug fix

  if (localStorage.getItem("todo")) {
    console.log("Local storage contain something");

    const rows = JSON.parse(localStorage.getItem("todo"));
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      generator(row);
    }
    upDateLocalStorage();
  } else {
    console.log("Local storage is EMPTY");
    generator("Learn JavaScript");
    generator("Learn React");
  }
});

// update localStorage
function upDateLocalStorage() {
  const rows = [];
  document.querySelectorAll(".block-bottom__todo").forEach((item) => {
    rows.push(item.innerHTML);
  });

  console.log("↓  local storage  ↓");
  console.log(rows);
  localStorage.setItem("todo", JSON.stringify(rows));
}

// newTask
taskGo.addEventListener("click", () => {
  if (taskInput.value) {
    generator(taskInput.value);
    taskInput.value = "";
    upDateLocalStorage();
  }
});

// Generator
let number = 0;
let rows = [];
function generator(val) {
  // Generator - Нумерація
  let numArr = document.querySelectorAll(".block-bottom__num");
  numArr.length === 0 ? (number = 1) : (number = numArr.length + 1);

  // Generator - Верстка
  entryBox.innerHTML += `
    <div class="block-bottom__entry block-bottom__entry--№${number}">
      <p class="block-bottom__num">${number}.</p>
      <p class="block-bottom__todo">${val}</p>
      <img
        class="block-bottom__img block-bottom__img--edit"
        src="./src/edit.png"
        alt="edit-img"
      />
      <img 
        class="block-bottom__img block-bottom__img--bin" 
        src="./src/bin.png" 
        alt="bin-img" 
      />
    </div>
  `;
  // Generator - Корзинки
  document.querySelectorAll(".block-bottom__img--bin").forEach((item) => {
    item.addEventListener("click", () => {
      item.parentNode.remove();
      upDateLocalStorage();
    });
  });

  // Generator - Олівці
  document.querySelectorAll(".block-bottom__img--edit").forEach((item) => {
    item.addEventListener("click", () => {
      taskInput.value = item.previousElementSibling.innerHTML;
      item.parentNode.remove();
      upDateLocalStorage();
    });
  });
}

// Clear Items
cleaner.addEventListener("click", () => {
  const entries = document.querySelectorAll(".block-bottom__entry");
  for (let i = 0; i < entries.length; i++) {
    entries[i].remove();
  }
  localStorage.removeItem("todo");
});

// клік на дівчину - перезапуск сторінки
girl.addEventListener("click", () => {
  window.location.reload();
});

// інпут реагує на клавішу ENTER
taskInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    taskGo.click();
  }
});

// фокус на текстовий інпут при кліках по сторінці
main.addEventListener("click", () => {
  taskInput.focus();
});
