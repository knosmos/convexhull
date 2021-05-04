function slope(p1,p2){
    /*
    Calculate slope of two points, used to find whether angle is concave.
    */
    return (p1[1]-p2[1])/(p1[0]-p2[0]);
}

function compare(a,b){
    /*
    Comparison function used to sort by x and y coordinates
    */
    if (a[0] == b[0]){
        return a[1]-b[1];
    }
    return a[0]-b[0];
}

function fudge(points){
    /* Used to avoid vertical lines; adds a tiny bit to one point when vertical line is detected */
    let fudgeVal = 0.01;
    for (let i=1; i<points.length; i++){
        if (points[i][0]==points[i-1][0]){
            points[i][0] += fudgeVal;
        }
    }
    return points;
}

function convexhull(points){
    uh = []; // upper hull
    lh = []; // lower hull
    points = points.sort(compare); // sort points in increasing order of x-coordinate
    points = fudge(points);
    /*
    Calculate upper hull first. We process points in order of x-coordinate; for each point, we
    first remove points from uh until the last two points of uh and the
    new point form a convex angle, and then append the new point to uh.
    */
    for (let i=0; i<points.length; i++){
        while (uh.length >= 2){
            if (slope(uh[uh.length-1],uh[uh.length-2]) < slope(uh[uh.length-1],points[i])){
                uh.pop();
            }
            else {
                break;
            }
        }
        uh.push(points[i]);
    }
    /*
    Ditto for the lower hull, except we process from right-to-left instead of left-to-right, and
    our concave angle check is reversed.
    */
    for (let i=points.length-1; i>=0; i--){
        while (lh.length >= 2){
            if (slope(lh[lh.length-1],lh[lh.length-2]) < slope(lh[lh.length-1],points[i])){
                lh.pop();
            }
            else {
                break;
            }
        }
        lh.push(points[i]);
    }
    /*
    Remove last element of each hull (since they overlap) and return full hull
    */
    uh.pop();
    lh.pop();
    return uh.concat(lh);
}