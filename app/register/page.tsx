"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)

    // Check if user is already logged in
    if (typeof window !== "undefined") {
      const existingUser = localStorage.getItem("user")
      if (existingUser) {
        try {
          const user = JSON.parse(existingUser)
          if (user.isAdmin) {
            router.push("/admin")
          } else {
            router.push("/dashboard")
          }
        } catch (error) {
          localStorage.removeItem("user")
        }
      }
    }
  }, [router])

  const validateForm = () => {
    if (!firstName.trim()) {
      setError("First name is required")
      return false
    }
    if (!lastName.trim()) {
      setError("Last name is required")
      return false
    }
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!password) {
      setError("Password is required")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Add a small delay to simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      if (typeof window !== "undefined") {
        // Get existing users
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

        // Check if user already exists
        const userExists = existingUsers.some(
          (user: any) => user.email.toLowerCase().trim() === email.toLowerCase().trim(),
        )

        if (userExists) {
          setError("An account with this email already exists")
          setIsLoading(false)
          return
        }

        // Create new user
        const newUser = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.toLowerCase().trim(),
          password: password,
          registeredAt: new Date().toISOString(),
          isAdmin: false,
          loginMethod: "Website Registration",
        }

        // Add to users array
        const updatedUsers = [...existingUsers, newUser]
        localStorage.setItem("users", JSON.stringify(updatedUsers))

        console.log("User registered successfully:", newUser) // Debug log
        console.log("All users:", updatedUsers) // Debug log

        // Create welcome notification for new user
        const welcomeNotification = {
          id: Date.now(),
          userEmail: newUser.email,
          type: "welcome",
          title: "🎉 Welcome to SkilloraClouds!",
          message: `Hi ${newUser.firstName}! 👋

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
        localStorage.setItem(`welcomed_${newUser.email}`, "true")

        setSuccess("Account created successfully! You can now sign in.")

        toast({
          title: "Registration Successful!",
          description: "Your account has been created. You can now sign in.",
        })

        // Clear form
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("An error occurred during registration. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6 animate-fade-in">
          <Link href="/" className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl bg-gray-800 border-gray-700 animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/logo.png"
                alt="SkilloraClouds Logo"
                width={32}
                height={32}
                className="mr-2 animate-pulse"
              />
              <span className="text-2xl font-semibold text-white">SkilloraClouds</span>
            </div>
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-300">
              Join SkilloraClouds and start your Minecraft journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-fade-in bg-red-900/20 border-red-600/30 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-600/30 bg-green-600/20 animate-fade-in">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">{success}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="transition-all duration-200 focus:scale-105 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                    className="transition-all duration-200 focus:scale-105 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="transition-all duration-200 focus:scale-105 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="transition-all duration-200 focus:scale-105 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:scale-110 transition-transform duration-200 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="transition-all duration-200 focus:scale-105 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:scale-110 transition-transform duration-200 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full hover:scale-105 transform transition-all duration-300 bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
