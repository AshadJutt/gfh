"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Server,
  ShoppingCart,
  UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  Trash2,
  Plus,
  Bell,
  CreditCard,
  Info,
} from "lucide-react"
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

interface CartItem {
  id: string
  name: string
  price: number
  type: string
  addedAt: string
  features?: string[]
  specs?: {
    players: string
    ram: string
    storage: string
    cpu: string
    bandwidth: string
  }
  // Backward compatibility
  players?: string
  ram?: string
  storage?: string
  cpu?: string
  bandwidth?: string
}

export default function CartPage() {
  const [user, setUser] = useState<User | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (!userData) {
        router.push("/login")
        return
      }

      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Load cart items
      const cart = localStorage.getItem("cart")
      if (cart) {
        try {
          const parsedCart = JSON.parse(cart)
          setCartItems(Array.isArray(parsedCart) ? parsedCart : [])
        } catch (error) {
          console.error("Error parsing cart:", error)
          setCartItems([])
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const removeFromCart = (itemId: string) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== itemId)
      setCartItems(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))

      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      })
    } catch (error) {
      console.error("Error removing from cart:", error)
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      })
    }
  }

  const clearCart = () => {
    try {
      setCartItems([])
      localStorage.setItem("cart", JSON.stringify([]))
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      })
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("cart")
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
      router.push("/")
    }
  }

  const getUnreadNotificationCount = () => {
    try {
      if (!user?.email) return 0
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      return notifications.filter((n: any) => n.userEmail === user.email && !n.read).length
    } catch (error) {
      console.error("Error getting notification count:", error)
      return 0
    }
  }

  const unreadCount = getUnreadNotificationCount()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 animate-fade-in">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
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
              {!user.isAdmin && (
                <>
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
                    <Button variant="ghost" size="sm" className="font-semibold text-green-400">
                      <ShoppingCart className="h-4 w-4" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                          {cartItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
              <Link href="/dashboard/notifications" className="relative">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 text-gray-300 hover:text-white">
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="text-gray-300 hover:text-white">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="text-gray-300 hover:text-white">
                        <Server className="h-4 w-4 mr-2" />
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

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <Link href="/dashboard/notifications" className="relative">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-800 border-gray-700">
                  <div className="flex flex-col space-y-6 mt-6">
                    <div className="text-center pb-4 border-b border-gray-700">
                      <div className="flex items-center justify-center mb-2">
                        <UserIcon className="h-8 w-8 text-gray-400 mr-2" />
                        <span className="font-semibold text-lg text-white">{user.name}</span>
                      </div>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors"
                    >
                      🏠 Dashboard
                    </Link>
                    {!user.isAdmin && (
                      <>
                        <Link
                          href="/dashboard/shop"
                          className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors"
                        >
                          🛒 Shop Plans
                        </Link>
                        <Link
                          href="/dashboard/cart"
                          className="text-lg font-medium text-green-400 transition-colors flex items-center"
                        >
                          🛍️ Cart
                          {cartItems.length > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                              {cartItems.length}
                            </span>
                          )}
                        </Link>
                      </>
                    )}
                    <Link
                      href="/dashboard/notifications"
                      className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors flex items-center"
                    >
                      🔔 Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors"
                    >
                      👤 Edit Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors"
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <div className="pt-6 border-t border-gray-700">
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
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

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in-up">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-400">Review your selected plans and proceed to checkout when ready.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 animate-scale-in">
            <div className="bg-gray-800 border-gray-700 rounded-lg p-8 max-w-md mx-auto">
              <ShoppingCart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Browse our Minecraft hosting plans and add some to your cart.</p>
              <Link href="/dashboard/shop">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Plans
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Cart Items ({cartItems.length})</h2>
                {cartItems.length > 0 && (
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                )}
              </div>

              {cartItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="bg-gray-800 border-gray-700 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <Server className="h-6 w-6 text-green-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                              {item.type === "minecraft" ? "Minecraft Hosting" : item.type}
                            </Badge>
                          </div>
                        </div>

                        {/* Specifications */}
                        {(item.specs || item.players) && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mt-3">
                            <div>
                              <span className="text-gray-400">Players:</span>
                              <div className="font-medium text-gray-300">{item.specs?.players || item.players}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">RAM:</span>
                              <div className="font-medium text-gray-300">{item.specs?.ram || item.ram}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">Storage:</span>
                              <div className="font-medium text-gray-300">{item.specs?.storage || item.storage}</div>
                            </div>
                            <div>
                              <span className="text-gray-400">CPU:</span>
                              <div className="font-medium text-gray-300">{item.specs?.cpu || item.cpu}</div>
                            </div>
                          </div>
                        )}

                        {/* Key Features */}
                        {item.features && item.features.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-400 mb-1">Key Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.features.slice(0, 3).map((feature, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs bg-gray-700 border-gray-600 text-gray-300"
                                >
                                  {feature}
                                </Badge>
                              ))}
                              {item.features.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-gray-700 border-gray-600 text-gray-300">
                                  +{item.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end space-y-2">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            ${item.price}
                            <span className="text-sm font-normal text-gray-400">/month</span>
                          </div>
                          <p className="text-xs text-gray-500">Added {new Date(item.addedAt).toLocaleDateString()}</p>
                        </div>
                        <Button
                          onClick={() => removeFromCart(item.id)}
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card
                className="bg-gray-800 border-gray-700 sticky top-24 animate-scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                  <CardDescription className="text-gray-400">Review your order details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-gray-300">${item.price}/mo</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold text-green-400">${calculateTotal()}/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Billed monthly • Cancel anytime</p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href="/dashboard/checkout" className="block">
                      <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/dashboard/shop" className="block">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Plans
                      </Button>
                    </Link>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-4">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-300">
                        <p className="font-medium mb-1">30-Day Money Back Guarantee</p>
                        <p>Not satisfied? Get a full refund within 30 days of your purchase.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
