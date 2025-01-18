import { useEffect, useState } from "react";
import "../styles/Registration.scss";
import Loading from "./Loading";
import Game from "./Game";

export default function Registration() {
  const [players, setPlayer] = useState([]);
  const [allSubmitted, setAllSubmitted] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const addPlayer = (player) => {
    setPlayer((prev) => {
      const updatedPlayers = [...prev, player];
      if (updatedPlayers.length === 2) {
        setAllSubmitted(true);
      }
      return updatedPlayers;
    });
  };

  useEffect(() => {
    if (allSubmitted) {
      const timer = setTimeout(() => {
        setShowGame(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [allSubmitted]);

  if (showGame) {
    return <Game players={players} />;
  }

  return allSubmitted ? (
    <Loading />
  ) : (
    <div className="registrationContainer">
      <p>Happy to see you on ChessiHub! 😊</p>
      <p>Each player, please fill out and submit your respective form below.</p>
      <div className="formsContainer">
        <Form playerNum={1} players={players} addplayer={addPlayer} />
        <Form playerNum={2} players={players} addplayer={addPlayer} />
      </div>
    </div>
  );
}

function Form({ playerNum, players, addplayer }) {
  const [name, setName] = useState("");
  const [pieceColor, setPieceColor] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (players.some((player) => player.name === name)) {
      alert("This name already exists. Please enter a different name.");
      return;
    }

    if (players.some((player) => player.pieceColor === pieceColor)) {
      alert(
        "This peice color is already selected. Please choose the other color."
      );
      return;
    }

    addplayer({ id: playerNum, name, pieceColor });
    setIsSubmitted(true);
  };

  return (
    <div
      className="formContainer"
      style={{ backgroundColor: isSubmitted ? "#C6E6C3" : "#D1B89F" }}
    >
      <p>Player {playerNum}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Choose Your Piece Color:</label>
          <select
            required
            value={pieceColor}
            onChange={(e) => setPieceColor(e.target.value)}
          >
            <option value="">--Chosse--</option>
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitted}>
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </form>
    </div>
  );
}
