<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const branchStore = useBranchStore()

await branchStore.ensureLoaded()

const options = computed(() =>
  branchStore.branches.map(branch => ({
    label: branch.name,
    value: branch.id
  }))
)

const activeBranchId = computed({
  get: () => branchStore.activeBranchId ?? undefined,
  set: (value?: string) => branchStore.setActiveBranch(value)
})
</script>

<template>
  <div class="w-full">
    <p v-if="!collapsed" class="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal-500">
      Active branch
    </p>

    <USelectMenu
      v-model="activeBranchId"
      class="w-full"
      color="neutral"
      :items="options"
      :placeholder="collapsed ? 'Branch' : 'Select branch'"
      value-key="value"
    />
  </div>
</template>
