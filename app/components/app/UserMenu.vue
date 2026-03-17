<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const sessionStore = useSessionStore()
const branchStore = useBranchStore()
const { isConnected } = useRealtimeQueue()

const items = computed<DropdownMenuItem[][]>(() => [[{
  type: 'label',
  label: sessionStore.user?.name || 'Guest barber'
}], [{
  label: branchStore.activeBranch?.name || 'No branch',
  icon: 'i-lucide-map-pinned'
}, {
  label: isConnected.value ? 'Realtime connected' : 'Realtime offline',
  icon: isConnected.value ? 'i-lucide-broadcast' : 'i-lucide-wifi-off'
}], [{
  label: 'Workspace',
  icon: 'i-lucide-scissors-line-dashed',
  to: '/barbers/workspace'
}, {
  label: 'API Debug',
  icon: 'i-lucide-code-xml',
  to: '/api-debug'
}], [{
  label: 'Log out',
  icon: 'i-lucide-log-out',
  onSelect: async () => {
    await sessionStore.logout({
      barber_id: sessionStore.barber?.id
    })

    await navigateTo('/login')
  }
}]])
</script>

<template>
  <UDropdownMenu
    :content="{ align: 'center', collisionPadding: 12 }"
    :items="items"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      :block="!collapsed"
      :class="[!collapsed && 'py-2.5']"
      :icon="collapsed ? 'i-lucide-user-round' : undefined"
      :label="collapsed ? undefined : (sessionStore.user?.name || 'Barber session')"
      :square="collapsed"
      color="neutral"
      trailing-icon="i-lucide-chevrons-up-down"
      variant="ghost"
    />
  </UDropdownMenu>
</template>
