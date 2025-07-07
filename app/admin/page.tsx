"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Mail,
  Eye,
  Trash2,
  DollarSign,
  TrendingUp,
  UserPlus,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  CreditCard,
  Bell,
  MessageSquare,
  Send,
  Globe,
  Chrome,
  Github,
  MessageCircle,
  EyeOff,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminUser {
  email: string
  name: string
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
  loginMethod?: string
}

interface UserStats {
  email: string
  totalRevenue: number
  totalServers: number
  purchases: Purchase[]
  lastPurchase: string
}

interface RegisteredUser {
  email: string
  name: string
  firstName: string
  lastName: string
  registeredAt: string
  loginMethod: string
  password: string
}

interface MessageData {
  recipientEmail: string
  subject: string
  message: string
}

interface SupportMessage {
  id: number
  userEmail: string
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
  senderEmail?: string
  senderName?: string
}

export default function AdminPanel() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [deletingPurchase, setDeletingPurchase] = useState<number | null>(null)
  const [userStats, setUserStats] = useState<UserStats[]>([])
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([])
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminNotifications, setAdminNotifications] = useState<SupportMessage[]>([])
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([])
  const [messageData, setMessageData] = useState<MessageData>({
    recipientEmail: "",
    subject: "",
    message: "",
  })
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [deletingMessage, setDeletingMessage] = useState<number | null>(null)
  const router = useRouter()
  const { toast } = useToast()

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
        if (!parsedUser.isAdmin) {
          router.push("/dashboard")
          return
        }

        setUser(parsedUser)

        // Load purchases
        const purchaseData = localStorage.getItem("purchases")
        if (purchaseData) {
          try {
            const purchaseList = JSON.parse(purchaseData)
            const updatedPurchases = purchaseList.map((purchase: Purchase) => ({
              ...purchase,
              paymentStatus: purchase.paymentStatus || "not_received",
            }))
            setPurchases(updatedPurchases)
            localStorage.setItem("purchases", JSON.stringify(updatedPurchases))
            calculateUserStats(updatedPurchases)
          } catch (error) {
            console.error("Error parsing purchases:", error)
            setPurchases([])
          }
        }

        // Load registered users
        const registeredUsersData = localStorage.getItem("users")
        if (registeredUsersData) {
          try {
            setRegisteredUsers(JSON.parse(registeredUsersData))
          } catch (error) {
            console.error("Error parsing users:", error)
            setRegisteredUsers([])
          }
        }

        // Load admin notifications and support messages
        const loadNotifications = () => {
          const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
          const adminNotifications = allNotifications.filter((notif: any) => notif.userEmail === "admin")
          const supportMessages = allNotifications.filter((notif: any) => notif.type === "support_message")

          adminNotifications.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          supportMessages.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

          setAdminNotifications(adminNotifications)
          setSupportMessages(supportMessages)
        }

        loadNotifications()
        setIsLoading(false)
      } catch (error) {
        console.error("Admin auth check error:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("isLoggedIn")
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  const calculateUserStats = (purchaseList: Purchase[]) => {
    const statsMap = new Map<string, UserStats>()

    purchaseList.forEach((purchase) => {
      const userEmail = purchase.user
      const revenue = Number.parseFloat(purchase.total)
      const serverCount = purchase.items.length

      if (statsMap.has(userEmail)) {
        const existing = statsMap.get(userEmail)!
        existing.totalRevenue += revenue
        existing.totalServers += serverCount
        existing.purchases.push(purchase)

        if (new Date(purchase.date) > new Date(existing.lastPurchase)) {
          existing.lastPurchase = purchase.date
        }
      } else {
        statsMap.set(userEmail, {
          email: userEmail,
          totalRevenue: revenue,
          totalServers: serverCount,
          purchases: [purchase],
          lastPurchase: purchase.date,
        })
      }
    })

    const statsArray = Array.from(statsMap.values()).sort((a, b) => b.totalRevenue - a.totalRevenue)
    setUserStats(statsArray)
  }

  const createNotification = (userEmail: string, type: string, title: string, message: string, orderId?: number) => {
    const notification = {
      id: Date.now().toString(),
      userEmail,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      orderId,
    }

    const existingNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    existingNotifications.push(notification)
    localStorage.setItem("notifications", JSON.stringify(existingNotifications))
  }

  const sendMessageToUser = async () => {
    if (!messageData.recipientEmail || !messageData.subject || !messageData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending the message.",
        variant: "destructive",
      })
      return
    }

    const userExists = registeredUsers.some((user) => user.email === messageData.recipientEmail)
    if (!userExists) {
      toast({
        title: "User Not Found",
        description: "The recipient email address is not registered in the system.",
        variant: "destructive",
      })
      return
    }

    setIsSendingMessage(true)

    try {
      createNotification(
        messageData.recipientEmail,
        "admin_message",
        `📧 Message from Admin: ${messageData.subject}`,
        messageData.message,
      )

      setMessageData({
        recipientEmail: "",
        subject: "",
        message: "",
      })

      setIsMessageDialogOpen(false)

      toast({
        title: "Message Sent Successfully! 📧",
        description: `Your message has been sent to ${messageData.recipientEmail}. They will receive it as a notification.`,
      })
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending the message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingMessage(false)
    }
  }

  const updatePaymentStatus = (purchaseId: number, newStatus: "not_received" | "received" | "suspended") => {
    const purchase = purchases.find((p) => p.id === purchaseId)
    if (!purchase) return

    const updatedPurchases = purchases.map((purchase) =>
      purchase.id === purchaseId ? { ...purchase, paymentStatus: newStatus } : purchase,
    )
    setPurchases(updatedPurchases)

    if (typeof window !== "undefined") {
      localStorage.setItem("purchases", JSON.stringify(updatedPurchases))
    }

    calculateUserStats(updatedPurchases)

    let notificationTitle = ""
    let notificationMessage = ""
    let notificationType = ""

    switch (newStatus) {
      case "received":
        notificationTitle = "Server Panel Ready! 🎮"
        notificationMessage = `Your payment has been received! Check your email for server panel details. Don't forget to check your spam folder for the server access information.`
        notificationType = "server_ready"
        break
      case "suspended":
        notificationTitle = "Server Suspended ⚠️"
        notificationMessage = `Your server for Order #${purchaseId} has been suspended due to monthly payment not received. Please contact support to resolve this issue and reactivate your server.`
        notificationType = "server_suspended"
        break
      case "not_received":
        notificationTitle = "Payment Pending 💳"
        notificationMessage = `We haven't received payment for Order #${purchaseId} yet. Please ensure your payment is completed to activate your server.`
        notificationType = "payment_pending"
        break
    }

    createNotification(purchase.user, notificationType, notificationTitle, notificationMessage, purchaseId)

    const statusMessages = {
      not_received: "Payment status set to Not Received - User notified",
      received: "Payment confirmed - Server panel notification sent to user",
      suspended: "Server suspended due to payment issues - User notified",
    }

    toast({
      title: "Status Updated",
      description: statusMessages[newStatus],
    })

    if (newStatus === "received") {
      // Update payment submissions to verified
      const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const updatedNotifications = allNotifications.map((notif: any) => {
        if (notif.type === "payment_submitted" && notif.message.includes(`Order #${purchaseId}`)) {
          return {
            ...notif,
            type: "payment_verified",
            title: notif.title.replace("Payment Submitted", "Payment Verified"),
          }
        }
        return notif
      })
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

      // Reload notifications
      const adminNotifications = updatedNotifications.filter((notif: any) => notif.userEmail === "admin")
      setAdminNotifications(adminNotifications)
    }
  }

  const sendPanelDetails = (purchase: Purchase) => {
    const panelLink = `https://panel.skilloraclouds.com/server/${purchase.id}`
    const userDetails = registeredUsers.find((u) => u.email === purchase.user)
    const loginMethod = userDetails?.loginMethod || purchase.loginMethod || "Website Registration"
    const actualPassword = userDetails?.password || `mc_${purchase.id}_${Math.random().toString(36).substring(7)}`

    const panelMessage = `🎮 **Thanks for choosing SkilloraClouds!**

Your Minecraft server is now ready and active!

**🔐 Server Panel Access:**
• Panel URL: [Click here to access your panel](${panelLink})
• Username: ${purchase.user}
• Password: ${actualPassword}

**📋 Your Account Details:**
• Email: ${purchase.user}
• Registration Method: ${loginMethod}
• Server Plan: ${purchase.items.map((item) => item.name).join(", ")}
• Monthly Cost: $${purchase.total}

**🎯 Getting Started:**
1. [Click here to access your server panel](${panelLink})
2. Login with your email and password above
3. Start/stop your server from the control panel
4. Upload your world files and plugins
5. Invite friends to join your server!

**⚠️ Important Notes:**
• Keep your panel credentials safe
• Your server will auto-start when you first login
• Monthly payment due on the same date each month
• Check spam folder if you don't see this email

Welcome to the SkilloraClouds family! 🚀`

    createNotification(purchase.user, "server_ready", "🎮 Your Minecraft Server is Ready!", panelMessage, purchase.id)

    toast({
      title: "Panel Details Sent Successfully! 📧",
      description: `Complete server setup guide sent to ${purchase.user} with login credentials and clickable links.`,
    })

    console.log(`📧 Enhanced Email sent to ${purchase.user}:`)
    console.log(`🔗 Panel Link: ${panelLink}`)
    console.log(`📧 Username: ${purchase.user}`)
    console.log(`🔑 Password: ${actualPassword}`)
    console.log(`📱 Login Method: ${loginMethod}`)
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("cart")
    }

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })

    router.push("/")
  }

  const deletePurchase = (purchaseId: number) => {
    setDeletingPurchase(purchaseId)

    setTimeout(() => {
      const updatedPurchases = purchases.filter((p) => p.id !== purchaseId)
      setPurchases(updatedPurchases)

      if (typeof window !== "undefined") {
        localStorage.setItem("purchases", JSON.stringify(updatedPurchases))
      }

      calculateUserStats(updatedPurchases)

      toast({
        title: "Purchase Deleted",
        description: "Purchase has been successfully deleted.",
      })

      setDeletingPurchase(null)
    }, 500)
  }

  const deleteSupportMessage = (messageId: number) => {
    setDeletingMessage(messageId)

    setTimeout(() => {
      const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const updatedNotifications = allNotifications.filter((notif: any) => notif.id !== messageId)
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

      setSupportMessages((prev) => prev.filter((msg) => msg.id !== messageId))
      setAdminNotifications((prev) => prev.filter((notif) => notif.id !== messageId))

      toast({
        title: "Message Deleted",
        description: "Support message has been successfully deleted.",
      })

      setDeletingMessage(null)
    }, 500)
  }

  const verifyPaymentSubmission = (notificationId: number) => {
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const updatedNotifications = allNotifications.map((notif: any) => {
      if (notif.id === notificationId) {
        return {
          ...notif,
          type: "payment_verified",
          title: notif.title.replace("Payment Submitted", "Payment Verified"),
          message: notif.message.replace("pending verification", "verified by admin"),
        }
      }
      return notif
    })
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

    const adminNotifications = updatedNotifications.filter((notif: any) => notif.userEmail === "admin")
    setAdminNotifications(adminNotifications)

    toast({
      title: "Payment Verified ✅",
      description: "Payment submission has been verified successfully.",
    })
  }

  const clearAllData = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("purchases", JSON.stringify([]))
    }

    setPurchases([])
    setUserStats([])

    toast({
      title: "All Data Cleared",
      description: "All purchases, revenue, and server data has been reset.",
    })
  }

  const getUserPurchaseInfo = (userEmail: string) => {
    const userPurchases = purchases.filter((p) => p.user === userEmail)
    const totalSpent = userPurchases.reduce((sum, p) => sum + Number.parseFloat(p.total), 0)
    const totalServers = userPurchases.reduce((sum, p) => sum + p.items.length, 0)

    return {
      totalPurchases: userPurchases.length,
      totalSpent: totalSpent.toFixed(2),
      totalServers,
      lastPurchase: userPurchases.length > 0 ? userPurchases[userPurchases.length - 1].date : null,
    }
  }

  const getTotalRevenue = () => {
    return purchases.reduce((total, purchase) => total + Number.parseFloat(purchase.total), 0).toFixed(2)
  }

  const getTotalServers = () => {
    return purchases.reduce((total, purchase) => total + purchase.items.length, 0)
  }

  const getUniqueCustomers = () => {
    const uniqueEmails = new Set(purchases.map((p) => p.user))
    return uniqueEmails.size
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "received":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "suspended":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-orange-400" />
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "received":
        return <Badge className="bg-green-600 text-white border-green-500">Payment Received</Badge>
      case "suspended":
        return <Badge className="bg-red-600 text-white border-red-500">Suspended</Badge>
      default:
        return <Badge className="bg-orange-600 text-white border-orange-500">Payment Not Received</Badge>
    }
  }

  const getRegistrationMethodBadge = (method: string) => {
    const methods = {
      "Website Registration": { color: "bg-blue-500", icon: Globe },
      "Website Login": { color: "bg-blue-500", icon: Globe },
      Google: { color: "bg-red-500", icon: Chrome },
      GitHub: { color: "bg-gray-800", icon: Github },
      Discord: { color: "bg-indigo-500", icon: MessageCircle },
    }

    const methodInfo = methods[method as keyof typeof methods] || methods["Website Registration"]
    const IconComponent = methodInfo.icon

    return (
      <Badge className={`${methodInfo.color} text-white`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {method}
      </Badge>
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment_received":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "server_ready":
        return <Server className="h-5 w-5 text-blue-400" />
      case "server_suspended":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "payment_submitted":
        return <CreditCard className="h-5 w-5 text-yellow-400" />
      case "payment_verified":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "support_message":
        return <MessageSquare className="h-5 w-5 text-purple-400" />
      default:
        return <Bell className="h-5 w-5 text-gray-400" />
    }
  }

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [email]: !prev[email],
    }))
  }

  const markSupportMessageAsRead = (messageId: number) => {
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const updatedNotifications = allNotifications.map((notif: any) =>
      notif.id === messageId ? { ...notif, read: true } : notif,
    )
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

    setSupportMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
  }

  // Show loading state during SSR or while checking auth
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-2 group">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="SkilloraClouds Logo"
                  width={32}
                  height={32}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                  SkilloraClouds Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-green-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/admin" className="text-white hover:text-green-400 font-semibold transition-colors">
                Admin Panel
              </Link>
              <Button
                variant="ghost"
                className="flex items-center space-x-1 text-white hover:text-green-400 hover:bg-gray-700"
                onClick={handleLogout}
              >
                <UserIcon className="h-4 w-4" />
                <span>{user.name}</span>
                <LogOut className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 mt-2">Comprehensive dashboard for managing customers and revenue.</p>
          </div>
          <div className="flex space-x-4">
            <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message to User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Send Message to User</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Send a direct message to any registered user. They will receive it as a notification.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Email</label>
                    <Select
                      value={messageData.recipientEmail}
                      onValueChange={(value) => setMessageData((prev) => ({ ...prev, recipientEmail: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select a user to message" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {registeredUsers.map((user) => (
                          <SelectItem key={user.email} value={user.email} className="text-white hover:bg-gray-600">
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <Input
                      value={messageData.subject}
                      onChange={(e) => setMessageData((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="Enter message subject"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <Textarea
                      value={messageData.message}
                      onChange={(e) => setMessageData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Type your message here..."
                      rows={4}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsMessageDialogOpen(false)}
                      className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={sendMessageToUser}
                      disabled={isSendingMessage}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSendingMessage ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" onClick={clearAllData} className="bg-red-600 hover:bg-red-700 text-white">
              Clear All Data
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <UserPlus className="h-5 w-5 mr-2 text-indigo-400" />
                Registered Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{registeredUsers.length}</p>
              <p className="text-sm text-gray-400 mt-1">Total accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <ShoppingCart className="h-5 w-5 mr-2 text-green-400" />
                Total Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{purchases.length}</p>
              <p className="text-sm text-gray-400 mt-1">Orders processed</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Server className="h-5 w-5 mr-2 text-blue-400" />
                Total Servers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{getTotalServers()}</p>
              <p className="text-sm text-gray-400 mt-1">Servers sold</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">${getTotalRevenue()}</p>
              <p className="text-sm text-gray-400 mt-1">Monthly recurring</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <MessageSquare className="h-5 w-5 mr-2 text-orange-400" />
                Support Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{supportMessages.length}</p>
              <p className="text-sm text-gray-400 mt-1">{supportMessages.filter((msg) => !msg.read).length} unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="purchases" className="space-y-6 animate-fade-in-up">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="purchases"
              className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Order Management
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              All Users
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Revenue by User
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Support Messages
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              Payment Submissions
            </TabsTrigger>
            <TabsTrigger
              value="messaging"
              className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-green-400"
            >
              User Messaging
            </TabsTrigger>
          </TabsList>

          {/* Support Messages Tab */}
          <TabsContent value="support">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Support Messages from Users
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Messages sent from the support page by users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {supportMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No support messages</h3>
                    <p className="text-gray-400">Support messages from users will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {supportMessages.map((message) => (
                      <Card
                        key={message.id}
                        className={`bg-gray-700 border-gray-600 ${!message.read ? "border-l-4 border-l-blue-500" : ""}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-2">
                              {getNotificationIcon(message.type)}
                              <h4 className="font-semibold text-white">{message.title}</h4>
                              {!message.read && <Badge className="bg-blue-600 text-white text-xs">New</Badge>}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">{new Date(message.timestamp).toLocaleString()}</p>
                              {message.senderEmail && <p className="text-sm text-gray-300">{message.senderEmail}</p>}
                            </div>
                          </div>

                          <div className="text-sm text-gray-300 whitespace-pre-wrap mb-4">{message.message}</div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                if (message.senderEmail) {
                                  setMessageData((prev) => ({
                                    ...prev,
                                    recipientEmail: message.senderEmail,
                                    subject: `Re: ${message.title.replace("📧 Support Message: ", "")}`,
                                  }))
                                  setIsMessageDialogOpen(true)
                                }
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                            {!message.read && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markSupportMessageAsRead(message.id)}
                                className="bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteSupportMessage(message.id)}
                              disabled={deletingMessage === message.id}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              {deletingMessage === message.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchases Tab with Payment Status Management */}
          <TabsContent value="purchases">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Management & Payment Status</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage customer orders and update payment status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No purchases yet</h3>
                    <p className="text-gray-400">Purchases will appear here when customers make orders.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Order ID</TableHead>
                        <TableHead className="text-gray-300">Customer</TableHead>
                        <TableHead className="text-gray-300">Login Method</TableHead>
                        <TableHead className="text-gray-300">User Password</TableHead>
                        <TableHead className="text-gray-300">Items</TableHead>
                        <TableHead className="text-gray-300">Total</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Payment Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchases.map((purchase) => {
                        const userDetails = registeredUsers.find((u) => u.email === purchase.user)
                        const loginMethod = userDetails?.loginMethod || purchase.loginMethod || "Website"
                        const userPassword = userDetails?.password || "N/A"
                        return (
                          <TableRow key={purchase.id} className="border-gray-700 hover:bg-gray-750">
                            <TableCell className="font-medium text-white">#{purchase.id}</TableCell>
                            <TableCell className="text-gray-300">{purchase.user}</TableCell>
                            <TableCell className="text-gray-300">{getRegistrationMethodBadge(loginMethod)}</TableCell>
                            <TableCell className="text-gray-300">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono">
                                  {showPasswords[purchase.user] ? userPassword : "••••••••"}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePasswordVisibility(purchase.user)}
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                                >
                                  {showPasswords[purchase.user] ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              {purchase.items.map((item, index) => (
                                <div key={index} className="text-sm text-gray-300">
                                  {item.name} Plan
                                </div>
                              ))}
                            </TableCell>
                            <TableCell className="text-gray-300">${purchase.total}/month</TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(purchase.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getPaymentStatusIcon(purchase.paymentStatus)}
                                <Select
                                  value={purchase.paymentStatus}
                                  onValueChange={(value: "not_received" | "received" | "suspended") =>
                                    updatePaymentStatus(purchase.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-700 border-gray-600">
                                    <SelectItem value="not_received" className="text-white hover:bg-gray-600">
                                      Not Received
                                    </SelectItem>
                                    <SelectItem value="received" className="text-white hover:bg-gray-600">
                                      Received
                                    </SelectItem>
                                    <SelectItem value="suspended" className="text-white hover:bg-gray-600">
                                      Suspended
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedPurchase(purchase)}
                                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => sendPanelDetails(purchase)}
                                  disabled={purchase.paymentStatus !== "received"}
                                  className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-600"
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deletePurchase(purchase.id)}
                                  disabled={deletingPurchase === purchase.id}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  {deletingPurchase === purchase.id ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <UserPlus className="h-5 w-5 mr-2" />
                  All Registered Users
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Complete list of all users who have registered on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registeredUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <UserPlus className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No users registered yet</h3>
                    <p className="text-gray-400">User registrations will appear here when people sign up.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Password</TableHead>
                        <TableHead className="text-gray-300">Login Method</TableHead>
                        <TableHead className="text-gray-300">Registration Date</TableHead>
                        <TableHead className="text-gray-300">Total Purchases</TableHead>
                        <TableHead className="text-gray-300">Total Spent</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registeredUsers.map((regUser) => {
                        const purchaseInfo = getUserPurchaseInfo(regUser.email)
                        return (
                          <TableRow key={regUser.email} className="border-gray-700 hover:bg-gray-750">
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold text-white">{regUser.name}</div>
                                <div className="text-sm text-gray-400">
                                  {regUser.firstName} {regUser.lastName}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-300">{regUser.email}</TableCell>
                            <TableCell className="text-gray-300">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono">
                                  {showPasswords[regUser.email] ? regUser.password : "••••••••"}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => togglePasswordVisibility(regUser.email)}
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                                >
                                  {showPasswords[regUser.email] ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getRegistrationMethodBadge(regUser.loginMethod || "Website Registration")}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-gray-300">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                {new Date(regUser.registeredAt).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={purchaseInfo.totalPurchases > 0 ? "default" : "secondary"}
                                className={
                                  purchaseInfo.totalPurchases > 0 ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                                }
                              >
                                {purchaseInfo.totalPurchases} orders
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`font-semibold ${purchaseInfo.totalSpent !== "0.00" ? "text-green-400" : "text-gray-500"}`}
                              >
                                ${purchaseInfo.totalSpent}
                              </span>
                              {purchaseInfo.totalSpent !== "0.00" && (
                                <span className="text-sm text-gray-500">/month</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={purchaseInfo.totalPurchases > 0 ? "default" : "outline"}
                                className={
                                  purchaseInfo.totalPurchases > 0
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-600 text-white border-gray-500"
                                }
                              >
                                {purchaseInfo.totalPurchases > 0 ? "Customer" : "Registered"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedUser(regUser)}
                                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setMessageData((prev) => ({ ...prev, recipientEmail: regUser.email }))
                                    setIsMessageDialogOpen(true)
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Revenue by Customer
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Detailed revenue breakdown for each customer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userStats.length === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No revenue data</h3>
                    <p className="text-gray-400">Revenue statistics will appear here when customers make purchases.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Customer Email</TableHead>
                        <TableHead className="text-gray-300">Total Revenue</TableHead>
                        <TableHead className="text-gray-300">Total Orders</TableHead>
                        <TableHead className="text-gray-300">Avg Order Value</TableHead>
                        <TableHead className="text-gray-300">Last Purchase</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userStats.map((stat) => (
                        <TableRow key={stat.email} className="border-gray-700 hover:bg-gray-750">
                          <TableCell className="font-medium text-white">{stat.email}</TableCell>
                          <TableCell>
                            <span className="text-lg font-bold text-green-400">${stat.totalRevenue.toFixed(2)}</span>
                            <span className="text-sm text-gray-500">/month</span>
                          </TableCell>
                          <TableCell className="text-gray-300">{stat.purchases.length}</TableCell>
                          <TableCell className="text-gray-300">
                            ${(stat.totalRevenue / stat.purchases.length).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(stat.lastPurchase).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-600 text-white">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Submissions Tab */}
          <TabsContent value="payments">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Detail Submissions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customer payment details waiting for verification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {adminNotifications.filter((n) => n.type === "payment_submitted" || n.type === "payment_verified")
                  .length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No payment submissions</h3>
                    <p className="text-gray-400">Payment detail submissions will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adminNotifications
                      .filter((n) => n.type === "payment_submitted" || n.type === "payment_verified")
                      .map((notification) => (
                        <Card key={notification.id} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-white">{notification.title}</h4>
                                <p className="text-sm text-gray-400">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {notification.type === "payment_verified" ? (
                                  <Badge className="bg-green-600 text-white">Payment Verified ✅</Badge>
                                ) : (
                                  <>
                                    <Badge className="bg-yellow-600 text-white">Pending Verification</Badge>
                                    <Button
                                      size="sm"
                                      onClick={() => verifyPaymentSubmission(notification.id)}
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Verify
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="text-sm text-gray-300 whitespace-pre-wrap">{notification.message}</div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Messaging Tab */}
          <TabsContent value="messaging">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  User Messaging System
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Send direct messages to users. They will receive them as notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Quick Message Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Send Quick Message</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Select User</label>
                      <Select
                        value={messageData.recipientEmail}
                        onValueChange={(value) => setMessageData((prev) => ({ ...prev, recipientEmail: value }))}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Choose a user to message" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {registeredUsers.map((user) => (
                            <SelectItem key={user.email} value={user.email} className="text-white hover:bg-gray-600">
                              {user.name} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <Input
                        value={messageData.subject}
                        onChange={(e) => setMessageData((prev) => ({ ...prev, subject: e.target.value }))}
                        placeholder="Enter message subject"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <Textarea
                        value={messageData.message}
                        onChange={(e) => setMessageData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Type your message here..."
                        rows={6}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <Button
                      onClick={sendMessageToUser}
                      disabled={
                        isSendingMessage || !messageData.recipientEmail || !messageData.subject || !messageData.message
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSendingMessage ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Message Templates */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Quick Message Templates</h3>
                    <div className="space-y-3">
                      <Card
                        className="bg-gray-700 border-gray-600 p-4 cursor-pointer hover:bg-gray-650 transition-colors"
                        onClick={() =>
                          setMessageData((prev) => ({
                            ...prev,
                            subject: "Welcome to SkilloraClouds!",
                            message:
                              "Thank you for joining SkilloraClouds! We're excited to have you as part of our community. If you have any questions or need assistance with your Minecraft servers, feel free to reach out to us anytime.",
                          }))
                        }
                      >
                        <h4 className="font-medium text-white">Welcome Message</h4>
                        <p className="text-sm text-gray-400">Send a welcome message to new users</p>
                      </Card>

                      <Card
                        className="bg-gray-700 border-gray-600 p-4 cursor-pointer hover:bg-gray-650 transition-colors"
                        onClick={() =>
                          setMessageData((prev) => ({
                            ...prev,
                            subject: "Server Maintenance Notice",
                            message:
                              "We will be performing scheduled maintenance on our servers. Your Minecraft server may experience brief downtime during this period. We apologize for any inconvenience and appreciate your patience.",
                          }))
                        }
                      >
                        <h4 className="font-medium text-white">Maintenance Notice</h4>
                        <p className="text-sm text-gray-400">Notify users about server maintenance</p>
                      </Card>

                      <Card
                        className="bg-gray-700 border-gray-600 p-4 cursor-pointer hover:bg-gray-650 transition-colors"
                        onClick={() =>
                          setMessageData((prev) => ({
                            ...prev,
                            subject: "Payment Reminder",
                            message:
                              "This is a friendly reminder that your monthly server payment is due soon. Please ensure your payment is completed to avoid any service interruption. Thank you for choosing SkilloraClouds!",
                          }))
                        }
                      >
                        <h4 className="font-medium text-white">Payment Reminder</h4>
                        <p className="text-sm text-gray-400">Remind users about upcoming payments</p>
                      </Card>

                      <Card
                        className="bg-gray-700 border-gray-600 p-4 cursor-pointer hover:bg-gray-650 transition-colors"
                        onClick={() =>
                          setMessageData((prev) => ({
                            ...prev,
                            subject: "Support Response",
                            message:
                              "Thank you for contacting our support team. We have received your inquiry and our team is working on resolving your issue. We will get back to you as soon as possible with a solution.",
                          }))
                        }
                      >
                        <h4 className="font-medium text-white">Support Response</h4>
                        <p className="text-sm text-gray-400">Respond to support inquiries</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">User Details - {selectedUser.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete information for {selectedUser.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Personal Information:</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-300">Full Name:</span>{" "}
                          <span className="text-white">{selectedUser.name}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">First Name:</span>{" "}
                          <span className="text-white">{selectedUser.firstName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Last Name:</span>{" "}
                          <span className="text-white">{selectedUser.lastName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Email:</span>{" "}
                          <span className="text-white">{selectedUser.email}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Password:</span>{" "}
                          <span className="text-white font-mono">{selectedUser.password}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Registration Date:</span>{" "}
                          <span className="text-white">{new Date(selectedUser.registeredAt).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Login Method:</span>{" "}
                          {getRegistrationMethodBadge(selectedUser.loginMethod || "Website Registration")}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Purchase Summary:</h4>
                      <div className="space-y-2 text-sm">
                        {(() => {
                          const info = getUserPurchaseInfo(selectedUser.email)
                          return (
                            <>
                              <div>
                                <span className="font-medium text-gray-300">Total Orders:</span>{" "}
                                <span className="text-white">{info.totalPurchases}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Total Spent:</span>{" "}
                                <span className="text-white">${info.totalSpent}/month</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Total Servers:</span>{" "}
                                <span className="text-white">{info.totalServers}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Last Purchase:</span>{" "}
                                <span className="text-white">
                                  {info.lastPurchase ? new Date(info.lastPurchase).toLocaleDateString() : "Never"}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">Customer Status:</span>
                                <Badge
                                  variant={info.totalPurchases > 0 ? "default" : "outline"}
                                  className={`ml-2 ${info.totalPurchases > 0 ? "bg-green-600 text-white" : "bg-gray-600 text-white border-gray-500"}`}
                                >
                                  {info.totalPurchases > 0 ? "Paying Customer" : "Registered Only"}
                                </Badge>
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-6">
                  <Button
                    onClick={() => {
                      setMessageData((prev) => ({ ...prev, recipientEmail: selectedUser.email }))
                      setSelectedUser(null)
                      setIsMessageDialogOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedUser(null)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Purchase Details Modal */}
        {selectedPurchase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Purchase Details - #{selectedPurchase.id}</CardTitle>
                <CardDescription className="text-gray-400">Customer: {selectedPurchase.user}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Items Purchased:</h4>
                    {selectedPurchase.items.map((item, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded">
                        <div className="flex justify-between">
                          <span className="font-medium text-white">{item.name} Plan</span>
                          <span className="text-white">${item.price}/month</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {item.players} • {item.ram} • {item.storage}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-white">${selectedPurchase.total}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Payment Method:</span>
                    <span className="capitalize text-white">{selectedPurchase.paymentMethod} QR Code</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Payment Status:</span>
                    {getPaymentStatusBadge(selectedPurchase.paymentStatus)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Purchase Date:</span>
                    <span className="text-white">{new Date(selectedPurchase.date).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-6">
                  <Button
                    onClick={() => sendPanelDetails(selectedPurchase)}
                    disabled={selectedPurchase.paymentStatus !== "received"}
                    className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-600"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Panel Details
                  </Button>
                  <Button
                    onClick={() => {
                      setMessageData((prev) => ({ ...prev, recipientEmail: selectedPurchase.user }))
                      setSelectedPurchase(null)
                      setIsMessageDialogOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Customer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPurchase(null)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
