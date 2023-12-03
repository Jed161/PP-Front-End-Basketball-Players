import { Link } from "react-router-dom";

function Bookmark({player }) {
  return (
    <tr>
      <td>
        {player.rookieOfTheYear ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )};
      </td>
    <td style={{ cursor: "alias" }}>
        <a href={player.img_url} target="_blank" rel="noreferrer">
          {player.playerName}
        </a>
      </td>
      <td>
        <Link to={`/players/${player.id}`}>✏️</Link>
      </td>
    </tr>
  );
};

export default Bookmark;