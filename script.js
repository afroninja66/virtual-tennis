console.log("hello world")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Allows you to access the canvas in JS

let pointsEl = document.getElementById("points-el")
let points = 0

let player_vel_y_up = 0
let player_vel_y_down = 0
let paddle_width = canvas.width / 75
let paddle_height = canvas.height / 6
let player_x = 0 + paddle_width
let player_y = canvas.height / 2
let ai_x = canvas.width - (2 * paddle_width)
let ai_y = 0
let ai_vel_y = 12

// Setting the size and coordinates for both of the players
let ball_x = canvas.width / 2
let ball_y = canvas.height / 2
let ball_vel_x = 15
let ball_vel_y = 15
let ball_size = 20

// Setting the size and coordinates for the ball




function update(){

    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    
    player_y += player_vel_y_up
    player_y += player_vel_y_down
    ai_y += ai_vel_y
    ball_x += ball_vel_x
    ball_y += ball_vel_y
    ai_y += ai_vel_y

    ctx.fillRect(player_x, player_y, paddle_width, paddle_height) //left paddle
    ctx.fillRect(ai_x, ai_y, paddle_width, paddle_height) //right paddle
    ctx.fillRect(ball_x, ball_y, ball_size, ball_size) //ball
    
    
    if (player_y >= canvas.height - paddle_height){
        player_vel_y_down -= 12
        player_vel_y_up = 0
    }
    if (player_y <= 0){
        player_vel_y_up += 12
        player_vel_y_down = 0
    }
   
    if (ai_y <= ball_y){
        ai_vel_y = 12
        if  (ai_y <= ball_y){
            ai_vel_y = 6
        }
    }
    if (ai_y < ball_y){
        ai_y == ball_y
    }
    if  (ai_y >= canvas.height - paddle_height){
        ai_vel_y = -ai_vel_y
    }
    if  (ai_y <= 0){
        ai_vel_y = -ai_vel_y
    }
    if (ball_y == 0){  
        ball_vel_y = -ball_vel_y
    }

    if (ball_y == canvas.height){
        ball_vel_y = -ball_vel_y
    }

    if (
        (ball_x - ball_size < paddle_width && ball_y > player_y && ball_y < player_y + paddle_height) ||
        (ball_x + ball_size > canvas.width - paddle_width && player_y > ai_y && ball_y < ai_y + paddle_height)) {
         ball_vel_x =  -ball_vel_x
            console.log("Collide")
        } // Collision for ball and paddles

    if (ball_x - ball_size < 0){
        points -= 1000
        pointsEl.innerText = points
    }
    if (ball_x + ball_size > canvas.width){
        points += 1000
        pointsEl.innerText = points
        playSound("sound.mp3")
    }
    else {
        points -= 2
        pointsEl.innerText = "You have " + points + " points"
    }
    if (ball_x - ball_size < 0 || ball_x + ball_size > canvas.width) {
        ball_x = canvas.width / 2;
        ball_y = canvas.height / 2;
        ball_vel_x =  -ball_vel_x
      }
    
    if (points < 0){
        pointsEl.style.color = "red"
        ctx.fillStyle = "red"
    }
    else {
        pointsEl.style.color = "white"
    }

    ctx.fillStyle = "white"
    
    
    requestAnimationFrame(update) 
    
    // Very essential for animation - the game will freeze if the line of code isn't there
    
}

function playSound(audioName) {
    let audio = new Audio(audioName)
    audio.play()
}

// For sound effects

update()

// The function "update" is to draw the sprites, also handles animation

addEventListener("keydown", function(e){
    if (e.code == "KeyW") player_vel_y_up = -12; 
    if (e.code == "KeyS") player_vel_y_down = 12; 
    if (e.code == "ArrowUp") player_vel_y_up = -12;
    if (e.code == "ArrowDown") player_vel_y_down = 12;
    
})

addEventListener("keyup", function(e){
    if (e.code == "KeyW") player_vel_y_up = 0
    if (e.code == "KeyS") player_vel_y_down = 0
    if (e.code == "ArrowUp") player_vel_y_up = 0
    if (e.code == "ArrowDown") player_vel_y_down = 0
})


//For controls and movement

