import * as React from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet"
import { Button } from "./ui/button"
import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { UserMenu } from "./UserMenu"

export default function NavigationBar() {
  const location = useLocation();
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex-none">
          <Link to="/" className="text-2xl font-bold">
            Notes App
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/notes" 
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Notes
          </Link>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center space-x-4 ml-auto">
          <ModeToggle />
          <UserMenu />

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Access app pages and features
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link 
                    to="/" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/notes" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Notes
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
