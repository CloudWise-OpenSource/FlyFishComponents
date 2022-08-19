## 飞鱼(FlyFish)组件及模板库
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

##### FlyFishComponents 是数据可视化编排平台 FlyFish 的组件模版中心，这里存放在目前 FlyFish 所有开源组件，欢迎广大开发者踊提交 PR，贡献新的组件。您所贡献的每一行代码都将鼓舞每一位 FlyFish 核心开发者，这是我们持续开源的动力。

##### 组件说明

```
Component1 // 组件名称目录
├── build
│   ├── webpack.config.dev.js
│   └── webpack.config.production.js
├── editor.html.js
├── env.js
├── options.json.js
├── package.json.js
├── describe.json
├── thumbnail
└── src
    ├── ComponentJs.js
    ├── ComponentJsForHt.js
    ├── data.js
    ├── mainJs.js
    ├── options.js
    └── setting.js
```

##### describe.json 结构说明

```
{
    compName: "value", // 组件名称
    compType: "value", // 组件类别
    contributor: "value", // 贡献者
    description: "value", // 组件描述
    iconUrl: "value",// 缩略图 存放到 组件文件夹下的images目录下
    publicTime: "value", // 组件发布时间
}
```

##### thumbnail 结构说明

- 此目录结构存放 图片及缩略预览图
- 将路径配置到 对应 describe.json 的 iconUrl 中

### 贡献指南

#### 部署 FlyFish

在开发组件前，您需要先部署 FlyFish，目前最新版本为 2.1，您可以切换到 FlyFish2.1 分支，下载相关代码并部署，FlyFish 代码仓库如下所示

- https://github.com/CloudWise-OpenSource/FlyFish
- https://gitee.com/Cloudwise/fly-fish

#### 部署流程：

- [FlyFish2.1 部署文档 GitHub](https://github.com/CloudWise-OpenSource/FlyFish/tree/main/doc)
- [FlyFish2.1 部署文档 Gitee](https://gitee.com/CloudWise/fly-fish/tree/main/doc)

### 组件开发规范

组件开发规范文档可以帮助您在进行组件开发过程中减少一些常见错误，在您正式开发组件前，请一定要阅读此文档。

- [组件开发规范文档](./docs/组件开发规范.md)

### 如何提 PR

您可以通过此文档，了解如何提 PR，以及提 PR 时一些注意事项，希望对您有所帮助

- [PR 文档](./docs/组件格式规范.md)

### 联系小助手

当您的 PR 已经被 merge 后，请扫描下方二维码联系小助手，我们为您准备了社区礼品，感谢您的贡献，同时，如果您有意向，我们将邀请您成为 FlyFish 核心开发者。FlyFish 的壮大离不开像您这样具有开源精神的开发者。

<img src="./docs/imgs/FlyFishWeChart.png" width="460px">

### 您可能关心的问题

#### Q：组件提交后在哪呈现？上面会有我的什么信息？

A：组件提交后，我们将通过 CI/CD 的方式，定期更新到 FlyFish 模版中心，模版中心的组件将展示如下信息

- 组件名称
- 组件贡献者
- 组件描述
- 贡献时间

#### Q: FlyFish 模板中心在哪里？

A: [FlyFish 模板中心](https://www.cloudwise.ai/flyFishComponents.html)

#### Q: 当前 FlyFishComponents 库里的组件，我要如何使用起来?

A: 按照如下步骤来使用组件

> clone fork 后的私有组件仓库

```bash

git clone ${私有组件仓库地址}

```

> 制作上传组件压缩包

```bash
### 切换组件仓库到main分支
git checkout main

### 压缩组件
zip -q -r ${组件文件夹名称}.zip ${组件文件夹名称}
例如： zip -q -r 导航.zip 导航

或者

您可直接在桌面上，在一个组件文件夹上，右键压缩为zip
```

> 上传组件包到开发平台

```bash
应用创建 -> 组件开发 -> 创建一个组件 -> 操作选项 -> 导入源码 -> 开发组件 -> 安装依赖 -> 更新上线
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/laocong"><img src="https://avatars.githubusercontent.com/u/43259965?v=4?s=100" width="100px;" alt=""/><br /><sub><b>郝少聪</b></sub></a><br /><a href="https://github.com/CloudWise-OpenSource/FlyFishComponents/commits?author=laocong" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!