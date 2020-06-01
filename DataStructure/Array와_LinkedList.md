# Array와 LinkedList

## 개념 정리

### Array

Array는 논리적 저장 순서와 물리적 저장 순서가 일치하는 자료구조이다.

**Random Access 가능** : Array는 index로 `O(1)` 의 시간에 원소에 접근할 수 있다. 

**비효율적 삭제/삽입** : 삭제/삽입을 하게 되면 배열에 빈 공간이 생겨 원소들을 shift 해줘야 하는 비용이 발생하고, 이 경우의 시간 복잡도는 `O(n)` 이 된다.

### Linked List

**효율적 삭제/삽입** : Linked List의 각 원소들은 자기 자신 다음에 오는 원소를 기억하고 있다. 따라서 삭제와 삽입이 `O(1)` 에 가능하다.

**Search 를 위한 추가 비용** : Linked List는 논리적 저장 순서와 물리적 저장 순서가 일치하지 않기에 원하는 위치에 삽입을 하고자 하면 윈하는 위치를 첫번째 원소부터 다 확인해봐야 한다. 따라서 이 원소를 찾는 데에 `O(n)` 의 비용이 든다.

정리하자면 Linked list는 search에도 `O(n)`, (작업하고 싶은 요소의 위치를 모른다면) 삭제/삽입에도 `O(n)` 의 시간복잡도를 가진다.

Linked List는 Tree 구조의 근간이 되는 자료구조이다.

## 구현

자바스크립트로 Single Linked List 구현하기

```js
class Node {
  constructor(element){
    this.element = element;
    this.next = null;
  }
}

class LinkedList{
  constructor(){
    this.head = new Node("head");
  }
  
  find(item){
    let currNode = this.head;
    while(currNode.element != item){
      currNode = currNode.next;
    }
    return currNode;
  }
  
  insert(newElement, item){
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }
  
  display(){
    let currNode = this.head;
    while(!(currNode.next == null)){
      console.log(currNode.next.element);
      currNode = currNode.next;
    }&& c
  }
  
  findPrevious(item){
    let currNode = this.head;
    while(!(currNode.next == null) && (currNode.next.element != item)) {
      currNode = currNode.next;
    }
    return currNode;
  }
  
  remove(item){
    let prevNode = this.findPervious(item)
    if(!(prevNode.next == null)){
      prevNode.next = prevNode.next.next;
    } else {
      prevNode.next = null
    }
  }
}
```

## Array 와 Linked List 비교

### 데이터 접근 속도

**Array**는 인덱스를 사용해 빠르게 원소에 접근할 수 있다. 따라서 Random Access를 지원한다. `시간 복잡도 O(1)`로 빠르게 찾을 수 있다.

**LinkedList**는 순차 접근 방식을 사용한다. 특정 원소에 접근하기 위해서는 처음부터 원소에 도달할 때까지 순차적으로 검색하면서 찾는다. `시간 복잡도 O(N)`

### 데이터 삽입/삭제

**Array**는 중간이나 맨 앞에 데이터를 삽입/삭제할 경우 이후의 데이터들을 모두 shift 해야 해서 `시간복잡도 O(N)` 이 걸린다. 

**LinkedList**는 어느 곳에 삽입/삭제하던지 O(N)의 시간 복잡도를 갖는다. (중간 삽입이 없다면 O(1)의 시간복잡도) 삽입/삭제 위치를 찾는데 O(N), 삽입/삭제를 진행하는데 O(1) 의 시간복잡도가 걸린다.

### 결론

삽입과 삭제가 빈번하다면 LinkedList를, 데이터 접근이 잦다면 Array를 사용하는 것이 좋다.

---

## References

[[자료구조] Array vs LinkedList](https://woovictory.github.io/2018/12/27/DataStructure-Diff-of-Array-LinkedList/)

