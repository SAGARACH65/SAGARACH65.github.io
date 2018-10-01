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