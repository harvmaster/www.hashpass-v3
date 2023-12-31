import { api } from 'boot/axios'

export const createService = async (name: string, domain: string, encoding: ServiceEncoding = 'base58', logo = '') => {
  try {
    const { data } = await api.post<ServiceResponse>('/service/create', {
      name,
      domain,
      encoding,
      logo
    })

    return data.service
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

export default createService