<script setup lang="ts">
import { setUseAjaxGlobalConfig, useAjax } from '@falconix/use-ajax'

setUseAjaxGlobalConfig({
  baseURL: `https://dev.yingmai.net:9001/api/`,
  withCredentials: false,
})

const form = reactive({
  username: undefined,
  password: undefined,
})

async function onSubmit() {
  const { result } = await useAjax.post({
    url: '/auth/login',
    data: form,
  })
  localStorage.setItem('token', result.token)
  ElMessage({ message: 'login successful.', type: 'success' })
}
</script>

<template>
  <div class="wrapper">
    <h3>login</h3>
    <el-form :model="form" label-width="auto">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

h3 {
  margin-top: 40px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;

  &:first-child {
    margin-top: initial;
  }
}
</style>
