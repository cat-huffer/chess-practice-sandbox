import { useState } from "react";

/* todo 
1.仅针对当前着手，显示“You are at move #…”而不是按钮。√
2.重写 Board 以使用两个循环来制作方块而不是对它们进行硬编码。√
3.添加一个切换按钮，使可以按升序或降序对落子的步数进行排序。
4.当有人获胜时，突出显示致使获胜的三个方块（当没有人获胜时，显示一条关于结果为平局的消息）。
5.在“落子”的历史列表中以 (row, col) 格式显示每步的位置。
*/

export default function Game() {
  //保存历史square记录
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  //目前在哪一层(索引)
  const [currentIndex, setCurrentIndex] = useState(0);
  // 顺序（true)或逆序(false)排序
  const [order, setOrder] = useState(true);
  //判断下一个是O还是X
  const xIsNext = currentIndex % 2 === 0;
  //目前要渲染哪一个版本的square
  const currentSquares = history[currentIndex].squares;

  //点击事件
  function handlePlay(nextSquares, location) {
    const newMove = { squares: nextSquares, location: location };
    const nextHistory = [...history.slice(0, currentIndex + 1), newMove];
    setHistory(nextHistory);
    setCurrentIndex(nextHistory.length - 1);
  }

  //点击按钮后跳去哪里
  function jumpTo(nextMove) {
    setCurrentIndex(nextMove);
  }

  //切换排序
  function toggleOrder() {
    setOrder(!order);
  }
  const toggleText = order ? "DESC" : "ASC";

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentIndex={currentIndex}
        />
      </div>
      <div style={{ width: "20px" }}></div>
      <button className="toggleBtn" onClick={toggleOrder}>
        {toggleText}
      </button>
      <RightList
        order={order}
        history={history}
        currentIndex={currentIndex}
        jumpTo={jumpTo}
      ></RightList>
    </div>
  );
}

function RightList({ order, history, currentIndex, jumpTo }) {
  //根据历史square加载右边的按钮
  let orderedHistory =
    order === true ? history.slice() : history.slice().reverse();
  const move = orderedHistory.map((historyItem, index) => {
    // 如果是升序 (order=true)，则 originalIndex = index
    // 如果是降序 (order=false)，则 originalIndex = history.length - 1 - index
    const originalIndex = order ? index : history.length - 1 - index;
    const location = historyItem.location;
    const descLocation =
      location !== null
        ? ` (${Math.floor(location / 3) + 1}, ${(location % 3) + 1})`
        : "";

    if (originalIndex == 0) {
      return (
        <li key={originalIndex}>
          <button onClick={() => jumpTo(originalIndex)}>
            {"Go to Game Start"}
          </button>
        </li>
      );
    } else if (originalIndex == currentIndex) {
      return <li key={originalIndex}>You are at move #{originalIndex}</li>;
    } else {
      return (
        <li key={originalIndex}>
          <button onClick={() => jumpTo(originalIndex)}>
            {"Go to Move #" + originalIndex + descLocation}
          </button>
        </li>
      );
    }
  });

  return (
    <div className="game-info">
      <ol>{move}</ol>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || calculateWinner(squares)) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : [];
  let status;
  //判断是否有赢家
  if (winner) {
    status = "Winner: " + winner;
  }
  //平局
  else if (squares.every((square) => square !== null)) {
    status = "Draw! The game is over.";
  }
  //正常状态
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardRows = [0, 1, 2]; // 表示三行

  return (
    <>
      <div className="status">{status}</div>
      {boardRows.map((row) => {
        return (
          <div className="board-row" key={row}>
            {boardRows.map((column) => {
              const key = row * 3 + column;
              const isWinningSquare = winningLine.includes(key);
              return (
                <Square
                  key={key}
                  value={squares[key]}
                  onSquareClick={() => handleClick(key)}
                  isWinning={isWinningSquare}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function Square({ value, onSquareClick, isWinning }) {
  const className = isWinning ? "square winning-square" : "square";
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}
