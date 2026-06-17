import { useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, useGetAdminSession } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HardHat, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // If already authenticated, redirect
  const { data: session } = useGetAdminSession();
  if (session?.authenticated) {
    setLocation("/admin/dashboard");
    return null;
  }

  const loginMutation = useAdminLogin({
    mutation: {
      onSuccess: () => {
        setLocation("/admin/dashboard");
      },
      onError: () => {
        toast({
          title: "Login Failed",
          description: "Invalid password.",
          variant: "destructive",
        });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ data: { password } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-secondary rounded flex items-center justify-center mb-4">
            <HardHat className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-secondary uppercase tracking-tight">DJ Scaffolding</h1>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Admin Password</Label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12"
                placeholder="Enter secure password"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-secondary text-white hover:bg-secondary/90 font-bold uppercase tracking-wide"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access System"}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-secondary font-medium underline underline-offset-4">
            Return to public site
          </a>
        </div>
      </div>
    </div>
  );
}
