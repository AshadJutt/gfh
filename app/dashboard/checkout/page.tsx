"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, UserIcon, LogOut, ChevronDown, CreditCard, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const [user, setUser] = useState<any | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [paymentMethod, setPaymentMethod] = useState("pakistan")
  const [showQR, setShowQR] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Load cart items
    const cart = localStorage.getItem("cart")
    if (cart) {
      const items = JSON.parse(cart)
      if (items.length === 0) {
        router.push("/dashboard/cart")
        return
      }
      setCartItems(items)
    } else {
      router.push("/dashboard/cart")
    }
  }, [router])

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  const handlePayment = () => {
    setShowQR(true)
  }

  const handlePaymentComplete = () => {
    // Store payment info in session storage for the next page
    const paymentInfo = {
      cartItems,
      paymentMethod,
      totalAmount: getTotalPrice(),
    }
    sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo))

    // Redirect to payment details page
    router.push("/dashboard/checkout/payment-details")
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 animate-fade-in">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700 animate-slide-down sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2 group">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Logo"
                  className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-lg sm:text-xl font-semibold text-white">SkilloraClouds</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 hover:scale-105 transform"
              >
                Home
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                  >
                    <span>Shop</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/shop" className="text-gray-300 hover:text-white">
                      Minecraft Plans
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart Icon */}
              <Link href="/dashboard/cart" className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-gray-300 hover:text-white hover:scale-105 transition-all duration-200"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden lg:inline">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="text-gray-300 hover:text-white">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="text-gray-300 hover:text-white">
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:text-white">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Cart Icon */}
              <Link href="/dashboard/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard/shop"
                  className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2 inline" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fade-in-up">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Complete your purchase to get your Minecraft server.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Order Summary */}
          <Card
            className="bg-gray-800 border-gray-700 animate-scale-in order-2 lg:order-1"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm sm:text-base truncate">{item.name} Plan</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{item.players}</p>
                    </div>
                    <span className="font-semibold text-white text-sm sm:text-base ml-2 flex-shrink-0">
                      ${item.price}/month
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-green-400">${getTotalPrice()}/month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card
            className="bg-gray-800 border-gray-700 animate-scale-in order-1 lg:order-2"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Payment Method
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm">Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              {!showQR ? (
                <div className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pakistan" id="pakistan" />
                      <Label htmlFor="pakistan" className="text-gray-300 text-sm sm:text-base">
                        Pakistan QR Code
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="india" id="india" />
                      <Label htmlFor="india" className="text-gray-300 text-sm sm:text-base">
                        India QR Code
                      </Label>
                    </div>
                  </RadioGroup>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3"
                    size="lg"
                    onClick={handlePayment}
                  >
                    Pay ${getTotalPrice()}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Scan QR Code to Pay</h3>
                  <div className="bg-gray-700 p-3 sm:p-4 rounded-lg border-2 border-dashed border-gray-600 mx-auto w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                    {paymentMethod === "india" ? (
                      <img
                        src="/images/india-qr.png"
                        alt="India Payment QR Code"
                        className="w-full h-full object-contain rounded"
                      />
                    ) : (
                      <img
                        src="/images/pakistan-qr.png"
                        alt="Pakistan Payment QR Code - JazzCash"
                        className="w-full h-full object-contain rounded"
                      />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 px-2">
                    Scan this QR code with your mobile banking app to complete the payment
                  </p>
                  <p className="text-xs text-gray-500">Amount: ${getTotalPrice()}</p>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3"
                      onClick={handlePaymentComplete}
                    >
                      I have completed the payment
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 text-sm sm:text-base py-2 sm:py-3"
                      onClick={() => setShowQR(false)}
                    >
                      Back to Payment Options
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
