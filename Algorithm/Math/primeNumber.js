// 에라토스테네스의 체
function find_prime_num(num) {
    let num_arr = [0, 0];
    for (let i = 2; i <= num; i++) {
        num_arr.push(i);
    }
    for (let i = 2; i <= num ** 0.5; i++) {
        if (num_arr[i]) {
            let j = 2;
            while (i * j <= num) {
                num_arr[i * j] = 0;
                j += 1;
            }
        }
    }
    num_arr = num_arr.filter((x) => x != 0);
    return num_arr;
}

console.log(find_prime_num(50));
