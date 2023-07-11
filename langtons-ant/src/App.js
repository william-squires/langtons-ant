import { useState } from "react";
import { Board } from "./models";
import DisplayBoard from "./DisplayBoard";

const testBoard = new Board(500,500,-10,10,10,-10)
testBoard.board.set([0,0], "#000")
testBoard.board.set([-10,-10], "#000")
testBoard.board.set([-10,10], "#000")
testBoard.board.set([10,-10], "#000")
testBoard.board.set([10,10], "#000")
/** Top level app component.\
 *
 * Props: None
 *
 * State:
 *  board: Board class
 */
function App() {
  const [board, setBoard] = useState(testBoard)
  return (
    <div className="App">
      <DisplayBoard board={board}></DisplayBoard>
    </div>
  );
}

export default App;
