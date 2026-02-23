import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningPattern, setWinningPattern] = useState([]);

  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
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
      const [a,b,c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        setWinningPattern(pattern);
        return;
      }
    }
    if (!currentBoard.includes("")) setWinner("Draw");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner(null);
    setWinningPattern([]);
  };

  const getBoxClass = (index) => {
    let base = "box";
    if (board[index]) base += " animate-icon";
    if (winner && winningPattern.includes(index)) base += " winner-box";
    return base;
  };

  return (
    <div className="container">
      <div className="floating-icons">
        {Array(20).fill().map((_,i)=>(
          <span key={i} className={i%2===0?"floating-x":"floating-o"}>{i%2===0?"X":"O"}</span>
        ))}
      </div>

      <h1 className={`title ${winner?"winner-animate":""}`}>
        {winner?winner==="Draw"?"It's a Draw!":`Winner: ${winner}`:`Turn: ${isXTurn?"X":"O"}`}
      </h1>

      <div className="board">
        {board.map((value,index)=>(
          <div key={index} className={getBoxClass(index)} onClick={()=>handleClick(index)}>
            <span className={value==="X"?"x-icon":"o-icon"}>{value}</span>
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;