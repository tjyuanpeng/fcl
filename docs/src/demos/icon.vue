<script setup lang="ts">
import { Icon } from '@falconix/icon'
import '@falconix/icon/dist/assets/iconfont/iconfont.css'
</script>

<template>
  <div class="icon-example">
    <Icon
      name="icon-jichu-biaotoushaixuan"
      size="20"
      color="#333"
      title="用户"
      custom-class="icon-margin"
    />
    <Icon
      name="icon-jichu-biaotoushezhi"
      size="24"
      color="#409EFF"
      custom-class="icon-margin"
    />
    <Icon
      name="icon-a-Property1fuxuankuang-moren"
      size="28"
      color="green"
    />
  </div>
</template>

<style scoped>
.icon-margin {
  margin-right: 10px;
}
</style>
