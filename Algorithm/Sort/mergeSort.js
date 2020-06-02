function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    let mid = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, mid));
    let right = mergeSort(array.slice(mid, array.length));
    return merge(left, right);
}

function merge(left, right) {
    result = [];
    left_idx = 0;
    right_idx = 0;
    while (left_idx < left.length && right_idx < right.length) {
        if (left[left_idx] < right[right_idx]) {
            result.push(left[left_idx]);
            left_idx += 1;
        } else {
            result.push(right[right_idx]);
            right_idx += 1;
        }
    }
    if (left_idx >= left.length) {
        result = result.concat(right.slice(right_idx, right.length));
    }
    if (right_idx >= right.length) {
        result = result.concat(left.slice(left_idx, left.length));
    }
    return result;
}

console.log(mergeSort([2, 3, 7, 1, 8, 0]));
