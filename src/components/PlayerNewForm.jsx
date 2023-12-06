import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function PlayerNewForm() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState({
    playerName: "",
    img_url: "",
    yearDrafted: "",
    teamDraftedBy: "",
    rookieOfTheYear: false,
  });

  // Add a player. Redirect to the index view.

  const addPlayer = () => {
    fetch(`${API}/players`, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/players`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setPlayer({ ...player, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setPlayer({ ...player, rookieOfTheYear: !player.rookieOfTheYear });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPlayer();
  };

  return (
    <div className="New">
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
          id="cyearDrafted"
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
          onChange={handleTextChange}
          placeholder="team name"
        />
        <label htmlFor="rookieOfTheYear">Rookie Of The Year:</label>
        <textarea
          id="rookieOfTheYear"
          type="checkbox"
          value={bookmark.description}
          onChange={handleCheckboxChange}
          checked={player.rookieOfTheYear}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default PlayerNewForm;