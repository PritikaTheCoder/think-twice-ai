import { Mail, Shield, FileText } from "lucide-react";

interface FooterProps {
  onOpenEthics?: () => void;
}

export function Footer({ onOpenEthics }: FooterProps) {
  return (
    <footer className="border-t border-glass-border bg-card/40 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <span className="font-medium">Contact</span>
            </div>
            <p className="text-sm text-muted-foreground">
              support@thinktwice.ai
            </p>
          </div>

          {/* Privacy & AI Ethics */}
          <div className="space-y-3">
            <button 
              onClick={onOpenEthics}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-medium">Privacy & AI Ethics</span>
            </button>
            <p className="text-sm text-muted-foreground">
              Your reflections are private. We never train AI on personal data.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium">Disclaimer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Think Twice AI is a reflection tool, not a substitute for professional advice.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-glass-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2026 Think Twice AI. Built with care for mindful decision-making.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emotional-calm animate-pulse" />
                All data stored locally
              </span>
              <span>•</span>
              <span>No external APIs</span>
              <span>•</span>
              <span>100% Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
