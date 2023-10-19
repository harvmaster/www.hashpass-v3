<template>
  <div class="login-form col-12 q-pt-xl">
    <div class="row justify-center q-pa-sm">
      <q-input outlined v-model="username" label="Username" class="col-8" @keyup.enter="login" hint="Username must be more than 7 letters"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-input outlined v-model="password" label="Password" class="col-8" type="password" @keyup.enter="login" hint="Password must be longer than 7 characters" />
    </div>
    <div class="row justify-center q-pa-sm">
      <q-btn class="col-8" unelevated rounded label="Login" color="primary" :disable="invalidCredentials" @click="login"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-btn class="col-8" outline rounded label="Back" color="primary" @click="toOnboard"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue'
import { Notify } from 'quasar';
import { api } from 'boot/axios'
import { hp3 } from 'src/crypto/passwordGenerators';
import { generateAES } from 'src/crypto/aes';

const emits = defineEmits(['toOnboard'])

const username = ref('')
const password = ref('')

const toOnboard = () => {
  emits('toOnboard')
}

const invalidCredentials = computed(() => {
  return username.value.length < 7 || password.value.length < 7
})

const login = async () => {
  const generatedPassword = await hp3(username.value, password.value)
  try {
    // Make sure aes can be generated from the pair
    await generateAES(`${username.value}${password.value}`)
  } catch (err) {
    Notify.create({
      message: 'There is an issue with your username or password',
      color: 'negative',
      icon: 'report_problem'
    })
    return
  }

  try {
    const { data } = await api.post('/users/login', {
      username: username.value,
      password: generatedPassword
    })

    console.log(data)
    
  } catch (err: any) {    
    // Handle invalid credentials
    if (err.response?.status === 401) {
      Notify.create({
        message: 'Invalid username or password',
        color: 'negative',
        icon: 'report_problem'
      })
      return
    }
    // Handle 400
    if (err.response?.status === 400) {
      Notify.create({
        message: err.response.data.message,
        color: 'negative',
        icon: 'report_problem'
      })
      return
    }

    Notify.create({
      message: 'Something went wrong',
      color: 'negative',
      icon: 'report_problem'
    })
    console.log(err)
  }
}
</script>