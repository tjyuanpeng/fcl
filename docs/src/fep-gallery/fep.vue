<script setup lang="ts">
import { zhCn } from '@falconix/fep/es/locale/index'
import { ArrowRight } from '@falconix/icons-vue'
import { reactive, ref } from 'vue'

const input = ref('')
const textarea = ref('')
const radio1 = ref('1')
const checked1 = ref(true)
const checked2 = ref(false)
const datePickerValue = ref()
const rangePickerValue = ref()
// const timeValue = ref()
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
const ccValue1 = ref()
const ccValue2 = ref([])
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
const alert = () => {
  ElMessageBox.alert(
    '本次申请需消耗30000鹰眼币，请确认线索相关评估内容已填写完整。',
    '确定提交',
    { type: 'warning' },
  )
}
const confirm = () => {
  ElMessageBox.confirm(
    '本次申请需消耗30000鹰眼币，请确认线索相关评估内容已填写完整。',
    '确定提交',
    { type: 'warning' },
  )
}
const drawer = reactive({
  open: false,
  size: '',
})
const tableData = ref([
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
])
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
const editTableHasError = ref(false)
const editTrigger = ref(true)
const treeSelectValue = ref()
const treeData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="wrapper">
      <h3>button</h3>
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
      <div class="box">
        <el-button size="large">
          Large
        </el-button>
      </div>

      <h3>input</h3>
      <div class="box">
        <el-input v-model="input" placeholder="input" style="width: 240px" />
        <el-input
          v-model="input"
          size="large"
          placeholder="Input"
          style="width: 240px"
        />
        <el-input
          v-model="textarea"
          maxlength="30"
          style="width: 240px"
          placeholder="Please input"
          show-word-limit
          type="textarea"
        />
      </div>

      <h3>select</h3>
      <div class="box">
        <el-select
          v-model="select"
          :options="options"
          placeholder="Select"
          style="width: 240px"
        />
        <el-select
          v-model="multiSelect"
          :options="options"
          placeholder="Select"
          style="width: 240px"
          multiple
        />
        <el-select
          v-model="multiSelect"
          size="large"
          :options="options"
          placeholder="Select"
          style="width: 240px"
          multiple
          count-tags
          lazy-write-back
        />
      </div>

      <h3>tree-select</h3>
      <div class="box">
        <el-tree-select
          v-model="treeSelectValue"
          :data="treeData"
          multiple
          show-checkbox
          placeholder="Tree Select"
          style="width: 240px"
        />
      </div>

      <h3>cascader</h3>
      <div class="box">
        <el-cascader
          v-model="ccValue1"
          :options="ccOptions"
          placeholder="Cascader"
          style="width: 240px"
        />
        <el-cascader
          v-model="ccValue2"
          :options="ccOptions"
          size="large"
          :props="{ expandTrigger: 'hover', multiple: true }"
          placeholder="Cascader"
          style="width: 240px"
        />
      </div>

      <h3>date time picker</h3>
      <div class="box" style="flex-direction: column">
        <el-date-picker
          v-model="datePickerValue"
          type="date"
          placeholder="选择日期"
          style="width: 240px"
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
        <el-date-picker
          v-model="rangePickerValue"
          type="datetimerange"
          start-placeholder="开始日期时间"
          end-placeholder="结束日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
          style="width: 360px"
        />
        <!-- <el-date-picker-panel
          v-model="datePickerValue"
          type="datetime"
          placeholder="选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm"
        /> -->
        <!-- <el-date-picker-panel
          style="width: 648px"
          v-model="rangePickerValue"
          type="datetimerange"
          start-placeholder="开始日期时间"
          end-placeholder="结束日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY-MM-DD"
          time-format="HH:mm:ss"
          unlinkPanels
        /> -->
        <!-- <el-time-picker v-model="timeValue" placeholder="选择时间" /> -->
        <!-- <el-time-picker
          v-model="timeValue2"
          is-range
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        /> -->
      </div>

      <h3>radio</h3>
      <div class="box">
        <el-radio-group v-model="radio1">
          <el-radio value="1">
            Option 1
          </el-radio>
          <el-radio value="2">
            Option 2
          </el-radio>
        </el-radio-group>
      </div>

      <h3>checkbox</h3>
      <div class="box">
        <el-checkbox v-model="checked1" label="Option 1" />
        <el-checkbox v-model="checked2" label="Option 2" />
        <el-checkbox v-model="checked2" indeterminate label="Option 3" />
      </div>

      <h3>dropdown</h3>
      <div class="box">
        <el-dropdown>
          <el-button> Dropdown List </el-button>
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
          trigger="click"
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
        <el-tooltip content="Content">
          <el-button>tooltip</el-button>
        </el-tooltip>
        <el-tooltip content="Content" effect="light">
          <el-button>tooltip</el-button>
        </el-tooltip>
      </div>

      <h3>breadcrumb</h3>
      <div class="box">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item><a href="/">项目列表</a></el-breadcrumb-item>
          <el-breadcrumb-item>中国中车轨道轨枕检测 </el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

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
        <el-tabs v-model="activeName" tab-position="left" class="left-tabs">
          <el-tab-pane label="待处理" name="1">
            11
          </el-tab-pane>
          <el-tab-pane label="评审队列" name="2">
            <div style="width: 100px; height: 500px; background: red" />
          </el-tab-pane>
          <el-tab-pane label="评估队列" name="3">
            33
          </el-tab-pane>
          <el-tab-pane label="免审列表" name="4">
            44
          </el-tab-pane>
          <el-tab-pane label="授权列表" name="5">
            55
          </el-tab-pane>
          <el-tab-pane label="处理记录" name="6">
            66
          </el-tab-pane>
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
        <el-button @click="showMessage('success')">
          Success
        </el-button>
        <el-button @click="showMessage('warning')">
          Warning
        </el-button>
        <el-button @click="showMessage('error')">
          Error
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
      </div>

      <h3>table</h3>
      <div class="box">
        <el-table :data="tableData">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="box">
        <el-table :data="tableData" :border="true" show-summary>
          <el-table-column type="selection" width="60" align="center" />
          <el-table-column
            prop="date"
            label="Date"
            width="180"
            min-width="160"
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
          <el-table-column prop="address" label="Address" width="300" />
          <el-table-column
            prop="address"
            label="Address2"
            width="300"
            fixed="right"
          />
        </el-table>
      </div>

      <h3>editable table</h3>
      <div class="box column" style="gap: 0">
        <el-switch
          v-model="editTrigger"
          active-text="双击触发编辑"
          inactive-text="单击触发编辑"
        />
        <el-table
          class="edit-table"
          :data="tableData"
          :edit-trigger="editTrigger ? 'dblclick' : 'click'"
          :before-enter-edit="() => !editTableHasError"
          :before-exit-edit="() => !editTableHasError"
        >
          <el-table-column prop="date" label="Date" width="200">
            <template #edit="{ row }">
              <el-form-item
                :field-value="() => row.date"
                inline-message
                style="margin: 0"
                :rules="[
                  {
                    required: true,
                    message: '请输入日期',
                  },
                ]"
                @validate="
                  (_prop, isValid) => {
                    editTableHasError = !isValid
                  }
                "
              >
                <el-date-picker
                  v-model="row.date"
                  type="date"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name" width="200">
            <template #edit="{ row }">
              <el-form-item
                :field-value="row.name"
                inline-message
                style="margin: 0"
                :rules="[
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ]"
                @validate="
                  (_prop, isValid) => {
                    editTableHasError = !isValid
                  }
                "
              >
                <el-input v-model="row.name" placeholder="请输入姓名" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="Address">
            <template #edit="{ row }">
              <el-select
                v-model="row.address"
                placeholder="请选择优先级"
                :options="options"
              />
            </template>
          </el-table-column>
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

  &.column {
    flex-direction: column;
  }

  > .el-button + .el-button {
    margin-left: 0;
  }
}

.left-tabs {
  width: 100%;

  :deep(.el-tabs__header) {
    height: inherit;
  }
  :deep(.el-tabs__item) {
    min-width: 120px;
  }
}
.edit-table {
  :deep(.el-table__row) {
    height: 50px;
  }
  :deep(.cell-editing) {
    padding: 0;
    margin: -8px 0;
  }
}
</style>
