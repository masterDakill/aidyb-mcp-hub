import { useEffect, useState } from 'react'
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { apiClient } from '../lib/api'
import { HealthStatus } from '../lib/types'

interface ServiceHealth {
  name: string
  status: HealthStatus | null
  loading: boolean
  error: string | null
}

export function Health() {
  const [services, setServices] = useState<ServiceHealth[]>([
    { name: 'Mail Parser', status: null, loading: false, error: null },
    { name: 'MetaMCP', status: null, loading: false, error: null }
  ])

  const checkHealth = async (serviceName: string) => {
    setServices(prev => prev.map(service =>
      service.name === serviceName
        ? { ...service, loading: true, error: null }
        : service
    ))

    try {
      let status: HealthStatus
      if (serviceName === 'Mail Parser') {
        status = await apiClient.getMailParserHealth()
      } else {
        status = await apiClient.getMetaMcpHealth()
      }

      setServices(prev => prev.map(service =>
        service.name === serviceName
          ? { ...service, status, loading: false }
          : service
      ))
    } catch (error) {
      setServices(prev => prev.map(service =>
        service.name === serviceName
          ? {
              ...service,
              loading: false,
              error: error instanceof Error ? error.message : 'Erreur inconnue'
            }
          : service
      ))
    }
  }

  const checkAllHealth = async () => {
    await Promise.all([
      checkHealth('Mail Parser'),
      checkHealth('MetaMCP')
    ])
  }

  useEffect(() => {
    checkAllHealth()
  }, [])

  const getStatusIcon = (service: ServiceHealth) => {
    if (service.loading) {
      return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
    }
    if (service.error) {
      return <XCircle className="h-5 w-5 text-red-500" />
    }
    if (service.status?.ok) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    return <AlertCircle className="h-5 w-5 text-yellow-500" />
  }

  const getStatusBadge = (service: ServiceHealth) => {
    if (service.loading) {
      return <Badge variant="secondary">Vérification...</Badge>
    }
    if (service.error) {
      return <Badge variant="destructive">Erreur</Badge>
    }
    if (service.status?.ok) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">En ligne</Badge>
    }
    return <Badge variant="secondary">Hors ligne</Badge>
  }

  const overallStatus = services.every(s => s.status?.ok && !s.error)
  const hasErrors = services.some(s => s.error)
  const isLoading = services.some(s => s.loading)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Santé des services</h1>
          <p className="text-sm text-muted-foreground">
            État des services MCP-Hub
          </p>
        </div>

        <Button
          onClick={checkAllHealth}
          disabled={isLoading}
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Overall status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {hasErrors ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : overallStatus ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            État général
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {hasErrors
              ? "Certains services rencontrent des problèmes"
              : overallStatus
              ? "Tous les services fonctionnent correctement"
              : "Vérification des services en cours..."
            }
          </p>
        </CardContent>
      </Card>

      {/* Services grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(service)}
                  {service.name}
                </div>
                {getStatusBadge(service)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {service.status && (
                <div className="space-y-2 text-sm">
                  {service.status.service && (
                    <div>
                      <span className="font-medium">Service:</span> {service.status.service}
                    </div>
                  )}
                  {service.status.timestamp && (
                    <div>
                      <span className="font-medium">Dernière vérification:</span>{' '}
                      {new Date(service.status.timestamp).toLocaleString('fr-FR')}
                    </div>
                  )}
                  {service.status.details && Object.keys(service.status.details).length > 0 && (
                    <div>
                      <span className="font-medium">Détails:</span>
                      <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-auto">
                        {JSON.stringify(service.status.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {service.error && (
                <div className="text-sm text-red-600">
                  <span className="font-medium">Erreur:</span> {service.error}
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => checkHealth(service.name)}
                disabled={service.loading}
                className="w-full"
              >
                {service.loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  'Vérifier'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}