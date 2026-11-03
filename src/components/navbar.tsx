"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error);
    }
  };
  return (
    <nav className="w-full  border-b border-[#004D3B]/15 bg-[#FFF8E7]">
      <div className="container mx-auto flex h-20  items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            {/* Add your logo here */}

            <Image
              src={"/BookNook Open-Book Emblem.png"}
              alt="booknook"
              width={150}
              height={100}
            ></Image>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="font-medium text-[#004D3B] transition-colors hover:text-[#FFAA00]"
          >
            Home
          </Link>
          <Link
            href="/books"
            className="font-medium text-[#004D3B] transition-colors hover:text-[#FFAA00]"
          >
            All Books
          </Link>
          <Link
            href="/add-book"
            className="font-medium text-[#004D3B] transition-colors hover:text-[#FFAA00]"
          >
            Add Book
          </Link>
          <Link
            href="/my-books"
            className="font-medium text-[#004D3B] transition-colors hover:text-[#FFAA00]"
          >
            My Books
          </Link>
          <Link
            href="/my-borrows"
            className="font-medium text-[#004D3B] transition-colors hover:text-[#FFAA00]"
          >
            My Borrows
          </Link>
        </div>

        {/* Authentication Buttons */}
        {isPending ? (
          <p>Loading...</p>
        ) : session ? (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={session.user.image ?? undefined} />
                    <AvatarFallback>
                      {session.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{session.user.name}</span>
                </Button>
              }
            />

            <PopoverContent className="w-64">
              <PopoverHeader>
                <PopoverTitle>{session.user.name}</PopoverTitle>
                <PopoverDescription>{session.user.email}</PopoverDescription>
              </PopoverHeader>

              <Button
                variant="destructive"
                className="mt-3 w-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#004D3B] text-[#004D3B] hover:bg-[#004D3B] hover:text-[#FFF8E7]"
            >
              <Link href="/log-in">Login</Link>
            </Button>

            <Button className="bg-[#004D3B] text-[#FFF8E7] hover:bg-[#FFAA00] hover:text-[#004D3B]">
              <Link href="/sign-up">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
