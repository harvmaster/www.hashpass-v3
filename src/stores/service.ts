import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { encrypt, decrypt } from 'src/crypto/aes'
import Services from 'src/data/services'

interface ServiceStore {
  services: Service[];
}

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [] as Service[]
  } as ServiceStore),

  actions: {
    fetchServices: async function() {
      // Fetch the services from the API
      try {
        const { data } = await api.get<Service[]>('/services')

        return data
      } catch (err) {
        console.error(err)
        return []
      }
    },
    fetchService: async function(name: string) {
      // Fetch the service from the API
      try {
        const { data } = await api.get<Service>(`/services/${name}`)
        const serviceIndex = this.services.findIndex(service => service.name === name)
        if (serviceIndex >= 0) {
          const currentService = this.services[serviceIndex]
          this.services[serviceIndex] = {...currentService, ...data}
        } else {
          this.services.push(data)
        }
        return data
      } catch (err) {
        console.error(err)
        return null
      }
    },
    loadServices: function() {
      // Test Code
      const services = Services as Service[]
      this.services = services

      return;

      // Load the services from the local storage
      // const services = LocalStorage.getItem('services')
      if (services) {
        // const decryptedServices = services.map(service => decrypt(service.notes))
        this.services = services
      }
    }
  }
})