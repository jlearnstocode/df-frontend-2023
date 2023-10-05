const bookData = [
  {
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Code refactoring",
    isDeleted: false,
  },
  {
    name: "Designing Data-Intensivce Application",
    author: "Martin Kleppman",
    topic: "Database",
    isDeleted: false,
  },
  {
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "DevOps",
    isDeleted: false,
  },
];

function renderBookTable() {
  const availableBook = bookData.filter((i) => !i.isDeleted);

  const bookTable = document.querySelector("tbody");
  const newBookTable = document.createElement("tbody");

  if (availableBook.length === 0) {
    const tdEmpty = document.createElement("td");
    tdEmpty.textContent = "No book here! 🙈";
    tdEmpty.className = "empty-list";
    tdEmpty.setAttribute("colspan", "100%");

    const tr = document.createElement("tr");
    tr.appendChild(tdEmpty);

    newBookTable.appendChild(tr);
  } else {
    availableBook.map((book, idx) => {
      const tdName = document.createElement("td");
      tdName.textContent = book.name;

      const tdAuthor = document.createElement("td");
      tdAuthor.textContent = book.author;

      const tdTopic = document.createElement("td");
      tdTopic.textContent = book.topic;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("data-index", idx);
      deleteBtn.classList.add("link-button", "delete-book-modal__open");

      const tdBtn = document.createElement("td");
      tdBtn.appendChild(deleteBtn);

      const tr = document.createElement("tr");
      tr.appendChild(tdName);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdTopic);
      tr.appendChild(tdBtn);

      newBookTable.appendChild(tr);
    });
  }

  bookTable.parentNode.replaceChild(newBookTable, bookTable);
}

function handleConfirmDelete() {
  bookData.splice(selectedBookId, 1);

  document.getElementById("delete-book-modal").remove();
  renderBookTable();
}

let selectedBookId;

function renderDeleteModal(target) {
  selectedBookId = target.getAttribute("data-index");
  const selectedBook = bookData[selectedBookId];

  const deleteModal = document.createElement("div");

  deleteModal.className = "delete-book-modal";
  deleteModal.setAttribute("id", "delete-book-modal");
  deleteModal.style.display = "flex";

  deleteModal.innerHTML = `
    <div class="modal-content">
      <button class="close-button">&times;</button>

      <div class="modal-header">
        <h1 class="'modal-title">Delete book</h1>
      </div>

      <div class="modal-body">
        <p>Do you want to delete <strong>${selectedBook.name}</strong> book?</p>
      </div>

      <div class="modal-footer">
        <button class="delete-book-modal__confirm secondary-button">Delete</button>
        <button class="cancel-button main-button">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(deleteModal);
}

renderBookTable();

const body = document.querySelector("body");

body.addEventListener("click", ({ target }) => {
  const classList = target.classList;

  if (classList?.contains("delete-book-modal__open")) {
    renderDeleteModal(target);
  }

  if (classList?.contains("delete-book-modal__confirm")) {
    handleConfirmDelete(target);
  }

  if (
    classList?.contains("delete-book-modal") ||
    classList?.contains("cancel-button") ||
    classList?.contains("close-button")
  ) {
    document.getElementById("delete-book-modal").remove();
  }
});
