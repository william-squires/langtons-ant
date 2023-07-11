import { useState } from "react";
import { Board } from "./models";
import DisplayBoard from "./DisplayBoard";
/** Top level app component.\
 *
 * Props: None
 *
 * State:
 *  board: Board class
 */
function App() {
  const [board, setBoard] = useState(new Board(1000,1000,-10,10,10,-10))
  return (
    <div className="App">
      <DisplayBoard board={board}></DisplayBoard>
    </div>
  );
}

export default App;
