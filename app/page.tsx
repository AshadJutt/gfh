"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Star,
  Zap,
  Shield,
  Database,
  Globe,
  Headphones,
  Menu,
  X,
  ArrowRight,
  Award,
  Sparkles,
  Heart,
  TrendingUp,
  Rocket,
  Crown,
} from "lucide-react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [stats, setStats] = useState({
    servers: 0,
    customers: 0,
    uptime: 0,
  })

  useEffect(() => {
    // Animate stats on page load
    const timer = setTimeout(() => {
      const animateValue = (start: number, end: number, setter: (value: number) => void) => {
        let current = start
        const increment = end / 100
        const interval = setInterval(() => {
          current += increment
          if (current >= end) {
            current = end
            clearInterval(interval)
          }
          setter(Math.floor(current))
        }, 20)
      }

      animateValue(0, 15000, (value) => setStats((prev) => ({ ...prev, servers: value })))
      animateValue(0, 50000, (value) => setStats((prev) => ({ ...prev, customers: value })))
      animateValue(0, 99.9, (value) => setStats((prev) => ({ ...prev, uptime: value })))
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const pricingPlans = [
    {
      name: "Starter",
      price: 0.94,
      description: "Perfect for small groups",
      features: ["2GB RAM", "10GB Storage", "Up to 10 Players", "24/7 Support"],
      icon: Zap,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      popular: false,
    },
    {
      name: "Standard",
      price: 2.0,
      description: "Most popular choice",
      features: ["6GB RAM", "50GB Storage", "Up to 40 Players", "Priority Support"],
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      popular: true,
    },
    {
      name: "Pro",
      price: 3.0,
      description: "For serious server owners",
      features: ["12GB RAM", "200GB Storage", "Up to 100 Players", "Premium Support"],
      icon: Database,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
      popular: false,
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Enterprise-grade protection against attacks and malicious traffic",
      color: "text-green-400",
    },
    {
      icon: Database,
      title: "Automatic Backups",
      description: "Daily automated backups to keep your server data safe",
      color: "text-blue-400",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get your server running in under 5 minutes",
      color: "text-yellow-400",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Expert technical support available around the clock",
      color: "text-purple-400",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Servers located worldwide for optimal performance",
      color: "text-indigo-400",
    },
    {
      icon: Award,
      title: "99.9% Uptime",
      description: "Guaranteed uptime with industry-leading reliability",
      color: "text-pink-400",
    },
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Server Owner",
      content: "SkilloraClouds has been amazing! The performance is incredible and support is always helpful.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Chen",
      role: "Community Manager",
      content: "Best hosting service I've used. The control panel is intuitive and servers are lightning fast.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Rodriguez",
      role: "Developer",
      content: "Excellent uptime and great features. My players never experience lag or downtime.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
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
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/support", label: "Support" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-green-400 font-medium transition-all duration-300 hover:scale-105 transform relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-green-400 w-0 group-hover:w-full transition-all duration-300" />
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
                  { href: "/features", label: "Features" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/support", label: "Support" },
                  { href: "/login", label: "Sign In" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 font-medium transition-colors duration-200"
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
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-transparent to-blue-600/10 animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 animate-bounce-slow bg-green-600/20 text-green-400 border-green-600/30 hover:scale-110 transition-transform duration-300">
                <Crown className="w-4 h-4 mr-2 animate-pulse" />🚀 Premium Minecraft Hosting
              </Badge>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
                The Best Minecraft
                <br />
                <span className="text-green-400 animate-pulse relative">
                  Server Hosting
                  <Sparkles className="absolute -top-4 -right-12 w-12 h-12 text-yellow-400 animate-twinkle" />
                </span>
              </h1>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Experience lightning-fast performance, 99.9% uptime, and 24/7 expert support. Start your Minecraft
                server journey with SkilloraClouds today.
              </p>
            </div>

            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center mb-16"
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

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-green-400 mb-2 group-hover:animate-pulse">
                  {stats.servers.toLocaleString()}+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Active Servers
                </div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-green-400 mb-2 group-hover:animate-pulse">
                  {stats.customers.toLocaleString()}+
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Happy Customers
                </div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-green-400 mb-2 group-hover:animate-pulse">
                  {stats.uptime.toFixed(1)}%
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Uptime Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4 relative">
              Why Choose SkilloraClouds?
              <Heart className="absolute -top-2 -right-8 w-6 h-6 text-red-400 animate-bounce" />
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide everything you need to run a successful Minecraft server
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center ${feature.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your Minecraft server. All plans include premium features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={index}
                  className={`relative transition-all duration-500 hover:shadow-xl hover:scale-110 hover:-translate-y-4 transform bg-gray-800 border-gray-700 animate-fade-in-up group cursor-pointer ${
                    plan.popular
                      ? "ring-2 ring-green-600 shadow-lg scale-105 border-green-600/50 overflow-visible pt-6"
                      : "hover:border-green-600/50 hover:shadow-2xl overflow-hidden"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                      <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold animate-bounce-slow hover:scale-110 transition-transform duration-300 shadow-lg border-0 whitespace-nowrap">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 relative z-10">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full ${plan.bgColor} flex items-center justify-center ${plan.color} hover:scale-125 hover:rotate-12 transition-all duration-500 relative group-hover:animate-bounce`}
                    >
                      <IconComponent className="h-8 w-8" />
                      <div
                        className={`absolute inset-0 rounded-full ${plan.bgColor} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                      />
                    </div>

                    <CardTitle
                      className={`text-2xl font-bold text-white group-hover:${plan.color} transition-colors duration-300`}
                    >
                      {plan.name}
                    </CardTitle>

                    <CardDescription className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-4">
                      <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        ${plan.price}
                        <span className="text-lg font-normal text-gray-400">/month</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    {/* Features */}
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm animate-fade-in-up group-hover:translate-x-1 transition-transform duration-300"
                          style={{ animationDelay: `${index * 150 + featureIndex * 75}ms` }}
                        >
                          <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0 group-hover:animate-pulse" />
                          <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-8">
                      <Link href="/register">
                        <Button
                          className={`w-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group ${
                            plan.popular
                              ? "bg-green-600 hover:bg-green-700 hover:shadow-green-600/25"
                              : "bg-green-600 hover:bg-green-700 hover:shadow-green-600/25"
                          }`}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <Rocket className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                            Get Started - ${plan.price}/mo
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12 animate-fade-in-up">
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg hover:scale-110 transform transition-all duration-300 border-2 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-green-400 group"
              >
                View All Plans
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust SkilloraClouds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <CardTitle className="text-white text-sm group-hover:text-green-400 transition-colors duration-300">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-xs">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current group-hover:animate-twinkle"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
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

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4 group">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="SkilloraClouds Logo"
                  width={32}
                  height={32}
                  className="group-hover:animate-bounce transition-all duration-300"
                />
                <span className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                  SkilloraClouds
                </span>
              </div>
              <p className="text-gray-400">Premium Minecraft server hosting with unmatched performance and support.</p>
            </div>
            {[
              {
                title: "Product",
                links: [
                  { href: "/features", label: "Features" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/dashboard", label: "Dashboard" },
                ],
                delay: "100ms",
              },
              {
                title: "Support",
                links: [
                  { href: "/support", label: "Help Center" },
                  { href: "/support", label: "Contact Us" },
                  { href: "/support", label: "Documentation" },
                ],
                delay: "200ms",
              },
              {
                title: "Company",
                links: [
                  { href: "/about", label: "About" },
                  { href: "/privacy", label: "Privacy" },
                  { href: "/terms", label: "Terms" },
                ],
                delay: "300ms",
              },
            ].map((section, index) => (
              <div key={index} className="animate-fade-in-delay" style={{ animationDelay: section.delay }}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:translate-x-1 transform inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up">
            <p>
              &copy; 2025 <span className="text-green-400 font-semibold animate-pulse">SkilloraClouds</span>. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in-delay 0.6s ease-out; }
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
