<template>
  <div class="signup-form col-12 q-pt-xl">
    <div class="row justify-center q-pa-sm">
      <q-input outlined v-model="username" label="Username" class="col-8" @keyup.enter="signup" :error="invalidUsername" @input="() => invalidUsername = false" hint="Username must be more than 7 letters"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-input outlined v-model="password" label="Password" class="col-8" type="password" @keyup.enter="signup" hint="Password must be longer than 7 characters"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-btn class="col-8" unelevated rounded label="Sign up" color="primary" :disable="invalidCredentials" @click="signup"/>
    </div>
    <div class="row justify-center q-pa-sm">
      <q-btn class="col-8" outline rounded label="Back" color="primary" @click="toOnboard"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { api } from 'boot/axios'
import { hp3 } from 'src/crypto/passwordGenerators';
import { generateAES } from 'src/crypto/aes';
import { useUserStore } from 'src/stores/user';

const emits = defineEmits(['toOnboard'])
const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const toOnboard = () => {
  emits('toOnboard')
}

const invalidUsername = ref(false)
const invalidCredentials = computed(() => {
  return username.value.length < 7 || password.value.length < 7
})

const signup = async () => {
  console.log('called signup?')
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
    interface SignupResponse {
      user: {
        username: string,
        settings: {
          algorithm: string
        }
      },
      access_token: string,
      refresh_token: string
    }

    const { data }: { data: SignupResponse } = await api.post('/users', {
      username: username.value.toLowerCase(),
      password: generatedPassword
    })

    userStore.setUser(data.user)
    userStore.setSecret(password.value)
    userStore.setRefreshToken(data.refresh_token)
    userStore.setAccessToken(data.access_token)

    router.push('/')
    
  } catch (err: any) {
    
    // Handle duplicate Username
    if (err.response?.status === 409) {
      Notify.create({
        message: 'Username already exists',
        color: 'negative',
        icon: 'report_problem'
      })
      invalidUsername.value = true
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