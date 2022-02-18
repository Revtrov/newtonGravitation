let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let v = 0.1;
let newtonGravition = (G, m1, m2, d) => {
    return ((G * m2 * m1) / (d * d));
}
let distanceFormula = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1) + Math.pow(y2 - y1));
}
let midPoint = (obj1, obj2) => {
    let [x1, y1] = [(obj1.x), (obj1.y)], [x2, y2] = [(obj2.x), (obj2.y)];
    return [(((x1 + x2) / 2) - obj1.x) * -1, ((y1 + y2) / 2) - obj1.y]
}
let euclidAlg = () => {
    let a = canvas.height;
    let b = canvas.width;
    for (let i = 0; i < canvas.width * 10; i += 1) {
        if (a % b >= 0) {
            let c = a % b;
            [a, b] = [b, c];
        } else {
            i += 100000000
            num = a;
        }
    }
    return num
}
let slope = (obj1, obj2) => {
    let [x1, y1] = [(obj1.x), (obj1.y)], [x2, y2] = [(obj2.x), (obj2.y)];
    return 1 * ((y2 - y1) / (x2 - x1));
}
let attract = (obj1, obj2) => {
    if (obj1.x != obj2.x && obj1.y != obj2.y && obj1.x > 0 && obj1.y > 0 && obj1.x < canvas.width / euclidAlg() && obj1.y < canvas.height / euclidAlg()) {
        let y = slope(obj1, obj2);
        let x = 1;
        let xDif = obj1.x - obj2.x;
        let yDif = obj1.y - obj2.y;
        if (y < 0 && xDif > 0 & yDif < 0) {
            //p1 bottom right;
            obj1.x -= x;
            obj1.y += Math.abs(slope(obj1, obj2));
            obj2.x += x;
            obj2.y -= Math.abs(slope(obj1, obj2));
        }
        if (y > 0 && xDif < 0 & yDif < 0) {
            //p1 bottom left;
            obj1.x += x;
            obj1.y += Math.abs(slope(obj1, obj2));
            obj2.x -= x;
            obj2.y -= Math.abs(slope(obj1, obj2));
        }
        if (y < 0 && xDif < 0 & yDif > 0) {
            //p1 top left;
            obj1.x += x;
            obj1.y -= Math.abs(slope(obj1, obj2));
            obj2.x -= x;
            obj2.y += Math.abs(slope(obj1, obj2));
        }
        if (y > 0 && xDif > 0 & yDif > 0) {
            //p1 top right;
            obj1.x -= x;
            obj1.y -= Math.abs(slope(obj1, obj2));
            obj2.x += x;
            obj2.y += Math.abs(slope(obj1, obj2));
        }
    } else {
        reset([obj1, obj2])
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
let drawGrid = () => {
    let num = euclidAlg();
    for (let i = 0; i <= canvas.width / num; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if ((canvas.width / euclidAlg()) % 2 != 0) {
            if (Math.floor(((canvas.width / euclidAlg()) / 2) + 1) != Math.floor(i)) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            }
        } else {
            if (i == ((canvas.width / euclidAlg()) / 2)) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            }
        }
        ctx.moveTo((num) * i, 0);
        ctx.lineTo(num * i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height / num; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if ((canvas.height / euclidAlg()) % 2 != 0) {
            if (Math.floor(((canvas.height / euclidAlg()) / 2) + 1) != Math.floor(i)) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            } else { ctx.strokeStyle = "rgba(255, 255, 255, 0.6)" }
        } else {
            if (i == ((canvas.height / euclidAlg()) / 2)) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            }
        }
        ctx.moveTo(0, (num) * i);
        ctx.lineTo(canvas.width, num * i, );
        ctx.stroke();
    }
}
let drawConnection = (obj1, obj2) => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.moveTo(obj1.x * euclidAlg(), obj1.y * euclidAlg());
    ctx.lineTo(obj2.x * euclidAlg(), obj2.y * euclidAlg());
    ctx.stroke();
}
class Object {
    constructor(_r, _v, _a, _m, _x, _y) {
        this.r = _r;
        this.v = _v;
        this.a = _a;
        this.m = _m;
        if ((canvas.height / euclidAlg()) % 2 != 0) {
            this.y = Math.floor(((canvas.height / euclidAlg()) / 2) + 1) + _y * -1;
        } else {
            this.y = ((canvas.height / euclidAlg()) / 2) + _y * -1;
        }
        if ((canvas.width / euclidAlg()) % 2 != 0) {
            this.x = Math.floor(((canvas.width / euclidAlg()) / 2) + 1) + _x;
        } else {
            this.x = ((canvas.width / euclidAlg()) / 2) + _x;
        }
    }
    draw(color, bgcolor, lineThickness) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineThickness;
        ctx.fillStyle = bgcolor;
        ctx.arc(this.x * euclidAlg(), this.y * euclidAlg(), euclidAlg() * this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
let reset = (objs) => {
    for (i = 0; i < objects.length; i++) {
        if (objects[i] === objs[1]) {
            objects.splice(objects.indexOf(objs[1]), 1)
            objs.splice(objs.indexOf(objs[1]))
        }
    }
    for (let i = 0; i < objs.length; i++) {
        objs[i].x = getRandomInt(0, (canvas.width / euclidAlg()) * 1);
        objs[i].y = getRandomInt(0, (canvas.height / euclidAlg()) * 1);
    }
}
let objects = [];
let objCount = 8999;
for (let i = 0; i < objCount; i++) {
    objects.push(new Object(3, 0, 0, 0, 0, 0))
}

for (let i = 0; i < objects.length; i++) {
    objects[i].x = getRandomInt(0, (canvas.width / euclidAlg()) * 1);
    objects[i].y = getRandomInt(0, (canvas.height / euclidAlg()) * 1);
}
let loop = setInterval(() => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    for (let i = 0; i < objects.length; i += 2) {
        attract(objects[i], objects[i + 1])
            //drawConnection(objects[i], objects[i + 1]);
    }
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw("red", "blue", 1)
    }

})