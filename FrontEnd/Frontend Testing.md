# Frontend Testing

## Testing 개요

### 테스트의 종류

1) Unit Test (유닛 테스트, 단위 테스트)

- 사용 라이브러리: Jest

단위 테스트는 isolated 되어야 한다. 독자적인 mock data, mock api 를 가지고 있어야 하고, 온라인이든 오프라인이든 무관하게 deterministic하게 동작해야 한다.

2) Integration Test (통합 테스트

- 사용 라이브러리: Testing Library

3) Functional Test (E2E Test)

- 사용 라이브러리: Cypress, Enzyme
- 실제 테스트 서버 위에서 동작한다. 직접 텍스트를 입력해보는 등 다양한 유저 시나리오를 테스트해보아야 한다.

### 유닛 테스트와 통합 테스트

#### 유닛 테스트

유닛 테스트는 작은 단위로 작성된다. 예를 들어, 아래와 같은 테스트들은 유닛 테스트라고 할 수 있다.

- 컴포넌트가 잘 렌더링된다

- 컴포넌트의 특정 함수를 실행하면 상태가 우리가 원하는 형태로 바뀐다

- 리덕스의 액션 생성 함수가 액션 객체를 잘 만들어낸다

그런데, 프로젝트의 각 기능들이 잘 작동하는 것 만으로는, 프로젝트가 전체적으로 잘 작동하는지를 보장할 수 없다.

![img](https://cdn-images-1.medium.com/max/1600/1*4-T6VVnULaszi9ydHQ7Sfw.gif)

### 통합 테스트

기능들이 전체적으로 잘 작동하는지 확인하기 위해서 사용하는 것이 바로 통합 테스트이다. 예를 들어, 아래와 같은 테스트들은 통합 테스트라고 할 수 있다.

- 여러 컴포넌트들을 렌더링하고, 서로 상호작용을 잘 하고 있다.
- DOM 이벤트를 발생시켰을 때 UI에 원하는 변화가 잘 작동한다.

### 유닛 테스트와 통합 테스트의 차이점

유닛 테스트가 하나에 초점을 둔다면, 통합 테스트는 여러 요소들을 고려하여 작성한다. 한 파일에 있는 여러 기능들을 함께 사용하는 것도 통합테스트로 간주된다.

---

## React Testing Library

### Behavior driven test

React testing library는 **Behavior Driven Test** 방법론과 함께 주목 받기 시작한 테스팅 라이브러리이다. 참고로 패키지 이름은 `@testing-library/react` 이다.

Behavior Driven Test 는 implementation driven test의 단점을 보완하기 위한 방법론이다.

Implementation Driven Test에서는 주로 애플리케이션이 어떻게 작동하는지에 대해서 초점을 두어 테스트를 작성하는 반면, Behavior Driven Test는 사용자가 애플리케이션을 이용하는 관점에서 사용자의 실제 경험 위주로 테스트를 작성한다.

```html
<h2 class="title">
    제목
</h2>
```

위와 같은 코드에서, `h2` 가 `h3` 으로 변경되었다고 가정해보자. 

Implementation Driven Test 방법론으로 작성된 테스트는 `<h2>`라는 태그가 쓰였고, `title` 이라는 클래스가 사용되었는지 여부를 테스트하기에 테스트가 깨질 것이다.

하지만 Behavior Driven Test 방법론으로 작성된 테스트는 깨지지 않을 것이다. 애플리케이션 입장에서는 구현의 디테일이 바뀌었을지라도, 사용자 입장에서는 "제목"이라는 텍스트가 보인다는 사실엔 변함이 없기 때문이다.

### Enzyme vs. RTL

정리하자면, Enzyme과 RTL은 서로 다른 철학을 가지고 있다. Enzyme을 사용한 테스트코드는 컴포넌트의 내부 기능을 자주 접근합니다. 예를 들어 컴포넌트가 지니고 있는 props, state 를 확인하고, 컴포넌트의 내장 메서드를 직접 호출하기도 한다.

반면, RTL은 렌더링 결과에 조금 더 집중한다. 컴포넌트의 인스턴스가 아닌 실제 DOM에 대해 신경을 더 많이 쓴다. 실제 화면에 무엇이 보이고, 어떤 이벤트가 발생했을 때 원하는 변화가 생겼는지 이런 것들을 확인하는 데에 좀 더 최적화 되어있다. 즉, 사용자 관점에서 테스팅하기에 적합하다. 

#### Enzyme

RTL이 등장하기 전에서는 Enzyme이라는 테스팅 라이브러리가 많이 사용되었다.

**Enzyme은 Implementation Driven Test 방법론을 따르는 테스트를 작성하기에 적합**한데, 그 이유는 Enzyme를 사용하면 실제 브라우저 DOM이 아닌, React가 만들어내는 가상 DOM을 기준으로 테스트를 작성하기 때문이다.

테스트 대상인 React component에 어떤 prop이 넘어가고, 현재 state가 무엇인지에 대해 검증하기 용이하다.

#### RTL

반면 **RTL은 Behavior Driven Test 방법론을 따르는 테스트를 작성하는데 적합**한데, 그 이유는 RTL을 사용하면 `jsdom`이라는 라이브러리를 통해 실제 브라우저 DOM을 기준으로 테스트를 작성하기 때문이다.

따라서 어떤 React component를 사용하는지는 의미가 없고, 최종적으로 사용자 브라우저에서 렌더링하는 실제 HTML 마크업의 모습이 어떤지에 대해 테스트를 하게 된다.

생각해보면, 리액트 컴포넌트를 리팩토링 할 때 내부 구조나 네이밍이 많이 바뀔 수는 있어도, 실제 사용자가 느끼는 작동 방식은 크게 바뀌지 않는다. 따라서 

최근의 패러다임은 Behavior Driven Test 쪽으로 넘어가고 있기에, RTL이 많이 선택되는 추세이다.



### RTL 설정

RTL을 사용하기 위해서는 2가지 설정이 필요하다.

1. **cleanup** : 각 테스트가 DOM에 렌더링 해놓은 내용들을 테스트가 끝날 때 다음 테스트를 위해 지워줌

   ```js
   import "@testing-library/react/cleanup-after-each"
   // 또는
   import { cleanup } from '@testing-library/react'
   afterEach(cleanup)
   ```

2. **jest-dom** : jest의 확장으로서, jest에서 DOM 관련된 matcher을 사용할 수 있게 해줌

   ```js
   import '@testing-library/jest-dom/extend-expect'
   ```

RTL에서는 DOM 시뮬레이션을 위해 jsdom이라는 도구를 사용하여 document.body에 리액트 컴포넌트를 렌더링한다. 또, 각 테스트 케이스가 끝날때마다 기존 가상 dom에 남아있는 UI 를 cleanup 한다.

### RTL 주요 API

1. **render()** : DOM에 컴포넌트를 렌더링해주는 함수
2. **fireEvent** : 특정 이벤트를 발생시켜주는 객체
3. getBy000, queryBy000, findBy000 ... : DOM에서 특정 영역을 선택하기 위한 다양한 쿼리 함수들 [링크 참고](https://testing-library.com/docs/dom-testing-library/cheatsheet). 쿼리 함수들은 `variant`와 `queries`의 조합으로 네이밍이 이루어져있다. [링크](https://velog.io/@velopert/react-testing-library

```js
import { render, fireEvent } from "@testing-library/react"

const { getByText, getByLabelText, getByPlaceholderText } = render(
  <YourComponent />
)
```

**render 함수**는 위처럼 인자로 렌더링할 React Component를 받아, RTL이 제공하는 모든 쿼리/유틸리티 함수를 담고 있는 객체를 리턴한다. 따라서 Destructuring 문법을 통해 원하는 함수만 얻어올 수 있다.

**fireEvent 객체**는 쿼리 함수로 선택된 영역을 대상으로 특정 이벤트를 발생시키기 위한 이벤트 함수들을 담고 있다.

## 리액트 컴포넌트 테스팅

### 정적 컴포넌트 테스팅 

render 함수가 리턴하는 쿼리 함수들과, jest-dom의 matcher 함수를 이용해 컴포넌트의 요소들이 제대로 렌더링 되고 있는지 검증해볼 수 있다.

[예시]

```react
import React from 'react'

function NotFound({path}) {
    return (
        <>
          <h2>Page Not Found</h2>
          <p>해당 페이지({path})를 찾을 수 없습니다.</p>
          <img
            alt="404"
            src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
          />
        </>
    )
}
```

위와 같은 정적인 컴포넌트를 테스트 한다고 가정하면, 헤더 렌더링 테스트는 아래와 같이 작성할 수 있다.

1) 헤더 렌더링 테스트

```react
import React from "react"
import { render } from "@testing-library/react" // 컴포넌트를 렌더링하기 위한 함수
import Notfound from "./NotFound" // 테스트 할 컴포넌트

describe("<NotFound />", () => {
    it("renders header", () => {
        const { getByText } = render(<NotFound path="/abc" />) // render 이 리턴하는 다양한 쿼리 함수들 중, destructuring으로 원하는 함수만 가져오기
        const header = getByText("Page Not Found") // getByText에 검색할 텍스트를 인자로 넘겨 h2 엘리먼트 얻기
        expect(header).toBeInTheDocument() // jest-dom의 matcher 함수를 사용하여 화면에 존재하는지 검증
    })
})
```

### 동적 컴포넌트 테스팅 

내부 상태/이벤트에 따라 UI에 변화가 생기는 복잡한 컴포넌트 역시 테스트 할 수 있다.

마찬가지로 render 함수가 리턴하는 쿼리 함수들과, jest-dom의 matcher 함수들, 그리고 추가적으로 **fireEvent의 객체**들을 활용해 특정 이벤트를 발생시켰을 때 기대하는 결과가 잘 동작하는지 검증해볼 수 있다.

[예시]

```react
import React, { useState } from "react"

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          이메일
          <input
            type="email"
            placeholder="user@test.com"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </label>
        <button disabled={!email || !password}>로그인</button>
      </form>
    </>
  )
}
```

로그인 버튼은 email과 password가 둘 다 입력된 후에 활성화된다. 또, 로그인 버튼을 클릭했을 때 onSubmit 함수가 호출되어야 한다.

1) 로그인 버튼이 활성화되는지 검증하기

```react
import React from "react"
import { render, fireEvent } from "@testing-library/react"
import LoginForm from "./LoginForm"

describe("<LoginForm />", () => {
    it("enables button when both email and password are entered", () => {
        const { getByText, getByLabelText } = render(
        	<LoginForm onSubmit={() => null}/>
        )
    	const button = getByText("로그인")
        const email = getByLabelText("이메일")
        const password = getByLabelText("비밀번호")
        
        expect(button).toBeDisabled() // 처음에는 로그인 버튼이 disabled 되어있어야 함
        
        // fireEvent 객체의 메소드를 통해 이메일과 비밀번호를 입력하는 이벤트를 발생시킴
        fireEvent.change(email, { target: {value: "user@test.com"}})
        fireEvent.change(password, { target: {value: "test1234"}})
        
        expect(button).toBeEnabled() // jest-dom의 matcher 함수를 통해 활성화 여부를 이벤트 발생 전후로 검증함
    })
})
```

2) 로그인 버튼을 클릭했을 때, prop으로 넘긴 onSubmit 함수가 호출되는지 검증하기

```react
it("submits form when button is clicked", () => {
    const onSubmit = jest.fn() // 가짜 함수를 만든다
    const { getByText, getByLabelText } = render(
    	<LoginForm onSubmit={onSubmit}/>
    )
    const button = getByText("로그인")
    const email = getByLabelText("이메일")
    const password = getByLabelText("비밀번호")
        
    fireEvent.change(email, { target: {value: "user@test.com"}})
    fireEvent.change(password, { target: {value: "test1234"}})
    
    fireEvent.click(button)
    
    expect(onSubmit).toHaveBeenCalledTimes(1)
})
```



### 리액트 비동기 작업 테스트

리액트 앱에서 비동기 작업이 있을 때, 또 API 요청을 할 때 mock 하는 방법.

#### 비동기적으로 바뀌는 UI 컴포넌트 테스트하기

```react
import React, { useState, useCallback } from 'react';

const DelayedToggle = () => {
  const [toggle, setToggle] = useState(false);
  // 1초 후 toggle 값을 반전시키는 함수
  const onToggle = useCallback(() => {
    setTimeout(() => {
      setToggle(toggle => !toggle);
    }, 1000);
  }, []);
  return (
    <div>
      <button onClick={onToggle}>토글</button>
      <div>
        상태: <span>{toggle ? 'ON' : 'OFF'}</span>
      </div>
      {toggle && <div>야호!!</div>}
    </div>
  );
};

export default DelayedToggle;
```

위처럼 1초 후 상태 값이 바뀌고, 상태가 ON 일때 텍스트가 보여지는 컴포넌트가 있다면, 이런 컴포넌트의 테스트는 어떻게 작성할까?

[Async utilities](https://testing-library.com/docs/dom-testing-library/api-async)

여러 Async Utilities 함수가 존재하나, 그 중 주로 2가지를 사용하는 것 같다. [공식 문서](https://testing-library.com/docs/dom-testing-library/api-async)

1. waitFor
2. waitForElementToBeRemoved

#### REST API 호출하는 경우  (axios mock adaptor)

테스트 코드에서도 똑같이 서버에 API 요청을 보낼 수도 있지만, 일반적으로 그렇게 하지 않고 이를 mocking 한다. (API에 dependent 하지 않게 하기 위해)

이렇게 API 요청이 실제로 발생하진 않지만 마치 발생 한 것처럼 작동하게 하기 위해서 `axios-mock-adapter` 이라는 라이브러리를 사용할 수 있다.

[사용법](https://www.npmjs.com/package/axios-mock-adapter)

```js
var MockAdapter = require("axios-mock-adapter");
 
// 2개의 파라미터를 받는다. 두번째 파라미터로 ms를 주어 delay도 정할 수 있다.
var mock = new MockAdapter(axiosInstance, {delayResponse:2000});

// GET 요청을 mocking 한다. reply에 들어가는 파라미터는 status, data, headers 순이다.
mock.onGet("/users").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});
 
axios.get("/users").then(function (response) {
  console.log(response.data);
});
```

[예시]

MockAdaptor 을 사용해서 API를 mocking 해준 후, Async Utilities를 사용해 테스트코드를 작성할 수 있다.

```react
import React from 'react';
import { render } from 'react-testing-library';
import UserProfile from './UserProfile';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('<UserProfile />', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 });
  // API GET 요청에 대한 응답을 미리 정한다
  mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  });
  it('calls getUser API loads userData properly', async () => {
    const { getByText } = render(<UserProfile id={1} />);
    await waitForElement(() => getByText('로딩중..')); // 로딩중.. 문구 보여줘야함
    await waitForElement(() => getByText('Bret')); // Bret (username) 을 보여줘야함
  });
});
```

### Reference

[React Testing Library 사용법](https://www.daleseo.com/react-testing-library/)

[react-testing-library 의 비동기작업을 위한 테스트](https://velog.io/@velopert/react-testing-library-의-비동기작업을-위한-테스트)

---

## Jest를 사용한 mocking

### mocking 이란?

Unit test를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 한다. 일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 너무 부담스러운 경우, mocking이 많이 사용된다.

예를 들어, DB에서 데이터를 삭제하는 코드에 대한 unit test를 작성할 때, 실제 DB를 사용하면 아래와 같은 여러 문제점이 발생할 수 있다.

- DB 접속 자체가 Network와 I/O 작업을 포함하기에 테스트의 실행속도가 현저히 느려진다. 테스트가 CI/CD 파이프라인의 일부로 자동화되어 자주 실행된다면 테스트의 속도 저하는 큰 문제가 됨.

- 테스트 실행 순간 DB가 오프라인이면 테스트는 실패하게 됨. 즉, 테스트가 인프라 환경에 영향을 받음.

- 테스트 종료 후 DB에서 일어난 변화들을 rollback 해주는 작업이 번거로울 수 있음.

  궁극적으로, 테스트가 어떠한 부분에 의존한다는 것은, **특정 기능을 분리해서 테스트하는 Unit test의 근본적인 사상에 부합하지 않는다.** 단위 테스트는 단독으로 고립되어 있어야 하고, 외부 환경에 의존하지 않아야 한다. (deterministic 해야 한다 - 언제 실행되는 항상 같은 결과를 내어야 한다)

mocking은 이런 상황에서 실제 객체인 척 하는 가짜 객체를 생성하는 메커니즘을 제공한다. 실제 객체보다 훨씬 가볍고 빠르면서도, 의존성 없이 항상 동일한 결과를 내는 테스트를 작성할 수 있다.

### jest.fn()

#### 가짜 함수 모킹

`jest.fn()` 함수는 Jest에서 가짜 함수(mock function)를 작성할 수 있도록 해준다.

```js
const mockFn = jest.fn()
```

이 가짜 함수는 일반 JS 함수처럼 인자를 넘겨 호출할 수 있고, 위처럼 선언만 한다면 `undefined`를 리턴한다. 리턴 값을 지정해주려면 `mockReturnValue` 를 사용한 별도의 설정이 필요하다.

```js
mockFn.mockReturnValue("I am a mock") // mockReturnValue(리턴 값) 함수를 이용해 가짜 함수의 리턴값을 설정해줄 수 있다.
```

#### 비동기 함수 모킹

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

#### 가짜 함수를 사용하는 이유

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



### jest.mock()   

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

이러한 문제를 **jest.mock()** 함수를 통해 해결할 수 있다.

#### jest.mock() 을 활용한 모듈 모킹

jest.mock() 을 사용하면 자동으로 모듈을 모킹해준다.

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
