import Square from "./Square";
import { calculateWinner } from "../utils/gameUtils";
import { BOARD_SIZE } from "../constants/gameConstants";

/**
 * 棋盘组件
 * @param {boolean} xIsNext - 下一个玩家是否为 X
 * @param {Array<string|null>} squares - 当前棋盘状态
 * @param {Function} onPlay - 处理落子的回调函数
 * @param {number} currentIndex - 当前历史记录的索引
 */
export default function Board({ xIsNext, squares, onPlay, currentIndex }) {
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

  // 判断是否有赢家
  if (winner) {
    status = "Winner: " + winner;
  }
  // 平局
  else if (squares.every((square) => square !== null)) {
    status = "Draw! The game is over.";
  }
  // 正常状态
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardRows = Array.from({ length: BOARD_SIZE }, (_, i) => i);

  return (
    <>
      <div className="status">{status}</div>
      {boardRows.map((row) => {
        return (
          <div className="board-row" key={row}>
            {boardRows.map((column) => {
              const key = row * BOARD_SIZE + column;
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
