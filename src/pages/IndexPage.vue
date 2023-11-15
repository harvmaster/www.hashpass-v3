<template>
  <q-page class="row fit items-start justify-evenly bg-white">
    <div class="col-12 row">
      <!-- q-col-gutter-lg -->
      <!-- <q-select v-model="sort" :options="sortOptions" emit-value filled  icon="sort"/> -->
      <div class="col-12 row justify-between q-pa-sm">
        <div class="col">
          <q-input borderless v-model="search" label="Search" />
        </div>
        <q-btn icon="sort" flat>
          <q-menu>
            <q-list bordered>
              <q-item v-for="option of sortOptions" :key="option.value" clickable v-ripple @click="() => setSort(option.value)" :class="sort == option.value ? 'bg-grey-3' : ''">
                <q-item-section>{{ option.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn icon="lock" flat @click="test"/>
      </div>
      <transition-group
        name="flip-list"
      >
        <service-item class="col-12 q-pa-sm" v-for="service of serviceList" :service="service" :key="service.name" @click="() => routeToService(service.name)"/>
      </transition-group>
    </div>
    
  </q-page>
</template>

<style scoped lang="scss">
.relative {
  position: relative;
}
.flip-list-move {
  transition: transform 1s;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ServiceItem from 'src/components/App/ServiceListItem/ServiceItem.vue';
import { useServiceStore } from 'stores/service'

import hp3 from 'src/crypto/passwordGenerators/hp3';
import messageHandler from 'src/ServiceWorker/MessgeHandler';
import { createBase58Password } from 'src/ServiceWorker/PasswordGenerators'
import { setSecret, unlockSecret } from 'src/ServiceWorker/User'
import { encrypt, decrypt } from 'src/crypto/aes';

const test = async () => {
  // console.time('hashing')
  // const password = serviceStore.services.slice(0, 10).map(service => {
  //   return hp3('secret', service.name)
  // })
  // console.timeEnd('hashing')
  // messageHandler.createMessage('test', 'test')
  
  const secret = await encrypt('test', 'test')
  await setSecret(secret)
  await unlockSecret('test')

  const generateRandomString = () => {
    const length = 12
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const bigtest = new Array(10).fill(0).map(() => {
    return generateRandomString()
  })
  console.time('hashing')
  const password = bigtest.map(service => {
    return createBase58Password(service)
  })
  
  await Promise.all(password)
  console.timeEnd('hashing')

  console.time('memo')
  const password2 = bigtest.map(service => {
    return createBase58Password(service)
  })
  
  await Promise.all(password2)
  console.timeEnd('memo')

  // console.time('local')
  // const local = bigtest.map(service => {
  //   return hp3('test', service)
  // })
  // console.timeEnd('local')


  // createBase58Password('test')
}

const router = useRouter()

const sortOptions = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Recently Added',
    value: 'dateAdded'
  },
  {
    label: 'Recently Used',
    value: 'dateUsed'
  },
  {
    label: 'Times Used',
    value: 'timesUsed'
  }
]
const sort = ref('dateAdded')
const setSort = (value: string) => {
  sort.value = value
}

const search = ref('')

const serviceStore = useServiceStore();

const services = ref(serviceStore.services);
const serviceList = computed(() => {
  return [...services.value].sort((a, b) => {
    if (sort.value === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sort.value === 'dateAdded') {
      return b.dateAdded - a.dateAdded
    } else if (sort.value === 'dateUsed') {
      return b.dateUsed - a.dateUsed
    } else if (sort.value === 'timesUsed') {
      return b.timesUsed - a.timesUsed
    }
    else {
      return 0;
    }
  }).filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const routeToService = (name: string) => {
  router.push('/service/' + name)
}
</script>
