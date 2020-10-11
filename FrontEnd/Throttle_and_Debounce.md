# Throttle과 Debounce 개념 정리하기

두 가지 방법 모두 DOM 이벤트를 기반으로 실행하는 자바스크립트를 성능 상의 이유로 제어하는 방법.

- 사용자가 창 크기 조정을 멈출 때까지 기다렸다가 resizing event 사용하기 위해

- 사용자가 키보드 입력을 중지(예: 검색창) 할 때까지 ajax 이벤트를 발생시키지 않기 위해

- 페이지의 스크롤 위치를 측정하고 최대 50ms 마다 응답하기를 바랄 경우에

- 앱에서 요소를 드래그 할 때 좋은 성능을 보장하기 위해

## Throttle

이벤트 호출 시 일정 시간 뒤에 호출 하는 것

`Throttle` 은 이벤트를 일정한 주기마다 발생하도록 하는 기술.
예를 들어 Throttle 의 설정시간으로 1ms 를 주게되면 해당 이벤트는 1ms 동안 최대 한번만 발생하게 됩니다.

무한 스크롤링에 쓰임.

## Debounce

이벤트를 그룹화하여 특정시간이 지난 후 **하나의 이벤트**만 발생하도록 하는 기술. 
즉, 순차적 호출을 하나의 그룹으로 "그룹화"할 수 있다.

아무리 많은 이벤트가 발생해도 다 무시하고, 특정 시간 사이에 어떤 이벤트도 발생하지 않았을 때 딱 한번만 **마지막**/처음 이벤트를 발생시킨다.


브라우저 리사이징, 키보드 자동완성 (마지막 글자까지 다 쳤을 때), 드래그 등등

## 둘의 차이점

디바운싱과 스로틀의 가장 큰 차이점은 **스로틀은 적어도 X 밀리 초마다 정기적으로 기능 실행을 보장한다**는 것입니다.
Debounce 는 아무리 많은 이벤트가 발생해도 모두 무시하고 특정 시간사이에 어떤 이벤트도 발생하지 않았을 때 딱 한번만 마지막 이벤트를 발생시키는 기법입니다.
따라서 5ms 가 지나기전에 계속 이벤트가 발생할 경우 콜백에 반응하는 이벤트는 발생하지 않고 계속 무시됩니다.

## 구현

클로저를 사용해 구현할 수 있다.

```js
const throttleAndDebounce = () => {
  // 쓰로틀링과 디바운스를 체크하기 위한 변수를 만들어줍니다.
  let throttleCheck, debounceCheck;
  
  return {
    // throttle과 debounce 모두 실행할 콜백 함수와 실행할 주기를 인자로 받습니다.
    throttle (callback, milliseconds) {
      return function () {
        if (!throttleCheck) {
          // setTimeout을 이용하여 설정한 주기마다 콜백이 실행될 수 있도록 하였고,
          // 실행이 끝난 후에는 다시 throttleCheck를 false로 만들어 주어, 설정한 주기마다 이벤트가 한 번씩만 호출되도록 하였습니다.
          throttleCheck = setTimeout(() => {
            callback(...arguments);
            throttleCheck = false;
          }, milliseconds);
        }
      }
    },
    
    debounce (callback, milliseconds) {
      return function () {
        // clearTimeout을 이용하여 이벤트 발생을 무시해주고,
        // 마지막 호출 이후, 일정 시간이 지난 후에 단 한 번만, 이벤트가 호출되도록 하였습니다.
        clearTimeout(debounceCheck);
        debounceCheck = setTimeout(() => {
          callback(...arguments);
        }, milliseconds);
      }
    }
  }
}
```

출처: https://pewww.tistory.com/9