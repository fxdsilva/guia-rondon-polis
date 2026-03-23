import { createContext, createElement, ReactNode, useContext, useState, useEffect } from 'react'
import { MOCK_PROFESSIONALS, MOCK_ADS, Professional, Ad } from './mockData'
import { supabase } from '@/lib/supabase/client'

type MainStoreContextType = {
  professionals: Professional[]
  ads: Ad[]
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void
  togglePremium: (id: string) => void
  toggleVerified: (id: string) => void
  addProfessional: (pro: Professional) => Promise<void>
  updateProfessional: (id: string, data: Partial<Professional>) => Promise<void>
  toggleAdActive: (id: string) => void
  addAd: (ad: Ad) => Promise<void>
  updateAd: (id: string, data: Partial<Ad>) => Promise<void>
  deleteAd: (id: string) => Promise<void>
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS)
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: pros, error: proError } = await supabase
          .from('professionals' as any)
          .select('*')
        if (!proError && pros && pros.length > 0) {
          setProfessionals((prev) => {
            const existingIds = new Set(prev.map((p) => p.id))
            const newPros = pros.filter((p) => !existingIds.has(p.id))
            return [...newPros, ...prev]
          })
        }

        const { data: adsData, error: adError } = await supabase
          .from('advertisements' as any)
          .select('*')
        if (!adError && adsData && adsData.length > 0) {
          setAds((prev) => {
            const existingIds = new Set(prev.map((a) => a.id))
            const newAds = adsData.filter((a) => !existingIds.has(a.id))
            return [...newAds, ...prev]
          })
        }
      } catch (err) {
        console.warn('Error fetching from Supabase, relying on local state', err)
      }
    }
    fetchSupabaseData()
  }, [])

  const togglePremium = (id: string) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, premium: !p.premium } : p)))
  }

  const toggleVerified = (id: string) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p)))
  }

  const addProfessional = async (pro: Professional) => {
    setProfessionals((prev) => [pro, ...prev])
    try {
      await supabase.from('professionals' as any).insert([pro])
    } catch (e) {
      console.error(e)
    }
  }

  const updateProfessional = async (id: string, data: Partial<Professional>) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
    try {
      await supabase
        .from('professionals' as any)
        .update(data)
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleAdActive = (id: string) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))
  }

  const addAd = async (ad: Ad) => {
    setAds((prev) => [ad, ...prev])
    try {
      await supabase.from('advertisements' as any).insert([ad])
    } catch (e) {
      console.error(e)
    }
  }

  const updateAd = async (id: string, data: Partial<Ad>) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))
    try {
      await supabase
        .from('advertisements' as any)
        .update(data)
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteAd = async (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id))
    try {
      await supabase
        .from('advertisements' as any)
        .delete()
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
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
