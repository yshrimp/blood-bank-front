# node 19 베이스로 build 생성
FROM node:19

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 파일 복사
COPY . .

# Proxy 기능 설치
RUN npm install http-proxy-middleware

# 종속성 설치
RUN npm install

RUN npm install amazon-cognito-identity-js

# 애플리케이션 실행
CMD ["npm", "run", "start"]

# 포트 노출
EXPOSE 3000