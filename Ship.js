class Ship{
    constructor(x, y, width, height){
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 50;
        this.height = height || 50;
        this.bullets = [];
        this.moveLeft = false;
        this.moveRight = false;
        this.speed = 5;
    }
    getPosition(){
        return {x: this.x, y: this.y};
    }
    setPosition(x, y){
        this.x = x;
        this.y = y;
    }
    getSpeed(){
        return this.speed;
    }
    setSpeed(n){
        this.speed = n;
    }
    getSize(){
        return {width: this.width, height: this.height};
    }
    setSize(w, h){
        this.width = w;
        this.height = h;
    }
    move(){
        if(this.moveLeft){
            this.x = this.x - this.speed;
            if(this.x <= 0){
                this.x = 0;
            }
        }
        if(this.moveRight){
            this.x = this.x + this.speed;
            if(this.x + this.width >= canvas.width){
                this.x = canvas.width - this.width;
            }
        }
    }
    draw(){
        let gun = { // could add these on the ship obj ... ?!
            x : this.width * 0.45,
            y : 0,
            w : this.width / 10,
            h : this.height / 5
        };
        let turrel = {
            x : this.width * 0.35,
            y : this.height / 5,
            w : this.width * 0.3,
            h : this.height * 0.3
        };
        let base = {
            x : 0,
            y : this.height / 2,
            w : this.width,
            h : this.height / 2
        };

        ctx.fillStyle = "#888888"; // ship color : grey
        ctx.fillRect(this.x + gun.x, this.y + gun.y, gun.w, gun.h);
        ctx.fillRect(this.x + turrel.x, this.y + turrel.y, turrel.w, turrel.h);
        ctx.fillRect(this.x + base.x, this.y + base.y, base.w, base.h);
        ctx.fillStyle = "#000000"; // black <= reset color to default
    }
    fire(){
        let b = new Bullet(window.id.getID());
        b.setCoords(this.x + this.width / 2 - b.width / 2, this.y - b.height);
        b.draw();
        this.bullets.push(b);
    }
    updateFire(){
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].move();
            this.bullets[i].draw();
            if( this.bullets[i].y < 0){
                this.removeBullet[i];
            }
        }
    }
    removeBullet(idx){
        this.bullets.splice(idx, 1);
    }
}

class Bullet{
    constructor(id, x,y){
        this.id = id || Date.now();
        this.x = x || 0; // initial position: was just fired
        this.y = y || 0; // initial position: was just fired
        this.width = 5;
        this.height = 7.5;
        this.speed = -10;
    }
    getCoords(){
        return {x: this.x, y: this.y};
    }
    setCoords(x, y){
        this.x = x;
        this.y = y;
    }
    move(){
        this.y += this.speed;
        // todo check if out of canvas
    }
    draw(){
        let head = {
            x : this.x + 2.5,
            y : this.y + 2.5,
            radius : 2.5
        };
        let corps = {
            x : this.x,
            y : this.y + 2.5,
            w : this.width,
            h : this.height
        };
        ctx.fillStyle = "#ff0000"; // red, for now.
        
        // courbe non perceptible :( 
        ctx.beginPath();
        ctx.arc(head.x, head.y, head.radius, 0, Math.PI, true);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(corps.x, corps.y, corps.w, corps.h);
        ctx.fillStyle ="#000000"; // reset to default : black
    }
}