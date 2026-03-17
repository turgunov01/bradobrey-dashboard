import type { CertificateCreatePayload } from '~~/shared/schemas'

export function useCertificatesApi() {
  const client = useApiClient()
  const kioskApi = useKioskApi()

  return {
    create(payload: CertificateCreatePayload) {
      return client.request('/api/certificate/add', {
        body: payload,
        method: 'POST',
        successMessage: 'Certificate created'
      })
    },
    lookup(code: string) {
      return kioskApi.certificate(code)
    }
  }
}
