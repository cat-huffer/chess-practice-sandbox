/**
 * 历史记录列表组件
 * @param {boolean} order - 排序顺序（true 为升序，false 为降序）
 * @param {Array} history - 历史记录数组
 * @param {number} currentIndex - 当前历史记录的索引
 * @param {Function} jumpTo - 跳转到指定历史记录的回调函数
 */
export default function MoveHistory({ order, history, currentIndex, jumpTo }) {
  // 根据排序顺序处理历史记录
  let orderedHistory =
    order === true ? history.slice() : history.slice().reverse();

  const moves = orderedHistory.map((historyItem, index) => {
    // 如果是升序 (order=true)，则 originalIndex = index
    // 如果是降序 (order=false)，则 originalIndex = history.length - 1 - index
    const originalIndex = order ? index : history.length - 1 - index;
    const location = historyItem.location;
    const descLocation =
      location !== null
        ? ` (${Math.floor(location / 3) + 1}, ${(location % 3) + 1})`
        : "";

    if (originalIndex === 0) {
      return (
        <li key={originalIndex}>
          <button onClick={() => jumpTo(originalIndex)}>
            {"Go to Game Start"}
          </button>
        </li>
      );
    } else if (originalIndex === currentIndex) {
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
      <ol>{moves}</ol>
    </div>
  );
}
