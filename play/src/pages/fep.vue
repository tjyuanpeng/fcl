<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { zhCn } from '@falconix/fep/es/locale/index'
import { reactive, ref } from 'vue'

const input = ref('')
const value1 = ref()
const value2 = ref()

const hasType = ref(true)
const isFep = ref(true)
function alert() {
  ElMessageBox.alert(
    '本次申请需消耗30000鹰眼币，请确认线索相关评估内容已填写完整。',
    '确定提交',
    {
      type: hasType.value ? 'warning' : undefined,
      fep: isFep.value,
    },
  )
}
function confirm() {
  ElMessageBox.confirm(
    '本次申请需消耗30000鹰眼币，请确认线索相关评估内容已填写完整。',
    '确定提交',
    {
      type: hasType.value ? 'warning' : undefined,
      fep: isFep.value,
    },
  )
}
const drawer = reactive({
  open: false,
  size: '',
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
function showMessage(type: string) {
  ElMessage({
    message: 'Congrats, this is a message.',
    type: type as any,
    duration: 0,
  })
}
const close = () => ElMessage.closeAll()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="wrapper">
      <h3>button</h3>
      <div class="box">
        <el-button size="small">
          Small
        </el-button>
        <el-button>按钮</el-button>
        <el-button size="large">
          Large
        </el-button>
      </div>
      <div class="box">
        <el-button>Default</el-button>
        <el-button type="primary">
          Primary
        </el-button>
        <el-button type="success">
          Success
        </el-button>
        <el-button type="warning">
          Warning
        </el-button>
        <el-button type="danger">
          Danger
        </el-button>
      </div>
      <div class="box">
        <el-button disabled>
          Default
        </el-button>
        <el-button disabled type="primary">
          Primary
        </el-button>
        <el-button disabled type="success">
          Success
        </el-button>
        <el-button disabled type="warning">
          Warning
        </el-button>
        <el-button disabled type="danger">
          Danger
        </el-button>
      </div>
      <div class="box">
        <el-button plain>
          Plain
        </el-button>
        <el-button type="primary" plain>
          Primary
        </el-button>
        <el-button type="success" plain>
          Success
        </el-button>
        <el-button type="warning" plain>
          Warning
        </el-button>
        <el-button type="danger" plain>
          Danger
        </el-button>
      </div>
      <div class="box">
        <el-button disabled plain>
          Plain
        </el-button>
        <el-button disabled type="primary" plain>
          Primary
        </el-button>
        <el-button disabled type="success" plain>
          Success
        </el-button>
        <el-button disabled type="warning" plain>
          Warning
        </el-button>
        <el-button disabled type="danger" plain>
          Danger
        </el-button>
      </div>

      <h3>input</h3>
      <div class="box">
        <el-input
          v-model="input"
          style="width: 240px"
          size="small"
          placeholder="small input"
        />
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="normal input"
        />
        <el-input
          v-model="input"
          style="width: 240px"
          size="large"
          placeholder="large Input"
        />
      </div>

      <h3>time-picker</h3>
      <div class="box">
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm"
        />
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          start-placeholder="开始时间日期"
          end-placeholder="结束时间日期"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
        />
      </div>

      <h3>message</h3>
      <div class="box">
        <el-button @click="showMessage('primary')">
          Primary
        </el-button>
        <el-button @click="showMessage('success')">
          Success
        </el-button>
        <el-button @click="showMessage('warning')">
          Warning
        </el-button>
        <el-button @click="showMessage('error')">
          Error
        </el-button>
        <el-button @click="showMessage('info')">
          Info
        </el-button>
        <el-button style="margin-left: auto" @click="close">
          clear all
        </el-button>
      </div>

      <h3>message box</h3>
      <div class="box">
        <el-button @click="alert">
          alert
        </el-button>
        <el-button @click="confirm">
          confirm
        </el-button>
        <el-switch v-model="hasType" active-text="has type" />
        <el-switch v-model="isFep" active-text="is fep" />
      </div>
      <div class="box" />

      <h3>breadcrumb</h3>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item><a href="/">项目列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>中国中车轨道轨枕检测 </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- <h3>tooltip</h3>
      <div class="tooltip-base-box">
        <div class="row center">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Top Left prompts info"
            placement="top-start"
          >
            <el-button>top-start</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Top Center prompts info"
            placement="top"
            visible
          >
            <el-button>top</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Top Right prompts info"
            placement="top-end"
          >
            <el-button>top-end</el-button>
          </el-tooltip>
        </div>
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Left Top prompts info"
            placement="left-start"
          >
            <el-button>left-start</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Right Top prompts info"
            placement="right-start"
          >
            <el-button>right-start</el-button>
          </el-tooltip>
        </div>
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Left Center prompts info"
            placement="left"
            visible
          >
            <el-button class="mt-3 mb-3">left</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Right Center prompts info"
            placement="right"
            visible
          >
            <el-button>right</el-button>
          </el-tooltip>
        </div>
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Left Bottom prompts info"
            placement="left-end"
          >
            <el-button>left-end</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Right Bottom prompts info"
            placement="right-end"
          >
            <el-button>right-end</el-button>
          </el-tooltip>
        </div>
        <div class="row center">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Bottom Left prompts info"
            placement="bottom-start"
          >
            <el-button>bottom-start</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Bottom Center prompts info"
            placement="bottom"
            visible
          >
            <el-button>bottom</el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Bottom Right prompts info"
            placement="bottom-end"
          >
            <el-button>bottom-end</el-button>
          </el-tooltip>
        </div>
      </div> -->

      <h3>drawer</h3>
      <div class="box">
        <el-button @click="((drawer.open = true), (drawer.size = 'small'))">
          small
        </el-button>
        <el-button @click="((drawer.open = true), (drawer.size = 'regular'))">
          regular
        </el-button>
        <el-button @click="((drawer.open = true), (drawer.size = 'large'))">
          large
        </el-button>
        <el-drawer v-model="drawer.open" title="标题" :size="drawer.size">
          <span>Hi, there!</span>
        </el-drawer>
      </div>

      <h3>table</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </el-config-provider>
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
  align-items: flex-start;

  &.align-middle {
    align-items: center;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}

.tooltip-base-box {
  width: 600px;
  margin: auto;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
