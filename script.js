let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
let drawGrid = () => {
    let num = euclidAlg();
    for (let i = 0; i <= canvas.width / num; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if ((canvas.width / euclidAlg()) % 2 != 0) {
            if (Math.floor(((canvas.width / euclidAlg()) / 2) + 1) != Math.floor(i)) {
                console.log("a")
                ctx.strokeStyle = "red";
            } else {
                ctx.strokeStyle = "black";
                console.log("b")
            }
        } else {
            if (i == ((canvas.width / euclidAlg()) / 2)) {
                ctx.strokeStyle = "black";
            } else {
                ctx.strokeStyle = "red";
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
                ctx.strokeStyle = "red";
            } else { ctx.strokeStyle = "black" }
        } else {
            if (i == ((canvas.height / euclidAlg()) / 2)) {
                ctx.strokeStyle = "black";
            } else {
                ctx.strokeStyle = "red";
            }
        }
        ctx.moveTo(0, (num) * i);
        ctx.lineTo(canvas.width, num * i, );
        ctx.stroke();
    }
}
let drawConnection = (obj1, obj2) => {
    ctx.beginPath();
    ctx.lineWidth = 5;
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
let objects = [new Object(1, 0, 0, 0, 10, 10), new Object(1, 0, 0, 0, 0, 0)]
let loop = setInterval(() => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawConnection(objects[0], objects[1]);
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw("blue", "green", 1)
    }

}, 1)