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
  const [date, setDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !type || !date) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Format date as DD/MM/YYYY for consistency
      const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
      
      // Add note to local state
      addnote({ title, content, type, date: formattedDate });
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: title,
          description: content,
          type,
          date: formattedDate,
        }),
      });

      if (response.ok) {
        console.log("Note added");
        // Reset form
        setTitle("");
        setContent("");
        setType("");
        setDate(null);
      } else {
        throw new Error('Failed to add note');
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };

  return (
    <Card className="w-[350px] md:w-[450px] lg:w-[550px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">ADD A NOTE</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid w-full gap-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                className="mt-2" 
                id="name" 
                placeholder="Title for the note"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input 
                className="mt-2 mb-2"
                id="description"
                placeholder="Description of your note"
                value={content}
                onChange={(e)=>setContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
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
          <Button type="submit">Add Note</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default NoteForm;
