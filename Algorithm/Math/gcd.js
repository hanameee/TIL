// 유클리드 호제법
function gcd(a, b) {
    x = Math.max(a, b);
    y = Math.min(a, b);
    if (y == 0) {
        return x;
    } else {
        return gcd(y, x % y);
    }
}

console.log(gcd(10, 35));
