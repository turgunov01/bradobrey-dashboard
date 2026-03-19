<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

import type { HistoryItem } from '~~/shared/schemas'
import { formatDateTime, formatMoney } from '~/utils/format'
import { formatPaymentMethod } from '~/utils/display'

function extractHistoryItems(response: unknown): HistoryItem[] {
  if (Array.isArray(response)) {
    return response as HistoryItem[]
  }

  if (!response || typeof response !== 'object') {
    return []
  }

  const payload = response as {
    data?: HistoryItem[] | { items?: HistoryItem[] }
    items?: HistoryItem[]
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  if (Array.isArray(payload.data?.items)) {
    return payload.data.items
  }

  return []
}

const branchStore = useBranchStore()
const historyApi = useHistoryApi()

const page = ref(1)
const itemsPerPage = 10

await branchStore.ensureLoaded()

const columns: TableColumn<HistoryItem>[] = [
  { accessorKey: 'phone_number', header: 'КЛИЕНТ' },
  { accessorKey: 'status', header: 'СТАТУС' },
  { accessorKey: 'payment_method', header: 'ОПЛАТА' },
  { accessorKey: 'amount', header: 'СУММА' },
  { accessorKey: 'created_at', header: 'СОЗДАНО' }
]

const { data, pending, refresh } = await useAsyncData('history-current-filter', async () => {
  if (!branchStore.activeBranchId) {
    return [] as HistoryItem[]
  }

  const response = await historyApi.branch(branchStore.activeBranchId)

  return extractHistoryItems(response)
}, {
  watch: [() => branchStore.activeBranchId]
})

const historyItems = computed(() => data.value || [])

const paginatedHistory = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return historyItems.value.slice(start, start + itemsPerPage)
})

const pageFrom = computed(() =>
  historyItems.value.length ? (page.value - 1) * itemsPerPage + 1 : 0
)

const pageTo = computed(() =>
  historyItems.value.length
    ? Math.min(page.value * itemsPerPage, historyItems.value.length)
    : 0
)

watch(
  () => branchStore.activeBranchId,
  () => {
    page.value = 1
  }
)

watch(
  () => historyItems.value.length,
  (length) => {
    const maxPage = Math.max(1, Math.ceil(length / itemsPerPage))

    if (page.value > maxPage) {
      page.value = maxPage
    }
  }
)
</script>

<template>
  <UDashboardPanel id="history-global">
    <template #header>
      <UDashboardNavbar title="История" :ui="{ right: 'gap-3' }">
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
                История
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                История филиала
              </h2>
              <p class="text-sm text-charcoal-500">
                Таблица показывает записи для филиала, выбранного в BranchSelector.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <UBadge color="neutral" size="lg" variant="soft">
                {{ branchStore.activeBranch?.name || 'Филиал не выбран' }}
              </UBadge>
              <UBadge color="neutral" variant="outline">
                {{ historyItems.length }} записей
              </UBadge>
            </div>
          </div>
        </template>

        <div v-if="historyItems.length" class="space-y-4">
          <div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
            <UTable :columns="columns" :data="paginatedHistory" :loading="pending" sticky="header" :ui="{
              root: 'w-full overflow-auto',
              base: 'w-full min-w-[64rem]',
              thead: 'bg-charcoal-50/90',
              tbody: 'divide-y divide-charcoal-100',
              th: 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500',
            }">
              <template #phone_number-cell="{ row }">
                <span class="font-medium text-charcoal-950">
                  {{ row.original.phone_number || 'Не указан' }}
                </span>
              </template>

              <template #status-cell="{ row }">
                <SharedStatusBadge :label="row.original.status" />
              </template>

              <template #payment_method-cell="{ row }">
                {{ formatPaymentMethod(row.original.payment_method) }}
              </template>

              <template #amount-cell="{ row }">
                {{ formatMoney(row.original.amount) }}
              </template>

              <template #created_at-cell="{ row }">
                {{ formatDateTime(row.original.created_at) }}
              </template>
            </UTable>
          </div>

          <div
            class="flex flex-col gap-3 border-t border-charcoal-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-charcoal-500">
              Показано {{ pageFrom }}-{{ pageTo }} из {{ historyItems.length }}
            </p>

            <UPagination v-model:page="page" active-color="primary" active-variant="solid"
              :items-per-page="itemsPerPage" :show-controls="true" :sibling-count="1" :total="historyItems.length" />
          </div>
        </div>

        <div v-else class="rounded-[1.25rem] border border-dashed border-charcoal-200 bg-white/70 px-5 py-6">
          <p class="text-base font-semibold text-charcoal-950">
            История не найдена
          </p>
          <p class="mt-2 text-sm text-charcoal-500">
            Для выбранного филиала записи отсутствуют.
          </p>
        </div>
      </UCard>
    </template>
  </UDashboardPanel>
</template>
