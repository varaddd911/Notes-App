import * as React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { DatePicker } from "./DatePicker"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const API_URL = import.meta.env.VITE_API_URL;

function NoteForm({ addnote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!title || !content || !type) {
        setError("Please fill in all required fields");
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError("You must be logged in to create notes");
        return;
      }

      const response = await fetch(`${API_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          type,
          date: format(date || new Date(), "yyyy-MM-dd"),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create note');
      }

      const savedNote = await response.json();
      console.log("Note created:", savedNote); // Debug log
      
      // Add to local state and reset form
      addnote(savedNote);
      setTitle("");
      setContent("");
      setType("");
      setDate(new Date());
      
    } catch (error) {
      console.error("Error creating note:", error);
      setError(error.message || "Failed to create note. Please try again.");
    }
  };

  return (
    <Card className="w-[350px] md:w-[450px] lg:w-[550px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">ADD A NOTE</CardTitle>
        {error && (
          <div className="text-red-500 text-center mt-2">{error}</div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Input 
                id="content"
                placeholder="Enter note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select note type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Note
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default NoteForm;
