import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { formatDate, getSentimentColor, getCategoryColor } from '../lib/utils'
import { EmailWithAnalysis } from '../lib/types'

interface EmailListProps {
  emails: EmailWithAnalysis[]
  selectedId?: number
  onSelect?: (email: EmailWithAnalysis) => void
}

export function EmailList({ emails, selectedId, onSelect }: EmailListProps) {
  const navigate = useNavigate()

  const handleEmailClick = (email: EmailWithAnalysis) => {
    onSelect?.(email)
    navigate(`/email/${email.id}`)
  }

  if (emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        Aucun email trouvé
      </div>
    )
  }

  return (
    <div className="divide-y">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
            selectedId === email.id ? 'bg-muted' : ''
          }`}
          onClick={() => handleEmailClick(email)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm truncate">
                  {email.from_addr}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(email.received_at)}
                </span>
                {!email.processed && (
                  <Badge variant="outline" className="text-xs">
                    Non traité
                  </Badge>
                )}
              </div>

              {/* Subject */}
              <h3 className="font-medium mb-2 line-clamp-1">
                {email.subject}
              </h3>

              {/* Analysis badges */}
              <div className="flex items-center gap-2 mb-2">
                {email.analysis?.category && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getCategoryColor(email.analysis.category)}`}
                  >
                    {email.analysis.category}
                  </Badge>
                )}
                {email.analysis?.sentiment && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getSentimentColor(email.analysis.sentiment)}`}
                  >
                    {email.analysis.sentiment}
                  </Badge>
                )}
                {email.analysis?.score && (
                  <Badge variant="outline" className="text-xs">
                    Score: {Math.round(email.analysis.score * 100)}%
                  </Badge>
                )}
              </div>

              {/* Preview */}
              {email.analysis?.summary && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {email.analysis.summary}
                </p>
              )}
            </div>

            {/* Provider badge */}
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {email.provider}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}