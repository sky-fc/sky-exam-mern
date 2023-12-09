import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [notesList, setNotesList] = useState([]); // New state for storing notes list

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/notes")
      .then((response) => {
        setNotesList(response.data);

        axios
          .get(`http://localhost:8000/api/notes/${id}`)
          .then((response) => {
            setTitle(response.data.title);
            setBody(response.data.body);
          })
          .catch((err) => {
            console.error("Error fetching note:", err);
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, [id, navigate]);

  const isTitleModified = (newTitle) => {
    return newTitle !== title;
  };

  const isTitleUnique = (newTitle) => {
    if (!notesList.length) {
      return true; 
    }
    return !notesList.some(
      (note) => note.title === newTitle && note._id !== id
    );
  };

  const handleNoteUpdate = (e) => {
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

    if (isTitleModified(title) && !isTitleUnique(title)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title must be unique",
      }));
      return;
    }

    axios
      .put(`http://localhost:8000/api/notes/${id}`, { title, body })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating note:", err);
      });
  };

  const handleNoteDelete = () => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h1>Edit Note</h1>
          <button onClick={() => navigate("/")}>Go Back Home</button>
          <form onSubmit={handleNoteUpdate}>
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
              Edit Note
            </button>
            <button className="btn btn-danger" onClick={handleNoteDelete}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
