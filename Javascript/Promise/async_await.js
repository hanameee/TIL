function delay(ms) {
    console.log("delay 안");
    return new Promise((resolve, reject) => {
        console.log("promise 안");
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function AsyncDelay() {
    console.log("delay 시작");
    await delay(3000);
    console.log("delay 끝");
}

console.log("async 함수 전");
AsyncDelay().then(() => console.log("비동기 로직 끝"));
console.log("async 함수 끝");
