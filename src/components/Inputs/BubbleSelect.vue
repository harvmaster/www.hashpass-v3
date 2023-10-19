<template>
    <div class="">
      <div class="row selector-container justify-between text-center q-pa-sm">
        <div class="bubble">
            V1
        </div>
      </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  .selector-container {
    // background-color: $grey-4;
    // border-radius: 3em;
    position: relative;
    top: 0%;
    left: 0%;
  }

.bubble {
    position: absolute;
    // display: inline-block;
    padding: 1em;
    border-radius: 50%;
    background-color: $red-3;
    color: $grey-8;
    font-weight: 500;
    font-size: 1.2em;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
  
  .selected {
    position: relative;
  }
  .selected::after {
    content: '';
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    height: 130%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: $red-6;
    opacity: 0.3;
  }
  </style>
    
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  export interface ServiceItemProps {
    values: string[];
  }
  const props = defineProps<ServiceItemProps>()
  </script>
    