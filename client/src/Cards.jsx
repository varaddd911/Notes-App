import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function CardWithForm({ notes }) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note._id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>{note.type} Note</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{note.content}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Date: {new Date(note.date).toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default CardWithForm;
