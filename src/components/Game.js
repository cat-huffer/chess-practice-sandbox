import { useState } from "react";
import Board from "./Board";
import MoveHistory from "./MoveHistory";

/**
 * 游戏主组件
 */
export default function Game() {
  // 保存历史square记录
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  // 目前在哪一层(索引)
  const [currentIndex, setCurrentIndex] = useState(0);
  // 顺序（true)或逆序(false)排序
  const [order, setOrder] = useState(true);
  // 判断下一个是O还是X
  const xIsNext = currentIndex % 2 === 0;
  // 目前要渲染哪一个版本的square
  const currentSquares = history[currentIndex].squares;

  // 点击事件
  function handlePlay(nextSquares, location) {
    const newMove = { squares: nextSquares, location: location };
    const nextHistory = [...history.slice(0, currentIndex + 1), newMove];
    setHistory(nextHistory);
    setCurrentIndex(nextHistory.length - 1);
  }

  // 点击按钮后跳去哪里
  function jumpTo(nextMove) {
    setCurrentIndex(nextMove);
  }

  // 切换排序
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
      <MoveHistory
        order={order}
        history={history}
        currentIndex={currentIndex}
        jumpTo={jumpTo}
      />
    </div>
  );
}
