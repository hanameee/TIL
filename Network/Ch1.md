# Chapter 01. 웹 브라우저가 메시지를 만든다 - 웹 브라우저의 내부 탐험

## 0. 개요

1) 사용자가 브라우저에 URL을 입력하면, 브라우저는 URL을 해독해서 리퀘스트 메시지를 만든다. 이 리퀘스트 메시지의 구체적인 모습과 의미를 알아본다.

2) 브라우저는 만든 리퀘스트 메시지를 OS에 의뢰해 웹 서버에 송신해야 한다. 그렇기 위해선 메시지를 수신받을 상대의 IP 주소를 OS에 같이 알려줘야 하는데, 이를 위해서 브라우저는 URL에 포함된 웹 서버의 도메인 이름을 DNS 서버에 조회해 IP 주소를 조사한다. 이 과정에 대해 알아본다.

3) 브라우저로부터 IP 주소 조회를 요청받은 DNS 서버는, 전 세계에 존재하는 수만 대의 DNS 서버와 연대해 IP 주소를 조사한다. 이 연대하는 방법에 대해 알아본다.

4) IP 주소를 조사한 후에는 리퀘스트 메시지를 웹 서버에 송신하도록 OS에 의뢰한다. OS에 의뢰할 때 따라야 하는 세밀한 규칙에 대해 알아본다.

## 1. HTTP 리퀘스트 메시지를 작성한다.

### URL 입력

![img](https://blog.kakaocdn.net/dn/wH3Ot/btqwixsxiB9/SphtWtrhOOtMdgi3rXzzR0/img.png)

[사진 출처](![img](https://blog.kakaocdn.net/dn/wH3Ot/btqwixsxiB9/SphtWtrhOOtMdgi3rXzzR0/img.png))

URL의 구조는 URL의 맨 앞에 있는 문자열(ex. `http:`)에 의해 결정되는데, 이 문자열은 액세스하는 방법을 나타낸다. 프로토콜이라고도 한다. http 프로토콜을 사용하는 URL의 구조는 위와 같다. 

**프로토콜 (Protocol)**: 브라우저가 통신 동작을 위해 어떤 규약을 사용해야 하는 지를 나타낸다. 우리가 흔히 보는 `http(s)` 는 액세스 대상이 웹 서버일 때 사용하는 규약이다. 브라우저는 웹 서버에 액세스하는 클라이언트 기능 뿐만 아니라 파일을 주고받는 FTP의 클라이언트 기능이나, 메일의 클라이언트 기능도 있기에 `ftp:`나 `mailto` 와 같은 프로토콜도 존재한다.

⚠️ 참고) `file:` 로 시작하는 URL 처럼, 액세스 할 때 네트워크를 사용하지 않는 경우도 있다. 이런 경우까지 고려해서 엄밀히 말하면 URL의 맨 앞 부분은 **액세스 방법**이라는 식으로 생각하는 것이 좋다.

### URL 해독

브라우저는 웹 서버에 보낼 리퀘스트 메시지를 작성하기 위해 URL을 해독한다.

`https://developer.mozilla.org/ko/docs/Learn/Common_questions/What_is_a_URL`

위 URL의 경우, 아래와 같은 요소로 분해될 수 있다.

- `http:` - 데이터 출처에 액세스하는 방법 (프로토콜)
- `//` - 나중에 이어지는 문자열이 서버의 이름임을 나타냄
- `developer.mozilla.org` - 서버의 이름
- `ko/docs/Learn/Common_questions/What_is_a_URL` - 데이터 출처(파일)의 경로명

### HTTP 프로토콜

URL 해독 후엔 어디에 액세스해야 하는지가 결정된다. 웹 서버에 엑세스할 때는 HTTP 프로토콜을 사용하는데, 이 HTTP 프로토콜이란 무엇일까?

## 2. 웹 서버의 IP 주소를 DNS 서버에 조회한다.



## 3. 전 세계의 DNS 서버가 연대한다.



## 4. 프로토콜 스택에 메시지 송신을 의뢰한다.

