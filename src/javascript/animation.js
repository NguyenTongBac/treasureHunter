import contain from "./contain.js";
import hitTestRectangle from "./collision";
import {
    explorer,
    treasure,
    blobs,
    blob,
    dungeon,
    door,
    healthBar,
    message,
    gameScene,
    gameOverScene,
    end
} from "./draw";
// import setup
let text, state = play;
export function gameLoop(delta) {

    //Update the current game state:
    state(delta);
}

export function play(delta) {


    //use the explorer's velocity to make it move
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;

    //Contain the explorer inside the area of the dungeon
    contain(explorer, {
        x: 28,
        y: 10,
        width: 488,
        height: 480
    });
    //contain(explorer, stage);

    //Set `explorerHit` to `false` before checking for a collision
    let explorerHit = false;

    //Loop through all the sprites in the `enemies` array
    blobs.forEach(function(blob) {

        //Move the blob
        blob.y += blob.vy;

        //Check the blob's screen boundaries
        let blobHitsWall = contain(blob, {
            x: 28,
            y: 10,
            width: 488,
            height: 480
        });

        //If the blob hits the top or bottom of the stage, reverse
        //its direction
        if (blobHitsWall === "top" || blobHitsWall === "bottom") {
            blob.vy *= -1;
        }

        //Test for a collision. If any of the enemies are touching
        //the explorer, set `explorerHit` to `true`
        if (hitTestRectangle(explorer, blob)) {
            explorerHit = true;
        }
    });

    //If the explorer is hit...
    if (explorerHit) {

        //Make the explorer semi-transparent
        explorer.alpha = 0.5;

        //Reduce the width of the health bar's inner rectangle by 1 pixel
        healthBar.outer.width -= 1;

    } else {

        //Make the explorer fully opaque (non-transparent) if it hasn't been hit
        explorer.alpha = 1;
    }

    //Check for a collision between the explorer and the treasure
    if (hitTestRectangle(explorer, treasure)) {

        //If the treasure is touching the explorer, center it over the explorer
        treasure.x = explorer.x + 8;
        treasure.y = explorer.y + 8;
    }

    //Does the explorer have enough health? If the width of the `innerBar`
    //is less than zero, end the game and display "You lost!"
    if (healthBar.outer.width < 0) {
        state = end;
        message.text = "You lost!";
    }

    //If the explorer has brought the treasure to the exit,
    //end the game and display "You won!"
    if (hitTestRectangle(treasure, door)) {
        state = end;
        message.text = "You won!";
    }
}
export { state }