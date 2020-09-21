# 면접용 JS 정리 🙆🏻‍♀️

### this

자바스크립트는 함수 호출 방식에 의해 this에 바인딩되는 객체가 동적으로 결정된다. 

⚠️ this 바인딩을 **함수의 렉시컬 스코프**와 헷갈리지 말자. 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 **함수를 선언**할 때 결정된다.

함수를 호출하는 방식은 아래처럼 4가지가 있다. 즉, this는 아래 4가지 함수 호출 방식에 따라 각각 다르게 결정된다.

1. 함수 호출
2. 메소드 호출
3. 생성자 함수 호출
4. apply/call/bind 호출

더 자세히 알아보자.

#### 1. 함수 호출

this가 **전역 객체**에 바인딩된다. 전역 객체는 모는 객체의 유일한 최상위 객체를 의미하며, browser side에서는 `window`, server side(node.js)에서는 `global` 객체를 의미한다.

일반적인 함수 호출은 물론, 내부 함수(일반 함수, 메소드, 콜백함수)는 어디에서 선언되었던 관계없이 this가 전역객체에 바인딩된다.

#### 2. 메소드 호출

함수가 메소드(객체의 프로퍼티)로 호출되면 메소드 내부의 this는 해당 메소드를 소유한 객체, 즉 해당 메소드를 호출한 객체에 바인딩된다.

#### 3. 생성자 함수 호출

객체를 생성하는 역할을 하는 자바스크립트의 생성자 함수는 별도의 형식이 있지 않고 기존 함수에 new를 붙여서 호출하면 생성자 함수로 동작한다. 생성자 함수 호출은 다음과 같은 수순으로 동작한다.

1. 빈 객체 생성 및 this 바인딩 - this는 이 빈 객체를  가리킨다
2. 생성된 빈 객체에 this를 사용해 동적으로 프로퍼티나 메소드가 추가된다
3. 반환문이 없는 경우나 명시적으로 this를 반환할 경우, this에 바인딩된 새 객체가 반환된다. 반환문이 this가 아닌 다른 객체를 명시적으로 반환할 경우 this가 아닌 해당 객체가 반환되며 이는 생성자 함수가 제 역할을 수행하지 못한 것이다. 따라서 생성자 함수는 반환문을 명시적으로 사용하지 않는다.

#### 4. apply/call/bind 호출

참고 자료: https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd

위처럼 this에 바인딩 될 객체는 함수 호출 패턴에 의해 결정되고, 이는 자바스크립트 엔진이 수행한다. 그런데 이런 엔진의 암묵적 this 바인딩 이외에 this를 특정 객체에 명시적으로 바인딩 하는 방법도 있다. apply, call, bind 모두 다 Function.prototype 객체의 메소드이다.

- apply: apply 메소드를 호출하는 주제는 함수이며, apply 메소드는 this를 특정 객체에 바인딩 할 뿐본질적인 기능은 **함수 호출**이다. 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메소드를 사용하는 경우이다. arguments 객체는 배열이 아니기에 slice 같은 배열 메소드를 사용할 수 없지만, apply 메소드를 사용하면 가능하다.

  ```js
  // 유사배열객체인 arguments 객체를 배열로 변환해줌.
  function convertArgsToArray() {
    // slice는 배열의 특정 부분에 대한 복사본을 생성한다.
    var arr = Array.prototype.slice.apply(arguments); 
    // var arr = [].slice.apply(arguments);
    return arr;
  }
  
  convertArgsToArray(1, 2, 3);
  ```

- call: apply와 기능은 같지만 (첫번째 인자로 넘기는 객체가 명시적으로 this에 바인딩 되는 것), apply가 두번째 인자로 배열을 넘긴다면 call은 각각 하나의 인자로 넘긴다는 차이점이 있다.

  ```js
  Person.apply(foo, [1, 2, 3]);
  Person.call(foo, 1, 2, 3);
  ```

- bind: bind는 apply, call과 같이 함수를 실행하는 것이 아니라, bind의 인자로 전달한 객체가 this에 바인딩된 새로운 함수를 리턴한다. 따라서 함수를 호출해줄 필요가 있다.

  ```js
  function Person(name) {
    this.name = name;
  }
  
  Person.prototype.doSomething = function(callback){
    if (typeof callback == 'function'){
      // bind가 리턴한 함수를 호출
      callback.bind(this)();
    }
  }
  
  function foo() {
    console.log("#", this.name);
  }
  
  var p = new Person('Lee');
  p.doSomething(foo); // 'Lee'
  ```

  

### 클로저

클로저는 만들어진 환경을 기억한다.

클로저는 반환된 **내부함수**가 자신이 **선언됐을 때의 환경**(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수이다.

```js
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  innerFunc();
}

outerFunc(); // 10
```

innerfunc는 outerfunc 내부에서 선언되었기 때문에 함수 innerfunc의 상위 스코프는 함수 outerfunc이다.

#### 클로저의 작동 원리

innerfunc의 스코프 체인은 전역 스코프를 가리키는 전역객체, outerFunc 스코프를 가리키는 outerFunc의 활성 객체, 그리고 innerfunc의 스코프를 가리키는 활성 객체를 순차적으로 바인딩한다.

innerFunc가 상위 스코프에 접근할 수 있는 것은 렉시컬 스코프의 레퍼런스를 차례대로 저장하고 있는 실행 컨텍스트의 스코프 체인을 자바스크립트 엔진이 검색했기에 가능한 것.

```js
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  return innerFunc;
}

var inner = outerFunc();
inner(); // 10
```

위 처럼 outerFunc가 innerFunc를 반환하고 콜스택에서 제거되어도, 외부 함수 밖에서 내부 함수가 호출되어도 외부 함수의 지역변수에 여전히 접근할 수 있다. (복사본이 아니라 실제 변수에 접근한다) 이러한 함수가 바로 클로저.

#### 클로저의 활용

```js
var box = document.querySelector('.box');
var toggleBtn = document.querySelector('.toggle');

var toggle = (function () {
  var isShow = false;

  // ① 클로저를 반환
  return function () {
    box.style.display = isShow ? 'block' : 'none';
    // ③ 상태 변경
    isShow = !isShow;
  };
})();

// ② 이벤트 프로퍼티에 클로저를 할당
toggleBtn.onclick = toggle;
```

클로저를 사용하면 전역변수를 사용하지 않고도, 현재 상태를 기억하고 변경된 최신 상태를 유지할 수 있다. 또, private 키워드를 사용하는 것처럼 정보를 은닉할 수 있다.

#### 헷갈리는 클로저 예제들

[setTimeout]

오답 코드

```js
var i;
for (i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// 10이 10번 호출됨. 왜? 전역인 i값이 10이 되므로
```

정답 코드

1. 클로저 + IIFE 사용

```js
var i;
for (i = 0; i < 10; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);
}
```

서로 다른 환경에 10개의 서로 다른 j가 생긴다.

2. ES6 의 블록 문법 사용

```js
var i;
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```

#### 클로저와 메모리

참고 링크: https://velog.io/@yujo/JS%ED%81%B4%EB%A1%9C%EC%A0%80Closure%EC%99%80-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC

클로저는 메모리 누수의 원인이 될 수 있다.

필요에 의해 클로저를 사용해서 의도적으로 함수의 지역변수를 메모리에 할당했다면, 필요가 사라진 시점에 메모리를 소모하지 않게 해주면 메모리 누수를 방지할 수 있다.



### 실행 컨텍스트

참고 링크: https://poiemaweb.com/js-execution-context



### 호이스팅

참고 링크: https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365

호이스팅은 끌어올려진다는 의미를 가진다. 스코프 안의 어디에서든, 변수 **선언**은 최상위에서 선언된 것과 동일하다. 주의, 할당이 아니라 **선언**이다.

자바스크립트는 ES6의 let, const를 포함하여 **ES6의 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.**

#### 함수 호이스팅

함수 호이스팅은 함수 정의 방식에 따라 달라진다.

함수 선언문은 함수 호이스팅이 발생하고, 함수 표현식은 변수 호이스팅이 발생한다.

```js
// 함수 선언문
function square(number) {
  return number * number;
}

// 함수 표현식
const square = function(number) {
  return number * number;
};
```

함수 선언문: 자바스크립트 엔진은 스크립트가 로딩되는 시점에 바로 초기화하고 이를 변수 객체에 저장한다. 즉, 함수의 선언(생성), 초기화, 할당이 한번에 이루아진다. 즉, 선언문의 위치와는 상관없이 **소스 내 어느 곳에서든지 호출이 가능**하다.

함수 표현식: 변수 생성, 초기화, 할당이 한번에 이루어지는 함수 선언문과는 달리, 변수 호이스팅은 (1)변수 생성 및 초기화와 (2)할당이 분리되어 진행된다. 호이스팅된 변수는 변수 생성 및 초기화만 진행되고, **할당문을 만났을 때 실제 값이 할당이** 이루어진다.

#### 변수 호이스팅

먼저 **var**을 보자.

스코프 안에서 선언된 변수는, 항상 최상위에 선언한 것과 동등한 의미를 가진다.

```js
foo = 'bar';
var foo;
```

위 코드는 변수를 선언하기 전에 할당하고 있다. 왜냐면 아래와 동등하기 때문이다.

```js
// 위는 아래와 같은 의미를 가진다.
var foo;
foo = 'bar';
```

다른 예제들을 보자.

```js
var x = 'outer scope';
(function() {
  console.log(x); // undefined
  var x = 'inner scope';
}());
```

왜 undefined일까?  위 코드는 아래와 같이 해석될 수 있다.

```js
var x = 'outer scope';
(function() {
  var x; // 스코프 내에 존재하는 모든 선언은 최상위에 선언한 것과 동등하다.
  console.log(x); // undefined
  x = 'inner scope';
}());
```

그럼 아래 코드는?

```js
var x = 'outer scope';
(function() {
  console.log(x); // outer scope
}());
```

함수 스코프 안에 아예 x가 존재하지 않기 때문에, 전역 스코프에서 x를 찾는다. 따라서 outer scope가 출력된다.

**ES6의 let, const** 는 호이스팅에서 뭐가 다를까?

```js
console.log(x); // throws a ReferenceError: Cannot access 't' before initialization
const x = 'hey';
```

undefined가 아니라 ReferenceError이 뜬다. 이는 var과는 달리, let/const가 TDZ(temporal dead zone)에 의해 제약을 받기 때문이다. 

let,const는 블록 단위 스코프를 가진다. 즉, 현재 실행중인 실행 컨텍스트의 lexical environment로 범위가 지정된다. let,const 변수는 해당 스코프에서 호이스팅되지만, 어휘적 바인딩이 실행되기 전까지 엑세스 할 수 없다.

[정리]

var 키워드로 선언된 변수는 선언과 초기화가 한번에 이루어진다. 스코프에 변수를 등록(선언)하고, 메모리에 변수를 위한 공간을 확보한 후, undefined로 초기화 된다. 따라서 변수 선언문 이전에 접근해도 스코프에 변수가 존재하기에 에러가 발생하지 않고, 이후 변수 할당에 도달하면 값이 할당되는 것이다.

반면, let/const로 선언된 변수는 선언과 초기화가 분리되어 진행된다. 스코프에 변수를 선언하긴 하지만, 초기화(변수를 위한 메모리 공간 확보)는 변수 선언문에 도달했을 때 이뤄진다.  따라서 스코프의 시작 지점부터 초기화 지점까지를 TDZ라고 하며, 이 구간에서 변수에 접근하면 ReferenceError (not initialized)가 뜬다.

### deepcopy

Object.assign(), spread 연산자 등은 shallow copy이다.

1. JSON.parse(JSON.stringify(obj)) - 스트링 변환 후 다시 객체 변환하기에 deepcopy가 가능하지만, JSON 메소드는 성능면에서 다른 방법에 비해 굉장히 느리다.

2. 재귀 사용

   ```js
   function copyObj(obj) {
     var copy = {};
     if (Array.isArray(obj)) {
       copy = obj.slice().map((v) => {
         return copyObj(v);
       });
     } else if (typeof obj === 'object' && obj !== null) {
       for (var attr in obj) {
         if (obj.hasOwnProperty(attr)) {
           copy[attr] = copyObj(obj[attr]);
         }
       }
     } else {
       copy = obj;
     }
     return copy;
   }
   ```

3. immutable.js 라이브러리 사용

### ES6+

#### ES2015(ES6)

- Block 단위 스코프 (let, const)
- Class
- arrow function
- destructuring

#### ES2016(ES7)

- 배열 내장 함수 Array.prototype.includes 추가

  ```javascript
  ['a', 'b', 'c'].includes('a') // true
  ```

- 제곱 연산자 `**`

#### ES2017(ES8)

- async/await ⭐️
- Object.values()
- Object.entries

#### ES2018(ES9)

- Promise.prototype.finally()
- Rest(나머지 매개변수)/Spread Properties(전개 연산자)

#### ES2019(ES10)

- Promise.prototype.finally()
- Rest(나머지 매개변수)/Spread Properties(전개 연산자)

#### ES2020(ES11)

- Dynamic import
- Bigint
- Nullish Coalescing Operator (널 병합)
- Optional Chaining
- globalThis
- Promise.allSettled

### class

참고 자료: https://ko.javascript.info/class

```js
class MyClass {
  // 여러 메서드를 정의할 수 있음
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

`new MyClass()` 를 호출하면 내부에서 정의한 메서드가 들어 있는 객체가 생성된다. constructor은 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화 할 수 있다.

클래스 문법은 객체랑 다르다. 쉼표 안넣어도 됨.

#### class가 하는 일

1. 위 class 선언이 하는 일은, MyClass라는 이름의 함수를 만든다. 함수 본문은 constructor에서 가져온다. constructor이 없으면 본문이 비워진 채로 함수가 만들어진다.
2. 클래스 내에서 정의한 메서드를 MyClass.prototype에 정의한다. (주의- constructor이 아닌, 단순 클래스 필드들은 개별 객체에만 설정된다)

#### class의 특징 (not just syntatic sugar)

1. 클래스 생성자는 new와 함께 호출하지 않으면 에러가 발생한다.
2. 클래스는 항상 strict mode로 실행된다.
3. 클래스 메서드는 열거할 수 없다. 

### arrow function

화살표 함수는 함수를 선언할 때 this에 바인딩 할 객체가 정적으로 결정된다. (Lexical this) 화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.



