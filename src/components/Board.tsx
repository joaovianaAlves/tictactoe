import { useState } from "react";

export default function Board() {
  const [currPlayer, setCurrPlayer] = useState("O");
  const [round, setRound] = useState(0);
  const [restart, setRestart] = useState(false);
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const handleClick = (i?: number, j?: number) => {
    if (i === undefined || j === undefined) {
      return;
    }
    const newBoard = [...board];
    if (newBoard[i][j] !== "") {
      return;
    }
    newBoard[i][j] = currPlayer;

    const win = calculateWin(newBoard);
    if (win !== null) {
      setWinner(currPlayer);
      setRestart(true);
    } else if (newBoard.flat().every((cell) => cell !== "")) {
      setWinner("Draw");
      setRestart(true);
    }

    setBoard(newBoard);
    setRound(round + 1);
    setCurrPlayer(currPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setRound(0);
    setRestart(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-full">
      <h1>
        {restart
          ? winner === "Draw"
            ? "It's a Draw"
            : `${winner} Won`
          : currPlayer}
      </h1>
      {board.map((row, i) => (
        <div className="flex " key={i}>
          {row.map((cell, j) => (
            <div
              className={`flex justify-center items-center mx-auto w-20 h-20 ${
                i < 2 ? "border-b border-black" : ""
              } ${j < 2 ? "border-r border-black" : ""}`}
              key={j}
            >
              <button disabled={restart} onClick={() => handleClick(i, j)}>
                {cell || "-"}
              </button>
            </div>
          ))}
        </div>
      ))}
      {restart === true ? (
        <button onClick={() => restartGame()}>Restart</button>
      ) : (
        ""
      )}
    </div>
  );
}

function calculateWin(board: string[][]) {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return board[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return board[0][0];
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return board[0][2];
  }
  return null;
}
