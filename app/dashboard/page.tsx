"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  Bell,
  Package,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Zap,
  Shield,
  HardDrive,
  Headphones,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface User {
  email: string
  name: string
  firstName?: string
  lastName?: string
  isAdmin: boolean
}

interface Purchase {
  id: number
  user: string
  items: any[]
  total: string
  date: string
  paymentMethod: string
  status: string
  paymentStatus: "not_received" | "received" | "suspended"
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

const translations = {
  en: {
    welcome: "Welcome back",
    manageAdmin: "Manage your SkilloraClouds platform",
    manageUser: "Manage your Minecraft servers and account",
    home: "Home",
    shop: "Shop",
    minecraftPlans: "Minecraft Plans",
    notifications: "Notifications",
    editProfile: "Edit Profile",
    adminPanel: "Admin Panel",
    logout: "Logout",
    dashboard: "Dashboard",
    shopPlans: "Shop Plans",
    cart: "Cart",
    language: "Language",
    languageChanged: "Language Changed",
    languageSwitched: "Language switched to",
    loggedOut: "Logged Out",
    loggedOutDesc: "You have been successfully logged out.",
    loadingDashboard: "Loading dashboard...",
    redirectingLogin: "Redirecting to login...",
    totalUsers: "Total Users",
    totalOrders: "Total Orders",
    totalRevenue: "Total Revenue",
    totalServers: "Total Servers",
    activeServers: "Active Servers",
    suspended: "Suspended",
    monthlyRevenue: "Monthly Cost",
    runningServers: "Running servers",
    needAttention: "Need attention",
    perMonth: "Per month",
    allTime: "All time",
    minecraftServerHosting: "Minecraft Server Hosting",
    hostingDescription:
      "Level up your Minecraft server with powerful hosting! Enjoy lag-free performance, low latency, and reliable specs.",
    instantSetup: "Instant Setup",
    ddosProtection: "DDoS Protection",
    support247: "24/7 Support",
    dailyBackups: "Daily Backups",
    viewPlansButton: "View Plans & Pricing",
    recentNotifications: "Recent Notifications",
    viewAll: "View All",
    noNotifications: "No notifications yet",
    adminActions: "Admin Actions",
    adminTools: "Administrative tools and shortcuts",
    manageUsers: "Manage users & orders",
    systemStatus: "System Status",
    systemOperational: "All systems operational",
    systemOverview: "System Overview",
    platformStats: "Platform statistics and health",
    online: "Online",
    serverUptime: "Server Uptime",
    activeSessions: "Active Sessions",
    recentOrders: "All Orders",
    latestPurchases: "All your Minecraft server purchases",
    order: "Order",
    active: "Active",
    pending: "Pending",
  },
  es: {
    welcome: "Bienvenido de nuevo",
    manageAdmin: "Gestiona tu plataforma SkilloraClouds",
    manageUser: "Gestiona tus servidores de Minecraft y cuenta",
    home: "Inicio",
    shop: "Tienda",
    minecraftPlans: "Planes de Minecraft",
    notifications: "Notificaciones",
    editProfile: "Editar Perfil",
    adminPanel: "Panel de Admin",
    logout: "Cerrar Sesión",
    dashboard: "Panel",
    shopPlans: "Planes de Tienda",
    cart: "Carrito",
    language: "Idioma",
    languageChanged: "Idioma Cambiado",
    languageSwitched: "Idioma cambiado a",
    loggedOut: "Sesión Cerrada",
    loggedOutDesc: "Has cerrado sesión exitosamente.",
    loadingDashboard: "Cargando panel...",
    redirectingLogin: "Redirigiendo al login...",
    totalUsers: "Total de Usuarios",
    totalOrders: "Total de Pedidos",
    totalRevenue: "Ingresos Totales",
    totalServers: "Total de Servidores",
    activeServers: "Servidores Activos",
    suspended: "Suspendidos",
    monthlyRevenue: "Costo Mensual",
    runningServers: "Servidores en funcionamiento",
    needAttention: "Necesitan atención",
    perMonth: "Por mes",
    allTime: "Todo el tiempo",
    minecraftServerHosting: "Hosting de Servidor Minecraft",
    hostingDescription:
      "¡Mejora tu servidor de Minecraft con hosting potente! Disfruta de rendimiento sin lag, baja latencia y especificaciones confiables.",
    instantSetup: "Configuración Instantánea",
    ddosProtection: "Protección DDoS",
    support247: "Soporte 24/7",
    dailyBackups: "Respaldos Diarios",
    viewPlansButton: "Ver Planes y Precios",
    recentNotifications: "Notificaciones Recientes",
    viewAll: "Ver Todo",
    noNotifications: "Aún no hay notificaciones",
    adminActions: "Acciones de Admin",
    adminTools: "Herramientas administrativas y atajos",
    manageUsers: "Gestionar usuarios y pedidos",
    systemStatus: "Estado del Sistema",
    systemOperational: "Todos los sistemas operativos",
    systemOverview: "Resumen del Sistema",
    platformStats: "Estadísticas y salud de la plataforma",
    online: "En línea",
    serverUptime: "Tiempo de actividad del servidor",
    activeSessions: "Sesiones Activas",
    recentOrders: "Todos los Pedidos",
    latestPurchases: "Todas tus compras de servidores Minecraft",
    order: "Pedido",
    active: "Activo",
    pending: "Pendiente",
  },
  fr: {
    welcome: "Bon retour",
    manageAdmin: "Gérez votre plateforme SkilloraClouds",
    manageUser: "Gérez vos serveurs Minecraft et votre compte",
    home: "Accueil",
    shop: "Boutique",
    minecraftPlans: "Plans Minecraft",
    notifications: "Notifications",
    editProfile: "Modifier le Profil",
    adminPanel: "Panneau Admin",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    shopPlans: "Plans de Boutique",
    cart: "Panier",
    language: "Langue",
    languageChanged: "Langue Changée",
    languageSwitched: "Langue changée en",
    loggedOut: "Déconnecté",
    loggedOutDesc: "Vous avez été déconnecté avec succès.",
    loadingDashboard: "Chargement du tableau de bord...",
    redirectingLogin: "Redirection vers la connexion...",
    totalUsers: "Total des Utilisateurs",
    totalOrders: "Total des Commandes",
    totalRevenue: "Revenus Totaux",
    totalServers: "Total des Serveurs",
    activeServers: "Serveurs Actifs",
    suspended: "Suspendus",
    monthlyRevenue: "Coût Mensuel",
    runningServers: "Serveurs en cours d'exécution",
    needAttention: "Besoin d'attention",
    perMonth: "Par mois",
    allTime: "Tout le temps",
    minecraftServerHosting: "Hébergement de Serveur Minecraft",
    hostingDescription:
      "Améliorez votre serveur Minecraft avec un hébergement puissant! Profitez de performances sans lag, de faible latence et de spécifications fiables.",
    instantSetup: "Configuration Instantanée",
    ddosProtection: "Protection DDoS",
    support247: "Support 24/7",
    dailyBackups: "Sauvegardes Quotidiennes",
    viewPlansButton: "Voir les Plans et Tarifs",
    recentNotifications: "Notifications Récentes",
    viewAll: "Voir Tout",
    noNotifications: "Pas encore de notifications",
    adminActions: "Actions Admin",
    adminTools: "Outils administratifs et raccourcis",
    manageUsers: "Gérer les utilisateurs et commandes",
    systemStatus: "État du Système",
    systemOperational: "Tous les systèmes opérationnels",
    systemOverview: "Aperçu du Système",
    platformStats: "Statistiques et santé de la plateforme",
    online: "En ligne",
    serverUptime: "Temps de fonctionnement du serveur",
    activeSessions: "Sessions Actives",
    recentOrders: "Toutes les Commandes",
    latestPurchases: "Tous vos achats de serveurs Minecraft",
    order: "Commande",
    active: "Actif",
    pending: "En attente",
  },
}

// Shop plans data with updated pricing
const shopPlans = [
  {
    id: 1,
    name: "Starter",
    price: "0.94",
    ram: "1GB",
    storage: "10GB SSD",
    players: "10",
    icon: "🌱",
    color: "from-green-400 to-green-600",
    popular: false,
    features: ["1GB RAM", "10GB SSD Storage", "Up to 10 Players", "Basic Support"],
  },
  {
    id: 2,
    name: "Basic",
    price: "1.50",
    ram: "2GB",
    storage: "20GB SSD",
    players: "25",
    icon: "⚡",
    color: "from-blue-400 to-blue-600",
    popular: false,
    features: ["2GB RAM", "20GB SSD Storage", "Up to 25 Players", "Email Support"],
  },
  {
    id: 3,
    name: "Standard",
    price: "2.00",
    ram: "4GB",
    storage: "40GB SSD",
    players: "50",
    icon: "🚀",
    color: "from-purple-400 to-purple-600",
    popular: true,
    features: ["4GB RAM", "40GB SSD Storage", "Up to 50 Players", "Priority Support"],
  },
  {
    id: 4,
    name: "Premium",
    price: "2.50",
    ram: "6GB",
    storage: "60GB SSD",
    players: "75",
    icon: "👑",
    color: "from-yellow-400 to-orange-500",
    popular: false,
    features: ["6GB RAM", "60GB SSD Storage", "Up to 75 Players", "24/7 Support"],
  },
  {
    id: 5,
    name: "Pro",
    price: "3.00",
    ram: "8GB",
    storage: "100GB SSD",
    players: "100",
    icon: "💎",
    color: "from-cyan-400 to-blue-600",
    popular: false,
    features: ["8GB RAM", "100GB SSD Storage", "Up to 100 Players", "Dedicated Support"],
  },
  {
    id: 6,
    name: "Enterprise",
    price: "4.00",
    ram: "16GB",
    storage: "200GB SSD",
    players: "Unlimited",
    icon: "🏆",
    color: "from-red-500 to-pink-600",
    popular: false,
    features: ["16GB RAM", "200GB SSD Storage", "Unlimited Players", "VIP Support"],
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const router = useRouter()
  const { toast } = useToast()

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en

  useEffect(() => {
    setIsClient(true)

    const checkAuth = () => {
      if (typeof window === "undefined") return

      try {
        const userData = localStorage.getItem("user")
        const isLoggedIn = localStorage.getItem("isLoggedIn")

        if (!userData || !isLoggedIn) {
          router.push("/login")
          return
        }

        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        // Load saved language preference
        const savedLanguage = localStorage.getItem("selectedLanguage") || "en"
        setSelectedLanguage(savedLanguage)

        // Check if user language preference changed
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
        if (currentUser.language && currentUser.language !== selectedLanguage) {
          setSelectedLanguage(currentUser.language)
        }

        // Load cart items for non-admin users
        if (!parsedUser.isAdmin) {
          const cart = localStorage.getItem("cart")
          if (cart) {
            try {
              setCartItems(JSON.parse(cart))
            } catch (error) {
              console.error("Error parsing cart:", error)
              setCartItems([])
            }
          }
        }

        // Load ALL purchases for the user (not just user's own purchases)
        const purchaseData = localStorage.getItem("purchases")
        if (purchaseData) {
          try {
            const allPurchases = JSON.parse(purchaseData)
            if (parsedUser.isAdmin) {
              // Admin sees all purchases
              setPurchases(allPurchases)
            } else {
              // Regular user sees only their purchases
              const userPurchases = allPurchases.filter((p: Purchase) => p.user === parsedUser.email)
              setPurchases(userPurchases)
            }
          } catch (error) {
            console.error("Error parsing purchases:", error)
            setPurchases([])
          }
        }

        // Load user's notifications (only for non-admin users)
        if (!parsedUser.isAdmin) {
          try {
            const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
            const userNotifications = allNotifications.filter((notif: any) => notif.userEmail === parsedUser.email)
            setNotifications(userNotifications.slice(0, 3)) // Show only latest 3
          } catch (error) {
            console.error("Error parsing notifications:", error)
            setNotifications([])
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("isLoggedIn")
        router.push("/login")
      }
    }

    checkAuth()

    // Listen for language changes from profile page
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "selectedLanguage" && e.newValue) {
        setSelectedLanguage(e.newValue)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router, selectedLanguage])

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    localStorage.setItem("selectedLanguage", languageCode)

    const selectedLang = languages.find((lang) => lang.code === languageCode)
    toast({
      title: t.languageChanged,
      description: `${t.languageSwitched} ${selectedLang?.name}`,
    })
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("cart")
    }

    toast({
      title: t.loggedOut,
      description: t.loggedOutDesc,
    })

    router.push("/")
  }

  const getTotalSpent = () => {
    return purchases.reduce((total, purchase) => total + Number.parseFloat(purchase.total), 0).toFixed(2)
  }

  const getTotalServers = () => {
    return purchases.reduce((total, purchase) => total + purchase.items.length, 0)
  }

  const getActiveServers = () => {
    return purchases
      .filter((p) => p.paymentStatus === "received")
      .reduce((total, purchase) => total + purchase.items.length, 0)
  }

  const getSuspendedServers = () => {
    return purchases
      .filter((p) => p.paymentStatus === "suspended")
      .reduce((total, purchase) => total + purchase.items.length, 0)
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === selectedLanguage) || languages[0]
  }

  // Show loading state during SSR or while checking auth
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t.loadingDashboard}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t.redirectingLogin}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile-First Navigation */}
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2 group">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="SkilloraClouds Logo"
                  width={32}
                  height={32}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-lg sm:text-xl font-bold text-white">SkilloraClouds</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="text-white hover:text-green-400 transition-colors font-semibold">
                {t.home}
              </Link>
              {!user.isAdmin && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-white hover:text-green-400 hover:bg-gray-700"
                      >
                        <span>{t.shop}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/shop" className="w-full text-white hover:text-green-400">
                          <Package className="h-4 w-4 mr-2" />
                          {t.minecraftPlans}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/dashboard/cart" className="relative">
                    <Button variant="ghost" size="sm" className="text-white hover:text-green-400 hover:bg-gray-700">
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
              {!user.isAdmin && (
                <Link href="/dashboard/notifications" className="relative">
                  <Button variant="ghost" size="sm" className="text-white hover:text-green-400 hover:bg-gray-700">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                </Link>
              )}

              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-white hover:text-green-400 hover:bg-gray-700"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{getCurrentLanguage().flag}</span>
                    <span className="hidden lg:inline">{getCurrentLanguage().name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 max-h-64 overflow-y-auto bg-gray-800 border-gray-700">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`flex items-center space-x-2 text-white hover:text-green-400 ${
                        selectedLanguage === language.code ? "bg-gray-700 text-green-400" : ""
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                      {selectedLanguage === language.code && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-white hover:text-green-400 hover:bg-gray-700"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.firstName || user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="w-full text-white hover:text-green-400">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {t.editProfile}
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="w-full text-white hover:text-green-400">
                        <Image
                          src="/placeholder.svg?height=16&width=16"
                          alt="Admin"
                          width={16}
                          height={16}
                          className="mr-2"
                        />
                        {t.adminPanel}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              {!user.isAdmin && (
                <>
                  <Link href="/dashboard/cart" className="relative">
                    <Button variant="ghost" size="sm" className="text-white hover:text-green-400">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                          {cartItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link href="/dashboard/notifications" className="relative">
                    <Button variant="ghost" size="sm" className="text-white hover:text-green-400">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                          {unreadNotifications}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-green-400">
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
                      className="text-lg font-medium text-white hover:text-green-400 transition-colors"
                    >
                      🏠 {t.dashboard}
                    </Link>
                    {!user.isAdmin && (
                      <>
                        <Link
                          href="/dashboard/shop"
                          className="text-lg font-medium text-white hover:text-green-400 transition-colors"
                        >
                          🛒 {t.shopPlans}
                        </Link>
                        <Link
                          href="/dashboard/cart"
                          className="text-lg font-medium text-white hover:text-green-400 transition-colors flex items-center"
                        >
                          🛍️ {t.cart}
                          {cartItems.length > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {cartItems.length}
                            </span>
                          )}
                        </Link>
                        <Link
                          href="/dashboard/notifications"
                          className="text-lg font-medium text-white hover:text-green-400 transition-colors flex items-center"
                        >
                          🔔 {t.notifications}
                          {unreadNotifications > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {unreadNotifications}
                            </span>
                          )}
                        </Link>
                      </>
                    )}

                    {/* Language Selection in Mobile */}
                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="text-sm font-medium text-gray-300 mb-2">{t.language}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {languages.slice(0, 6).map((language) => (
                          <Button
                            key={language.code}
                            variant={selectedLanguage === language.code ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleLanguageChange(language.code)}
                            className="justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                          >
                            <span className="mr-2">{language.flag}</span>
                            <span className="text-xs">{language.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      className="text-lg font-medium text-white hover:text-green-400 transition-colors"
                    >
                      👤 {t.editProfile}
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="text-lg font-medium text-white hover:text-green-400 transition-colors"
                      >
                        ⚙️ {t.adminPanel}
                      </Link>
                    )}
                    <div className="pt-6 border-t border-gray-700">
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {t.logout}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {t.welcome}, {user.firstName || user.name}! 👋
          </h1>
          <p className="text-gray-400 mt-2">{user.isAdmin ? t.manageAdmin : t.manageUser}</p>
        </div>

        {user.isAdmin ? (
          /* Admin Dashboard */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <UserIcon className="h-4 w-4 mr-2 text-blue-400" />
                  {t.totalUsers}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users") || "[]").length : 0}
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <Package className="h-4 w-4 mr-2 text-green-400" />
                  {t.totalOrders}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("purchases") || "[]").length : 0}
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                  {t.totalRevenue}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  $
                  {typeof window !== "undefined"
                    ? JSON.parse(localStorage.getItem("purchases") || "[]")
                        .reduce((total: number, purchase: any) => total + Number.parseFloat(purchase.total), 0)
                        .toFixed(2)
                    : "0.00"}
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <Image
                    src="/placeholder.svg?height=16&width=16"
                    alt="Server"
                    width={16}
                    height={16}
                    className="mr-2 text-orange-400"
                  />
                  {t.totalServers}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {typeof window !== "undefined"
                    ? JSON.parse(localStorage.getItem("purchases") || "[]").reduce(
                        (total: number, purchase: any) => total + purchase.items.length,
                        0,
                      )
                    : 0}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* User Dashboard */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <Image
                    src="/placeholder.svg?height=16&width=16"
                    alt="Server"
                    width={16}
                    height={16}
                    className="mr-2 text-green-400"
                  />
                  {t.activeServers}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-400">{getActiveServers()}</p>
                <p className="text-xs text-gray-500">{t.runningServers}</p>
              </CardContent>
            </Card>
            <Card
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-400" />
                  {t.suspended}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-400">{getSuspendedServers()}</p>
                <p className="text-xs text-gray-500">{t.needAttention}</p>
              </CardContent>
            </Card>
            <Card
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                  {t.monthlyRevenue}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">${getTotalSpent()}</p>
                <p className="text-xs text-gray-500">{t.perMonth}</p>
              </CardContent>
            </Card>
            <Card
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-sm text-white">
                  <Package className="h-4 w-4 mr-2 text-blue-400" />
                  {t.totalOrders}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{purchases.length}</p>
                <p className="text-xs text-gray-500">{t.allTime}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Minecraft Server Plans Section (Replaces Quick Actions for non-admin users) */}
          {!user.isAdmin ? (
            <Card className="lg:col-span-2 bg-gray-800 border-gray-700 animate-fade-in-up">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-white">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Server"
                    width={24}
                    height={24}
                    className="mr-2 text-green-500"
                  />
                  {t.minecraftServerHosting}
                </CardTitle>
                <CardDescription className="text-base text-gray-400">{t.hostingDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30">
                    <Zap className="h-3 w-3 mr-1" />
                    {t.instantSetup}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-500/30">
                    <Shield className="h-3 w-3 mr-1" />
                    {t.ddosProtection}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-500/30">
                    <Headphones className="h-3 w-3 mr-1" />
                    {t.support247}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-900/20 text-orange-400 border-orange-500/30">
                    <HardDrive className="h-3 w-3 mr-1" />
                    {t.dailyBackups}
                  </Badge>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {shopPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer bg-gray-700 ${
                        plan.popular ? "border-green-500 bg-green-900/20" : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-green-500 text-white">Most Popular</Badge>
                        </div>
                      )}
                      <div className="text-center">
                        <div
                          className={`text-3xl mb-2 p-2 rounded-lg bg-gradient-to-r ${plan.color} text-white inline-block`}
                        >
                          {plan.icon}
                        </div>
                        <h3 className="font-bold text-sm mb-1 text-white">{plan.name}</h3>
                        <div className="text-lg font-bold text-green-400 mb-2">${plan.price}/mo</div>
                        <div className="space-y-1 text-xs text-gray-400">
                          <div>{plan.ram} RAM</div>
                          <div>{plan.storage}</div>
                          <div>{plan.players} Players</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/shop">
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Package className="h-5 w-5 mr-2" />
                    {t.viewPlansButton}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            /* Admin Quick Actions */
            <Card className="lg:col-span-2 bg-gray-800 border-gray-700 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-white">{t.adminActions}</CardTitle>
                <CardDescription className="text-gray-400">{t.adminTools}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/admin">
                    <Button className="w-full h-12 text-left justify-start bg-green-600 hover:bg-green-700 text-white">
                      <Image
                        src="/placeholder.svg?height=20&width=20"
                        alt="Admin"
                        width={20}
                        height={20}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold">{t.adminPanel}</div>
                        <div className="text-xs opacity-75">{t.manageUsers}</div>
                      </div>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-left justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    disabled
                  >
                    <Package className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-semibold">{t.systemStatus}</div>
                      <div className="text-xs opacity-75">{t.systemOperational}</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Notifications (Only for non-admin users) */}
          {!user.isAdmin && (
            <Card className="bg-gray-800 border-gray-700 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  {t.recentNotifications}
                  <Link href="/dashboard/notifications">
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                      {t.viewAll}
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <div className="text-center py-6">
                    <Bell className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{t.noNotifications}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border transition-all hover:bg-gray-700 ${!notification.read ? "bg-green-900/20 border-green-500/30" : "bg-gray-700 border-gray-600"}`}
                      >
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-0.5">
                            {notification.type === "payment_received" && (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            )}
                            {notification.type === "server_suspended" && (
                              <AlertCircle className="h-4 w-4 text-red-400" />
                            )}
                            {notification.type === "general" && <Bell className="h-4 w-4 text-blue-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{notification.title}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Admin Stats Card */}
          {user.isAdmin && (
            <Card className="bg-gray-800 border-gray-700 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-white">{t.systemOverview}</CardTitle>
                <CardDescription className="text-gray-400">{t.platformStats}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t.systemStatus}</span>
                    <Badge className="bg-green-600 text-white">{t.online}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t.serverUptime}</span>
                    <span className="text-sm font-medium text-white">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t.activeSessions}</span>
                    <span className="text-sm font-medium text-white">
                      {typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users") || "[]").length : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t.language}</span>
                    <span className="text-sm font-medium flex items-center text-white">
                      {getCurrentLanguage().flag} {getCurrentLanguage().name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* All Orders (for both admin and regular users) */}
        {purchases.length > 0 && (
          <Card className="mt-6 bg-gray-800 border-gray-700 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="text-white">{t.recentOrders}</CardTitle>
              <CardDescription className="text-gray-400">{t.latestPurchases}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {purchase.paymentStatus === "received" && <CheckCircle className="h-5 w-5 text-green-400" />}
                        {purchase.paymentStatus === "suspended" && <AlertCircle className="h-5 w-5 text-red-400" />}
                        {purchase.paymentStatus === "not_received" && <Clock className="h-5 w-5 text-orange-400" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {t.order} #{purchase.id}
                        </p>
                        <p className="text-sm text-gray-400">
                          {purchase.items.map((item) => item.name).join(", ")} • ${purchase.total}/month
                        </p>
                        <p className="text-xs text-gray-500">{new Date(purchase.date).toLocaleDateString()}</p>
                        {user.isAdmin && <p className="text-xs text-gray-400">Customer: {purchase.user}</p>}
                      </div>
                    </div>
                    <div>
                      <Badge
                        variant={
                          purchase.paymentStatus === "received"
                            ? "default"
                            : purchase.paymentStatus === "suspended"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          purchase.paymentStatus === "received"
                            ? "bg-green-600 text-white"
                            : purchase.paymentStatus === "suspended"
                              ? "bg-red-600 text-white"
                              : "bg-gray-600 text-white"
                        }
                      >
                        {purchase.paymentStatus === "received"
                          ? t.active
                          : purchase.paymentStatus === "suspended"
                            ? t.suspended
                            : t.pending}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
