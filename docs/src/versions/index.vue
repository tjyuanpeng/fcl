<script setup lang="ts">
import axios from 'axios'
import { rsort } from 'semver'
import { onMounted, ref } from 'vue'

const ajax = axios.create({
  withCredentials: false,
  baseURL: `https://fcl.yingmai.net/npm/`,
})
ajax.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params[Date.now()] = ''
  return config
})

const formatDate = (date: string) => new Date(date).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
const getPackageList = async () => {
  const { data } = await ajax<{ items: any[] }>({
    url: `/service/rest/v1/search`,
    params: { repository: 'ym-hosted', group: 'falconix', format: 'npm', sort: 'name' },
  })
  const set = data.items.reduce((acc: Set<string>, cur: any) => acc.add(cur.assets[0].npm.name), new Set<string>())
  return [...set]
}
const getPackage = async (name: string) => {
  const { data } = await ajax({
    url: `/repository/ym-hosted/${name}`,
  })
  return data
}
const tableData = ref()
onMounted(async () => {
  const pkglist = await getPackageList()
  const pkgInfos = await Promise.all(pkglist.map(name => getPackage(name)))
  pkgInfos.sort((a, b) => new Date(b.time.modified).getTime() - new Date(a.time.modified).getTime())
  tableData.value = pkgInfos
  console.log(pkgInfos)
})
const expandRowKeys = ref<string[]>([])
const rowClick = (row: any) => {
  expandRowKeys.value = row.name === expandRowKeys.value?.[0] ? [] : [row.name]
}
</script>

<template>
  <div class="wrapper">
    <el-table class="verTable" :data="tableData" row-key="name" preserve-expanded-content :expand-row-keys="expandRowKeys" @row-click="rowClick">
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-descriptions :column="2" style="margin-left: 50px;">
            <el-descriptions-item label="修改时间">
              {{ formatDate(row.time.modified) }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{ formatDate(row.time.created) }}
            </el-descriptions-item>
            <el-descriptions-item label="标签" :span="2">
              <span class="tags">
                <el-tag v-for="[key, value] in Object.entries(row['dist-tags'])" :key="key" effect="plain">
                  {{ key }}:{{ value }}
                </el-tag>
              </span>
            </el-descriptions-item>
          </el-descriptions>
          <el-timeline style="margin: 10px 0 0 60px;">
            <template v-for="key in rsort(Object.keys(row.versions))" :key="key">
              <el-timeline-item class="timeline-item">
                <h3>{{ `${key} - ${formatDate(row.time[key])}` }}</h3>
                <dl v-if="row.versions[key].dependencies">
                  <dt>dependencies</dt>
                  <dd>
                    <el-tag v-for="[name, value] in Object.entries(row.versions[key].dependencies)" :key="name" :effect="name.startsWith(`@falconix/`) ? 'dark' : 'plain'">
                      {{ `${name}@${value}` }}
                    </el-tag>
                  </dd>
                </dl>
                <dl v-if="row.versions[key].devDependencies">
                  <dt>devDependencies</dt>
                  <dd>
                    <el-tag v-for="[name, value] in Object.entries(row.versions[key].devDependencies)" :key="name" :effect="name.startsWith(`@falconix/`) ? 'dark' : 'plain'">
                      {{ `${name}@${value}` }}
                    </el-tag>
                  </dd>
                </dl>
                <dl v-if="row.versions[key].peerDependencies">
                  <dt>peerDependencies</dt>
                  <dd>
                    <el-tag v-for="[name, value] in Object.entries(row.versions[key].peerDependencies)" :key="name" :effect="name.startsWith(`@falconix/`) ? 'dark' : 'plain'">
                      {{ `${name}@${value}` }}
                    </el-tag>
                  </dd>
                </dl>
              </el-timeline-item>
            </template>
          </el-timeline>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" />
      <el-table-column label="描述" prop="description" width="600" />
      <el-table-column label="最新版本" width="120">
        <template #default="{ row }">
          <el-tag effect="plain">
            {{ row['dist-tags'].latest }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 1000px;
  margin: 20px auto;
  border-radius: 20px;
  background-color: #fff;
}

.verTable {
  :deep(.el-table__row) {
    cursor: pointer;
  }
}

.tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 2px;
}

.timeline-item {
  padding-bottom: 4px;

  :deep(.el-timeline-item__content) {
    display: flex;
    flex-flow: column;
    font-size: 12px;
  }

  h3 {
    margin-top: -4px;
  }

  dd {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }
}
</style>
