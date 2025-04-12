import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入node内置模块path
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  //配置代理跨域
  server:{ 
    proxy:{
      '/api': {
          target: 'http://syt.atguigu.cn',
          changeOrigin: true,
        },
      }
    }
})
