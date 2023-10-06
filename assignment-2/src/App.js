import Layout from "./component/Layout";
import Button from "./component/Button";
import SearchBox from "./component/SearchBox";
import BookTable from "./component/BookTable";
import { useState } from "react";
import { AddBookModal } from "./component/AddBookModal";

export default function App() {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <Layout>
      <section className="homepage book-actions">
        <SearchBox />
        <Button
          text="Add book"
          variant="main-button"
          onClick={() => setIsShowModal(true)}
        />
      </section>

      <section className="homepage book-table">
        <BookTable />
      </section>

      <AddBookModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </Layout>
  );
}
