<script setup lang="ts">
definePageMeta({
  middleware: 'barber-auth'
})

const marketplaceApi = useMarketplaceApi()

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

const selectedBanner = computed(() =>
  (data.value || []).find((item: any) => String(item.id) === selectedBannerId.value) || null
)

function editBanner(item: any) {
  form.description = item.description || ''
  form.id = String(item.id)
  form.is_active = Boolean(item.is_active ?? true)
  form.locale = item.locale || 'uz'
  form.title = item.title || ''
  selectedBannerId.value = String(item.id)
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
}

async function toggleBanner(item: any) {
  await marketplaceApi.toggleActive(String(item.id), !item.is_active)
  await refresh()
}
</script>

<template>
  <UDashboardPanel id="marketplace-banners">
    <template #header>
      <UDashboardNavbar title="Marketplace Banners" :ui="{ right: 'gap-3' }">
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
        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                Banner list
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                Create, edit, activate, deactivate
              </h2>
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
                  <p class="font-medium text-charcoal-950">{{ item.title || 'Untitled banner' }}</p>
                  <p class="text-sm text-charcoal-500">{{ item.locale || 'No locale' }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <SharedStatusBadge :label="item.is_active ? 'active' : 'inactive'" />
                  <UButton color="neutral" size="xs" variant="outline" @click.stop="editBanner(item)">
                    Edit
                  </UButton>
                  <UButton color="neutral" size="xs" variant="outline" @click.stop="toggleBanner(item)">
                    {{ item.is_active ? 'Deactivate' : 'Activate' }}
                  </UButton>
                </div>
              </div>
            </button>
          </div>
          <SharedEmptyState
            v-else
            description="The marketplace banners endpoint returned no banners."
            icon="i-lucide-image-up"
            title="No banners"
          />
        </UCard>

        <div class="space-y-6">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  {{ form.id ? 'Edit' : 'Create' }}
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Banner form
                </h2>
              </div>
            </template>

            <div class="space-y-4">
              <UFormField label="Title">
                <UInput v-model="form.title" />
              </UFormField>
              <UFormField label="Description">
                <UTextarea v-model="form.description" :rows="4" />
              </UFormField>
              <UFormField label="Locale">
                <UInput v-model="form.locale" />
              </UFormField>
              <UCheckbox v-model="form.is_active" label="Banner is active" />
              <UFormField label="Image file">
                <UInput type="file" @change="onFileChange" />
              </UFormField>

              <div class="flex flex-wrap justify-end gap-3">
                <UButton color="neutral" variant="outline" @click="resetForm">
                  Reset
                </UButton>
                <UButton color="primary" icon="i-lucide-save" @click="submitBanner">
                  {{ form.id ? 'Update banner' : 'Create banner' }}
                </UButton>
              </div>
            </div>
          </UCard>

          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Selected payload
                </p>
                <h2 class="barbershop-heading text-2xl text-charcoal-950">
                  Banner detail
                </h2>
              </div>
            </template>

            <SharedJsonBlock v-if="selectedBanner" label="Banner" :value="selectedBanner" />
            <SharedEmptyState
              v-else
              description="Pick a banner from the list to inspect the raw payload."
              icon="i-lucide-gallery-vertical-end"
              title="No banner selected"
            />
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
