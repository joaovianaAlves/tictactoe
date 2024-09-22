import { useState } from "react";
import { FaX, FaO } from "react-icons/fa6";

export default function Board() {
  const [currPlayer, setCurrPlayer] = useState("O");
  const [round, setRound] = useState(0);
  const [restart, setRestart] = useState(false);
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
      <h1 className={`text-3xl font-semibold p-10`}>
        {restart
          ? winner === "Draw"
            ? "It's a Draw"
            : `${winner} Won`
          : `${currPlayer} Turn`}
      </h1>
      {board.map((row, i) => (
        <div className="flex " key={i}>
          {row.map((cell, j) => (
            <div
              className={`flex justify-center items-center mx-auto w-20 h-20 ${
                i < 2 ? "border-b-2 border-[#16423C] rounded-b-[size]" : ""
              } ${
                j < 2 ? "border-r-2 border-[#16423C] rounded-r-[size]" : ""
              } ${
                restart && winnerCells != null
                  ? winnerCells.some(([x, y]) => x === i && y === j)
                    ? "bg-green-300"
                    : ""
                  : ""
              }`}
              key={j}
            >
              <button
                className="flex w-full h-full justify-center items-center"
                disabled={restart}
                onClick={() => handleClick(i, j)}
              >
                {cell === "X" ? (
                  <FaX size={50} />
                ) : cell === "O" ? (
                  <FaO size={50} />
                ) : (
                  ""
                )}
              </button>
            </div>
          ))}
        </div>
      ))}
      {restart === true ? (
        <button
          className="bg-[#6A9C89] mt-10 px-6 py-2 rounded-lg hover:bg-[#C4DAD2]"
          onClick={() => restartGame()}
        >
          Restart
        </button>
      ) : (
        ""
      )}
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
