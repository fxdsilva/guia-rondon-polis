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
  PLAN_FREE_ID,
  PLAN_PREMIUM_ID,
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
  addCategory: (cat: Omit<Category, 'id' | 'created_at'>) => Promise<void>
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  toggleAdActive: (id: string) => void
  addAd: (ad: Omit<Ad, 'id'>) => Promise<void>
  updateAd: (id: string, data: Partial<Ad>) => Promise<void>
  deleteAd: (id: string) => Promise<void>
  generateOtp: (phone: string) => Promise<string | null>
  verifyOtp: (phone: string, code: string) => Promise<string | null>
}

const MainStoreContext = createContext<MainStoreContextType | undefined>(undefined)

export function MainStoreProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const [pRes, cRes, nRes] = await Promise.all([
          supabase
            .from('plans' as any)
            .select('id')
            .limit(1),
          supabase
            .from('categories' as any)
            .select('id')
            .limit(1),
          supabase
            .from('neighborhoods' as any)
            .select('id')
            .limit(1),
        ])

        const seeds = []
        if (!pRes.error && pRes.data.length === 0)
          seeds.push(supabase.from('plans' as any).insert(MOCK_PLANS))
        if (!cRes.error && cRes.data.length === 0)
          seeds.push(
            supabase
              .from('categories' as any)
              .insert(
                MOCK_CATEGORIES.map((c) => ({
                  id: c.id,
                  name: c.name,
                  slug: c.slug,
                  icon: c.icon,
                  group: c.group,
                  emoji: c.emoji,
                  group_emoji: c.groupEmoji,
                  suggested_services: c.suggested_services,
                })),
              ),
          )
        if (!nRes.error && nRes.data.length === 0)
          seeds.push(
            supabase
              .from('neighborhoods' as any)
              .insert(
                MOCK_NEIGHBORHOODS.map((n) => ({
                  id: n.id,
                  name: n.name,
                  latitude: n.latitude,
                  longitude: n.longitude,
                  group: n.group,
                })),
              ),
          )
        if (seeds.length > 0) await Promise.all(seeds)

        const proRes = await supabase
          .from('professionals' as any)
          .select('id')
          .limit(1)
        if (!proRes.error && proRes.data.length === 0) {
          await supabase.from('professionals' as any).insert(MOCK_PROFESSIONALS)
          await supabase.from('services' as any).insert(MOCK_SERVICES)
          await supabase.from('reviews' as any).insert(MOCK_REVIEWS)
        }

        const adRes = await supabase
          .from('advertisements' as any)
          .select('id')
          .limit(1)
        if (!adRes.error && adRes.data.length === 0) {
          await supabase
            .from('advertisements' as any)
            .insert(
              MOCK_ADS.map((a) => ({
                id: a.id,
                company_name: a.companyName,
                description: a.description,
                image_url: a.imageUrl,
                link: a.link,
                target_categories: a.targetCategories,
                active: a.active,
                phone: a.phone,
                website: a.website,
                facebook: a.facebook,
                instagram: a.instagram,
                is_general: a.isGeneral,
              })),
            )
        }

        const [dbP, dbS, dbR, dbA, dbC, dbN, dbPl] = await Promise.all([
          supabase
            .from('professionals' as any)
            .select('*')
            .order('created_at', { ascending: false }),
          supabase.from('services' as any).select('*'),
          supabase.from('reviews' as any).select('*'),
          supabase.from('advertisements' as any).select('*'),
          supabase.from('categories' as any).select('*'),
          supabase.from('neighborhoods' as any).select('*'),
          supabase.from('plans' as any).select('*'),
        ])

        if (dbC.data) setCategories(dbC.data.map((c: any) => ({ ...c, groupEmoji: c.group_emoji })))
        if (dbN.data) setNeighborhoods(dbN.data)
        if (dbPl.data) setPlans(dbPl.data)
        if (dbP.data) setProfessionals(dbP.data)
        if (dbS.data) setServices(dbS.data)
        if (dbR.data) setReviews(dbR.data)
        if (dbA.data)
          setAds(
            dbA.data.map((a: any) => ({
              id: a.id,
              companyName: a.company_name,
              description: a.description,
              imageUrl: a.image_url,
              link: a.link,
              targetCategories: a.target_categories || [],
              active: a.active,
              phone: a.phone,
              website: a.website,
              facebook: a.facebook,
              instagram: a.instagram,
              isGeneral: a.is_general,
            })),
          )
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
      const rating =
        proReviews.length > 0
          ? proReviews.reduce((sum, r) => sum + r.rating, 0) / proReviews.length
          : 0

      return {
        ...pro,
        category: categories.find((c) => c.id === pro.category_id),
        neighborhood: neighborhoods.find((n) => n.id === pro.neighborhood_id),
        plan: plans.find((p) => p.id === pro.plan_id),
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
    const newPlanId = pro.plan_id === PLAN_PREMIUM_ID ? PLAN_FREE_ID : PLAN_PREMIUM_ID
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
    setProfessionals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verified: !pro.verified } : p)),
    )
    try {
      await supabase
        .from('professionals' as any)
        .update({ verified: !pro.verified })
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const addProfessional = async (
    pro: Omit<Professional, 'id' | 'created_at'>,
    servicesList: string[],
  ) => {
    try {
      const { data: newPro, error } = await supabase
        .from('professionals' as any)
        .insert([pro])
        .select()
        .single()
      if (error) throw error

      setProfessionals((prev) => [newPro as Professional, ...prev])

      if (servicesList.length > 0) {
        const newServices = servicesList.map((name) => ({ professional_id: newPro.id, name }))
        const { data: srvData } = await supabase
          .from('services' as any)
          .insert(newServices)
          .select()
        if (srvData) setServices((prev) => [...(srvData as Service[]), ...prev])
      }
      return newPro.id
    } catch (e) {
      console.error(e)
      return undefined
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

  const addCategory = async (cat: Omit<Category, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('categories' as any)
        .insert([{ ...cat, group_emoji: cat.groupEmoji }])
        .select()
        .single()
      if (!error && data)
        setCategories((prev) => [...prev, { ...data, groupEmoji: data.group_emoji } as Category])
    } catch (e) {
      console.error(e)
    }
  }

  const updateCategory = async (id: string, data: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)))
    try {
      await supabase
        .from('categories' as any)
        .update(data)
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    try {
      await supabase
        .from('categories' as any)
        .delete()
        .eq('id', id)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleAdActive = (id: string) =>
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))

  const addAd = async (ad: Omit<Ad, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('advertisements' as any)
        .insert([
          {
            company_name: ad.companyName,
            description: ad.description,
            image_url: ad.imageUrl,
            link: ad.link,
            target_categories: ad.targetCategories,
            active: ad.active,
            phone: ad.phone,
            website: ad.website,
            facebook: ad.facebook,
            instagram: ad.instagram,
            is_general: ad.isGeneral,
          },
        ])
        .select()
        .single()
      if (!error && data) setAds((prev) => [{ ...ad, id: data.id } as Ad, ...prev])
    } catch (e) {
      console.error(e)
    }
  }

  const updateAd = async (id: string, data: Partial<Ad>) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))
    try {
      await supabase
        .from('advertisements' as any)
        .update({
          company_name: data.companyName,
          image_url: data.imageUrl,
          target_categories: data.targetCategories,
          ...data,
        })
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

  const generateOtp = async (phone: string) => {
    try {
      const { data: pro, error: proError } = await supabase
        .from('professionals' as any)
        .select('id')
        .eq('phone', phone)
        .single()
      if (proError || !pro) return null

      const code = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 10 * 60000).toISOString()

      await supabase
        .from('otps' as any)
        .delete()
        .eq('phone', phone)
      await supabase.from('otps' as any).insert([{ phone, code, expires_at: expiresAt }])
      return code
    } catch (e) {
      console.error(e)
      return null
    }
  }

  const verifyOtp = async (phone: string, code: string) => {
    try {
      const { data, error } = await supabase
        .from('otps' as any)
        .select('*')
        .eq('phone', phone)
        .eq('code', code)
        .gte('expires_at', new Date().toISOString())
        .single()
      if (data && !error) {
        const { data: pro } = await supabase
          .from('professionals' as any)
          .select('id')
          .eq('phone', phone)
          .single()
        await supabase
          .from('otps' as any)
          .delete()
          .eq('phone', phone)
        return pro?.id || null
      }
    } catch (e) {
      console.error(e)
    }
    return null
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
        addCategory,
        updateCategory,
        deleteCategory,
        toggleAdActive,
        addAd,
        updateAd,
        deleteAd,
        generateOtp,
        verifyOtp,
      },
    },
    children,
  )
}

export default function useMainStore() {
  const context = useContext(MainStoreContext)
  if (!context) throw new Error('useMainStore must be used within a MainStoreProvider')
  return context
}
