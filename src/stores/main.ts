import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import {
  MOCK_PLANS,
  MOCK_CATEGORIES,
  MOCK_NEIGHBORHOODS,
  MOCK_PROFESSIONALS,
  MOCK_SERVICES,
  MOCK_REVIEWS,
  MOCK_ADS,
  Plan,
  Category,
  Neighborhood,
  Professional,
  Service,
  Review,
  Ad,
} from './mockData'
import { supabase } from '@/lib/supabase/client'

export type PopulatedProfessional = Professional & {
  category?: Category
  neighborhood?: Neighborhood
  plan?: Plan
  services: Service[]
  reviews: Review[]
  rating: number
  reviewsCount: number
}

type MainStoreContextType = {
  plans: Plan[]
  categories: Category[]
  neighborhoods: Neighborhood[]
  professionals: Professional[]
  services: Service[]
  reviews: Review[]
  ads: Ad[]
  populatedProfessionals: PopulatedProfessional[]
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void
  togglePremium: (id: string) => Promise<void>
  toggleVerified: (id: string) => Promise<void>
  addProfessional: (
    pro: Omit<Professional, 'id' | 'created_at'>,
    servicesList: string[],
  ) => Promise<string | undefined>
  updateProfessional: (id: string, data: Partial<Professional>) => Promise<void>
  toggleAdActive: (id: string) => void
  addAd: (ad: Ad) => Promise<void>
  updateAd: (id: string, data: Partial<Ad>) => Promise<void>
  deleteAd: (id: string) => Promise<void>
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [plans] = useState<Plan[]>(MOCK_PLANS)
  const [categories] = useState<Category[]>(MOCK_CATEGORIES)
  const [neighborhoods] = useState<Neighborhood[]>(MOCK_NEIGHBORHOODS)
  const [professionals, setProfessionals] = useState<Professional[]>(MOCK_PROFESSIONALS)
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES)
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS)
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const [prosRes, srvRes, revRes, adsRes] = await Promise.all([
          supabase.from('professionals' as any).select('*'),
          supabase.from('services' as any).select('*'),
          supabase.from('reviews' as any).select('*'),
          supabase.from('advertisements' as any).select('*'),
        ])

        if (!prosRes.error && prosRes.data && prosRes.data.length > 0) {
          setProfessionals((prev) => {
            const existingIds = new Set(prev.map((p) => p.id))
            const newItems = prosRes.data.filter((i: any) => !existingIds.has(i.id))
            return [...newItems, ...prev]
          })
        }

        if (!srvRes.error && srvRes.data && srvRes.data.length > 0) {
          setServices((prev) => {
            const existingIds = new Set(prev.map((p) => p.id))
            const newItems = srvRes.data.filter((i: any) => !existingIds.has(i.id))
            return [...newItems, ...prev]
          })
        }

        if (!revRes.error && revRes.data && revRes.data.length > 0) {
          setReviews((prev) => {
            const existingIds = new Set(prev.map((p) => p.id))
            const newItems = revRes.data.filter((i: any) => !existingIds.has(i.id))
            return [...newItems, ...prev]
          })
        }

        if (!adsRes.error && adsRes.data && adsRes.data.length > 0) {
          setAds((prev) => {
            const existingIds = new Set(prev.map((a) => a.id))
            const newAds = adsRes.data.filter((a: any) => !existingIds.has(a.id))
            return [...newAds, ...prev]
          })
        }
      } catch (err) {
        console.warn('Error fetching from Supabase, relying on local mock state', err)
      }
    }
    fetchSupabaseData()
  }, [])

  const populatedProfessionals = useMemo(() => {
    return professionals.map((pro) => {
      const proServices = services.filter((s) => s.professional_id === pro.id)
      const proReviews = reviews.filter((r) => r.professional_id === pro.id)
      const category = categories.find((c) => c.id === pro.category_id)
      const neighborhood = neighborhoods.find((n) => n.id === pro.neighborhood_id)
      const plan = plans.find((p) => p.id === pro.plan_id)

      const rating =
        proReviews.length > 0
          ? proReviews.reduce((sum, r) => sum + r.rating, 0) / proReviews.length
          : 0

      return {
        ...pro,
        category,
        neighborhood,
        plan,
        services: proServices,
        reviews: proReviews,
        rating,
        reviewsCount: proReviews.length,
      }
    })
  }, [professionals, services, reviews, categories, neighborhoods, plans])

  const togglePremium = async (id: string) => {
    const pro = professionals.find((p) => p.id === id)
    if (!pro) return
    const newPlanId = pro.plan_id === 'plan-premium' ? 'plan-free' : 'plan-premium'
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, plan_id: newPlanId } : p)))
    try {
      await supabase
        .from('professionals' as any)
        .update({ plan_id: newPlanId })
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleVerified = async (id: string) => {
    const pro = professionals.find((p) => p.id === id)
    if (!pro) return
    const newStatus = !pro.verified
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, verified: newStatus } : p)))
    try {
      await supabase
        .from('professionals' as any)
        .update({ verified: newStatus })
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const addProfessional = async (
    pro: Omit<Professional, 'id' | 'created_at'>,
    servicesList: string[],
  ) => {
    const newId = `new-${Date.now()}`
    const newPro: Professional = { ...pro, id: newId } as Professional

    setProfessionals((prev) => [newPro, ...prev])

    const newServices = servicesList.map((name, i) => ({
      id: `srv-${Date.now()}-${i}`,
      professional_id: newId,
      name,
    }))
    setServices((prev) => [...newServices, ...prev])

    try {
      await supabase.from('professionals' as any).insert([newPro])
      if (newServices.length > 0) {
        await supabase.from('services' as any).insert(newServices)
      }
    } catch (e) {
      console.error(e)
    }
    return newId
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
        plans,
        categories,
        neighborhoods,
        professionals,
        services,
        reviews,
        ads,
        populatedProfessionals,
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
