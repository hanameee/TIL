# Lint

## Lint 란?

코드의 오류나 버그, 스타일 따위를 점검하는 도구를 Lint 또는 Linter 이라고 부른다.

Linter가 검사하는 항목은 크게 아래 두 가지로 분류된다.

-   포맷팅 : 일관된 코드 스타일을 유지하도록 해, 가독성이 좋은 코드를 만들어 준다. 예를 들면 일관된 “들여쓰기 규칙”, “코드 라인 최대 너비 규칙" 등이 있다.
-   코드 품질 : 코드를 분석해 어플리케이션의 잠재적인 오류나 버그를 발생시킬 수 있는 부분을 잡아준다. "사용하지 않는 변수 쓰지 않기", "글로벌 스코프 함부로 다루지 않기" 등의 규칙이 있다.

## Lint 를 사용하는 이유

Lint는 코드의 가독성을 높이는 것 뿐만 아니라, 잠재적인 오류와 버그를 제거해 동적 언어의 특성인 **런타임 버그를 예방**하는 역할도 한다.

## 참고 - Prettier과 Lint 의 차이

**Prettier**은 code formatter이다. 내 코드를 읽고 AST(추상 구문 트리)를 만들어, 정의한 규칙에 따라 포맷팅 된 새로운 코드를 작성한다. Prettier을 사용하면 일관적인 포맷으로 코드를 작성할 수 있다.

**Linter**에는 ESLint, TSLint 등이 있다. 그 중 대표적으로 사용하는 ESLint 는 JavaScript linter로, 코드를 분석해 버그를 일으킬 수 있는 에러를 잡아준다. 이 에러에는 style 에러 뿐만 아니라, **코딩 에러**도 포함된다.

Prettier 공식 사이트에서는 아래와 같이 설명하고 있다.

---

Linters have two categories of rules:

**Formatting rules**: eg: [max-len](https://eslint.org/docs/rules/max-len), [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs), [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing), [comma-style](https://eslint.org/docs/rules/comma-style)…

Prettier alleviates the need for this whole category of rules! Prettier is going to reprint the entire program from scratch in a consistent way, so it's not possible for the programmer to make a mistake there anymore :)

**Code-quality rules**: eg [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars), [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind), [no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals), [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)…

Prettier does nothing to help with those kind of rules. They are also the most important ones provided by linters as they are likely to catch real bugs with your code!

[출처 - Prettier vs. Linters](https://prettier.io/docs/en/comparison.html)

---

정리하자면, 린터가 가지고 있는 2종류의 규칙 중, **Formatting과 관련된 규칙은 Prettier**이 담당할 수 잇으나 **Code Quality와 관련된 규칙** (사용하지 않은 변수, 암묵적 전역 금지 등...)은 Prettier이 아닌 오직 **Linter**만이 잡아줄 수 있다.

Prettier과 Linter을 충돌 없이 함께 사용하기 위해서는,

1. Linter의 formatting rules를 끄고
2. Linter의 extension에 Prettier을 추가해 한번에 돌려 포맷팅을 완료하거나, Linter과 Prettier을 순차적으로 한번씩 돌려 포맷팅을 완료하는 방법이 있다.

자세한 방법은 Prettier 공식 홈페이지 도움말 [Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html) 을 참고하자.
