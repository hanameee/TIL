# 🐳 Docker 공식문서 Get Started

링크: https://docs.docker.com/get-started/

## [Part2. Our app](https://docs.docker.com/get-started/02_our_app/)

1. Dockerfile을 작성한다.

   ```dockerfile
   FROM node:12-alpine
   WORKDIR /app
   COPY . .
   RUN yarn install --production
   CMD ["node", "src/index.js"]
   ```

2. Dockerfile을 바탕으로 Container Image를 빌드한다.

   ```bash
   docker build -t getting-started .
   ```

3. 이미지를 run해 컨테이너를 시작한다.

   ```bash
   docker run -dp 3000:3000 getting-started
   ```
