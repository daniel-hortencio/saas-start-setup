import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Icon,
} from "@repo/ui/components";
import { signOut } from "next-auth/react";

export function DashboardMobileMenu() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Icon name="List" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-full flex-auto flex flex-col items-end gap-5">
          <DrawerClose>
            <Button variant="outline" size="icon" className="rounded-full">
              <Icon name="X" />
            </Button>
          </DrawerClose>
          <nav>
            <Button onClick={() => signOut()} variant="link" className="px-0">
              <div className="flex items-center gap-2">
                <Icon name="SignOut" />
                <span>Signout</span>
              </div>
            </Button>
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
