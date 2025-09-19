import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Tag, TrendingUp, Archive, Trash } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useEmailStore } from '../lib/store'
import { formatDate, getSentimentColor, getCategoryColor } from '../lib/utils'

export function EmailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedEmail, loading, error, fetchEmail } = useEmailStore()

  useEffect(() => {
    if (id) {
      fetchEmail(Number(id))
    }
  }, [id, fetchEmail])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-red-600 mb-4">Erreur: {error}</p>
        <Button onClick={() => navigate('/')}>
          Retour à la boîte de réception
        </Button>
      </div>
    )
  }

  if (!selectedEmail) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-muted-foreground mb-4">Email non trouvé</p>
        <Button onClick={() => navigate('/')}>
          Retour à la boîte de réception
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              Archiver
            </Button>
            <Button variant="outline" size="sm">
              <Trash className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>

        {/* Email meta */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">{selectedEmail.subject}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{selectedEmail.from_addr}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(selectedEmail.received_at)}</span>
            </div>
            <Badge variant="outline">{selectedEmail.provider}</Badge>
          </div>

          {/* Analysis badges */}
          {selectedEmail.analysis && (
            <div className="flex items-center gap-2">
              {selectedEmail.analysis.category && (
                <Badge
                  variant="secondary"
                  className={getCategoryColor(selectedEmail.analysis.category)}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {selectedEmail.analysis.category}
                </Badge>
              )}
              {selectedEmail.analysis.sentiment && (
                <Badge
                  variant="secondary"
                  className={getSentimentColor(selectedEmail.analysis.sentiment)}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {selectedEmail.analysis.sentiment}
                </Badge>
              )}
              {selectedEmail.analysis.score && (
                <Badge variant="outline">
                  Score: {Math.round(selectedEmail.analysis.score * 100)}%
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Summary */}
        {selectedEmail.analysis?.summary && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Résumé automatique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{selectedEmail.analysis.summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Email content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contenu de l'email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="email-content">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {selectedEmail.raw_body}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Pièces jointes ({selectedEmail.attachments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedEmail.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">{attachment.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {attachment.mime_type} • {Math.round(attachment.size_bytes / 1024)} KB
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}