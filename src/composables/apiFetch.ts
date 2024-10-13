export const useApiFetch = <T>(path: string, opts: Object = {}) => {
  const { logout } = useAuth()
  const { showAlert } = useNotification()
  const runtimeConfig = useRuntimeConfig()
  const authToken = useCookie('auth-token')

  if (authToken.value) { opts = { ...opts, ...{ headers: { Authorization: `Bearer ${authToken.value}` } } } }

  return $fetch<T>(path, {
    baseURL: import.meta.server ? runtimeConfig.public.serverApiUrl : runtimeConfig.public.clientApiUrl,
    onResponseError ({ response }) {
      const status = response.status
      const message = response._data.message ?? ''

      if (status === 404 || status === 403) {
        throw createError({ statusCode: status, message })
      } else if (status === 401) {
        logout()
      } else if (status >= 500) {
        if (import.meta.server) {
          throw createError({ statusCode: status, message })
        } else {
          showAlert({
            message: 'alert-server-error',
            type: 'error',
            translate: true
          })
        }
      } else if (status === 400 && message) {
        let text = message
        let params: string[] = []

        if (message.includes('|')) {
          text = message.split('|')[0]
          params = message.split('|').slice(1)
        }

        showAlert({
          message: `alert-warning.${text}`,
          params,
          type: 'warning',
          translate: true
        })
      }
    },
    ...(opts && { ...opts })
  })
}
