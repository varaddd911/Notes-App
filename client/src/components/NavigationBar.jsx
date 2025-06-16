import * as React from "react"
import { Menubar, MenubarMenu, MenubarTrigger } from "./components/ui/menubar"
import { ModeToggle } from "./components/mode-toggle"
import { UserMenu } from "./components/UserMenu"

export default function NavigationBar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="text-2xl font-bold mr-8">Notes App</div>
        
        <div className="flex items-center space-x-6 flex-1">
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>Notes</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}
