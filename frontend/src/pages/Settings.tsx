import { useState } from 'react'
import { Save, User, Mail, Server, Eye, EyeOff } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAppStore } from '../lib/store'

export function Settings() {
  const { config, updateConfig } = useAppStore()
  const [localConfig, setLocalConfig] = useState(config)
  const [showPasswords, setShowPasswords] = useState(false)

  const handleSave = () => {
    updateConfig(localConfig)
    // In a real app, this would save to backend
    alert('Configuration sauvegardée!')
  }

  const mockAccounts = [
    {
      id: 'gestion',
      name: 'Gestion Immobilier MJ',
      email: 'gestionimmobiliermj@gmail.com',
      provider: 'gmail' as const,
      active: true,
      last_sync: '2024-09-15T14:30:00Z'
    },
    {
      id: 'mathieu',
      name: 'Mathieu Personal',
      email: 'mathieu.dufresne2001@outlook.com',
      provider: 'outlook' as const,
      active: true,
      last_sync: '2024-09-15T13:15:00Z'
    },
    {
      id: 'aidyn',
      name: 'AIDyn Technologies',
      email: 'contact@aidyn.ca',
      provider: 'custom' as const,
      active: false,
      last_sync: undefined
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Paramètres</h1>
        <p className="text-sm text-muted-foreground">
          Configuration de MCP-Hub
        </p>
      </div>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Configuration API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">URL de base API</label>
              <Input
                value={localConfig.apiBase}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  apiBase: e.target.value
                })}
                placeholder="http://localhost"
              />
            </div>
            <div>
              <label className="text-sm font-medium">URL Mail Parser</label>
              <Input
                value={localConfig.mailParserUrl}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  mailParserUrl: e.target.value
                })}
                placeholder="http://localhost:12008"
              />
            </div>
            <div>
              <label className="text-sm font-medium">URL MetaMCP Health</label>
              <Input
                value={localConfig.metaMcpHealthUrl}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  metaMcpHealthUrl: e.target.value
                })}
                placeholder="http://localhost:3001/health"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useMock"
                checked={localConfig.useMock}
                onChange={(e) => setLocalConfig({
                  ...localConfig,
                  useMock: e.target.checked
                })}
                className="rounded"
              />
              <label htmlFor="useMock" className="text-sm font-medium">
                Utiliser les données de test
              </label>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full md:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder la configuration
          </Button>
        </CardContent>
      </Card>

      {/* Email Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Comptes email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 p-2 bg-muted rounded-full" />
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.email}</p>
                    {account.last_sync && (
                      <p className="text-xs text-muted-foreground">
                        Dernière sync: {new Date(account.last_sync).toLocaleString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{account.provider}</Badge>
                  <Badge
                    variant={account.active ? "default" : "secondary"}
                    className={account.active
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : ""
                    }
                  >
                    {account.active ? 'Actif' : 'Inactif'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Ajouter un compte
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables (Debug) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Variables d'environnement
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-mono">VITE_API_BASE:</span>
              <span className="font-mono">{import.meta.env.VITE_API_BASE || 'non défini'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-mono">VITE_USE_MOCK:</span>
              <span className="font-mono">{import.meta.env.VITE_USE_MOCK || 'non défini'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-mono">VITE_MAIL_PARSER_URL:</span>
              <span className="font-mono">{import.meta.env.VITE_MAIL_PARSER_URL || 'non défini'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-mono">VITE_METAMCP_HEALTH:</span>
              <span className="font-mono">{import.meta.env.VITE_METAMCP_HEALTH || 'non défini'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}