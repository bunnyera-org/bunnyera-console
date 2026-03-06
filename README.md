<div align="center"> 
  
 # 🐰✨ **BunnyEra Console**   
 ### **跨境企业的 AI 云控制中心** 
  
 ![Stars](https://img.shields.io/github/stars/bunnyera-org/bunnyera-console?style=flat-square&color=4CC9F0)  
 ![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)  
 ![Version](https://img.shields.io/badge/Version-1.0.0-purple?style=flat-square)  
 ![Verified](https://img.shields.io/badge/BUNNYERA%20LLC-Brand%20Verified-black?style=flat-square)  
  
 --- 
  
 ## 🐰 BunBun × 🐻 Mr.Bear   
 ### **BunnyEra 官方 IP 形象认证** 
  
 <img src="https://placeholder.bunnyera.com/bunbun.png" width="120" /> 
 <img src="https://placeholder.bunnyera.com/mrbear.png" width="120" /> 
  
 **BunBun（兔兔）**：BunnyEra 的灵魂象征，代表速度、敏捷、创造力。   
 **Mr.Bear（熊熊）**：稳定、安全、可靠的象征，代表企业级稳态与力量。 
  
 > **BunnyEra Console = BunBun 的敏捷 × Mr.Bear 的稳定**   
 > 共同构成跨境企业的 AI 云中枢。 
  
 --- 
  
 </div> 
  
 # 🚀 **简介** 
  
 **BunnyEra Console** 是 BunnyEra LLC 官方推出的 **跨境企业 AI 云控制中心**。   
 它将企业的： 
  
 - 阿里云资源监控   
 - 智能体（Agents）管理   
 - 任务调度   
 - 实时日志   
 - 系统设置   
 - 多模块可视化   
  
 全部整合在一个 **深蓝霓虹主题的现代化控制台** 中。 
  
 前端基于 **Next.js App Router**，后端基于 **FastAPI + Railway**，   
 是一个真正可用于生产环境的企业级控制台系统。 
  
 --- 
  
 # 🏗️ **项目结构** 
  
 ``` 
 bunnyera-console/ 
 │ 
 ├── app/                     # 页面路由（Next.js App Router） 
 │   ├── dashboard/           # Dashboard - 系统总览 
 │   ├── monitor/             # Monitor - 阿里云资源监控 
 │   ├── agents/              # Agents - 智能体管理 
 │   ├── tasks/               # Tasks - 任务管理 
 │   ├── logs/                # Logs - 实时日志中心 
 │   ├── settings/            # Settings - 系统设置 
 │   └── layout.tsx           # 全局布局（Sidebar + Topbar） 
 │ 
 ├── components/              # UI 组件体系 
 │   ├── layout/              # 布局组件 
 │   ├── ui/                  # 通用 UI 组件 
 │   ├── monitor/             # 监控组件 
 │   ├── agents/              # 智能体组件 
 │   └── tasks/               # 任务组件 
 │ 
 ├── lib/                     # 核心逻辑层 
 │   ├── api/                 # API 客户端 
 │   ├── websocket/           # WebSocket 客户端 
 │   └── utils/               # 工具函数 
 │ 
 ├── public/                  # 静态资源 
 │ 
 └── README.md                # 当前文档 
 ``` 
  
 --- 
  
 # 🎨 **BunnyEra 深蓝霓虹主题** 
  
 BunnyEra Console 使用官方品牌色： 
  
 | 名称 | 颜色 | 
 |------|-------| 
 | 背景色 | `#0A0F1F` | 
 | 卡片色 | `#111827` | 
 | 霓虹蓝 | `#4CC9F0` | 
 | 文本色 | `#E2E8F0` | 
  
 主题风格：   
 - 深色科技感   
 - 霓虹蓝高亮   
 - 卡片式布局   
 - 企业级 UI 规范   
  
 --- 
  
 # 🧩 **UI 组件体系** 
  
 | 组件 | 文件 | 描述 | 
 |------|------|------| 
 | Card | `components/ui/card.tsx` | 基础卡片容器 | 
 | StatusDot | `components/ui/status-dot.tsx` | 状态指示点 | 
 | Button | `components/ui/button.tsx` | 按钮组件 | 
 | Chart | `components/ui/chart.tsx` | ECharts 图表容器 | 
 | Input | `components/ui/input.tsx` | 输入框 | 
 | Select | `components/ui/select.tsx` | 下拉选择框 | 
  
 全部采用 BunnyEra 深色主题。 
  
 --- 
  
 # 🔧 **后端 API（FastAPI + Railway）** 
  
 BunnyEra Console 默认连接： 
  
 ``` 
 https://bunnyera-cloud-backend-production.up.railway.app  
 ``` 
  
 API 包含： 
  
 - `/aliyun/monitor/all` 
 - `/agents` 
 - `/tasks` 
 - `/logs` 
 - `/settings` 
  
 --- 
  
 # 🚀 **部署指南** 
  
 ## 前端（Vercel） 
 ```bash 
 vercel deploy 
 ``` 
  
 ## 后端（Railway） 
 ```bash 
 railway up 
 ``` 
  
 --- 
  
 # 🧪 **开发模式** 
  
 ```bash 
 npm install 
 npm run dev 
 ``` 
  
 --- 
  
 # 🛡️ **品牌认证** 
  
 本项目由 **BUNNYERA LLC** 官方发布，   
 并由 BunnyEra 官方 IP（BunBun × Mr.Bear）授权使用。 
  
 --- 
  
 # ⭐ **支持 BunnyEra** 
  
 如果你喜欢 BunnyEra Console，请为我们点亮星标： 
  
 👉 [https://github.com/bunnyera-org/bunnyera-console](https://github.com/bunnyera-org/bunnyera-console)
