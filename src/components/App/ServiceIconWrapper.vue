<template>
  <!-- Going to have either the dyanmic Letter on background, or the q-img based on whether there is a url provided -->
  <div class="relative overflow-hidden">
    <dynamic-letter-logo v-if="!logo" :name="name" :letter="letter" :colors="colors" class="fit" :class="iconClasses" />
    <q-img v-else :src="logo" :alt="name" :class="iconClasses" class="fit" @contextmenu.prevent="cancelContextMenu"/>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import DynamicLetterLogo from './DynamicLetterLogo.vue'

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

const cancelContextMenu = (event) => {
  event.preventDefault()
  event.stopPropagation()
  return false
}
</script>