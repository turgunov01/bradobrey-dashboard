<script setup lang="ts">
import { formatMoney } from '~/utils/format'
const { data, pending, error, refresh } = await useVerifixPenalty()
const api = useVerifixApi()
const session = useSessionStore()
const canEdit = computed(() => ['admin', 'admin_network'].includes(String(session.user?.role)))
const rate = ref('0')
const saving = ref(false)
watch(data, value => { if (value) rate.value = String(value.penalty_per_minute) }, { immediate: true })
const valid = computed(() => rate.value !== '' && Number.isFinite(Number(rate.value)) && Number(rate.value) >= 0 && Number(rate.value) <= 9999999999.99 && Math.abs(Number(rate.value) * 100 - Math.round(Number(rate.value) * 100)) < 0.0001)
async function save() {
  if (!valid.value || saving.value) return
  saving.value = true
  try { data.value = await api.updateSettings(Number(rate.value)) }
  catch { /* The API client displays the error. */ }
  finally { saving.value = false }
}
</script>
<template>
  <UCard class="mb-4">
    <div class="flex flex-wrap items-end gap-4">
      <UFormField label="Фиксированный штраф за минуту, сум">
        <UInput v-model="rate" type="number" min="0" step="0.01" :disabled="pending || saving || !canEdit || !!error" />
      </UFormField>
      <UButton v-if="canEdit" :loading="saving" :disabled="pending || !valid || !!error" @click="save">Сохранить ставку</UButton>
      <UButton v-if="error" color="error" variant="outline" @click="() => refresh()">Повторить загрузку ставки</UButton>
    </div>
    <p v-if="data && !error" class="mt-3 text-sm text-charcoal-500">
      Штраф = минуты опоздания × {{ formatMoney(data.penalty_per_minute) }}.
      Ставка общая для всех филиалов; изменение пересчитывает выбранный период.
    </p>
    <p v-if="error" class="mt-3 text-sm text-red-600">Ставка не загружена. Расчёт штрафов недоступен.</p>
  </UCard>
</template>
