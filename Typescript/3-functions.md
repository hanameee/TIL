# 3. 함수

### 함수를 타이핑하기

함수의 파라미터(들)의 타입과, 리턴 타입을 정의해준다.

⚠️ 타입스크립트는 함수의 return 문을 보고 type을 알아낼 수 있으므로 함수 리턴 타입 명시는 optional이다.

#### 함수 표현식

```typescript
const add = function(x:number, y:number):number {
  return x+y
}
```

화살표 함수의 경우

```typescript
const add = (x:number, y:number): number => {
  
}
```

#### 함수 선언문

```typescript
function add(x:number, y:number):number {
  return x+y
}
```

### 함수 타입 [출처](https://hyunseob.github.io/2016/11/18/typescript-function/)

기본적으로 ts에는 `Function` 이라는 인터페이스가 내장되어 있다.

```typescript
// myFn엔 함수 외에 다른 값은 할당할 수 없다.
let myFn: Function = function() {};
```

하지만 `Function` 인터페이스만 가지고서는 매개변수와 리턴값에 상관 없이 어떤 함수라도 할당할 수 있기에, 조금 더 strict한 함수 인터페이스를 선언하기 위해서는 세부적인 함수 타입을 지정해주어야 한다.

함수 타입은 2가지 파트를 **모두** 가지고 있어야 한다. (1) arguments의 타입 (2) return 타입

```typescript
// argument와 return 타입 구분은 => 로 한다
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

단, contextual typing으로 인해 우변에 위치한 함수 타입 지정을 명시적으로 해주지 않아도 된다 위 예시는 아래처럼 더 간결하게 표현할 수 있다.

```typescript
type myAddType = (x:number, y:number) => number

let myAdd: myAddType = (x,y) => {
  return x+y
}
```

### Contextual Type

TS는 contextual typing을 지원한다. Contextual typing은 위치에 따라 표현식의 타입이 정해질 때 일어난다. 

```typescript 
type greet = (name:string) => void

// greet에서 (좌변) 타입 정의를 했기에 우변에서는 파라미터와 리턴타입에 대해 타입 정의를 하지 않아도 된다.
const sayHello: greet = (name) => {
  console.log("hello", name)
}
```

출처: https://www.codegrepper.com/code-examples/typescript/contextual+typing+in+typescript

### Optional and Default Parameters

자바스크립트에서는 함수에 필요한 것보다 적거나 많은 수의 파라미터를 넘겨줘도 문제가 되지 않지만, 타입스크립트는 다르다. 더도, 덜도 않고 함수가 기대하는 정확한 수의 파라미터를 넘겨줘야 한다.

자바스크립트에서처럼 optional한 타입을 주려면? 파라미터 뒤에  `?` 를 붙이면 된다.

```typescript
function buildName(firstName: string, lastName?: string) {
 // ...
}

buildName("Lee") // OK!
buildName("Lee", "Hae", "Na") // required를 초과하는 파라미터는 여전히 에러
```

:warning: Optional parameter은 항상 required parameter 뒤에 와야 한다!

Default 값 설정도 가능하다. 해당 위치의 파라미터를 생략하거나 undefined가 주어지면 default 값이 대신 들어간다. Default 값은 Optional과는 달리 순서 상 required parameter 앞에도 올 수 있지만, default 값을 얻기 위해서는 명시적으로 `undefined`를 넘겨줘야 한다.

```typescript
function buildName(firstName="Lee", lastName: string) {
 // ...
}

buildName("Lee") // 에러. 2개의 파라미터가 주어져야 함
buildName(undefined, "Hae Na") // OK

function buildName(firstName:string, lastName="Hae Na") {
 // ...
}

buildName("Lee") // OK
```

### Rest Parameter

```typescript
function buildName(firstName:string, ...restOfName: string[]) {
  // ....
}
```

Rest Parameter은 `...변수이름:<type>[]` 로 타이핑해서 활용할 수 있다. Array of arguments가 변수 이름에 담기게 된다.

### This

일반적으로 js에서 this는 함수 호출 방식에 의해 바인딩되는 객체가 동적으로 결정된다. 하지만, ES6의 화살표 함수를 사용하면 함수를 선언할 때 this에 바인딩 할 객체가 정적으로 결정된다. 즉, 화살표 함수의 this는 언제나 상위 스코프의 this를 가리키게 된다.

this를 사용하는 함수를 리턴하는 경우를 보자.

이때 화살표 함수를 사용하더라도 ts는 `this.어쩌구저쩌구`의 type을 any로 예측한다. 만약 ts 컴파일러에 `--noImplicitThis`  flag를 넘기면 에러를 뿜을 것.

이를 방지하기 위해서는 아래처럼 명시적으로 this에 타입을 지정해서 파라미터로 넘겨주는 방법이 있다.

```typescript
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // 명시적으로 this에 타입을 지정해서 파라미터로 넘겨주었다.
  // 이제 this.suits[pickedSuit]은 string이라는 type을 가지며, --noImplicitThis 플래그도 잘 통과한다.
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

```

### Overload

받는 파라미터의 종류에 따라 리턴 값의 형태가 달라지는 경우, ts가 지원하는 오버로딩을 활용할 수 있다.

파라미터의 종류에 맞게 함수를 타이핑해주고, 함수의 실제 구현은 any(가장 범용적인 타입)로 타이핑한 마지막 함수 선언부에서 해준다.

```typescript
// 다양한 파라미터와 리턴 타입에 맞게 오버로드 타입 지
function greetBuilder(firstName: string, age?: number): void;
function greetBuilder(firstName: string, age: string): string;
// 실제 구현
function greetBuilder(firstName: any, age: any): any {
    if (typeof age == 'number') {
      	console.log(`Hi My Name is ${firstName}`)
    } else if(typeof age == 'string') {
        return `Hi My Name is ${firstName} and I'm ${age} years old`
    }
}
```

출처: https://heecheolman.tistory.com/66#overloading