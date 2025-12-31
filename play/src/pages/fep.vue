<script setup lang="ts">
import { zhCn } from '@falconix/fep/es/locale/index'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="wrapper">
      <h3>button</h3>
      <div class="box">
        <el-button>按钮</el-button>
      </div>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 800px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: var(--el-text-color-primary);

  h3 {
    margin-top: 40px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 1.17em;
    color: #333;

    &:first-child {
      margin-top: initial;
    }
  }
}

.box {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;

  &.align-middle {
    align-items: center;
  }

  > .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
