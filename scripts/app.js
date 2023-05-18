function init() {

  // ! Elements
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('.score')
  const startBtn = document.querySelector('.start')
  const killGame = document.querySelector('.killGame')
  const audio = document.querySelector('#audio')

  const width = 20
  const cellCount = width * width


  // ! Variables
  const cells = []
  let currentSnake = [6, 5, 4]
  let currentScore = 0
  let randomCellFood = 0
  let snakeDirection = 1
  let timer
  let intervalTime = 500
  const defaultIntervalTime = 500


  // ! Generate Grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      //console.log('Cell Created')
      // Create div cell
      const cell = document.createElement('div')
      // Give an id to the cell
      cell.id = i
      // Append to grid
      grid.appendChild(cell)
      // Push cell into cells array
      cells.push(cell)
    }
  }

  // ! Executions
  function startGame() {

    // Reset variables back to their default values
    reset()
    playAudio()
    currentSnake = [6, 5, 4]

    addSnake()
    moveSnakeTimer()
    addFood()

  }

  function addSnake() {
    //doing a forEach loop, I can add the color to the snake and the class 
    currentSnake.forEach(index => {
      //adding the class of snake
      cells[index].classList.add('snake')
    })
  }

  function removeSnake() {
    // target the currentSnake and remove the snake class
    currentSnake.forEach(index => {
      cells[index].classList.remove('snake')
    })
  }

  function addFood() {
    //generate a random index with Math.floor(Math.random)
    randomCellFood = Math.floor(Math.random() * cells.length)
    //cells is an array. Doing the below, I can add the class 'food'
    cells[randomCellFood].classList.add('food')
    //console.log(currentSnake)
  }

  function removeFood() {
    //function for removing food once eaten
    cells[randomCellFood].classList.remove('food')
    //console.log('Removefood')
  }

  function direction(e) {

    const right = 39
    const left = 37
    const up = 38
    const down = 40

    if (e.keyCode === right && snakeDirection !== -1) {
      snakeDirection = 1
      console.log('right')

    } else if (e.keyCode === left && snakeDirection !== +1) {
      snakeDirection = -1
      //console.log('left')

    } else if (e.keyCode === up && snakeDirection !== +width) {
      snakeDirection = -width
      //console.log('up')

    } else if (e.keyCode === down && snakeDirection !== -width) {
      snakeDirection = +width
      //console.log('down')      
    }
  }

  function moveSnake() {

    const head = currentSnake[0]

    if (snakeDirection === 1 && head % width === width - 1) {
      gameOver()
      //clearInterval(timer)
      //console.log('die going right')   
    } else if (snakeDirection === -1 && head % width === 0) {
      gameOver()
      //clearInterval(timer)
      //console.log('die going left')
    } else if (snakeDirection === -width && head <= width) {
      gameOver()
      //clearInterval(timer)
      //console.log('die going up')
    } else if (snakeDirection === +width && (head + width) >= cellCount) {
      gameOver()
      //clearInterval(timer)
      //console.log('die going down')
    } else if (cells[head + snakeDirection].classList.contains('snake')) {
      gameOver()
      //clearInterval(timer)
      //console.log('5')

    } else {
      //manipulate the DOM decrementing the tail and removing that class
      cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      //Removing from the end of the array
      currentSnake.pop()
      //Adding to the start of the array, which is the head
      currentSnake.unshift(head + snakeDirection)
      //add the class list of snake
      cells[currentSnake[0]].classList.add('snake')
      //currentSnake.forEach(s => cells[s].classList.add('snake'))
    }
    //if the snake eats the food
    if (cells[head + snakeDirection]?.classList.contains('food')) {
      //if (cells[head] === randomCellFood){
      //remove the class of food
      removeFood()
      // grow the tail 
      growTail()
      //addFood
      addFood()
      //increase the score variable and add 5 to the scoreDisplay
      addScore()
      //grow speed
      speed()
    }
  }

  function addScore() {
    currentScore += 5
    scoreDisplay.innerHTML = currentScore
  }

  function growTail() {
    //grow tail when the food is eaten
    //grow snake by adding the class of snake 
    // grow the tail and the array needs to get bigger too
    currentSnake.unshift(currentSnake[0] + snakeDirection)
    cells[currentSnake[0]].classList.add('snake')
  }

  function speed() {
    //Select the speed of the snake using setInterval().
    clearInterval(timer)
    intervalTime *= 0.7
    timer = setInterval(moveSnake, intervalTime)
    //console.log('interval')
  }

  function reset() {
    // Cleanup in case a previous interval is running
    // Clear timer interval
    clearInterval(timer)
    // Remove the snake
    removeSnake()
     // Remove the event listener for the keydown event
    document.removeEventListener('keydown', direction)
    // Reset snakeDirection to its default value
    snakeDirection = 1
    //reset array current snake
    currentSnake = [6, 5, 4]
    //remove food
    removeFood()
    //reset score variable
    currentScore = 0
    //reset the DisplayScore on the screen
    scoreDisplay.innerText = 0
    //reset Game Over on the screen
    killGame.innerText = ''
    //remove the the grid shake
    grid.classList.remove('shake')
    // Reset intervalTime to its default value
    intervalTime = defaultIntervalTime
    // Add the event listener for the keydown event
    document.addEventListener('keydown', direction)
  }

  function gameOver() {
    clearInterval(timer)
    grid.classList.add('shake')
    killGame.innerText = 'GAME OVER!'
  }

  function moveSnakeTimer() {
    timer = setInterval(() => {
      removeSnake()
      moveSnake()
      addSnake()
    }, intervalTime)
  }

  function playAudio() {
    // Set the src attribute on an audio element
    audio.src = 'assets/rattle_snake.wav'
    // Play Audio
    audio.play()
  }

  // ! Events
  startBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', direction)

  // ! Page Load
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)