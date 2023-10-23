<!-- <template>
  <div class="">
    TEST -->
    <!-- <toggle-select class="col-12" :selected="selectedAlgorithm" :select="selectAlgorithm" :options="algorithms" :containerStyle="{ backgroundColor: '#eeeeee' }"/> -->
  <!-- </div> -->
<!-- </template> -->

<template>
  <div class="">
    test
  </div>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { ref, computed, defineEmits, defineExpose } from 'vue'
// import ToggleSelect from 'src/components/Inputs/ToggleSelect.vue'

const emits = defineEmits<{
  change: (algorithm: string) => void
}>()


const selectedAlgorithm = ref('v1')
const selectAlgorithm = (algorithm: string) => {
  selectedAlgorithm.value = algorithm
}

const algorithms = [
  {
    label: 'v1',
    value: 'v1',
    color: '#ef5350',
    description: 'Lgeacy Algorithm',
    security: 'Low'
  },
  {
    label: 'v2',
    value: 'v2',
    color: '#ffca28',
    description: 'Hex Based Output',
    security: 'Secure'
  },
  {
    label: 'v3',
    value: 'v3',
    color: '#66bb6a',
    description: 'Base58 Output',
    security: 'Recommended'
  }
]
const getSelectedAlgorithm = () => {
  return algorithms.find(algorithm => algorithm.value == selectedAlgorithm.value)
}
const algorithmDescription = computed(() => {
  return getSelectedAlgorithm()?.description || ''
})
const algorithmSecurity = computed(() => {
  return getSelectedAlgorithm()?.security || ''
})
const algorithmColor = computed(() => {
  return getSelectedAlgorithm()?.color || ''
})


defineExpose({
  selectedAlgorithm,
  selectAlgorithm,
})
</script>