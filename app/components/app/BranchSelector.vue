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
    <USelectMenu
      v-model="activeBranchId"
      class="w-full"
      color="neutral"
      :items="options"
      :placeholder="collapsed ? 'Филиал' : 'Выберите филиал'"
      value-key="value"
    />
  </div>
</template>
