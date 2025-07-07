"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  BookMarkedIcon as MarkAsRead,
  ArrowLeft,
  ExternalLink,
  Mail,
  MessageSquare,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  email: string
  name: string
  isAdmin: boolean
}

interface Notification {
  id: number
  userEmail: string
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Load user's notifications
      const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const userNotifications = allNotifications
        .filter((notif: Notification) => notif.userEmail === parsedUser.email)
        .sort((a: Notification, b: Notification) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      setNotifications(userNotifications)
    } catch (error) {
      console.error("Error loading notifications:", error)
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [router])

  const markAsRead = (notificationId: number) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notificationId ? { ...notif, read: true } : notif,
    )
    setNotifications(updatedNotifications)

    // Update localStorage
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const updatedAllNotifications = allNotifications.map((notif: Notification) =>
      notif.id === notificationId ? { ...notif, read: true } : notif,
    )
    localStorage.setItem("notifications", JSON.stringify(updatedAllNotifications))

    toast({
      title: "Marked as Read",
      description: "Notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({ ...notif, read: true }))
    setNotifications(updatedNotifications)

    // Update localStorage
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const updatedAllNotifications = allNotifications.map((notif: Notification) =>
      notif.userEmail === user?.email ? { ...notif, read: true } : notif,
    )
    localStorage.setItem("notifications", JSON.stringify(updatedAllNotifications))

    toast({
      title: "All Marked as Read",
      description: "All notifications have been marked as read.",
    })
  }

  const deleteNotification = (notificationId: number) => {
    const updatedNotifications = notifications.filter((notif) => notif.id !== notificationId)
    setNotifications(updatedNotifications)

    // Update localStorage
    const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    const updatedAllNotifications = allNotifications.filter((notif: Notification) => notif.id !== notificationId)
    localStorage.setItem("notifications", JSON.stringify(updatedAllNotifications))

    toast({
      title: "Notification Deleted",
      description: "Notification has been removed.",
    })
  }

  const renderNotificationContent = (notification: Notification) => {
    const lines = notification.message.split("\n")

    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          // Check for URLs
          const urlRegex = /(https?:\/\/[^\s]+)/g
          const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

          if (urlRegex.test(line) || emailRegex.test(line)) {
            const parts = line.split(/(\s+)/)
            return (
              <div key={index} className="flex flex-wrap items-center gap-1">
                {parts.map((part, partIndex) => {
                  if (urlRegex.test(part)) {
                    return (
                      <a
                        key={partIndex}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 underline inline-flex items-center gap-1"
                        onClick={(e) => {
                          e.preventDefault()
                          window.open(part, "_blank", "noopener,noreferrer")
                        }}
                      >
                        {part}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )
                  } else if (emailRegex.test(part)) {
                    return (
                      <a
                        key={partIndex}
                        href={`mailto:${part}`}
                        className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = `mailto:${part}`
                        }}
                      >
                        {part}
                        <Mail className="h-3 w-3" />
                      </a>
                    )
                  } else if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={partIndex} className="text-white font-semibold">
                        {part.slice(2, -2)}
                      </strong>
                    )
                  } else {
                    return (
                      <span key={partIndex} className="text-gray-300">
                        {part}
                      </span>
                    )
                  }
                })}
              </div>
            )
          } else if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <div key={index} className="font-semibold text-white">
                {line.slice(2, -2)}
              </div>
            )
          } else if (line.trim() === "") {
            return <div key={index} className="h-2" />
          } else {
            return (
              <div key={index} className="text-gray-300">
                {line}
              </div>
            )
          }
        })}
      </div>
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment_received":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "server_suspended":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      case "panel_details":
        return <MessageSquare className="h-5 w-5 text-blue-400" />
      case "welcome":
        return <MessageSquare className="h-5 w-5 text-green-400" />
      case "server_ready":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      default:
        return <Bell className="h-5 w-5 text-blue-400" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading notifications...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-300 hover:text-green-400">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-gray-400">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <MarkAsRead className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Notifications</h3>
              <p className="text-gray-400">You don't have any notifications yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`bg-gray-800 border-gray-700 transition-all hover:bg-gray-750 ${
                  !notification.read ? "ring-2 ring-green-500/20 bg-green-900/10" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-lg text-white">{notification.title}</CardTitle>
                          {!notification.read && <Badge className="bg-green-600 text-white">New</Badge>}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(notification.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">{renderNotificationContent(notification)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
