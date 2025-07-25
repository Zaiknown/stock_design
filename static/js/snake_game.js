window.startSnakeGame = function() {

    const snakeboard = document.getElementById("snakeCanvas");
    const snakeboard_ctx = snakeboard.getContext("2d");
    const snakeContainer = document.getElementById("snakeContainer");
    const gameOverScreen = document.getElementById("gameOverScreen");
    const restartSnakeBtn = document.getElementById("restartSnakeBtn");
    const backToTerminalBtn = document.getElementById("backToTerminalBtn");

    let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}];
    let changing_direction = false;
    let food_x, food_y;
    let dx = 10;
    let dy = 0;

    snakeContainer.classList.remove("hidden");
    gameOverScreen.classList.add("hidden");

    function main() {
        if (has_game_ended()) {
            gameOverScreen.classList.remove("hidden");
            document.removeEventListener("keydown", change_direction_handler);
            return;
        }
        changing_direction = false;
        setTimeout(function onTick() {
            clear_board();
            drawFood();
            move_snake();
            drawSnake();
            main();
        }, 100);
    }

    function clear_board() { snakeboard_ctx.fillStyle = '#1e1e1e'; snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height); }
    function drawSnake() { snake.forEach(part => { snakeboard_ctx.fillStyle = '#00ff41'; snakeboard_ctx.strokeStyle = '#1e1e1e'; snakeboard_ctx.fillRect(part.x, part.y, 10, 10); snakeboard_ctx.strokeRect(part.x, part.y, 10, 10); }); }
    function drawFood() { snakeboard_ctx.fillStyle = '#ff5f56'; snakeboard_ctx.fillRect(food_x, food_y, 10, 10); }
    function move_snake() { const head = {x: snake[0].x + dx, y: snake[0].y + dy}; snake.unshift(head); const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y; if (has_eaten_food) { generate_food(); } else { snake.pop(); } }
    function has_game_ended() { for (let i = 4; i < snake.length; i++) { if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true; } const hitLeftWall = snake[0].x < 0, hitRightWall = snake[0].x > snakeboard.width - 10; const hitToptWall = snake[0].y < 0, hitBottomWall = snake[0].y > snakeboard.height - 10; return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall; }
    function random_food(min, max) { return Math.round((Math.random() * (max - min) + min) / 10) * 10; }
    function generate_food() { food_x = random_food(0, snakeboard.width - 10); food_y = random_food(0, snakeboard.height - 10); snake.forEach(part => { if (part.x == food_x && part.y == food_y) generate_food(); }); }
    
    function change_direction_handler(event) {
        const LEFT_KEY = 37, RIGHT_KEY = 39, UP_KEY = 38, DOWN_KEY = 40;
        if ([LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY].includes(event.keyCode)) { event.preventDefault(); }
        if (changing_direction) return;
        changing_direction = true;
        const keyPressed = event.keyCode;
        const goingUp = dy === -10, goingDown = dy === 10;
        const goingRight = dx === 10, goingLeft = dx === -10;
        if (keyPressed === LEFT_KEY && !goingRight) { dx = -10; dy = 0; }
        if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -10; }
        if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 10; dy = 0; }
        if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 10; }
    }

    document.addEventListener("keydown", change_direction_handler);

    generate_food();
    main();

    restartSnakeBtn.onclick = () => {
        document.removeEventListener("keydown", change_direction_handler);
        startSnakeGame();
    };

    backToTerminalBtn.onclick = () => {
        snakeContainer.classList.add("hidden");
        document.removeEventListener("keydown", change_direction_handler);
        const terminalContainer = document.getElementById('terminal-container');
        if (terminalContainer) {
            terminalContainer.classList.remove('hidden');
            document.getElementById('terminal-input').focus();
        }
    };
};