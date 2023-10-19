<template>
  <q-page class="flex flex-center signup-page q-pa-lg">
    <transition
      name=""
    >
    <div  class="signup-container row">
      <div class="username col-12 row q-pa-sm">
        <div class="col-12 text-weight-bold q-pa-sm">Your username</div>
        <q-input class="col-12" v-model="username" type="username" outlined rounded placeholder="Unique Username"/>
      </div>
      <div class="password col-12 row q-pa-sm">
        <div class="col-12 text-weight-bold q-pa-sm">Choose a password</div>
        <q-input class="col-12" v-model="password" type="password" placeholder="min. 8 characters" outlined rounded />
      </div>
      <div class="submit col-12 row q-pa-sm">
        <q-btn class="col-12 q-pa-sm" unelevated rounded label="Sign up" color="primary" :disabled="validInputs" @click="onSubmit"/>
        <div class="col-12 text-weight-bold text-center q-py-lg">
          Already have an account? <router-link to="/login" class="to-login">Login</router-link>
        </div>
      </div>
    </div>
  </transition>
  </q-page>
</template>

<style scoped lang="scss">
.signup-page {
  min-height: 100vh;
  background-color: white;
}
.signup-container {
  min-width: 80vw;
}
.to-login {
  color: $primary;
  text-decoration: none;
}
</style>

<script setup>
import { api } from 'src/boot/axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const validInputs = computed(() => {
  return username.value.length < 1 || password.value.length < 8;
});

const username = ref('');
const password = ref('');

const router = useRouter();

const onSubmit = async () => {
  const keypair = await createKeyPair();
  console.log(keypair.publicKey)
  // api.post('/users', {
  //   username: username.value,
  // })
};
</script>
