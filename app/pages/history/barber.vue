<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

import { formatDateTime, formatMoney } from '~/utils/format'
import { asArray } from '~/utils/normalize'

definePageMeta({
  middleware: 'barber-auth'
})

const historyApi = useHistoryApi()
const uiStore = useUiStore()

const limit = ref(10)
const offset = ref(0)

const columns: TableColumn<any>[] = [
  { accessorKey: 'customer_name', header: 'Client' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'payment_method', header: 'Payment' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'created_at', header: 'Created' }
]

const { data, pending, refresh } = await useAsyncData('barber-history', async () => {
  const response = await historyApi.barber({
    limit: limit.value,
    offset: offset.value,
    status: uiStore.barberHistoryStatus || undefined
  })

  const items = asArray(response as any)

  return {
    items,
    total: (response as any)?.total || items.length
  }
}, {
  watch: [limit, offset, () => uiStore.barberHistoryStatus]
})
</script>

<template>
  <UDashboardPanel id="barber-history">
    <template #header>
      <UDashboardNavbar title="Barber History" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UInput v-model="uiStore.barberHistoryStatus" class="w-44" placeholder="Filter by status" />
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Refresh
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
        <template #header>
          <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Authenticated view
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Paged barber history
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <UFormField label="Limit">
                <UInput v-model="limit" min="1" type="number" />
              </UFormField>
            </div>
          </div>
        </template>

        <div v-if="data?.items?.length" class="space-y-4">
          <div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
            <UTable
              :columns="columns"
              :data="data.items"
              :loading="pending"
              :ui="{
                thead: 'bg-charcoal-50/90',
                tbody: 'divide-y divide-charcoal-100',
                th: 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500',
                td: 'px-4 py-4 text-sm text-charcoal-700 align-middle'
              }"
            >
              <template #status-cell="{ row }">
                <SharedStatusBadge :label="row.original.status" />
              </template>
              <template #amount-cell="{ row }">
                {{ formatMoney(row.original.amount) }}
              </template>
              <template #created_at-cell="{ row }">
                {{ formatDateTime(row.original.created_at) }}
              </template>
            </UTable>
          </div>

          <div class="flex items-center justify-between gap-4">
            <p class="text-sm text-charcoal-500">
              Offset {{ offset }} · Showing {{ data.items.length }} of {{ data.total }}
            </p>
            <div class="flex gap-3">
              <UButton color="neutral" :disabled="offset === 0" variant="outline" @click="offset = Math.max(offset - limit, 0)">
                Previous
              </UButton>
              <UButton color="neutral" :disabled="data.items.length < limit" variant="outline" @click="offset += limit">
                Next
              </UButton>
            </div>
          </div>
        </div>
        <SharedEmptyState
          v-else
          description="No barber history rows were returned for the current filter and pagination state."
          icon="i-lucide-scroll-text"
          title="No barber history"
        />
      </UCard>
    </template>
  </UDashboardPanel>
</template>
