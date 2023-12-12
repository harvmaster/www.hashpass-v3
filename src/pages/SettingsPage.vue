<template>
  <q-page class="row items-start justify-evenly bg-grey-1 ">
    <q-list class="fit" separator>
      <q-expansion-item
        v-model="algorithmExpanded"
        icon="memory"
        label="Default Algorithm"
        caption="Change your default algorithm"
      >
        <div class="row justify-center q-pa-md">
          <toggle-select class="col-12" :selected="selectedAlgorithm" :select="selectAlgorithm" :options="algorithms" :containerStyle="{ backgroundColor: '#eeeeee' }"/>
          <transition
            appear
            :duration="250"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <div class="col-12 q-pt-md" :key="algorithmDescription">
              <div class="col-12 text-center text-weight-bold text-h6" :style="`color: ${algorithmColor }`" :key="algorithmSecurity">
                {{ algorithmSecurity }}
              </div>
              <div class="col-12 text-center" :key="algorithmDescription">
                {{ algorithmDescription }}
              </div>
            </div>
          </transition>
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-model="pinCodeExpanded"
        icon="password"
        label="Pin code"
        caption="Secure your passwords with a pin"
        label-class="text-weight-bold"
      >
        <div class="row justify-center q-pa-md">
          <div class="col-12">
            <q-toggle
              v-model="pinToggle"
              color="primary"
              label="Pin Code"
            />
          </div>
          <div class="col-12 text-center q-pa-md">
            <q-btn class="fit" outline label="Change Pin" color="primary" :disable="!pinToggle" to="/settings/pin" />
          </div>
        </div>
        <div class="row justify-center q-pa-md">
          <div class="col-12">
            <q-toggle
              v-model="timeoutToggle"
              :disable="!pinToggle"
              color="primary"
              label="Timeout"
            />
          </div>
          <div class="col-12 text-center">
            {{ timeoutValue }}
          </div>
          <div class="col-7">
            <q-slider :disable="!timeoutToggle" class="fit" v-model="timeoutSlider" :min="0" :max="8" :step="1" />
          </div>
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-model="AccountSecurityExpanded"
        icon="lock"
        label="Security"
        caption="Manage Account Security"
      >
        <div class="row justify-center q-pa-md q-col-gutter-y-md">
          <div class="col-12 row">
            <div class="col-12 row">
              <q-btn class="col-12" flat label="Sign out" color="primary" />
            </div>
            <div class="col-12 row justify-center q-pb-sm">
              <q-btn class="col-12" outline label="Change Account Password" rounded color="red" />
            </div>
            <div class="col-12">
              <q-btn class="fit" label="Change Master Password" color="red" />
            </div>
          </div>  
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-model="debugOptions"
        icon="bug_report"
        label="Tests"
        caption="Debug and test"
      >
        <div class="row justify-center q-pa-md q-col-gutter-y-md">
          <div class="col-12 row">
            <div class="col-12 row">
              <q-btn class="col-12" flat label="Test Passwords" color="primary" @click="() => testPasswordGeneratorsWithNotification()"/>
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="set Secret" color="primary" @click="() => testSetSecret()"/>
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="unlock secret" color="primary" @click="() => testUnlockSecret()"/>
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="lock secret" color="primary" @click="() => testLockSecret()"/>
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="isLocked" color="primary" @click="() => testIsLockedWithNotification()" />
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="isValidPin True" color="primary" @click="() => testIsValidPin()" />
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="isValidPin False" color="primary" @click="() => testIsInvalidPin()" />
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="start timeout" color="primary" @click="() => testStartTimeout()" />
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="stop timeout" color="primary" @click="() => testStopTimeout()" />
            </div>
            <div class="col-12 row">
              <q-btn class="col-12" flat label="Test Encryption" color="primary" @click="() => testEncryption()" />
            </div>
          </div>  
        </div>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<style scoped lang="scss">

</style>
  
<script setup lang="ts">
import { setSecret, unlockSecret, isLocked } from 'src/ServiceWorker/User'
import { testPasswordGenerators, testSetSecret, testUnlockSecret, testIsLocked, testIsValidPin, testIsInvalidPin, testStartTimeout, testStopTimeout, testLockSecret, testEncryption } from 'src/ServiceWorker/tests'

import ToggleSelect from 'src/components/Inputs/ToggleSelect.vue'
import { computed, ref } from 'vue'
import { Notify } from 'quasar'

const algorithmExpanded = ref(false)
const selectedAlgorithm = ref('v1')
const selectAlgorithm = (algorithm: string) => {
  selectedAlgorithm.value = algorithm
}

const algorithms = [
  {
    label: 'v1',
    value: 'v1',
    color: '#ef5350',
    description: 'Lgeacy Algorithm',
    security: 'Low'
  },
  {
    label: 'v2',
    value: 'v2',
    color: '#ffca28',
    description: 'Hex Based Output',
    security: 'Secure'
  },
  {
    label: 'v3',
    value: 'v3',
    color: '#66bb6a',
    description: 'Base58 Output',
    security: 'Recommended'
  }
]
const getSelectedAlgorithm = () => {
  return algorithms.find(algorithm => algorithm.value == selectedAlgorithm.value)
}
const algorithmDescription = computed(() => {
  return getSelectedAlgorithm()?.description || ''
})
const algorithmSecurity = computed(() => {
  return getSelectedAlgorithm()?.security || ''
})
const algorithmColor = computed(() => {
  return getSelectedAlgorithm()?.color || ''
})

const autoLockExpanded = ref(false)
const timeoutToggle = ref(false)
const timeoutSlider = ref(0)
const timeoutMarkers = ref(['instantly', '30 Seconds', '1 Minute', '2 Minutes', '5 Minutes', '10 Minutes', '30 Minutes', '1 Hour', 'Never'])
const timeoutValue = computed(() => {
  let value = timeoutSlider.value
  return timeoutMarkers.value[value]
})

const pinCodeExpanded = ref(false)
const pinToggle = ref(false)

const AccountSecurityExpanded = ref(false)
const toPasswordReset = () => {
  return
}

const debugOptions = ref(true)
const testPasswordGeneratorsWithNotification = async () => {
  const result = await testPasswordGenerators()
  if (!result) {
    return Notify.create({
      message: 'Test Failed',
      color: 'red',
      icon: 'close'
    })
  }
  Notify.create({
    message: `Legacy: ${result.legacy}, Hex: ${result.hex}, Base58: ${result.base58}`,
    color: result ? 'green' : 'red',
    icon: result ? 'check' : 'close'
  })
}

const testIsLockedWithNotification = async () => {
  const result = await testIsLocked()
  if (!result) {
    return Notify.create({
      message: 'Test Failed',
      color: 'red',
      icon: 'close'
    })
  }

  return Notify.create({
    message: `isLocked: ${result.data}`,
    color: result ? 'green' : 'red',
    icon: result ? 'check' : 'close'
  })
}

</script>
  