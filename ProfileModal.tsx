import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Key } from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
}

export function ProfileModal({ open, onOpenChange, username }: ProfileModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            Profile Settings
          </DialogTitle>
          <DialogDescription>
            Manage your account preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Username</label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-glass-border">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">{username}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Change Password</label>
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
