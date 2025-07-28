import { Menu, ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import SiteLogo from "../site-logo";
import NavbarAccountMenu from "../navbar-account-menu";
import MobileLoginLogoutButton from "../mobile-login-logout-button";
import CartIcon from "../cart-icon";

export const Navbar = () => {
  return (
    <section className="py-3 px-3 sticky top-0 z-50 bg-background shadow-sm">
        {/* Desktop Menu */}
        <nav className="hidden justify-between items-center sm:flex gap-2">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link href="/">
              <SiteLogo />
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <CartIcon />
            <NavbarAccountMenu />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2">
              <SiteLogo />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="#" className="flex items-center gap-2">
                      <SiteLogo />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="justify-start">
                      <Link href="/">
                        <UserRound />
                        <span>Account</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="justify-start">
                      <Link href="/cart">
                        <ShoppingCart />
                        <span>Cart</span>
                      </Link>
                    </Button>
                    <MobileLoginLogoutButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
    </section>
  );
};
