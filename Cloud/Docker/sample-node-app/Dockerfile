# 시작할 base image (verified) - 우리의 어플리케이션은 이 base image위에 쌓이게 된다
FROM node:12.16.3

# working directory - 이 디렉토리를 만들고 이후의 명령어들은 이 디렉토리를 기준으로 실행됨
WORKDIR /code

# PORT라는 환경변수를 만들고 그 값으로 80을 지정 - 이 이미지 내부의 모든 프로세스들이 접근할 수 있다
ENV PORT 80

# package.json 파일을 /code/package.json 으로 복사
COPY package.json /code/package.json

RUN npm install

# 현재 디렉토리(.)에 있는 모든 파일을 이미지(/code)로 복사
COPY . /code

# command - 도커 엔진이 컨테이너를 시작할 때 실행할 명령어들
CMD ["node", "src/server.js"]