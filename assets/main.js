let bgColor = "#fdf6e3";
let outlineColor = "#002b36";
let lightOutlineColor = "#eee8d5";

function get(id){
    /* Convenience function to get element from id */
    return document.getElementById(id);
}

let width = window.innerWidth-20;
let height = window.innerHeight-20-180;
let points = [];
let hull = [];

function eraseArrays(){
    points.length = 0;
    hull.length = 0;
}

function randomPoints(){
    let numPoints = 20;
    let paddingW = width*0.1;
    let paddingH = height*0.1;
    points.length = 0;
    for (let i=0; i<numPoints; i++){
        points.push([
            Math.round(paddingW+Math.random()*(width-2*paddingW)),
            Math.round(paddingH+Math.random()*(height-2*paddingH))
        ]); 
    }
}

function setup(){
    createCanvas(width,height);
    //textFont(loadFont("compModern.ttf"));
    textFont("compModern");
    textSize(25);
    strokeWeight(1.5);
    textAlign(CENTER,CENTER);
}

function mousePressed(){
    if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height){
        points.push([mouseX,mouseY]);
    }   
}

function windowResized(){
    width = window.innerWidth-20;
    height = window.innerHeight-20-180;
    resizeCanvas(width,height);
}

function draw(){
    background(bgColor);
    /* Draw help text if no points have been created */
    if (points.length == 0){
        textSize(50);
        noStroke();
        fill(lightOutlineColor);
        text("click to add points",width/2,height/2);
        textSize(25);
    }
    /* Draw processing order, just because it looks cool */
    stroke(lightOutlineColor);
    for (let i=0; i<points.length-1; i++){
        line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);
    }
    /* Draw the convex hull */
    noFill();
    stroke(outlineColor);
    if (hull.length != 0){
        beginShape();
        for (let point of hull){
            vertex(point[0],point[1]);
        }
        endShape(CLOSE);
    }
    /* Draw each point */
    for (let i=0; i<points.length; i++){
        fill(bgColor);
        stroke(outlineColor);
        circle(points[i][0],points[i][1],40);
        fill(outlineColor);
        noStroke();
        text(i,points[i][0],points[i][1]);
    }
    hull = convexhull(points);
}