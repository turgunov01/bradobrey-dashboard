<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

import { certificateCreateSchema } from '~~/shared/schemas'
import { formatDateTime } from '~/utils/format'
import { flattenServicesPayload } from '~/utils/services'

type CertificateRow = {
  code: string
  created_at: string | null
  expires_at: string | null
  id: string
  is_used: boolean
  metadata: Record<string, unknown> | null
  service_ids: string[]
}

function normalizeText(value: unknown) {
  if (value === undefined || value === null) {
    return null
  }

  const text = String(value).trim()

  return text || null
}

function extractCertificateRows(response: unknown): CertificateRow[] {
  if (!response || typeof response !== 'object') {
    return []
  }

  const payload = response as {
    certificates?: unknown[]
    data?: unknown[]
    items?: unknown[]
  }

  const items = Array.isArray(payload.items)
    ? payload.items
    : Array.isArray(payload.certificates)
      ? payload.certificates
      : Array.isArray(payload.data)
        ? payload.data
        : []

  return items.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return []
    }

    const certificate = item as Record<string, unknown>

    return [{
      code: String(certificate.code || ''),
      created_at: normalizeText(certificate.created_at),
      expires_at: normalizeText(certificate.expires_at),
      id: String(certificate.id || ''),
      is_used: Boolean(certificate.is_used),
      metadata: certificate.metadata && typeof certificate.metadata === 'object'
        ? certificate.metadata as Record<string, unknown>
        : null,
      service_ids: Array.isArray(certificate.service_ids)
        ? certificate.service_ids.map(serviceId => String(serviceId))
        : []
    }] satisfies CertificateRow[]
  }).filter(item => Boolean(item.id && item.code))
}

function formatMetadataPreview(value: Record<string, unknown> | null) {
  if (!value || !Object.keys(value).length) {
    return 'Пусто'
  }

  const serialized = JSON.stringify(value)

  return serialized.length > 90
    ? `${serialized.slice(0, 90)}...`
    : serialized
}

const certificatesApi = useCertificatesApi()
const kioskApi = useKioskApi()

const createModalOpen = ref(false)
const lookupModalOpen = ref(false)

const form = reactive({
  code: '',
  expires_at: '',
  metadata: '{}',
  service_ids: [] as string[]
})

const lookupCode = ref('')
const lookupResult = ref<unknown>(null)

const certificateColumns: TableColumn<CertificateRow>[] = [
  { accessorKey: 'code', header: 'Код' },
  { id: 'services', header: 'Услуги' },
  { accessorKey: 'expires_at', header: 'Действует до' },
  { id: 'metadata', header: 'Метаданные' },
  { id: 'status', header: 'Статус' }
]

const { data, pending, refresh } = await useAsyncData('certificates-dashboard', async () => {
  const [servicesResult, certificatesResult] = await Promise.allSettled([
    kioskApi.services({ active: true, grouped: false }),
    certificatesApi.listActive()
  ])

  return {
    certificates: certificatesResult.status === 'fulfilled'
      ? extractCertificateRows(certificatesResult.value)
      : [] as CertificateRow[],
    services: servicesResult.status === 'fulfilled'
      ? flattenServicesPayload(servicesResult.value)
      : []
  }
})

const services = computed(() => data.value?.services || [])
const activeCertificates = computed(() => data.value?.certificates || [])

const serviceNameMap = computed(() =>
  new Map(
    services.value.map(service => [String(service.id), service.name || `Услуга ${service.id}`])
  )
)

const serviceOptions = computed(() =>
  services.value.map(service => ({
    label: `${service.name || 'Услуга без названия'} / ${service.duration_minutes ?? service.duration ?? 0} мин`,
    value: String(service.id)
  }))
)

const createModalDescription = computed(() =>
  'Заполните код, набор услуг и срок действия нового сертификата.'
)

const lookupModalDescription = computed(() =>
  'Введите код сертификата и получите его текущий статус и payload.'
)

watch(createModalOpen, (open) => {
  if (!open) {
    resetCreateForm()
  }
})

watch(lookupModalOpen, (open) => {
  if (!open) {
    resetLookupState()
  }
})

function resetCreateForm() {
  form.code = ''
  form.expires_at = ''
  form.metadata = '{}'
  form.service_ids = []
}

function resetLookupState() {
  lookupCode.value = ''
  lookupResult.value = null
}

function openCreateModal() {
  resetCreateForm()
  createModalOpen.value = true
}

function openLookupModal() {
  resetLookupState()
  lookupModalOpen.value = true
}

async function createCertificate() {
  let metadata: Record<string, unknown> | undefined

  try {
    metadata = form.metadata ? JSON.parse(form.metadata) : undefined
  }
  catch {
    useApiClient().notifyError(new Error('Метаданные должны быть валидным JSON'))
    return
  }

  const payload = certificateCreateSchema.safeParse({
    code: form.code,
    expires_at: form.expires_at || undefined,
    metadata,
    service_ids: form.service_ids
  })

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Некорректные данные сертификата'))
    return
  }

  await certificatesApi.create(payload.data)
  await refresh()
  createModalOpen.value = false
}

async function lookupCertificate() {
  if (!lookupCode.value) {
    useApiClient().notifyError(new Error('Введите код сертификата'))
    return
  }

  lookupResult.value = await certificatesApi.lookup(lookupCode.value)
}
</script>

<template>
  <UDashboardPanel id="certificates">
    <template #header>
      <UDashboardNavbar title="Сертификаты" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Обновить
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
        <template #header>
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Активный реестр
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Действующие сертификаты
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <UBadge color="neutral" size="lg" variant="soft">
                {{ activeCertificates.length }} активных
              </UBadge>
              <UButton color="primary" icon="i-lucide-plus" @click="openCreateModal">
                Создать
              </UButton>
              <UButton color="neutral" icon="i-lucide-search" variant="outline" @click="openLookupModal">
                Проверить
              </UButton>
            </div>
          </div>
        </template>

        <div v-if="activeCertificates.length" class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
          <div class="max-h-[42rem] overflow-auto">
            <UTable
              :columns="certificateColumns"
              :data="activeCertificates"
              :loading="pending"
              sticky="header"
              :ui="{
                root: 'w-full overflow-auto',
                base: 'w-full min-w-[72rem]',
                thead: 'bg-charcoal-50/90',
                tbody: 'divide-y divide-charcoal-100',
                th: 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500',
                td: 'px-4 py-4 text-sm text-charcoal-700 align-middle'
              }"
            >
              <template #code-cell="{ row }">
                <span class="font-mono font-medium text-charcoal-950">{{ row.original.code }}</span>
              </template>

              <template #services-cell="{ row }">
                <div class="flex max-w-[22rem] flex-wrap gap-2">
                  <UBadge
                    v-for="serviceId in row.original.service_ids"
                    :key="serviceId"
                    color="neutral"
                    variant="soft"
                  >
                    {{ serviceNameMap.get(serviceId) || serviceId }}
                  </UBadge>
                </div>
              </template>

              <template #expires_at-cell="{ row }">
                {{ row.original.expires_at ? formatDateTime(row.original.expires_at) : 'Без срока' }}
              </template>

              <template #metadata-cell="{ row }">
                <span class="block max-w-[18rem] truncate text-charcoal-500">
                  {{ formatMetadataPreview(row.original.metadata) }}
                </span>
              </template>

              <template #status-cell="{ row }">
                <SharedStatusBadge :label="row.original.is_used ? 'used' : 'active'" />
              </template>
            </UTable>
          </div>
        </div>

        <SharedEmptyState
          v-else
          description="Не найдено ни одного действующего сертификата."
          icon="i-lucide-id-card"
          title="Активных сертификатов нет"
        />
      </UCard>

      <UModal
        v-model:open="createModalOpen"
        class="sm:max-w-2xl"
        :description="createModalDescription"
        title="Создать сертификат"
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Код сертификата">
              <UInput v-model="form.code" />
            </UFormField>

            <UFormField label="Услуги">
              <USelectMenu
                v-model="form.service_ids"
                class="w-full"
                :items="serviceOptions"
                multiple
                placeholder="Выберите услуги"
                value-key="value"
              />
            </UFormField>

            <UFormField label="Действует до">
              <UInput v-model="form.expires_at" type="date" />
            </UFormField>

            <UFormField label="JSON метаданных">
              <UTextarea v-model="form.metadata" :rows="5" />
            </UFormField>
          </div>
        </template>

        <template #footer="{ close }">
          <div class="flex w-full flex-wrap justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="resetCreateForm">
              Сбросить
            </UButton>
            <UButton color="neutral" variant="ghost" @click="close">
              Закрыть
            </UButton>
            <UButton color="primary" icon="i-lucide-id-card" @click="createCertificate">
              Создать сертификат
            </UButton>
          </div>
        </template>
      </UModal>

      <UModal
        v-model:open="lookupModalOpen"
        class="sm:max-w-2xl"
        :description="lookupModalDescription"
        title="Проверить сертификат"
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Код сертификата">
              <UInput v-model="lookupCode" />
            </UFormField>

            <div class="flex justify-end">
              <UButton color="neutral" icon="i-lucide-search" variant="outline" @click="lookupCertificate">
                Проверить
              </UButton>
            </div>

            <SharedJsonBlock v-if="lookupResult" label="Ответ поиска" :value="lookupResult" />
          </div>
        </template>

        <template #footer="{ close }">
          <div class="flex w-full flex-wrap justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="resetLookupState">
              Сбросить
            </UButton>
            <UButton color="neutral" variant="ghost" @click="close">
              Закрыть
            </UButton>
          </div>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>
