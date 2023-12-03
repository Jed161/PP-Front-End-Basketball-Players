import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";
const API = import.meta.env.VITE_API_URL

function PlayerDetails() {
  const [player, setPlayer] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API}/players/${id}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      setPlayer(responseJSON)
    })
    .catch(error => console.log(error))
  }, [id, API])

  const handleDelete = () => {
    deletePlayer()
  }

  const deletePlayer = () => {
    const httpOptions = { method: "DELETE" }
    fetch(`${API}/players/${id}`, httpOptions)
    .then(() => navigate(`/players`))
    .catch(error => console.log(error))
  }
  return (
    <article>
      <h3>{true ? <span>⭐️</span> : null}</h3>
      <h5>
        <span>
          <a href={player.img_url}>{player.playerName}</a>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp; {player.img_url}
      </h5>
      <h6>{player.yearDrafted}</h6>
      <p>{player.teamDraftedBy}</p>
      <div className="showNavigation">
        <div>
          <Link to={`/players`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/players/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <Reviews />
    </article>
  );
};

export default PlayerDetails;