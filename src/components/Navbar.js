'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  LoginLink,
  RegisterLink,
  LogoutLink
} from '@kinde-oss/kinde-auth-nextjs/components';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const pathname = usePathname(); // Get the current route
  const isHomepage = pathname === '/'; // Check if user is on the homepage

  useEffect(() => {
    if (!isHomepage) {
      const fetchSession = async () => {
        try {
          const res = await fetch('/api/auth/session');
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (err) {
          console.error('Failed to fetch user session', err);
        }
      };

      fetchSession();
    }
  }, [isHomepage]);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md">
            {/* ICON */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M12 2v2" />
              <path d="M12 22v-2" />
              <path d="m17 20.66-1-1.73" />
              <path d="M11 10.27 7 3.34" />
              <path d="m20.66 17-1.73-1" />
              <path d="m3.34 7 1.73 1" />
              <path d="M14 12h8" />
              <path d="M2 12h2" />
              <path d="m20.66 7-1.73 1" />
              <path d="m3.34 17 1.73-1" />
              <path d="m17 3.34-1 1.73" />
              <path d="m11 13.73-4 6.93" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
            SkillPe
          </span>
        </div>

        {!user && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <LoginLink className="hidden md:block">
                <Button variant="outline">Log in</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign up</Button>
              </RegisterLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Welcome, {user.given_name || user.name || 'User'}
              </span>
              <LogoutLink>
                <Button variant="outline" className="text-xs">Log out</Button>
              </LogoutLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
