import { useEffect, useState } from "react";
import { Ant, Board } from "./models";


/**
 * Displays the current board state.
 *
 * Props:
 *  ants: Array of ants
 *  board: Board instance with dark spaces
 *
 * State:
 *  canvas: reference to the canvas that is to be updated.
 *
 * @param {Board} board
 */

function DisplayBoard({board}) {
  const [canvas, setCanvas] = useState(null);

  useEffect(function getCanvasOnMount() {
    setCanvas(document.getElementById("canvas"));
  }, []);

  if (canvas) {
    const ctx = canvas.getContext("2d");

    for (const [coordinates, color] of board.board.entries()) {
      console.log(`${coordinates}, ${color}`)
      const coords = board.transformCoordinates(coordinates[0],coordinates[1])
      console.log(coords[0], coords[1])
      const squareSize = board.squareSize
      ctx.fillStyle = color
      ctx.fillRect(coords[0], coords[1],squareSize, squareSize)
    }

    // ctx.lineWidth= 2
    // let numVerticalLines = Math.abs(boardDims[0]) + Math.abs(boardDims[1]) + 1
    // let numHorizontalLines = Math.abs(boardDims[2]) + Math.abs(boardDims[3]) + 1
    // for (let i = 0; i <= numHorizontalLines; i++) {
    //   ctx.beginPath()
    //   ctx.moveTo(0, 1000/numHorizontalLines*i)
    //   ctx.lineTo(1000, 1000/numHorizontalLines*i)
    //   ctx.stroke()
    // }
    // for (let i = 0; i <= numVerticalLines; i++) {
    //   ctx.beginPath()
    //   ctx.moveTo(1000/numVerticalLines*i, 0)
    //   ctx.lineTo(1000/numVerticalLines*i, 1000)
    //   ctx.stroke()
    // }
    // ctx.rect(1000/numVerticalLines*5,1000/numHorizontalLines*5,1000/numHorizontalLines,1000/numVerticalLines)
    // ctx.fill()
  }


  return (
    <div style={{border: "1px solid red"}}>
      <canvas
        id="canvas"
        width={`${board.canvasWidth}px`}
        height={`${board.canvasHeight}px`}
      />
    </div>
  );
}

export default DisplayBoard;