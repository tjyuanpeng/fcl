<script setup lang="ts">
const subPosition = ref('right' as const)
const dividerPosition = ref('middle' as const)
const splitterOffset = ref()
const noLine = ref(false)
const collapsed = ref(false)
const onChange = (collapsed: boolean) => {
  console.log('# onChange', collapsed)
}
</script>

<template>
  <el-form label-width="auto">
    <el-form-item label="subPosition">
      <el-segmented v-model="subPosition" :options="['top', 'bottom', 'left', 'right']" />
    </el-form-item>
    <el-form-item label="dividerPosition">
      <el-segmented v-model="dividerPosition" :options="['middle', 'edge']" />
    </el-form-item>
    <el-form-item label="splitterOffset">
      <el-input v-model="splitterOffset" style="width: 140px" />
    </el-form-item>
    <el-form-item label="noLine">
      <el-switch v-model="noLine" />
    </el-form-item>
    <el-form-item label="collapsed">
      <el-switch v-model="collapsed" />
    </el-form-item>
  </el-form>

  <FSplitPanel
    v-model:collapsed="collapsed"
    :sub-position="subPosition"
    :divider-position="dividerPosition"
    :splitter-offset="splitterOffset"
    :no-line="noLine"
    @change="onChange"
  >
    <div style="margin: 10px; height: 500px; background: lightblue; ">
      default
    </div>
    <template #sub>
      <div style="margin: 10px; width: 200px; height: 200px; background: lightgreen; ">
        sub
      </div>
    </template>
    <!-- <template #splitter="{ flip, vertical }">
      <span>{{ vertical ? (flip ? 'up' : 'down') : (flip ? '<' : '>') }}</span>
    </template> -->
  </FSplitPanel>
</template>
