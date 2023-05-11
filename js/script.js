const main = document.querySelector(".main");
const girl = document.querySelector(".main__girl");

const taskInput = document.querySelector(".block-bottom__input");
const taskGo = document.querySelector(".block-bottom__btn");

const entryBox = document.querySelector(".block-bottom__entries");
const entries = document.querySelectorAll(".block-bottom__entry");

const num = document.querySelectorAll(".block-bottom__num");
const cleaner = document.querySelector(".block-bottom__cleaner");

// додаєм рядок
taskGo.addEventListener("click", () => {
  if (taskInput.value) {
    const entries = document.querySelectorAll(".block-bottom__entry");

    entryBox.innerHTML += `
    <div class="block-bottom__entry">
      <p class="block-bottom__num">${entries.length + 1}</p>
      <p class="block-bottom__todo">${taskInput.value}</p>
      <img
        class="block-bottom__img"
        src="./src/edit.png"
        alt="edit-img"
      />
      <img class="block-bottom__img" src="./src/bin.png" alt="bin-img" />
    </div>
    `;

    taskInput.value = "";
  }
});

// Clear Items
cleaner.addEventListener("click", () => {
  const entries = document.querySelectorAll(".block-bottom__entry");
  for (let i = 0; i < entries.length; i++) {
    entries[i].remove();
  }
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

// клік на дівчину - перезапуск сторінки
girl.addEventListener("click", () => {
  window.location.reload();
});
