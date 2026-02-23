import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const checkWinner = (currentBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    if (!currentBoard.includes("")) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="wrapper">
      <div className="game">
        <h2 className="title">
          {winner
            ? winner === "Draw"
              ? "It's a Draw!"
              : `Winner: ${winner}`
            : `Turn: ${isXTurn ? "X" : "O"}`}
        </h2>

        <div className="board">
          {board.map((value, index) => (
            <div
              key={index}
              className="box"
              onClick={() => handleClick(index)}
            >
              {value}
            </div>
          ))}
        </div>

        <button className="reset" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;