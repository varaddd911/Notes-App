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

const API_URL = import.meta.env.VITE_API_URL;

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/items`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched notes:', data); // Debug log
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      } else {
        throw new Error('Failed to delete note');
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredNotes = notes.filter((note) =>
    (note?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (note?.content?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center">Loading notes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">No notes available</p>
            <p className="text-muted-foreground">
              {searchTerm ? "No notes match your search criteria" : "Create your first note to get started"}
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.href = '/'}
            >
              Create Note
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note._id}>
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>Type: {note.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{note.content}</p>
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
