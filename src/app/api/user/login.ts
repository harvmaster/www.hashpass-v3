import { api } from "src/boot/axios";

export const login = async (username: string, password: string) => {
  try {
    const { data } = await api.post<UserAuthResponse>('/user/login', {
      username,
      password
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

export default login