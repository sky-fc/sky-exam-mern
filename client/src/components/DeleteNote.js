import axios from 'axios';
import React from 'react';

const DeleteNote = ({ setNotes, id }) => {
  const handleNoteDelete = () => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}`)
      .then(() => {
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  return (
    <button onClick={handleNoteDelete}>Delete Note</button>
  );
};

export default DeleteNote;
