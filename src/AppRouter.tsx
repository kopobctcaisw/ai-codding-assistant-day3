import { BrowserRouter } from 'react-router-dom'
import App from './App'

type AppRouterProps = {
  basename?: string
}

export function AppRouter({ basename = import.meta.env.BASE_URL }: AppRouterProps) {
  return (
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  )
}
