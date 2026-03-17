<script setup lang="ts">
import { certificateCreateSchema } from '~~/shared/schemas'

definePageMeta({
  middleware: 'barber-auth'
})

const certificatesApi = useCertificatesApi()
const kioskApi = useKioskApi()

const form = reactive({
  code: '',
  expires_at: '',
  metadata: '{}',
  service_ids: [] as string[]
})
const lookupCode = ref('')
const lookupResult = ref<unknown>(null)

const { data, pending, refresh } = await useAsyncData('certificates-dashboard', async () => {
  return await kioskApi.services({ active: true, grouped: false })
})

const serviceOptions = computed(() =>
  ((data.value as any)?.services || []).map((service: any) => ({
    label: `${service.name || 'Unnamed service'} • ${service.duration || 0} min`,
    value: String(service.id)
  }))
)

async function createCertificate() {
  let metadata: Record<string, unknown> | undefined

  try {
    metadata = form.metadata ? JSON.parse(form.metadata) : undefined
  }
  catch {
    useApiClient().notifyError(new Error('Metadata must be valid JSON'))
    return
  }

  const payload = certificateCreateSchema.safeParse({
    code: form.code,
    expires_at: form.expires_at || undefined,
    metadata,
    service_ids: form.service_ids
  })

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid certificate payload'))
    return
  }

  await certificatesApi.create(payload.data)
  form.code = ''
  form.expires_at = ''
  form.metadata = '{}'
  form.service_ids = []
}

async function lookupCertificate() {
  if (!lookupCode.value) {
    useApiClient().notifyError(new Error('Certificate code is required'))
    return
  }

  lookupResult.value = await certificatesApi.lookup(lookupCode.value)
}
</script>

<template>
  <UDashboardPanel id="certificates">
    <template #header>
      <UDashboardNavbar title="Certificates" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Refresh
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Create
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Issue a new certificate
              </h2>
            </div>
          </template>

          <div class="space-y-4">
            <UFormField label="Certificate code">
              <UInput v-model="form.code" />
            </UFormField>
            <UFormField label="Services">
              <USelectMenu
                v-model="form.service_ids"
                class="w-full"
                :items="serviceOptions"
                multiple
                placeholder="Select services"
                value-key="value"
              />
            </UFormField>
            <UFormField label="Expires at">
              <UInput v-model="form.expires_at" type="date" />
            </UFormField>
            <UFormField label="Metadata JSON">
              <UTextarea v-model="form.metadata" :rows="5" />
            </UFormField>
            <div class="flex justify-end">
              <UButton color="primary" icon="i-lucide-id-card" @click="createCertificate">
                Create certificate
              </UButton>
            </div>
          </div>
        </UCard>

        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Lookup
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Check a certificate
              </h2>
            </div>
          </template>

          <div class="space-y-4">
            <UFormField label="Certificate code">
              <UInput v-model="lookupCode" />
            </UFormField>

            <UButton color="neutral" icon="i-lucide-search" variant="outline" @click="lookupCertificate">
              Lookup certificate
            </UButton>

            <SharedJsonBlock v-if="lookupResult" label="Lookup response" :value="lookupResult" />
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
