<script setup lang="ts">
import { promoCreateSchema, promoUseSchema, promoValidateSchema } from '~~/shared/schemas'

definePageMeta({
  middleware: 'barber-auth'
})

const promoApi = usePromoApi()

const createForm = reactive({
  code: '',
  discount_type: 'percent',
  discount_value: 10,
  expires_at: '',
  is_active: true
})
const validateForm = reactive({
  code: '',
  order_total: 0,
  user_id: ''
})
const useFormState = reactive({
  order_id: '',
  phone: '',
  promo_code: '',
  user_id: '',
  user_name: ''
})

const validateResult = ref<unknown>(null)
const useResult = ref<unknown>(null)
const selectedPromoId = ref('')

const { data, pending, refresh } = await useAsyncData('promo-dashboard', async () => {
  const dashboard = await promoApi.dashboard()
  const items = Array.isArray((dashboard as any)?.items) ? (dashboard as any).items : Array.isArray(dashboard) ? dashboard as any[] : []

  return {
    items
  }
})

watch(
  () => data.value?.items || [],
  (items) => {
    if (!items.length) {
      selectedPromoId.value = ''
      return
    }

    if (!items.some((item: any) => String(item.id) === selectedPromoId.value)) {
      selectedPromoId.value = String(items[0].id || '')
    }
  },
  { immediate: true }
)

const selectedPromo = computed(() =>
  (data.value?.items || []).find((item: any) => String(item.id) === selectedPromoId.value) || null
)

async function createPromo() {
  const payload = promoCreateSchema.safeParse(createForm)

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid promo payload'))
    return
  }

  await promoApi.create(payload.data)
  createForm.code = ''
  await refresh()
}

async function validatePromo() {
  const payload = promoValidateSchema.safeParse(validateForm)

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid validation payload'))
    return
  }

  validateResult.value = await promoApi.validate(payload.data)
}

async function usePromoCode() {
  const payload = promoUseSchema.safeParse(useFormState)

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid promo usage payload'))
    return
  }

  useResult.value = await promoApi.use(payload.data)
}
</script>

<template>
  <UDashboardPanel id="promo">
    <template #header>
      <UDashboardNavbar title="Promo Codes" :ui="{ right: 'gap-3' }">
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
      <div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div class="space-y-6">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Dashboard
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Promo inventory
                </h2>
              </div>
            </template>

            <div v-if="data?.items?.length" class="space-y-3">
              <button
                v-for="item in data.items"
                :key="String(item.id || item.code)"
                :class="[
                  String(item.id) === selectedPromoId ? 'border-brass-300 bg-brass-50' : 'border-charcoal-200 bg-white/80',
                  'w-full rounded-[1.25rem] border p-4 text-left transition'
                ]"
                type="button"
                @click="selectedPromoId = String(item.id)"
              >
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="font-medium text-charcoal-950">{{ item.code }}</p>
                    <p class="text-sm text-charcoal-500">
                      Usage {{ item.usage_count || 0 }} · {{ item.discount_type || 'discount' }} {{ item.discount_value || 0 }}
                    </p>
                  </div>
                  <SharedStatusBadge :label="item.is_active ? 'active' : 'inactive'" />
                </div>
              </button>
            </div>
            <SharedEmptyState
              v-else
              description="The promo dashboard endpoint returned no promo codes."
              icon="i-lucide-ticket-percent"
              title="No promo codes"
            />
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Create
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Add a new promo code
                </h2>
              </div>
            </template>

            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField class="sm:col-span-2" label="Code">
                <UInput v-model="createForm.code" />
              </UFormField>
              <UFormField label="Discount type">
                <UInput v-model="createForm.discount_type" />
              </UFormField>
              <UFormField label="Discount value">
                <UInput v-model="createForm.discount_value" type="number" />
              </UFormField>
              <UFormField label="Expires at">
                <UInput v-model="createForm.expires_at" type="date" />
              </UFormField>
              <div class="flex items-end">
                <UCheckbox v-model="createForm.is_active" label="Promo is active" />
              </div>
            </div>

            <div class="mt-4 flex justify-end">
              <UButton color="primary" icon="i-lucide-plus" @click="createPromo">
                Create promo code
              </UButton>
            </div>
          </UCard>
        </div>

        <div class="space-y-6">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Detail
                </p>
                <h2 class="barbershop-heading text-2xl text-charcoal-950">
                  Selected promo snapshot
                </h2>
              </div>
            </template>

            <div v-if="selectedPromo" class="space-y-3">
              <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">Code</p>
                <p class="mt-2 text-lg font-semibold text-charcoal-950">{{ selectedPromo.code }}</p>
              </div>
              <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">Usage count</p>
                <p class="mt-2 text-lg font-semibold text-charcoal-950">{{ selectedPromo.usage_count || 0 }}</p>
              </div>
              <SharedJsonBlock label="Promo payload" :value="selectedPromo" />
            </div>
            <SharedEmptyState
              v-else
              description="Select a promo code from the dashboard list to inspect its raw payload."
              icon="i-lucide-badge-help"
              title="No promo selected"
            />
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Validate
                </p>
                <h2 class="barbershop-heading text-2xl text-charcoal-950">
                  Test promo validation
                </h2>
              </div>
            </template>

            <div class="space-y-4">
              <UFormField label="Code">
                <UInput v-model="validateForm.code" />
              </UFormField>
              <UFormField label="Order total">
                <UInput v-model="validateForm.order_total" type="number" />
              </UFormField>
              <UButton color="neutral" icon="i-lucide-badge-check" variant="outline" @click="validatePromo">
                Validate code
              </UButton>
              <SharedJsonBlock v-if="validateResult" label="Validation response" :value="validateResult" />
            </div>
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Use
                </p>
                <h2 class="barbershop-heading text-2xl text-charcoal-950">
                  Record promo usage
                </h2>
              </div>
            </template>

            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField class="sm:col-span-2" label="Promo code">
                <UInput v-model="useFormState.promo_code" />
              </UFormField>
              <UFormField label="User name">
                <UInput v-model="useFormState.user_name" />
              </UFormField>
              <UFormField label="Phone">
                <UInput v-model="useFormState.phone" />
              </UFormField>
              <UFormField label="User ID">
                <UInput v-model="useFormState.user_id" />
              </UFormField>
              <UFormField label="Order ID">
                <UInput v-model="useFormState.order_id" />
              </UFormField>
            </div>

            <div class="mt-4 space-y-4">
              <UButton color="primary" icon="i-lucide-badge-plus" @click="usePromoCode">
                Record usage
              </UButton>
              <SharedJsonBlock v-if="useResult" label="Usage response" :value="useResult" />
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
