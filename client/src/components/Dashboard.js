import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const sortByOldest = () => {
    const sortedNotes = [...notes].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setNotes(sortedNotes);
  };

  const sortByNewest = () => {
    const sortedNotes = [...notes].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setNotes(sortedNotes);
  };

  const getRandomNote = () => {
    navigate("/random-note", { state: { notes } }); 
  };

  const getUpdateNote = (id) => {
    navigate(`/update-note/${id}`);
  };

  // const handleNoteDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:8000/api/notes/${id}`)
  //     .then(() => {
  //       setNotes(notes.filter((note) => note.noteId !== id));
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting note:", error);
  //     });
  // };

  console.log(notes);
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h1>Note Wall</h1>
          <Link to="/write-note" className="btn btn-primary">
            Write Note
          </Link>
          <p>Leave a note</p>
          <button onClick={sortByOldest} className="btn btn-secondary">
            Sort by Oldest
          </button>
          <button onClick={sortByNewest} className="btn btn-secondary">
            Sort by Newest
          </button>
          <hr className="my-4" />

          <div>
            {notes.map((note) => (
              <div key={note._id} className="note">
                <h2>{note.title}</h2>
                <p>{note.body}</p>
                <div>
                  <button
                    onClick={() => getUpdateNote(note._id)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  {/* <button onClick={() => handleNoteDelete(note.id)}>Delete</button> */}
                </div>
              </div>
            ))}
          </div>

          <button onClick={getRandomNote} className="btn btn-secondary">
            Random Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
