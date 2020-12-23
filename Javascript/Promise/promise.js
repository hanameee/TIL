// 1. Promise Producer - Promise로 구현된 비동기 함수는 Promise 객체를 반환해야 함
// XMLHttpRequest ver.
const promiseAjax = (method, url, payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status >= 200 && xhr.status < 400) {
                // success
                resolve(xhr.response);
            } else {
                // fail
                reject(new Error(xhr.status));
            }
        };
    });
};

// 2. Promise Consumer -프로미스 객체를 사용하는 입장에서는 .then, .catch, 후속 처리 메소드를 통해 비동기 처리 결과 또는 에러 메세지를 전달받아 처리함
promiseAjax.then(
	function(result)
  function(error)
)