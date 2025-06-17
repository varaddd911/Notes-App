import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Noteform from './NoteForm'
import NavigationBar from './components/NavigationBar'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'

function App() {
  const [notes, setNotes] = useState([])
  const { user, loading } = useAuth()

  const addnote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }])
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return (
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <NavigationBar />
        <main className="container mx-auto px-4 py-8">
          <Noteform addnote={addnote} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App




