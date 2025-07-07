"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Database,
  Zap,
  Globe,
  Headphones,
  Award,
  Lock,
  Gauge,
  Users,
  Settings,
  BarChart3,
  FileText,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Rocket,
  Crown,
  Heart,
  Sparkles,
} from "lucide-react"

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mainFeatures = [
    {
      icon: Shield,
      title: "Advanced DDoS Protection",
      description: "Enterprise-grade protection against attacks and malicious traffic with real-time monitoring",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      details: ["Real-time attack detection", "Automatic mitigation", "99.9% protection rate", "24/7 monitoring"],
    },
    {
      icon: Database,
      title: "Automatic Backups",
      description: "Daily automated backups with one-click restore functionality to keep your data safe",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      details: ["Daily automated backups", "One-click restore", "30-day retention", "Multiple backup locations"],
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get your server running in under 5 minutes with our automated deployment system",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      details: ["5-minute setup", "Pre-configured templates", "Auto-installation", "Ready-to-play servers"],
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Servers located worldwide for optimal performance and low latency for all players",
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/20",
      details: ["15+ global locations", "Low latency routing", "CDN integration", "Regional optimization"],
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Professional technical support available around the clock via multiple channels",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      details: ["24/7 availability", "Expert technicians", "Multiple support channels", "Average 5min response"],
    },
    {
      icon: Award,
      title: "99.9% Uptime SLA",
      description: "Guaranteed uptime with industry-leading reliability and redundant infrastructure",
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
      details: ["99.9% uptime guarantee", "Redundant infrastructure", "Automatic failover", "SLA compensation"],
    },
  ]

  const performanceFeatures = [
    {
      icon: Cpu,
      title: "High-Performance CPUs",
      description: "Latest generation Intel Xeon processors for maximum performance",
      specs: "Intel Xeon E5-2690 v4 @ 2.6GHz",
    },
    {
      icon: Memory,
      title: "DDR4 ECC RAM",
      description: "Error-correcting memory for stability and reliability",
      specs: "Up to 128GB DDR4-2400 ECC",
    },
    {
      icon: HardDrive,
      title: "NVMe SSD Storage",
      description: "Ultra-fast NVMe SSDs for lightning-quick world loading",
      specs: "NVMe PCIe 3.0 SSDs",
    },
    {
      icon: Wifi,
      title: "Premium Network",
      description: "High-speed network connections with low latency",
      specs: "1Gbps+ dedicated bandwidth",
    },
  ]

  const managementFeatures = [
    {
      icon: Settings,
      title: "Advanced Control Panel",
      description: "Intuitive web-based control panel for easy server management",
    },
    {
      icon: BarChart3,
      title: "Real-time Monitoring",
      description: "Live server statistics and performance monitoring",
    },
    {
      icon: FileText,
      title: "File Manager",
      description: "Built-in file manager for easy world and plugin management",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Advanced user permissions and whitelist management",
    },
  ]

  const securityFeatures = [
    {
      icon: Lock,
      title: "SSL Encryption",
      description: "All connections secured with SSL/TLS encryption",
    },
    {
      icon: Shield,
      title: "Firewall Protection",
      description: "Advanced firewall rules and IP filtering",
    },
    {
      icon: Database,
      title: "Secure Backups",
      description: "Encrypted backups stored in multiple locations",
    },
    {
      icon: Award,
      title: "Compliance Ready",
      description: "GDPR and SOC 2 compliant infrastructure",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center animate-fade-in">
              <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 group">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="SkilloraClouds Logo"
                    width={40}
                    height={40}
                    className="animate-pulse group-hover:animate-bounce transition-all duration-300"
                  />
                  <div className="absolute -inset-1 bg-green-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <span className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                  SkilloraClouds
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 animate-fade-in-delay">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/support", label: "Support" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-all duration-300 hover:scale-105 transform relative group ${
                    item.href === "/features" ? "text-green-400" : "text-gray-300 hover:text-green-400"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                      item.href === "/features" ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-green-400 hover:scale-105 transform transition-all duration-300 hover:bg-green-400/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-600/25 relative overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:scale-110 transform transition-all duration-300 text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4 animate-slide-down">
              <div className="flex flex-col space-y-4">
                {[
                  { href: "/", label: "Home" },
                  { href: "/features", label: "Features" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/support", label: "Support" },
                  { href: "/login", label: "Sign In" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      item.href === "/features" ? "text-green-400" : "text-gray-300 hover:text-green-400"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full hover:scale-105 transform transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 animate-bounce-slow bg-green-600/20 text-green-400 border-green-600/30 hover:scale-110 transition-transform duration-300">
              <Crown className="w-4 h-4 mr-2 animate-pulse" />🚀 Premium Features
            </Badge>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 relative">
              Powerful Features for
              <br />
              <span className="text-green-400 animate-pulse relative">
                Your Minecraft Server
                <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-yellow-400 animate-twinkle" />
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover all the advanced features that make SkilloraClouds the best choice for Minecraft server hosting.
              From enterprise-grade security to lightning-fast performance.
            </p>
          </div>

          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animationDelay: "600ms" }}
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-600/25 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Free Trial
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg hover:scale-110 transform transition-all duration-300 border-2 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-green-400 group"
              >
                <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4 relative">
              Core Features
              <Heart className="absolute -top-2 -right-8 w-6 h-6 text-red-400 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to run a successful Minecraft server, built with enterprise-grade technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-all duration-500 hover:scale-105 hover:shadow-xl group animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full ${feature.bgColor} flex items-center justify-center ${feature.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative`}
                    >
                      <IconComponent className="h-8 w-8" />
                      <div
                        className={`absolute inset-0 rounded-full ${feature.bgColor} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                      />
                    </div>
                    <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300 text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center text-sm animate-fade-in-up group-hover:translate-x-1 transition-transform duration-300"
                          style={{ animationDelay: `${index * 100 + detailIndex * 50}ms` }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 group-hover:animate-pulse" />
                          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed Features Tabs */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">Detailed Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive feature set designed for optimal Minecraft server performance
            </p>
          </div>

          <Tabs defaultValue="performance" className="w-full animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700 mb-8">
              <TabsTrigger
                value="performance"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300"
              >
                <Gauge className="w-4 h-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger
                value="management"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Management
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {performanceFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <Card
                      key={index}
                      className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">
                              {feature.title}
                            </CardTitle>
                            <Badge className="bg-green-600/20 text-green-400 border-green-600/30 mt-1">
                              {feature.specs}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="management" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {managementFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <Card
                      key={index}
                      className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {securityFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <Card
                      key={index}
                      className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600/10 via-green-600/5 to-green-600/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up relative">
          <h2 className="text-4xl font-bold text-white mb-6 animate-pulse">Ready to Experience These Features?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best Minecraft hosting available with{" "}
            <span className="text-green-400 font-semibold animate-pulse">SkilloraClouds</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-600/25 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Free Trial
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Button>
            </Link>
            <Link href="/support">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg hover:scale-110 transform transition-all duration-300 border-2 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-green-400 group"
              >
                <Headphones className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.6s ease-out 0.2s both; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 1.5s ease-in-out infinite; }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
