<script setup lang="ts">
import { formatMoney } from '~/utils/format'

const { data, pending, error, refresh } = await useVerifixPenalty()
const api = useVerifixApi()
const session = useSessionStore()

const canEdit = computed(() => ['admin', 'admin_network'].includes(String(session.user?.role)))
const minuteRate = ref('0')
const saving = ref(false)

watch(data, (value) => {
  if (!value) return
  minuteRate.value = String(value.penalty_per_minute)
}, { immediate: true })

const valid = computed(() => {
  const minuteRateValue = Number(minuteRate.value)

  return minuteRate.value !== ''
    && Number.isFinite(minuteRateValue)
    && minuteRateValue >= 0
    && minuteRateValue <= 9999999999.99
    && Math.abs(minuteRateValue * 100 - Math.round(minuteRateValue * 100)) < 0.0001
})

async function save() {
  if (!valid.value || saving.value) return

  saving.value = true
  try {
    data.value = await api.updateSettings(Number(minuteRate.value))
  }
  catch {
    // The API client displays the error.
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <UCard class="mb-4">
    <div class="grid gap-4 lg:grid-cols-[minmax(0,18rem)_auto] lg:items-end">
      <UFormField label="Фиксированный штраф за минуту, сум">
        <UInput v-model="minuteRate" type="number" min="0" step="0.01" :disabled="pending || saving || !canEdit || !!error" />
      </UFormField>

      <div class="flex flex-wrap items-center gap-2">
        <UButton v-if="canEdit" :loading="saving" :disabled="pending || !valid || !!error" @click="save">Сохранить настройки</UButton>
        <UButton v-if="error" color="error" variant="outline" @click="() => refresh()">Повторить загрузку</UButton>
      </div>
    </div>

    <p v-if="data && !error" class="mt-3 text-sm text-charcoal-500">
      Общая сумма штрафа рассчитывается автоматически: количество минут опоздания умножается на эту ставку.
    </p>

    <p v-if="data && !error" class="mt-2 text-sm text-charcoal-500">
      Текущая ставка: {{ formatMoney(data.penalty_per_minute) }} / мин.
    </p>

    <p v-if="error" class="mt-3 text-sm text-red-600">Ставка не загружена. Расчёт штрафов недоступен.</p>
  </UCard>
</template>
