document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todoForm");
  const input = document.querySelector("input");
  const lists = document.getElementById("lists");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const todoTitle = input.value;

    if (todoTitle.trim() === "") {
      alert("Type in something first.");
      return;
    }

    const newTodo = {
      title: todoTitle,
      completed: false,
    };

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        const li = createTodoElement(data);
        lists.appendChild(li);

        input.value = "";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });

  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((todos) => {
      todos.forEach((todo) => {});
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  function createTodoElement(todo) {
    const li = document.createElement("li");
    li.classList.add(
      "is-flex",
      "is-align-items-center",
      "is-justify-content-space-between",
      "mb-2",
    );
    li.style.border = "1px solid #d3d3d3"
    li.style.borderRadius = "5px"
    li.style.padding = "20px 15px"

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        todoText.classList.add(
          "has-text-grey",
          todoText.style.textDecoration = "line-through"
          );
        } else {
          todoText.classList.remove(
            "has-text-grey",
            todoText.style.textDecoration = "none"
        );
      }
    });

    li.appendChild(checkbox);
    const todoText = document.createElement("div");
    todoText.textContent = todo.title;
    li.appendChild(todoText);

    const closeImage = document.createElement("img");
    closeImage.src = "images/icons8-trash-24.png";
    closeImage.alt = "Close";

    closeImage.addEventListener("click", function () {
      li.remove();
    });

    li.appendChild(closeImage);

    return li;
  }

  function clearTodoList() {
    while (lists.firstChild) {
      lists.removeChild(lists.firstChild);
    }
  }

  function clearInput() {
    input.value = "";
  }
});
