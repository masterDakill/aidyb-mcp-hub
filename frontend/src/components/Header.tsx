import { Menu, Bell, Settings, Activity } from 'lucide-react'
import { Button } from './ui/button'
import { useAppStore } from '../lib/store'
import { Badge } from './ui/badge'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { activeAccount } = useAppStore()

  return (
    <header className="border-b bg-background px-4 lg:px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="aidyn-ghost-primary"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">MCP-Hub</h1>
          <Badge variant="aidyn-secondary" className="text-xs">
            Email Manager
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {activeAccount && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Compte:</span>
            <span className="font-medium">{activeAccount.email}</span>
            <div
              className={`w-2 h-2 rounded-full ${
                activeAccount.active ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
        )}

        <Button variant="aidyn-ghost-primary" size="sm">
          <Activity className="h-4 w-4" />
        </Button>

        <Button variant="aidyn-ghost-primary" size="sm">
          <Bell className="h-4 w-4" />
        </Button>

        <Button variant="aidyn-ghost-primary" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}