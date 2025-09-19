import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { EmailStore, AppStore, EmailWithAnalysis, EmailListParams, EmailAccount, AppConfig } from './types'
import { apiClient } from './api'

export const useEmailStore = create<EmailStore>()(
  devtools(
    (set) => ({
      emails: [],
      selectedEmail: null,
      loading: false,
      error: null,
      stats: null,

      fetchEmails: async (params: EmailListParams = {}) => {
        set({ loading: true, error: null })
        try {
          const response = await apiClient.getEmails(params)
          set({ emails: response.data, loading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Erreur lors du chargement des emails',
            loading: false
          })
        }
      },

      fetchEmail: async (id: number) => {
        set({ loading: true, error: null })
        try {
          const email = await apiClient.getEmail(id)
          set({ selectedEmail: email, loading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Erreur lors du chargement de l\'email',
            loading: false
          })
        }
      },

      fetchStats: async () => {
        try {
          const stats = await apiClient.getStats()
          set({ stats })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Erreur lors du chargement des statistiques'
          })
        }
      },

      selectEmail: (email: EmailWithAnalysis | null) => {
        set({ selectedEmail: email })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      setLoading: (loading: boolean) => {
        set({ loading })
      }
    }),
    { name: 'email-store' }
  )
)

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      activeAccount: null,
      accounts: [],
      config: {
        useMock: import.meta.env.VITE_USE_MOCK === 'true',
        apiBase: import.meta.env.VITE_API_BASE || 'http://localhost',
        mailParserUrl: import.meta.env.VITE_MAIL_PARSER_URL || 'http://localhost:12008',
        metaMcpHealthUrl: import.meta.env.VITE_METAMCP_HEALTH || 'http://localhost:3001/health'
      },

      setActiveAccount: (account: EmailAccount | null) => {
        set({ activeAccount: account })
      },

      setAccounts: (accounts: EmailAccount[]) => {
        set({ accounts })
        if (accounts.length > 0 && !get().activeAccount) {
          set({ activeAccount: accounts[0] })
        }
      },

      updateConfig: (config: Partial<AppConfig>) => {
        set(state => ({
          config: { ...state.config, ...config }
        }))
      }
    }),
    { name: 'app-store' }
  )
)