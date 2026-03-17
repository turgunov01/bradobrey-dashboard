<script setup lang="ts">
definePageMeta({
  middleware: 'barber-auth'
})

const sessionStore = useSessionStore()
const barbersApi = useBarbersApi()
const breakMinutes = ref(10)

useRealtimeQueue()

await sessionStore.ensureLoaded()

const { data, pending, refresh } = await useAsyncData('barber-workspace', async () => {
  const [me, queue] = await Promise.all([
    barbersApi.me({ silent: true }),
    barbersApi.queue()
  ])

  return {
    me,
    queue
  }
})

async function startBreak() {
  await barbersApi.break({ minutes: Number(breakMinutes.value) })
  await Promise.all([sessionStore.ensureLoaded(), refresh()])
}

async function returnFromBreak() {
  await barbersApi.returnFromBreak()
  await Promise.all([sessionStore.ensureLoaded(), refresh()])
}

async function callItem(item: any) {
  await barbersApi.callQueue(String(item.id))
  await refresh()
}

async function startItem(item: any) {
  await barbersApi.startQueue(String(item.id))
  await refresh()
}

async function completeItem(item: any) {
  await barbersApi.completeQueue(String(item.id))
  await refresh()
}

function openItem(item: any) {
  return navigateTo(`/barbers/queue/${item.id}`)
}
</script>

<template>
  <UDashboardPanel id="workspace">
    <template #header>
      <UDashboardNavbar title="Barber Workspace" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UBadge :color="sessionStore.barber?.is_on_break ? 'warning' : 'primary'" variant="soft">
            {{ sessionStore.barber?.is_on_break ? 'On break' : 'On shift' }}
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
            description="Current live items for the authenticated barber."
            icon="i-lucide-clock-3"
            label="Queue items"
            :value="data?.queue?.count || 0"
          />
          <DashboardMetricCard
            description="Assigned barber branch context."
            icon="i-lucide-map-pinned"
            label="Branch"
            :value="sessionStore.barber?.branch_id || 'Unknown'"
          />
          <DashboardMetricCard
            description="Optional workload signal from kiosk roster."
            icon="i-lucide-users-round"
            label="Current clients"
            :value="sessionStore.barber?.current_clients || 0"
          />
          <DashboardMetricCard
            description="Estimated waiting time reported by the backend."
            icon="i-lucide-timer"
            label="Wait estimate"
            :value="`${sessionStore.barber?.estimated_waiting_time || 0} min`"
          />
        </div>

        <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Profile
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  {{ sessionStore.user?.name || 'Barber session' }}
                </h2>
              </div>
            </template>

            <div class="space-y-5">
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Login</p>
                  <p class="mt-2 text-lg font-semibold text-charcoal-950">{{ sessionStore.user?.login || 'Not provided' }}</p>
                </div>
                <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Specialization</p>
                  <p class="mt-2 text-lg font-semibold text-charcoal-950">{{ sessionStore.barber?.specialization || 'General services' }}</p>
                </div>
              </div>

              <div class="space-y-3 rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Break controls</p>
                <div class="flex flex-wrap items-end gap-3">
                  <UFormField label="Minutes" name="minutes">
                    <UInput v-model="breakMinutes" min="1" type="number" />
                  </UFormField>
                  <UButton icon="i-lucide-coffee" @click="startBreak">
                    Start break
                  </UButton>
                  <UButton color="neutral" icon="i-lucide-undo-2" variant="outline" @click="returnFromBreak">
                    Return
                  </UButton>
                </div>
              </div>

              <UAlert
                color="neutral"
                description="Queue updates, call events, and kiosk changes are refreshed again on backend Socket.IO queue:update events."
                icon="i-lucide-radio-tower"
                title="Realtime queue sync"
                variant="soft"
              />
            </div>
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Live queue
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Action the current queue
                </h2>
              </div>
            </template>

            <div v-if="data?.queue?.items?.length">
              <QueueTable
                :items="data.queue.items"
                :loading="pending"
                @call="callItem"
                @complete="completeItem"
                @open="openItem"
                @start="startItem"
              />
            </div>
            <SharedEmptyState
              v-else
              description="No live queue items were returned for the authenticated barber."
              icon="i-lucide-sofa"
              title="Queue is clear"
            />
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
