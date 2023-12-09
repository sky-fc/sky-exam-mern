import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RandomNote = () => {
  const location = useLocation();
  const { notes } = location.state || {};
  const randomIndex = Math.floor(Math.random() * (notes?.length || 0));
  const randomNote = notes ? notes[randomIndex] : null;
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h1>Note Wall</h1>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go Back Home
          </button>
          <p>Random Note</p>
          <hr className="my-4" />
          <div>
            {randomNote && (
              <div key={randomNote._id} className="note">
                <h2>{randomNote.title}</h2>
                <p>{randomNote.body}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomNote;
