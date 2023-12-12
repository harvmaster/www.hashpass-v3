import { api } from 'boot/axios'
import { decrypt } from 'src/ServiceWorker'
import decryptNotes from 'src/app/services/decryptNotes'

interface GetServicesOptions {
  decrypt?: boolean
}

const defaultOptions: GetServicesOptions = {
  decrypt: true
}

export const getServices = async (options: GetServicesOptions = defaultOptions) => {
  try {
    const { data } = await api.post<ServiceListResponse>('/service/')

    let services: (Service | EncryptedService)[] = data.services
    if (options.decrypt) {
      services = await Promise.all(services.map(async (service) => {
        service.notes = await decryptNotes(service.notes)
        return service
      }))
    }
    
    return services
  } catch (err: any) {
    console.log(err)
    if (err?.response?.status === 400) {
      throw new Error(err.response.data.error)
    }
    if (err?.response?.status === 401) {
      throw new Error(err.response.data.error)
    }

    throw new Error(err)
  }
}

export default getServices