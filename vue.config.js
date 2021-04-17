module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/dist/'  // 打包后发布的文件名
        : '/'  // 开发环境相对路径
}