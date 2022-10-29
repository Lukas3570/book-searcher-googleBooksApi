import axios from "axios";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyAw4SEz1w0qv41CX-7rvK47ir8wUS9MPB8"
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          ":keyes&key=" +
          apiKey+"&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            className="form-control mt-2"
            placeholder="Ex: Javascript"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>

        {result.map((book) => (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        ))}
    </div>
  );
}
