### 开发者规范

Serverless-cd/ui 是一款基于 Serverless Devs 开发者工具打造的组件库。为了能够形成一个快速、简洁、统一的静态文档站点，我们希望开源贡献者能够在 packages 目录下开发、调试、发布自己的组件，与此同时在书写给使用者的 markdown 文档时，能够采用以下格式以便我们生成页面统一的站点。

````
---
title: Button 按钮 # 配置左侧菜单，同时生成<title> 标签
toc: content      # 组件锚点目录内容显示在右侧
---

<!-- 页面标题，必写：是 -->

# Button 按钮

<!-- 组件使用场景，必写：否 -->

使用场景：按钮用于开始一个即时操作。

<!-- 基本使用，必写：是 -->

## 基本使用

<!-- 组件基本使用描述，必写：否 -->

可以用 size 属性设置按钮大小，type 属性设置按钮类型， warning 属性显示高危，错误等提示的按钮，text 属性是文字按钮，loading 属性是加载中状态按钮，组件已绑定 onClick 事件回调函数，供处理不同业务时使用。

```tsx
// write code here
```

<!-- 其他部分，必写：否 -->

## 其他部分

```tsx
// write code here
```

<!-- API，必写：是 -->

## API

| 参数         | 说明                           | 类型                                  | 必填 | 默认值 |
| ------------ | ------------------------------ | ------------------------------------- | ---- | ------ |
| value        | 当前值                         | Record<string, any>                   | 是   |        |
| onChange     | value 发生改变的时候触发的回调 | (value: Record<string, any>) => void  | 否   |        |
| accessList   | 密钥数据源                     | string[]                              | 否   |        |
| EditorRender | 自定义编辑器                   | ({ value, onChange }) => ReactElement | 否   |        |

````

🔥🔥🔥 如果您的组件已经发布，请在 dumidoc.js 中为我们的站点配置并导出您的组件
