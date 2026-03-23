import { createContext, createElement, ReactNode, useContext, useState } from 'react'
import { MOCK_PROFESSIONALS, Professional } from './mockData'

type MainStoreContextType = {
  professionals: Professional[]
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void
  togglePremium: (id: string) => void
  toggleVerified: (id: string) => void
  addProfessional: (pro: Professional) => void
  updateProfessional: (id: string, data: Partial<Professional>) => void
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const togglePremium = (id: string) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, premium: !p.premium } : p)))
  }

  const toggleVerified = (id: string) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p)))
  }

  const addProfessional = (pro: Professional) => {
    setProfessionals((prev) => [pro, ...prev])
  }

  const updateProfessional = (id: string, data: Partial<Professional>) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  return createElement(
    MainStoreContext.Provider,
    {
      value: {
        professionals,
        currentUserId,
        setCurrentUserId,
        togglePremium,
        toggleVerified,
        addProfessional,
        updateProfessional,
      },
    },
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
