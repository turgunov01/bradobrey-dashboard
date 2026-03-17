import { defineStore } from 'pinia'

import type { Branch } from '~~/shared/schemas'
import { branchSchema } from '~~/shared/schemas'

export const useBranchStore = defineStore('branch', {
  actions: {
    async ensureLoaded() {
      if (this.loaded) {
        return this.branches
      }

      const response = await useKioskApi().config()
      const branches = Array.isArray((response as { branches?: unknown[] })?.branches)
        ? (response as { branches?: unknown[] }).branches || []
        : []
      const parsedBranches: Branch[] = []

      for (const branch of branches) {
        const parsedBranch = branchSchema.safeParse(branch)

        if (parsedBranch.success) {
          parsedBranches.push(parsedBranch.data)
        }
      }

      this.branches = parsedBranches

      if (!this.activeBranchId && this.branches[0]?.id) {
        this.activeBranchId = this.branches[0].id
      }

      this.loaded = true

      return this.branches
    },
    setActiveBranch(id?: string | null) {
      this.activeBranchId = id ? String(id) : null
    }
  },
  getters: {
    activeBranch: state => state.branches.find(branch => branch.id === state.activeBranchId) || null
  },
  state: () => ({
    activeBranchId: null as string | null,
    branches: [] as Branch[],
    loaded: false
  })
})
