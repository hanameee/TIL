# E2E test

## E2E Test란?

E2E 테스트는 전체 시스템을 사용자의 관점에서 테스트하는 것을 의미한다.

- 전통적인 웹 환경에서의 E2E 테스트: QA 등의 전문 테스트 조직에서 셀레니움 웹 드라이버 등의 도구를 통해 브라우저를 이용해 전체 시스템을 테스트 하는 것. 
- 모던한 E2E 테스트: 프론트엔드 개발자가 개발 과정에서 브라우저와 통합된 형태의 구조인 Cypress 등의 도구를 사용해 테스트를 작성하는 것.


## CodeceptJS

### Selenium

> Selenium automates browsers. That's it!

- *Selenium* is an umbrella project for a range of tools and libraries that enable and support the automation of web browsers. [출처](https://www.selenium.dev/documentation/en/)

- *Selenium* is a suite of tools for automating web browsers. Primarily it is for automating web applications for testing purposes, but is certainly not limited to just that. Boring web-based administration tasks can (and should) also be automated as well. [출처](https://www.selenium.dev/about/)
- *Selenium* is many things but at its core, it is a toolset for web browser automation that uses the best techniques available to remotely control browser instances and emulate a user’s interaction with the browser. [출처](https://www.selenium.dev/documentation/en/introduction/the_selenium_project_and_tools/)

셀레니움은 한가지 도구가 아니라, 웹 어플리케이션 자동화 테스트를 위한 여러 도구들의 모음(suite)이다. 셀레니움은 아래의 3가지 프로젝트로 구성되어 있다.

- Selenium WebDriver: WebDriver은 브라우저를 조작하고 테스트를 실행할 수 있는 브라우저 자동화 API를 사용한다. (브라우저 vendor들이 제공)
- Selenium IDE: 셀레니움 테스트 케이스를 보다 작성하기 위해 사용하는 도구이다. 브라우저 (Chrome, Firefox) 확장 기능으로 제공되며, 유저의 행동을 record하는 방식으로 테스트 케이스를 쉽게 만들 수 있다.
- Selenium Grid: 테스트 케이스를 서로 다른 머신들과 플랫폼들에서 돌릴 수 있게 해준다. 여러 브라우저와 OS의 조합에 테스트를 돌리고 싶을 때 사용한다.

이런 셀리니움은 기본적으로 웹사이트의 front-end testing을 위해 사용되지만, 더 근본적으로는 browser user agent library이다. 

### Playwright

Playwright is a Node.js library to automate Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

## Cypress

(작성중)


## 출처

https://ui.toast.com/fe-guide/ko_TEST#e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC

https://ui.toast.com/fe-guide/ko_TEST#e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8 