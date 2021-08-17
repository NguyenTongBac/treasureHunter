import Keyboard from "./keyboard.js";
import { explorer } from "./draw";
export default function move() {
    let left = Keyboard(37),
        up = Keyboard(38),
        right = Keyboard(39),
        down = Keyboard(40);
    left.press = () => {
        explorer.vx = -5;
        explorer.vy = 0;
    };
    left.release = () => {
        if (!right.isDown && explorer.vy == 0) {
            explorer.vx = 0;
        }
    }
    up.press = () => {
        explorer.vy = -5;
        explorer.vx = 0;
    }
    up.release = () => {
        if (!down.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    }
    right.press = () => {
        explorer.vx = 5;
        explorer.vy = 0;
    }
    right.release = () => {
        if (!left.isDown && explorer.vy === 0) {
            explorer.vx = 0;
        }
    }
    down.press = () => {
        explorer.vy = 5;
        explorer.vx = 0;
    }
    down.release = () => {
        if (!up.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    }
}