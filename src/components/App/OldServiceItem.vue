<template>
  <div class="row service-item shadow-1">
    <div class="col-2 row items-center">
      <q-img ratio="1" fit="contain" :src="service.logo" :alt="service.name" class="service-logo col-12" />
    </div>
    <div class="col-10 q-pa-sm">
      <div class="row">
        <div class="col">
          <h6 class="service-name q-my-sm">{{ service.name }}</h6>
        </div>
        <div class="col-auto">
          <q-btn class="" round flat icon="more_vert" size="sm"/>
        </div>

        <div class="col-12 row">
          <div class="col row items-center">
            <div class="col-auto">
              <q-btn class="" round flat :icon="!showPassword ? 'visibility_off' : 'visibility'" @click="togglePassword" color="grey-7" />
            </div>
            <div class="col-auto mono-font password-display ">
              <div v-if="!showPassword">
                ****************
              </div>
              <div v-else>
                samplepassword
              </div>
            </div>
          </div>
          <div class="col-auto">
            <q-btn class="" round flat icon="content_copy" /> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

  interface Service {
    name: string; 
    note?: string;
    legacy: boolean;
    encoding: string;   
    logo?: string;
  }

  export interface ServiceItemProps {
    service: Service
  }
  withDefaults(defineProps<ServiceItemProps>(), {
    service: () => ({
      name: '',
      legacy: false,
      encoding: 'base58',
    })
  });

  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  }
</script>
  