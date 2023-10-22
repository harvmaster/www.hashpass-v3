<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user';
import { useSecretStore } from './stores/secret';
import { useTokenStore } from './stores/token';
import { useServiceStore } from './stores/service';

const router = useRouter()

const userStore = useUserStore()
const secretStore = useSecretStore()
const tokenStore = useTokenStore()
const serviceStore = useServiceStore()

const loadStores = async () => {
  serviceStore.loadServices()
  await secretStore.loadEncryptedSecret()
  if (!secretStore.encryptedSecret) {
    // return router.push('/onboard')
    return
  }

  // go to unlock secret page if the secret is not defined.
  // This can occur if the user has reopened the app. I think...
  if (!secretStore.secret) {
    return router.push('/unlock')
  }

  // load the refresh token. if the refresh token is not found, we assume user is not logged in and does not use an account
  await tokenStore.loadRefreshToken()
  if (!tokenStore.refresh_token) {
    return router.push('/')
  }

  // start loading user data
  const userPromise = userStore.initializeUser()

  // Load access token and make sure it isnt expired
  await tokenStore.loadAccessToken()
  if (!tokenStore.access_token) {
    return router.push('/')
  }

  // if the access token is expired, refresh it
  if (tokenStore.isAccessExpired()) {
    await tokenStore.refreshAccessToken()
  }

  // Load user data
  await userPromise
  
  // No username? try to get with access token
  if (!userStore.username) {
    await userStore.refreshUserData()
  }

  // if username still not set, do something. I dont know what yet
  if (!userStore.username) {
    return router.push('/')
  }
  
}

loadStores()

</script>
