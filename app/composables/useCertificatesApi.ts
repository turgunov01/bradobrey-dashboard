import type { CertificateCreatePayload } from '~~/shared/schemas'

export function useCertificatesApi() {
  const client = useApiClient()
  const kioskApi = useKioskApi()

  return {
    create(payload: CertificateCreatePayload) {
      return client.request('/api/certificate/add', {
        body: payload,
        method: 'POST',
        successMessage: 'Сертификат создан'
      })
    },
    listActive() {
      return client.request('/api/certificate/active')
    },
    lookup(code: string) {
      return kioskApi.certificate(code)
    }
  }
}
