<script setup lang="ts">
import * as Icons from '@falconix/icons-vue'

const { __customs, __overrides } = Icons
</script>

<template>
  <h3 style="margin-top: 0">
    Custom Icons
  </h3>
  <div class="list">
    <span v-for="key in Object.keys(__customs)" :key="key" class="item">
      {{ key }}: <el-icon><component :is="(Icons as any)[key]" /></el-icon>
    </span>
  </div>
  <h3>
    Override Icons
  </h3>
  <div class="list">
    <span v-for="key in Object.keys(__overrides)" :key="key" class="item">
      {{ key }}: <el-icon><component :is="(Icons as any)[key]" /></el-icon>
    </span>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  margin: 30px 0 10px;
  font-weight: 500;
}

.list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  font-size: 16px;
}

.item {
  white-space: nowrap;
  text-align: right;
}
</style>
