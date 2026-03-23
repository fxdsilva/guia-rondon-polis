import { createContext, createElement, ReactNode, useContext, useState } from 'react'
import { MOCK_PROFESSIONALS, MOCK_ADS, Professional, Ad } from './mockData'

type MainStoreContextType = {
  professionals: Professional[]
  ads: Ad[]
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void
  togglePremium: (id: string) => void
  toggleVerified: (id: string) => void
  addProfessional: (pro: Professional) => void
  updateProfessional: (id: string, data: Partial<Professional>) => void
  toggleAdActive: (id: string) => void
  addAd: (ad: Ad) => void
  updateAd: (id: string, data: Partial<Ad>) => void
  deleteAd: (id: string) => void
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS)
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS)
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

  const toggleAdActive = (id: string) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))
  }

  const addAd = (ad: Ad) => {
    setAds((prev) => [ad, ...prev])
  }

  const updateAd = (id: string, data: Partial<Ad>) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))
  }

  const deleteAd = (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id))
  }

  return createElement(
    MainStoreContext.Provider,
    {
      value: {
        professionals,
        ads,
        currentUserId,
        setCurrentUserId,
        togglePremium,
        toggleVerified,
        addProfessional,
        updateProfessional,
        toggleAdActive,
        addAd,
        updateAd,
        deleteAd,
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
