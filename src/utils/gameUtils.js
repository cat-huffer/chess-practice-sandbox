import { WINNING_LINES } from "../constants/gameConstants";

/**
 * 计算游戏是否有获胜者
 * @param {Array<string|null>} squares - 棋盘状态数组
 * @returns {Object|null} 返回获胜者和获胜线路，如果没有获胜者则返回 null
 */
export function calculateWinner(squares) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }
  return null;
}
