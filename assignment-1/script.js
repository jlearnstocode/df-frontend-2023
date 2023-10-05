let bookData = [
  {
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Code refactoring",
  },
  {
    name: "Designing Data-Intensivce Application",
    author: "Martin Kleppman",
    topic: "Database",
  },
  {
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "DevOps",
  },
];

let selectedBookId;

function renderBookTable(data) {
  const bookTable = document.querySelector("tbody");
  const newBookTable = document.createElement("tbody");

  if (data.length === 0) {
    const tdEmpty = document.createElement("td");
    tdEmpty.textContent = "No book here! 🙈";
    tdEmpty.className = "empty-list";
    tdEmpty.setAttribute("colspan", "100%");

    const tr = document.createElement("tr");
    tr.appendChild(tdEmpty);

    newBookTable.appendChild(tr);
  } else {
    data.map((book, idx) => {
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
  renderBookTable(bookData);
}

function renderDeleteModal(target) {
  selectedBookId = target.getAttribute("data-index");
  const selectedBook = bookData[selectedBookId];

  const deleteModal = document.createElement("div");

  deleteModal.className = "delete-book-modal";
  deleteModal.setAttribute("id", "delete-book-modal");
  deleteModal.style.display = "flex";

  deleteModal.innerHTML = `
    <div class="modal-content">
      <button class="close-button delete-book-modal__close">&times;</button>

      <div class="modal-header">
        <h1 class="'modal-title">Delete book</h1>
      </div>

      <div class="modal-body">
        <p>Do you want to delete <strong>${selectedBook.name}</strong> book?</p>
      </div>

      <div class="modal-footer">
        <button class="delete-book-modal__confirm secondary-button">Delete</button>
        <button class="delete-book-modal__cancel main-button">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(deleteModal);
}

function handleConfirmAdd() {
  const name = document.getElementById("book-name").value;
  const author = document.getElementById("author-name").value;
  const topic = document.getElementById("topic-name").value;

  const newBook = { name, author, topic };
  bookData.push(newBook);

  document.getElementById("add-book-modal").remove();
  renderBookTable(bookData);
}

function renderAddModal() {
  const addModal = document.createElement("div");

  addModal.className = "add-book-modal";
  addModal.setAttribute("id", "add-book-modal");
  addModal.style.display = "flex";

  addModal.innerHTML = `
    <div class="modal-content">
      <button class="close-button add-book-modal__close">&times;</button>

      <div class="modal-header">
        <h1 class="'modal-title">Add book</h1>
      </div>

      <form>
        <div class="'modal-body">
          <div class="input name-input">
            <label for="book-name">Name</label>
            <input type="text" id="book-name" placeholder='book name...'/>
          </div>

          <div class="input author-input">
            <label for="author-name">Author</label>
            <input type="text" id="author-name" placeholder='book author...'/>
          </div>

          <div class="input topic-input">
            <label for="topic-name">Topic</label>
            <select name="topic-name" id="topic-name">
              <option value="Code refactoring">Code refactoring</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button class="add-book-modal__confirm main-button">Create</button>
        </div>
      </form>

    </div>
  `;

  document.body.appendChild(addModal);
}

renderBookTable(bookData);

const body = document.querySelector("body");

body.addEventListener("click", (event) => {
  const { target } = event;
  const classList = target.classList;

  if (classList?.contains("delete-book-modal__open")) {
    renderDeleteModal(target);
  }

  if (classList?.contains("delete-book-modal__confirm")) {
    handleConfirmDelete(target);
  }

  if (classList?.contains("add-book-modal__open")) {
    renderAddModal();
  }

  if (classList?.contains("add-book-modal__confirm")) {
    event.preventDefault();
    handleConfirmAdd(target);
  }

  if (
    classList?.contains("delete-book-modal") ||
    classList?.contains("delete-book-modal__cancel") ||
    classList?.contains("delete-book-modal__close")
  ) {
    document.getElementById("delete-book-modal").remove();
  }
  if (
    classList?.contains("add-book-modal") ||
    classList?.contains("add-book-modal__close")
  ) {
    document.getElementById("add-book-modal").remove();
  }
});

const searchBox = document.getElementById("search-books-input");

searchBox.addEventListener("change", (event) => {
  const text = event.target.value.toLowerCase();

  if (!text) {
    renderBookTable(bookData);
  }
  const data = bookData.filter((i) => i.name.toLowerCase().includes(text));
  renderBookTable(data);
});
