# 🐳 Docker

### Docker의 기본 개념

**Docker**: 컨테이너 기반의 오픈소스 가상화 플랫폼

**Container**:

- 다양한 프로그램, 실행환경을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 프로그램의 배포 및 관리를 단순하게 해주는 것. 벡엔드 프로그램, DB 서버, 메시지 큐 등 어떤 프로그램도 컨테이너로 추상화 할 수 있고, 조립 PC, AWS, Azure, Google cloud 등 어디서든 실행할 수 있다.
- 어플리케이션이 동작하기 위해서 필요한 요소(실행 파일, 어플리케이션 엔진 등)을 패키지화하고 격리하는 기술

- 컨테이너는 격리된 공간에서 프로세스가 동작하는 기술로, 가상화 기술 중 하나다. 이미지를 실행한 상태이며 추가되거나 변하는 값은 컨테이너에 저장된다.

컨테이너는 Cgroup과 namespace와 같은 커널 기반의 기술을 이용해 프로세스를 완벽하게 격리하여 분리된 환경을 만들고 실행하도록 만듬.

**Cgroup(control group)**: 시스템의 CPU 시간, 시스템 메모리, 네트워크 대역폭과 같은 자원을 제한하고 격리할 수 있는 커널 기능.

**namespace**: 시스템 리소스를 프로세스의 전용 자원처럼 보이게 하고, 다른 프로세스와 격리시키는 기능.

**Images**: 컨테이너 실행에 필요한 파일과 설정값 등을 포함하는 것으로, 상태값을 가지지 않고 변하지 않는다. (immutable) 컨테이너는 이미지를 실행한 상태이고, 추가되거나 변하는 값은 컨테이너에 저장됨. 같은 이미지에서 여러개의 컨테이너를 생성할 수 있고, 컨테이너의 상태가 바뀌거나 컨테이너가 삭제되더라도 이미지는 변하지 않고 그대로 남아있음.

이미지는 컨테이너를 실행하기 위한 모오오오오오오든 정보를 가지고 있기에 더 이상 의존성 파일을 컴파일하고 이것저것 설치할 필요가 없다. (ex. 우분투 이미지는 우분투를 실행하는데에 필요한 모든 파일과, 실행 명령어, 포트 정보등을 가지고 있음.) 

도커 이미지는 [Docker hub](https://hub.docker.com/)에 등록하거나 [Docker Registry](https://docs.docker.com/registry/) 저장소를 직접 만들어 관리할 수 있다. 현재 공개된 도커 이미지는 50만개가 넘고 Docker hub의 이미지 다운로드 수는 80억회에 이른다. 누구나 쉽게 이미지를 만들고 배포할 수 있다.



컨테이너, 오버레이 네트워크, 유니온 파일 시스템 등... 도커는 새롭게 슝 나타난 기술이 아니라, 이미 존재하는 기술을 잘 조합하고 사용하기 쉽게 만들었다.

### 쿠버네티스

컨테이너 오케스트레이션 도구이다. 

**컨테이너 오케스트레이션**: 여러개의 서버에 컨테이너를 배포하고 운영하면서 서비스 디스커버리 같은 기능을 이용하여 서비스 간 연결을 쉽게 해주는 것. 서버 하나하나에 접속해 관리하는 것이 아니라, 서버 1,2,3,4...를 하나로 묶어 적당한 서버를 자동으로 선택해 애플리케이션을 배포하고, 부하가 생기면 컨테이너를 늘리고, 일부 서버에 장애가 발생하면 정상 동작 중인 서버에 다시 띄워 장애를 방지한다.

다시 말하자면, 쿠버네티스는 컨테이너를 쉽고 빠르게 배포/확장하고 관리를 자동화해주는 오픈소스 플랫폼이다. 마이크로서비스, 클라우드 플랫폼을 지향하고 컨테이너로 이루어진 것들을 손쉽게 담고 관리할 수 있는 그릇 역할을 한다.

서버리스, CI/CD, 머신러닝 등 다양한 기능이 쿠버네티스 플랫폼 위에서 동작한다.

### MSA (마이크로서비스아키텍처)

**모놀리틱 아키텍처**: 

비즈니스 로직, 데이터베이스와 통신하는 부분, 뷰를 그리는 부분, REST API를 제공하는 부분 등 애플리케이션의 모든 소스코드가 하나의 프로젝트로 구성되어 단일한 패키지로 배포되는 일반적인 경우를 말한다.

모놀리틱 아키텍처는 로컬에서 개발하기 편리하고, 통합 테스트를 수행하기에도 간편하지만 서비스가 지속적으로 성장하고 규모가 커질 때 한계에 부딪힌다. 서비스가 복잡해지면 코드의 변화가 영향을 미치는 범위가 커서 간단한 변화에도 통합 테스트를 실시해야하기 때문이다.

모놀리틱 아키텍처의 단점으로는 배포 시간의 증가, 부분적 스케일 아웃의 어려움, 안정성의 감소 등 여러가지가 있다. 

**마이크로서비스아키텍처**: 

MSA란? 모놀리틱 아키텍처와 반대되는 개념으로, 하나의 큰 애플리케이션을 독립적인 역할을 수행하는 여러 개의 작은 애플리케이션으로 쪼개어 변경과 조합이 가능하도록 만든 아키텍처이다. 애플리케이션을 특화된 기능별로 나누게 되면 (ex.인증/자동완성/등등...) 자연스럽게 애플리케이션의 추상화가 가능해진다.

최근 들어 REST API의 일반화와 Docker 등의 컨테이너 기술, 클라우드 컴퓨팅 환경의 발전 등에 힘입어 MSA를 좀 더 쉽게 구현할 수 있게 되었다.

마이크로서비스 아키텍처가 가지는 대표적인 단점은 분리된 서비스 간의 통신에 대한 처리가 추가적으로 필요하다는 점이다. 이렇게 분산되어있는 서비스들을 통합해서 모니터링하고 운영하기 위해 PaaS 서비스, 도커와 같은 컨테이너 기술을 활용해서 도움을 받을 수 있다.

[침고 자료]

[출처 - 마이크로서비스란?](https://www.redhat.com/ko/topics/microservices/what-are-microservices)

[마이크로서비스 아키텍처. 그것이 뭣이 중헌디?](http://guruble.com/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%EC%84%9C%EB%B9%84%EC%8A%A4microservice-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EA%B7%B8%EA%B2%83%EC%9D%B4-%EB%AD%A3%EC%9D%B4-%EC%A4%91%ED%97%8C%EB%94%94/)