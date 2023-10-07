export function AddBookForm({ setNewBook }) {
  function handleChange(event) {
    const key = event.target.getAttribute('id');
    const { value } = event.target;

    setNewBook((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="input name-input">
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="book name..."
            onChange={(event) => handleChange(event)}
          />
        </label>
      </div>

      <div className="input author-input">
        <label htmlFor="author">
          Author
          <input
            type="text"
            id="author"
            name="author"
            required
            placeholder="book author..."
            onChange={(event) => handleChange(event)}
          />
        </label>
      </div>

      <div className="input topic-input">
        <label htmlFor="topic">
          Topic
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
        </label>
      </div>
    </>
  );
}
