<template>
  <div class="relative">
    <div class="row" v-touch-hold:500="toggleVisibility">
      <div class="col-auto row items-center">
        <service-icon class="service-logo square" :logo="logo" :name="service.name"/>
      </div>
      <div class="col row q-pl-md">
        <div class="col row">
          <div class="col-12 text-h6">
            {{ service.name }}
          </div>
          <div class="col-12 text-caption">
            {{ service.note }}
          </div>
        </div>
        <div class="col-auto row items-center">
          <q-btn class="" round flat icon="content_copy" size="sm"/>
        </div>
      </div>
    </div>
    

    <!-- Hover Modal with Contents -->
    <service-item-popout ref="servicePopout" :service="service" />
  </div>
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
import { ref } from 'vue'
import ServiceIcon from './ServiceIconWrapper.vue'
import ServiceItemPopout from './ServiceItemPopout.vue'

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
export interface ServiceItemProps {
  service: Service
}


const props = withDefaults(defineProps<ServiceItemProps>(), {
  service: () => ({
    name: '',
    legacy: false,
    encoding: 'base58',
    logo: '',
    domain: ''
  })
});

const logo = ref('');

const defaultLogo = () => {
  logo.value = props.service.logo
}
defaultLogo();

const getLogo = async () => {
  console.log('get logo')
  // This code is working. It just spams the server, so ive commented it out

  // const { data } = await axios.get(`https://api.faviconscraper.mc.hzuccon.com/icon?url=${props.service.domain}`);
  // console.log(data)
  // logo.value = data.icons[0];
}
getLogo()

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
}

const servicePopout = ref<InstanceType<typeof ServiceItemPopout> |null>(null)
const toggleVisibility = () => {
  if (servicePopout.value === null) return
  servicePopout.value.toggleVisibility()
}
</script>
  