# Basic Git Commands

[learn git branching](https://learngitbranching.js.org/?locale=ko)

[주로 쓰게 될 명령어들]

```
commit
branch
checkout
cherry-pick
reset
revert
rebase
merge
```

## git branch

하나의 커밋과 그 부모 커밋들을 포함하는 작업 내역을 지칭한다.

## git merge

merge는 **두 개의 부모(parent)를 가리키는 특별한 커밋을 만들어 낸다**.

```
git merge B
```

현재 있는 브랜치가 A라고 하면, A와 B를 가르키는 커밋을 만들어 낸 후, A와 B 브랜치 모두 해당 커밋을 가르키도록 한다.

## git rebase

rebase는 기본적으로 커밋들을 모아서 복사한 뒤, 다른 곳에 떨궈 놓는다. rebase를 사용하면 커밋들의 흐름을  깨끗하게 관리할 수 있다.

## git 내부에서 이동하기

**HEAD**: HEAD는 **현재 체크아웃 된 커밋** (=현재 작업중인 커밋)을 가리킨다. 일반적으로 HEAD는 브랜치의 이름을 가르키고, 작업트리의 가장 최근 커밋을 가리킨다.

```
git checkout <커밋의 hash 값>
```

위의 명령어를 통해 HEAD를 분리한 뒤, 여기저기 가고 싶은 곳으로 이동할 수 있다.

**상대 참조**: 커밋의 해시를 매번 확인하는 것은 귀찮기 때문에, 일반적으로는 상대참조 (relative ref)를 이용한다. 상대 참조를 활용해 브랜치나 HEAD 에서 출발해 다른 지점으로 이동할 수 있다.

- `^` : 한번에 한 커밋 위로 움직이기
- `~<num>` 한번에 여러 커밋 위로 올라가기

## git에서 작업 되돌리기

**git reset**: 브랜치가 예전의 커밋을 가르키도록 이동시키는 방식으로 변경 내용을 되돌린다. 히스토리를 고쳐 쓴다고도 생각할 수 있다.

```
git reset HEAD~1
```


**git revert**: reset은 로컬에서 쓰기엔 문제가 없지만, 여럿이서 작업하는 상황에서는 쓰기 힘들다. 커밋한 내용을 되돌리는 내용을 다른 사람들과 공유하기 위해서는 해당 커밋과 정확히 반대되는 내용을 push 해야 한다. 이 반대되는 커밋을 만들어주는 명령어가 바로 revert!

```
git revert HEAD
```

## Cherry Pick

```
git cherry-pick <commit1> <commit2> <...>
```

위 명령어는 HEAD 아래에 있는 일련의 커밋들에 대한 복사본을 만들겠다는 말이다.

## interactive rebase

인터렉티브 리베이스란, rebase 명령어를 사용할 때 `-i` 옵션을 같이 사용한다는 것이다. 이 옵션을 추가하면, git은 리베이스의 목적지가 되는 곳 아래에 복사될 커밋들을 보여준다. (주로 vim 편집기로 보임)

interactive rebase 대화창에서는 아래 3가지 작업을 할 수 있다.

- 적용할 커밋들의 순서를 바꾸기

- 원하지 않는 커밋들을 빼기 (pick 사용)

- 커밋을 squash 하기 (커밋들을 합치기)

```
git rebase -i HEAD
```

## 딱 한 개의 커밋만 가져오기

로컬에 있는 딱 한개의 커밋만 반영하고 싶다면, 2가지 방법을 택할 수 있다.

- git rebase -i : 어떤 커밋을 취하거나 버릴지 선택할 수 있고, 커밋의 순서를 바꿀 수도 있다.
- git cherry-pick : 개별 커밋을 골라서 HEAD 위에 떨어뜨릴 수 있다.

---

## [git merge, rebase 이해하기](https://cyberx.tistory.com/96)

두 명령 모두 서로 다른 두 branch를 병합하기 위해 사용한다. 

### merge

```
// 현재 master 브랜치에 있는 상황
git merge dev
```

현재 있는 branch의 HEAD에서, master 브랜치와 dev 브랜치를 동시에 가르키는 merge commit을 생성한다.

이상적인 fast-forward 상황이 아닐 경우, merge는 merge commit 을 생성한다. 이 merge commit 이 많아지면 git log의 가독성이 나빠지게 된다.

이런 불필요한 commit object의 생성을 줄이기 위해 rebase를 사용할 수 있다. rebase를 사용하면 불필요한 merge commit을 생성하지 않고도 두 branch를 병합할 수 있다.

### rebase

rebase란 branch의 base를 다시 설정한다는 의미이다.

```
// rebase 작업은 dev에서 일어나는 것이므로 dev 브랜치로 checkout 해준 후 작업해준다
git rebase master
```

dev branch의 root commit을 master 브랜치의 가장 최근 커밋으로 변경한 후, master이 fast-forward 된다. 이런 방식으로 하면 불필요한 merge commit 없이도 두 브랜치를 병합할 수 있다. 
