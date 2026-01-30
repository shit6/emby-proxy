# emby-proxy
基于 EdgeOne Pages 开发 Emby 反向代理
# Emby 反代工具（基于EdgeOne Pages）
基于腾讯云EdgeOne Pages边缘函数开发的Emby反向代理，支持自定义添加反代地址，无需硬编码。

## 核心特性
1. 适配EdgeOne Pages运行环境，国内边缘节点加速；
2. 自定义反代地址：域名/目标Emby地址 即可使用；
3. 支持HTTP/HTTPS、自定义端口，适配Emby全功能；
4. 自动处理跨域、URL解析，无需额外配置。

## 使用方法
部署到EdgeOne Pages后，访问：
`https://自定义域名/你的Emby完整地址`
