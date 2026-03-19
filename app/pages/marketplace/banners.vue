<script setup lang="ts">
const marketplaceApi = useMarketplaceApi()

const bannerModalOpen = ref(false)
const form = reactive({
  description: '',
  id: '',
  is_active: true,
  locale: 'uz',
  title: ''
})
const selectedFile = ref<File | null>(null)
const selectedBannerId = ref('')

const { data, pending, refresh } = await useAsyncData('marketplace-banners', async () => {
  const banners = await marketplaceApi.list()
  return Array.isArray(banners) ? banners : ((banners as any)?.items || [])
})

watch(
  () => data.value || [],
  (items) => {
    if (!items.length) {
      selectedBannerId.value = ''
      return
    }

    if (!items.some((item: any) => String(item.id) === selectedBannerId.value)) {
      selectedBannerId.value = String(items[0].id)
    }
  },
  { immediate: true }
)

watch(bannerModalOpen, (open) => {
  if (!open) {
    resetForm()
  }
})

const selectedBanner = computed(() =>
  (data.value || []).find((item: any) => String(item.id) === selectedBannerId.value) || null
)

const modalTitle = computed(() =>
  form.id ? 'Редактировать баннер' : 'Создать баннер'
)

const modalDescription = computed(() =>
  form.id
    ? 'Обновите данные выбранного баннера.'
    : 'Заполните форму, чтобы добавить новый баннер в маркетплейс.'
)

function openCreateModal() {
  resetForm()
  bannerModalOpen.value = true
}

function editBanner(item: any) {
  form.description = item.description || ''
  form.id = String(item.id)
  form.is_active = Boolean(item.is_active ?? true)
  form.locale = item.locale || 'uz'
  form.title = item.title || ''
  selectedBannerId.value = String(item.id)
  bannerModalOpen.value = true
}

function resetForm() {
  form.description = ''
  form.id = ''
  form.is_active = true
  form.locale = 'uz'
  form.title = ''
  selectedFile.value = null
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] || null
}

async function submitBanner() {
  const formData = new FormData()

  formData.append('title', form.title)
  formData.append('description', form.description)
  formData.append('locale', form.locale)
  formData.append('is_active', String(form.is_active))

  if (selectedFile.value) {
    formData.append('file', selectedFile.value)
  }

  if (form.id) {
    await marketplaceApi.update(form.id, formData)
  }
  else {
    await marketplaceApi.create(formData)
  }

  resetForm()
  await refresh()
  bannerModalOpen.value = false
}

async function toggleBanner(item: any) {
  await marketplaceApi.toggleActive(String(item.id), !item.is_active)
  await refresh()
}
</script>

<template>
  <UDashboardPanel id="marketplace-banners">
    <template #header>
      <UDashboardNavbar title="Баннеры маркетплейса" :ui="{ right: 'gap-3' }">
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
      <div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Список баннеров
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Создание, редактирование и активация
                </h2>
              </div>

              <UButton color="primary" icon="i-lucide-plus" @click="openCreateModal">
                Создать баннер
              </UButton>
            </div>
          </template>

          <div v-if="data?.length" class="space-y-3">
            <button
              v-for="item in data"
              :key="String(item.id)"
              :class="[
                String(item.id) === selectedBannerId ? 'border-brass-300 bg-brass-50' : 'border-charcoal-200 bg-white/80',
                'w-full rounded-[1.25rem] border p-4 text-left transition'
              ]"
              type="button"
              @click="selectedBannerId = String(item.id)"
            >
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="space-y-1">
                  <p class="font-medium text-charcoal-950">{{ item.title || 'Баннер без названия' }}</p>
                  <p class="text-sm text-charcoal-500">{{ item.locale || 'Локаль не указана' }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <SharedStatusBadge :label="item.is_active ? 'active' : 'inactive'" />
                  <UButton color="neutral" size="xs" variant="outline" @click.stop="editBanner(item)">
                    Редактировать
                  </UButton>
                  <UButton color="neutral" size="xs" variant="outline" @click.stop="toggleBanner(item)">
                    {{ item.is_active ? 'Деактивировать' : 'Активировать' }}
                  </UButton>
                </div>
              </div>
            </button>
          </div>
          <SharedEmptyState
            v-else
            description="Эндпоинт баннеров маркетплейса не вернул ни одного баннера."
            icon="i-lucide-image-up"
            title="Баннеров нет"
          />
        </UCard>

        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Выбранные данные
              </p>
              <h2 class="barbershop-heading text-2xl text-charcoal-950">
                Детали баннера
              </h2>
            </div>
          </template>

          <SharedJsonBlock v-if="selectedBanner" label="Баннер" :value="selectedBanner" />
          <SharedEmptyState
            v-else
            description="Выберите баннер из списка, чтобы посмотреть его сырые данные."
            icon="i-lucide-gallery-vertical-end"
            title="Баннер не выбран"
          />
        </UCard>
      </div>

      <UModal
        v-model:open="bannerModalOpen"
        class="sm:max-w-xl"
        :description="modalDescription"
        :title="modalTitle"
      >
        <template #body>
          <div class="space-y-4">
            <UFormField label="Заголовок">
              <UInput v-model="form.title" />
            </UFormField>
            <UFormField label="Описание">
              <UTextarea v-model="form.description" :rows="4" />
            </UFormField>
            <UFormField label="Локаль">
              <UInput v-model="form.locale" />
            </UFormField>
            <UCheckbox v-model="form.is_active" label="Баннер активен" />
            <UFormField label="Файл изображения">
              <UInput type="file" @change="onFileChange" />
            </UFormField>
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
            <UButton color="primary" icon="i-lucide-save" @click="submitBanner">
              {{ form.id ? 'Обновить баннер' : 'Создать баннер' }}
            </UButton>
          </div>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>
