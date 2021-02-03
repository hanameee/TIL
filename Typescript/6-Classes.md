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



### public

TS에서 클래스의 각 멤버 변수들은 기본적으로 public이다. Animal에 명시적으로 public 지정자를 붙여 써주면 아래와 같다.

```typescript
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

### private

Private 멤버 변수는 클래스 외부에서는 접근할 수 없다.



### protected