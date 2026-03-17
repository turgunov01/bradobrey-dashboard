<script setup lang="ts">
import { formatCount } from '~/utils/format'
import { asNumber, pickValue, toKeyLabel } from '~/utils/normalize'

definePageMeta({
  middleware: 'barber-auth'
})

const branchStore = useBranchStore()
const sessionStore = useSessionStore()
const uiStore = useUiStore()
const barbersApi = useBarbersApi()
const promoApi = usePromoApi()
const statisticsApi = useStatisticsApi()

useRealtimeQueue()

await Promise.all([
  branchStore.ensureLoaded(),
  sessionStore.ensureLoaded()
])

const { data, pending, refresh } = await useAsyncData('overview-dashboard', async () => {
  const [health, queue, promoDashboard, statistics] = await Promise.all([
    $fetch('/api/health'),
    sessionStore.barber?.id
      ? barbersApi.queue()
      : Promise.resolve({ count: 0, items: [] }),
    promoApi.dashboard(),
    statisticsApi.global({
      end_date: uiStore.statisticsRange.end,
      start_date: uiStore.statisticsRange.start
    })
  ])

  return {
    health,
    promoDashboard,
    queue,
    statistics
  }
}, {
  watch: [() => uiStore.statisticsRange.end, () => uiStore.statisticsRange.start]
})

const promoItems = computed(() => {
  const dashboard = data.value?.promoDashboard as any

  if (Array.isArray(dashboard)) {
    return dashboard
  }

  if (Array.isArray(dashboard?.items)) {
    return dashboard.items
  }

  return []
})

const branchSummaries = computed(() =>
  branchStore.branches.map(branch => ({
    id: branch.id,
    isActive: branch.id === branchStore.activeBranchId,
    name: branch.name
  }))
)

const statisticsHighlights = computed(() => {
  const payload = data.value?.statistics as Record<string, any> || {}
  const desired = [
    pickValue(payload, ['revenue', 'total_revenue', 'amount', 'total_amount'], '0'),
    pickValue(payload, ['orders', 'queue_count', 'total_clients', 'count'], '0'),
    pickValue(payload, ['completed', 'completed_orders', 'done'], '0')
  ]

  return [
    {
      description: 'Global output across the selected range',
      icon: 'i-lucide-wallet',
      label: 'Revenue hint',
      value: desired[0] ?? '0'
    },
    {
      description: 'Tracked queue volume from the analytics endpoint',
      icon: 'i-lucide-users-round',
      label: 'Orders hint',
      value: desired[1] ?? '0'
    },
    {
      description: 'Completed traffic detected in the analytics payload',
      icon: 'i-lucide-check-check',
      label: 'Completed hint',
      value: desired[2] ?? '0'
    }
  ]
})

const statRows = computed(() =>
  Object.entries(data.value?.statistics || {})
    .filter(([, value]) => ['number', 'string'].includes(typeof value))
    .slice(0, 8)
)

type ShortcutItem = {
  description: string
  icon: string
  title: string
  to: string
}

const shortcuts = computed(() =>
  [
    sessionStore.barber?.id
      ? { description: 'Run queue actions and break controls', icon: 'i-lucide-scissors-line-dashed', title: 'Workspace', to: '/barbers/workspace' }
      : null,
    { description: 'Create kiosk bookings and test branch flows', icon: 'i-lucide-monitor-smartphone', title: 'Kiosk', to: '/kiosk' },
    { description: 'Manage grouped service definitions', icon: 'i-lucide-badge-dollar-sign', title: 'Services', to: '/services' },
    { description: 'Inspect every request and response through Nuxt', icon: 'i-lucide-code-xml', title: 'API debug', to: '/api-debug' }
  ].filter((shortcut): shortcut is ShortcutItem => Boolean(shortcut))
)
</script>

<template>
  <UDashboardPanel id="overview">
    <template #header>
      <UDashboardNavbar title="Overview" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UBadge :color="data?.health ? 'primary' : 'neutral'" variant="soft">
            {{ data?.health ? 'API reachable' : 'Checking API' }}
          </UBadge>
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Refresh
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <div class="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          <DashboardMetricCard
            description="Current items assigned to the authenticated barber queue."
            icon="i-lucide-clock-3"
            label="Live queue"
            :value="formatCount(data?.queue?.count)"
          />
          <DashboardMetricCard
            description="Branches loaded from kiosk configuration."
            icon="i-lucide-map"
            label="Branches"
            :value="formatCount(branchStore.branches.length)"
          />
          <DashboardMetricCard
            description="Promo code records reported by the dashboard endpoint."
            icon="i-lucide-ticket-percent"
            label="Promo entries"
            :value="formatCount(promoItems.length)"
          />
          <DashboardMetricCard
            description="Primary health endpoint state."
            icon="i-lucide-heart-pulse"
            label="Health"
            :value="data?.health ? 'OK' : 'Pending'"
          />
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Shop pulse
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Quick operational reading
                </h2>
              </div>
            </template>

            <div class="grid gap-4 md:grid-cols-3">
              <DashboardMetricCard
                v-for="card in statisticsHighlights"
                :key="card.label"
                :description="card.description"
                :icon="card.icon"
                :label="card.label"
                :value="card.value"
              />
            </div>

            <div class="mt-6 grid gap-3">
              <div
                v-for="[key, value] in statRows"
                :key="key"
                class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
              >
                <div class="flex items-center justify-between gap-4">
                  <span class="text-sm font-medium text-charcoal-700">{{ toKeyLabel(key) }}</span>
                  <span class="text-sm font-semibold text-charcoal-950">{{ value }}</span>
                </div>
                <div class="mt-3 h-2 rounded-full bg-sand-100">
                  <div
                    class="h-full rounded-full bg-brass-400"
                    :style="{ width: `${Math.min(asNumber(value, 0), 100)}%` }"
                  />
                </div>
              </div>
            </div>
          </UCard>

          <div class="space-y-6">
            <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
              <template #header>
                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                    Branches
                  </p>
                  <h2 class="barbershop-heading text-2xl text-charcoal-950">
                    Active branch context
                  </h2>
                </div>
              </template>

              <div class="space-y-3">
                <div
                  v-for="branch in branchSummaries"
                  :key="branch.id"
                  :class="[
                    branch.isActive ? 'border-brass-300 bg-brass-50' : 'border-charcoal-200 bg-white/80',
                    'rounded-[1.25rem] border px-4 py-3'
                  ]"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="font-medium text-charcoal-950">{{ branch.name }}</p>
                      <p class="text-xs uppercase tracking-[0.18em] text-charcoal-500">
                        {{ branch.isActive ? 'Current context' : 'Available branch' }}
                      </p>
                    </div>
                    <UButton
                      color="neutral"
                      size="xs"
                      variant="outline"
                      @click="branchStore.setActiveBranch(branch.id)"
                    >
                      Use branch
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>

            <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
              <template #header>
                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                    Shortcuts
                  </p>
                  <h2 class="barbershop-heading text-2xl text-charcoal-950">
                    Jump into tools
                  </h2>
                </div>
              </template>

              <div class="grid gap-3 sm:grid-cols-2">
                <NuxtLink
                  v-for="shortcut in shortcuts"
                  :key="shortcut.to"
                  :to="shortcut.to"
                  class="rounded-[1.35rem] border border-charcoal-200 bg-white/80 p-4 transition hover:border-brass-300 hover:bg-brass-50/50"
                >
                  <div class="flex items-start gap-3">
                    <div class="flex size-10 items-center justify-center rounded-2xl bg-sand-100 text-brass-700">
                      <UIcon :name="shortcut.icon" class="size-5" />
                    </div>
                    <div class="space-y-1">
                      <p class="font-medium text-charcoal-950">{{ shortcut.title }}</p>
                      <p class="text-sm leading-6 text-charcoal-500">{{ shortcut.description }}</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
