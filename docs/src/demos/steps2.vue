<script setup lang="ts">
const { Item } = FSteps2
const items = ['线索维护', '技术评估', '研发生产', '交付实施']
const current = ref(0)
const onItemClick = (i: number) => {
  console.log('item-click', i)
  current.value = i
}
</script>

<template>
  <FSteps2 :current="current" :items="items" @item-click="onItemClick" />
  <FSteps2 :current="current" style="margin-top: 20px">
    <Item @click="onItemClick">
      item 1
    </Item>
    <Item>item 2</Item>
    <Item>item 3</Item>
    <Item>item 4</Item>
  </FSteps2>
</template>
