import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNote = ({ setNotes }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({ title: "", body: "" });
  const navigate = useNavigate();

  const handleNoteSubmit = (e) => {
    e.preventDefault();

    setErrors({ title: "", body: "" });

    if (!title || title.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title must be at least 2 characters",
      }));
      return;
    }

    if (body.length > 255) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        body: "Body must not exceed 255 characters",
      }));
      return;
    }

    axios
      .post("http://localhost:8000/api/notes", { title, body })
      .then((response) => {
        const newNote = response?.data;
        if (newNote) {
          setNotes((prevNotes) => [...prevNotes, newNote]);
          setErrors({ title: "", body: "" });
          navigate("/");
        } else {
          setErrors({
            title: "Failed to create a note",
            body: "Failed to create a note",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating a note:", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h1>Write Notes</h1>
          <button onClick={() => navigate("/")}>Go Back Home</button>
          <p>Write a new note!</p>
          <form onSubmit={handleNoteSubmit}>
            <div className="form-group">
              <label htmlFor="title">Note Title</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {errors.title && <p>{errors.title}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="body">Note Body</label>
              <textarea
                className="form-control"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
              {errors.body && <p>{errors.body}</p>}
            </div>
            <button className="btn btn-primary" type="submit">
              Write this note!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
