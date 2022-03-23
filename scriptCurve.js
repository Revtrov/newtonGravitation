let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    try {
        if (obj1.x != obj2.x && obj1.y != obj2.y && obj1.x > 0 && obj1.y > 0 && obj1.x < canvas.width / euclidAlg() && obj1.y < canvas.height / euclidAlg()) {
            let y = slope(obj1, obj2);
            let x = 1 * obj1.v;
            let xDif = obj1.x - obj2.x;
            let yDif = obj1.y - obj2.y;
            if (y < 0 && xDif > 0 & yDif < 0) {
                //p1 bottom right;
                obj1.x -= x;
                obj1.y += obj1.v * Math.abs(slope(obj1, obj2));
                obj2.x += x;
                obj2.y -= obj2.v * Math.abs(slope(obj1, obj2));
            }
            if (y > 0 && xDif < 0 & yDif < 0) {
                //p1 bottom left;
                obj1.x += x;
                obj1.y += obj1.v * Math.abs(slope(obj1, obj2));
                obj2.x -= x;
                obj2.y -= obj2.v * Math.abs(slope(obj1, obj2));
            }
            if (y < 0 && xDif < 0 & yDif > 0) {
                //p1 top left;
                obj1.x += x;
                obj1.y -= obj1.v * Math.abs(slope(obj1, obj2));
                obj2.x -= x;
                obj2.y += obj2.v * Math.abs(slope(obj1, obj2));
            }
            if (y > 0 && xDif > 0 & yDif > 0) {
                //p1 top right;
                obj1.x -= x;
                obj1.y -= obj1.v * Math.abs(slope(obj1, obj2));
                obj2.x += x;
                obj2.y += obj2.v * Math.abs(slope(obj1, obj2));
            }
        } else {
            reset([obj1, obj2])
        }
    } catch (e) { null }
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
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            } else {
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            }
        } else {
            if (i == ((canvas.width / euclidAlg()) / 2)) {
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            } else {
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
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
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            } else { ctx.strokeStyle = "rgba(0, 0, 0, 0.1)" }
        } else {
            if (i == ((canvas.height / euclidAlg()) / 2)) {
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            } else {
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
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
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgb(155, 155, 155)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = "white";
    ctx.moveTo(obj1.x * euclidAlg(), obj1.y * euclidAlg());
    ctx.lineTo(obj2.x * euclidAlg(), obj2.y * euclidAlg());
    ctx.stroke();
}
class Object {
    constructor(_r, _v, _a, _m, _x, _y, _objColor, _dirX) {
        this.r = _r;
        this.v = _v;
        this.a = _a;
        this.m = _m;
        this.objColor = _objColor;
        this.dirX = _dirX
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
    move() {
        if (this.dirX == 0) {
            this.x -= getRandomInt(0, 10);
        } else if (this.dirX == 1) {
            this.x += getRandomInt(0, 10);
        }
        this.y *= 1.00001
    }
    draw(color, lineThickness) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineThickness;
        ctx.fillStyle = this.objColor;
        //ctx.font = '48px serif';
        //ctx.fillText('HELLO WORLD', this.x * euclidAlg(), this.y * euclidAlg());
        ctx.arc(this.x * euclidAlg(), this.y * euclidAlg(), euclidAlg() * this.r, 0, 2 * Math.PI);
        //ctx.moveTo(this.x * euclidAlg(), this.y * euclidAlg());
        //ctx.lineTo(this.x * euclidAlg() + 10, this.y + 10);
        //ctx.lineTo(this.x * euclidAlg() - 10, this.y + 10);
        //ctx.lineTo(this.x * euclidAlg(), this.y * euclidAlg());
        ctx.shadowBlur = 5;
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fill();
        ctx.stroke();
    }
}
let reset = (objs) => {
    let newR = (objs[0].r + objs[1].r) * 1.1;
    //if (objs[0].objColor != objs[1].objColor) {
    // for (i = 0; i < objects.length; i++) {
    //     if (objects[i] === objs[1]) {
    //         let num = getRandomInt(0, 2);
    //         objects.splice(objects.indexOf(objs[num]), 1)
    //         objs.splice(objs.indexOf(objs[num]))
    //     }
    // }
    for (let i = 0; i < objs.length; i++) {
        //if (newR < 50) { objs[i].r = newR; }
        objs[i].objColor = `rgba(${/*newR*/0}, 0, 0)`;
        objs[i].x = getRandomInt(0, (canvas.width / euclidAlg()) * 1);
        objs[i].y = getRandomInt(0, (canvas.height / euclidAlg()) * 1);
    }

    //}
    // for (let i = 0; i < objs.length; i++) {
    //     objs[i].x = getRandomInt(0, (canvas.width / euclidAlg()) * 1);
    //     objs[i].y = getRandomInt(0, (canvas.height / euclidAlg()) * 1);
    // }
}
let objects = [];
let objCount = 98;
let colArray = [];
let colRingArray = [];
colors = ["black", "black"]

var video = document.getElementById("video");
var stream = canvas.captureStream();
video.srcObject = stream;
for (let i = 0; i < objCount; i++) {
    if (i == 0) {
        colArray.push(1);
        colRingArray.push(0);
    }
    if (i == 1) {
        colArray.push(0);
        colRingArray.push(1);
    }
    if (i % 2 == 0) {
        colArray.push(1);
        colRingArray.push(0);
    } else {
        colArray.push(0);
        colRingArray.push(1);
    }
}
let sizes = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3]
for (let i = 0; i < objCount; i++) {
    objects.push(new Object( /*sizes[getRandomInt(0, sizes.length)]*/ getRandomInt(1, 20), 2, 0, 0, 0, 0, colors[colArray[i]], getRandomInt(0, 2)))
}

for (let i = 0; i < objects.length; i++) {
    objects[i].x = getRandomInt(0, (canvas.width / euclidAlg()) * 1);
    objects[i].y = getRandomInt(0, (canvas.height / euclidAlg()) * 1);
}
let loop = setInterval(() => {
    ctx.fillStyle = "black";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    try {
        for (let i = 0; i < objects.length; i += 2) {
            drawConnection(objects[i], objects[i + 1]);
            attract(objects[i], objects[i + 1])
        }
    } catch { null }
    for (let i = 0; i < objects.length; i += 1) {
        objects[i].draw("black", 0.1)
        objects[i].move()
    }
}, )