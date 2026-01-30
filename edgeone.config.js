// edgeone.config.js - EdgeOne Pages 核心配置文件
module.exports = {
  // 声明边缘函数的目录（必须指向根目录下的functions）
  functions: {
    dir: './functions',
    // 启用middleware模式（EdgeOne Pages的边缘函数核心入口）
    middleware: true
  },
  // 静态资源配置（保留，不影响函数）
  static: {
    dir: './',
    exclude: [] // 取消对functions文件夹的排除
  }
};
