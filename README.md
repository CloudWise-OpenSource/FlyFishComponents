## 飞鱼(FlyFish)组件及模板库

##### FlyFishComponents是数据可视化编排平台FlyFish的组件模版中心，这里存放在目前FlyFish所有开源组件，欢迎广大开发者踊提交PR，贡献新的组件。您所贡献的每一行代码都将鼓舞每一位FlyFish核心开发者，这是我们持续开源的动力。

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
- 将路径配置到 对应 describe.json 的iconUrl中


### 贡献指南
#### 部署FlyFish
在开发组件前，您需要先部署FlyFish，目前最新版本为2.0，您可以切换到FlyFish2.0分支，下载相关代码并部署，FlyFish代码仓库如下所示
 - https://github.com/CloudWise-OpenSource/FlyFish
 - https://gitee.com/Cloudwise/fly-fish

#### 部署流程：
 - [FlyFish2.0部署文档 GitHub](https://github.com/CloudWise-OpenSource/FlyFish/tree/2.0/doc) 
 - [FlyFish2.0部署文档 Gitee](https://gitee.com/CLoudwise/fly-fish/tree/2.0/doc) 

### 组件开发规范
组件开发规范文档可以帮助您在进行组件开发过程中减少一些常见错误，在您正式开发组件前，请一定要阅读此文档。
 - [组件开发规范文档](./docs/组件开发规范.md)

### 如何提PR
您可以通过此文档，了解如何提PR，以及提PR时一些注意事项，希望对您有所帮助
 - [PR文档](./docs/组件上传代码库.md)

### 联系小助手
当您的PR已经被merge后，请扫描下方二维码联系小助手，我们为您准备了社区礼品，感谢您的贡献，同时，如果您有意向，我们将邀请您成为FlyFish核心开发者。FlyFish的壮大离不开像您这样具有开源精神的开发者。

<img src="./docs/imgs/FlyFishWeChart.png" width="460px">

### 您可能关心的问题
#### Q：组件提交后在哪呈现？上面会有我的什么信息？
A：组件提交后，我们将通过CI/CD的方式，定期更新到FlyFish模版中心，模版中心的组件将展示如下信息
-  组件名称
-  组件贡献者
-  组件描述
-  贡献时间

#### Q: FlyFish模板中心在哪里？
A: [FlyFish模板中心](https://www.cloudwise.ai/flyFishComponents.html)



#### Q: 当前FlyFishComponents库里的组件，我要如何使用起来?

A: 按照如下步骤来使用组件

- 确保新开发组件main.js中通过registerComponent注册的组件名和当前组件名一致，然后整个组件压缩为zip

- 到组件开发平台 -> 可视化组件 -> 新增组件（组件名为通过registerComponent注册的组件名）

- 点击上传源码按钮，选中组件包上传

- 点击导出组件，下载组件编译包

- 上传编译包至数据应用平台，数据应用平台-> 可视化组件 -> 添加组件 -> 上传编译包

- 大屏即可正常使用该组件



