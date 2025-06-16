import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Noteform from './NoteForm'
import MenubarDemo from './Menubar'
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
    return <Login />
  }

  return (
    <div className="min-h-screen">
      <MenubarDemo />
      <main className="container mx-auto px-4 py-8 mt-16">
        <Noteform addnote={addnote} />
      </main>
    </div>
  )
}

export default App




