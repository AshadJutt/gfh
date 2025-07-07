"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Server, ShoppingCart, UserIcon, LogOut, ChevronDown, Menu, Eye, EyeOff, Lock, ArrowLeft } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

interface User {
  email: string
  name: string
  firstName?: string
  lastName?: string
  isAdmin: boolean
}

export default function ChangePasswordPage() {
  const [user, setUser] = useState<User | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Load cart items for non-admin users
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCartItems(JSON.parse(cart))
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Current password validation (simulate checking against stored password)
    if (formData.currentPassword !== "password123") {
      // In real app, this would check against actual stored password
      toast({
        title: "Current Password Incorrect",
        description: "Your current password is wrong. Please enter the correct current password.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match. Please make sure both passwords are identical.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 6 characters long.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      toast({
        title: "Same Password",
        description: "New password must be different from current password.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate password change process
    setTimeout(() => {
      toast({
        title: "Password Changed Successfully! 🎉",
        description: "Your password has been updated. Please use your new password for future logins.",
      })

      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setLoading(false)

      // Redirect back to profile after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/profile")
      }, 2000)
    }, 1500)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Mobile-First Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Server className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">MinecraftHost</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </Link>
              {!user.isAdmin && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-1">
                        <span>Shop</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/shop">Minecraft Plans</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/dashboard/cart" className="relative">
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Server className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              {!user.isAdmin && (
                <Link href="/dashboard/cart" className="relative">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    <div className="text-center pb-4 border-b">
                      <div className="flex items-center justify-center mb-2">
                        <UserIcon className="h-8 w-8 text-gray-600 mr-2" />
                        <span className="font-semibold text-lg">{user.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                    >
                      🏠 Dashboard
                    </Link>
                    {!user.isAdmin && (
                      <>
                        <Link
                          href="/dashboard/shop"
                          className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                        >
                          🛒 Shop Plans
                        </Link>
                        <Link
                          href="/dashboard/cart"
                          className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors flex items-center"
                        >
                          🛍️ Cart
                          {cartItems.length > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {cartItems.length}
                            </span>
                          )}
                        </Link>
                      </>
                    )}
                    <Link
                      href="/dashboard/profile"
                      className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                    >
                      👤 Edit Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <div className="pt-6 border-t">
                      <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Change Password Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard/profile">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
        </div>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Change Password</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Update your password to keep your account secure.</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Lock className="h-5 w-5 mr-2" />
              Password Security
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your current password and choose a new secure password.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleChangePassword} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("current")}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 6 characters long.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 text-sm">🔒 Password Security Tips:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                  <li>• Use at least 8 characters with a mix of letters, numbers, and symbols</li>
                  <li>• Avoid using personal information like your name or email</li>
                  <li>• Don't reuse passwords from other accounts</li>
                  <li>• Consider using a password manager for better security</li>
                </ul>
              </div>

              <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
                <Lock className="h-4 w-4 mr-2" />
                {loading ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
