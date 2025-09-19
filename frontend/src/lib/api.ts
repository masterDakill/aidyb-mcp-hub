import axios, { AxiosInstance } from 'axios'
import type {
  EmailWithAnalysis,
  EmailStats,
  HealthStatus,
  EmailListParams,
  ParseEmailRequest,
  ParseEmailResponse,
  PaginatedResponse,
} from './types'

class ApiClient {
  private client: AxiosInstance
  private useMock: boolean

  constructor() {
    this.useMock = import.meta.env.VITE_USE_MOCK === 'true'

    this.client = axios.create({
      baseURL: this.useMock ? '' : import.meta.env.VITE_API_BASE || 'http://localhost',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Intercepteurs pour la gestion d'erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error)
        return Promise.reject(error)
      }
    )
  }

  // Health endpoints
  async getMailParserHealth(): Promise<HealthStatus> {
    if (this.useMock) {
      return { ok: true, service: 'mail-parser', timestamp: new Date().toISOString() }
    }

    const response = await this.client.get('/api/health')
    return response.data
  }

  async getMetaMcpHealth(): Promise<HealthStatus> {
    if (this.useMock) {
      return { ok: true, service: 'metamcp', timestamp: new Date().toISOString() }
    }

    const url = import.meta.env.VITE_METAMCP_HEALTH || 'http://localhost:3001/health'
    const response = await axios.get(url)
    return response.data
  }

  // Email endpoints
  async getEmails(params: EmailListParams = {}): Promise<PaginatedResponse<EmailWithAnalysis>> {
    if (this.useMock) {
      return this.getMockEmails(params)
    }

    const queryParams = new URLSearchParams()
    if (params.account) queryParams.append('account', params.account)
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.offset) queryParams.append('offset', params.offset.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.category) queryParams.append('category', params.category)
    if (params.sentiment) queryParams.append('sentiment', params.sentiment)
    if (params.processed !== undefined) queryParams.append('processed', params.processed.toString())

    const response = await this.client.get(`/api/emails?${queryParams.toString()}`)
    return response.data
  }

  async getEmail(id: number): Promise<EmailWithAnalysis> {
    if (this.useMock) {
      return this.getMockEmail(id)
    }

    const response = await this.client.get(`/api/emails/${id}`)
    return response.data
  }

  async getStats(): Promise<EmailStats> {
    if (this.useMock) {
      return {
        total_emails: 127,
        analyzed_emails: 98,
        processed_emails: 127
      }
    }

    const response = await this.client.get('/api/stats')
    return response.data
  }

  async parseEmail(request: ParseEmailRequest): Promise<ParseEmailResponse> {
    if (this.useMock) {
      return {
        id: Date.now(),
        from_addr: 'test@example.com',
        to_addr: 'user@example.com',
        subject: 'Email de test',
        category: 'general',
        sentiment: 'neutre',
        summary: 'Ceci est un email de test',
        processed: true,
        status: 'success'
      }
    }

    const response = await this.client.post('/api/parse', request)
    return response.data
  }

  // Mock data pour le développement
  private async getMockEmails(params: EmailListParams): Promise<PaginatedResponse<EmailWithAnalysis>> {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockEmails: EmailWithAnalysis[] = [
      {
        id: 1,
        provider: 'gmail',
        external_id: 'gmail_001',
        from_addr: 'facturation@acme.com',
        to_addr: 'gestionimmobiliermj@gmail.com',
        subject: 'Facture #2024-001 - Votre commande du 15 septembre',
        sent_at: '2024-09-15T14:30:00Z',
        received_at: '2024-09-15T14:31:00Z',
        raw_body: 'Bonjour,\n\nVeuillez trouver ci-joint votre facture...',
        mailbox: 'INBOX',
        processed: true,
        processed_at: '2024-09-15T14:32:00Z',
        analysis: {
          id: 1,
          email_id: 1,
          summary: 'Facture mensuelle pour services',
          category: 'facture',
          sentiment: 'neutre',
          score: 0.8,
          created_at: '2024-09-15T14:32:00Z'
        }
      },
      {
        id: 2,
        provider: 'gmail',
        external_id: 'gmail_002',
        from_addr: 'support@servicetech.fr',
        to_addr: 'gestionimmobiliermj@gmail.com',
        subject: 'Urgent: Problème avec votre installation',
        sent_at: '2024-09-15T16:45:00Z',
        received_at: '2024-09-15T16:46:00Z',
        raw_body: 'Nous avons détecté un problème urgent...',
        mailbox: 'INBOX',
        processed: true,
        processed_at: '2024-09-15T16:47:00Z',
        analysis: {
          id: 2,
          email_id: 2,
          summary: 'Problème technique urgent nécessitant une intervention',
          category: 'support',
          sentiment: 'negatif',
          score: 0.9,
          created_at: '2024-09-15T16:47:00Z'
        }
      },
      {
        id: 3,
        provider: 'outlook',
        external_id: 'outlook_001',
        from_addr: 'commercial@newbusiness.com',
        to_addr: 'gestionimmobiliermj@gmail.com',
        subject: 'Proposition de partenariat commercial',
        sent_at: '2024-09-15T10:15:00Z',
        received_at: '2024-09-15T10:16:00Z',
        raw_body: 'Bonjour,\n\nNous aimerions vous proposer...',
        mailbox: 'INBOX',
        processed: true,
        processed_at: '2024-09-15T10:17:00Z',
        analysis: {
          id: 3,
          email_id: 3,
          summary: 'Proposition de collaboration commerciale',
          category: 'commercial',
          sentiment: 'positif',
          score: 0.7,
          created_at: '2024-09-15T10:17:00Z'
        }
      }
    ]

    // Simulation du filtrage
    let filteredEmails = [...mockEmails]

    if (params.search) {
      const search = params.search.toLowerCase()
      filteredEmails = filteredEmails.filter(email =>
        email.subject.toLowerCase().includes(search) ||
        email.from_addr.toLowerCase().includes(search) ||
        email.raw_body.toLowerCase().includes(search)
      )
    }

    if (params.category) {
      filteredEmails = filteredEmails.filter(email =>
        email.analysis?.category === params.category
      )
    }

    if (params.sentiment) {
      filteredEmails = filteredEmails.filter(email =>
        email.analysis?.sentiment === params.sentiment
      )
    }

    const limit = params.limit || 50
    const offset = params.offset || 0
    const paginatedEmails = filteredEmails.slice(offset, offset + limit)

    return {
      data: paginatedEmails,
      total: filteredEmails.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      hasMore: offset + limit < filteredEmails.length
    }
  }

  private async getMockEmail(id: number): Promise<EmailWithAnalysis> {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      id,
      provider: 'gmail',
      external_id: `gmail_${id.toString().padStart(3, '0')}`,
      from_addr: 'sender@example.com',
      to_addr: 'gestionimmobiliermj@gmail.com',
      subject: `Email de test #${id}`,
      sent_at: '2024-09-15T14:30:00Z',
      received_at: '2024-09-15T14:31:00Z',
      raw_body: `Ceci est le contenu de l'email de test numéro ${id}.\n\nIl contient plusieurs paragraphes pour tester l'affichage.\n\nCordialement,\nL'équipe de test`,
      mailbox: 'INBOX',
      processed: true,
      processed_at: '2024-09-15T14:32:00Z',
      analysis: {
        id,
        email_id: id,
        summary: `Résumé de l'email de test ${id}`,
        category: 'general',
        sentiment: 'neutre',
        score: 0.7,
        created_at: '2024-09-15T14:32:00Z'
      }
    }
  }
}

export const apiClient = new ApiClient()
export default apiClient