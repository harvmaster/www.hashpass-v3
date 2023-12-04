import { api } from 'boot/axios'

export const getServices = async () => {
  try {
    const { data } = await api.post<ServiceListResponse>('/service/')

    return data.services
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