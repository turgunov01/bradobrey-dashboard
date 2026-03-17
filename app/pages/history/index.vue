<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

import { formatDateTime, formatMoney } from '~/utils/format'
import { asArray } from '~/utils/normalize'

definePageMeta({
  middleware: 'barber-auth'
})

const branchStore = useBranchStore()
const historyApi = useHistoryApi()
const uiStore = useUiStore()

await branchStore.ensureLoaded()

const columns: TableColumn<any>[] = [
  { accessorKey: 'customer_name', header: 'Client' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'payment_method', header: 'Payment' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'created_at', header: 'Created' }
]

const { data, pending, refresh } = await useAsyncData('history-global', async () => {
  const [globalHistory, branchHistory] = await Promise.all([
    historyApi.list({ filter: uiStore.historyFilter }),
    branchStore.activeBranchId ? historyApi.branch(branchStore.activeBranchId) : Promise.resolve([])
  ])

  return {
    branchHistory: asArray(branchHistory as any),
    globalHistory: asArray(globalHistory as any)
  }
}, {
  watch: [() => branchStore.activeBranchId, () => uiStore.historyFilter]
})
</script>

<template>
  <UDashboardPanel id="history-global">
    <template #header>
      <UDashboardNavbar title="History" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <div class="flex flex-wrap gap-2">
            <UButton
              :color="uiStore.historyFilter === 'all' ? 'primary' : 'neutral'"
              :variant="uiStore.historyFilter === 'all' ? 'solid' : 'outline'"
              size="xs"
              @click="uiStore.setHistoryFilter('all')"
            >
              All
            </UButton>
            <UButton
              :color="uiStore.historyFilter === 'retention' ? 'primary' : 'neutral'"
              :variant="uiStore.historyFilter === 'retention' ? 'solid' : 'outline'"
              size="xs"
              @click="uiStore.setHistoryFilter('retention')"
            >
              Retention
            </UButton>
            <UButton
              :color="uiStore.historyFilter === 'loyal' ? 'primary' : 'neutral'"
              :variant="uiStore.historyFilter === 'loyal' ? 'solid' : 'outline'"
              size="xs"
              @click="uiStore.setHistoryFilter('loyal')"
            >
              Loyal
            </UButton>
          </div>
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Refresh
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="grid gap-6 xl:grid-cols-2">
        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Global
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Filtered history explorer
              </h2>
            </div>
          </template>

          <div v-if="data?.globalHistory?.length" class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
            <UTable
              :columns="columns"
              :data="data.globalHistory"
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
          <SharedEmptyState
            v-else
            description="No global history items matched the current filter."
            icon="i-lucide-history"
            title="No history rows"
          />
        </UCard>

        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Branch
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                {{ branchStore.activeBranch?.name || 'Select a branch' }}
              </h2>
            </div>
          </template>

          <div v-if="data?.branchHistory?.length" class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
            <UTable
              :columns="columns"
              :data="data.branchHistory"
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
          <SharedEmptyState
            v-else
            description="No branch history rows were returned for the active branch."
            icon="i-lucide-map-pinned"
            title="No branch history"
          />
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
