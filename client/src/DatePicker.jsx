"use client"

import * as React from "react"
import { format, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate }) {
  const [open, setOpen] = React.useState(false)
  
  // Handle date selection and close the popover
  const handleSelect = (selectedDate) => {
    setDate(selectedDate)
    setOpen(false) // Close the popover when date is selected
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal mt-2",
            !date && "text-muted-foreground",
            "transition-all border border-input hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
          {date && isValid(date) ? (
            <span className="font-medium">
              {format(date, "EEEE, MMMM do, yyyy")}
            </span>
          ) : (
            <span>Select a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-background" 
        align="start"
        sideOffset={5}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          className="rounded-md border shadow-md p-3"
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "font-semibold text-foreground",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-8 w-8 bg-accent/50 hover:bg-accent rounded-full p-0 opacity-80 hover:opacity-100 transition-opacity",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-10 font-medium text-[0.9rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-accent/50 rounded-full transition-colors",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full font-semibold",
            day_today: "bg-accent text-accent-foreground font-semibold",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>  )
}

export default DatePicker
