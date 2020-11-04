# Gitflow

## Gitflow란?

Git 워크플로우로, 계획적인 릴리즈 계획을 갖고 있는 대규모의 프로젝트를 관리하는데 적합하다.

## Gitflow의 브랜치 전략

1. Master
2. Develop
3. Feature
4. Release
5. Hotfix

### Master

릴리즈 할 때 사용하는 최종 단계의 메인 브랜치로, 릴리즈 기록을 담고 있다.

### Release

Develop 브랜치에서 파생되는 브랜치로, 현재 코드가 Master 브랜치로 병합될 수 있는지 테스트를 하고, 테스트 과정에서 발생한 버그를 고치는 역할을 담당한다. 이상이 없다면 Release 브랜치는 Master 브랜치로 병합된다.

~~(우리 팀에서는 현재 Release 브랜치를 사용하지 않는다)~~

### Hotfix

릴리즈 된 Master 브랜치에서 버그가 발견될 경우, Master 브랜치에서 Hotfix 브랜치를 내어 버그를 수정한다. 디버그가 완료되었다면 Master 브랜치와 Develop 브랜치에 각각 Merge 한다. (Develop과 Master 간에 Conflict가 생기지 않도록)

### Develop

다음 릴리즈 버전 개발을 진행하는 브랜치. 기능 구현이 필요하면 Develop 브랜치에서 브랜치를 내어 개발을 진행하고, 개발이 완료된 기능은 다시 Develop 브랜치로 병합된다.

Develop 브랜치에서 Master 브랜치로 머지할 때는 Rebase and Merge를 한다.

### Feature

Develop 브랜치에서 기능 구현을 위해 낸 브랜치이다. Feature 브랜치에서 Develop 브랜치로 머지할 때는 Squash and Merge를 한다.

### 참고) Merge 방식 비교

### Merge

모든 변경사항을 refer 하는 Merge 커밋 노드 생성. Merge 노드는 부모로 머지 대상 브랜치와, 변경 사항 브랜치 2개를 가짐.

<img src="https://image.toast.com/aaaadh/real/2017/techblog/Screen%20Shot%2020170529%20at%2012.15.48%20PM.png" alt="Screen Shot 2017-05-29 at 12.15.48 PM.png" style="zoom:67%;" /> 

### Squash and Merge

모든 변경사항을 반영하는 새로운 커밋을 만들고, 이를 머지 대상 브랜치에 추가.

<img src="https://image.toast.com/aaaadh/real/2017/techblog/Screen%20Shot%2020170529%20at%2012.15.51%20PM.png" alt="Screen Shot 2017-05-29 at 12.15.51 PM.png" style="zoom:67%;" />

### Rebase and Merge

변경사항을 심리스하게 머지 대상 브랜치로 추가. 각 커밋은 모두 Parent를 하나씩만 가짐.

<img src="https://image.toast.com/aaaadh/real/2017/techblog/Screen%20Shot%2020170529%20at%2012.15.55%20PM.png" alt="Screen Shot 2017-05-29 at 12.15.55 PM.png" style="zoom:67%;" />

## References

[Git을 다루는 Workflow: Gitflow, Github flow, Gitlab flow](https://medium.com/extales/git%EC%9D%84-%EB%8B%A4%EB%A3%A8%EB%8A%94-workflow-gitflow-github-flow-gitlab-flow-849d4e4104d9)

[GitHub의 Merge, Squash and Merge, Rebase and Merge 정확히 이해하기](https://meetup.toast.com/posts/122)