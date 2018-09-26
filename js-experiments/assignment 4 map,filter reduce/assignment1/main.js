let output = ['*', '**', '***', '****', '*****', '******'];

//flag used to check whether to increase the numbers of * or decrease
let isIncreasing = true;
let requiredLength = 1;

let display = () => {

    console.log(output.filter(item => item.length === requiredLength).toString());

    if (isIncreasing) {
        if (requiredLength === 5) isIncreasing = false;

        requiredLength++;

    } else {

        if (requiredLength === 2) isIncreasing = true;

        requiredLength--;

    }

}

setInterval(display, 200);