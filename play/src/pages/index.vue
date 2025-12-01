<script setup lang="ts">
import routes from '~pages'

const router = useRouter()
const list = routes.filter(i => i.path !== '/')
</script>

<template>
  <div class="wrapper">
    <h3>fcl playground</h3>
    <div class="box">
      <el-button v-for="item in list" :key="item.path" @click="router.push(item.path)">
        {{ item.name }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 800px;
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
.box {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .el-button + .el-button {
    margin: 0;
  }
}
</style>
