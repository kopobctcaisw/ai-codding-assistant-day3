import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ConsultingPage } from './pages/ConsultingPage'
import { HomePage } from './pages/HomePage'
import { ProgramsPage } from './pages/ProgramsPage'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
