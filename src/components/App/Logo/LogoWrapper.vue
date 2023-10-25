<template>
  <div class="relative overflow-hidden">
    <dynamic-letter-logo v-if="!logo" :name="name" :letter="letter" :colors="colors" class="fit" :class="iconClasses" />
    <q-img v-else :src="logo" :alt="name" :class="iconClasses" class="fit" @contextmenu.prevent="cancelContextMenu"/>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref, computed } from 'vue'


</script>