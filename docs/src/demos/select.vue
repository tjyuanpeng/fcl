<script setup lang="ts">
const countTags = ref(true)
const lazyWriteBack = ref(true)
const value = ref()
const options = [
  { value: 1, label: '智能科技', subText: '123131' },
  { value: 2, label: '电缆材料有限公司', subText: '123131' },
  { value: 3, label: 'Option3', subText: '123131' },
  { value: 4, label: 'Option4', subText: '123131', disabled: true },
  { value: 5, label: 'Option5', subText: '123131' },
  { value: 6, label: 'Option6', subText: '123131' },
  { value: 7, label: 'Option7', subText: '123131' },
  { value: 8, label: 'Option8', subText: '123131' },
  { value: 9, label: 'Option9', subText: '123131' },
  { value: 10, label: 'Option10', subText: '123131' },
]
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="12">
      values: {{ value }}
    </el-col>
    <el-col :span="6">
      count-tags: <el-switch v-model="countTags" />
    </el-col>
    <el-col :span="6">
      lazy-write-back: <el-switch v-model="lazyWriteBack" />
    </el-col>
  </el-row>
  <el-select
    v-model="value"
    :options="options"
    placeholder="请选择"
    multiple
    :count-tags="countTags"
    :lazy-write-back="lazyWriteBack"
    style="width: 200px"
  >
    <template #option-label="{ option }">
      <div class="option">
        <span class="label">{{ option.label }}</span>
        <span class="sub">{{ option.subText }}</span>
      </div>
    </template>
  </el-select>
</template>

<style lang="scss" scoped>
.option {
  display: inline-flex;
  flex-direction: column;
  line-height: 20px;
  font-size: 14px;

  .sub {
    margin-bottom: 6px;
  }
}
</style>
