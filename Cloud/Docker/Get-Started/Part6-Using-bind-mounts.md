# 🐳 Docker 공식문서 Get Started

링크: https://docs.docker.com/get-started/

## [Part6. Using bind mounts](https://docs.docker.com/get-started/06_bind_mounts/)

Ch5에서 데이터베이스에 데이터를 유지하기 위해 `named volume`을 사용했었다. named volume은 데이터가 **어디** 저장되는지 신경쓰지 않고 데이터를 저장하기에는 훌륭하다.

반면, `bind mounts`는 host의 정확한 mountpoint를 컨트롤할 수 있다. 이 mountpoint는 데이터를 유지하기 위해 사용할 수도 있지만, 컨테이너에 추가적인 데이터를 제공하기 위해서 더 자주 사용한다.

소스코드를 우리의 컨테이너에 mount 하기 위해 bind mount를 이용한다. 

### Volume 타입 비교

도커 엔진의 대표적인 볼륨의 종류는 Bind mounts, named volumes 이다. 하지만 다른 사용처를 위한 추가적인 볼륨 드라이버들도 존재한다. ([SFTP](https://github.com/vieux/docker-volume-sshfs), [Ceph](https://ceph.com/geen-categorie/getting-started-with-the-docker-rbd-volume-plugin/), [NetApp](https://netappdvp.readthedocs.io/en/stable/), [S3](https://github.com/elementar/docker-s3-volume) 등...)

|                                              | Named Volumes             | Bind Mounts                   |
| :------------------------------------------- | :------------------------ | :---------------------------- |
| 호스트 위치                                  | 도커가 결정한다           | 사용자가 컨트롤한다           |
| Mount 예시 (using `-v`)                      | my-volume:/usr/local/data | /path/to/data:/usr/local/data |
| Populates new volume with container contents | Yes                       | No                            |
| Volume Drivers 지원                          | Yes                       | No                            |

### Dev-Mode 컨테이너 시작하기

기존에 있던 getting-started-master 앱에서, 아래 방법으로 dev workflow를 지원하는 container을 돌려볼 것임.

- 소스코드를 컨테이너에 mount한다.
- devdependencies를 포함한 dependencies를 설치한다.
- nodemon을 시작해서 filesystem 변화를 watch한다.

1. 기존에 돌고 있는 컨테이너를 다 내린다.

2. getting-started-master 앱의 root 폴더에서 아래 명령어를 실행한다. 

   ```bash
   docker run -dp 3000:3000 \
        -w /app -v "$(pwd):/app" \
        node:12-alpine \
     sh -c "yarn install && yarn run dev"
   
   ```

   - `-dp 3000:3000` : 컨테이너를 detached (background) mode에서 run하고, port mapping을 만들어라.
   - `-w /app` : working directory를 /app으로 설정해라. 이후의 명령어들은 해당 디렉토리를 기준으로 실행될 것임.
   - `-v "$(pwd):/app"` : [호스트의 공유 디렉터리]:[컨테이너의 공유 디렉토리] 를 공유한다는 뜻. 여기서는 호스트의 현재 디렉토리를 컨테이너의 /app 디렉토리와 공유하라는 것.
   - `node:12-alpine`: 사용할 이미지. 
   - `sh -c "yarn install && yarn run dev"` : 명령어. sh를 통해 shell을 시작하고 (alpine은 bash가 없음), yarn install로 모든 의존성을 설치하고, yarn run dev로 nodemon을 실행한다.
3. `docker logs -f <container-id>` 명령어로 logs를 볼 수 있다.


이렇게 컨테이너를 띄운 후, 기존 소스코드를 수정한 뒤 (ex. Add item 버튼을 Add로 수정) 새로고침을 하면 Node server가 다시 실행되면서 수정사항이 바로 반영된 것을 볼 수 있다.

이렇게 local development setup을 할 때 bind mount를 사용하는 것은 아주 흔하다. Dev machine에 빌드 툴이나 환경이 설치되어 있을 필요 없이, docker run만을 통해서 개발환경을 세팅할 수 있다.

이후에 배울 Docker Compose까지 활용하면 위에처럼 -dp -w -v 등등 다양한 플래그가 포함된 복잡한 명령어를 칠 필요 없이, 명령어를 간략화할 수 있다.