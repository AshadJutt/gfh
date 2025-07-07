"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Headphones,
  MessageCircle,
  ExternalLink,
  Menu,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create support notification for admin
      const supportNotification = {
        id: Date.now(),
        userEmail: "admin",
        type: "support_message",
        title: `📧 Support Message: ${formData.subject}`,
        message: `**Support Request Details:**

**From:** ${formData.name} (${formData.email})
**Type:** ${formData.type}
**Subject:** ${formData.subject}

**Message:**
${formData.message}

**Submitted:** ${new Date().toLocaleString()}`,
        timestamp: new Date().toISOString(),
        read: false,
        senderEmail: formData.email,
        senderName: formData.name,
      }

      // Save to notifications
      const existingNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      existingNotifications.push(supportNotification)
      localStorage.setItem("notifications", JSON.stringify(existingNotifications))

      toast({
        title: "Message Sent Successfully! 📧",
        description: "We've received your support request and will get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        type: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending support message:", error)
      toast({
        title: "Error Sending Message ❌",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation - Responsive like pricing page */}
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
                    item.href === "/support" ? "text-green-400" : "text-gray-300 hover:text-green-400"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-400 transition-all duration-300 ${
                      item.href === "/support" ? "w-full" : "w-0 group-hover:w-full"
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
                      item.href === "/support" ? "text-green-400" : "text-gray-300 hover:text-green-400"
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
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-6 animate-slide-up">
              Get Support
              <span className="block text-3xl text-green-400 mt-2 animate-pulse">We're Here to Help! 🚀</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Need assistance? Our expert support team is ready to help you with any questions or issues.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Badge className="bg-green-600 text-white px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Support
              </Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Expert Team
              </Badge>
              <Badge className="bg-purple-600 text-white px-4 py-2">
                <Headphones className="h-4 w-4 mr-2" />
                Quick Response
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Support Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl">
                  <MessageSquare className="h-6 w-6 mr-3 text-green-400" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 animate-slide-in-left">
                      <Label htmlFor="name" className="text-gray-300 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2 animate-slide-in-right">
                      <Label htmlFor="email" className="text-gray-300 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <Label htmlFor="type" className="text-gray-300 font-medium">
                      Support Type *
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-green-500">
                        <SelectValue placeholder="Select support type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="technical" className="text-white hover:bg-gray-600">
                          🔧 Technical Issue
                        </SelectItem>
                        <SelectItem value="billing" className="text-white hover:bg-gray-600">
                          💳 Billing Question
                        </SelectItem>
                        <SelectItem value="general" className="text-white hover:bg-gray-600">
                          💬 General Inquiry
                        </SelectItem>
                        <SelectItem value="feature" className="text-white hover:bg-gray-600">
                          ✨ Feature Request
                        </SelectItem>
                        <SelectItem value="server" className="text-white hover:bg-gray-600">
                          🖥️ Server Setup Help
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <Label htmlFor="subject" className="text-gray-300 font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of your issue"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <Label htmlFor="message" className="text-gray-300 font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your issue in detail..."
                      rows={6}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-bounce-in"
                    style={{ animationDelay: "0.5s" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Discord */}
          <div className="space-y-6">
            {/* Discord Community */}
            <Card
              className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MessageCircle className="h-6 w-6 mr-3 text-indigo-400" />
                  Join Our Discord
                </CardTitle>
                <CardDescription className="text-indigo-200">
                  Get instant help from our community and support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">SkilloraClouds Community</p>
                    <p className="text-indigo-200 text-sm">1,500+ Members Online</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-indigo-200 text-sm">24/7 Support Channels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-indigo-200 text-sm">Server Setup Help</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-indigo-200 text-sm">Community Events</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-indigo-200 text-sm">Plugin Recommendations</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open("https://discord.gg/2cBEhap2sw", "_blank")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Discord Server
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-800 border-gray-700 animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
                <CardDescription className="text-gray-400">Other ways to reach us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <p className="text-gray-400 text-sm">skilloraclouds@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone Support</p>
                    <p className="text-gray-400 text-sm">+92 3078210609 (Whatsapp)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Office Address</p>
                    <p className="text-gray-400 text-sm">123 Cloud Street, Tech City, TC 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="bg-gray-800 border-gray-700 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2 text-orange-400" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span className="text-gray-300">Monday - Friday</span>
                    <Badge className="bg-green-600 text-white">9:00 AM - 6:00 PM EST</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span className="text-gray-300">Saturday</span>
                    <Badge className="bg-yellow-600 text-white">10:00 AM - 4:00 PM EST</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                    <span className="text-gray-300">Sunday</span>
                    <Badge className="bg-gray-600 text-white">Closed</Badge>
                  </div>
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm font-medium">💬 Discord support is available 24/7!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gray-800 border-gray-700 animate-scale-in" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="text-white">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link
                    href="/features"
                    className="block p-2 text-green-400 hover:text-green-300 hover:bg-gray-700/50 rounded transition-all"
                  >
                    → Server Features & Specifications
                  </Link>
                  <Link
                    href="/pricing"
                    className="block p-2 text-green-400 hover:text-green-300 hover:bg-gray-700/50 rounded transition-all"
                  >
                    → Pricing & Plans
                  </Link>
                  <Link
                    href="/login"
                    className="block p-2 text-green-400 hover:text-green-300 hover:bg-gray-700/50 rounded transition-all"
                  >
                    → Account Login
                  </Link>
                  <Link
                    href="/register"
                    className="block p-2 text-green-400 hover:text-green-300 hover:bg-gray-700/50 rounded transition-all"
                  >
                    → Create Account
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounce-in {
          from { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.05); }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  )
}
