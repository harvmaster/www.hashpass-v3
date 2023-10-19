<template>
  <div class="container" :style="containerStyle">
    <div class="selector" :style="selectorStyle"></div>
    <div v-for="option of options" :option="option" :key="option.value" class="options no-margin" :style="optionStyle" @click="() => props.select(option.value)">
      {{ option.label }}
    </div>
  </div>
</template>

<style>

</style>

<script setup lang="ts">
import { computed, defineProps, StyleValue } from 'vue';

interface option {
  label: string;
  value: string;
  color: string;
}

interface OptionsProps {
  options: option[];
  selected: string;
  select: (value: string) => void;
  containerStyle?: Partial<CSSStyleDeclaration>;
}

const props = defineProps<OptionsProps>()

const optionHeight = 3

const containerStyle = computed<StyleValue>(() => {
  return {...{
    width: 'max-content',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.options.length}, 1fr)`,
    gridGap: '1rem',
    placeItems: 'center',
    borderRadius: '5em',
    backgroundColor: '#e0e0e0',
    padding: '1em',
    position: 'relative'
  }, ...props.containerStyle} as StyleValue
})

const selectorStyle = computed(() => {
  const index = props.options.findIndex(option => option.value === props.selected)
  console.log(index)
  const width = 100
  return {
    position: 'absolute',
    left: 0,
    height: `${optionHeight}em`,
    fontSize: '1.25em',
    aspectRatio: '1',
    borderRadius: '50%',
    zIndex: '1',
    opacity: 0.5,
    transition: 'all 0.25s ease-out',
    transform: `translateX(calc(0.75em + ${(index) * (width)}% + ${index}rem))`,
    backgroundColor: props.options[index].color
  } as unknown as StyleValue
})

const optionStyle = computed(() => {
  return {
    height: `${optionHeight}em`,
    aspectRatio: '1',
    fontSize: '1.25em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
  } as StyleValue
})
</script>