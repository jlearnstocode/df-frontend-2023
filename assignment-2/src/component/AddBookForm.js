export function AddBookForm({ setNewBook }) {
  function handleChange(event) {
    const key = event.target.getAttribute("id");
    const value = event.target.value;

    setNewBook((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="input name-input">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="book name..."
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="input author-input">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          required
          placeholder="book author..."
          onChange={(event) => handleChange(event)}
        />
      </div>

      <div className="input topic-input">
        <label htmlFor="topic">Topic</label>
        <select
          name="topic"
          id="topic"
          required
          onChange={(event) => handleChange(event)}
        >
          <option value="Code refactoring">Code refactoring</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>
    </>
  );
}
