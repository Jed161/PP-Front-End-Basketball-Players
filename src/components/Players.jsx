import { useState, useEffect } from "react";
import Player from "./Player";

const API = import.meta.env.VITE_API_URL;

function Players() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch(`${API}/players`)
      .then(response => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        setPlayers(responseJSON.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="Players">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>Check this player</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              return <Player key={player.id} player={player} />;
            })};
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Players;