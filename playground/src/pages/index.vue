<template>
  <div>
    <h1>It works</h1>
    <Popper :hover="true" :close-delay="200" placement="top">
      <template #content>
        <div bg="light-100" text="black">
          foobar
        </div>
      </template>
      <button class="btn">
        trigger
      </button>
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { Popper } from '@bryce-loskie/popover'
import '@bryce-loskie/popover/style'
</script>

<style lang="less">
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
