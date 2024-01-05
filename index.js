window.id = new ID();
window.ref;
window.ship = new Ship(window.innerWidth / 2, window.innerHeight - 50, 50, 50);
window.pause = true;
prevTimeStamp = null;

window.nombresEnnemy = 10;
window.ennemys = []; // store les ennemies.
window.bombs = [];
for(let i = 0; i < window.nombresEnnemy; i++){ // créer quelques ennemies
    window.ennemys.push( new Ennemy(window.id.getID()) );
    window.ennemys[i].setColor( ReverseDurability[parseInt(Math.random() * 5 + 1, 10)] );
    window.ennemys[i].setCoords( i * (window.ennemys[i].width + 10) , 60 );
}

function checkWin(){ // all ennemys killed
    // TODO // TMP
    if(window.ennemys.length == 0){
        dialog("You Win! \nSpecial Power: Ghost ship! Enemy attacks pass through me! \nHA HA HAH AHAH! \nOr code not finish!? 😉 ");
        return true;
    }
    return false;
}

window.lastEnnemyFireElapsed = Date.now();
window.waitEnnemyFireTime = 1000; // need to change that make it random between a range of time like (1 sec to 5 sec)
function ennemyFire(){
    if(window.ennemys.length == 0) return; // no ennemy ship to fire bombs!!!
    window.factor = (window.nombresEnnemy + 1) - window.ennemys.length; // fire less often as less ennemys
    let max = 500 * window.factor;
    let min = 100 * window.factor;
    if (Date.now() - window.lastEnnemyFireElapsed > window.waitEnnemyFireTime){
        let which = parseInt(Math.random() * window.ennemys.length, 10); // select a random ennemy ship to fire.
        let abomb = window.ennemys[which].fire();
        window.bombs.push(abomb);
        window.lastEnnemyFireElapsed = Date.now();
        window.waitEnnemyFireTime = parseInt(Math.random() * max + min, 10);
    }
}

function updateEnnemyBombsPosition(){
    let remanings = [];
    for(let b, i = 0; i < window.bombs.length; i++){
        b = window.bombs[i];
        b.move();
        if( b.getCoords().y < canvas.height ){
            remanings.push(b);
            b.draw();
        }
    }
    window.bombs = remanings;
}

/// testing
var ab = new Bomb(500, 500, 30, ctx);
ab.draw();

function testinggg(){
    let coord = ab.getCoords();
    ctx.clearRect(coord.x, coord.y, 60, 60);
    ab.setCoords(coord.x, coord.y + ab.getSpeed());
    ab.draw();
    if(coord.y > canvas.height){
        ab.setCoords(500,500);
    }
}

function ennemysDropToN(n){ // usefull for testing
    window.ennemys.splice(n);
}

// gameLoop
function gameLoop(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(checkWin()){ return;}

    window.ship.move();
    window.ship.draw();
    window.ship.updateFire();
    if(window.ennemys.length > 0){
        for(let i = 0; i < window.ennemys.length; i++){
            window.ennemys[i].move();
            window.ennemys[i].draw();
            window.ennemys[i].gotHit();
            if(toggle_bug_solution){
                ennemyFire();
                updateEnnemyBombsPosition(); // HERE THE PROBLEM!!! (remove that here) puting that here make bombs go faster and draw too many time,
            }                                // so it become "ovale" / "rect with rounded corner" 
        }                                    // this also has the effect of repairing itself as the enemys array contains fewer and fewer enemies.
    }                                        // at length one it has normal behavior (the bug side effect completely disappears)
    else{
        // you win, no more ennemys
        window.bombs = [];
        //win();
    }
    if(!toggle_bug_solution){
        ennemyFire();
        updateEnnemyBombsPosition(); // HERE THE FIX (move it here)
    }
    
    window.ref = window.requestAnimationFrame(gameLoop);
}

gameLoop();