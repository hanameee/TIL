# Helm

## Helm이란?

Helm은 쿠버네티스용 패키지 매니지먼트 도구이다. 리눅스의 apt 툴이나, node.js의 npm에 해당한다고 볼 수 있다.

쿠버네티스를 사용하다보면 수많은 YAML 파일들을 관리해야 하는데, Helm은 이런 YAML 파일들의 집합인 차트(chart)와 차트 압축 파일(tgz)를 만들고, 차트를 관리할 수 있게 해주는 도구이다. 추가적으로 아래와 같은 일들을 할 수 있다.

- 차트들이 저장되어 있는 차트 저장소(chart repository)와 연계해서 쿠버네티스 클러스터 차트 설치/삭제
- helm으로 설치된 차트들의 배포 주기를 관리

Helm을 이용하면 기존의 차트들을 이용해서 필요한 애플리케이션(ex. mysql,redis, Jenkins, Hadoop 등...)들을 빠르게 설치할 수 있다.

## Helm의 구성요소

Helm은 2개의 구성요소를 가지고 있다. (1)Helm 클라이언트 (2)틸러 서버(Tiller Server)

- Helm Client: 사용자가 직접 사용할 수 있는 CLI 툴이다. gRPC를 이용해 틸러 서버와 통신한다.
- Tiller Server: 쿠버네티스 클러스터 내부에 설치되어, Helm 클라이언트의 명령을 받아 쿠버네티 API와 통신한다.

### 출처

https://arisu1000.tistory.com/27860

https://bcho.tistory.com/1337?category=731548

https://tech.osci.kr/2019/11/23/86027123/