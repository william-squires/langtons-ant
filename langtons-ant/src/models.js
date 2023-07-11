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
    this.x += instructions[0];
    this.y += instructions[1];
  }

  /**Move ant following dark square rules:
   * Rotate counterclockwise, then forward one space
   */
  moveDark() {
    this._rotateCCW();
    const instructions = this.facings[this.facing];
    this.x += instructions[0];
    this.y += instructions[1];
  }
}

/** A board for langton's ant. Keeps track of ants and the state of the board
 *
 * board: Mapping of all dark spaces on the board in the format:
 *  {'x,y': 'color',...}
 * ants: array of all ants currently in play.
 * xMax, xMin, yMax, yMin: Measure the greatest dimensions the board has filled
 * boardWidth, boardHeight: Measure how wide and tall the board is.
 * canvasWidth, canvasHeight: Measure how big the associated canvas is.
 */
class Board {
  board = new Map();
  ants = []
  xMax = 0;
  xMin = 0;
  yMax = 0;
  yMin = 0;
  boardWidth = 0;
  boardHeight = 0;
  canvasWidth = 0;
  canvasHeight = 0;
  squareSize = 0;

  /** Sets up a board
   *
   * @param {number} canvasWidth width of associated canvas
   * @param {number} canvasHeight height of associated canvas
   * @param {number} xMax greatest x of coordinate system. default 0
   * @param {number} xMin smallest x of coordinate system. default 0
   * @param {number} yMax greatest y of coordinate system. default 0
   * @param {number} yMin smallest y of coordinate system. default 0
   */
  constructor(canvasWidth, canvasHeight,
     xMin = 0, xMax = 0, yMax = 0, yMin = 0) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.xMax = xMax;
      this.xMin = xMin;
      this.yMax = yMax;
      this.yMin = yMin;
      this.boardWidth = Math.abs(this.xMin) + Math.abs(this.xMax) + 1;
      this.boardHeight = Math.abs(this.yMin) + Math.abs(this.yMax) + 1;
      this.updateBoardBounds(xMin, yMax) //get bounds by updating far corners
      this.updateBoardBounds(xMax, yMin)
      this.updateSquareSize()
      console.log(this.squareSize)
  }
  /**
   * Given an x coordinate, y coordinate, and color, toggles a dark space on
   * the board. If adding a dark space, also apply the given color.
   * Updates board boundaries.
   * Returns undefined.
   */
  toggleDarkSpace(x, y, color) {
    this.updateBoardBounds(x, y);
    const coordString = `${x},${y}`;
    if (this.board.has(coordString)) {
      this.board.delete(coordString);
    } else {
      this.board.set(coordString, color);
    }
  }

  /**
   * Given an x and y coordinate, if the coordinate is bigger or smaller than
   * the current bounds, update the bounds.
   *
   * If the bounds have changed, returns true. Otherwise false.
   *
   * @param {number} x The x coordinate to check against
   * @param {number} y The y coordinate to check against
   */
  updateBoardBounds(x, y) {
    let hasChanged = false;
    if (x > this.xMax) {
      this.xMax = x;
      hasChanged = true;
    }
    if (x < this.xMin) {
      this.xMin = x;
      hasChanged = true;
    }
    if (y > this.yMax) {
      this.yMax = x;
      hasChanged = true;
    }
    if (y < this.yMin) {
      this.yMin = y;
      hasChanged = true;
    }
    if (hasChanged) {
      this.boardWidth = Math.abs(this.xMin) + Math.abs(this.xMax) + 1;
      this.boardHeight = Math.abs(this.yMin) + Math.abs(this.yMax) + 1;
      console.log("pee", this.boardWidth, this.boardHeight)
    }
    return hasChanged;
  }

  /**
   * Updates the size of canvas squares
   */
  updateSquareSize() {
    this.squareSize = (this.canvasWidth / this.boardWidth <=
     this.canvasHeight / this.boardHeight)
     ? Math.floor(this.canvasWidth / this.boardWidth)
     : Math.floor(this.canvasHeight/ this.boardHeight)
  }

  /**
   * Transforms xy coordinates from the board into pixel coordinates on a canvas.
   *
   * A canvas has an origin (0,0) in the top left corner.
   * Increasing x moves right and increasing y moves down.
   *
   * If the coordinates are out of the board's bounds, throws an error
   *
   * @param {number} x The x coordinate to be transformed
   * @param {number} y The y coordinate to be transformed
   * @param {number} canvasWidth The pixel width of the canvas
   * @param {number} canvasHeight The pixel height of the canvas
   *
   * Returns [x,y]
   */
  transformCoordinates(x, y) {
    //throw error if x or y out of bounds
    const xPixels = Math.abs(this.xMin - x) * this.squareSize
    const yPixels = Math.abs(this.yMax - y) * this.squareSize

    return[xPixels,yPixels]
  }

  /** Prints a text representation of the board.
   * Underscores represent empty spaces.
   * Lowercase letters represent colored spaces.
   * Optionally takes boundary variables to print a larger or smaller board
   * Ex) print(0,2,0,2) on a board with red on 1,1 and green on 2,2:
   *  __g
   *  _r_
   *  ___
   */
  print(smallX = this.xMin,
    bigX = this.xMax,
    smallY = this.yMin,
    bigY = this.yMax) {
    for (let y = bigY; y >= smallY; y--) {
      let line = "";
      for (let x = smallX; x <= bigX; x++) {
        if (this.board.has(`${x},${y}`)) {
          line += this.board.get(`${x},${y}`);
        }
        else {
          line += '_';
        }
      }
      console.log(line);
    }
  }
}


export { Ant, Board };