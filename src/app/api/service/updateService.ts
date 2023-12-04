import { api } from 'boot/axios'

export const updateService = async (updateBody: Service) => {
  try {
    const { data } = await api.post<ServiceResponse>('/service/update', {
      ...updateBody
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

export default updateService