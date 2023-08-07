class Engine {

  constructor(canvas_element) {
    this.canvas = document.querySelector(canvas_element)
    this.canvas_context = this.canvas.getContext("2d")
    this.block_size = 15
    this.width = this.canvas.width / this.block_size
    this.height = this.canvas.height / this.block_size
  }

  drawBlock(position) {
    this.canvas_context.fillRect(
      position.x * this.block_size,
      position.y * this.block_size,
      this.block_size,
      this.block_size
    )
  }

  drawImage(position, asset) {
    this.canvas_context.drawImage(
      asset,
      position.x * this.block_size,
      position.y * this.block_size,
      this.block_size,
      this.block_size
    )
  }

  clearBlock(position) {
    this.canvas_context.clearRect(
      position.x * this.block_size,
      position.y * this.block_size,
      this.block_size,
      this.block_size
    )
  }

  clearCanvas() {
    this.canvas_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkCollision(state) {
    if (
      state.snakeState[0].x < 0 ||
      state.snakeState[0].x >= this.width ||
      state.snakeState[0].y < 0 ||
      state.snakeState[0].y >= this.height
    ) {
      return true;
    }

    for (let i = 1; i < state.snakeState.length; i++) {
      if (
        state.snakeState[i].x === state.snakeState[0].x &&
        state.snakeState[i].y === state.snakeState[0].y
      ) {
        return true;
      }
    }

    return false;
  }
}

export default Engine