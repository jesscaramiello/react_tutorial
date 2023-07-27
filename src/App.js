import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
    {value}
    </button>
    );

}




function Board({ xIsNext, squares, onPlay }) {
  
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext)
    {
    nextSquares[i] = 'X';
    }
    else
    {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  const boardRows = [0,1,2].map((rowIndex) => (
    <div key={rowIndex} className="board-row">
    {[0, 1, 2].map((colIndex) => {
      const index = rowIndex * 3 + colIndex;
      return (
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        />
      );
    })}
  </div>
));


  return (<>
  
      <div className="status">{status}</div>
      {boardRows}
    
    
  </>);
}



export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];
  const [ascending, setAscending]= useState(true);
 
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if(move===currentMove)
    {
      description = 'you are at move #' + move;
      return description
    }
    if (move > 0) {
      description = 'Go to move #' + move;
    } 
    else 
    {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  

  return (
    <div className="game">
      <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
      <ol>{moves}</ol>
      </div>
    </div>
  );
}




function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}