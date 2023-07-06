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


export default Ant;