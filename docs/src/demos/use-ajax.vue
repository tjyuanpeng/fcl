<script setup lang="ts">
import { setUseAjaxGlobalConfig, useAjax } from '@falconix/use-ajax'

setUseAjaxGlobalConfig({
  baseURL: `https://dev.yingmai.net:9001/api/`,
  withCredentials: false,
})

const config = reactive<any>({
  url: '/auth/login',
  method: 'POST',
  params: undefined,
  data: '{"username":"foo","password":"bar"}',
  checkBizError: 'undefined',
  noErrorThrown: false,
  showMessageTip: 'undefined',
  checkAuthError: 'undefined',
  gotoLogin: 'undefined',
})
const resultData = ref<any>(undefined)
const onSubmit = async () => {
  resultData.value = undefined
  const { url, method, params, data, noErrorThrown, ...others } = config
  const c2 = Object.entries(others).reduce((acc, [key, value]) => value === false ? (acc[key] = value, acc) : acc, {} as Partial<typeof others>)
  const result = await useAjax.post({
    url,
    method,
    params: JSON.parse(params ?? '{}'),
    data: JSON.parse(data ?? '{}'),
    noErrorThrown,
    ...c2,
  })
  console.log(result)
  resultData.value = result
}
</script>

<template>
  <el-form label-width="auto">
    <el-form-item label="url">
      <el-input v-model="config.url" />
    </el-form-item>
    <el-form-item label="method">
      <el-segmented v-model="config.method" :options="['GET', 'POST', 'PUT', 'DELETE']" />
    </el-form-item>
    <el-form-item label="params">
      <el-input v-model="config.params" type="textarea" autosize />
    </el-form-item>
    <el-form-item label="data">
      <el-input v-model="config.data" type="textarea" autosize />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="checkBizError">
          <el-segmented v-model="config.checkBizError" :options="['undefined', false]" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="noErrorThrown">
          <el-segmented v-model="config.noErrorThrown" :options="[true, false]" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="showMessageTip">
          <el-segmented v-model="config.showMessageTip" :options="['undefined', false]" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="checkAuthError">
          <el-segmented v-model="config.checkAuthError" :options="['undefined', false]" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="gotoLogin">
          <el-segmented v-model="config.gotoLogin" :options="['undefined', false]" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label=" ">
      <el-button type="primary" @click="onSubmit">
        Send
      </el-button>
      <el-button @click="resultData = undefined">
        Clear
      </el-button>
    </el-form-item>
  </el-form>
  <pre>{{ JSON.stringify(resultData, null, '  ') }}</pre>
</template>
