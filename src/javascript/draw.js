import * as PIXI from "./pixi.min.js";
import move from "./move";
import { gameLoop, play, state } from "./animation";
import { app } from "./index";
//Aliases
let Container = PIXI.Container,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

//Define variables that might be used in more 
//than one function
let explorer, treasure, blobs, dungeon,
    door, healthBar, message, gameScene, gameOverScene, id;

function setup() {

    //Make the game scene and add it to the stage
    gameScene = new Container();
    app.stage.addChild(gameScene);

    //Make the sprites and add them to the `gameScene`
    //Create an alias for the texture atlas frame ids
    id = resources["images/treasureHunter.json"].textures;

    //Dungeon
    dungeon = new Sprite(id["dungeon.png"]);
    gameScene.addChild(dungeon);

    //Door
    door = new Sprite(id["door.png"]);
    door.position.set(32, 0);
    gameScene.addChild(door);

    //Explorer
    explorer = new Sprite(id["explorer.png"]);
    explorer.x = 68;
    explorer.y = gameScene.height / 2 - explorer.height / 2;
    explorer.vx = 0;
    explorer.vy = 0;
    gameScene.addChild(explorer);

    //Treasure
    treasure = new Sprite(id["treasure.png"]);
    treasure.x = gameScene.width - treasure.width - 48;
    treasure.y = gameScene.height / 2 - treasure.height / 2;
    gameScene.addChild(treasure);

    //Make the blobs
    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150,
        speed = 2,
        direction = 1;

    //An array to store all the blob monsters
    blobs = [];

    //Make as many blobs as there are `numberOfBlobs`
    for (let i = 0; i < numberOfBlobs; i++) {

        //Make a blob
        let blob = new Sprite(id["blob.png"]);

        //Space each blob horizontally according to the `spacing` value.
        //`xOffset` determines the point from the left of the screen
        //at which the first blob should be added
        let x = spacing * i + xOffset;

        //Give the blob a random y position
        let y = randomInt(0, app.stage.height - blob.height);

        //Set the blob's position
        blob.x = x;
        blob.y = y;

        //Set the blob's vertical velocity. `direction` will be either `1` or
        //`-1`. `1` means the enemy will move down and `-1` means the blob will
        //move up. Multiplying `direction` by `speed` determines the blob's
        //vertical direction
        blob.vy = speed * direction;

        //Reverse the direction for the next blob
        direction *= -1;

        //Push the blob into the `blobs` array
        blobs.push(blob);

        //Add the blob to the `gameScene`
        gameScene.addChild(blob);
    }

    //Create the health bar
    healthBar = new Container();
    healthBar.position.set(app.stage.width - 170, 4)
    gameScene.addChild(healthBar);

    //Create the black background rectangle
    let innerBar = new Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    //Create the front red rectangle
    let outerBar = new Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);

    healthBar.outer = outerBar;

    //Create the `gameOver` scene
    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);

    //Make the `gameOver` scene invisible when the game first starts
    gameOverScene.visible = false;

    //Create the text sprite and add it to the `gameOver` scene
    let style = new TextStyle({
        fontFamily: "Futura",
        fontSize: 64,
        fill: "white"
    });
    message = new Text("The End!", style);
    message.x = 120;
    message.y = app.stage.height / 2 - 32;
    gameOverScene.addChild(message);
    state();
    move();

    //Start the game loop 
    app.ticker.add(delta => gameLoop(delta));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
}

export {
    explorer,
    treasure,
    blobs,
    healthBar,
    door,
    message,
    setup,
    gameScene,
    gameOverScene,
    end
};