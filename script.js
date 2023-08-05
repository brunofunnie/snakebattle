document.addEventListener('DOMContentLoaded', function() {

  const canvas = document.querySelector('#snakeCanvas')
  const ctx = canvas.getContext("2d")
  const blockSize = 15
  const width = canvas.width / blockSize
  const height = canvas.height / blockSize

  let gameAssets = {
    headerElement: document.querySelector('.header'),
    newGameScreen: document.querySelector('.newgame'),
    gameOverScreen: document.querySelector('.gameover'),
    toggle(el) {
      let display = el.style.display

      if (display === 'none' || display === '') {
        el.style.display = 'flex'
      } else {
        el.style.display = 'none'
      }
    },
    toggleHeader() {
      this.toggle(this.headerElement)
    },
    toggleNewGameScreen() {
      this.toggle(this.newGameScreen)
    },
    toggleGameoverScreen() {
      this.toggle(this.gameOverScreen)
    },
    scorePoint: document.querySelectorAll('.score .number, .gameover .score .number'),
    playButton: document.querySelector('.newgame button'),
    playAgainButton: document.querySelector('.gameover button'),
    apple: document.querySelector('#assets .apple'),
  }

  let gameSettings = {
    snakeHeadColor: 'yellow',
    foodColor: 'red',
    snakeColorPrimary: '#1d6609',
    snakeColorSecondary: '#2c7517',
  }

  // Game Setup
  let gameState = {
    running: null,
    start() {
      this.gameOver = false
      this.running = setInterval(gameLoop, 50);
    },
    end() {
      this.gameOver = true
      clearInterval(this.running)
      gameAssets.toggleGameoverScreen()
    },
    clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    reset() {
      this.clear()
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

  function init() {
    console.log('init')
    gameAssets.toggleNewGameScreen()
    gameAssets.playButton.addEventListener('click', function() {
      newGame()
    })
    gameAssets.playAgainButton.addEventListener('click', function() {
      resetGame()
    })
  }

  function newGame() {
    gameAssets.toggleHeader()
    gameAssets.toggleNewGameScreen()
    gameState.start()
  }

  function resetGame() {
    gameState.reset()
    gameAssets.toggleHeader()
    gameAssets.toggleGameoverScreen()
    gameAssets.toggleNewGameScreen()
  }

  function isGameOver() {
    return gameState.gameOver
  }

  function gameOver() {
    gameState.gameOver = true
    gameAssets.toggleGameOverScreen()
    clearInterval(gameState.running)
  }

  function scorePoint() {
    gameState.points += 10
    gameAssets.scorePoint.forEach((score) => score.innerHTML = gameState.points)
  }

  function drawBlock(position) {
    console.log('drawBlock: ', position)

    ctx.fillRect(
      position.x * blockSize,
      position.y * blockSize,
      blockSize,
      blockSize
    )
  }

  function drawImage(position, asset) {
    ctx.drawImage(
      asset,
      position.x * blockSize,
      position.y * blockSize,
      blockSize,
      blockSize
    )
  }


  function clearBlock(position) {
    ctx.clearRect(
      position.x * blockSize,
      position.y * blockSize,
      blockSize,
      blockSize
    )
  }

  // Function to remove expired food items
  function removeExpiredFood() {
    let currentTime = Date.now()

    for (let i=0; i < gameState.food.length; i++) {
      if ((currentTime - gameState.food[i].timestamp) > gameState.foodDuration) {
        clearBlock(gameState.food[i])
        gameState.food.splice(i, 1)
      }
    }
  }

  function makeFood() {
    if (gameState.food.length === 0)  {
      console.log('Current food: ', gameState.food, gameState.numFood)
      for (let i = 0; i < gameState.numFood; i++) {
        let foodItem = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
          timestamp: Date.now(),
          draw: false,
        }
        gameState.food.push(foodItem)
      }
    }
  }

  function drawFood() {
    ctx.fillStyle = gameSettings.foodColor

    gameState.food.forEach(foodItem => {
      if (!foodItem.draw){
        foodItem.draw = true
        drawImage(foodItem, gameAssets.apple)
      }
    })
  }

  // Função que desenha a cobra na tela
  function drawSnake() {
    gameState.snakeState.forEach(function (block, index) {
      if (index % 2 === 0) ctx.fillStyle = gameSettings.snakeColorPrimary
      else ctx.fillStyle = gameSettings.snakeColorSecondary

      drawBlock(block)
    });
  }

  function drawLaser() {
    let xsnake = gameState.snakeState[0].x
    let ysnake = gameState.snakeState[0].y
    let directionX = gameState.snakeDirection.dx
    let directionY = gameState.snakeDirection.dy
    let index = 0
    let intervalLaser = setInterval(() => {
      let laserPosition = {
        x: xsnake + directionX * index,
        y: ysnake + directionY * index,
      }

      gameState.laser.unshift(laserPosition)
      ctx.fillStyle = "red"

      let previousLaserPos = {
        x: (laserPosition.x - directionX),
        y: (laserPosition.y - directionY)
      }

      drawBlock(laserposition)
      clearBlock(previousLaserPos)

      index++
    }, 5)

    gameState.lasers.push(intervalLaser)
  }

  function findObjectsWithCoordinates(arr, targetX, targetY) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].x === targetX && arr[i].y === targetY) {
        return arr[i];
      }
    }
  }

  function doEat(position) {
    let foodItem = findObjectsWithCoordinates(gameState.food, position.x, position.y)

    if (foodItem) {
      clearBlock(foodItem)
      scorePoint()
    }
  }

  function moveSnake() {
    // Cria um novo bloco na frente da cobra
    const head = {
      x: gameState.snakeState[0].x + gameState.snakeDirection.dx,
      y: gameState.snakeState[0].y + gameState.snakeDirection.dy
    }

    gameState.snakeState.unshift(head)

    // Remove o último bloco da cobra
    var rabo = gameState.snakeState[gameState.snakeState.length - 1];
    ctx.clearRect(rabo.x * blockSize, rabo.y * blockSize, blockSize, blockSize)

    gameState.snakeState.pop()

    doEat(head)
  }

  function checkCollision() {
    // Verifica se a cobra bateu nas paredes
    if (
      gameState.snakeState[0].x < 0 ||
      gameState.snakeState[0].x >= width ||
      gameState.snakeState[0].y < 0 ||
      gameState.snakeState[0].y >= height
    ) {
      return true
    }

    // Verifica se a cobra bateu em si mesma
    for (let i = 1; i < gameState.snakeState.length; i++) {
      if (
        gameState.snakeState[i].x === gameState.snakeState[0].x &&
        gameState.snakeState[i].y === gameState.snakeState[0].y
      ) {
        return true
      }
    }

    return false
  }

  async function gameLoop() {
    moveSnake()

    if (checkCollision()) {
      gameState.end()
      return
    }

    makeFood()
    drawFood()
    drawSnake()
    removeExpiredFood()
  }

  document.addEventListener("keydown", function (event) {
    let key = event.code

    if (key === 'ArrowLeft') {
      if (gameState.snakeDirection.dx != 1) {
        gameState.snakeDirection.dx = -1
        gameState.snakeDirection.dy = 0
      }
    } else if (key === 'ArrowUp') {
      if (gameState.snakeDirection.dy != 1) {
        gameState.snakeDirection.dx = 0
        gameState.snakeDirection.dy = -1
      }
    } else if (key === 'ArrowRight') {
      if (gameState.snakeDirection.dx != -1) {
        gameState.snakeDirection.dx = 1
        gameState.snakeDirection.dy = 0
      }
    } else if (key === 'ArrowDown') {
      if (gameState.snakeDirection.dy != -1) {
        gameState.snakeDirection.dx = 0
        gameState.snakeDirection.dy = 1
      }
    } else if (key === 'KeyA') {
      drawLaser()
    }
  })

  document.addEventListener("keydown", function (event) {
    if (event.code === 'Space' && !isGameOver()) {
      aumentarVelocidade()
    }
  })

  document.addEventListener("keyup", function (event) {
    if (event.code === 'Space' && !isGameOver()) {
      pararVelocidade()
    }
  })

  function aumentarVelocidade() {
    clearInterval(intervalId)
    intervalId = setInterval(gameLoop, 10)
  }

  function pararVelocidade() {
    clearInterval(intervalId)
    intervalId = setInterval(gameLoop, 50)
  }

  init()

})