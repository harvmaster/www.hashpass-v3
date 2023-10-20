<template>
  <hover-modal ref="hoverModal" @opened="bubbleEmits" @closed="bubbleEmits">
    <template v-slot:content>

      <div class="col-12 row">
        <div class="col-auto q-pb-xs">
          <service-icon class="service-logo square" :logo="service.logo" :name="service.name"/>
        </div>
        <div class="col text-right row subtitle">
          <!-- Not sure whether i should put the date information here -->
          <!-- <span class="col-12">
            Added {{ new Date(service.dateAdded).toLocaleDateString() }}
          </span>
          <span class="col-12">
            Last Used
            <span class="text-weight-bold">
              {{ new Date(service.dateUsed).toLocaleDateString() }}
            </span> 
          </span> -->
        </div>
      </div>
      <div class="col-12 row q-col-gutter-xs">
        <div class="col-12 text-h6">
          {{ service.name }}
        </div>
        <div class="col-12 text-subtitle">
          {{ service.domain }}
        </div>
      </div>
      <div class="col-12 row items-center q-col-gutter-xs">
        <div v-if="serviceUsername" class="col-auto">
          <q-input borderless dense hide-bottom-space input-class="text-weight-bold" :model-value="serviceUsername" />
        </div>
      </div>
      <div class="col-12 row items-center q-col-gutter-xs">
        <div class="col-auto">
          <q-btn class="" round flat :icon="!showPassword ? 'visibility' : 'visibility_off'" size="sm" @click="togglePassword"/>
        </div>
        <div class="col-auto">
          {{ showPassword ? 'WWWWWWWWWWWWWWWWW' : '●●●●●●●●●●●●●●●●'  }}
        </div>
      </div>
      <div class="col-12">
        <q-separator />
      </div>
      <div class="col-12 q-pt-sm row">
        <!-- Notes input -->
        <div class="col-12 bg-grey-2 rounded-borders">
          <q-input filled label="Notes" :model-value="serviceNotes"/>
        </div>
      </div>
    </template>
  </hover-modal>
</template>

<style scoped lang="scss">
.relative {
  position: relative;
}
.service-logo {
  height: 3em;
  border-radius: 0.5em;
}
.square {
  aspect-ratio: 1;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ServiceIcon from 'components/App/ServiceListItem/ServiceIconWrapper.vue'
import HoverModal from 'components/Models/HoverModel.vue'

interface Service {
  name: string; 
  note?: string;
  legacy: boolean;
  encoding: string;   
  logo: string;
  domain: string;
  dateUsed?: number;
  dateAdded?: number;
  timesUsed?: number;
}

interface ServiceItemProps {
  service: Service;
}

const props = withDefaults(defineProps<ServiceItemProps>(), {
  service: () => ({
    name: '',
    legacy: false,
    encoding: 'base58',
    logo: '',
    domain: ''
  })
})

defineExpose({
  toggleVisibility: () => {
    toggleVisibility()
  }
})

const emits = defineEmits(['opened', 'closed'])

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const hoverModal = ref<InstanceType<typeof HoverModal> |null>(null)
const toggleVisibility = () => {
  if (hoverModal.value === null) return
  hoverModal.value.toggleVisibility()
}

const serviceUsername = computed(() => {
  return props.service.note?.split('username: ')[1]?.split('\n')[0]
})

const serviceNotes = computed(() => {
  const preUsername = props.service.note?.split('username: ')[0] || ''
  const postUsername = props.service.note?.split('username: ')[1]?.split('\n')[1] || ''
  return `${preUsername}${postUsername}`
})

const bubbleEmits = (event: string) => {
  emit(event)
}


</script>