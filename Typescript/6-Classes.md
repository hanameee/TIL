# 6. 클래스

## 자바스크립트 클래스 복습 '~'

### constructor

constructor은 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 메소드이며, 클래스 내에 **한 개만 존재**할 수 있다.

constructor은 인스턴스를 만들 때 new에 의해 자동으로 호출되어 객체의 생성과 초기화(객체의 기본 상태를 설정)를 담당한다. 즉, constructor의 파라미터로 전달한 값은 인스턴스의 클래스 필드에 할당된다.

ps) 클래스 필드(=멤버 변수)는 클래스 내부의 캡슐화된 변수를 말한다.

```typescript
class Person {
  constructor(name) {
    // this는 클래스가 생성할 인스턴스를 가리킨다.
    // name은 클래스 필드이다.
    this._name = name;
  }
}

const me = new Person('Lee'); // constructor 함수가 called 된다
console.log(me) // Person {name: "Lee"}
```

constructor은 **생략**할 수 있는데, 생략할 경우 클래스에 `constructor() {}` 를 포함한 것과 동일하게 동작한다. 즉, **빈 객체를 생성**한다. 빈 인스턴스를 생성하고 이후 프로퍼티를 동적으로 추가하면 됨.

### class field

최근 "클래스 필드" 라는 새로운 문법이 생겨서, 생성자 내부 뿐만이 아니라 클래스 내부에서도 직접 인스턴스 필드를 선언할 수 있게 되었다.

```javascript
class Person {
  name = 'No Name' // 클래스 필드의 선언과 초기화
}

const me = new Person();
console.log(me) // Person {name: "No Name"}
```

[출처]

https://ko.javascript.info/class

https://poiemaweb.com/es6-class

## Inheritance

Typescript에서는 상속을 통해 기존에 존재하는 class를 확장할 수 있다.

```typescript
// superclass
class Animal {
  name: string; // 클래스 필드
  // 생성자
  constructor(theName: string){
    this.name = theName;
  }
  // 메소드
  move(meters: number = 0) {
    console.log(`${this.name} moved ${meters}`);
  }
}

// subclass (base class: Animal)
class Snake extends Animal {
  // 규칙1. 자식 클래스에서 생성자 함수를 정의하려면 반드시 super() 을 호출해줘야 한다. super() 은 base class의 constructor을 실행한다. 별도로 정의하지 않으면 부모 클래스의 constructor을 따라감.
  constructor(name: string) {
    super(name);
  }
  // 규칙2. 부모 클래스의 method를 사용할 때도 super을 호출해야 한다. (?)
  move(meters = 5) {
    console.log("기어간다~");
    super.move(meters);
  }
}
```

## 지정자

### **public**

TS에서 클래스의 각 멤버 변수들은 기본적으로 public이다. Animal에 명시적으로 public 지정자를 붙여 써주면 아래와 같다.

```tsx
// superclass
class Animal {
  public name: string; // 클래스 필드
  // 생성자
  public constructor(theName: string){
    this.name = theName;
  }
  // 메소드
  public move(meters: number = 0) {
    console.log(`${this.name} moved ${meters}`);
  }
}
```

### **private**

ES에서 지원하는 private field를 타스에서도 지원한다.

[es private fields]

```javascript
class Animal {
  #name: string;
  constructor(theName: string) {
    this.#name = theName;
  }
}

new Animal("Cat").#name; // 에러! Property '#name' is not accessible outside class 'Animal' because it has a private identifier.
```

타스는 `private` 지정자로 위 기능을 구현한다.

```tsx
class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

new Animal("Cat").name;
```

타스에서 structural type system을 사용해서, 2개의 다른 타입을 비교할 때 실제로 선언된 타입이 어떻든 실제로 멤버 필드가 호환 가능하면 같은 타입으로 친다.

하지만 `private` 랑 `protected` 멤버의 타입을 비교할 때는 structural type system이 아니라, 정확히 같은 선언에서 생긴 건지를 본다.

```tsx
class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal("Goat");
// Animal과 Rhino는 compatible하다. Rhino도 animal에서 선언된 private 필드를 가지고 있으므로.
let rhino = new Rhino();
// Employee와 Animal은 incompatible하다. Rhino에도 Animal과 똑같은 private 필드가 있지만, Animal에서 선언된 필드가 아니기 때문에.
let employee = new Employee("Bob");

animal = rhino; // OK
animal = employee; // Error! Type 'Employee' is not assignable to type 'Animal'. Types have separate declarations of a private property 'name'.
```

### **protected**

protected는 private과 유사하지만 자식클래스에서도 접근 가능하다는 차이점이 있다.

```tsx
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 에러: name 필드는 protected라서 외부에서는 접근할 수 없고, Person과 Person의 자식 클래스 내부에서만 접근 가능하다. 
```

[참고]([]())

- public: 어디서든지 접근할 수 있으며 외부 인터페이스를 구성함.
- private: 클래스 내부에서만 접근할 수 있으며 내부 인터페이스를 구성할 때 쓰임.
- protected: private과 비슷하지만, 자손 클래스에서도 접근이 가능하다는 점이 다름.

constructor에도 protected를 붙일 수 있다. protected 생성자의 경우 클래스 외부에서 new로 초기화 할 수 없고, extended만 될 수 있다.

```tsx
class Person {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
		// 부모 클래스의 protected 생성자를 extend한 생성자
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

// protected 생성자를 extend한 생성자는 외부에서 instantiate 가능
let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 에러! Constructor of class 'Person' is protected and only accessible within the class declaration.
```

### Readonly

`readonly` 키워드를 통해 읽기전용 클래스 필드를 만들 수 있다.

```tsx
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8; // 선언 시 초기화

  constructor(theName: string) {
    this.name = theName; // constuctor에서 초기화
  }
}

let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 에러! readonly 프로퍼티는 수정 불가
```

readonly 프로퍼티는 선언할 때 같이 초기화되거나, constructor에서 반드시 초기화 해야 한다.

### Parameter properties

위 예제를 보면, `readonly` 멤버 변수로 name을 선언하고, constructor에서 파라미터 theName을 받아서 name에 할당해주고 있다.

이렇게 하는 이유는, 생성자가 실행 된 후에 theName 파라미터의 값에 접근하기 위해서이다.

Parameter properties를 이용하면 멤버를 생성하고 초기화 하는 것을 한꺼번에 할 수 있다.

```tsx
class Octopus {
  readonly numberOfLegs: number = 8;
	// 읽기 전용 멤버 생성과 초기화를 한줄에 할 수 있음 
  constructor(readonly name: string) {}
}

let dad = new Octopus("Man with the 8 strong legs");
dad.name;
```

### Accessors

TS도 getter/setter을 지원한다. 멤버 변수의 수정/접근에 제한을 두는 것.

일반적으로는 아래처럼 멤버 변수에 자유롭게 접근하고 수정할 수 있다.

```tsx
class Employee {
  fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";

if (employee.fullName) {
  console.log(employee.fullName);
}
```

하지만 아래처럼 별도의 setter을 두어서 set 할 때 DB의 길이제한에 적합한지를 체크하는 단계를 추가적으로 둘 수도 있다.

```tsx
const fullNameMaxLength = 10;

class Employee {
	// 실제 변수는 private로 외부에서 직접 접근/수정 불가
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }
	// setter에서 파라미터의 length 유효성을 체크하고 유효할 때만 set함
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";

if (employee.fullName) {
  console.log(employee.fullName);
}
```

