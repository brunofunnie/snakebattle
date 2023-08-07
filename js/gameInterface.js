class GameInterface {
  constructor(engine, input, state, assets) {
    this.engine = engine
    this.input = input
    this.state = state
    this.assets = assets
    this.elements = this.getInterfaceElements()
  }

  getInterfaceElements() {
    const elements = {
      headerElement: document.querySelector(".header"),
      newGameScreen: document.querySelector(".newgame"),
      gameOverScreen: document.querySelector(".gameover"),
      scorePoint: document.querySelectorAll(
        ".score .number, .gameover .score .number"
      ),
      playButton: document.querySelector(".newgame button"),
      playAgainButton: document.querySelector(".gameover button"),
    }

    return elements
  }

  toggle(el) {
    let display = el.style.display

    if (display === "none" || display === "") {
      el.style.display = "flex"
    } else {
      el.style.display = "none"
    }
  }

  toggleHeader() {
    this.toggle(this.elements["headerElement"])
  }

  toggleNewGameScreen() {
    this.toggle(this.elements["newGameScreen"])
  }

  toggleGameoverScreen() {
    this.toggle(this.elements["gameOverScreen"])
  }

  init() {
    const that = this
    this.toggleNewGameScreen()
    this.elements["playButton"].addEventListener("click", function () {
      that.newGame()
    })
    this.elements["playAgainButton"].addEventListener("click", function () {
      that.resetGame()
    })

    document.addEventListener(
      "keydown",
      this.input.basicInput.bind(this.state)
    )
  }

  setGameLoop(gameLoop) {
    this.gameLoop = gameLoop
  }

  updateScore(points) {
    this.elements["scorePoint"].forEach((score) => (score.innerHTML = points))
  }

  newGame() {
    this.updateScore(0)
    this.toggleHeader()
    this.toggleNewGameScreen()
    console.log(this)
    this.state.start(this.gameLoop)
  }

  resetGame() {
    this.state.reset()
    this.engine.clearCanvas()
    this.toggleHeader()
    this.toggleGameoverScreen()
    this.toggleNewGameScreen()
  }

  gameOver() {
    this.state.end()
    this.toggleGameoverScreen()
  }

  scorePoint() {
    this.state.points += 10
    this.updateScore(this.state.points)
  }
}

export default GameInterface
