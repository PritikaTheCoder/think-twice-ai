import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AuthModal } from "@/components/AuthModal";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleAuthSuccess = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  const handleOpenLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthMode("register");
    setAuthModalOpen(true);
  };

  if (isLoggedIn) {
    return <Dashboard username={username} onLogout={handleLogout} />;
  }

  return (
    <>
      <LandingPage onLogin={handleOpenLogin} onRegister={handleOpenRegister} />
      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Index;
