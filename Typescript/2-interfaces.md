# 2. 인터페이스

### 인터페이스란?

인터페이스는 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의하는 것. 일반적으로 타입체크를 위해 사용되며 **변수, 함수, 클래스**에 사용할 수 있다.

### 인터페이스 사용 이유

인터페이스에 선언된 프로퍼티 또는 메소드의 구현을 강제하여 일관성을 유지할 수 있도록 할 수 있다.

### 변수 인터페이스

인터페이스는 변수의 타입으로 사용할 수 있다.

[인터페이스로 객체의 타입을 정의하는 예시]

```typescript
interface Animal {
  name: string;
  age?: number; // optional property
  readonly breed: string; // readonly property
}

const dog: Animal = { name: 'Koko', age: "3", breed: "Dog"};
const cat: Animal = { name: 'Dori', breed: "Cat"}; // optional property는 없어도 된다.
dog.breed = "Cat" // 에러 발생: Cannot assign to 'breed' because it is a read-only property.
```

### 함수 인터페이스

함수 인터페이스를 위해서는 (1)타입이 선언된 파라미터 리스트와 (2)리턴 타입을 정의한다.

```typescript
interface SearchFunction {
  (source: string): boolean;
}


const searchFunc: SearchFunction = function (src: string) {
  return ...
}
```

### 클래스 인터페이스

클래스를 선언할 때 `implements` 키워드를 통해 특정 인터페이스를 구현하도록 강제할 수 있다.

```typescript
interface Animal {
  name: string;
  age: number;
  eat(food: string): void; // 추상 메소드
}

class Dog implements Animal {
  // 인터페이스에서 정의한 프로퍼티의 구현
  name: string;
  age: number;
  constructor(public name: string) {
    this.name = name;
    this.age = age;
  }
  // 인터페이스에서 정의한 추상 메소드의 구현
  eat() {
    console.log(`${this.food} 냠냠`);
  }
}
```

### 인덱스 타입

indexable type으로 optional한 타입을 사용할 수 있다.

```typescript
interface Person {
    name: string;
    [index: string]: string;
}

const person: Person = {
    name: 'Clara',
}

person.anybody = "Clara"
person[1] = 'hi' // 배열형태로도 넣을 수 있다.
```

### Duck Typing

타입 체크에서 중요한 것은 해당 인터페이스를 구현했다는 것이 아니라, 값을 실제로 가지고 있는 것이다. (값이 가진 내부 구조를 기반으로 호환성을 검사)

```typescript
interface Person {
    name: string;
    age?: number;
}

const p1: Person = {
    name: 'kris',
    birthday: '2001-01-01', // 타입 에러를 발생시킨다
};

const p2 = {
    name: 'kris',
    birthday: '2001-01-01',
};

const p3: Person = p2; // p2는 Person을 구현하지 않았음에도 에러가 나지 않는다. Person의 모든 property
```

p3 = p2 할 때 Duck Typing이 일어난다. (Type coercion, implicit casting) Person의 모든 property가 p2에 같은 타입으로 존재하기 때문에, TypeScript는 p2가 Person 인터페이스를 구현한 것으로 인정한다.

좀 더 엄밀히 얘기했을 때, 인터페이스 A가 B로 할당 가능하려면

- B에 있는 모든 필수 속성의 이름이 A에도 존재
- 같은 속성 이름에 대해 A의 속성이 B의 속성에 할당 가능

해야 한다.

인터페이스를 변수에 사용할 경우에도 덕 타이핑이 적용된다.

```typescript
interface IPerson {
  name: string;
}

function sayHello(person: IPerson): void {
  console.log(`Hello ${person.name}`);
}

const me = { name: 'Lee', age: 18 }; // me는 IPerson과 일치하지 않는다. 하지만 IPerson의 모든 property를 다 가지고 있으므로 인터페이스를 구현한 것으로 인정된다.
sayHello(me); // Hello Lee
```

### Type alias vs Interface

```typescript
// 인터페이스
interface Person {
  name: string,
 	age?: number
}
  
// 타입 앨리어스
type Person = {
  name: string,
  age?: number
}
```

타입 앨리어스는 인터페이스와는 달리 원시값 (거의 사용하지 X), 유니온 타입, 튜플 등도 타입으로 지정할 수 있다.

```typescript
// 원시값으로 타입 지정
type Str = 'Lee';

// 유니온 타입으로 타입 지정
type Union = string | null;

// 튜플로 타입 지정
type Tuple = [string, boolean];
```

인터페이스는 extends 또는 implemented 될 수 있다.

### 상속

-

### 읽어보면 좋을 링크

- https://feel5ny.github.io/2017/11/18/Typescript_05/