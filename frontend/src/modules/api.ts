import { notification } from "antd"
import axios, { AxiosRequestConfig } from "axios"

export const useApi = (endpoint: string, accessToken?: string) => {
  let baseUrl = process.env.REACT_APP_API_URL

  // Staging and Production env checking
  if (baseUrl.includes("{prefix}")) {
    const subdomainPrefix = window.location.hostname.split("-")[0]
    baseUrl = baseUrl.replace("{prefix}", subdomainPrefix)
  }

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  })

  const tokenExpired = (e) => {
    if (e && e.response?.status === 401 && window.location.pathname !== "/signin") {
      localStorage.removeItem("token")
      window.location.replace("/signin")
    } else
      notification.error({
        message: "Error",
        description:
          e.response?.status === 404 || e.response?.status === 500
            ? "Sorry something went wrong!"
            : e.response?.error,
      })
    throw e
  }

  const post = (payload?: Record<string, any>, customEndpoint?: string) => {
    return api
      .post(customEndpoint ?? endpoint, payload)
      .then((res) => {
        return res.data
      })
      .catch((e) => tokenExpired(e))
  }

  const put = (payload?: Record<string, any>, customEndpoint?: string) => {
    return api
      .put(customEndpoint ?? endpoint, payload)
      .then((res) => {
        return res.data
      })
      .catch((e) => tokenExpired(e))
  }

  const get = (query?: string, config?: AxiosRequestConfig, customEndpoint?: string) => {
    return api
      .get(customEndpoint ?? endpoint, config)
      .then((res) => {
        return res.data
      })
      .catch((e) => tokenExpired(e))
  }

  return {
    get,
    post,
    put,
  }
}

export const useApiWithAuth = (endpoint?: string) => {
  const accessToken = localStorage.getItem("token")

  return useApi(endpoint || "", accessToken || undefined)
}
