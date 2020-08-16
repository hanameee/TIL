# Storybook

## Storybook의 필요성

개발은 컴포넌트 단위로 진행하지만, 실제 개발 환경은 페이지 단위로 만들어져있다. 따라서 재사용 가능한 버튼 하나를 만들려고 하면 수 많은 버튼의 상태를 의존성과 환경변수가 걸려있는 페이지에서 일일히 변경해가며 테스트 해야 한다.

이러한 방식은 불편할 뿐만 아니라, 온전히 UI에 집중하기 힘들어지고 컴포넌트의 의존성을 쉽사리 파악하기가 어려워진다. 이는 컴포넌트의 재사용성을 감소시킨다.

## Storybook 이란

> Storybook is a user interface development environment and playground for UI components.

### playground for UI components

Storybook은 위와 같은 문제들을 해결해줄 수 있는, 프로젝트로부터 **고립된 환경**에서 UI 컴포넌트를 독립적으로 개발할 수 있게 해주는 툴이다. 이렇게 독립된 공간에서 개발함으로써 프로젝트가 가지는 의존성에 구애받지 않고 순수히 **UI에 집중해 개발**할 수 있다.

Storybook을 활용하면 더욱 유연하고 재사용 가능한 컴포넌트 개발을 할 수 있다.

### design system

Storybook은 그 자체로 문서화된 디자인 시스템으로서의 역할도 수행한다. Storybook 자체가 컴포넌트들의 usecase를 나열해 놓은 책자가 되기 때문이다.

Storybook은 서버 없이 정적 에셋만으로 구동이 가능하므로, 간단하게 배포가 가능하다. 이렇게 배포를 한다면 인터랙티브한 문서로써 디자이너/기획자와 협업하는 도구로 사용할 수 있다.

## Storybook 사용하기

### stories

Storybook은 stories의 모음이다. 하나의 stories 파일은 여러개의 story로 구성되어 있다. 하나의 story는 컴포넌트가 화면에 렌더링되는 하나의 경우를 리턴하는 함수이다. 즉, story는 컴포넌트의 시각적 상태 하나를 나타낸다.

아래 하나의 stories 파일은 2개의 story (text, emoji)를 가지고 있다.

```jsx
import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
};

export const text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

```

`default export` : 컴포넌트의 stories 그룹 전체에 적용되는 metadata를 정의한다.

`named export` : 하나하나가 컴포넌트의 story를 정의한다.

위 방식은 Storybook에 비교적 최근 도입된 [Component Story Format (CSF)](https://storybook.js.org/docs/formats/component-story-format/) 을 따른 것이다. 기존의 많은 레퍼런스들에서 볼 수 있었던 전통적인 방식으로는 [storiesOf API](https://storybook.js.org/docs/formats/storiesof-api/)가 있고 (현재 rn은 storiesOf API만 지원), 마크다운과 JSX stories를 합친 실험적인 방식인 [MDX syntax](https://storybook.js.org/docs/formats/mdx-syntax/)도 있다.

### stories 로딩하기

Storybook은 모듈을 동적으로 가져오기 위해서 내부적으로 Webpack의 [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)를 사용한다.

stories들은 `.storybook/main.js` 파일 또는 `.storybook/preview.js` 파일에서 로드된다. 정규표현식을 통해 stories 파일을 가져올 수 있다.

> .storybook/main.js

```jsx
module.exports = {
  stories: ['../src/**/*.stories.(js|mdx|tsx)'],

```

### decorators

데코레이터를 통해 story를 특정 컴포넌트로 wrap 할 수 있다. 데코레이터는 global, component level, individual story level 모두 적용될 수 있다.

[Global decorator]

> .storybook/preview.js

```jsx
import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>);

```

위처럼 decorator을 통해 모든 story를 textAlign:center 시킬 수 있다.

[Component/local decorator]

```jsx
import React from 'react';
import MyComponent from './MyComponent';

export default {
  title: 'MyComponent',
  // 이 파일 내의 모든 story를 노란색 프레임으로 감싼다
  decorators: [storyFn => <div style={{ backgroundColor: 'yellow' }}>{storyFn()}</div>],
};

export const normal = () => <MyComponent />;
// 하나의 story를 빨간색 테두리로 감싼다
export const special = () => <MyComponent text="The Boss" />;
special.story = {
  decorators: [storyFn => <div style={{ border: '5px solid red' }}>{storyFn()}</div>],
};

```

이처럼 데코레이터를 통해 story를 formatting 할 수도 있지만, 주로 decorator은 story가 필요한 context를 제공하기 위해 사용된다. context로 theme이 전달되어야 하는 theming 라이브러리를 사용하는 경우, 모든 story에 theme을 재정의해주는 것이 아니라 데코레이터를 한번만 추가해주면 된다.

### parameters

데코레이터가 공통적으로 적용될 컴포넌트를 넘겼다면, 파라미터로 story들에게 공통적으로 전달될 metadata를 넘길 수 있다. 데코레이터와 마찬가지로 global, component level, individual story level 모두 적용될 수 있다.

[Global parameter]

> .storybook/preview.js

```jsx
import { load, addParameters } from '@storybook/react';
import defaultNotes from './instructions.md';

addParameters({ notes: defaultNotes });

```

[Component/local decorator]

```jsx
import React from 'react';
import MyComponent from './MyComponent';
import componentNotes from './notes.md';
import specialNotes from './special.md';

export default {
  title: 'MyComponent',
  parameters: { notes: componentNotes },
};

export const small = () => <MyComponent text="small" />;
export const medium = () => <MyComponent text="medium" />;
export const special = () => <MyComponent text="The Boss" />;
// 이렇게 개별 story에 override해서 적용할 수도 있다
special.story = {
  parameters: { notes: specialNotes },
};

```

### story hierarchy

`/` 구분자를 통해 stories를 중첩 구조로 관리할 수 있다.

```jsx
// Button.stories.js
import React from 'react';
import Button from './Button';

export default {
  title: 'Design System/Atoms/Button',
};
export const normal = () => <Button onClick={action('clicked')}>Hello Button</Button>;

```

```jsx
// Checkbox.stories.js
import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Design System/Atoms/Checkbox',
};
export const empty = () => <Checkbox label="empty" />;
export const checked = () => <Checkbox label="checked" checked />;

```

위와 같이 default의 title 속성에 경로를 작성하면, Design System이라는 heading 하위에, Atoms 그룹 하위에, Buttons와 Checkbox라는 2개의 컴포넌트 스토리가 존재하게 된다.

## References

[https://Storybook.js.org/docs/basics/writing-stories/](https://storybook.js.org/docs/basics/writing-stories/)

[리액트 스토리북(React Storybook)을 통한 컴포넌트 개발과 활용 방법 - 1](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81-react-Storybook-%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B3%BC-%ED%99%9C)

[Storybook 입문 가이드](https://hyunseob.github.io/2018/01/08/Storybook-beginners-guide/)