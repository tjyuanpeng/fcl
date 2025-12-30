<script setup lang="ts">
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import { zhCn } from '@falconix/fep/es/locale/index'
import { reactive, ref } from 'vue'

const input = ref('')
const datePickerValue = ref(Date.now() - 172800000)
const rangePickerValue = ref([Date.now() - 1209600000, Date.now() - 172800000])
const select = ref()
const multiSelect = ref([])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
    disabled: true,
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const ccValue = ref([])
const ccOptions = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
            disabled: true,
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const activeName = ref('1')
const hasType = ref(true)
const isFep = ref(true)
const alert = () => {
  ElMessageBox.alert(
    '本次申请需消耗30000鹰眼币，请确认线索相关评估内容已填写完整。',
    '确定提交',
    {
      type: hasType.value ? 'warning' : undefined,
      fep: isFep.value,
    },
  )
}
const confirm = () => {
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
    date: '2017-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2018-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2019-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const showMessage = (type: string) => {
  ElMessage({
    message: 'Congrats, this is a message.',
    type: type as any,
    duration: 0,
  })
}
function close() {
  ElMessage.closeAll()
}
const dialogVisible = ref(false)
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
          &nbsp;&nbsp;Plain&nbsp;&nbsp;
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
          &nbsp;&nbsp;Plain&nbsp;&nbsp;
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
          size="small"
          placeholder="input"
          style="width: 240px"
        />
        <el-input v-model="input" placeholder="input" style="width: 240px" />
        <el-input
          v-model="input"
          size="large"
          placeholder="Input"
          style="width: 240px"
        />
      </div>

      <h3>select</h3>
      <div class="box">
        <el-select
          v-model="select"
          size="small"
          :options="options"
          placeholder="Select"
          style="width: 240px"
        />
        <el-select
          v-model="select"
          :options="options"
          placeholder="Select"
          style="width: 240px"
        />
        <el-select
          v-model="multiSelect"
          size="large"
          :options="options"
          placeholder="Select"
          style="width: 240px"
          multiple
        />
      </div>

      <h3>cascader</h3>
      <div class="box">
        <el-cascader
          v-model="ccValue"
          :options="ccOptions"
          :props="{ expandTrigger: 'hover', multiple: true }"
          size="small"
          style="width: 240px"
        />
        <el-cascader
          v-model="ccValue"
          :options="ccOptions"
          :props="{ expandTrigger: 'hover', multiple: true }"
          style="width: 240px"
        />
        <el-cascader
          v-model="ccValue"
          :options="ccOptions"
          :props="{ expandTrigger: 'hover', multiple: true }"
          size="large"
          style="width: 240px"
        />
      </div>

      <h3>date-time-picker</h3>
      <div class="box">
        <el-date-picker-panel
          v-model="datePickerValue"
          type="datetime"
          placeholder="选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm"
        />
        <div class="box" style="flex-direction: column">
          <el-date-picker
            v-model="datePickerValue"
            type="date"
            placeholder="选择日期"
          />
          <el-date-picker
            v-model="datePickerValue"
            type="datetime"
            placeholder="选择日期时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY-MM-DD"
            time-format="HH:mm"
            style="width: 240px"
          />
        </div>
      </div>
      <div class="box" style="flex-direction: column">
        <el-date-picker-panel
          v-model="rangePickerValue"
          style="width: 648px"
          type="datetimerange"
          start-placeholder="开始时间日期"
          end-placeholder="结束时间日期"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
        />
        <el-date-picker
          v-model="rangePickerValue"
          type="datetimerange"
          start-placeholder="开始时间日期"
          end-placeholder="结束时间日期"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
        />
      </div>

      <h3>dropdown</h3>
      <div class="box">
        <el-dropdown size="small">
          <el-button>
            Dropdown List
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>
                Action 4
              </el-dropdown-item>
              <el-dropdown-item divided>
                Action 5
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <el-button>
            Dropdown List
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>
                Action 4
              </el-dropdown-item>
              <el-dropdown-item divided>
                Action 5
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown size="large">
          <el-button>
            Dropdown List
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>
                Action 4
              </el-dropdown-item>
              <el-dropdown-item divided>
                Action 5
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <h3>popover</h3>
      <div class="box">
        <el-popover
          placement="top-start"
          title="Title"
          :width="200"
          trigger="hover"
          content="this is content, this is content, this is content"
        >
          <template #reference>
            <el-button class="m-2">
              Hover to activate
            </el-button>
          </template>
        </el-popover>
      </div>

      <h3>tooltip</h3>
      <div class="box">
        <el-tooltip content="Content" effect="light">
          <el-button>light</el-button>
        </el-tooltip>
        <el-tooltip content="Content" effect="dark">
          <el-button>dark</el-button>
        </el-tooltip>
      </div>

      <h3>breadcrumb</h3>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item><a href="/">项目列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>中国中车轨道轨枕检测 </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>

      <h3>tabs</h3>
      <div class="box">
        <el-tabs v-model="activeName">
          <el-tab-pane label="待处理" name="1" />
          <el-tab-pane label="评审队列" name="2" />
          <el-tab-pane label="评估队列" name="3" />
          <el-tab-pane label="免审列表" name="4" />
          <el-tab-pane label="授权列表" name="5" />
          <el-tab-pane label="处理记录" name="6" />
        </el-tabs>
      </div>
      <div class="box">
        <el-tabs v-model="activeName" tab-position="left">
          <el-tab-pane label="待处理" name="1" />
          <el-tab-pane label="评审队列" name="2" />
          <el-tab-pane label="评估队列" name="3" />
          <el-tab-pane label="免审列表" name="4" />
          <el-tab-pane label="授权列表" name="5" />
          <el-tab-pane label="处理记录" name="6" />
        </el-tabs>
      </div>

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

      <h3>dialog</h3>
      <div class="box">
        <el-button plain @click="dialogVisible = true">
          Click to open the Dialog
        </el-button>
        <el-dialog v-model="dialogVisible" title="Tips" width="500">
          <span>This is a message</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible = false">
                Cancel
              </el-button>
              <el-button type="primary" @click="dialogVisible = false">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
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

      <h3>table</h3>
      <div class="box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" />
          <el-table-column prop="date" label="Date" width="180" sortable />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="box">
        <el-table
          :data="tableData"
          :border="true"
          show-summary
          style="width: 100%"
        >
          <el-table-column type="selection" width="60" align="center" />
          <el-table-column
            prop="date"
            label="Date"
            width="180"
            sortable
            :filters="[
              { text: '2016', value: '2016' },
              { text: '2017', value: '2017' },
              { text: '2018', value: '2018' },
              { text: '2019', value: '2019' },
            ]"
            :filter-method="(value, row) => row.date.startsWith(value)"
          />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
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
