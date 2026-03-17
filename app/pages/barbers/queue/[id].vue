<script setup lang="ts">
import { queueEditBeforeCompleteSchema, queueUpdateSchema } from '~~/shared/schemas'
import { formatDateTime, formatMoney } from '~/utils/format'

definePageMeta({
  middleware: 'barber-auth'
})

const route = useRoute()
const barbersApi = useBarbersApi()
const kioskApi = useKioskApi()

const queueId = computed(() => String(route.params.id))
const updateForm = reactive({
  payment_method: '',
  service_ids: [] as string[],
  status: ''
})
const overrideForm = reactive({
  amount: 0,
  reason: ''
})

const { data, pending, refresh } = await useAsyncData('barber-queue-detail', async () => {
  const [detail, services] = await Promise.all([
    barbersApi.queueItem(queueId.value, { silent: true }),
    kioskApi.services({ active: true, grouped: true })
  ])

  return {
    detail,
    services
  }
}, {
  watch: [queueId]
})

const queueItem = computed<Record<string, any> | null>(() => (data.value?.detail as any)?.data || null)
const queueStatusCode = computed(() => (data.value?.detail as any)?.status || 200)

const flatServices = computed(() => {
  const payload = data.value?.services as any

  if (Array.isArray(payload?.services)) {
    return payload.services
  }

  if (Array.isArray(payload?.categories)) {
    return payload.categories.flatMap((category: any, index: number) =>
      (category.services || []).map((service: any) => ({
        ...service,
        category_name: category.name || category.title || `Category ${index + 1}`
      }))
    )
  }

  return []
})

const serviceOptions = computed(() =>
  flatServices.value.map((service: any) => ({
    label: `${service.name || 'Unnamed service'}${service.category_name ? ` • ${service.category_name}` : ''}`,
    value: String(service.id)
  }))
)

watch(
  queueItem,
  (item) => {
    updateForm.status = item?.status || ''
    updateForm.payment_method = item?.payment_method || ''
    updateForm.service_ids = Array.isArray(item?.service_ids)
      ? item.service_ids.map((value: string | number) => String(value))
      : item?.service_id
        ? [String(item.service_id)]
        : []

    overrideForm.amount = Number(item?.price_override ?? item?.amount ?? 0)
    overrideForm.reason = item?.price_override_reason || ''
  },
  { immediate: true }
)

async function submitUpdate() {
  const payload = queueUpdateSchema.safeParse({
    payment_method: updateForm.payment_method || undefined,
    service_ids: updateForm.service_ids.length ? updateForm.service_ids : undefined,
    status: updateForm.status || undefined
  })

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid queue update'))
    return
  }

  await barbersApi.updateQueue(queueId.value, payload.data)
  await refresh()
}

async function saveOverride() {
  const payload = queueEditBeforeCompleteSchema.safeParse(overrideForm)

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid completion override'))
    return
  }

  await barbersApi.updateQueueBeforeComplete(queueId.value, payload.data)
  await refresh()
}

async function callEntry() {
  await barbersApi.callQueue(queueId.value)
  await refresh()
}

async function startEntry() {
  await barbersApi.startQueue(queueId.value)
  await refresh()
}

async function completeEntry() {
  await barbersApi.completeQueue(queueId.value)
  await refresh()
}

async function markNoShow() {
  await barbersApi.updateQueueNoShow(queueId.value, { no_show: true })
  await refresh()
}

async function markNotInTime() {
  await barbersApi.updateQueueNotInTime(queueId.value)
  await refresh()
}
</script>

<template>
  <UDashboardPanel id="queue-detail">
    <template #header>
      <UDashboardNavbar :title="queueItem?.customer_name || `Queue Entry ${queueId}`" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton color="neutral" icon="i-lucide-arrow-left" to="/barbers/workspace" variant="outline">
            Back
          </UButton>
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Refresh
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <UAlert
          v-if="queueStatusCode === 209"
          color="warning"
          icon="i-lucide-badge-alert"
          title="Completed queue entry"
          description="The backend returned HTTP 209 for this record. The detail view remains readable, but the entry is already completed."
          variant="soft"
        />

        <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Queue summary
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Track the current visit
                </h2>
              </div>
            </template>

            <div v-if="queueItem" class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">Status</p>
                <div class="mt-3">
                  <SharedStatusBadge :label="queueItem.status" />
                </div>
              </div>
              <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">Payment</p>
                <p class="mt-3 text-lg font-semibold capitalize text-charcoal-950">{{ queueItem.payment_method || 'pending' }}</p>
              </div>
              <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">Created</p>
                <p class="mt-3 text-lg font-semibold text-charcoal-950">{{ formatDateTime(queueItem.created_at) }}</p>
              </div>
              <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">Amount</p>
                <p class="mt-3 text-lg font-semibold text-charcoal-950">{{ formatMoney(queueItem.amount) }}</p>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-3">
              <UButton color="neutral" icon="i-lucide-phone-call" variant="outline" @click="callEntry">
                Call
              </UButton>
              <UButton color="primary" icon="i-lucide-play" variant="outline" @click="startEntry">
                Start
              </UButton>
              <UButton color="primary" icon="i-lucide-check-check" @click="completeEntry">
                Complete
              </UButton>
            </div>
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Update
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Adjust services and status
                </h2>
              </div>
            </template>

            <div class="space-y-5">
              <UFormField label="Status">
                <UInput v-model="updateForm.status" placeholder="waiting, started, completed" />
              </UFormField>

              <UFormField label="Payment method">
                <UInput v-model="updateForm.payment_method" placeholder="cash, card, certificate" />
              </UFormField>

              <UFormField label="Services">
                <USelectMenu
                  v-model="updateForm.service_ids"
                  class="w-full"
                  :items="serviceOptions"
                  multiple
                  placeholder="Select one or more services"
                  value-key="value"
                />
              </UFormField>

              <div class="flex justify-end">
                <UButton color="primary" icon="i-lucide-save" @click="submitUpdate">
                  Save queue changes
                </UButton>
              </div>

              <div class="rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">
                  Edit before complete
                </p>

                <div class="mt-4 grid gap-4 sm:grid-cols-[0.45fr_0.55fr]">
                  <UFormField label="Amount override">
                    <UInput v-model="overrideForm.amount" type="number" />
                  </UFormField>
                  <UFormField label="Reason">
                    <UInput v-model="overrideForm.reason" placeholder="Adjustment reason" />
                  </UFormField>
                </div>

                <div class="mt-4 flex justify-end">
                  <UButton color="neutral" icon="i-lucide-pencil-line" variant="outline" @click="saveOverride">
                    Save override
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Flags
                </p>
                <h2 class="barbershop-heading text-2xl text-charcoal-950">
                  Exceptional outcomes
                </h2>
              </div>
            </template>

            <div class="space-y-3">
              <UButton block color="warning" icon="i-lucide-user-round-x" variant="outline" @click="markNotInTime">
                Mark not in time
              </UButton>
              <UButton block color="error" icon="i-lucide-ban" variant="outline" @click="markNoShow">
                Mark no-show
              </UButton>
            </div>
          </UCard>

          <SharedJsonBlock label="Raw queue payload" :value="queueItem || {}" />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
