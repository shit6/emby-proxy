// EdgeOne Pages 边缘函数 - Emby反代核心逻辑（自动适配域名版）
export default async function handler(event) {
  const request = event.request;
  const url = new URL(request.url);

  // ########## 核心配置项（无需填写域名，自动获取）##########
  const CONFIG = {
    siteName: 'Emby 反代工具',
    siteDescription: '基于EdgeOne Pages开发 - 安全、快速的反向代理服务',
    primaryColor: '#0070f3',
    secondaryColor: '#1e88e5',
    accentColor: '#d63384'
  };
  // 自动获取当前访问的域名（核心改造点）
  const currentDomain = `${url.protocol}//${url.host}`;
  // ###################################################################

  // ########## HTML界面模板（自动适配当前域名，无硬编码）##########
  const HTML_GUIDE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${CONFIG.siteName} - 使用指南</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
      :root {
          --primary: ${CONFIG.primaryColor};
          --primary-light: #e3f2fd;
          --secondary: ${CONFIG.secondaryColor};
          --accent: ${CONFIG.accentColor};
          --text: #2d3748;
          --text-light: #718096;
          --bg: #f7fafc;
          --card-bg: #ffffff;
          --border: #e2e8f0;
          --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --radius: 12px;
          --warning: #fed7d7;
          --warning-text: #9b2c2c;
          --success: #c6f6d5;
          --success-text: #276749;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Inter', 'Noto Sans SC', sans-serif; line-height: 1.6; color: var(--text); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      .header { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 1.5rem 0; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
      .header-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
      .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--text); }
      .logo-icon { font-size: 2rem; color: var(--primary); }
      .logo-text { font-size: 1.5rem; font-weight: 700; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .nav-links { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
      .nav-link { color: var(--text); text-decoration: none; font-weight: 500; transition: all 0.3s; padding: 8px 16px; border-radius: 8px; }
      .nav-link:hover { color: var(--primary); background: var(--primary-light); }
      .hero { text-align: center; padding: 4rem 0 3rem; color: white; }
      .hero h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: 800; }
      .hero p { font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto 2rem; }
      .cta-button { display: inline-block; padding: 1rem 2rem; background: white; color: var(--primary); text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 1.1rem; transition: transform 0.3s, box-shadow 0.3s; box-shadow: var(--shadow); }
      .cta-button:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
      .main-content { background: var(--bg); border-radius: var(--radius) var(--radius) 0 0; padding: 3rem 0; margin-top: -2rem; position: relative; }
      .card { background: var(--card-bg); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); margin-bottom: 2rem; border: 1px solid var(--border); transition: transform 0.3s; }
      .card:hover { transform: translateY(-5px); }
      .card-title { color: var(--primary); font-size: 1.75rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid var(--primary-light); display: flex; align-items: center; gap: 10px; }
      .card-title i { font-size: 1.5rem; }
      .example-box { background: linear-gradient(135deg, var(--primary-light), #f8fafc); border-left: 4px solid var(--primary); padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0; position: relative; }
      .example-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--primary), var(--secondary)); }
      .code { background: rgba(0,0,0,0.05); padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 0.95rem; margin: 1rem 0; overflow-x: auto; border: 1px solid rgba(0,0,0,0.1); }
      .domain-highlight { color: var(--primary); font-weight: 700; }
      .warning-box { background: var(--warning); border: 2px solid #fc8181; padding: 1.5rem; border-radius: 8px; margin-top: 2rem; animation: pulse 2s infinite; }
      @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(245,101,101,0.4); } 70% { box-shadow: 0 0 0 10px rgba(245,101,101,0); } 100% { box-shadow: 0 0 0 0 rgba(245,101,101,0); } }
      .warning-title { color: var(--warning-text); font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 10px; }
      .warning-text { color: var(--warning-text); line-height: 1.8; }
      .strong-red { color: #e53e3e; font-weight: 900; text-decoration: underline; }
      .success-box { background: var(--success); border: 2px solid #68d391; padding: 1.5rem; border-radius: 8px; margin-top: 1rem; }
      .success-title { color: var(--success-text); font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 10px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0; }
      .feature-card { background: var(--card-bg); padding: 2rem; border-radius: var(--radius); text-align: center; box-shadow: var(--shadow); transition: all 0.3s; }
      .feature-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
      .feature-icon { font-size: 3rem; color: var(--primary); margin-bottom: 1rem; }
      .quick-test { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: var(--radius); text-align: center; margin: 3rem 0; }
      .quick-test input { width: 100%; max-width: 500px; padding: 1rem; border-radius: 8px; border: none; margin: 1rem 0; font-size: 1rem; }
      .quick-test button { background: white; color: var(--primary); border: none; padding: 1rem 2rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.3s; }
      .quick-test button:hover { transform: scale(1.05); }
      .footer { background: #2d3748; color: white; padding: 3rem 0; text-align: center; margin-top: 4rem; }
      .footer-links { display: flex; justify-content: center; gap: 2rem; margin: 2rem 0; flex-wrap: wrap; }
      .footer-link { color: #a0aec0; text-decoration: none; transition: color 0.3s; }
      .footer-link:hover { color: white; }
      .copy { color: #718096; margin-top: 2rem; font-size: 0.9rem; }
      @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .card { padding: 1.5rem; } }
  </style>
</head>
<body>
  <header class="header">
      <div class="container">
          <div class="header-content">
              <a href="/" class="logo">
                  <i class="fas fa-shield-alt logo-icon"></i>
                  <span class="logo-text">${CONFIG.siteName}</span>
              </a>
              <nav class="nav-links">
                  <a href="#guide" class="nav-link"><i class="fas fa-book"></i> 使用指南</a>
                  <a href="#features" class="nav-link"><i class="fas fa-star"></i> 功能特性</a>
                  <a href="#test" class="nav-link"><i class="fas fa-vial"></i> 快速测试</a>
              </nav>
          </div>
      </div>
  </header>

  <section class="hero">
      <div class="container">
          <h1>🚀 Emby 反代工具</h1>
          <p>基于腾讯云EdgeOne Pages开发，安全、快速、稳定，支持自定义添加反代地址</p>
          <a href="#guide" class="cta-button"><i class="fas fa-rocket"></i> 开始使用</a>
      </div>
  </section>

  <main class="main-content">
      <div class="container">
          <div id="guide" class="card">
              <h2 class="card-title"><i class="fas fa-map-signs"></i> 使用指南</h2>
              <h3 style="margin: 1.5rem 0 1rem; color: var(--secondary);"><i class="fas fa-link"></i> 通用反代格式（核心）</h3>
              <div class="example-box">
                  <div class="code"><span class="domain-highlight">${currentDomain}</span>/你的Emby地址:端口</div>
                  <div class="code" style="margin-top: 1rem;"><span class="domain-highlight">${currentDomain}</span>/https://你的Emby地址:端口</div>
              </div>
              <h3 style="margin: 1.5rem 0 1rem; color: var(--secondary);"><i class="fas fa-lock"></i> 反代示例</h3>
              <div class="example-box">
                  <div class="code"><span class="domain-highlight">${currentDomain}</span>/https://你的Emby服务器地址:端口</div>
                  <p style="margin-top: 1rem; color: var(--text-light);"><i class="fas fa-check-circle"></i> 直接访问上方格式地址，即可反代你的目标Emby服务器</p>
              </div>
              <div class="warning-box">
                  <div class="warning-title"><i class="fas fa-exclamation-triangle"></i> 重要注意</div>
                  <p class="warning-text"><span class="strong-red">反代前务必确认目标Emby地址可正常访问！</span><br>需包含完整协议（http/https）和端口（如8443/8096），否则反代失败</p>
              </div>
          </div>

          <div id="features" class="card">
              <h2 class="card-title"><i class="fas fa-sliders-h"></i> 功能特性</h2>
              <div class="grid">
                  <div class="feature-card"><i class="fas fa-bolt feature-icon"></i><h3>EdgeOne加速</h3><p>腾讯云全球边缘节点，就近转发，降低延迟，提升访问速度</p></div>
                  <div class="feature-card"><i class="fas fa-hand-free feature-icon"></i><h3>自定义地址</h3><p>无需修改代码，直接拼接地址即可反代，灵活适配任意Emby服务器</p></div>
                  <div class="feature-card"><i class="fas fa-shield-alt feature-icon"></i><h3>安全防护</h3><p>自带DDoS防护、SSL加密，EdgeOne边缘节点过滤恶意请求</p></div>
              </div>
          </div>

          <div id="test" class="quick-test">
              <h2 style="font-size: 2rem; margin-bottom: 1rem;"><i class="fas fa-vial"></i> 快速测试</h2>
              <p style="opacity: 0.9; margin-bottom: 1.5rem;">输入你的Emby地址，测试反代是否可用</p>
              <input type="text" id="testInput" placeholder="例如: https://你的Emby服务器地址:端口" value="https://你的Emby服务器地址:端口">
              <button onclick="testConnection()"><i class="fas fa-play"></i> 测试反代</button>
              <div id="testResult" style="margin-top: 1.5rem;"></div>
          </div>
      </div>
  </main>

  <footer class="footer">
      <div class="container">
          <div class="logo">
              <i class="fas fa-shield-alt logo-icon"></i>
              <span class="logo-text" style="background: linear-gradient(135deg, #fff, #a0aec0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${CONFIG.siteName}</span>
          </div>
          <div class="footer-links">
              <a href="/" class="footer-link"><i class="fas fa-home"></i> 首页</a>
              <a href="#guide" class="footer-link"><i class="fas fa-book"></i> 使用指南</a>
          </div>
          <p class="copy">© ${new Date().getFullYear()} ${CONFIG.siteName} | 基于腾讯云EdgeOne Pages开发</p>
      </div>
  </footer>

  <script>
      // 自动获取当前访问域名（前端同步适配）
      const currentDomain = window.location.origin;
      // 快速测试反代功能（直接生成反代地址，模拟测试）
      function testConnection() {
          const input = document.getElementById('testInput');
          const resultDiv = document.getElementById('testResult');
          const url = input.value.trim();
          if (!url) {
              resultDiv.innerHTML = '<div style="color: #fc8181; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">请输入你的Emby服务器地址</div>';
              return;
          }
          resultDiv.innerHTML = '<div style="color: #f6e05e; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">正在生成反代地址... <i class="fas fa-spinner fa-spin"></i></div>';
          setTimeout(() => {
              const proxyUrl = `${currentDomain}/${encodeURIComponent(url)}`;
              resultDiv.innerHTML = `
                  <div style="color: #68d391; background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
                      <i class="fas fa-check-circle"></i> 反代地址生成成功！<br>
                      可直接访问：<a href="${proxyUrl}" target="_blank" style="color: #68d391; text-decoration: underline;">${proxyUrl}</a>
                  </div>
              `;
          }, 1000);
      }
      // 回车触发测试
      document.getElementById('testInput').addEventListener('keypress', e => {
          if (e.key === 'Enter') testConnection();
      });
      // 平滑滚动
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', e => {
              e.preventDefault();
              document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
          });
      });
  </script>
</body>
</html>
  `;
  // ########## HTML模板结束 ##########

  // ########## 反代请求处理核心逻辑 ##########
  async function handleProxyRequest(url, request) {
    try {
      // 提取路径中拼接的目标Emby地址（去掉开头的/）
      const path = url.pathname.slice(1);
      if (!path) return new Response('无效的Emby地址，请按照格式拼接：域名/你的Emby地址', { status: 400, headers: { 'Content-Type': 'text/plain;charset=utf-8' } });

      // 解析目标地址：支持带协议/不带协议，自动补全http
      let targetUrl = path.includes('://') ? decodeURIComponent(path) : 'http://' + decodeURIComponent(path);
      // 修复URL多余斜杠问题
      targetUrl = targetUrl.replace(/([^:])\/\//g, '$1/');
      const targetUrlObj = new URL(targetUrl);

      // 构建完整反代URL（保留查询参数）
      const fullTargetUrl = targetUrlObj.href + url.search;

      // 配置反代请求头（透传必要信息，适配Emby）
      const proxyHeaders = new Headers(request.headers);
      proxyHeaders.set('Host', targetUrlObj.host); // 核心：透传目标主机头
      proxyHeaders.set('X-Forwarded-For', request.headers.get('X-Real-IP') || 'unknown'); // EdgeOne真实客户端IP
      proxyHeaders.set('X-Forwarded-Proto', url.protocol.slice(0, -1)); // 透传协议（http/https）
      proxyHeaders.delete('Referer'); // 避免跨域问题
      proxyHeaders.delete('Origin'); // 避免跨域问题

      // 发送反代请求：支持所有HTTP方法（GET/POST/PUT等，适配Emby全功能）
      const proxyRequest = new Request(fullTargetUrl, {
        method: request.method,
        headers: proxyHeaders,
        body: request.method !== 'GET' ? request.body : null,
        redirect: 'follow'
      });

      // 获取目标服务器响应并透传
      const response = await fetch(proxyRequest);
      const responseHeaders = new Headers(response.headers);
      // 开启跨域，允许所有域名访问
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      responseHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      responseHeaders.set('Access-Control-Allow-Headers', '*');
      // 禁止缓存，确保实时反代
      responseHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      responseHeaders.set('Pragma', 'no-cache');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      });
    } catch (error) {
      return new Response(`反代失败：${error.message}<br>请检查目标Emby地址是否正确、端口是否开放`, {
        status: 500,
        headers: { 'Content-Type': 'text/html;charset=utf-8' }
      });
    }
  }
  // ########## 反代逻辑结束 ##########

  // ########## 主请求分发 ##########
  // 1. 根路径/指南/测试路径：返回界面
  if (url.pathname === '/' || url.pathname === '/guide' || url.pathname === '/test') {
    return new Response(HTML_GUIDE, {
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
        'Cache-Control': 'public, max-age=3600' // 界面缓存1小时
      }
    });
  }

  // 2. 非根路径：判定为反代请求，处理转发
  if (url.pathname.length > 1) {
    const firstSegment = url.pathname.split('/')[1];
    // 判定规则：包含http/https、冒号（端口）、点（域名），即为合法反代请求
    if (firstSegment.startsWith('http://') || firstSegment.startsWith('https://') || firstSegment.includes(':') || firstSegment.includes('.')) {
      return handleProxyRequest(url, request);
    }
  }

  // 3. 其他未知路径：返回使用指南
  return new Response(HTML_GUIDE, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
}

// 开启CORS预检请求支持（EdgeOne必需）
export const config = {
  matcher: '/.*', // 拦截所有路径请求
  cors: {
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: ['*'],
    maxAge: 86400
  }
};
