<template>
  <div :style="iconStyle" class="relative">
    <div class="letter text-h5 text-weight-light">
      {{ props.letter ? props.letter : props.name[0] }}
    </div>
  </div>
</template>

<style>
.letter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>

<script setup lang="ts">
import { computed, ref, defineExpose } from 'vue'
import { generateSeed } from './generateSeed';
import { generateColors } from './generateColors'

interface ServiceIconProps {
  name: string;
  letter?: string;
  colors?: string[];
}

const props = withDefaults(defineProps<ServiceIconProps>(), {
  name: '',
});

const colors = computed(() => {
  const seed = generateSeed(props.name);
  return generateColors(seed);
});

const iconStyle = computed(() => {
  return {
    background: `linear-gradient(45deg, ${colors.value[0]}, ${colors.value[1]})`,
  }
})

defineExpose({
  backgroundColor: iconStyle.value.background
})
</script>