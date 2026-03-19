<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

import { serviceFormSchema } from '~~/shared/schemas'
import { formatMoney } from '~/utils/format'
import { flattenServicesPayload } from '~/utils/services'

type ServiceRow = {
  base_price: number | string
  category: string
  duration_minutes: number
  id: string
  image: string | null
  is_active: boolean
  name: string
}

const servicesApi = useServicesApi()

const serviceModalOpen = ref(false)
const form = reactive({
  category_name: '',
  duration: 30,
  id: '',
  is_active: true,
  name: '',
  price: 0
})

const modalTitle = computed(() =>
  form.id ? 'Редактировать услугу' : 'Создать новую услугу'
)

const modalDescription = computed(() =>
  form.id
    ? 'Обновите данные выбранной услуги.'
    : 'Заполните форму, чтобы добавить услугу в каталог.'
)

const serviceColumns: TableColumn<ServiceRow>[] = [
  { accessorKey: 'id', header: 'id' },
  { accessorKey: 'name', header: 'name' },
  { accessorKey: 'category', header: 'category' },
  { accessorKey: 'duration_minutes', header: 'duration_minutes' },
  { accessorKey: 'base_price', header: 'base_price' },
  { accessorKey: 'image', header: 'image' },
  { accessorKey: 'is_active', header: 'is_active' },
  { id: 'actions', header: '' }
]

const { data, pending, refresh } = await useAsyncData('services-dashboard', async () => {
  return await servicesApi.list()
})

const serviceRows = computed<ServiceRow[]>(() =>
  flattenServicesPayload(data.value).map((service, index) => ({
    base_price: service.base_price ?? service.price ?? 0,
    category: service.category || 'Без категории',
    duration_minutes: Number(service.duration_minutes ?? service.duration ?? 0),
    id: String(service.id ?? `service-${index}`),
    image: String(service.image || '').trim() || null,
    is_active: Boolean(service.is_active ?? true),
    name: service.name || 'Услуга без названия'
  })).sort((left, right) => {
    const categoryComparison = left.category.localeCompare(right.category, 'ru')

    return categoryComparison !== 0
      ? categoryComparison
      : left.name.localeCompare(right.name, 'ru')
  })
)

watch(serviceModalOpen, (open) => {
  if (!open) {
    resetForm()
  }
})

function resetForm() {
  form.category_name = ''
  form.duration = 30
  form.id = ''
  form.is_active = true
  form.name = ''
  form.price = 0
}

function openCreateModal() {
  resetForm()
  serviceModalOpen.value = true
}

function startEdit(service: ServiceRow) {
  form.category_name = service.category
  form.duration = Number(service.duration_minutes || 0)
  form.id = String(service.id)
  form.is_active = Boolean(service.is_active ?? true)
  form.name = service.name || ''
  form.price = Number(service.base_price || 0)
  serviceModalOpen.value = true
}

async function submit() {
  const payload = serviceFormSchema.safeParse({
    category_name: form.category_name || undefined,
    duration: form.duration,
    is_active: form.is_active,
    name: form.name,
    price: form.price
  })

  if (!payload.success) {
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Некорректные данные услуги'))
    return
  }

  if (form.id) {
    await servicesApi.update(form.id, payload.data)
  }
  else {
    await servicesApi.create(payload.data)
  }

  await refresh()
  serviceModalOpen.value = false
}

async function removeService(id: string) {
  await servicesApi.remove(id)
  await refresh()
}
</script>

<template>
  <UDashboardPanel id="services">
    <template #header>
      <UDashboardNavbar title="Услуги" :ui="{ right: 'gap-3' }">
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
                Единый список
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Каталог услуг
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <UBadge color="neutral" size="lg" variant="soft">
                {{ serviceRows.length }} услуг
              </UBadge>
              <UButton color="primary" icon="i-lucide-plus" @click="openCreateModal">
                Создать услугу
              </UButton>
            </div>
          </div>
        </template>

        <div v-if="serviceRows.length" class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
          <div class="max-h-[42rem] overflow-auto">
            <UTable
              :columns="serviceColumns"
              :data="serviceRows"
              :loading="pending"
              sticky="header"
              :ui="{
                root: 'w-full overflow-auto',
                base: 'w-full min-w-[88rem]',
                thead: 'bg-charcoal-50/90',
                tbody: 'divide-y divide-charcoal-100',
                th: 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500',
                td: 'px-4 py-4 text-sm text-charcoal-700 align-middle'
              }"
            >
            <template #id-cell="{ row }">
              <span class="font-mono text-xs text-charcoal-500">{{ row.original.id }}</span>
            </template>

            <template #duration_minutes-cell="{ row }">
              <span class="font-medium">{{ row.original.duration_minutes }} мин</span>
            </template>

            <template #base_price-cell="{ row }">
              <span class="font-medium">{{ formatMoney(row.original.base_price) }}</span>
            </template>

            <template #image-cell="{ row }">
              <a
                v-if="row.original.image"
                :href="row.original.image"
                class="inline-flex items-center gap-3"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  :alt="row.original.name"
                  :src="row.original.image"
                  class="size-12 rounded-xl border border-charcoal-200 object-cover"
                >
                <span class="max-w-[16rem] truncate text-xs text-primary-600">
                  {{ row.original.image }}
                </span>
              </a>
              <span v-else class="text-charcoal-400">Нет изображения</span>
            </template>

            <template #is_active-cell="{ row }">
              <SharedStatusBadge :label="row.original.is_active ? 'active' : 'inactive'" />
            </template>

            <template #actions-cell="{ row }">
              <div class="flex justify-end gap-2">
                <UTooltip text="Редактировать">
                  <UButton
                    aria-label="Редактировать услугу"
                    color="neutral"
                    icon="i-lucide-pencil"
                    square
                    variant="ghost"
                    @click="startEdit(row.original)"
                  />
                </UTooltip>

                <UTooltip text="Удалить">
                  <UButton
                    aria-label="Удалить услугу"
                    color="error"
                    icon="i-lucide-trash-2"
                    square
                    variant="ghost"
                    @click="removeService(row.original.id)"
                  />
                </UTooltip>
              </div>
            </template>
            </UTable>
          </div>
        </div>

        <SharedEmptyState
          v-else
          description="Список услуг пуст или не был получен от бэкенда."
          icon="i-lucide-badge-dollar-sign"
          title="Услуги не загружены"
        />
      </UCard>

      <UModal
        v-model:open="serviceModalOpen"
        class="sm:max-w-xl"
        :description="modalDescription"
        :title="modalTitle"
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Название услуги">
              <UInput v-model="form.name" />
            </UFormField>

            <UFormField label="Название категории">
              <UInput v-model="form.category_name" placeholder="Стрижки, бритье, окрашивание" />
            </UFormField>

            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField label="Длительность">
                <UInput v-model="form.duration" type="number" />
              </UFormField>

              <UFormField label="Цена">
                <UInput v-model="form.price" type="number" />
              </UFormField>
            </div>

            <UCheckbox v-model="form.is_active" label="Услуга активна" />
          </div>
        </template>

        <template #footer="{ close }">
          <div class="flex w-full flex-wrap justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="resetForm">
              Сбросить
            </UButton>
            <UButton color="neutral" variant="ghost" @click="close">
              Закрыть
            </UButton>
            <UButton color="primary" icon="i-lucide-save" @click="submit">
              {{ form.id ? 'Обновить услугу' : 'Создать услугу' }}
            </UButton>
          </div>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>
