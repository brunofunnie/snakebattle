export default {
  running: null,
  start(gameLoop) {
    this.gameOver = false
    this.running = setInterval(gameLoop, 50)
  },
  end() {
    this.gameOver = true
    clearInterval(this.running)
  },
  isGameOver() {
    return this.gameOver
  },
  reset() {
    this.points = 0,
    this.snakeState = [
      { x: 8, y: 1 },
      { x: 7, y: 1 },
      { x: 6, y: 1 },
      { x: 5, y: 1 },
      { x: 4, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ],
    this.snakeDirection = {
      dx: 1,
      dy: 0,
    }
    this.food = []
  },
  gameOver: false,
  points: 0,
  snakeState: [
    { x: 8, y: 1 },
    { x: 7, y: 1 },
    { x: 6, y: 1 },
    { x: 5, y: 1 },
    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ],
  snakeDirection: {
    dx: 1,
    dy: 0,
  },
  food: [],
  laser: [],
  lasers: [],
  numFood: 5,
  foodDuration: 5000,
}
