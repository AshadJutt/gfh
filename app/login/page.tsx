"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin credentials
      if (email === "admin@skilloraclouds.com" && password === "password123") {
        const adminUser = {
          email: "admin@skilloraclouds.com",
          name: "Admin",
          firstName: "Admin",
          lastName: "User",
          isAdmin: true,
          password: "password123",
          registeredAt: new Date().toISOString(),
          loginMethod: "Website Login",
        }

        localStorage.setItem("user", JSON.stringify(adminUser))
        localStorage.setItem("isLoggedIn", "true")

        toast({
          title: "Welcome Admin! 👑",
          description: "Successfully logged into admin panel.",
        })

        router.push("/admin")
        return
      }

      // Check for regular users
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("isLoggedIn", "true")

        // Create welcome notification for new users
        if (user && !localStorage.getItem(`welcomed_${user.email}`)) {
          const welcomeNotification = {
            id: Date.now(),
            userEmail: user.email,
            type: "welcome",
            title: "🎉 Welcome to SkilloraClouds!",
            message: `Hi ${user.firstName || user.name}! 👋

Welcome to SkilloraClouds - your ultimate Minecraft hosting solution!

🚀 **Getting Started:**
• Browse our server plans in the Shop section
• Choose the perfect plan for your needs
• Get your server up and running in minutes

💡 **What's Next:**
• Explore our features and pricing
• Join our Discord community for support
• Contact us if you need any help

🎮 **Ready to Start Your Minecraft Journey?**
Visit the Shop section to choose your server plan and get started today!

Thank you for choosing SkilloraClouds! We're excited to have you as part of our community.

Best regards,
The SkilloraClouds Team`,
            timestamp: new Date().toISOString(),
            read: false,
          }

          const existingNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
          existingNotifications.push(welcomeNotification)
          localStorage.setItem("notifications", JSON.stringify(existingNotifications))

          // Mark user as welcomed
          localStorage.setItem(`welcomed_${user.email}`, "true")
        }

        toast({
          title: "Welcome back! 🎉",
          description: `Successfully logged in as ${user.firstName || user.name}.`,
        })

        router.push("/dashboard")
      } else {
        // Set specific error messages
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
          general: "The email or password you entered is incorrect. Please check your credentials and try again.",
        })

        toast({
          title: "Login Failed ❌",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({
        general: "An error occurred during login. Please try again.",
      })
      toast({
        title: "Login Error ❌",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image src="/images/logo.png" alt="SkilloraClouds Logo" width={64} height={64} className="mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your SkilloraClouds account</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <p className="text-sm text-red-400">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined, general: undefined }))
                    }}
                    placeholder="Enter your email"
                    className={`pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined, general: undefined }))
                    }}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-green-400 hover:text-green-300 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
