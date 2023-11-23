import { api } from "src/boot/axios";

export const getUser = async (access_token: string) => {
  try {
    const { data } = await api.get<User>('/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
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
    if (err?.response?.status === 404) {
      throw new Error(err.response.data.error)
    }

    throw new Error(err)
  }
}

export default getUser