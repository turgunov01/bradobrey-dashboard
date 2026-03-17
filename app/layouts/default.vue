<script setup lang="ts">
const open = ref(false)
const branchStore = useBranchStore()
const sessionStore = useSessionStore()

const { primaryLinks, searchGroups, supportLinks } = useDashboardNavigation()

await Promise.all([
  branchStore.ensureLoaded(),
  sessionStore.ensureLoaded()
])

function closeSidebar() {
  open.value = false
}

const mainLinks = computed(() =>
  (primaryLinks[0] || []).map(item => ({
    ...item,
    onSelect: closeSidebar
  }))
)

const utilityLinks = computed(() =>
  (supportLinks[0] || []).map(item => ({
    ...item,
    onSelect: closeSidebar
  }))
)
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="main"
      v-model:open="open"
      collapsible
      resizable
      class="bg-white/70 backdrop-blur-xl"
      :ui="{
        footer: 'lg:border-t lg:border-default/70',
        header: 'border-b border-default/70'
      }"
    >
      <template #header="{ collapsed }">
        <div class="w-full space-y-4">
          <SidebarBrand :collapsed="collapsed" />
          <BranchSelector :collapsed="collapsed" />
        </div>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="mainLinks"
          class="mt-4"
          orientation="vertical"
          tooltip
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="utilityLinks"
          class="mt-auto"
          orientation="vertical"
          tooltip
        />
      </template>

      <template #footer="{ collapsed }">
        <AppUserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="searchGroups" />

    <slot />
  </UDashboardGroup>
</template>
