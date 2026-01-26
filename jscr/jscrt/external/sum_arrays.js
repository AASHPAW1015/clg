var array1 = [1, 0, 2, 3, 4];
var array2 = [3, 5, 6, 7, 8, 13];
var result = [];

var maxLength = Math.max(array1.length, array2.length);

for (var i = 0; i < maxLength; i++) {
    var val1 = array1[i] || 0;
    var val2 = array2[i] || 0;
    result.push(val1 + val2);
}

console.log("The Output :");
console.log(result);
