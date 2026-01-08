import { useState } from "react";
import { Brain, LogOut, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileModal } from "./ProfileModal";

interface NavBarProps {
  onLogout: () => void;
  username: string;
}

export function NavBar({ onLogout, username }: NavBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-glass-border bg-card/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Think Twice AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setProfileOpen(true)}>
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{username}</span>
            </Button>
            <Button variant="subtle" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>
      
      <ProfileModal 
        open={profileOpen} 
        onOpenChange={setProfileOpen}
        username={username}
      />
    </>
  );
}
