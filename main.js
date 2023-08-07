import Engine from "./js/engine.js"
import gameSettings from "./js/settings.js"
import gameAssets from "./js/assets.js"
import gameState from "./js/state.js"
import GameInterface from "./js/gameInterface.js"
import Input from "./js/input.js"
import Snake from "./js/snake.js"
import Game from "./js/game.js"

document.addEventListener("DOMContentLoaded", function () {
  function init() {
    const engine = new Engine('#snakeCanvas')
    const gameInterface = new GameInterface(engine, Input, gameState, gameAssets)
    const snake = new Snake(engine, gameInterface, gameSettings, gameAssets, gameState)
    const game = new Game(engine, gameInterface, snake, gameState)
    game.start()
  }

  init()
});
