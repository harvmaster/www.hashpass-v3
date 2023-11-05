<template>
  <sliding-drawer class="service-drawer" ref="drawer">
    <template v-slot:drawer>
      <div class="row q-pa-md">
        <div class="col-3 q-pa-sm row relative" v-for="service of services" :key="service.name" v-ripple.center>
          <div class="col-12 square q-pa-sm row">
            <service-icon-wrapper :logo="service.logo" :name="service.name" class="col-12 service-icon"/>
          </div>
          <div class="col-12 text-center">
            {{ service.name }}
          </div>
        </div>
      </div>
    </template>
  </sliding-drawer>
</template>

<style scoped lang="scss">
.service-drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.square {
  aspect-ratio: 1;
}
.relative {
  position: relative;
}
.service-icon {
  border-radius: 20%;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

import ServiceIconWrapper from 'src/components/App/ServiceListItem/ServiceIconWrapper.vue'
import SlidingDrawer from 'src/components/Layout/SlidingDrawer.vue'

interface Props {
  services: Service[]
}

const props = withDefaults(defineProps<Props>(), {
  services: () => []
})

const drawer = ref<InstanceType<typeof SlidingDrawer> | null>(null)

defineExpose({
  toggleVisibility: () => drawer.value?.toggleVisibility(),
  visible: computed(() => drawer.value?.visible)
})
</script>