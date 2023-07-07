import { useEffect, useState } from "react";
import {Ant, Board} from "./models"

const initialBoardState = [-15,15,-10,10]

/**
 * Displays the current board state.
 *
 * Props:
 *  ants: Array of ants
 *  board: Board instance with dark spaces
 *
 * State:
 *  boardDims: Array [xMin,xMax,yMin,yMax] of board dimenstions
 *  canvas: reference to the canvas that is to be updated.
 *
 * @param {Array} ants
 * @param {Board} boards
 */

function DisplayBoard(ants, board) {
  const [boardDims, setBoardDims] = useState(initialBoardState);
  const [canvas, setCanvas] = useState(null);

  useEffect(function getCanvasOnMount() {
    setCanvas(document.getElementById("canvas"));
  }, [])

  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(10,10,150,100);
  }


  return (<canvas id="canvas"/>)
}

export default DisplayBoard