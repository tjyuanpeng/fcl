<script setup lang="ts">
const storageKey = 'fcl:auto-save:play-demo'

const form = ref({
  title: '',
  desc: '',
})

const corruptDraft = () => {
  localStorage.setItem(storageKey, '{not-json')
}
</script>

<template>
  <div style="padding: 16px;">
    <h2>FAutoSave</h2>

    <el-alert
      title="本页用于调试 @falconix/auto-save。输入后等待 0.5s 自动保存，刷新页面验证恢复。"
      type="info"
      show-icon
      :closable="false"
    />

    <el-form label-width="auto" style="max-width: 560px; margin-top: 12px;">
      <el-form-item label="storageKey">
        <el-input :model-value="storageKey" readonly />
      </el-form-item>
      <el-form-item label="title">
        <el-input v-model="form.title" placeholder="输入后等待 0.5s 自动保存" />
      </el-form-item>
      <el-form-item label="desc">
        <el-input v-model="form.desc" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>

    <FAutoSave v-model="form" :storage-key="storageKey">
      <template #default="{ status, lastSavedAt, restore, clear }">
        <el-space wrap>
          <el-tag :type="status === 'error' ? 'danger' : (lastSavedAt ? 'success' : 'info')">
            {{ status === 'error' ? 'error' : (lastSavedAt ? 'saved' : 'idle') }}
          </el-tag>
          <span style="font-size: 12px; color: #606266;">
            lastSavedAt: {{ lastSavedAt ? new Date(lastSavedAt).toLocaleString() : '-' }}
          </span>
          <el-button size="small" @click="restore">
            恢复草稿
          </el-button>
          <el-button size="small" type="warning" @click="clear">
            清除草稿
          </el-button>
          <el-button size="small" type="danger" @click="corruptDraft">
            写入坏草稿
          </el-button>
        </el-space>
      </template>
    </FAutoSave>
  </div>
</template>
