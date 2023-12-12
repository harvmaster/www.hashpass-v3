<template>
  <div class="">
    <toggle-select class="col-12" :selected="selectedAlgorithm" :select="selectAlgorithm" :options="algorithms" :containerStyle="{ backgroundColor: '#eeeeee' }"/>
  </div>
</template>

<!-- <template>
  <div class="">
    test
  </div>
</template> -->

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { ref, computed, defineEmits, defineExpose } from 'vue'
import ToggleSelect from 'src/components/Inputs/ToggleSelect.vue'

const emits = defineEmits(['change'])

const selectedAlgorithm = ref('hex')
const selectAlgorithm = (algorithm: string) => {
  selectedAlgorithm.value = algorithm
  emits('change', selectedAlgorithm.value);
}

const algorithms = [
  {
    label: 'v1',
    value: 'legacy',
    color: '#ef5350',
    description: 'Lgeacy Algorithm',
    security: 'Low'
  },
  {
    label: 'v2',
    value: 'hex',
    color: '#ffca28',
    description: 'Hex Based Output',
    security: 'Secure'
  },
  {
    label: 'v3',
    value: 'base58',
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