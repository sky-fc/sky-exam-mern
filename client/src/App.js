import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddNote from "./components/AddNote";
import UpdateNote from "./components/UpdateNote";
// import DeleteNote from "./components/DeleteNote";
import RandomNote from "./components/RandomNote";

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard notes={notes} />} />
          <Route path="/write-note" element={<AddNote setNotes={setNotes} />} />
          <Route path="/update-note/:id" element={<UpdateNote />} />
          <Route path="/random-note" element={<RandomNote notes={notes} />} />
          {/* <Route
            path="/delete-note/:id"
            element={<DeleteNote setNotes={setNotes} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
