<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()
</script>

<template>
  <div class="flex w-full items-center gap-3">
    <div class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-charcoal-950 text-sand-50 shadow-sm">
      <UIcon name="i-lucide-scissors" class="size-5" />
    </div>

    <div v-if="!collapsed" class="min-w-0">
      <p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-brass-700">
        Bradobrey
      </p>
      <h1 class="barbershop-heading truncate text-xl text-charcoal-950">
        Панель
      </h1>
    </div>
  </div>
</template>
