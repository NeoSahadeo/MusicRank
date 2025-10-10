// @ts-types="react"
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils.ts";
import type { UserType } from "../../types/user.js";
import SearchBar from "../custom/searchbar.tsx";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigate } from "astro:transitions/client";
import { actions } from "astro:actions";

const links = [
  { href: "/", label: "Home", icon: "" },
  { href: "/discover", label: "Discover", icon: "" },
  { href: "/ranking", label: "Ranking", icon: "" },
  { href: "/suggestions", label: "AI Suggestions", icon: "" },
];

export default function Header({ userData }: { userData?: UserType }) {
  let user: UserType["user"] | null = null;
  if (userData) {
    user = userData.user;
  }

  const [pathname, setPathname] = useState("");
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/50 backdrop-blur-lg">
      <div className="flex h-16 items-center px-3">
        <span className="text-white font-bold mr-2">MusicRank</span>
        <span>
          <SearchBar />
        </span>
        <nav className="hidden md:flex items-center space-x-6 ml-auto mr-10">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <div
                  className="w-8 h-8 bg-white rounded-full hover:cursor-pointer outline-white outline-1"
                  style={{
                    backgroundImage: `url(${user.user_metadata.picture ?? "https://i.imgur.com/kB7hu0k.png"})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              ) : (
                <div className="w-8 h-8 bg-white rounded-full hover:cursor-pointer outline-white outline-1"></div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {user ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      navigate("https://github.com/NeoSahadeo/MusicRank")
                    }
                  >
                    GitHub
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      actions.creds.googleSignOut();
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={async () => {
                      navigate(
                        ((await actions.creds.googleSignIn()) as any).data,
                      );
                    }}
                  >
                    Sign In with Google
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        {/* Mobile Nav could be added here with a Sheet component */}
      </div>
    </header>
  );
}
