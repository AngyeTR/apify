import { create } from 'zustand'

export const  useDataStore = create((set) => ({
    user: null,
    subscription: null,
    modules: null,
    setUser: (newUser) => set({ user: newUser }),
    setSubscription: (newTabs) => set({tabs: newTabs}),
    setModules: (newModules) => set({modules: newModules}) 
}))
