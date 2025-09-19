import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/Layout'
import { Inbox } from './pages/Inbox'
import { EmailView } from './pages/EmailView'
import { Health } from './pages/Health'
import { Settings } from './pages/Settings'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inbox />} />
            <Route path="emails" element={<Inbox />} />
            <Route path="email/:id" element={<EmailView />} />
            <Route path="sent" element={<Inbox />} />
            <Route path="archived" element={<Inbox />} />
            <Route path="trash" element={<Inbox />} />
            <Route path="health" element={<Health />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App