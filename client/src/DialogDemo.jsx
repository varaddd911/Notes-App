import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo({ note, onSave }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(note?.name || "");
  const [description, setDescription] = useState(note?.description || "");
  const [type, setType] = useState(note?.type || "Personal");
  const [date, setDate] = useState(note?.date ? new Date(note.date).toISOString().slice(0, 10) : "");

  useEffect(() => {
    setName(note?.name || "");
    setDescription(note?.description || "");
    setType(note?.type || "Personal");
    setDate(note?.date ? new Date(note.date).toISOString().slice(0, 10) : "");
  }, [note]);

  const handleSave = () => {
    const updatedNote = {
      ...note,
      name,
      description,
      type,
      date: new Date(date),
    };

    onSave(updatedNote);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Update your note information here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <select id="type" value={type} onChange={e => setType(e.target.value)} className="col-span-3 p-2 rounded border border-gray-300">
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
