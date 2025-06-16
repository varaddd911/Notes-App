import * as React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "./components/ui/menubar";
import { ModeToggle } from "./components/mode-toggle";
import { UserMenu } from "./components/UserMenu";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

export default function MenubarDemo() {
  const navigate = useNavigate();
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-6 container mx-auto">
        {/* Logo - Hidden on mobile, visible on desktop */}
        <div className="text-3xl font-bold hidden md:block w-[200px]">Notes App</div>
        
        {/* Center Menu Items */}
        <div className="flex-1 flex items-center justify-center">
          {/* Mobile Logo */}
          <div className="text-2xl font-bold md:hidden mr-4">Notes App</div>
          
          {/* Navigation Items */}
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger 
                className="cursor-pointer text-2xl font-medium px-8 py-2 hover:text-primary transition-colors" 
                onClick={() => navigate('/Home')}
              >
                Home
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger 
                className="cursor-pointer text-2xl font-medium px-8 py-2 hover:text-primary transition-colors" 
                onClick={() => navigate('/Notes')}
              >
                Notes
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Right Side Items - Fixed width to balance with logo */}
        <div className="flex items-center justify-end space-x-6 w-[200px]">
          <div className="hidden md:flex items-center space-x-6">
            <ModeToggle size="large" /> {/* This will be picked up by the ModeToggle component */}
            <UserMenu />
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md border">
                  <Menu size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem 
                  className="text-xl py-4 hover:text-primary transition-colors" 
                  onClick={() => navigate('/Home')}
                >
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-xl py-4 hover:text-primary transition-colors" 
                  onClick={() => navigate('/Notes')}
                >
                  Notes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
