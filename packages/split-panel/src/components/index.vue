<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ElIcon } from '@falconix/fep'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '@falconix/icons-vue'
import { computed } from 'vue'
import FSplitPanelSubTransition from './sub-transition.vue'

defineOptions({
  name: 'FSplitPanel',
})
const props = withDefaults(defineProps<Props>(), {
  subPosition: 'right',
  dividerPosition: 'middle',
  noLine: false,
})

const emit = defineEmits<{
  change: [collapsed: boolean]
}>()
export interface Props {
  subPosition?: 'top' | 'right' | 'bottom' | 'left'
  dividerPosition?: 'middle' | 'edge'
  splitterOffset?: CSSProperties['left'] | CSSProperties['top']
  noLine?: boolean
}
const collapsed = defineModel<boolean>('collapsed', { type: Boolean, default: false })
const flip = computed(() => ['top', 'left'].includes(props.subPosition) !== (props.dividerPosition === 'middle' === collapsed.value))
const vertical = computed(() => ['top', 'bottom'].includes(props.subPosition))
const handleCollapse = () => {
  collapsed.value = !collapsed.value
  emit('change', collapsed.value)
}
</script>

<template>
  <div
    class="f-split-panel"
    :class="{
      [`f-split-panel--${subPosition}`]: true,
      [`f-split-panel--${dividerPosition}`]: true,
      'f-split-panel--collapsed': collapsed,
    }"
  >
    <div class="f-split-panel__main">
      <slot name="default" />
    </div>
    <div class="f-split-panel__divider" :class="{ 'f-split-panel__divider--no-line': noLine }">
      <div
        class="f-split-panel__splitter"
        :style="vertical ? { left: splitterOffset } : { top: splitterOffset }"
        @click="handleCollapse"
      >
        <slot name="splitter" :flip="flip" :vertical="vertical">
          <ElIcon>
            <template v-if="!vertical">
              <ArrowLeft v-if="flip" />
              <ArrowRight v-else />
            </template>
            <template v-else>
              <ArrowUp v-if="flip" />
              <ArrowDown v-else />
            </template>
          </ElIcon>
        </slot>
      </div>
    </div>
    <FSplitPanelSubTransition :vertical="vertical">
      <div v-show="!collapsed" class="f-split-panel__sub">
        <slot name="sub" />
      </div>
    </FSplitPanelSubTransition>
  </div>
</template>

<style>
.f-split-panel {
  width: 100%;
  height: 100%;
  display: flex;

  .f-split-panel__main {
    flex: 1;
  }

  .f-split-panel__divider {
    position: relative;
    width: 12px;

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      top: 0;
      bottom: 0;
      left: 50%;
      background-color: #ededf0;
    }

    &.f-split-panel__divider--no-line::before {
      display: none;
    }
  }

  .f-split-panel__splitter {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 24px;
    cursor: pointer;
    color: #848691;
    font-size: 12px;
    border: 1px solid #ededf0;
    border-radius: 20px;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 1;
  }
}

.f-split-panel--top,
.f-split-panel--bottom {
  flex-direction: column;

  .f-split-panel__divider {
    width: 100%;
    height: 12px;

    &::before {
      width: 100%;
      height: 1px;
      top: 50%;
      left: 0;
      right: 0;
    }
  }

  .f-split-panel__splitter {
    width: 24px;
    height: 12px;
  }
}
.f-split-panel--right,
.f-split-panel--bottom {
  &.f-split-panel--middle {
    .f-split-panel__sub {
      order: 2;
    }
    .f-split-panel__divider {
      order: 1;
    }
  }
  &.f-split-panel--edge {
    .f-split-panel__sub {
      order: 1;
    }
    .f-split-panel__divider {
      order: 2;
    }
  }
}
.f-split-panel--left,
.f-split-panel--top {
  &.f-split-panel--middle {
    .f-split-panel__sub {
      order: -2;
    }
    .f-split-panel__divider {
      order: -1;
    }
  }
  &.f-split-panel--edge {
    .f-split-panel__sub {
      order: -1;
    }
    .f-split-panel__divider {
      order: -2;
    }
  }
}
</style>
