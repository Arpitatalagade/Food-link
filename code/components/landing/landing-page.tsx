'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Building2, Users, Truck, ChevronRight, ArrowRight, Leaf, Zap, Globe } from 'lucide-react'
import { AppLogo } from '@/components/logo/app-logo'

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const roles = [
    {
      title: 'For Restaurants',
      description: 'Share surplus food and reduce waste while making real community impact.',
      icon: Building2,
      accent: 'from-orange-400 to-amber-400',
      light: 'bg-orange-50 dark:bg-orange-950/30',
    },
    {
      title: 'For NGOs',
      description: 'Find and accept food donations to support your community programs.',
      icon: Heart,
      accent: 'from-amber-400 to-yellow-400',
      light: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
      title: 'For Volunteers',
      description: 'Help transport food from donors to those who need it most.',
      icon: Truck,
      accent: 'from-yellow-400 to-orange-400',
      light: 'bg-yellow-50 dark:bg-yellow-950/30',
    },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Simple & Fast',
      description: 'Post surplus food in seconds and connect with NGOs instantly.',
    },
    {
      icon: Globe,
      title: 'Real-Time Tracking',
      description: 'Monitor every donation from pickup to delivery seamlessly.',
    },
    {
      icon: Leaf,
      title: 'Reduce Waste',
      description: 'Transform surplus into meals while caring for the environment.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-orange-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="animate-fade-in cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <AppLogo size="md" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Features</a>
            <a href="#impact" className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">Login</Button>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full"
              onClick={onGetStarted}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left space-y-8">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-500 mb-4 flex items-center gap-2 animate-slide-down">
                  <Leaf className="w-4 h-4 animate-bounce" />
                  Reduce waste. Feed communities.
                </p>
                <h1 className="text-5xl md:text-6xl font-light leading-tight text-gray-900 dark:text-white mb-4 animate-slide-down" style={{ animationDelay: '0.1s' }}>
                  Turn Surplus
                  <br />
                  <span className="text-orange-600 dark:text-orange-500 font-medium animate-text-glow">Into Sustenance</span>
                </h1>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Connect restaurants with NGOs. Transform food surplus into meaningful meals. Create real impact in your community.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={onGetStarted}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-orange-200 dark:border-orange-900 text-gray-900 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-full hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-orange-100 dark:border-gray-800">
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="text-3xl font-light text-orange-600 dark:text-orange-500">50K+</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Meals Distributed</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="text-3xl font-light text-orange-600 dark:text-orange-500">1K+</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Partners</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:flex items-center justify-center animate-slide-in-right">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-b from-orange-200 to-amber-200 rounded-3xl opacity-30 blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50 rounded-3xl"></div>
                
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mGJG2snfFtXdJK1uhSmJSoaP6nkrko.png"
                  alt="Delicious food"
                  className="w-full rounded-3xl shadow-2xl object-cover relative z-10 hover:scale-105 transition-transform duration-300"
                />
                
                {/* Floating cards */}
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 animate-bounce z-20" style={{ animationDelay: '0s' }}>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Fresh Food</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">From restaurants</p>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 animate-bounce z-20" style={{ animationDelay: '0.3s' }}>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Real Impact</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">For communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              How <span className="font-medium text-orange-600 dark:text-orange-500">It Works</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple platform for restaurants, NGOs, and volunteers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, idx) => {
              const IconComponent = role.icon
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl ${role.light} border border-orange-100 dark:border-gray-800 animate-fade-in card-hover group cursor-pointer hover:shadow-xl transition-all duration-300`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${role.accent} p-2.5 mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full" />
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{role.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{role.description}</p>

                  <div className="flex items-center gap-2 mt-6 text-orange-600 dark:text-orange-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              Powerful <span className="font-medium text-orange-600 dark:text-orange-500">Features</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Everything you need to make donation seamless</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border border-orange-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 animate-fade-in card-hover hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center mb-4 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Join the <span className="font-medium text-orange-600 dark:text-orange-500">Movement</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Thousands of restaurants, NGOs, and volunteers are already making a difference. Be part of the solution.
          </p>

          <div className="inline-block">
            <Button 
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full group shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={onGetStarted}
            >
              Start Making Impact
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 dark:bg-black text-gray-400 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-lg font-medium text-white mb-2">
                <AppLogo size="sm" />
              </div>
              <p className="text-sm text-gray-500">Connecting food with purpose</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 FoodFlow. Made with purpose.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
