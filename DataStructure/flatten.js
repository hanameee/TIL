// DFS로 flatten 구현해보기

const data = [1, 2, [3, 4, 5, [6, 7], 8, [9, 10, [11], 12, [13, [14, [15]]]]]];

function flatten(data) {
    let result = [];
    for (d of data) {
        if (typeof d == "object") {
            result = result.concat(flatten(d));
        } else {
            result.push(d);
        }
    }
    return result;
}

let result = flatten(data);
