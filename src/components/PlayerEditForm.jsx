import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function PlayerEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState({
    playerName: "",
    img_url: "",
    yearDrafted: "",
    teamDraftedBy: "",
    rookieOfTheYear: false,
  });

  const handleTextChange = (event) => {
    setPlayer({ ...player, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setPlayer({ ...player, rookieOfTheYear: !player.rookieOfTheYear });
  };

  // Update a bookmark. Redirect to show view
  
  const updatePlayer = () => {
    console.log(`${API}/players/${id}`);

    fetch(`${API}/players/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        navigate(`/players/${id}`);
      })
      .catch((error) => console.error("catch", error));
  };

  // On page load, fill in the form with the bookmark data.

  useEffect(() => {
    fetch(`${API}/players/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setPlayer(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePlayer();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">Name:</label>
        <input
          id="playerName"
          value={player.playerName}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Player"
          required
        />
        <label htmlFor="img_url">URL:</label>
        <input
          id="img_url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={player.img_url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="yearDrafted">Draft Year:</label>
        <input
          id="yearDrafted"
          type="text"
          name="yearDrafted"
          value={player.yearDrafted}
          placeholder="number"
          onChange={handleTextChange}
        />
        <label htmlFor="teamDraftedBy">Draft Team:</label>
        <input
          id="teamDraftedBy"
          type="text"
          name="text"
          value={player.teamDraftedBy}
          onChange={handleTextChange}
          placeholder="team name"
        />
        <label htmlFor="rookieOfTheYear">Rookie Of The Year:</label>
        <textarea
          id="rookieOfTheYear"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={player.rookieOfTheYear}
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/players/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default PlayerEditForm;