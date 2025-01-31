import { create } from "zustand"

export interface LoadingStore {
  isLoading: boolean
  setIsLoading: (enabled: boolean) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (enabled: boolean) => set({ isLoading: enabled }),
}))

export interface JobStore {
  refreshJobs: boolean
  setrefreshJobs: () => void
}

export const useJobStore = create<JobStore>((set) => ({
  refreshJobs: false,
  setrefreshJobs: () => set((state) => ({ refreshJobs: !state.refreshJobs })),
}))
