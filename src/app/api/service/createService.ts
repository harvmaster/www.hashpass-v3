import { api } from 'boot/axios'

export const createService = async (name: string, domain: string, logo = '') => {
  try {
    const { data } = await api.post<Service>('/service/create', {
      name,
      domain,
      logo
    })

    return data
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
