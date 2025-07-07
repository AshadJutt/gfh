"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Check,
  Star,
  Zap,
  Database,
  Globe,
  Headphones,
  Menu,
  X,
  Crown,
  Rocket,
  Heart,
  Sparkles,
  TrendingUp,
  Users,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Shield,
  Clock,
  Server,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small groups and beginners starting their Minecraft journey",
      monthlyPrice: 0.94,
      annualPrice: 0.75,
      originalPrice: 4.99,
      features: [
        "Perfect for small groups",
        "Basic mod support",
        "24/7 server uptime",
        "Free subdomain",
        "Basic DDoS protection",
        "Web-based control panel",
        "Automatic daily backups",
        "Plugin support",
        "Email support",
        "1-Click modpack install",
      ],
      specs: {
        ram: "2GB DDR4",
        storage: "10GB NVMe SSD",
        players: "Up to 10",
        cpu: "1 CPU Core",
        bandwidth: "Unlimited",
        locations: "3 Locations",
      },
      icon: Zap,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-600/50",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      popular: false,
      recommended: false,
    },
    {
      name: "Basic",
      description: "Great for growing communities with more players and advanced features",
      monthlyPrice: 1.5,
      annualPrice: 1.2,
      originalPrice: 8.99,
      features: [
        "Great for growing communities",
        "Advanced mod support",
        "99.9% uptime guarantee",
        "Free custom domain",
        "Enhanced DDoS protection",
        "Advanced control panel",
        "Daily automated backups",
        "Full plugin library access",
        "Priority email support",
        "Custom JAR uploads",
        "Scheduled restarts",
      ],
      specs: {
        ram: "4GB DDR4",
        storage: "25GB NVMe SSD",
        players: "Up to 20",
        cpu: "2 CPU Cores",
        bandwidth: "Unlimited",
        locations: "5 Locations",
      },
      icon: Server,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-600/50",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      popular: false,
      recommended: false,
    },
    {
      name: "Standard",
      description: "Our most popular plan, perfect for established servers with active communities",
      monthlyPrice: 2,
      annualPrice: 1.6,
      originalPrice: 14.99,
      features: [
        "Most popular choice",
        "Heavy modpack support",
        "99.95% uptime guarantee",
        "Multiple server locations",
        "Premium DDoS protection",
        "Advanced server management",
        "Hourly automated backups",
        "Custom JAR support",
        "Priority support queue",
        "Free server migrations",
        "MySQL database included",
        "Advanced monitoring",
      ],
      specs: {
        ram: "6GB DDR4",
        storage: "50GB NVMe SSD",
        players: "Up to 40",
        cpu: "3 CPU Cores",
        bandwidth: "Unlimited",
        locations: "8 Locations",
      },
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-600/50",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-yellow-600",
      popular: true,
      recommended: false,
    },
    {
      name: "Premium",
      description: "Premium performance for serious server owners and large communities",
      monthlyPrice: 2.5,
      annualPrice: 2.0,
      originalPrice: 22.99,
      features: [
        "High-performance gaming",
        "Complex modpack support",
        "99.99% uptime guarantee",
        "Global server network",
        "Enterprise DDoS protection",
        "White-label control panel",
        "Real-time backups",
        "Custom server software",
        "Dedicated support agent",
        "Free server optimization",
        "Advanced monitoring tools",
        "API access",
        "Custom plugins",
      ],
      specs: {
        ram: "8GB DDR4",
        storage: "100GB NVMe SSD",
        players: "Up to 60",
        cpu: "4 CPU Cores",
        bandwidth: "Unlimited",
        locations: "12 Locations",
      },
      icon: Database,
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
      borderColor: "border-pink-600/50",
      gradientFrom: "from-pink-500",
      gradientTo: "to-pink-600",
      popular: false,
      recommended: false,
    },
    {
      name: "Pro",
      description: "Professional-grade hosting for large networks and commercial servers",
      monthlyPrice: 3,
      annualPrice: 2.4,
      originalPrice: 34.99,
      features: [
        "Professional-grade hosting",
        "Unlimited modpack support",
        "99.99% uptime SLA",
        "Dedicated IP address",
        "Military-grade DDoS protection",
        "Custom control panel branding",
        "Continuous data protection",
        "Multi-server management",
        "24/7 phone support",
        "Performance optimization",
        "Custom server configurations",
        "API access",
        "White-label solutions",
        "Dedicated account manager",
      ],
      specs: {
        ram: "12GB DDR4",
        storage: "200GB NVMe SSD",
        players: "Up to 100",
        cpu: "6 CPU Cores",
        bandwidth: "Unlimited",
        locations: "15 Locations",
      },
      icon: Crown,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-600/50",
      gradientFrom: "from-red-500",
      gradientTo: "to-red-600",
      popular: false,
      recommended: false,
    },
    {
      name: "Enterprise",
      description: "Ultimate hosting solution for large networks, businesses, and enterprise clients",
      monthlyPrice: 4,
      annualPrice: 3.2,
      originalPrice: 59.99,
      features: [
        "Enterprise-level infrastructure",
        "Unlimited everything",
        "100% uptime guarantee",
        "Dedicated server resources",
        "Custom security solutions",
        "Fully managed service",
        "Enterprise backup solutions",
        "Multi-region deployment",
        "Dedicated account manager",
        "Custom development support",
        "SLA guarantees",
        "White-glove setup service",
        "Advanced analytics",
        "Priority queue bypass",
        "Custom integrations",
      ],
      specs: {
        ram: "16GB+ DDR4",
        storage: "500GB+ NVMe SSD",
        players: "Unlimited",
        cpu: "8+ CPU Cores",
        bandwidth: "Unlimited",
        locations: "Global Network",
      },
      icon: Crown,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-600/50",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      popular: false,
      recommended: false,
    },
  ]

  const addons = [
    {
      name: "Additional RAM",
      description: "Boost your server performance with extra memory",
      price: 1.0,
      unit: "per GB/month",
      icon: Memory,
      color: "text-blue-400",
    },
    {
      name: "Extra Storage",
      description: "More space for worlds, plugins, and backups",
      price: 1.0,
      unit: "per 10GB/month",
      icon: HardDrive,
      color: "text-green-400",
    },
    {
      name: "Dedicated IP",
      description: "Your own unique server address and better performance",
      price: 1.0,
      unit: "per month",
      icon: Globe,
      color: "text-yellow-400",
    },
    {
      name: "Priority Support",
      description: "Jump to the front of the support queue with VIP treatment",
      price: 1.0,
      unit: "per month",
      icon: Headphones,
      color: "text-purple-400",
    },
  ]

  const features = [
    {
      category: "Performance",
      icon: Cpu,
      items: [
        "Latest Intel Xeon processors",
        "DDR4 ECC memory",
        "NVMe SSD storage",
        "1Gbps+ network",
        "99.9% uptime SLA",
      ],
    },
    {
      category: "Management",
      icon: Server,
      items: [
        "Intuitive control panel",
        "One-click modpack installation",
        "File manager with editor",
        "Real-time server monitoring",
        "Scheduled restarts",
      ],
    },
    {
      category: "Security",
      icon: Shield,
      items: [
        "Advanced DDoS protection",
        "Automated backups",
        "SSL encryption",
        "Firewall protection",
        "Malware scanning",
      ],
    },
    {
      category: "Support",
      icon: Headphones,
      items: ["24/7 expert support", "Discord community", "Knowledge base", "Video tutorials", "Migration assistance"],
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
                    item.href === "/pricing" ? "text-green-400" : "text-gray-300 hover:text-green-400"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                      item.href === "/pricing" ? "w-full" : "w-0 group-hover:w-full"
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
                      item.href === "/pricing" ? "text-green-400" : "text-gray-300 hover:text-green-400"
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
              <Crown className="w-4 h-4 mr-2 animate-pulse" />💰 Transparent Pricing
            </Badge>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 relative">
              Simple, Affordable
              <br />
              <span className="text-green-400 animate-pulse relative">
                Minecraft Hosting
                <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-yellow-400 animate-twinkle" />
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your Minecraft server. All plans include premium features, 24/7 support, and
              our industry-leading uptime guarantee.
            </p>
          </div>

          {/* Billing Toggle */}
          <div
            className="animate-fade-in-up flex items-center justify-center space-x-4 mb-8"
            style={{ animationDelay: "600ms" }}
          >
            <Label htmlFor="billing-toggle" className="text-gray-300 font-medium">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-green-600"
            />
            <Label htmlFor="billing-toggle" className="text-gray-300 font-medium">
              Annual
            </Label>
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30 animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              Save 20%
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-gray-800/30 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8 overflow-visible">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice
              const savings = isAnnual ? ((plan.monthlyPrice - plan.annualPrice) * 12).toFixed(0) : 0
              const discount = isAnnual
                ? Math.round(((plan.monthlyPrice - plan.annualPrice) / plan.monthlyPrice) * 100)
                : 0

              return (
                <div key={index} className="relative h-full">
                  {/* Popular Badge - Outside the card */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 text-sm font-bold animate-bounce-slow hover:scale-110 transition-transform duration-300 shadow-lg border-0 whitespace-nowrap">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={`relative h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transform bg-gray-800/90 backdrop-blur-sm border-gray-700 animate-fade-in-up group cursor-pointer overflow-visible ${
                      plan.popular
                        ? "ring-2 ring-green-500 shadow-xl scale-105 border-green-500/50 pt-6"
                        : plan.recommended
                          ? "ring-2 ring-yellow-500 shadow-lg border-yellow-500/50"
                          : `hover:${plan.borderColor} hover:shadow-2xl`
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Recommended Badge */}
                    {plan.recommended && !plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-1 text-xs font-semibold">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      </div>
                    )}

                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <CardHeader className="text-center pb-6 relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${plan.bgColor} flex items-center justify-center ${plan.color} hover:scale-125 hover:rotate-12 transition-all duration-500 relative group-hover:animate-bounce shadow-lg`}
                      >
                        <IconComponent className="h-10 w-10" />
                        <div
                          className={`absolute inset-0 rounded-2xl ${plan.bgColor} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
                        />
                      </div>

                      {/* Plan Name */}
                      <CardTitle
                        className={`text-3xl font-bold text-white group-hover:${plan.color} transition-colors duration-300 mb-2`}
                      >
                        {plan.name}
                      </CardTitle>

                      {/* Description */}
                      <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-base leading-relaxed">
                        {plan.description}
                      </CardDescription>

                      {/* Pricing */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          {isAnnual && <span className="text-lg text-gray-400 line-through">${plan.monthlyPrice}</span>}
                          <div className="text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                            ${currentPrice}
                          </div>
                        </div>
                        <div className="text-gray-400 text-lg">/month</div>
                        {isAnnual && savings > 0 && (
                          <div className="flex items-center justify-center space-x-2">
                            <Badge className="bg-green-600/20 text-green-400 border-green-600/30 animate-pulse">
                              Save ${savings}/year ({discount}% off)
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Server Specs */}
                      <div className="mt-6 grid grid-cols-2 gap-3 text-sm bg-gray-700/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Memory className="h-4 w-4 text-blue-400" />
                          <span className="text-gray-300">{plan.specs.ram}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300">{plan.specs.storage}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-yellow-400" />
                          <span className="text-gray-300">{plan.specs.players}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-4 w-4 text-purple-400" />
                          <span className="text-gray-300">{plan.specs.cpu}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-pink-400" />
                          <span className="text-gray-300">{plan.specs.locations}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span className="text-gray-300">{plan.specs.bandwidth}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col space-y-6 relative z-10 overflow-visible">
                      {/* Features */}
                      <div className="flex-1 space-y-3 overflow-visible">
                        {plan.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start text-sm animate-fade-in-up group-hover:translate-x-1 transition-transform duration-300"
                            style={{ animationDelay: `${index * 150 + featureIndex * 75}ms` }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5 group-hover:animate-pulse" />
                            <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-6 mt-auto">
                        <Link href="/register">
                          <Button
                            className={`w-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group text-lg py-6 font-semibold ${
                              plan.popular
                                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/25"
                                : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-green-500 hover:to-green-600 hover:shadow-green-500/25"
                            }`}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                              Get Started - ${currentPrice}/mo
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4 relative">
              Optional Add-ons
              <Heart className="absolute -top-2 -right-8 w-6 h-6 text-red-400 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enhance your server with these optional add-ons available for all plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => {
              const IconComponent = addon.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800/90 backdrop-blur-sm border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-700/50 flex items-center justify-center ${addon.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300 text-xl">
                      {addon.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-6 leading-relaxed">
                      {addon.description}
                    </CardDescription>
                    <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">
                      ${addon.price}
                      <div className="text-sm font-normal text-gray-400 mt-1">{addon.unit}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">What's Included</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              All plans include these premium features at no extra cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800/90 backdrop-blur-sm border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-green-900/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300 text-xl">
                        {category.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center text-sm animate-fade-in-up group-hover:translate-x-1 transition-transform duration-300"
                          style={{ animationDelay: `${index * 100 + itemIndex * 50}ms` }}
                        >
                          <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 group-hover:animate-pulse" />
                          <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                            {item}
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600/10 via-green-600/5 to-green-600/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up relative">
          <h2 className="text-4xl font-bold text-white mb-6 animate-pulse">Ready to Start Your Server?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best Minecraft hosting available with{" "}
            <span className="text-green-400 font-semibold animate-pulse">SkilloraClouds</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-600/25 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Free Trial
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.6);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.8);
        }
      `}</style>
    </div>
  )
}
