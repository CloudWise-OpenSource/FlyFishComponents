#### 飞鱼(FlyFish)组件及模板库


# 飞鱼文档

[组件开发规范](./组件开发规范.md)

[组件上传代码库](./组件上传代码库.md)


# 组件说明

##### 组件目录结构说明

```
Component1 // 组件名称目录
├── build
│   ├── webpack.config.dev.js
│   └── webpack.config.production.js
├── editor.html.js
├── env.js
├── options.json.js
├── package.json.js
├── option.json 
├── images
└── src
    ├── ComponentJs.js
    ├── ComponentJsForHt.js
    ├── data.js
    ├── mainJs.js
    ├── options.js
    └── setting.js
```

##### 组件目录下的 option.json 结构说明

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

##### 组件目录下的 images 说明
###### 此目录结构存放 图片及缩略预览图
###### 将路径配置到 对应 option.json 的iconUrl中
