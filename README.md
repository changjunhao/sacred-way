# 短视频会员 (MemberCenter)

React Native 短视频会员中心应用。

## 技术栈

- **React Native** 0.86.0
- **React** 19.2.3
- **TypeScript** 5.8
- **React Navigation** 7.x（Stack + Bottom Tabs）
- **Node.js** >= 22.11.0

## 功能模块

- 用户认证（登录 / 注册 / 密码重置 / 资料编辑）
- 底部标签导航（发现 / 会员 / 我的）
- 公告列表与详情
- 社区列表与详情
- 课程详情
- 专栏详情
- 用户中心（收益 / 个人信息修改 / 密码修改 / 邀请人 / 浏览记录）

## 快速开始

```bash
# 安装依赖
yarn install

# iOS（必须使用 .xcworkspace 打开）
cd ios && pod install && cd ..
yarn ios

# Android
yarn android
```

## 目录结构

```
sacred-way/
├── app/                    # 应用源码
│   ├── AppStack/           # 主界面（认证后）
│   │   ├── BulletinScreen/ # 公告
│   │   ├── CommunityScreen/# 社区
│   │   ├── CourseScreen/   # 课程
│   │   ├── SpecialColumnScreen/ # 专栏
│   │   ├── TabNavigator/   # 底部标签导航
│   │   └── UserScreen/     # 用户相关页面
│   ├── AuthStack/          # 认证界面（登录前）
│   ├── Components/         # 公共组件
│   ├── Lib/                # 工具库
│   ├── Services/           # API 服务层
│   ├── Theme/              # 主题配置
│   └── context/            # React Context
├── android/                # Android 原生工程
├── ios/                    # iOS 原生工程
└── __tests__/              # 测试
```

## 脚本

| 命令 | 说明 |
|------|------|
| `yarn start` | 启动 Metro 开发服务器 |
| `yarn ios` | 运行 iOS 应用 |
| `yarn android` | 运行 Android 应用 |
| `yarn test` | 运行 Jest 测试 |
| `yarn lint` | 运行 ESLint 检查 |

## 许可证

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

本作品采用知识共享署名-非商业性使用 4.0 国际许可协议进行许可。使用时必须署名，禁止用于商业目的。
