# 🐳 Docker 공식문서 Get Started

링크: https://docs.docker.com/get-started/

## [Part10. What next](https://docs.docker.com/get-started/11_what_next/)

워크샵은 Ch9로 끝! 하지만, 컨테이너에 대해 배울 것은 아직 많다. 알아보면 좋을 주제는 아래와 같다.

### Container orchestration

Production 환경에서 컨테이너를 띄우는 것은 힘들다. 매번 머신에 로그인 해서, `docker run`이나 `docker-compose up` 띄우는 걸로는 부족하다.

컨테이너가 갑자기 죽거나, 몰려드는 트래픽으로 인해scale up하기 위해 컨테이너에 여러 머신에 띄워야 할 경우에도 매번 명령어로 할 수는 없기 때문이다.

그럴때 사용하는게 컨테이너 오케스트레이션이다. (쿠버네티스, swarm, nomad, ECS 등) 컨테이너 오케스트레이션의 전체적인 컨셉은 "매니저"에게 "희망 상태"를 제공하는 것이다.

예를 들어, `2개의 웹앱 인스턴스를 띄우고, 80포트로 노출시키고 싶다` 라는 희망 상태를 제공하면, 컨테이너 오케스트레이션의 매니저들이 클러스터의 머신들을 보고 worker nodes에 일을 할당한다. 매니저들은 컨테이너가 죽거나 하는 변경사항을 watch하고 있다가, 희망 상태에 맞게 현재 상태를 맞추기 위해 일을 할당한다.

### Cloud Native Computing Foundation projects (CNCF)

CNCF는 다양한 오픈소스 프로젝트를 위한 vendor-neutral home이다. 쿠버네티스, 프로메테우스, Envoy, Linkerd, NATS 등등의 프로젝트가 포함되어 있다.

- [graduated and incubated projects](https://www.cncf.io/projects/)
- [CNCF Landscape](https://landscape.cncf.io/)

모니터링, logging, 보안, image registries, 메시징 등의 문제를 해결해 줄 프로젝트들이 많다!

