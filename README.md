# SEI Project 1: Snake

## Overview

This was the first JavaScript project of the Software Engineering Immersive course at General Assembly.

Snake is a single-player game where the player earns points by guiding the snake to eat food randomly placed on the game board. Every time the snake eats the tail grows and the speed increases. The game is over if the snake hits the walls of the board, or itself.

## Brief

* Render a game in the browser.
* Be built on a grid: do not use HTML Canvas for this.
* Design logic for winning & visually display which player won.
* Include separate HTML / CSS / JavaScript files.
* Stick with KISS (Keep It Simple Stupid) and DRY (Don’t Repeat Yourself) principles.
* Use JavaScript for DOM manipulation.
* Deploy your game online, where the rest of the world can access it.
* Use semantic markup for HTML and CSS (adhere to best practices).

## Deployment

<a href="https://rossana87.github.io/Project_1/" target="_blank">Game - Snake</a>

## Timeframe

This was a solo project and the timeframe was 1 week.

## Technologies used:

* HTML5
* CSS3
* JavaScript ES6+
* VS Code
* Google Fonts
* Git & GitHub

## Planning

Before coding, I created a wireframe in Excalidraw to have an overview of the project and try to understand the pseudo code of the game.
Before planning, I played a little bit of the game Snake online, in order to understand what elements in HTML were a must. What variables I had to declare and what functions I needed to execute.
It was important to create the grid first. Afterwards, I wanted to show the score every time the snake was eating the food and I created the button Start for starting the game.
Regarding the variables, in my mind, I thought that the snake was going to be an empty array.

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683815245/Project%201/project-1-re-google-docs-0_bimhzo.png)

While I was coding, some variables and functions had changed and created a different style.


## Approach

#### Creating the Grid

I created the grid in a JavaScript function. The function created an array of `divs` within a flex-container. The divs could have classes attached, which were used to change the display. During development the index of each `div` could be displayed which resulted in a grid that was easy to change if required, and allowed me to keep track of attached classes easily.

```js
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
```

#### Function add snake and remove snake

For adding the snake, I looped the currentSnake variable and used a `forEach` loop  and I added a new class. Through CSS, I was able to add the colour to the snake.
The function `removeSnake` when applied removes the class “snake” from each cell in the currentSnake array. The latter contains the indexes of each cell that the snake currently occupies on the game board. The function iterates over the currentSnake array using a loop. For each element, the function targets the corresponding cell in the cell array, using the index value, and then removes the class “snake” from that cell using the `classList.remove()` method. While creating the game, the colours of the snake would disappear.

```js
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
```

#### Add food and remove food

A function was created to handle the creation and placement of food on the grid. The variable `randomCellFood` was created to handle the task of randomly generating a number, which was equal to a cell on the board, and using the `Math.random()` function. A class would then be added to a random cell and thus place food on the grid. Thanks to this method, food will be generated randomly on the grid while the user is playing. 

```js
unction addFood() {
    //generate a random index with Math.floor(Math.random)
    randomCellFood = Math.floor(Math.random() * cells.length)
    //cells is an array. Doing the below, I can add the class 'food'
    cells[randomCellFood].classList.add('food')
    //console.log(currentSnake)
  }
```

#### Direction of the snake

This function changes the snake’s direction based on the arrow keys that are pressed. In order to move the snake, I had to create a function with the snake directions for right, left, down and up. I created a variable called `let direction = 1`, which represents the default direction that is right. Then, I created an if statement that  controls the different directions and the snake direction was captured using an event listener.
To prevent the snake going immediately to the opposite direction, in the if statement I included that if the snake is going right cannot go left and so on.

```js
function direction(e) {

    const right = 39
    const left = 37
    const up = 38
    const down = 40

    if (e.keyCode === right && snakeDirection !== -1) {
      snakeDirection = +1
      //console.log('right')

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
```

#### Moving the snake

The crucial function in this game has been the moving function to let the snake move around the grid. This function includes the collision with the wall as well. An if statement was used for every direction for the movement and if the snake hits the wall of the board the game is over.

```js
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
```

If the snake doesn’t hit the wall, I can move to the second part of the statement, which is the `else`. I manipulated the DOM, decrementing the tail and removing the class of ‘snake’. Then, I used the method `pop()` for removing the tail from the end of the array; used the method `unshift()`, which adds the cell to the beginning of the array (the head). Lastly, add the class of ‘snake’ to make it visible on the front-end.

```js
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
```

#### Grow the tail

A grow tail function was created to grow the tail when the food was eaten. This was done by adding the class ‘snake’ and made the array bigger every time this happened.

```js
function growTail() {
    //grow tail when the food is eaten
    //grow snake by adding the class of snake 
    // grow the tail and the array needs to get bigger too
    currentSnake.unshift(currentSnake[0] + snakeDirection)
    cells[currentSnake[0]].classList.add('snake')
  }
```

#### Move Snake Timer

To let the snake move independently, a `moveSnakeTimer()` function was created. A setInterval method was used in conjunction with the movement of the snake and `intervalTime` that was set to half a second. 

```js
function moveSnakeTimer() {
    timer = setInterval(() => {
      removeSnake()
      moveSnake()
      addSnake()
    }, intervalTime)
  }
```

#### Speed

The speed increased every time the snake was eating food. The `clearInterval` were required to stop the issue of the snakes’ speed increasing exponentially. The `intervalTime` was set to a certain speed every time the snake had food.

```js
function speed() {
    //Select the speed of the snake using setInterval().
    clearInterval(timer)
    intervalTime *= 0.7
    timer = setInterval(moveSnake, intervalTime)
    //console.log('interval')
  }
```

#### Reset

Finally, the function `reset()`  resets the entire game before clicking on the button start. A computer is not like a human brain, on the contrary I have to code everything that needs to happen. Therefore, I had to clear all the previous intervals, such as the speed after eating the food. Remove the snake from the screen, so the user is able to start from a clean board. Reset the snake to the start position once the user clicks on the button start and at the same time remove the food that is generated randomly. The score needs to go back to 0 and remove game-over  from the screen. 

```js
function reset() {
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
    //reset the DisplayScore on the screen
    scoreDisplay.innerText = 0
    //reset Game Over on the screen
    killGame.innerText = ''
    //remove the the grid shake
    grid.classList.remove('shake')
  }
```

### Challenges

* I found the process of getting started when faced with only a brief, rather daunting initially. Although we had been taught the skills and tools that were needed to build the game, having to start from a blank page was definitely a challenge. Taking the time to think and plan on paper, enabled me to face and overcome this challenge. Looking back over my code I can see that some of it could be refactored (i.e. the snake movement), to make it DRY, however, due to the time constraints and given that it was my first project, I was happy with the outcome.
* Without any doubt, I learned how to manipulate the DOM and it will stay vivid in my mind. When I added the snake, I could not see it on the screen. I checked the code multiple times and only after some time I realised that I wasn’t manipulating the DOM. 

### Wins

* I am very proud of the design of the game.
* Getting the game working.
* Consolidated my knowledge of JavaScript, CSS and HTML. Some of the concepts are much clearer now.

### Key Learnings

* I believe that only with a lot of practice I will be able to improve JavaScript and all the methods.
* The process of making this game from scratch has been very thrilling, especially when the snake started moving.
* Planning and pseudocode is vital. It is very tempting to start coding, however, taking time to plan properly will save you time later.

### Bugs

* If you play the game once, everything is absolutely fine. However, when you play it the second time the snake goes into the direction that went previously. There must be a bug in the movement function that needs to be revisited.

### Future Improvements

* Make the game responsive.
* Ideally, I would have liked a leader-board so that a player would have been able to see what their ultimate high score had been and where they ranked in the all-time list. Due to the time constraints I was unable to implement this feature.
* Create more obstacles on the board to make the game slightly harder.

### Final Project

![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683816570/Project%201/project-1-re-google-docs-1_ptxmal.png)
![](https://res.cloudinary.com/dtu5wu4i9/image/upload/v1683816578/Project%201/project-1-re-google-docs-2_uqgh9m.png)












