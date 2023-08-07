class Game {
  constructor(engine, gameInterface, snake, state) {
    this.engine = engine
    this.gameInterface = gameInterface
    this.snake = snake
    this.state = state
  }

  gameLoop() {
    try {
      this.snake.moveSnake()

      if (this.engine.checkCollision(this.state)) {
        this.gameInterface.gameOver()
        return
      }

      this.snake.makeFood()
      this.snake.drawFood()
      this.snake.drawSnake()
      this.snake.removeExpiredFood()
    } catch (error) {
        console.log(this)
        console.log(error)
        this.gameInterface.gameOver()
    }
  }

  start() {
    this.gameInterface.setGameLoop(this.gameLoop.bind(this))
    this.gameInterface.init()
  }
}

export default Game
