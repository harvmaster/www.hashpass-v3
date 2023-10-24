<template>
  <q-layout view="lHh Lpr lFf" v-scroll="onScroll">
    <!-- <q-header class="reduce-z shadow-1">
      <div class="row">
        <div class="col-12 row justify-between q-pa-xs do-transition" :style="accountButtonStyles">
          <div class="col row q-pa-xs">
            <q-img src="/icons/account_icon.png" class="col-auto square full-height q-pa-sm" @click="openHeader" />
          </div>
            <div class="col-auto row justify-end items-end">
              <div class="col-auto row justify-end">
                <q-btn class="col-auto square" flat round icon="settings" to="/settings"/>
              </div>
            </div>
        </div>
      </div>
    </q-header> -->

    <q-page-container>
        <router-view v-slot="{Component, route}">
          <transition :enter-active-class="route.meta.enterTransition" :leave-active-class="route.meta.exitTransition" mode="out-in">
            <keep-alive v-if="route.meta.keepAlive !== false">
              <component :is="Component" />
            </keep-alive>
            <component v-else :is="Component" />
          </transition>
        </router-view>
    </q-page-container>

    <div class="fab-container" v-if="$route.path == '/'">
      <hash-button />
    </div>

    <q-footer bordered class="bg-grey-3 text-primary q-pb-lg">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8">
        <q-route-tab
          icon="qr_code_scanner"
          to="/scan"
          exact
          :ripple="false"
        />
        <q-route-tab
          icon="shield"
          to="/"
          exact
          :ripple="false"
        />
        <q-route-tab
          icon="settings"
          to="/settings"
          exact
          :ripple="false"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss">
.do-transition {
  transition: all 0.5s;
}
.image-limit {
  max-width: 60vw;
  aspect-ratio: 1;
}
.square {
  aspect-ratio: 1;
}

.reduce-z {
  z-index: 1 !important;
}

.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translateY(calc(0px - v-bind(footerHeight)));
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import HashButton from 'components/HashButton.vue';

const router = useRouter()
router.beforeEach((to, from) => {
  const rightIn = 'animated slideInRight'
  const rightOut = 'animated slideOutRight'
  const leftIn = 'animated slideInLeft'
  const leftOut = 'animated slideOutLeft'

  const direction = (to.meta.routePosition as number) > (from.meta.routePosition as number) ? 0 : 1
  
  to.meta.exitTransition = direction ? rightOut : leftOut
  to.meta.enterTransition = direction ? leftIn : rightIn
})

const headerHeight = 3.5;
const accountButtonStyles = computed(() => {
  const height = headerSize.value > 120 ? headerHeight * 2 : headerHeight
  return {
    height: `${height}em`
  }
})

const headerSize = ref(0)
const lastScroll = ref(0)
const onScroll = (e: Event) => {
  const difference =  lastScroll.value - window.scrollY
  // headerSize.value = Math.min(Math.max(headerSize.value + difference, 0), 150)
  lastScroll.value = window.scrollY;
}

const openHeader = () => {
  // headerSize.value = 121
}

const footerHeight = computed(() => {
  const footer = document.querySelector('.q-footer')
  return `${footer?.clientHeight}px`
})
</script>
