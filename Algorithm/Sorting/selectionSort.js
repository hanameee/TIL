function swap(array, x, y) {
    let temp = array[x];
    array[x] = array[y];
    array[y] = temp;
    return array;
}

function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let min_value_idx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min_value_idx]) {
                min_value_idx = j;
            }
        }
        if (i != min_value_idx) {
            array = swap(array, min_value_idx, i);
        }
    }
    return array;
}

console.log(selectionSort([1, 5, 3, 7, 9, 11]));
