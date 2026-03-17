<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Dashboard error',
  description: 'The dashboard could not complete this request.'
})
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-[var(--dashboard-shell)] px-4 py-12">
      <div class="mx-auto max-w-xl">
        <UCard class="warm-card rounded-[2rem] border border-charcoal-200">
          <template #header>
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-brass-700">
                Bradobrey dashboard
              </p>
              <h1 class="barbershop-heading text-3xl text-charcoal-950">
                Something went wrong
              </h1>
            </div>
          </template>

          <div class="space-y-4">
            <UAlert
              color="error"
              icon="i-lucide-triangle-alert"
              title="Request failed"
              :description="error.message || 'An unexpected error occurred while rendering the dashboard.'"
              variant="soft"
            />

            <div class="flex flex-wrap gap-3">
              <UButton color="primary" to="/">
                Return home
              </UButton>
              <UButton color="neutral" variant="outline" @click="clearError({ redirect: '/' })">
                Reset app
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UApp>
</template>
