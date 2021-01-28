# 🐳 Docker 공식문서 Get Started

링크: https://docs.docker.com/get-started/

## [Part3. Updating our Application](https://docs.docker.com/get-started/03_updating_app/)

App에 어떤 변경사항이 생겼다고 가정하자. 이 변경사항을 반영하려면 어떻게 해야할까?

1. 변경사항을 수정한다.

2. 수정한 변경사항을 반영한 이미지를 다시 build 한다.

   ```bash
   docker build -t getting-started .
   ```

3. 기존에 돌고 있던 컨테이너를 stop하고, 제거한다.

   ```bash
   # 돌고 있는 도커 컨테이너들의 ID를 받아오는 명령어
   docker ps
   docker stop <container-id>
   docker rm <container-id>
   ```

   ⚠️ 참고 - `docker rm -f <container-id>` 명령어로 컨테이너의 중지와 삭제를 한꺼번에 할 수 있다.

4. 변경사항을 반영한 이미지로 다시 컨테이너를 띄운다.

   ```bash
   docker run -dp 3000:3000 getting-started
   ```

이 일련의 작업들을 해주고 localhost:3000으로 가보면 변경사항이 반영된 앱이 떠 있는 것을 볼 수 있다. 그런데 지금 이렇게 작은 업데이트를 해주기가 굉장히 번거롭기도 하고, 무엇보다 앱의 기존 상태 
(Todo)가 다 삭제된 것을 볼 수 있다.

요건 바람직한 업데이트라고 보기 힘듬. 개선된 방법을 나중에 배울것!