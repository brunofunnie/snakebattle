import gameState from "./state.js"

const basicInput = (event) => {
  let key = event.code

  if (key === "ArrowLeft") {
    if (gameState.snakeDirection.dx != 1) {
      gameState.snakeDirection.dx = -1
      gameState.snakeDirection.dy = 0
    }
  } else if (key === "ArrowUp") {
    if (gameState.snakeDirection.dy != 1) {
      gameState.snakeDirection.dx = 0
      gameState.snakeDirection.dy = -1
    }
  } else if (key === "ArrowRight") {
    if (gameState.snakeDirection.dx != -1) {
      gameState.snakeDirection.dx = 1
      gameState.snakeDirection.dy = 0
    }
  } else if (key === "ArrowDown") {
    if (gameState.snakeDirection.dy != -1) {
      gameState.snakeDirection.dx = 0
      gameState.snakeDirection.dy = 1
    }
  } else if (key === "KeyA") {
    drawLaser()
  }
}

export default { basicInput }

