"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Server,
  ShoppingCart,
  UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  Check,
  Zap,
  Shield,
  Headphones,
  Bell,
  Eye,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"

interface User {
  email: string
  name: string
  firstName?: string
  lastName?: string
  isAdmin: boolean
}

interface Plan {
  id: string
  name: string
  price: number
  annualPrice: number
  originalPrice?: number
  popular?: boolean
  specs: {
    players: string
    ram: string
    storage: string
    cpu: string
    bandwidth: string
  }
  features: string[]
  description: string
  color: string
  icon: any
}

export default function ShopPage() {
  const [user, setUser] = useState<User | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const [isAnnual, setIsAnnual] = useState(false)

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      price: 0.94,
      annualPrice: 0.75,
      specs: {
        players: "Up to 10 Players",
        ram: "2GB RAM",
        storage: "10GB NVMe SSD",
        cpu: "1 CPU Core",
        bandwidth: "Unlimited",
      },
      features: [
        "Perfect for small groups",
        "Basic mod support",
        "24/7 server uptime",
        "Free subdomain",
        "Basic DDoS protection",
        "Web-based control panel",
        "Automatic backups",
        "Plugin support",
      ],
      description: "Perfect for beginners and small friend groups starting their Minecraft journey.",
      color: "from-green-400 to-blue-500",
      icon: Server,
    },
    {
      id: "basic",
      name: "Basic",
      price: 1.5,
      annualPrice: 1.2,
      specs: {
        players: "Up to 20 Players",
        ram: "4GB RAM",
        storage: "25GB NVMe SSD",
        cpu: "2 CPU Cores",
        bandwidth: "Unlimited",
      },
      features: [
        "Great for growing communities",
        "Advanced mod support",
        "99.9% uptime guarantee",
        "Free custom domain",
        "Enhanced DDoS protection",
        "Advanced control panel",
        "Daily automated backups",
        "Full plugin library access",
        "Priority support",
      ],
      description: "Ideal for growing communities with more players and advanced features.",
      color: "from-blue-400 to-purple-500",
      icon: Zap,
    },
    {
      id: "standard",
      name: "Standard",
      price: 2.0,
      annualPrice: 1.6,
      popular: true,
      specs: {
        players: "Up to 40 Players",
        ram: "6GB RAM",
        storage: "50GB NVMe SSD",
        cpu: "3 CPU Cores",
        bandwidth: "Unlimited",
      },
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
      ],
      description: "Our most popular plan, perfect for established servers with active communities.",
      color: "from-purple-400 to-pink-500",
      icon: Shield,
    },
    {
      id: "premium",
      name: "Premium",
      price: 2.5,
      annualPrice: 2.0,
      specs: {
        players: "Up to 60 Players",
        ram: "8GB RAM",
        storage: "100GB NVMe SSD",
        cpu: "4 CPU Cores",
        bandwidth: "Unlimited",
      },
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
      ],
      description: "Premium performance for serious server owners and large communities.",
      color: "from-pink-400 to-red-500",
      icon: Headphones,
    },
    {
      id: "pro",
      name: "Pro",
      price: 3.0,
      annualPrice: 2.4,
      specs: {
        players: "Up to 100 Players",
        ram: "12GB RAM",
        storage: "200GB NVMe SSD",
        cpu: "6 CPU Cores",
        bandwidth: "Unlimited",
      },
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
      ],
      description: "Professional-grade hosting for large networks and commercial servers.",
      color: "from-red-400 to-orange-500",
      icon: Server,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 4.0,
      annualPrice: 3.2,
      specs: {
        players: "Unlimited Players",
        ram: "16GB RAM",
        storage: "500GB NVMe SSD",
        cpu: "8 CPU Cores",
        bandwidth: "Unlimited",
      },
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
      ],
      description: "Ultimate hosting solution for large networks, businesses, and enterprise clients.",
      color: "from-orange-400 to-yellow-500",
      icon: Shield,
    },
  ]

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

  const addToCart = (plan: Plan) => {
    try {
      const currentPrice = isAnnual ? plan.annualPrice : plan.price
      // Check if item already exists in cart
      const existingItem = cartItems.find((item) => item.id === plan.id)
      if (existingItem) {
        toast({
          title: "Already in Cart",
          description: `${plan.name} plan is already in your cart.`,
          variant: "destructive",
        })
        return
      }

      // Create complete cart item with all plan data
      const cartItem = {
        id: plan.id,
        name: plan.name,
        price: currentPrice,
        originalPrice: plan.price,
        isAnnual: isAnnual,
        type: "minecraft",
        addedAt: new Date().toISOString(),
        features: plan.features,
        specs: plan.specs,
        // Backward compatibility
        players: plan.specs.players,
        ram: plan.specs.ram,
        storage: plan.specs.storage,
        cpu: plan.specs.cpu,
        bandwidth: plan.specs.bandwidth,
      }

      const updatedCart = [...cartItems, cartItem]
      setCartItems(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))

      toast({
        title: "Added to Cart! 🎉",
        description: `${plan.name} plan has been added to your cart at $${currentPrice}/month.`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
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
          <p className="text-gray-400">Loading shop...</p>
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
      {/* Mobile-First Navigation */}
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
                      <Button variant="ghost" className="flex items-center space-x-1 font-semibold text-green-400">
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
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
              {!user.isAdmin && (
                <Link href="/dashboard/cart" className="relative">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
              <Link href="/dashboard/notifications" className="relative">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
                          className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors flex items-center"
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
                      href="/dashboard/notifications"
                      className="text-lg font-medium text-gray-300 hover:text-green-400 transition-colors flex items-center"
                    >
                      🔔 Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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

      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in-up">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Minecraft Server Plans</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the perfect hosting plan for your Minecraft server. All plans include 24/7 support, DDoS protection,
            and instant setup.
          </p>
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12 animate-fade-in-up">
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

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const isInCart = cartItems.some((item) => item.id === plan.id)
            const currentPrice = isAnnual ? plan.annualPrice : plan.price
            const savings = isAnnual ? ((plan.price - plan.annualPrice) * 12).toFixed(0) : 0
            const discount = isAnnual ? Math.round(((plan.price - plan.annualPrice) / plan.price) * 100) : 0

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-800 border-gray-700 animate-scale-in ${
                  plan.popular ? "ring-2 ring-green-500 shadow-lg" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      {isAnnual && <span className="text-lg text-gray-400 line-through">${plan.price}</span>}
                      <div className="text-4xl font-bold text-white">
                        ${currentPrice}
                        <span className="text-lg font-normal text-gray-400">/month</span>
                      </div>
                    </div>
                    {isAnnual && savings > 0 && (
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30 animate-pulse">
                          Save ${savings}/year ({discount}% off)
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specifications */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Server Specifications:</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Players:</span>
                        <span className="font-medium text-gray-300">{plan.specs.players}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">RAM:</span>
                        <span className="font-medium text-gray-300">{plan.specs.ram}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Storage:</span>
                        <span className="font-medium text-gray-300">{plan.specs.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU:</span>
                        <span className="font-medium text-gray-300">{plan.specs.cpu}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features Preview */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Key Features:</h4>
                    <div className="space-y-1">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 4 && (
                        <div className="text-sm text-gray-500">+{plan.features.length - 4} more features</div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={() => addToCart(plan)}
                      disabled={isInCart}
                      className={`w-full ${
                        plan.popular
                          ? "bg-green-600 hover:bg-green-700"
                          : isInCart
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Cart - ${currentPrice}/mo
                        </>
                      )}
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-3 text-white">
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl">{plan.name} Plan</div>
                              <div className="text-lg font-normal text-gray-400">${plan.price}/month</div>
                            </div>
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">{plan.description}</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Complete Specifications */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-white">Complete Specifications</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Max Players:</span>
                                  <span className="font-medium text-gray-300">{plan.specs.players}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">RAM:</span>
                                  <span className="font-medium text-gray-300">{plan.specs.ram}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Storage:</span>
                                  <span className="font-medium text-gray-300">{plan.specs.storage}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">CPU Cores:</span>
                                  <span className="font-medium text-gray-300">{plan.specs.cpu}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Bandwidth:</span>
                                  <span className="font-medium text-gray-300">{plan.specs.bandwidth}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* All Features */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-white">All Features Included</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                  <span className="text-gray-300">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-4 border-t border-gray-700">
                            <Button
                              onClick={() => addToCart(plan)}
                              disabled={isInCart}
                              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                              size="lg"
                            >
                              {isInCart ? (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Already in Cart
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add {plan.name} to Cart - ${plan.price}/month
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Link href="/features">
                      <Button variant="ghost" className="w-full text-green-400 hover:text-green-300 hover:bg-gray-700">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 sm:mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="bg-gray-800 border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Minecraft Hosting?</h2>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-900 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">
                  NVMe SSD storage and high-performance CPUs ensure your server runs smoothly with minimal lag.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">DDoS Protection</h3>
                <p className="text-gray-400 text-sm">
                  Enterprise-grade DDoS protection keeps your server online and secure from attacks.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-900 flex items-center justify-center">
                  <Headphones className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">24/7 Support</h3>
                <p className="text-gray-400 text-sm">
                  Our expert support team is available around the clock to help with any issues or questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
