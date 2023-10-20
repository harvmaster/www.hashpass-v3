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
import { computed, ref } from 'vue'
import { getHash } from 'src/crypto/sha256';
import { hexToBase58 } from 'src/crypto/base58';

interface ServiceIconProps {
  name: string;
  letter?: string;
  colors?: string[];
}

const props = withDefaults(defineProps<ServiceIconProps>(), {
  name: '',
});

const colors = computed(() => {
  const seed = hexToBase58(getHash(props.name));
  return generatePastelColor(seed);
});

function generatePastelColor(seedString: string): [string, string] {
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed << 5) - seed + seedString.charCodeAt(i);
    seed |= 0; // Convert to 32-bit integer
  }

  const next = (): number => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const baseValue = 200; // Base value to ensure pastel colors

  const getColor = () => {
    const variation = (next() * 55) - 27.5; // Adjust the variation to ensure greater difference
    const r = Math.round(baseValue + variation);
    const g = Math.round(baseValue + variation * next());
    const b = Math.round(baseValue + variation * next());
    return `rgb(${r},${g},${b})`;
  };

  return [getColor(), getColor()];
}


const iconStyle = computed(() => {
  return {
    background: `linear-gradient(45deg, ${colors.value[0]}, ${colors.value[1]})`,
  }
})
</script>