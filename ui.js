var FPS = 1000/60;
const Gold = "#ffd700";
class ID{
    constructor(){
        this.cntID = 0;
    }
    getID(){
        this.cntID += 1;
        return this.cntID;
    }
}

const Durability = {
    "#000000": 1, // black
    "#ff0000": 2, // red
    "#00ff00": 3, // green
    "#0000ff": 4, // blue
    "#00008B": 5, // darkblue
    "#ffd700": Infinity // indestructible : gold
};
const ReverseDurability = {
    1: "#000000",
    2: "#ff0000",
    3: "#00ff00",
    4: "#0000ff",
    5: "#00008B",
    Infinity: "#ffd700"
};

var warperInfo = document.createElement("div");
warperInfo.setAttribute("id", "info");
document.body.append(warperInfo);
let s = "Push <b>B</b> to switch between bugged / not bugged version<br />"
s += " How to move the ship? '<b>a</b>' and '<b>s</b>' or <b>arrow keys</b> to move left or right. How to fire? '<b>left click</b>' or '<b>f or uparrow</b>' keys."
warperInfo.innerHTML = s;
var toggle_bug_solution = true;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("id", "canvas");
canvas.width = document.body.getBoundingClientRect().width;
canvas.height = document.body.getBoundingClientRect().height;
document.body.append(canvas);

// fire --- destroy them all
document.body.addEventListener("click", ()=>{
    window.ship.fire();
}, false);

document.addEventListener("keydown", (e)=>{
    switch(e.key){
        case "a": case "ArrowLeft":
            window.ship.moveLeft = true;
            window.ship.move();
            break;
        case "d": case "ArrowRight":
            window.ship.moveRight = true;
            window.ship.move();
            break;
        case 'f': case "ArrowUp": 
            window.ship.fire();
            break;
        case "t":
            let coord = ab.getCoords();
            ctx.clearRect(coord.x, coord.y, 60, 60);
            ab.setCoords(coord.x, coord.y + ab.getSpeed());
            ab.draw();
            break;
        case "l":
            window.tid = setInterval(testinggg, FPS);
            break;
        case 'k':
            clearInterval(window.tid);
            break;
        case 'b':
            toggle_bug_solution = !toggle_bug_solution;
            break;
        default:
            // ...
            break;
    }
}, false);

document.addEventListener("keyup", (e)=>{
    switch(e.key){
        case "a": case "ArrowLeft": 
            window.ship.moveLeft = false;
            break;
        case "d": case "ArrowRight": 
            window.ship.moveRight = false;
            break;
        case "p":
            if(window.pause){
                window.cancelAnimationFrame(window.ref);
                window.pause = !window.pause;
            }
            else{
                window.ref = window.requestAnimationFrame(gameLoop);
                window.pause = !window.pause;
            }
            break;
        default:
            // todo
            break;
    }
}, false);

document.addEventListener("mousemove", (e)=>{
    ctx.clearRect(400, 400, 700, 700);
    let s = "";
    s+= e.x;
    s+= ", ";
    s+= e.y;
    ctx.font = "48 serif";
    ctx.fillText(s, 500,500);
}, false);

function dialog(msg){
    let wr = document.createElement("div");
    let btn = document.createElement("button");
    let restart = "Try Again";
    let p = document.createElement("p");
    btn.append(restart);
    p.innerText = msg;
    wr.setAttribute("id", "dialog");
    wr.append(p, btn);
    wr.style = "width:" + window.innerWidth + "px;height:" + window.innerHeight + "px; background-color:rgba(00,00,00,.7); text-align:center; font-size:24pt; color:white; position:fixed; top:0px";
    document.body.append(wr);

    btn.addEventListener("click", ()=>{
        // do a lot of stuff here
        // TODO
        location.reload();
    }, false);
}