// 최소공배수 = (a*b)/(a와 b의 최대공약수)
function gcd(a, b) {
    x = Math.max(a, b);
    y = Math.min(a, b);
    if (y == 0) {
        return x;
    } else {
        return gcd(y, x % y);
    }
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

console.log(lcm(10, 35));
