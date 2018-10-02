/**
 * 
 * @param {number}min-the minimum number which the function should return(default value is 1)
 * @param {number}max-the maximum number the function should return(default value is 0)
 * 
 * returns{number}
 */

let generateRandomNO = (max = 1, min = 0) => {

    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

let drawImage = (src, x, y, width, height, ctx) => {
   // if(src==='images/pipe-bottom.png')  console.log(src,x,y,width,height);
    
    let img = new Image();
    img.src = src;
    ctx.drawImage(img, x, y, width, height);
}