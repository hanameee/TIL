# 면접용 JS 정리 🙆🏻‍♀️

---

### 자바스크립트 동작 원리

순수한 자바스크립트 엔진(ex.V8)은 싱글 스레드로 동작한다. V8 엔진에는 단 하나의 호출 스택만 존재하기 때문에, 한번의 하나의 프로세스만 실행시킬 수 있다. 하지만 우리가 아는 자바스크립트는 비동기적으로 많은 작업들을 수행한다. 세상에 어떻게 된 일일까?! 😨

이렇게 자바스크립트가 비동기적으로 작동할 수 있는 것은, 자바스크립트 엔진을 둘러싸고 있는 **런타임 환경**(Node, 브라우저)이 멀티 스레드를 제공하기 때문이다. 

자바스크립트의 엔진은 단지 임의의 코드에 대한 온디맨드 실행 환경일 뿐이다. 각 이벤트를 스케줄링 하는 것은 자바스크립트 엔진을 둘러싸고 있는 환경이다. 우리가 현실에서 자바스크립트를 실행할 때는 대개 웹 브라우저나, Node.js와 같은 멀티 스레드 환경에 임베디드 되어 실행된다. 따라서 브라우저를 예로 들면, 브라우저의 기능인 이벤트 루프, Web API, Callback Queue (=task queue, event queue) 덕분에 싱글 스레드로 동작하는 자바스크립트 언어가 멀티스레드 프로세스 작업을 다룰 수 있는 것이다.

setTimeout, setInterval 등의 타이머 작업, DOM과 연결된 작업, DB 연결, 파일 읽기/쓰기, Ajax HTTP 요청과 같은 모든 비동기 작업들은 Web API에서 멀티스레드로 (병렬적)으로 처리된 후, Callback Queue에 들어갔다가, Call stack이 비면 Event loop에 의해 Call stack으로 이동해 실행된다.

[참고 자료]

[Nodejs EventEmitter 뜯어보기](https://www.huskyhoochu.com/nodejs-eventemitter/)

[자바스크립트는 정말 싱글스레드일까?](https://prohannah.tistory.com/59)

[Javascript 동작원리 (Single thread, Event loop, Asynchronous)](https://medium.com/@vdongbin/javascript-%EC%9E%91%EB%8F%99%EC%9B%90%EB%A6%AC-single-thread-event-loop-asynchronous-e47e07b24d1c)

---

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

1. 빈 객체 생성 및 this 바인딩 - this는 이 새롭게 생성된 빈 객체를  가리킨다
2. 생성된 빈 객체에 this를 사용해 동적으로 프로퍼티나 메소드가 추가된다
3. 반환문이 없는 경우나 명시적으로 this를 반환할 경우, this에 바인딩된 새 객체가 반환된다. 반환문이 this가 아닌 다른 객체를 명시적으로 반환할 경우 this가 아닌 해당 객체가 반환되며 이는 생성자 함수가 제 역할을 수행하지 못한 것이다. 따라서 생성자 함수는 반환문을 명시적으로 사용하지 않는다.

#### 4. apply/call/bind 호출

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


[참고 자료]

https://www.zerocho.com/category/JavaScript/post/57433645a48729787807c3fd

---

### arrow function

화살표 함수에서는 this가 다르게 동작한다.

화살표 함수는 함수를 선언할 때 this에 바인딩 할 객체가 정적으로 결정된다. (**Lexical this**) 따라서, 화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.

---

### class

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

[참고 자료]

https://ko.javascript.info/class

----

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

----

### 프로토타입

자바스크립트는 프로토타입 기반 언어이다. 자바스크립트에서는 이 프로토타입을 이용해 상속을 구현할 수 있다.

---

### 자바스크립트의 함수

자바스크립트에서 함수는 호출 가능한 객체이다.

[출처 - JavaScript의 함수는 1급 객체(first class object)이다](http://bestalign.github.io/2015/10/18/first-class-object/)

자바스크립트의 함수는 1급 객체이다. 1급 객체란 특정 언어에서 객체를 1급 시민으로써 취급한다는 뜻이다.

#### 1급 시민이란?

- 변수(variable)에 담을 수 있다.
- 인자(parameter)로 전달할 수 있다.
- 반환값(return value)로 전달할 수 있다.

자바스크립트에서 객체는 1급 시민이므로 1급 객체이다. 또, 자바스크립트에서 함수는 객체이다. 따라서 자바스크립트의 함수는 1급 객체이다.

1급 함수는 추가적으로 1) 런타임 생성이 가능하다 2) 익명으로 생성이 가능하다 라는 추가 조건을 걸기도 한다. 자바스크립트의 함수는 이 추가조건마저 만족한다.

#### 그래서 자바스크립트의 함수가 1급 객체인게 왜 중요한데?

1. 이 특징으로 인해 고차 함수 (high order function)이 가능해지기 때문이다. JS의 each, filter, map, reduce, sort는 모두 고차함수다. 이 고차 함수들은 인자로 함수를 받거나 함수를 리턴하는데, 함수의 인자로 목적에 맞는 콜백함수를 넘겨줄 수 있어서 아주 편리하다.
2. 이 특징이 JS의 클로저와 만나면 또 하나의 장점이 생긴다. JS의 함수는 생성될 당시의 lexical environment를 기억하는데, 함수를 주고받을 때 이 렉시컬 환경도 함께 전달된다. 이를 이용해서 커링과 메모이제이션이 가능해진다.

---

### 스코프

자바스크립트는 기본적으로 함수 레벨 또는 블록 레벨 스코프 규칙을 따른다. 

- 함수 레벨 스코프: var 변수 또는 함수 선언문으로 만들어진 (function) 함수
- 함수 블록 레벨 스코프: let, const 변수

추가적으로, ES6의 모듈을 이용하면 [모듈 스코프](https://ui.toast.com/fe-guide/ko_DEPENDENCY-MANAGE/)를 사용할 수 있다.

---

### 호이스팅

호이스팅은 끌어올린다는 뜻으로 변수 및 함수 **선언문**이 스코프 내의 최상단으로 끌어올려지는 현상.

스코프 안의 어디에서든, 변수 **선언**은 최상위에서 선언된 것과 동일하다. 주의, 할당이 아니라 **선언**이다.

자바스크립트는 **ES6의 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.**

호이스팅이 일어나는 이유는, 어떤 스코프가 형성됨과 동시에 (Lexical Environment) 그 안에서 정의된 변수들이 함께 생성되기 때문이다.

#### 변수 호이스팅

**[var 변수]** 

스코프 안에서 선언된 변수는, 항상 최상위에 선언한 것과 동등한 의미를 가진다.

```js
foo = 'bar'; // 변수 할당
var foo; // 변수 선언
```

위 코드는 변수를 선언하기 전에 할당하고 있다. 이게 문제가 없는 이유는 위 코드는 사실상 아래와 동등하기 때문이다.

```js
var foo;
foo = 'bar';
```

 var은 함수 단위 스코프를 가지고, 이 스코프 내에서 변수 선언이 자동으로 최상단으로 끌어올려지기에 변수 선언 전에 변수를 할당해도 문제가 없는 것.

다른 예제들을 보자.

```js
var x = 'outer scope';
(function() {
  console.log(x); // undefined
  var x = 'inner scope';
}());
```

왜 undefined일까? var 변수는 호이스팅 됨과 동시에 undefined로 초기화 되기 때문이다. 즉, var 변수는 호이스팅과 초기화가 한번에 일어난다.

위 코드는 아래와 같이 해석될 수 있다.

```js
var x = 'outer scope';
(function() {
  var x; // 스코프 내에 존재하는 모든 선언은 최상위에 선언한 것과 동등하며, 호이스팅과 undefined로의 초기화가 동시에 일어난다.
  console.log(x); // undefined
  x = 'inner scope';
}());
```

그럼 아래 코드는 어떨까?

```js
var x = 'outer scope';
(function() {
  console.log(x); // outer scope
}());
```

함수 스코프 안에 아예 x가 존재하지 않기 때문에, 전역 스코프에서 x를 찾는다. 따라서 outer scope에 있는 x가 출력된다.

**[ES6의 let, const]**

let, const는 var과 호이스팅에서 어떤 차이를 가질까?

let, const 역시 호이스팅이 되지만 var과는 달리 undefined로 초기화 되지 않고, 접근이 불가능하다는 차이점이 있다. 이런 접근 불가 영역을 TDZ(temporal dead zone)라고 한다.

```js
console.log(x); // => ReferenceError: Cannot access 't' before initialization
const x = 'hey';
```

undefined가 아니라 ReferenceError이 뜬다. 이는 var과는 달리, let/const가 TDZ(temporal dead zone)에 의해 제약을 받기 때문이다. 

let과 const가 호이스팅이 되지 않는다는 말은 틀렸는데, 이는 다음 예제를 보면 알 수 있다.

```js
let a = 1;
{
    console.log(a); // => Reference Error: a is not defined;
    let a = 2;
}
```

만약 let이 호이스팅 되지 않는다면, 블록 스코프 내에서 a가 없으니 상위 스코프에서 선언된 a를 찾아 1을 출력해야 한다.

하지만 let은 호이스팅 되기에 - 즉 렉시컬 환경이 만들어지면서 선언문이 끌어올려져 let 변수가 생성이 되기 때문에 - Reference Error이 발생하는 것이다. 

위 스코프를 가진다. 즉, 현재 실행중인 실행 컨텍스트의 lexical environment로 범위가 지정된다. let,const 변수는 해당 스코프에서 호이스팅되지만, 어휘적 바인딩이 실행되기 전까지 엑세스 할 수 없다.

[변수 호이스팅 정리]

var 키워드로 선언된 변수는 선언과 초기화가 한번에 이루어진다. 스코프에 변수를 등록(선언)하고, 메모리에 변수를 위한 공간을 확보한 후, undefined로 초기화 된다. 따라서 변수 선언문 이전에 접근해도 스코프에 변수가 존재하기에 에러가 발생하지 않고, 이후 변수 할당에 도달하면 값이 할당되는 것이다.

반면, let/const로 선언된 변수는 선언과 초기화가 분리되어 진행된다. 스코프에 변수를 선언하긴 하지만, 초기화(변수를 위한 메모리 공간 확보)는 변수 선언문에 도달했을 때 이뤄진다.  따라서 스코프의 시작 지점부터 초기화 지점까지를 TDZ라고 하며, 이 구간에서 변수에 접근하면 ReferenceError (not initialized)가 뜬다.

#### 함수 호이스팅

함수 호이스팅은 함수 정의 방식(함수 선언문인지, 함수 표현식인지)에 따라 달라진다.

함수 선언문은 **함수 호이스팅**이 발생하고, 함수 표현식은 **변수 호이스팅**이 발생한다.

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

함수 선언문: 자바스크립트 엔진은 스크립트가 로딩되는 시점에 바로 초기화하고 함수를 변수 객체에 저장한다. 즉, 함수의 선언(생성), 초기화, 할당이 한번에 이루아진다. 즉, 선언문의 위치와는 상관없이 **소스 내 어느 곳에서든지 호출이 가능**하다.

함수 표현식: 변수 생성, 초기화, 할당이 한번에 이루어지는 함수 선언문과는 달리, 변수 호이스팅은 (1)변수 생성 및 초기화와 (2)할당이 분리되어 진행된다. 호이스팅된 변수는 변수 생성 및 초기화만 진행되고, **할당문을 만났을 때 실제 값이 할당이** 이루어진다.

```js
func(); // (1)
var func = function() {} // => TypeError
```

func는 (1) 시점에서 undefined로 초기화 되어있기에 func를 실행하는 것은 TypeError를 뿜는다.

[참고 링크]

https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365

[Javascript Scope, Hoisting and Closure](https://yhancsx.github.io/js/js-scope-hoisting-closure/#closure-example)

---

### 클로저

클로저(함수)는 반환된 **내부함수**가 자신이 **선언됐을 때의 환경**(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 **함수**이다.

짧게 말하면 클로저 함수란, 만들어진 환경(스코프)을 기억하여 그 환경 밖에서 실행될 때도 그 환경에 접근할 수 있는 함수이다.

```js
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  innerFunc();
}

outerFunc(); // 10
```

innerfunc는 outerfunc 내부에서 선언되었기 때문에 함수 innerfunc의 상위 스코프는 함수 outerfunc이다.

#### 클로저 예시

```js
function getClosure() {
  var text = "foo";
  return function() {
    return text
  }
}

var closure = getClosure();
console.log(closure()); // foo
```

closure 변수는 getClosure 내부 환경을 기억하고 있기에, getClosure 함수 실행이 종료되어 콜스택에서 getClosure의 실행 컨텍스트가 사라진 후에도 foo를 출력할 수 있다.

원래대로라면 getClosure이 수행된 후 getClosure의 실행 컨텍스트를 GC가 회수해야 하지만, closure이 text를 참조하고 있기 때문에 GC에 의해 회수되지 않는다.

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

1. 은닉화(private)

   ```js
   function hello(name) {
     let _name = name;
     return function() {
       console.log("Hello," + _name);
     }
   }
   
   let hello1 = hello("hannah");
   hello1() // Hello, hannah
   ```

   외에서 name에 접근해 값을 바꿀 방법이 전혀 없다.

2. 전역 변수 사용 없이도 현재 상태를 기억하고 최신 상태 유지

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

클로저를 사용하면 전역변수를 사용하지 않고도, 현재 상태를 기억하고 변경된 최신 상태를 유지할 수 있다. 

#### 헷갈리는 클로저 예제들

[setTimeout] 왜? 전역인 i값이 10이 되므로

```js
var i;
for (i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// 10이 10번 호출됨.
```

i는 var이다. 따라서 전역으로 공유된다. for문을 다 돌면 i는 10이 되고, setTimeout은 for문이 다 수행된 이후에야 콜백 큐에서 콜스택으로 올라온다. setTimeout 시간이 지난 후 콜스택으로 올라왔을 시점에 전역 스코프의 i는 이미 10인 상태고, 따라서 10이 10번 찍히게 된다.

위의 코드를 1부터 10까지 찍히게 하기 위해서는 아래와 같은 방법을 취할 수 있다.

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

IIFE 패턴으로 내부 setTimeout에 걸린 익명함수를 클로저로 만들 수 있다. 이렇게 되면 서로 다른 환경에 10개의 서로 다른 j가 생긴다.

2. ES6 의 let 사용

```js
var i;
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```

블록 스코프를 갖는 let을 사용하면 for loop 하나마다 새로운 블록 스코프가 생기고, 따라서 i도 새롭게 선언 및 초기화된다.

따라서 setTimeout의 콜백함수가 i를 참조하기 위해 상위 스코프를 검색할 때 각자 다른 i를 참조할 수 있다.

#### 클로저와 메모리

클로저를 사용할 때 주의해야 할 점엔, **메모리 누수**가 있다. 

클로저인 내부 함수가 참조하는 외부 함수의 객체들을 더 이상 사용하지 않아도, 가비지 콜렉터가 이를 수거해가지 못한다. 따라서 필요에 의해 클로저를 사용해서 의도적으로 함수의 지역변수를 메모리에 할당했다면, 필요가 사라진 시점에 메모리를 소모하지 않게 해주면 메모리 누수를 방지할 수 있다.

메모리의 생명 주기는 모든 프로그래밍 언어에서 아래와 동일하다.

1. 필요한 메모리 할당
2. 할당된 메모리 사용
3. 해당 메모리가 필요 없어지면 해제

자바스크립트는 값을 초기할 때 자동으로 메모리를 할당한다. 이 때문에 프로그래머가 일일히 메모리 할당을 하지 않아도 되는 것. 원시값, 객체, 배열, 함수 등등...

값을 사용한다는 의미는 이렇게 할당된 메모리에 쓰거나 읽는다는 것을 의미한다.

[참고 링크]

https://velog.io/@yujo/JS%ED%81%B4%EB%A1%9C%EC%A0%80Closure%EC%99%80-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC

https://eblee-repo.tistory.com/52

---

### 가비지 컬렉터

객체를 만들면 메모리 공간이 할당된다. 객체가 어디에서도 참조되지 않는 상태가 되었을 때 이 메모리 공간을 자동으로 없애주는 역할을 하는 것이 **가비지 컬렉터**이다.

가비지 컬렉터는 메모리 할당을 모니터링하고, 할당된 메모리의 블록이 더 이상 필요하지 않은 시점을 확인하여 회수한다. 

#### 가비지 컬렉터 알고리즘의 종류

1) 참조-세기 (Reference-counting)

특정 객체를 참조하는 객체가 하나도 없다면 그 객체에 대해 가비지 컬렉션을 수행한다. 한계는 순환 참조 (두 객체가 서로를 참조하면) 일 때 가비지 컬렉션이 수행되지 않는 단점이 있다.

2) Mark and sweep - 최신 브라우저들에서 사용하는 알고리즘

"닿을 수 없는 객체"를 더 이상 필요 없는 객체로 정의한다. 

roots라는 객체의 집합(JS에서는 전역변수)을 가지고 있고, 가비지 콜렉터는 주기적으로 roots로부터 시작해 roots가 참조하는 객체들, 그 객체가 참조하는 객체들...  을 접근할 수 있는 객체라고 표시한다.

그 후, 접근할 수 없는 객체에 대해 가비지 컬렉션을 수행한다.

---

### 실행 컨텍스트

참고 링크: https://poiemaweb.com/js-execution-context

---

### 이벤트

웹 애플리케이션에서 사용자의 입력에 추가 동작을 구현하기 위해서는 이벤트를 활용한다.

#### 이벤트 등록

```js
var button = document.querySelector('button');
button.addEventListener('click', addItem);

function addItem(event) {
	console.log(event);
}
```

`addEventListener` 로 특정 엘리먼트에 이벤트 리스너를 등록할 수 있다. 브라우저는 2가지 방법으로 이벤트를 감지해 이 이벤트 리스너를 처리한다.

#### 이벤트 버블링, 이벤트 캡처링

이벤트 버블링은 화면의 특정 엘리먼트에서 이벤트가 발생했을 때, 해당 이벤트가 더 상위의 부모 엘리먼트들로 전달되어 가는 특성을 의미한다. 이벤트 버블링은 최상위 요소인 body 태그까지 전파된다.

이벤트 캡처링은 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식이다. (부모 > 자식)

브라우저에서 기본값은 이벤트 버블링이고, 이벤트 캡쳐링 방식을 사용하고 싶다면 addEventListener API의 옵션 객체에 capture:true를 설정해주면 됨.

```js
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false(이벤트 버블링)
	});
});
```

이런 이벤트 전파 방식을 막으려면 stopPropagation API를 사용해 상위/하위 요소로의 이벤트 전파를 막을 수 있다.

#### 이벤트 위임

이벤트 위임은 하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식으로, 웹앱을 구현할 때 자주 사용하게 되는 코딩 패턴이다.

항목이 아주 많은 리스트가 있을때, 각 li에 이벤트 리스너를 다는 것은 번거롭다. 이벤트 위임을 사용하면 이런 번거로운 작업을 해결할 수 있다.

[참고 링크]

[이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)

---

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

----

### 번들러

번들러는 의존성이 있는 모듈 코드들을 하나(또는 여러 개)의 파일로 만들어주는 도구이다.

#### 웹팩

웹팩은 **모듈 번들러**이다.

모던 자바스크립트 개발에서 모듈(=특정 기능을 갖는 작은 코드 단위)은 굉장히 중요하다. 왜일까?

1. 효율성 - 10000줄의 자바스크립트가 하나의 파일에 들어가있다고 생각해보자. 아찔하다. 코드를 작성할 때 함수가 비대해지면 하나의 기능만을 하도록 나누듯이, 모듈은 사용 용도에 따라 파일 단위로 코드를 구분한 뒤, 다른 파일에서 해당 기능이 필요할 때 이 파일을 (클래스,함수, ect...) 가져와서 사용할 수 있도록 해준다. 이는 가독성과 유지보수 효율을 높인다.
2. 타인이 작성한 사용 - 우리는 NPM의 멋진 생태계로 인해 똑똑한 사람들이 만들어놓은 수많은 모듈들을 가져와서 활용할 수 있다. 여기에도 모듈이 사용된다.

웹팩의 경우 웹 애플리케이션을 구성하는 모든 자원 (js, css, img...)들을 모두 각각의 모듈로 본다. 그리고 entry 파일을 시작으로 사용되는 수많은 자원들의 의존성 관계들을 묶고 조합하여 병합된 하나의 static한 결과물로 만들어준다. 

css, img 등은 JS가 아니기에 모듈로 보기 어렵지만, 웹팩은 로더(Loader)를 통해 css, img 등 자바스크립트가 아닌 파일들도 처리 가능하도록 지원한다. 웹팩에서 처리할 수 있는 모듈 타입 목록은 아래와 같다.

##### webpack 모듈 예시

- ES2015의 `import`
- CommonJS의 `require()`
- AMD의 `define`, `require`
- CSS/Sass/Less의 `@import`
- 스타일시트의 `url(...)`
- HTML의 `<img src=...>`

#### 웹팩이 필요한 이유

1. 번들링

SPA 개발에서는 JS의 코드량이 크게 증가했으며, 이에 수많은 자바스크립트 파일들이 공존하고 서로 복잡한 의존성을 가지게 되었다. 

만약 웹 애플리케이션에 사용된 수많은 자바스크립트 파일들을 하나씩 따로 로드해오면, 웹 페이지 로딩 시 큰 속도 저하로 이어질 수 있다. HTTP2에서는 하나의 커넥션에 동시에 여러 파일을 요청할 수 있지만, HTTP1.1에서는 하나의 요청 당 하나의 커넥션을 열어 하나씩 요청해야 한다. 하나의 요청이 끝나야 다음 요청을 보낼 수 있기에 요청이 많을수록 비효율적이다.

따라서 이에 번들러를 통해 수많은 JS 파일들을 하나의 JS 파일로 번들링하는 작업이 필요하다.

2. 모듈 의존성 관리

웹팩은 의존성 그래프의 시작점이 되는 entry 파일을 통해 필요한 모든 자원을 모듈로 로딩하고 하나의 파일로 묶어주는 작업을 한다. 자바스크립트 뿐만 아니라 CSS, Image 파일 등 리소스 간의 의존성도 관리한다. (ex. CSS/Sass 내부의 @import, url이나 HTML 내의 src...)

즉, 웹팩 자체만으로 모듈의 의존성을 관리할 수 있다.

3. 효율적인 자바스크립트 개발을 위한 기능 제공

[Code Spliting](https://webpack.js.org/guides/code-splitting/)과 [Dynamic imports(Lazy Loading)](https://webpack.js.org/guides/code-splitting/#dynamic-imports), [Tree Shaking](https://webpack.js.org/guides/tree-shaking/), [Dev Server(Node.js Express 웹서버)](https://webpack.js.org/configuration/dev-server/) 등 효율적인 자바스크립트 개발을 위한 기능을 제공한다.

#### 웹팩 기본 개념 정리

- Entry: 모듈의 의존성 그래프를 만드는 첫 시작점. 웹팩은 이 entry에 지정된 파일에 연관된 모듈과 라이브러리를 포함한 번들을 만든다.
- Output: 번들 파일이 위치할 디렉토리와 이름을 지정한다.
- Loaders: webpack은 기본적으로 자바스크립트 파일만 인식한다. 하지만 다양한 로더들을 사용하면 다른 타입 (css,html, imagel...) 의 파일도 처리할 수 있다.
- Plugins: 플러그인은 번들링 된 결과에 추가적인 후처리를 할 수 있는 도구를 제공한다. 예를 들어 번들 최적화, 에셋 관리 등을 처리할 수 있다.
- Mode: 웹팩은 development, production 모드를 지원한다. 따라서 개발 환경/프로덕션 환경에 따라 번들링 되는 시점에 하는 일을 다르게 지정해줄 수 있다. 일례로, 개발 환경에서는 디버깅을 위해 압축이 필요 없지만 프로덕션 환경에서는 파일 용량을 줄이기 위해 압축이 필요하다. 이렇게 환경에 따라 다른 일을 하도록 mode 옵션을 통해 지정해줄 수 있다

[참고 링크]

[TOAST UI - 번들러](https://ui.toast.com/fe-guide/ko_BUNDLER/)

[Webpack 이란 무엇인가?](https://webclub.tistory.com/635)

[웹팩의 기본 개념](https://jeonghwan-kim.github.io/js/2017/05/15/webpack.html)