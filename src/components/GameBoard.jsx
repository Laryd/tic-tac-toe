import React, { useState } from "react";
// const gameBoard = [
//   ["X", "2", "3"],
//   ["4", "5", "6"],
//   ["7", "8", "9"],
// ];

const GameBoard = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  const WinnerChecker = (squares) => {
    let posibWin = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 5],
      ],
    };
    for (let combo in posibWin) {
      posibWin[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          console.log(pattern[0]);
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };
  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };
  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }
    let squares = [...cells];
    if (turn === "X") {
      squares[num] = "O";
      setTurn("O");
    } else {
      squares[num] = "X";
      setTurn("X");
    }
    WinnerChecker(squares);
    setCells(squares);
  };
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className="container">
      <table>
        Turn: {turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} className="vert" />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} className="hori" />
            <Cell num={4} className="vert hori" />
            <Cell num={5} className="hori" />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} className="vert" />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <p>{winner} is the winner!</p>
          <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default GameBoard;
