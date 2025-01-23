import { Chess } from "chess.js";
import { useCallback, useState } from "react";
import { Chessboard } from "react-chessboard";

const Game = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);

  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";

      return "Game Over!";
    }
    if (game.inCheck()) return "Check!";

    return `${game.turn() === "w" ? "white" : "Black"} to move`;
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveLog([]);
  };

  const onDrop = useCallback(
    (sourceSquare, targetSquare) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });

        if (move) {
          setGame(new Chess(game.fen()));
          const moveNotation = `${game.turn() === "w" ? "Black" : "White"}: ${
            move.san
          }`;
          setMoveLog((prev) => [...prev, moveNotation]);

          return true;
        }
      } catch (error) {
        return false;
      }

      return true;
    },
    [game]
  );

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    gap: "20px",
    flexDirection: window.innerWidth < 768 ? "column" : "row",
  };

  const boardContainerStyle = {
    flex: 2,
    maxWidth: "600px",
  };

  const moveLogStyle = {
    flex: 1,
    padding: "10px",
    color: "#D1B89F",
  };

  const moveListStyle = {
    height: "400px",
    overflowY: "auto",
    border: "1px solid #FFF5E1",
    padding: "10px",
    borderRadius: "6px",
  };

  const moveItemStyle = {
    padding: "8px",
    borderBottom: "1px solid #FFF5E1",
    backgroundColor: "#D1B89F",
    color: "#444242",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#FFD1DC",
    color: "#444242",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    marginTop: "15px",
  };

  const statusStyle = {
    fontSize: "20px",
    marginBottom: "15px",
    textAlign: "center",
    color: game.inCheck() ? "#FFD1DC" : "#D1B89F",
  };

  return (
    <div style={containerStyle}>
      <div style={boardContainerStyle}>
        <div style={statusStyle}>{getGameStatus()}</div>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
          customDarkSquareStyle={{ backgroundColor: "#D1B89F" }}
          customLightSquareStyle={{ backgroundColor: "#FFF5E1" }}
        />

        <button
          onClick={resetGame}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#F7A3B7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FFD1DC")}
        >
          Reset Game
        </button>
      </div>
      <div style={moveLogStyle}>
        <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>Move History</h2>
        <div style={moveListStyle}>
          {moveLog.length > 0 ? (
            moveLog.map((move, index) => (
              <div key={index} style={moveItemStyle}>
                {`${Math.floor(index / 2) + 1}. ${move}`}
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#D1B89F",
                fontStyle: "italic",
              }}
            >
              No moves yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
