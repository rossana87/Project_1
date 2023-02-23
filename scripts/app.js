function init() {

  // ! Elements
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('.score')
  const startBtn = document.querySelector('.start')
  const killGame = document.querySelector('.killGame')

  const width = 20
  const cellCount = width * width


  // ! Variables
  const cells = []
  let currentSnake = [6, 5, 4]
  let currentScore = 0
  let snakeSpeed 
  let randomCellFood = 0  
  let snakeDirection = 1
  let timer
  const intervalTime = 1000
  
  // ! Generate Grid
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
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
  function startGame(){
    // Reset variables back to their default values
    reset()
    
    currentSnake = [6, 5, 4]
    addSnake()
    moveSnakeTimer()
    addFood()
    
  }

  function addSnake(){ 
    //doing a forEach loop, I can add the color to the snake and the class 
    currentSnake.forEach(index => {
    //adding the class of snake
      cells[index].classList.add('snake')
    })
  }

  function removeSnake(){
    // target the currentSnake and remove the snake class
    currentSnake.forEach(index => {
      cells[index].classList.remove('snake')
    })
  }

  function addFood(){
    //generate a random index with Math.floor(Math.random)
    randomCellFood = Math.floor(Math.random() * cells.length)
    //cells is an array. Doing the below, I can add the class 'food'
    cells[randomCellFood].classList.add('food')
    console.log('food')
  }

  function removeFood(){
    //function for removing food once eaten
    cells[randomCellFood].classList.remove('food')
    //console.log('Removefood')
  }

  function direction(e){
    
    const right = 39
    const left = 37
    const up = 38
    const down = 40
    
    if (e.keyCode === right && snakeDirection !== -1) {
      snakeDirection = +1
      console.log('right')
      
    } else if (e.keyCode === left && snakeDirection !== +1){
      snakeDirection = -1
      console.log('left')
      
    } else if (e.keyCode === up && snakeDirection !== +width){
      snakeDirection = -width
      console.log('up')

    } else if (e.keyCode === down && snakeDirection !== -width){
      snakeDirection = +width
      console.log('down')      
    } 
  }

  function moveSnake(){
    
    const head = currentSnake[0]
    
    if (snakeDirection === 1 && head % width === width - 1){
      gameOver()
      console.log('die going right')   
    } else if (snakeDirection === -1 && head % width === 0){
      gameOver()
      console.log('die going left')
    } else if (snakeDirection === -width && head <= width){
      gameOver()
      console.log('die going up')
    } else if (snakeDirection === +width && (head + width) > cellCount){
      gameOver()
      console.log('die going down')
    } else if (cells[head + snakeDirection].classList.contains('snake')){
      gameOver()
      console.log('5')
    } else {
      cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      currentSnake.pop()
      //we need to manipulate the DOM decrementing the tail and removing that class
      //cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      
      //Through the DOM we need to add one index to the head
      //cells[head].classList.add('snake')
      //Removing from the end of the array
      //currentSnake.pop()
      //Adding to the start of the array, which is the head
      currentSnake.unshift(head + snakeDirection)
      cells[head].classList.add('snake')
    }
    //if the snake eats the food
    if (cells[head].classList.contains('food')){
      
      //remove the class of food
      removeFood()
      //grow snake by adding the class of snake 
      // grow the tail and the array need to get bigger too
      growTail()
      //addFood
      addFood()
      //increase the score variable and add 5 to the scoreDisplay
      addScore()
      //grow speed
      speed()
    }
  }

  function addScore(){
    currentScore += 5
    scoreDisplay.innerHTML = currentScore
  }

  function growTail(){
    //grow tail when the food is eaten
    //grow snake by adding the class of snake 
    // grow the tail and the array need to get bigger too
    cells[currentSnake[2]].classList.add('snake')
    currentSnake.push()
  }
  
  function speed(){
    //Select the speed of the snake using setInterval().
    //timer = setInterval(moveSnake, intervalTime)
    //console.log('interval')
    if (currentSnake === 'food') {
      snakeSpeed * 0.6
    }
  }

  function reset(){
    // Cleanup in case a previous interval is running
    // Clear timer interval
    clearInterval(timer)
    // Remove the snake
    removeSnake()
    //reset array current snake
    currentSnake = [6, 5, 4]
    //remove food
    removeFood()
    //reset score variable
    currentScore = 0
    //reset the DispayScore on the screen
    scoreDisplay.innerText = 0
    //reset Game Over on the screen
    killGame.innerText = ''
    //console.log('hello')
  }

  function gameOver(){
    killGame.innerText = 'GAME OVER!'
    clearInterval(timer) 
  }

  function moveSnakeTimer(){
    timer = setInterval(() => {
      removeSnake()
      moveSnake()
      addSnake()
    }, intervalTime)
  }
  
  // ! Events
  startBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', direction)


  // ! Page Load
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)