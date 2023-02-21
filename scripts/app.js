function init() {

  // ! Elements
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('.score')
  const startBtn = document.querySelector('.start')

  const width = 20
  const cellCount = width * width


  // ! Variables
  const cells = []
  let currentSnake = [6, 5, 4]
  let currentScore = 10
  let snakeSpeed 
  let randomCellFood = 0  //anything between 0 and 399
  let snakeDirection = 'right'
  let timer
  

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
    //doing a forEach loop, I can add the color to the snake and the class 
    currentSnake = [6, 5, 4]
    
    addSnake()
    addFood()
    moveSnake()
    addScore
  }

  function addSnake(){
    currentSnake.forEach(index => {
      //cells[index].style.background = 'black'
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
    
    if (e.keyCode === right) {
      snakeDirection = 'right'
      console.log('right')
      
    } else if (e.keyCode === left){
      snakeDirection = 'left'
      console.log('left')
      
    } else if (e.keyCode === up){
      snakeDirection = 'up'
      console.log('up')
    } else if (e.keyCode === down){
      snakeDirection = 'down'
      console.log('down')
      
    } 
    moveSnake()
  }

  function moveSnake(){
    
    const head = currentSnake[0]
    //console.log('test', head % width === (width - 1))
    if (snakeDirection === 'right' && head % width !== width - 1){
      //endGame
      //we need to manipulate the DOM decrementing the tail and removing that class
      cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      //Through the DOM we need to add one index to the head
      cells[head + 1].classList.add('snake')
      //Removing the from the end of the array
      currentSnake.pop()
      //adding to the start of the array, which is the head
      currentSnake.unshift(head + 1)

      //console.log(currentSnake)
      //console.log('test', currentSnake[2] % width === width - 1 )
    } else if (snakeDirection === 'left' && head % width !== 0){
      //endGame
      cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      cells[head - 1].classList.add('snake')
      //cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      currentSnake.pop() 
      //console.log('test ->', currentSnake.pop())
      currentSnake.unshift(head - 1)
      
    } else if (snakeDirection === 'up' && head >= width){
      //endGame
      cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      cells[head - width].classList.add('snake')
      currentSnake.pop()
      currentSnake.unshift(head - width)

    } else if (snakeDirection === 'down' && head + width < cellCount){
      //endGame
      cells[currentSnake[currentSnake.length - 1]].classList.remove('snake')
      cells[head + width].classList.add('snake')
      currentSnake.pop()
      currentSnake.unshift(head + width)
    } else {
      //if the snake hits itself is GameOver
    }
    //if the snake eats the food
    if (head === randomCellFood){
      console.log('eaten') 
      addScore()
      //remove the class of food
      removeFood()
      console.log('remove food')
      //grow snake by adding the class of snake 
      cells[currentSnake[2]].classList.add('snake')
      // grow the tail and the array need to get bigger too
      currentSnake.push(2)
      //addFood
      addFood()
      //increase the score variable and add 10 to the scoreDisplay
      addScore()
      //grow the speed
    }
  }

  function addScore(){
    currentScore += 10
    scoreDisplay.innerHTML = '10' //amend this
  }

  // function growTail(){
  //   //grow tail when the food is eaten
  //   if (head === randomCellFood){
  //     currentSnake.push()
  //   }
    
  // }
  
  function speed(){
    //Select the speed of the snake using setInterval().
  }

  function reset(){
    // Cleanup in case a previous interval is running
    // Clear timer interval
    clearInterval(timer)
    // Remove the snake
    removeSnake()
    //reset array current snake
    currentSnake = []
    //remove food
    removeFood()
    //reset score variable
    currentScore = 0
    //reset the DispayScore on the screen
    scoreDisplay.innerText = 0
  }

  function endGame(){

  }

  // ! Events
  startBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', direction)







  // ! Page Load
  createGrid()





}

window.addEventListener('DOMContentLoaded', init)