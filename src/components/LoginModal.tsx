
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        toast({
          title: "Login successful!",
          description: "Welcome back to RescueTails.",
        });
        onClose();
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your email and password.",
        });
      }
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl border border-border/50 shadow-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">RT</span>
            Login to RescueTails
          </DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-input/50 focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-input/50 focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
            <div className="text-right">
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full sm:w-auto gradient-border"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
            
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              Don't have an account? {" "}
              <a href="#" className="text-accent hover:underline font-medium">
                Sign up
              </a>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
