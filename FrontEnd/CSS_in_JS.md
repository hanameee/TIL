# CSS in JS

## Emotion

### Emotion이란?

> Emotion is a library designed for writing css styles with JavaScript.

CSS in JS를 지원하는 라이브러리이다. 이 문서는 Emotion을 React와 함께 사용하는 방법에 대해 작성한다.

### Emotion w/ react

React와 Emotion을 같이 사용한다면 2가지 방법으로 컴포넌트를 스타일링 할 수 있다.

#### 1. CSS prop

```bash
npm install --save @emotion/react
```

`css` prop은 스타일을 가진 **클래스명** 을 만들어 컴포넌트에 적용하는 방식이다.

`css` prop은 vendor-prefixing, nested selectors, media queries 등을 지원한다.

[예시 코드]

  ```react
  // this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
  /** @jsx jsx */
  import { jsx, css } from '@emotion/react'
  
  const style = css`
    color: hotpink;
  `
  
  const SomeComponent = ({ children }) => (
    <div css={style}>
      Some hotpink text.
      {children}
    </div>
  )
  
  const anotherStyle = css({
    textDecoration: 'underline'
  })
  
  const AnotherComponent = () => (
    <div css={anotherStyle}>Some text with an underline.</div>
  )
  render(
    <SomeComponent>
      <AnotherComponent />
    </SomeComponent>
  )
  ```

코드에서 알 수 있듯, CSS prop은 보일러플레이트 코드가 적다. 이 외에도 CSS prop은 공통 변수를 관리하기 위한 theming을 편리하게 할 수 있고, 별도의 설정 없이 SSR을 지원하고, ESLint 플러그인도 설정되어 있다는 장점이 있다.

#### 2. Styled 

`styled` 를 이용해 스타일과 결합된 컴포넌트를 생성할 수도 있다.

```bash
npm install --save @emotion/styled
```

[예시 코드]

```react
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`

render(<Button>This is a hotpink button.</Button>)
```

### Babel 플러그인

Emotion은 압축과 호이스팅을 통해 source map, label 등에서 더 나은 개발자 경험을 제공하는 Babel plugin을 가지고 있다.

```bash
npm install --save-dev @emotion/babel-plugin
```

> .babelrc

```json
{
  "plugins": ["@emotion",...]
}
```

반드시 **첫 플러그인**으로 `@emotion` 을 적용해야 한다. (개발/프로덕션 등 어떤 환경이던간에)

[출처]

https://emotion.sh/docs/introduction