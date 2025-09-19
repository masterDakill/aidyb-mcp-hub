import { useEffect, useState } from 'react'
import { Search, Filter, RefreshCw } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { EmailList } from '../components/EmailList'
import { useEmailStore } from '../lib/store'
import { debounce } from '../lib/utils'
import { EmailListParams } from '../lib/types'

export function Inbox() {
  const { emails, loading, error, fetchEmails, fetchStats } = useEmailStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<EmailListParams>({})

  const debouncedFetch = debounce((params: EmailListParams) => {
    fetchEmails(params)
  }, 300)

  useEffect(() => {
    fetchEmails()
    fetchStats()
  }, [fetchEmails, fetchStats])

  useEffect(() => {
    const params = {
      ...filters,
      ...(searchQuery && { search: searchQuery })
    }
    debouncedFetch(params)
  }, [searchQuery, filters, debouncedFetch])

  const handleRefresh = () => {
    fetchEmails(filters)
    fetchStats()
  }

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }))
  }

  const handleSentimentFilter = (sentiment: string) => {
    setFilters(prev => ({
      ...prev,
      sentiment: prev.sentiment === sentiment ? undefined : sentiment
    }))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Boîte de réception</h1>
            <p className="text-sm text-muted-foreground">
              {emails.length} emails
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.category === 'facture' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryFilter('facture')}
          >
            <Filter className="h-3 w-3 mr-1" />
            Factures
          </Button>
          <Button
            variant={filters.category === 'support' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryFilter('support')}
          >
            <Filter className="h-3 w-3 mr-1" />
            Support
          </Button>
          <Button
            variant={filters.category === 'commercial' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryFilter('commercial')}
          >
            <Filter className="h-3 w-3 mr-1" />
            Commercial
          </Button>
          <Button
            variant={filters.sentiment === 'urgent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSentimentFilter('urgent')}
          >
            <Filter className="h-3 w-3 mr-1" />
            Urgent
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {error && (
          <div className="p-4 text-center text-red-600">
            <p>Erreur: {error}</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Réessayer
            </Button>
          </div>
        )}

        {loading && emails.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            Chargement...
          </div>
        ) : (
          <EmailList emails={emails} />
        )}
      </div>
    </div>
  )
}