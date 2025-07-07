"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ShoppingCart, UserIcon, LogOut, ChevronDown, CreditCard, CheckCircle, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export default function PaymentDetailsPage() {
  const [user, setUser] = useState<any | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Form fields
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: "",
    transactionId: "",
    payerName: "",
    additionalNotes: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Get payment info from session storage (set from checkout page)
    const paymentInfo = sessionStorage.getItem("paymentInfo")
    if (!paymentInfo) {
      router.push("/dashboard/cart")
      return
    }

    const info = JSON.parse(paymentInfo)
    setCartItems(info.cartItems)
    setPaymentMethod(info.paymentMethod)
    setTotalAmount(info.totalAmount)
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const createAdminNotification = (purchaseId: number) => {
    const notification = {
      id: Date.now().toString(),
      userEmail: "admin", // This will be for admin
      type: "payment_submitted",
      title: "New Payment Details Submitted 💳",
      message: `Customer ${user.email} has submitted payment details for Order #${purchaseId}. Phone: ${paymentDetails.phoneNumber}, Transaction ID: ${paymentDetails.transactionId}, Amount: $${totalAmount}`,
      timestamp: new Date().toISOString(),
      read: false,
      orderId: purchaseId,
      paymentDetails: {
        customerEmail: user.email,
        phoneNumber: paymentDetails.phoneNumber,
        transactionId: paymentDetails.transactionId,
        payerName: paymentDetails.payerName,
        additionalNotes: paymentDetails.additionalNotes,
        paymentMethod: paymentMethod,
        amount: totalAmount,
      },
    }

    const existingNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    existingNotifications.push(notification)
    localStorage.setItem("notifications", JSON.stringify(existingNotifications))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentDetails.phoneNumber || !paymentDetails.transactionId || !paymentDetails.payerName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Save purchase to localStorage with payment details
      const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
      const newPurchase = {
        id: Date.now(),
        user: user?.email,
        items: cartItems,
        total: totalAmount,
        date: new Date().toISOString(),
        paymentMethod,
        status: "completed",
        paymentStatus: "not_received", // Default status
        loginMethod: "Website Registration", // Add this line
        paymentDetails: {
          phoneNumber: paymentDetails.phoneNumber,
          transactionId: paymentDetails.transactionId,
          payerName: paymentDetails.payerName,
          additionalNotes: paymentDetails.additionalNotes,
        },
      }
      purchases.push(newPurchase)
      localStorage.setItem("purchases", JSON.stringify(purchases))

      // Create admin notification
      createAdminNotification(newPurchase.id)

      // Clear cart and payment info
      localStorage.removeItem("cart")
      sessionStorage.removeItem("paymentInfo")

      toast({
        title: "Payment Details Submitted!",
        description: "Your payment details have been sent to our team for verification.",
      })

      // Redirect to confirmation page
      setTimeout(() => {
        router.push("/dashboard/checkout/payment-confirmation")
      }, 1500)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    sessionStorage.removeItem("paymentInfo")
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
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2 group">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-lg sm:text-xl font-semibold text-white">SkilloraClouds</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-green-400 transition-colors">
                Home
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 text-gray-300 hover:text-white">
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
              <Link href="/dashboard/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 text-gray-300 hover:text-white">
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
              <Link href="/dashboard/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-gray-300 hover:text-white">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden animate-slide-down bg-gray-800 border-t border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard/shop"
                  className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Minecraft Plans
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-md transition-colors"
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
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2 inline" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Payment Details Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fade-in-up">
        <div className="mb-6 sm:mb-8 text-center">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Payment Details</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Please provide your payment information for verification
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 animate-scale-in">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="flex items-center text-white text-lg sm:text-xl">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm sm:text-base">
              Enter the details you used to make the payment of ${totalAmount} via{" "}
              {paymentMethod === "pakistan" ? "Pakistan" : "India"} QR Code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-300 text-sm sm:text-base">
                  Phone Number Used for Payment *
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={paymentDetails.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 h-10 sm:h-11"
                  required
                />
                <p className="text-xs text-gray-500">The phone number linked to your payment account</p>
              </div>

              {/* Transaction ID */}
              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-gray-300 text-sm sm:text-base">
                  Transaction ID / Reference Number *
                </Label>
                <Input
                  id="transactionId"
                  type="text"
                  placeholder="Enter transaction ID or reference number"
                  value={paymentDetails.transactionId}
                  onChange={(e) => handleInputChange("transactionId", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 h-10 sm:h-11"
                  required
                />
                <p className="text-xs text-gray-500">You can find this in your payment app or SMS confirmation</p>
              </div>

              {/* Payer Name */}
              <div className="space-y-2">
                <Label htmlFor="payerName" className="text-gray-300 text-sm sm:text-base">
                  Name on Payment Account *
                </Label>
                <Input
                  id="payerName"
                  type="text"
                  placeholder="Enter the name on your payment account"
                  value={paymentDetails.payerName}
                  onChange={(e) => handleInputChange("payerName", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 h-10 sm:h-11"
                  required
                />
                <p className="text-xs text-gray-500">The name registered with your payment method</p>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes" className="text-gray-300 text-sm sm:text-base">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional information about your payment..."
                  value={paymentDetails.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 min-h-[80px] sm:min-h-[100px]"
                />
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-700 p-4 sm:p-6 rounded-lg border border-gray-600">
                <h3 className="font-semibold text-white mb-3 text-base sm:text-lg">Payment Summary</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Amount Paid:</span>
                    <span className="text-white font-semibold">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Payment Method:</span>
                    <span className="text-white">{paymentMethod === "pakistan" ? "Pakistan" : "India"} QR Code</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer:</span>
                    <span className="text-white break-all">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white h-11 sm:h-12"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Payment Details"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 h-11 sm:h-12"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  Your payment details will be verified by our team within 24 hours. You'll receive a notification once
                  your server is ready.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
