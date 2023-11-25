import { api } from 'boot/axios'

interface ServiceResponse {


}

export const createService = async (name: string, domain: string) => {
  try {
    const { data } = await api.post<ServiceResponse>('/service/create', {
      name,
      domain
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
