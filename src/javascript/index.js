import "../sass/styles.scss";
import { setup } from "./draw";
import * as PIXI from "./pixi.min.js";
//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

//Create a Pixi Application
let app = new Application({
    width: 512,
    height: 512,
    antialiasing: true,
    transparent: false,
    resolution: 1
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.top = "50%";
app.renderer.view.style.left = "50%";
app.renderer.view.style.transform = "translate(-50%,-50%)";
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add("images/treasureHunter.json")
    .load(setup);

export {
    app
}