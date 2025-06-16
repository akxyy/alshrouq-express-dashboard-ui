
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignInPageProps {
  onSignIn: () => void;
}

const SignInPage = ({ onSignIn }: SignInPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex min-h-[600px]">
          {/* Left Section */}
          <div className="flex-1 bg-white p-12 flex items-center justify-center">
            <div className="text-center text-black max-w-md">
              <h1 className="text-4xl font-bold mb-6">Noon Minutes</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Ready to optimize your business logistics? explore our smart solutions in Saudi Arabia.serving a diverse clientele,including thousands of restaurant chanins,retaiers, and e-commerce platforms.with a track record of nearly 20million annual deliveries nationwide.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-12 flex items-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                <p className="text-gray-600">Fill your data to sign in</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <div className="text-left">
                  <a href="#" className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Forgot Password?
                  </a>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-12 py-6 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-gray-600">
            <span className="text-sm">Powered by</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">AE</span>
              </div>
              <span className="font-medium text-gray-900">Noon Minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
