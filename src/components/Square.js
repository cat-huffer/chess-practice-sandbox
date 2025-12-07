/**
 * 棋盘单个格子组件
 * @param {string|null} value - 格子的值（'X', 'O' 或 null）
 * @param {Function} onSquareClick - 点击格子的回调函数
 * @param {boolean} isWinning - 是否为获胜格子
 */
export default function Square({ value, onSquareClick, isWinning }) {
  const className = isWinning ? "square winning-square" : "square";
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
