<template>
  <q-btn v-if="value" :label="value" @click="emitClick" round outline color="primary" ></q-btn>
</template>

<script setup lang="ts">
export interface PinButtonProps {
  value: string;
}
const props = withDefaults(defineProps<PinButtonProps>(), {
  value: '0'
});

const emit = defineEmits(['clicked'])

const emitClick = (event: Event) => {
  console.log(props)
  emit('clicked', props.value)
  event.preventDefault()
}
</script>
