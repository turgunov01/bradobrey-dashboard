<script setup lang="ts">
import { formatCount } from '~/utils/format'
import { asNumber, toKeyLabel } from '~/utils/normalize'

definePageMeta({
  middleware: 'barber-auth'
})

const branchStore = useBranchStore()
const sessionStore = useSessionStore()
const uiStore = useUiStore()
const kioskApi = useKioskApi()
const statisticsApi = useStatisticsApi()

await Promise.all([
  branchStore.ensureLoaded(),
  sessionStore.ensureLoaded()
])

const scope = ref<'barber' | 'branch' | 'global'>('global')
const selectedBarberId = ref('')

const { data, pending, refresh } = await useAsyncData('statistics-dashboard', async () => {
  const query = {
    end_date: uiStore.statisticsRange.end,
    start_date: uiStore.statisticsRange.start
  }

  const [stats, barbers] = await Promise.all([
    scope.value === 'branch' && branchStore.activeBranchId
      ? statisticsApi.branch(branchStore.activeBranchId, query)
      : scope.value === 'barber' && selectedBarberId.value
        ? statisticsApi.barber(selectedBarberId.value, query)
        : statisticsApi.global(query),
    branchStore.activeBranchId ? kioskApi.barbers(branchStore.activeBranchId) : Promise.resolve({ data: [] })
  ])

  return {
    barbers: Array.isArray((barbers as any)?.data) ? (barbers as any).data : [],
    stats
  }
}, {
  watch: [
    () => branchStore.activeBranchId,
    () => scope.value,
    () => selectedBarberId.value,
    () => uiStore.statisticsRange.end,
    () => uiStore.statisticsRange.start
  ]
})

watch(
  () => (data.value?.barbers || []) as any[],
  (barbers) => {
    if (!barbers.length) {
      selectedBarberId.value = ''
      return
    }

    if (!barbers.some(barber => String(barber.id) === selectedBarberId.value)) {
      selectedBarberId.value = String(barbers[0].id)
    }
  },
  { immediate: true }
)

const barbersOptions = computed(() =>
  ((data.value?.barbers || []) as any[]).map(barber => ({
    label: barber.name || barber.user?.name || `Barber ${barber.id}`,
    value: String(barber.id)
  }))
)

const metricRows = computed(() =>
  Object.entries(data.value?.stats || {})
    .filter(([, value]) => ['number', 'string'].includes(typeof value))
)
</script>

<template>
  <UDashboardPanel id="statistics">
    <template #header>
      <UDashboardNavbar title="Statistics" :ui="{ right: 'gap-3' }">
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
      <div class="space-y-6">
        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <div class="grid gap-4 lg:grid-cols-[0.35fr_0.25fr_0.2fr_0.2fr]">
            <UFormField label="Start date">
              <UInput v-model="uiStore.statisticsRange.start" type="date" />
            </UFormField>
            <UFormField label="End date">
              <UInput v-model="uiStore.statisticsRange.end" type="date" />
            </UFormField>
            <UFormField label="Scope">
              <USelectMenu
                v-model="scope"
                :items="[
                  { label: 'Global', value: 'global' },
                  { label: 'Branch', value: 'branch' },
                  { label: 'Barber', value: 'barber' }
                ]"
                value-key="value"
              />
            </UFormField>
            <UFormField v-if="scope === 'barber'" label="Barber">
              <USelectMenu v-model="selectedBarberId" :items="barbersOptions" value-key="value" />
            </UFormField>
          </div>
        </UCard>

        <div class="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          <DashboardMetricCard
            description="Numeric metrics discovered in the analytics payload."
            icon="i-lucide-chart-column"
            label="Metric count"
            :value="formatCount(metricRows.length)"
          />
          <DashboardMetricCard
            description="Current query scope."
            icon="i-lucide-scan-search"
            label="Scope"
            :value="scope"
          />
          <DashboardMetricCard
            description="Active branch for scoped analytics."
            icon="i-lucide-map-pinned"
            label="Branch"
            :value="branchStore.activeBranch?.name || 'No branch'"
          />
          <DashboardMetricCard
            description="Selected barber when using barber scope."
            icon="i-lucide-user-round"
            label="Barber"
            :value="barbersOptions.find(option => option.value === selectedBarberId)?.label || 'N/A'"
          />
        </div>

        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Analytics bars
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Lightweight visual summary
              </h2>
            </div>
          </template>

          <div v-if="metricRows.length" class="space-y-3">
            <div
              v-for="[key, value] in metricRows"
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
          <SharedEmptyState
            v-else
            description="The selected analytics response did not contain top-level numeric fields."
            icon="i-lucide-chart-no-axes-column"
            title="No simple metrics to display"
          />
        </UCard>

        <SharedJsonBlock label="Raw analytics payload" :value="data?.stats || {}" />
      </div>
    </template>
  </UDashboardPanel>
</template>
