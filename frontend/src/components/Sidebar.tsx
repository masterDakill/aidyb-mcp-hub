import { NavLink } from 'react-router-dom'
import {
  Inbox,
  Mail,
  Send,
  Archive,
  Trash,
  Settings,
  Activity,
  X,
  Plus
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useEmailStore } from '../lib/store'
import { cn } from '../lib/utils'

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navigation = [
  { name: 'Boîte de réception', href: '/', icon: Inbox, count: null },
  { name: 'Tous les emails', href: '/emails', icon: Mail, count: null },
  { name: 'Envoyés', href: '/sent', icon: Send, count: null },
  { name: 'Archivés', href: '/archived', icon: Archive, count: null },
  { name: 'Corbeille', href: '/trash', icon: Trash, count: null },
]

const bottomNavigation = [
  { name: 'Santé des services', href: '/health', icon: Activity },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const { stats } = useEmailStore()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold text-lg">Navigation</h2>
            <Button
              variant="aidyn-ghost-primary"
              size="sm"
              className="lg:hidden"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick action */}
          <div className="p-4 border-b">
            <Button className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Composer
            </Button>
          </div>

          {/* Main navigation */}
          <nav className="flex-1 p-4">
            <div className="sidebar-nav">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "sidebar-nav-item",
                      isActive && "bg-accent text-accent-foreground"
                    )
                  }
                  end={item.href === '/'}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.name}</span>
                  {item.name === 'Boîte de réception' && stats && (
                    <Badge variant="aidyn-secondary" className="text-xs">
                      {stats.total_emails}
                    </Badge>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Bottom navigation */}
          <div className="border-t p-4">
            <div className="sidebar-nav">
              {bottomNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "sidebar-nav-item",
                      isActive && "bg-accent text-accent-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}