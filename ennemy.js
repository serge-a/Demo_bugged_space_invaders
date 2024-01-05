class Ennemy{
    constructor(id, x, y, w, h){
        this.id = id;
        this.x = x || 0;
        this.y = y || 0;
        this.width = w || 50;
        this.height = h || 50;
        this.color = "#000000"; // default ennemy color : black
        this.life = Durability[this.color];
        this.speed = 5;
        this.freeze = 0; // mob dont move at each drawing call, to let player attack them.
        this.freezeTime = 20;
        this.direction = Object.freeze({ // enum, kind of
            left : 'left',
            right: 'right',
            up: 'up',
            down: 'down'
        });
        this.moveDirection = this.direction.right;
    }
    getID(){
        return this.id;
    }
    getColor(){
        return this.color;
    }
    setColor(c){
        this.color = c;
        this.life = Durability[c]; // color and life related
    }
    decreaseLife(n){
        if (n == undefined) {n = 1;}
        this.life -= n;
        if(this.life > 0 && this.life < 6){
            this.color = ReverseDurability[this.life];
        }
        // if == 0 no importance, the ennemy will be deleted
        // if < 0 same, it will be deleted
    }
    getCoords(){
        return {x: this.x, y: this.y};
    }
    setCoords(x, y){
        this.x = x;
        this.y = y;
    }
    draw(){
        // virtual
        // for now just draw a square : testing
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.fillStyle = "#000000"; // go back to default;
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px serif";
        ctx.fillText(this.getID(), this.x + 15, this.y + 20);
        ctx.font = "14px serif";
        ctx.fillText("Life: " + this.life, this.x + 5, this.y + 44);
        ctx.fillStyle = "#000000"; // go back to default;
    }
    move(){
        if(this.freeze < this.freezeTime){
            this.freeze++;
            return; // freze, don't move the ennemy.
        }
        else{
            this.freeze = 0;
        }
        if(this.moveDirection == this.direction.left){
            this.x -= this.speed;
            if(this.x <= 10){ // hit left edge
                this.x = 10;
                this.moveDirection = this.direction.right;
                this.y += this.height + 10;
            } 
        }
        if(this.moveDirection == this.direction.right){
            this.x += this.speed;
            if(this.x >= (canvas.width - 10) - this.width){ // hit right edge
                this.x = (canvas.width - 10) - this.width;
                this.moveDirection = this.direction.left;
                this.y += this.height + 10;
            }
        }
    }
    fire(){ // attack the player ship (will be call randomly)
        let bomb = new Bomb(window.id.getID());
        bomb.setRadius(10);
        bomb.setCoords(this.x + (this.width / 2) - bomb.radius, this.y + this.height + bomb.radius);
        return bomb;
    }
    gotHit(){ // by bullet
        for(let i = 0, b, c; i < window.ship.bullets.length; i++){
            b = window.ship.bullets[i]; // current bullet
            c = b.getCoords();

            if(c.x + b.width > this.x && c.x < this.x + this.width && c.y < this.y + this.height && c.y + b.height > this.y){ // hitted
                this.decreaseLife(1);
                window.ship.removeBullet(i);
                if(this.life <= 0){
                    this.explode();
                }
            }
        }
    }
    explode(){
        // TODO : make an explosion animation. 
        // for now just remove the ennemy
        let idx = 0;
        while(idx < window.ennemys.length){
            if(window.ennemys[idx].getID() == this.getID()){
                window.ennemys.splice(idx, 1);
                ctx.fillStyle = "#0000ff";
                ctx.clearRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = "#000000"; // restore to default
                return;
            }
            idx++;
        }
        // not found 
        // should never happen. 
        console.log("explode: WTF");
    }
}

class Bomb{
    constructor(id, x, y, r){
        this.id = id || Date.now();
        this.x = x - (r / 2) || (r / 2);
        this.y = y || 0;
        this.radius = r || 5; // default size
        this.speed = 3; // will probably need tweaking
        this.color = "#ff0000";
    }
    setColor(c){
        this.color = c;
    }
    getSpeed(){
        return this.speed;
    }
    setSpeed(n){
        this.speed = n;
    }
    getCoords(){
        return {x: this.x, y: this.y};
    }
    setCoords(x, y){
        this.x = x;
        this.y = y;
    }
    getRadius(){
        return this.radius;
    }
    setRadius(r){
        this.radius = r;
    }
    move(){
        this.y = this.y + this.speed;
    }
    draw(){
        let bomb = {
            x: this.x + this.radius,
            y: this.y + this.radius
        };

        ctx.fillStyle = this.color; // red, for now.
        ctx.beginPath();
        ctx.arc(bomb.x, bomb.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        //ctx.closePath();
        ctx.fillStyle ="#000000"; // reset to default : black
    }
}