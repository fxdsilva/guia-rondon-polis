import { createContext, createElement, ReactNode, useContext, useState } from 'react'
import { MOCK_PROFESSIONALS, Professional } from './mockData'

type MainStoreContextType = {
  professionals: Professional[]
  togglePremium: (id: string) => void
  toggleVerified: (id: string) => void
  addProfessional: (pro: Professional) => void
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS)

  const togglePremium = (id: string) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, premium: !p.premium } : p)))
  }

  const toggleVerified = (id: string) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p)))
  }

  const addProfessional = (pro: Professional) => {
    setProfessionals((prev) => [pro, ...prev])
  }

  return createElement(
    MainStoreContext.Provider,
    { value: { professionals, togglePremium, toggleVerified, addProfessional } },
    children,
  )
}

export default function useMainStore() {
  const context = useContext(MainStoreContext)
  if (!context) {
    throw new Error('useMainStore must be used within a MainStoreProvider')
  }
  return context
}
