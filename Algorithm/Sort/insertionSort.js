function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        target = arr[i];
        let j;
        for (j = i - 1; j >= 0; j--) {
            if (arr[j] > target) {
                arr[j + 1] = arr[j];
            } else {
                break;
            }
        }
        arr[j + 1] = target;
        console.log(i, arr);
    }
    return arr;
}

console.log(insertionSort([2, 3, 7, 1, 8, 0]));
