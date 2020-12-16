# React Testing Library

## RTL이란?

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

## Enzyme vs. RTL

정리하자면, Enzyme과 RTL은 서로 다른 철학을 가지고 있다. Enzyme을 사용한 테스트코드는 컴포넌트의 내부 기능을 자주 접근합니다. 예를 들어 컴포넌트가 지니고 있는 props, state 를 확인하고, 컴포넌트의 내장 메서드를 직접 호출하기도 한다.

반면, RTL은 렌더링 결과에 조금 더 집중한다. 컴포넌트의 인스턴스가 아닌 실제 DOM에 대해 신경을 더 많이 쓴다. 실제 화면에 무엇이 보이고, 어떤 이벤트가 발생했을 때 원하는 변화가 생겼는지 이런 것들을 확인하는 데에 좀 더 최적화 되어있다. 즉, 사용자 관점에서 테스팅하기에 적합하다. 

### Enzyme

RTL이 등장하기 전에서는 Enzyme이라는 테스팅 라이브러리가 많이 사용되었다.

**Enzyme은 Implementation Driven Test 방법론을 따르는 테스트를 작성하기에 적합**한데, 그 이유는 Enzyme를 사용하면 실제 브라우저 DOM이 아닌, React가 만들어내는 가상 DOM을 기준으로 테스트를 작성하기 때문이다.

테스트 대상인 React component에 어떤 prop이 넘어가고, 현재 state가 무엇인지에 대해 검증하기 용이하다.

### RTL

반면 **RTL은 Behavior Driven Test 방법론을 따르는 테스트를 작성하는데 적합**한데, 그 이유는 RTL을 사용하면 `jsdom`이라는 라이브러리를 통해 실제 브라우저 DOM을 기준으로 테스트를 작성하기 때문이다.

따라서 어떤 React component를 사용하는지는 의미가 없고, 최종적으로 사용자 브라우저에서 렌더링하는 실제 HTML 마크업의 모습이 어떤지에 대해 테스트를 하게 된다.

생각해보면, 리액트 컴포넌트를 리팩토링 할 때 내부 구조나 네이밍이 많이 바뀔 수는 있어도, 실제 사용자가 느끼는 작동 방식은 크게 바뀌지 않는다. 따라서 

최근의 패러다임은 Behavior Driven Test 쪽으로 넘어가고 있기에, RTL이 많이 선택되는 추세이다.

## RTL 설정

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

## RTL을 사용한 리액트 컴포넌트 테스팅

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