<script setup lang="ts">
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
      <UDashboardNavbar title="Рабочее место барбера" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UBadge :color="sessionStore.barber?.is_on_break ? 'warning' : 'primary'" variant="soft">
            {{ sessionStore.barber?.is_on_break ? 'На перерыве' : 'На смене' }}
          </UBadge>
          <UButton color="neutral" icon="i-lucide-refresh-cw" :loading="pending" variant="outline" @click="refresh()">
            Обновить
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <div class="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          <DashboardMetricCard
            description="Текущие активные записи для авторизованного барбера."
            icon="i-lucide-clock-3"
            label="Элементы очереди"
            :value="data?.queue?.count || 0"
          />
          <DashboardMetricCard
            description="Контекст филиала, назначенный барберу."
            icon="i-lucide-map-pinned"
            label="Филиал"
            :value="sessionStore.barber?.branch_id || 'Неизвестно'"
          />
          <DashboardMetricCard
            description="Дополнительный индикатор нагрузки из состава киоска."
            icon="i-lucide-users-round"
            label="Текущие клиенты"
            :value="sessionStore.barber?.current_clients || 0"
          />
          <DashboardMetricCard
            description="Оценка времени ожидания по данным бэкенда."
            icon="i-lucide-timer"
            label="Оценка ожидания"
            :value="`${sessionStore.barber?.estimated_waiting_time || 0} мин`"
          />
        </div>

        <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Профиль
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  {{ sessionStore.user?.name || 'Сессия барбера' }}
                </h2>
              </div>
            </template>

            <div class="space-y-5">
              <div class="grid gap-3 sm:grid-cols-2">
                <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Логин</p>
                  <p class="mt-2 text-lg font-semibold text-charcoal-950">{{ sessionStore.user?.login || 'Не указан' }}</p>
                </div>
                <div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Специализация</p>
                  <p class="mt-2 text-lg font-semibold text-charcoal-950">{{ sessionStore.barber?.specialization || 'Общие услуги' }}</p>
                </div>
              </div>

              <div class="space-y-3 rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Управление перерывом</p>
                <div class="flex flex-wrap items-end gap-3">
                  <UFormField label="Минуты" name="minutes">
                    <UInput v-model="breakMinutes" min="1" type="number" />
                  </UFormField>
                  <UButton icon="i-lucide-coffee" @click="startBreak">
                    Начать перерыв
                  </UButton>
                  <UButton color="neutral" icon="i-lucide-undo-2" variant="outline" @click="returnFromBreak">
                    Вернуться
                  </UButton>
                </div>
              </div>

              <UAlert
                color="neutral"
                description="Обновления очереди, вызовы клиентов и изменения киоска повторно подтягиваются по событиям Socket.IO queue:update от бэкенда."
                icon="i-lucide-radio-tower"
                title="Синхронизация очереди в реальном времени"
                variant="soft"
              />
            </div>
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Активная очередь
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Управляйте текущей очередью
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
              description="Для авторизованного барбера не найдено активных записей очереди."
              icon="i-lucide-sofa"
              title="Очередь пуста"
            />
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
