/**
 * An ant for Langton's Ant. Keeps track of the ant's position
 */
class Ant {
  name = "";
  color = "black";
  x = 0;
  y = 0;
  facing = 0;
  //Directions the ant can face:
  // 0 : right
  // 1 : down
  // 2 : left
  // 3 : up
  facings = [[1, 0], [0, -1], [-1, 0], [0, 1]];

  /** Make a new ant.
   * name: ant's name
   * color: ant's color. also the color of dark spaces it makes
   * x, y: ant's coordinates
   * facing: direction ant is facing.
   */
  constructor(name = "", color = "black", x = 0, y = 0, facing = 0) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.facing = facing;
  }

  /**Rotates ant clockwise */
  _rotateCW() {
    this.facing = (this.facing < 3) ? this.facing + 1 : 0;
  }

  /**Rotates ant counterclockwise */
  _rotateCCW() {
    this.facing = (this.facing > 0) ? this.facing - 1 : 3;
  }

  /**Move ant following light square rules:
   * Rotate clockwise, then move forward 1 space.
   */
  moveLight() {
    this._rotateCW();
    const instructions = this.facings[this.facing];
    this.x += instructions[0]
    this.y += instructions[1]
  }

  /**Move ant following dark square rules:
   * Rotate counterclockwise, then forward one space
   */
  moveDark() {
    this._rotateCCW();
    const instructions = this.facings[this.facing];
    this.x += instructions[0]
    this.y += instructions[1]
  }
}

/** Keeps track of dark spaces on the playing board.
 * The spaces are stored in a map with a key of stringified x and y coordinates
 * and a value of the space's color.
 * Ex) A red spaces at x=1, y=2 looks like "1,2": "red"
*/
class Board {
  board = new Map();

  /**
   * Given an x coordinate, y coordinate, and color, toggles a dark space on
   * the board. If adding a dark space, also apply the given color.
   * Returns undefined.
   */
  toggleDarkSpace(x, y, color) {
    const coordString = `${x},${y}`

    if (this.board.has(coordString)) {
      this.board.delete(coordString)
    } else {
      this.board.set(coordString, color)
    }
  }
}


export {Ant, Board};