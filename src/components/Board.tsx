import { useState } from "react";
import { FaX, FaO } from "react-icons/fa6";

export default function Board() {
  const [currPlayer, setCurrPlayer] = useState("O");
  const [restart, setRestart] = useState(false);
  const [restartAnimation, setRestartAnimation] = useState(false);
  const [winner, setWinner] = useState("");
  const [winnerCells, setWinnerCells] = useState<number[][] | null>(null);
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
    console.log("Winning cells:", win ? win.cells : null);
    if (win) {
      setWinner(currPlayer);
      setRestart(true);
      setWinnerCells(win.cells);
    } else if (newBoard.flat().every((cell) => cell !== "")) {
      setWinnerCells(null);
      setRestart(true);
      setWinner("Draw");
    }

    setBoard(newBoard);
    setCurrPlayer(currPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setRestartAnimation(true);
    setTimeout(() => {
      setBoard([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
      setRestart(false);
      setWinner("");
      setWinnerCells(null);
      setRestartAnimation(false);
    }, 300);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center mx-auto h-full `}
    >
      <h1 className={`text-4xl font-semibold p-10`}>
        {restart ? (
          winner === "Draw" ? (
            "It's a Draw"
          ) : (
            <div className={`flex gap-2 `}>
              <span
                className={`${
                  currPlayer == "O" ? "text-[#134B70]" : "text-[#508C9B]"
                }`}
              >
                {winner}
              </span>
              <span className="">Won</span>
            </div>
          )
        ) : (
          <div className="flex gap-2">
            <span
              className={`${
                currPlayer == "O" ? "text-[#134B70]" : "text-[#134B70]"
              }`}
            >
              {currPlayer}
            </span>
            <span className="">Turn</span>
          </div>
        )}
      </h1>
      {board.map((row, i) => (
        <div className="flex " key={i}>
          {row.map((cell, j) => (
            <div
              className={`flex justify-center items-center mx-auto w-28 h-28 
        ${i < 2 ? "border-b-2 border-[#181C14] rounded-b-[size]" : ""}
        ${j < 2 ? "border-r-2 border-[#181C14] rounded-r-[size]" : ""}
        ${
          restart && winnerCells != null
            ? winnerCells.some(([x, y]) => x === i && y === j)
              ? "bg-green-200"
              : ""
            : ""
        }
        transition-all duration-300 ease-in-out`}
              key={j}
            >
              <button
                className={`flex w-full h-full justify-center items-center ${
                  restartAnimation ? "animate-disappear" : ""
                }`}
                disabled={restart}
                onClick={() => handleClick(i, j)}
              >
                {cell === "X" ? (
                  <FaX color="#134B70" size={80} className="animate-appear" />
                ) : cell === "O" ? (
                  <FaO color="#508C9B" size={80} className="animate-appear" />
                ) : (
                  ""
                )}
              </button>
            </div>
          ))}
        </div>
      ))}
      {restart ? (
        <button
          className="font-semibold bg-[#508C9B] mt-10 px-8 py-3 rounded-lg hover:bg-[#134B70] text-white shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            restartGame();
          }}
        >
          Restart
        </button>
      ) : null}
    </div>
  );
}

function calculateWin(board: string[][]) {
  let winnnerCells: number[][] = [];
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      winnnerCells = [
        [i, 0],
        [i, 1],
        [i, 2],
      ];
      return { board: board[i][0], cells: winnnerCells };
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      winnnerCells = [
        [0, i],
        [1, i],
        [2, i],
      ];
      return { board: board[0][i], cells: winnnerCells };
    }
  }
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    winnnerCells = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    return { board: board[0][0], cells: winnnerCells };
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    winnnerCells = [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
    return { board: board[0][2], cells: winnnerCells };
  }

  return null;
}
