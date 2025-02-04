import { create } from "zustand"

export type LoadingStoreType= {
  isLoading: boolean
  setIsLoading: (enabled: boolean) => void
}

export const useLoadingStore = create<LoadingStoreType>((set) => ({
  isLoading: false,
  setIsLoading: (enabled: boolean) => set({ isLoading: enabled }),
}))

export type JobStore= {
  refreshJobs: boolean
  setrefreshJobs: () => void
}

export const useJobStore = create<JobStore>((set) => ({
  refreshJobs: false,
  setrefreshJobs: () => set((state) => ({ refreshJobs: !state.refreshJobs })),
}))
