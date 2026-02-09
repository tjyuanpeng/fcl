<script setup lang="ts">
const storageKey = 'fcl:auto-save:docs-demo'

const form = ref({
  title: '',
  desc: '',
})

const corruptDraft = () => {
  localStorage.setItem(storageKey, '{not-json')
}

const restoredAt = ref<string>('')
const onRestored = () => {
  restoredAt.value = new Date().toLocaleString()
}
</script>

<template>
  <el-alert title="本 demo 使用 localStorage 作为草稿保存介质；刷新页面可验证恢复。" type="info" show-icon :closable="false" />

  <el-space direction="vertical" alignment="start" style="width: 100%">
    <el-form label-width="auto" style="max-width: 560px">
      <el-form-item label="storageKey">
        <el-input :model-value="storageKey" readonly />
      </el-form-item>
      <el-form-item label="title">
        <el-input v-model="form.title" placeholder="输入后等待 0.5s 自动保存" />
      </el-form-item>
      <el-form-item label="desc">
        <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="刷新页面可自动恢复草稿" />
      </el-form-item>
    </el-form>

    <FAutoSave v-model="form" :storage-key="storageKey" @restored="onRestored">
      <template #default="{ status, lastSavedAt, restore, clear }">
        <el-space wrap>
          <el-tag :type="status === 'error' ? 'danger' : (lastSavedAt ? 'success' : 'info')">
            {{ status === 'error' ? 'error' : (lastSavedAt ? 'saved' : 'idle') }}
          </el-tag>
          <span style="font-size: 12px; color: var(--vp-c-text-2);">
            lastSavedAt: {{ lastSavedAt ? new Date(lastSavedAt).toLocaleString() : '-' }}
          </span>
          <span v-if="restoredAt" style="font-size: 12px; color: var(--vp-c-text-2);">
            restoredAt: {{ restoredAt }}
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
  </el-space>
</template>
