<template>
  <!-- Going to have either the dyanmic Letter on background, or the q-img based on whether there is a url provided -->
  <div class="relative overflow-hidden">
    <dynamic-letter-logo v-if="!logo" :name="name" :letter="letter" :colors="colors" class="fit" :class="iconClasses" />
    <q-img v-else :src="logo" :alt="name" :class="iconClasses" class="fit" @contextmenu.prevent="cancelContextMenu" @load="emitLoad"/>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { DynamicLetterLogo } from 'components/App/misc/DynamicLetterLogo'

interface ServiceIconWrapperProps {
  name?: string;
  logo?: string;
  iconClasses?: string;
  colors?: string[];
  letter?: string;

}

const props = withDefaults(defineProps<ServiceIconWrapperProps>(), {
  name: '',
  logo: '',
  letter: ''
})

const emits = defineEmits(['load'])
const emitLoad = () => {
  emits('load')
}

const cancelContextMenu = (event: any) => {
  event.preventDefault()
  event.stopPropagation()
  return false
}
</script>