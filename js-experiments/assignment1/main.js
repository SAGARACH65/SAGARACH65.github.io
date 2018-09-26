var output = "*";

//flag used to check whether to increase the numbers of * or decrease
var isIncreasing = true;

var display = function () {
    console.log(output);

    if (isIncreasing) {
        if (output.length === 5) isIncreasing = false;
        output += '*';
    } else {
        if (output.length === 2) isIncreasing = true;

        //splicing out the rightmost * when we want to decrease the number of *
        output = output.substr(0, output.length - 1);
    }

}

setInterval(display, 200);