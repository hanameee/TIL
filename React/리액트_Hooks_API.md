# 리액트 Hooks API 🌻

## 개념 정리

React Hook은 함수형 컴포넌트에서 React state와 lifecycle features를 연동할 수 있게 해주는 함수이다.

Class 없이도 React를 사용할 수 있게 해준다.

## 대표적 React Hook 정리

[공식 API문서](https://ko.reactjs.org/docs/hooks-reference.html#usestate)

|         기본 Hook         |      추가 Hooks       |
| :-----------------------: | :-------------------: |
| [useState](#1. useState)  |      useReducer       |
| [useEffect](2. useEffect) |      useCallback      |
|        useContext         |        useMemo        |
|                           | [useRef](# 3. useRef) |
|                           |  useImperativeHandle  |
|                           |    useLayoutEffect    |
|                           |     useDebugValue     |

### 1. useState

#### useState 쓰임새

- 함수형 컴포넌트에서 state를 관리하기 위해 사용
- **리턴값** : 상태 유지 값(`state`)과,  그 값을 갱신하는 함수(`setState`)를 리턴
- **파라미터** : 최초 렌더링 시 반환되는 state 값 = 처음 전달된 파라미터(`initialState`)

#### useState 사용법

```react
// state에는 initialState가 저장됨
const [state, setState] = useState(initialState)
// 초기 렌더링 이후 렌더링 시에 initialState는 무시됨
```

### setState 사용법

**setState** 는 state를 갱신할 때 사용하며, 새 state 값을 받아 컴포넌트 리렌더링을 queue에 등록.

1) 새로운 state를 값으로 전달

```react
setState(newState);
```

2) 이전 state를 사용해서 새로운 state를 계산하는 함수를 전달 (함수형 업데이트)

```react
setState(prevState => prevState+1);
```

- 함수형 업데이트는 setState에 등록하는 콜백함수의 파라미터에서 최신 state를 참조할 수 있기에 이후 useCallback을 사용할 때 deps에 state를 포함하지 않아도 됨

- 다음 리렌더링 시에 `useState` 를 통해 반환받은 첫 번째 값은 항상 갱신된 최신 state임
- state를 갱신할 때 이전의 state 값이 필요하다면, 함수형 업데이트를 사용하면 됨

1), 2)를 모두 사용한 카운터 컴포넌트 예시

```react
import React, { useState } from 'react';

function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    // reset 값은 항상 일정함 - setCount에서 값을 리턴 
    const reset = () => {
      setCount(initialCount);
    }
    // onDecrease와 onIncrease는 갱신된 값이 갱신되기 전 값을 바탕으로 계산되므로 setCount에서 함수를 리턴 (함수형 업데이트)
    const onDecrease = () => {
      setCount(prevCount => prevCount - 1);
    }
    const onIncrease = () => {
      setCount(prevCount => prevCount + 1);
    }
    return (
      <>
          Count: {count}
              <button onClick = {reset}>Reset</button>
              <button onClick = {onDecrease}>-</button>
              <button onClick = {onIncrease}>+</button>
      </>
    );
  }

  export default Counter;
```

```react
// 이렇게 initialCount를 설정해 가져다 쓸 수 있음
<Counter initialCount = {0} />
```

state의 불변성 (immutability) 을 지키기 위해 주로 **spread 연산자**  or **concat** 활용

```react
// spread 연산자 활용
setState(prevState => ({
  ...prevState,
  updatedValues
	})
);

// concat 활용
setState(prevState => prevState.concat(updatedValues))
```



### 2. useEffect

#### useEffect 쓰임새

1) side effect 발생시키는 코드

React의 **렌더링** 과정에서 실행되면 안되는 코드들이 있다. Mutations, subscriptions, timers, logging, and other side effects 들은 React FC의 main body에서는 쓰이면 안되지!

이러한 작업들은 `useEffect` 를 통해 해줄 수 있다. useEffect 를 통해 passed 된 함수들은 스크린에 **렌더가 된 이후**에 실행된다.

Default 로는 every completed render마다 실행되지만, dependencies 를 넣어줌으로써 특정 값이 변경된 시점에만 실행되도록 해줄 수 있다.

2) clean-up function

```react
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the effect
    subscription.unsubscribe();
  };
});
```

return 으로 전달한 함수는 component 가 UI에서 제거될 때 (unmount) 실행된다. 메모리 누수를 방지.



#### useEffect 사용법



## 3. useRef

### useRef 쓰임새



### useRef 사용법



## 4. useMemo

### useMemo 쓰임새

- 메모이제이션 된 **값**을 반환함

### useMemo 사용법



## 5. useCallback

### useCallback 쓰임새

- 메모이제이션 된 **콜백**을 반환함
- callback 함수는 Dependencies가 변경되었을 때만 변경되고, 나머지의 경우 useCallback은 항상 memoized 된 callback 함수를 리턴한다.

### useCallback 사용법

```react
const memoizedCallback = useCallback(
  // callback 함수
  () => {
    doSomething(a, b);
  },
  // array of dependencies
  [a, b],
);
```

`useCallback(fn, deps)` 은 `useMemo(() => fn, deps)` 와 동일.

## 6. useReducer

### useReducer 쓰임새

- `useState` 의 *대체 함수*
- `(state, action) => newState` 의 형태로 reducer을 받아 state 와 dispatch메서드를 반환
- **리턴값** : [state, dispatch]
- **파라미터** : reducer

### useReducer 사용법

`reducer 사용법`

```react
function reducer(state, action){
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}

// 혹은 아래처럼 간략하게 쓸 수도 있다
function reducer(state, action) => newStatae
```

`useReducer` 사용법

```react
// 초기 state를 두번째 파라미터로 전달(=initialArg)해 state를 초기화할 수 있다
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useReducer` 을 사용해 다시 구현한 counter 예제

```react
const initialState = {count: 0};

function reducer(state, action) {
  // reducer에서 action 선언
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  // useReducer은 state와 dispatch 메서드 반환
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### useReducer vs useState

어떨 때 `useReducer` 를 쓰고 어떨 때 `useState` 를 써야 할까? 그때 그때 다르다.

일반적으로는 다수의 하윗값을 포함하는 **복잡한 정적 로직을 만드는 경우**나 **다음 state가 이전 state에 의존적인 경우**에 보통 `useState`보다 `useReducer`를 선호한다고 한다.

그러나 컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면  아래처럼`useState` 로 관리하는게 훨씬 편할 것.

```javascript
const [value, setValue] = useState(true);
```

+) 벨로퍼트 님 같은 경우에는 아래처럼 setter 를 한 함수에서 여러번 사용해야 하는 일이 발생한다면

```javascript
setUsers(users => users.concat(user));
setInputs({
  username: '',
  email: ''
});
```

그 때부터 `useReducer` 를 쓸까? 에 대한 고민을 시작하신다고 함.

useReducer 를 썼을때 편해질 것 같으면 useReducer 를 쓰고, 딱히 그럴것같지 않으면 useState 를 사용하기!



---

## 이 개념을 알면 아래의 질문에 대답할 수 있습니다. 😀

---

### References - 참고한 링크들
