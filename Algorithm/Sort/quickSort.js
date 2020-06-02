function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    let pivot = array[0];
    let left = [];
    let right = [];
    for (let idx = 1; idx < array.length; idx++) {
        if (array[idx] < pivot) {
            left.push(array[idx]);
        } else {
            right.push(array[idx]);
        }
    }
    return quickSort(left).concat([pivot]).concat(quickSort(right));
}

console.log(quickSort([2, 3, 7, 1, 8, 0]));
