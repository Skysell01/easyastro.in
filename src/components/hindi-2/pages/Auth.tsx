import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, ArrowLeft } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user, isAdmin, loading, role } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!loading && user && role !== null) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        toast({
          title: "अनधिकृत पहुंच",
          description: "आपके पास एडमिन एक्सेस नहीं है।",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, isAdmin, loading, role, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "कृपया सभी फ़ील्ड भरें",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    if (isSignUp) {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      setIsLoading(false);

      if (error) {
        toast({
          title: "साइन अप विफल",
          description: error.message === "User already registered" ? "यह ईमेल पहले से पंजीकृत है" : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "साइन अप सफल!",
          description: "कृपया अब लॉगिन करें।",
        });
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      setIsLoading(false);

      if (error) {
        toast({
          title: "लॉगिन विफल",
          description: error.message === "Invalid login credentials" ? "गलत ईमेल या पासवर्ड" : error.message,
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>एडमिन लॉगिन | EasyAstro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            होम पर वापस जाएं
          </button>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">{isSignUp ? "एडमिन साइन अप" : "एडमिन लॉगिन"}</h1>
              <p className="text-muted-foreground mt-2">केवल अधिकृत उपयोगकर्ताओं के लिए</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">ईमेल</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">पासवर्ड</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading
                  ? isSignUp
                    ? "साइन अप हो रहा है..."
                    : "लॉगिन हो रहा है..."
                  : isSignUp
                    ? "साइन अप करें"
                    : "लॉगिन करें"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? "पहले से अकाउंट है? लॉगिन करें" : "नया अकाउंट बनाएं"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Auth;
