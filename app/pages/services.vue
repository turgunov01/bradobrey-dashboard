<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

import { serviceFormSchema } from '~~/shared/schemas'

type ServiceRow = {
  category: string
  duration: number
  id: string
  isActive: boolean
  name: string
  price: string | number
}

definePageMeta({
  middleware: 'barber-auth'
})

const servicesApi = useServicesApi()

const form = reactive({
  category_name: '',
  duration: 30,
  id: '',
  is_active: true,
  name: '',
  price: 0
})

const serviceColumns: TableColumn<ServiceRow>[] = [
  { accessorKey: 'name', header: 'Service' },
  { accessorKey: 'duration', header: 'Duration' },
  { accessorKey: 'price', header: 'Price' },
  { id: 'status', header: 'Status' },
  { id: 'actions', header: '' }
]

const { data, pending, refresh } = await useAsyncData('services-dashboard', async () => {
  return await servicesApi.list()
})

const groups = computed(() => {
  const payload = data.value as any

  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.categories)) {
    return payload.categories
  }

  return []
})

function resetForm() {
  form.category_name = ''
  form.duration = 30
  form.id = ''
  form.is_active = true
  form.name = ''
  form.price = 0
}

function startEdit(service: any, categoryName: string) {
  form.category_name = categoryName
  form.duration = Number(service.duration || 0)
  form.id = String(service.id)
  form.is_active = Boolean(service.is_active ?? true)
  form.name = service.name || ''
  form.price = Number(service.price || 0)
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
    useApiClient().notifyError(new Error(payload.error.issues[0]?.message || 'Invalid service payload'))
    return
  }

  if (form.id) {
    await servicesApi.update(form.id, payload.data)
  }
  else {
    await servicesApi.create(payload.data)
  }

  resetForm()
  await refresh()
}

async function removeService(id: string) {
  await servicesApi.remove(id)
  await refresh()
}
</script>

<template>
  <UDashboardPanel id="services">
    <template #header>
      <UDashboardNavbar title="Services" :ui="{ right: 'gap-3' }">
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
      <div class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="space-y-6">
          <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
            <template #header>
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                  Grouped catalog
                </p>
                <h2 class="barbershop-heading text-3xl text-charcoal-950">
                  Service catalog by category
                </h2>
              </div>
            </template>

            <div v-if="groups.length" class="space-y-6">
              <div
                v-for="group in groups"
                :key="String(group.id || group.name || group.title)"
                class="space-y-4 rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4"
              >
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">Category</p>
                    <h3 class="barbershop-heading text-2xl text-charcoal-950">{{ group.name || group.title || 'Uncategorized' }}</h3>
                  </div>
                  <UBadge color="neutral" variant="soft">
                    {{ group.services?.length || 0 }} services
                  </UBadge>
                </div>

                <div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
                  <UTable
                    :columns="serviceColumns"
                    :data="(group.services || []).map((service: any) => ({
                      category: group.name || group.title || 'Uncategorized',
                      duration: Number(service.duration || 0),
                      id: String(service.id),
                      isActive: Boolean(service.is_active ?? true),
                      name: service.name || 'Unnamed service',
                      price: service.price ?? 0
                    }))"
                    :loading="pending"
                    :ui="{
                      thead: 'bg-charcoal-50/90',
                      tbody: 'divide-y divide-charcoal-100',
                      th: 'px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500',
                      td: 'px-4 py-4 text-sm text-charcoal-700 align-middle'
                    }"
                  >
                    <template #duration-cell="{ row }">
                      <span class="font-medium">{{ row.original.duration }} min</span>
                    </template>

                    <template #status-cell="{ row }">
                      <SharedStatusBadge :label="row.original.isActive ? 'active' : 'inactive'" />
                    </template>

                    <template #actions-cell="{ row }">
                      <div class="flex flex-wrap justify-end gap-2">
                        <UButton color="neutral" size="xs" variant="outline" @click="startEdit(row.original, row.original.category)">
                          Edit
                        </UButton>
                        <UButton color="error" size="xs" variant="outline" @click="removeService(row.original.id)">
                          Delete
                        </UButton>
                      </div>
                    </template>
                  </UTable>
                </div>
              </div>
            </div>

            <SharedEmptyState
              v-else
              description="The services endpoint did not return grouped categories."
              icon="i-lucide-badge-dollar-sign"
              title="No services loaded"
            />
          </UCard>
        </div>

        <UCard class="warm-card rounded-[1.9rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500">
                CRUD
              </p>
              <h2 class="barbershop-heading text-3xl text-charcoal-950">
                {{ form.id ? 'Edit service' : 'Create a new service' }}
              </h2>
            </div>
          </template>

          <div class="space-y-4">
            <UFormField label="Service name">
              <UInput v-model="form.name" />
            </UFormField>
            <UFormField label="Category name">
              <UInput v-model="form.category_name" placeholder="Haircuts, Shaves, Color" />
            </UFormField>
            <div class="grid gap-4 sm:grid-cols-2">
              <UFormField label="Duration">
                <UInput v-model="form.duration" type="number" />
              </UFormField>
              <UFormField label="Price">
                <UInput v-model="form.price" type="number" />
              </UFormField>
            </div>
            <UCheckbox v-model="form.is_active" label="Service is active" />

            <div class="flex flex-wrap justify-end gap-3">
              <UButton color="neutral" variant="outline" @click="resetForm">
                Reset
              </UButton>
              <UButton color="primary" icon="i-lucide-save" @click="submit">
                {{ form.id ? 'Update service' : 'Create service' }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
