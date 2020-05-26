"use strict";
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1, x2, y1, y2) {

    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


function deltaX(e1, e2) {
    return e2.x - e1.x;
}

function deltaY(e1, e2) {
    return e2.y - e1.y;
}

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

function line(context, v1, v2, width) {
    context.beginPath();
    if (color)
        context.strokeStyle = color;
    if (width)
        context.lineWidth = width;
    context.moveTo(v1.x, v1.y);
    context.lineTo(v2.x, v2.y);
    context.stroke();
}

Array.prototype.remove = function (v) {
    if (this.indexOf(v) != -1) {
        this.splice(this.indexOf(v), 1);
        return true;
    }
    return false;
}

CanvasRenderingContext2D.prototype.fillCircle = function (center, radius, color) {
    this.beginPath();
    this.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.fillStyle = color || '#FFFFFF';
    this.fill();

}

CanvasRenderingContext2D.prototype.strokeCircle = function (center, radius, color, weight) {
    this.beginPath();
    this.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.strokeStyle = color || '#FFFFFF';
    this.lineWidth = weight;
    this.stroke();
}

class Rectangle {
    constructor(pos, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    isColliding(circle) {
        // clamp(value, min, max) - limits value to the range min..max

        // Find the closest point to the circle within the rectangle
        let closestX = clamp(circle.pos.x, this.pos.x, this.pos.x + this.width);
        let closestY = clamp(circle.pos.y, this.pos.y, this.pos.y + this.height);

        // Calculate the distance between the circle's center and this closest point
        let distanceX = circle.pos.x - closestX;
        let distanceY = circle.pos.y - closestY;

        // If the distance is less than the circle's radius, an intersection occurs
        let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        return distanceSquared < (circle.radius * circle.radius);
    }
/* 
    draw(context) {
        context.beginPath();
        context.rect(this.pos.x, this.pos.y, this.width, this.height);
        context.stroke();
    }
    draw(context, color) {
        context.beginPath();
        context.strokeStyle = color;
        context.rect(this.pos.x, this.pos.y, this.width, this.height);
        context.stroke();        
    } */
}

class Circle {
    constructor(pos, radius) {
        this.pos = pos;
        this.radius = radius;
    }

    isColliding(rect) {        
        return (this.pos.x > rect.pos.x &&
        this.pos.x < rect.pos.x + rect.width &&
        this.pos.y > rect.pos.y && this.pos.y < rect.pos.y + rect.height);
    }
}

function clearChildren(id) {
    document.getElementById(id).innerHTML = "";
}