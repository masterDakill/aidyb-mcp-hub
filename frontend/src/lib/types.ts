export interface Email {
  id: number
  provider: 'gmail' | 'outlook' | 'imap' | 'manual'
  external_id?: string
  from_addr: string
  to_addr: string
  cc_addr?: string
  subject: string
  sent_at: string
  received_at: string
  raw_headers?: string
  raw_body: string
  mailbox: string
  processed: boolean
  processed_at?: string
  error?: string
}

export interface EmailAnalysis {
  id: number
  email_id: number
  summary?: string
  category?: string
  sentiment?: string
  score?: number
  created_at: string
}

export interface EmailAttachment {
  id: number
  email_id: number
  filename: string
  mime_type: string
  size_bytes: number
  storage_uri?: string
}

export interface EmailWithAnalysis extends Email {
  analysis?: EmailAnalysis
  attachments?: EmailAttachment[]
}

export interface EmailStats {
  total_emails: number
  analyzed_emails: number
  processed_emails: number
}

export interface HealthStatus {
  ok: boolean
  service?: string
  timestamp?: string
  details?: Record<string, any>
}

export interface EmailAccount {
  id: string
  name: string
  email: string
  provider: 'gmail' | 'outlook' | 'custom'
  active: boolean
  last_sync?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface EmailListParams {
  account?: string
  limit?: number
  offset?: number
  search?: string
  category?: string
  sentiment?: string
  processed?: boolean
}

export interface ParseEmailRequest {
  raw_email: string
  provider?: string
  external_id?: string
  mailbox?: string
}

export interface ParseEmailResponse {
  id: number
  from_addr: string
  to_addr: string
  subject: string
  category?: string
  sentiment?: string
  summary?: string
  processed: boolean
  status: string
}

export type EmailSentiment = 'positif' | 'negatif' | 'neutre'
export type EmailCategory = 'facture' | 'commande' | 'support' | 'commercial' | 'urgent' | 'general'
export type EmailProvider = 'gmail' | 'outlook' | 'custom'

export interface AppConfig {
  useMock: boolean
  apiBase: string
  mailParserUrl: string
  metaMcpHealthUrl: string
}

export interface AppError {
  message: string
  code?: string
  status?: number
}

// Store types
export interface EmailStore {
  emails: EmailWithAnalysis[]
  selectedEmail: EmailWithAnalysis | null
  loading: boolean
  error: string | null
  stats: EmailStats | null

  // Actions
  fetchEmails: (params?: EmailListParams) => Promise<void>
  fetchEmail: (id: number) => Promise<void>
  fetchStats: () => Promise<void>
  selectEmail: (email: EmailWithAnalysis | null) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export interface AppStore {
  activeAccount: EmailAccount | null
  accounts: EmailAccount[]
  config: AppConfig

  // Actions
  setActiveAccount: (account: EmailAccount | null) => void
  setAccounts: (accounts: EmailAccount[]) => void
  updateConfig: (config: Partial<AppConfig>) => void
}