<template>
  <div
    class="flex items-center justify-center"
    style="height: 100vh;"
  >
    <div class="text-center">
      <h1 class="text-4xl font-bold">Hashpass</h1>
      <p class="text-xl">The password manager that never stores your passwords.</p>
      <div class="mt-8">
        <q-btn
          color="primary"
          label="Sign in with biometrics"
          @click="signIn"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
