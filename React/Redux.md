# Redux

## Redux란?

자바스크립트 기반의 상태 관리 도구.

## Redux 사용 이유

리액트는 단방향 데이터 흐름을 가지고 있기에, 리액트 컴포넌트의 구조가 복잡해지면 상태 관리가 어려워지기 때문이다. Depth 차이가 많이 나는 컴포넌트 간의 상태를 관리하기가 어려워진다. (중간 Depth 컴포넌트와 직접적으로 상관없는 State 전달 코드가 추가될 수 있다.) 

⚠️ 단, Input tag의 `onChange(e -> setState(e.target.value))` 와 같은 state는 컴포넌트 내에서 관리하는 것이 낫다.

## Redux Keyword

1) Dispatch

Component에서 State를 Store에 저장시키기 위한 Redux 내장 함수. Component에서 상태 변화를 위해 호출한다는 점에서 `setState`와 유사하다.

2) Actions

상태에 변화가 필요할 때, 액션을 발생시킨다. 액션은 객체로 표현되고, 아래와 같은 형식으로 이루어져 있다.

```js
{
  type: 'number/increment',
  payload: {
    amount: 1
  }
}
```

보통 액션 객체를 직접 만드는 것이 아니라, 액션 생성함수를 통해 액션을 만든다.

3) Reducers

리듀서는 변화를 일으키는 함수이다. 

```js
function reducer(state, action){
  return alteredState
}
```

리듀서는 2가지의 파라미터를 받는다. **현재의 상태와, 액션**을 파라미터로 받아 새로운 상태를 만들어 반환한다.

4) Store

Store는 앱의 현재 상태를 저장하고 있는 객체이다. 리덕스에서는 애플리케이션 하나 당 하나의 스토어를 만든다. 

## Redux Toolkit

Redux Toolkit은 Redux의 공식 개발 도구이다. (aka. RTK)

>  [**Redux Toolkit**](https://redux-toolkit.js.org/) is our official recommended approach for writing Redux logic. It wraps around the Redux core, and contains packages and functions that we think are essential for building a Redux app.

Redux 자체는 매우 단순하고 단순한 함수인 리듀서에 미들웨어를 추가할 수 있어서 관련 라이브러리와 도구가 매우 많고 그만큼 개발 방식이 다양하다. 그만큼 시행착오가 많이 발생할 수 있다.

이에 Redux는 그들이 생각하기에 효율적인 개발 방법을 택한 Redux 개발 도구 RTK를 만들어서 공개한 것. RTK에서는 유명한 Redux 관련 라이브러리를 내부적으로 채택해 사용하고 있다. 리듀서 생성 API에는 [immer](https://github.com/immerjs/immer)를, 셀렉터 생성 API에는 [reselect](https://github.com/reduxjs/reselect)를 사용한다.

### RTK 사용하기

RTK는 NPM이나 Yarn으로 설치할 수 있다.

```bash
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

또는 아래처럼 CRA의 redux 템플릿으로 React App을 만들면, 자동으로 RTK를 사용할 수 있다.

```
npx create-react-app my-app --template redux
```

### RTK 특징

#### action

RTK에서는 `createAction` API를 사용해 **액션 생성자 함수를 만든다.**

```react
const increment = createAction("counter/increment")
let action = increment() // returns { type: 'counter/increment' }
action = increment(3) // returns { type: 'counter/increment', payload: 3 }
```

`createAction` 에 타입 문자열을 파라미터로 넘겨 액션 생성자 함수를 만든다. (`increment`)

만들어진 액션 생성자 함수에 전달한 파라미터는 그대로 액션 객체의 `payload` 속성으로 들어간다.

만약 리턴되는 액션 객체를 좀더 커스터마이징 하고 싶다면, `createAction` 의 두번째 파라미터로 콜백함수를 넘기면 된다.

```js
const addTodo = createAction("todos/add", function prepare(text) {
  return {
    payload: {
      text,
      createdAt: new Date().toISOString()
    }
  }
})

addTodo('Sometext'); // 아래 객체를 래턴한다
/**
* {
* 	type: 'todos/add',
* 	payload: {
* 		text: 'Sometext',
* 		createdAt: '2020-11-05T09:01:36.207Z'
* 	}
* }
**/
```

위와 같이, 콜백함수 안에서는 액션 생성자 함수의 파라미터로 전달받지 않은 데이터도 추가할 수 있다. 다만, 리턴되는 객체는 반드시 **Flux Standard Action 형태**를 따라야 한다.

#### Flux Standard Action (aka. FSA)

RTK에서는 액션 객체의 형태로 FSA를 강제한다.

```js
{
  type: 'number/increment',
  payload: {
    amount: 1
  }
}
```

- 액션 객체는 액션을 구분할 고유한 문자열인 `type` 필드를 반드시 가져야 한다.
- 액션 객체는 `payload` 필드에 데이터를 담아 전달한다.
- 그 외에 meta, error 필드를 가질 수도 있다.

#### reducer

기존 Redux에서 reducer을 작성하는 방법은 일반적으로 아래와 같다.

```js
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'decrement':
      return { ...state, value: state.value - 1 }
    case 'incrementByAmount':
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}
```

반면, RTK에서는 `createReducer`  API를 사용해 리듀서를 작성한다.

위와 같은 `createReducer` API를 사용하면 Redux의 리듀서 함수를 더 쉽게 만들 수 있다. 내부적으로 Immer 라이브러리를 사용하기 때문에, 리듀서에서 "mutative"한 코드를 작성해도 immutable하게 업데이트를 해주고, switch 문을 사용하지 않아 불필요한 default 케이스의 작성이 필요하지 않다.

`createReducer`은 action을 핸들링하기 위한 case reducers를 작성하는 2가지 문법을 제공한다.

1) builder callback - preferred👍

```typescript
import {createAction, createReducer} from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const incrementByAmount = createAction<number>('counter/incrementByAmount')

const initialState: CounterState = { value: 0 }

const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state, action) => {
    state.value++
  })
  .addCase(decrement, (state, action) => {
    state.value--
  })
  .addCase(incrementByAmount, (state, action) => {
    state.value += action.payload
  })
})
```

builder callback 방식은 createReducer의 첫번째 인자로 초기 상태 값 객체(initialState)를, 두번째 인자로 builder 객체를 인자로 받는 콜백함수를 받는다.

builder 객체는 addCase, addMatcher, addDefaultCase 함수를 제공하고, 이 함수들은 이 리듀서가 어떤 액션을 핸들할지 정의하기 위해 사용된다.

2) map object - less preferred👎 더 짧지만, TS와 호환되지 않는다.

```js
// createAction으로 만든 액션 생성자 함수
const increment = createAction("increment");
const decrement = createAction("decrement");

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrememt.type]: (state, action) => state - action.payload
})
```

map object 방식은 createReducer의 첫번째 인자로 초기 상태 값 객체(initialState)를 , 두번째 파라미터로 리듀서 맵 객체를 요구한다. switch 문의 case 문자열이 하던 역할을 리듀서 맵의 필드 값이 된 형태다.

#### Direct State Mutation

Redux에서 reducer은 반드시 순수함수여야 하며, state 값은 immutable이어야 한다. 이 가정을 지켜야지만 state 업데이트가 predictable, observable 하기 때문이다. 아래 예시는 이 가정을 지키면서 작성한 reducer이다.

```js
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const addTodo = createAction<Todo>('todos/add')
const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const todo = action.payload
      return [...state, todo]
    })
  	.addCase(toggleTodo, (state, action) => {
    	const index = action.payload
      const todo = state[index]
      return [
        ...state.slice(0, index),
        { ...todo, completed: !todo.completed},
        ...state.slice(index + 1),
      ]
  })
```

addTodo의 경우 나름 직관적이지만, toggleTodo의 경우 한개 todo의 completed만 바꾸는 것에 비해 코드가 복잡하다. 

RTX의 `createReducer`은 내부적으로 immer 라이브러리를 사용해, reducer 함수를 작성할 때 마치 state를 직접적으로 변경하는 것처럼 (mutable) 할 수 있게 해준다. RTK의 `createReducer`을 사용한다면 toggleTodo를 아래처럼 작성할 수 있다.

```js
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const addTodo = createAction<Todo>('todos/add')
const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
  	.addCase(addTodo, (state, action) => {
    	const todo = action.payload
      state.push(todo)
  })
  	.addCase(toggleTodo, (state, action) => {
    	const index = action.payload
      const todo = state[index]
      todo.completed = !todo.completed
  })
})
```

https://redux-toolkit.js.org/api/createReducer

## References

[Redux Toolkit]

[Redux Toolkit을 활용한 React 상태 관리](https://blog.rhostem.com/posts/2020-03-04-redux-toolkits)

[redux-toolkit을 소개합니다.](https://jbee.io/react/introduce-redux-starter-kit/)

[redux-toolkit 공식문서](https://redux-toolkit.js.org/introduction/quick-start)