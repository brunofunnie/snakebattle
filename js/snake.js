import { findObjectsWithCoordinates } from './utils.js'

class Snake {

  constructor(engine, gameInterface, settings, assets, state) {
    this.engine = engine
    this.gameInterface = gameInterface
    this.settings = settings
    this.assets = assets
    this.state = state
  }

  removeExpiredFood() {
    let currentTime = Date.now()

    for (let i = 0; i < this.state.food.length; i++) {
      if (currentTime - this.state.food[i].timestamp > this.state.foodDuration) {
        this.engine.clearBlock(this.state.food[i])
        this.state.food.splice(i, 1)
      }
    }
  }

  makeFood() {
    if (this.state.food.length === 0) {
      for (let i = 0; i < this.state.numFood; i++) {
        console.log('Engine Width', this.engine.width)
        console.log('Engine Height', this.engine.height)
        let foodItem = {
          x: Math.floor(Math.random() * this.engine.width),
          y: Math.floor(Math.random() * this.engine.height),
          timestamp: Date.now(),
          draw: false,
        };
        this.state.food.push(foodItem)
      }
    }
  }

  drawFood() {
    this.engine.canvas_context.fillStyle = this.settings.foodColor

    this.state.food.forEach((foodItem) => {
      if (!foodItem.draw) {
        foodItem.draw = true;
        this.engine.drawImage(foodItem, this.assets.apple)
      }
    });
  }

  drawSnake() {
    const engine = this.engine
    const settings = this.settings

    this.state.snakeState.forEach(function (block, index) {
      if (index % 2 === 0) engine.canvas_context.fillStyle = settings.snakeColorPrimary
      else engine.canvas_context.fillStyle = settings.snakeColorSecondary

      engine.drawBlock(block)
    });
  }

  doEat(position) {
    let foodItem = findObjectsWithCoordinates(
      this.state.food,
      position.x,
      position.y
    );

    if (foodItem) {
      this.engine.clearBlock(foodItem)
      this.gameInterface.scorePoint()
    }
  }

  moveSnake() {
    // Cria um novo bloco na frente da cobra
    const head = {
      x: this.state.snakeState[0].x + this.state.snakeDirection.dx,
      y: this.state.snakeState[0].y + this.state.snakeDirection.dy,
    };

    this.state.snakeState.unshift(head)

    // Remove o último bloco da cobra
    var rabo = this.state.snakeState[this.state.snakeState.length - 1]
    this.engine.clearBlock(rabo)
    this.state.snakeState.pop()
    this.doEat(head)
  }

  drawLaser() {
    let xsnake = this.state.snakeState[0].x
    let ysnake = this.state.snakeState[0].y
    let directionX = this.state.snakeDirection.dx
    let directionY = this.state.snakeDirection.dy
    let index = 0
    let intervalLaser = setInterval(() => {
      let laserPosition = {
        x: xsnake + directionX * index,
        y: ysnake + directionY * index,
      }

      this.state.laser.unshift(laserPosition)
      this.engine.canvas_context.fillStyle = "red"

      let previousLaserPos = {
        x: laserPosition.x - directionX,
        y: laserPosition.y - directionY,
      }

      this.engine.drawBlock(laserposition)
      this.engine.clearBlock(previousLaserPos)

      index++
    }, 5)

    this.state.lasers.push(intervalLaser)
  }
}

export default Snake