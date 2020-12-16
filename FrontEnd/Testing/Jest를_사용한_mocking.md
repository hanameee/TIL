# Jest를 사용한 mocking

## mocking 이란?

Unit test를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 한다. 일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 너무 부담스러운 경우, mocking이 많이 사용된다.

예를 들어, DB에서 데이터를 삭제하는 코드에 대한 unit test를 작성할 때, 실제 DB를 사용하면 아래와 같은 여러 문제점이 발생할 수 있다.

- DB 접속 자체가 Network와 I/O 작업을 포함하기에 테스트의 실행속도가 현저히 느려진다. 테스트가 CI/CD 파이프라인의 일부로 자동화되어 자주 실행된다면 테스트의 속도 저하는 큰 문제가 됨.

- 테스트 실행 순간 DB가 오프라인이면 테스트는 실패하게 됨. 즉, 테스트가 인프라 환경에 영향을 받음.

- 테스트 종료 후 DB에서 일어난 변화들을 rollback 해주는 작업이 번거로울 수 있음.

  궁극적으로, 테스트가 어떠한 부분에 의존한다는 것은, **특정 기능을 분리해서 테스트하는 Unit test의 근본적인 사상에 부합하지 않는다.** 단위 테스트는 단독으로 고립되어 있어야 하고, 외부 환경에 의존하지 않아야 한다. (deterministic 해야 한다 - 언제 실행되는 항상 같은 결과를 내어야 한다)

mocking은 이런 상황에서 실제 객체인 척 하는 가짜 객체를 생성하는 메커니즘을 제공한다. 실제 객체보다 훨씬 가볍고 빠르면서도, 의존성 없이 항상 동일한 결과를 내는 테스트를 작성할 수 있다.

## jest.fn() 으로 가짜 함수 모킹하기

`jest.fn()` 함수는 Jest에서 가짜 함수(mock function)를 작성할 수 있도록 해준다.

```js
const mockFn = jest.fn()
```

이 가짜 함수는 일반 JS 함수처럼 인자를 넘겨 호출할 수 있고, 위처럼 선언만 한다면 `undefined`를 리턴한다. 리턴 값을 지정해주려면 `mockReturnValue` 를 사용한 별도의 설정이 필요하다.

```js
mockFn.mockReturnValue("I am a mock") // mockReturnValue(리턴 값) 함수를 이용해 가짜 함수의 리턴값을 설정해줄 수 있다.
```

##mockResolvedValue()로 비동기 함수 모킹하기

`mockResolvedValue(Promise가 resolve 하는 값)` 함수를 이용하면 가짜 비동기 함수를 만들 수 있다.

```js
mockFn.mockResolvedValue("I'll be a mock")
mockFn.then((result) => {
    console.log(result) // I'll be a mock
})
```

추가적으로, `mockImplementation` 함수를 이용하면 즉석에서 함수의 input과 output을 한번에 재구현할 수 있다.

```js
mockFn.mockImplementation((name) => `I am ${name}`)
console.log(mockFn("Hannah")) // I am Hannah
```

## 가짜 함수를 사용하는 이유

가짜 함수는 자신이 **어떻게 호출되었는지, 몇번 호출되었는지를 기억**하기에 유용하다. Jest Matcher의 가짜 함수용 matcher인 `toBeCalled***` 함수를 사용해 가짜 함수가 몇번 호출되었고 인자로 무엇이 넘어왔는지 검증할 수 있다.

```js
mockFn("a")
mockFn(["b","c"])

expect(mockFn).toBeCalledTimes(2)
expect(mockFn).toBeCalledWith("a")
expect(mockFn).toBeCalledWith(["b", "c"])
```

### jest.spyOn()

`jest.spyOn(object, methodName)` 함수는 객체에 속한 함수의 구현을 모킹하는 것이 아니라, 해당 함수의 호출 여부와 어떻게 호출 되었는지만을 알아내야 할 때 사용한다.

```js
const calculator = {
  add: (a, b) => a + b,
}

const spyFn = jest.spyOn(calculator, "add") // calculator 객체의 add 메서드에 스파이를 붙임

const result = calculator.add(2, 3)

expect(spyFn).toBeCalledTimes(1)
expect(spyFn).toBeCalledWith(2, 3)
expect(result).toBe(5)
```

## jest.mock()로 모듈 모킹하기  

JS에서 외부 모듈을 모킹해야 할 경우가 생길 수 있다. 예를 들어, axios 같은 모듈.

axios를 그대로 불러와서 실제 get 함수를 사용하면, 테스트 코드가 API의 작동에 의존성을 가지게 되는 등의 문제가 발생한다. 따라서 외부 모듈의 함수들을 그대로 가져쓰는 것이 아니라, 모킹하여 사용해야 한다.

단, 외부 모듈을 모킹 할 시 주의해야 하는 점이 있는데, import 키워드로 불러온 함수들은 기본적으로 const 변수이기 때문에 아래와 같이 mock 함수를 바로 할당하는 것은 불가능하다.

```js
import { sendEmail, sendSMS } from './messageService'; // const 변수로 불러와진다

sendEmail = jest.fn(); // "sendEmail" is read-only.
```

다만, 아래처럼 모듈의 모든 함수를 하나의 객체로 불러온 후 하나씩 mock 함수를 할당할 수는 있다.

```js
import * as messageService from "./messageService"

// 객체의 속성으로 접근해 하나씩 mock 함수 할당
messageService.sendEmail = jest.fn()
messageService.sendSMS = jest.fn()

const sendEmail = messageService.sendEmail
const sendSMS = messageService.sendSMS

```

하지만 위의 방법은 번거롭고, 모듈이 제공하는 함수가 많을 경우 더더욱 번거로워진다는 단점이 있다.

이러한 문제를 **jest.mock()** 함수를 통해 해결할 수 있는데, jest.mock() 을 사용하면 자동으로 모듈을 모킹해준다.

```js
const axios = require("axios")
const userService = require("./userService")

jest.mock("axios") // axios 모듈의 모든 함수가 자동으로 mock 함수로 대체됨

test("findOne fetches data from the API endpoint and returns what axios get returns", async () => {
  // 우리는 resolve 값만 설정해주면 됨
  axios.get.mockResolvedValue({
    data: {
      id: 1,
      name: "Hannah Lee",
    },
  })

  const user = await userService.findOne(1)

  expect(user).toHaveProperty("id", 1)
  expect(user).toHaveProperty("name", "Hannah Lee")
  expect(axios.get).toBeCalledTimes(1)
  expect(axios.get).toBeCalledWith(
    `https://jsonplaceholder.typicode.com/users/1`
  )
})
```

