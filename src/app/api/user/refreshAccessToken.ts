import { api } from "src/boot/axios";

export const refreshAccessToken = async (refresh_token: string) => {
  try {
    const { data } = await api.post<UserAuthResponse>('/user/refreshAccessToken', {
      refresh_token
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

export default refreshAccessToken