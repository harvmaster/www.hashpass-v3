<template>
  <q-page class="row items-center justify-evenly">
    <div class="pin-input">
      <div class="text-center text-h6 q-pb-md">
        Enter current pin to continue
      </div>
      <mobile-pin @update:complete="onPinEntered"/>

    </div>
  </q-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import MobilePin from 'src/components/Auth/MobilePin.vue';

const onPinEntered = (pin: string) => {
  console.log('Pin Entered')
}

</script>