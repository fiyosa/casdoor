import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/static/layout/layout'
import NotFound from './pages/404'
import Callback from './pages/callback'
import Home from './pages/home'

export default function Path() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
