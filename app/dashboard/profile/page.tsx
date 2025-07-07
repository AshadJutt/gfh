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
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  Bell,
  Package,
  Globe,
  CheckCircle,
  Save,
  User,
  Phone,
  MapPin,
  Calendar,
  Edit3,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

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
    profile: "Profile",
    editProfile: "Edit Profile",
    personalInfo: "Personal Information",
    updateDetails: "Update your personal details and preferences",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address",
    bio: "Bio",
    bioPlaceholder: "Tell us about yourself...",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    profileUpdated: "Profile Updated",
    profileUpdatedDesc: "Your profile has been successfully updated.",
    home: "Home",
    shop: "Shop",
    minecraftPlans: "Minecraft Plans",
    notifications: "Notifications",
    adminPanel: "Admin Panel",
    logout: "Logout",
    dashboard: "Dashboard",
    shopPlans: "Shop Plans",
    cart: "Cart",
    languageChanged: "Language Changed",
    languageSwitched: "Language switched to",
    loggedOut: "Logged Out",
    loggedOutDesc: "You have been successfully logged out.",
    loadingProfile: "Loading profile...",
    redirectingLogin: "Redirecting to login...",
    profileOverview: "Profile Overview",
    accountDetails: "Your account information",
    memberSince: "Member since",
    totalOrders: "Total Orders",
    activeServers: "Active Servers",
    accountStatus: "Account Status",
    active: "Active",
    admin: "Admin",
    user: "User",
  },
  es: {
    profile: "Perfil",
    editProfile: "Editar Perfil",
    personalInfo: "Información Personal",
    updateDetails: "Actualiza tus datos personales y preferencias",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    phone: "Teléfono",
    address: "Dirección",
    bio: "Biografía",
    bioPlaceholder: "Cuéntanos de ti...",
    saveChanges: "Guardar Cambios",
    cancel: "Cancelar",
    profileUpdated: "Perfil Actualizado",
    profileUpdatedDesc: "Tu perfil ha sido actualizado exitosamente.",
    home: "Inicio",
    shop: "Tienda",
    minecraftPlans: "Planes de Minecraft",
    notifications: "Notificaciones",
    adminPanel: "Panel de Admin",
    logout: "Cerrar Sesión",
    dashboard: "Panel",
    shopPlans: "Planes de Tienda",
    cart: "Carrito",
    languageChanged: "Idioma Cambiado",
    languageSwitched: "Idioma cambiado a",
    loggedOut: "Déconnecté",
    loggedOutDesc: "Has cerrado sesión exitosamente.",
    loadingProfile: "Cargando perfil...",
    redirectingLogin: "Redirigiendo al login...",
    profileOverview: "Resumen del Perfil",
    accountDetails: "Información de tu cuenta",
    memberSince: "Membre desde",
    totalOrders: "Total de Pedidos",
    activeServers: "Serveurs Actifs",
    accountStatus: "Estado de la Cuenta",
    active: "Activo",
    admin: "Admin",
    user: "Usuario",
  },
  fr: {
    profile: "Profil",
    editProfile: "Modifier le Profil",
    personalInfo: "Informations Personnelles",
    updateDetails: "Mettez à jour vos détails personnels et préférences",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse Email",
    phone: "Téléphone",
    address: "Adresse",
    bio: "Biographie",
    bioPlaceholder: "Parlez-nous de vous...",
    saveChanges: "Sauvegarder",
    cancel: "Annuler",
    profileUpdated: "Profil Mis à Jour",
    profileUpdatedDesc: "Votre profil a été mis à jour avec succès.",
    home: "Accueil",
    shop: "Boutique",
    minecraftPlans: "Plans Minecraft",
    notifications: "Notifications",
    adminPanel: "Panneau Admin",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    shopPlans: "Plans de Boutique",
    cart: "Panier",
    languageChanged: "Langue Changée",
    languageSwitched: "Langue changée en",
    loggedOut: "Déconnecté",
    loggedOutDesc: "Vous avez été déconnecté avec succès.",
    loadingProfile: "Chargement du profil...",
    redirectingLogin: "Redirection vers la connexion...",
    profileOverview: "Aperçu du Profil",
    accountDetails: "Informations de votre compte",
    memberSince: "Membre depuis",
    totalOrders: "Total des Commandes",
    activeServers: "Serveurs Actifs",
    accountStatus: "État du Compte",
    active: "Actif",
    admin: "Admin",
    user: "Utilisateur",
  },
}

interface UserProfile {
  email: string
  name: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  bio?: string
  isAdmin: boolean
  language?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  })
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
        const savedLanguage = localStorage.getItem("selectedLanguage") || parsedUser.language || "en"
        setSelectedLanguage(savedLanguage)

        // Set form data from user
        setFormData({
          firstName: parsedUser.firstName || "",
          lastName: parsedUser.lastName || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          address: parsedUser.address || "",
          bio: parsedUser.bio || "",
        })

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

          // Load user's notifications
          try {
            const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
            const userNotifications = allNotifications.filter((notif: any) => notif.userEmail === parsedUser.email)
            setNotifications(userNotifications)
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
  }, [router])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Update user data
    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
      name: `${formData.firstName} ${formData.lastName}`.trim() || user.name,
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Update users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = users.findIndex((u: any) => u.email === user.email)
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem("users", JSON.stringify(users))
    }

    setUser(updatedUser)
    setShowSuccessDialog(true)
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === selectedLanguage) || languages[0]
  }

  const getUserStats = () => {
    if (typeof window === "undefined") return { orders: 0, servers: 0 }

    const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
    const userPurchases = purchases.filter((p: any) => p.user === user?.email)

    return {
      orders: userPurchases.length,
      servers: userPurchases.reduce((total: number, purchase: any) => total + purchase.items.length, 0),
    }
  }

  // Show loading state during SSR or while checking auth
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">{t.loadingProfile}</p>
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

  const stats = getUserStats()

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
                  src="/images/logo.png"
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
                    <Link href="/dashboard/profile" className="w-full text-green-400 bg-gray-700">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {t.editProfile}
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="w-full text-white hover:text-green-400">
                        <Image src="/images/logo.png" alt="Admin" width={16} height={16} className="mr-2" />
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
                      <h3 className="text-sm font-medium text-gray-300 mb-2">Language</h3>
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
                      className="text-lg font-medium text-green-400 bg-gray-700 px-3 py-2 rounded-md transition-colors"
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

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <Edit3 className="h-6 w-6 sm:h-8 sm:w-8 mr-3 text-green-400" />
            {t.editProfile}
          </h1>
          <p className="text-gray-400 mt-2">{t.updateDetails}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Form - Order 1 on mobile, 2 on desktop */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <Card className="bg-gray-800 border-gray-700 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-400" />
                  {t.personalInfo}
                </CardTitle>
                <CardDescription className="text-gray-400">{t.updateDetails}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white text-sm sm:text-base">
                        {t.firstName}
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white text-sm sm:text-base">
                        {t.lastName}
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white text-sm sm:text-base">
                      {t.email}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="mt-1 bg-gray-600 border-gray-500 text-gray-300 h-10 sm:h-11 text-sm sm:text-base cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white text-sm sm:text-base">
                      {t.phone}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white text-sm sm:text-base">
                      {t.address}
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                      placeholder="123 Main St, City, Country"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-white text-sm sm:text-base">
                      {t.bio}
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="mt-1 bg-gray-700 border-gray-600 text-white min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                      placeholder={t.bioPlaceholder}
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6">
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10 sm:h-11 text-sm sm:text-base"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveChanges}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                      className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                    >
                      {t.cancel}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Profile Overview - Order 2 on mobile, 1 on desktop */}
          <div className="order-2 lg:order-2">
            <Card className="bg-gray-800 border-gray-700 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-green-400" />
                  {t.profileOverview}
                </CardTitle>
                <CardDescription className="text-gray-400">{t.accountDetails}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {(user.firstName?.[0] || user.name?.[0] || "U").toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base sm:text-lg">
                      {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name}
                    </h3>
                    <p className="text-gray-400 text-sm break-all">{user.email}</p>
                    <Badge className={`mt-1 text-xs ${user.isAdmin ? "bg-purple-600" : "bg-green-600"}`}>
                      {user.isAdmin ? t.admin : t.user}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t.memberSince}
                    </span>
                    <span className="text-white text-sm font-medium">2024</span>
                  </div>

                  {!user.isAdmin && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          {t.totalOrders}
                        </span>
                        <span className="text-white text-sm font-medium">{stats.orders}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm flex items-center">
                          <Image src="/images/logo.png" alt="Server" width={16} height={16} className="mr-2" />
                          {t.activeServers}
                        </span>
                        <span className="text-white text-sm font-medium">{stats.servers}</span>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t.accountStatus}
                    </span>
                    <Badge className="bg-green-600 text-white text-xs">{t.active}</Badge>
                  </div>

                  {user.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone
                      </span>
                      <span className="text-white text-sm font-medium">{user.phone}</span>
                    </div>
                  )}

                  {user.address && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Address
                      </span>
                      <span className="text-white text-sm font-medium text-right">{user.address}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Language
                    </span>
                    <span className="text-white text-sm font-medium flex items-center">
                      {getCurrentLanguage().flag} {getCurrentLanguage().name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 mx-4 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              {t.profileUpdated}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">{t.profileUpdatedDesc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowSuccessDialog(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
