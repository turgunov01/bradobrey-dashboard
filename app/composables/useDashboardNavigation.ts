import type { NavigationMenuItem } from '@nuxt/ui'

export function useDashboardNavigation() {
  const route = useRoute()

  const primaryLinks = [[
    { icon: 'i-lucide-layout-dashboard', label: 'Overview', to: '/' },
    { icon: 'i-lucide-scissors-line-dashed', label: 'Workspace', to: '/barbers/workspace' },
    { icon: 'i-lucide-monitor-smartphone', label: 'Kiosk', to: '/kiosk' },
    { icon: 'i-lucide-badge-dollar-sign', label: 'Services', to: '/services' },
    { icon: 'i-lucide-history', label: 'History', to: '/history' },
    { icon: 'i-lucide-scroll-text', label: 'Barber History', to: '/history/barber' },
    { icon: 'i-lucide-chart-column-big', label: 'Statistics', to: '/statistics' },
    { icon: 'i-lucide-ticket-percent', label: 'Promo Codes', to: '/promo-codes' },
    { icon: 'i-lucide-id-card', label: 'Certificates', to: '/certificates' },
    { icon: 'i-lucide-image-up', label: 'Marketplace Banners', to: '/marketplace/banners' },
    { icon: 'i-lucide-code-xml', label: 'API Debug', to: '/api-debug' }
  ]] satisfies NavigationMenuItem[][]

  const supportLinks = [[
    { icon: 'i-lucide-heart-pulse', label: 'Health check', to: '/api-debug?preset=health' },
    { icon: 'i-lucide-book-open', label: 'Nuxt UI Dashboard Template', target: '_blank', to: 'https://dashboard-template.nuxt.dev/' }
  ]] satisfies NavigationMenuItem[][]

  const searchGroups = computed(() => [
    {
      id: 'dashboard',
      items: primaryLinks.flat(),
      label: 'Dashboard'
    },
    {
      id: 'support',
      items: [
        {
          icon: 'i-lucide-file-code-2',
          label: 'View current page source',
          target: '_blank',
          to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`
        },
        ...supportLinks.flat()
      ],
      label: 'Support'
    }
  ])

  return {
    primaryLinks,
    searchGroups,
    supportLinks
  }
}
