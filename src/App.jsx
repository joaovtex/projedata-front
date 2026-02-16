import { useState } from 'react'
import reactLogo from '/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './pages/menu/index.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="body">
      <AppRoutes />
    </div>
  )
}

export default App
