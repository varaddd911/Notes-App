import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DialogDemo from './DialogDemo';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/items`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSave = async (updatedNote) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/items/${updatedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedNote),
      });
      if (response.ok) {
        setNotes(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)));
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Notes Grid or Empty State */}
        {loading ? (
          <div className="text-center text-muted-foreground">Loading notes...</div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center">
            <div className="inline-flex flex-col items-center justify-center">
              <p className="text-xl font-semibold mb-2">No notes available</p>
              {searchTerm ? (
                <p className="text-muted-foreground">
                  No notes match your search criteria
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Create your first note to get started
                </p>
              )}
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.href = '/'}
              >
                Create Note
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note._id}>
                <CardHeader>
                  <CardTitle>{note.name}</CardTitle>
                  <CardDescription>Type: {note.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{note.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Date: {new Date(note.date).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <DialogDemo note={note} onSave={handleSave} />
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteList;
