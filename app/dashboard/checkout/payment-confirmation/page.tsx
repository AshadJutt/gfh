"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Mail, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentConfirmationPage() {
  const [countdown, setCountdown] = useState(10)
  const [userEmail, setUserEmail] = useState<string>("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get user email for payment tracking
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setUserEmail(user.email)
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  // Check for payment status updates
  useEffect(() => {
    if (!userEmail) return

    const checkPaymentStatus = () => {
      const purchases = JSON.parse(localStorage.getItem("purchases") || "[]")
      const userPurchases = purchases.filter((p: any) => p.user === userEmail)

      // Check if any recent purchase has been marked as received
      const recentPurchase = userPurchases.find((p: any) => {
        const purchaseTime = new Date(p.date).getTime()
        const now = new Date().getTime()
        const timeDiff = now - purchaseTime
        return timeDiff < 300000 && p.paymentStatus === "received" // Within 5 minutes and received
      })

      if (recentPurchase) {
        // Show success notification
        toast({
          title: "Payment Received! 🎉",
          description:
            "Your payment has been confirmed! Check your email for server details. Don't forget to check your spam folder.",
          duration: 8000,
        })

        // Clear the interval since payment is confirmed
        clearInterval(statusCheckInterval)
      }
    }

    // Check every 5 seconds for payment status updates
    const statusCheckInterval = setInterval(checkPaymentStatus, 5000)

    return () => clearInterval(statusCheckInterval)
  }, [userEmail, toast])

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl">
        {/* Mobile-Optimized Logo */}
        <div className="text-center mb-6 sm:mb-8 animate-slide-down">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-xl sm:text-2xl font-semibold text-white">SkilloraClouds</span>
          </Link>
        </div>

        <Card className="text-center shadow-lg bg-gray-800 border-gray-700 animate-fade-in-up">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-blue-900 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 animate-spin" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-800 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-2">Payment Processing...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
            <div className="bg-blue-900 p-4 sm:p-6 rounded-lg border border-blue-700">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mr-3" />
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-200 mb-3">
                We Will Email You in 1-2 Minutes Soon!
              </h3>
              <p className="text-blue-300 mb-4 text-sm sm:text-base">
                Your payment is being processed by our team. You will receive an email with your server details and
                login credentials within the next 1-2 minutes once payment is confirmed.
              </p>
              <div className="bg-gray-800 p-3 sm:p-4 rounded border border-blue-600">
                <h4 className="font-semibold text-blue-200 mb-2 text-sm sm:text-base">Processing Status:</h4>
                <ul className="text-xs sm:text-sm text-blue-300 space-y-2 text-left">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Payment submitted successfully</span>
                  </li>
                  <li className="flex items-center">
                    <Loader2 className="h-3 w-3 text-blue-400 animate-spin mr-2 flex-shrink-0" />
                    <span>Verifying payment with our team</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-gray-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Setting up your Minecraft server</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-gray-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span>Sending server details via email</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-900 p-3 sm:p-4 rounded-lg border border-orange-700">
              <h4 className="font-semibold text-orange-200 mb-2 text-sm sm:text-base">⏰ Processing Time</h4>
              <p className="text-xs sm:text-sm text-orange-300">
                Our team manually verifies each payment to ensure security. This usually takes 1-2 minutes during
                business hours. You'll get a notification here and via notification section once confirmed!
              </p>
            </div>

            <div className="bg-green-900 p-3 sm:p-4 rounded-lg border border-green-700">
              <h4 className="font-semibold text-green-200 mb-2 text-sm sm:text-base">📧 Important: Check Your Email</h4>
              <div className="text-xs sm:text-sm text-green-300">
                <p className="mb-1">Server details will be sent to:</p>
                <p className="font-semibold break-all">{userEmail}</p>
                <p className="text-xs mt-2">Don't forget to check your notification section folder if you don't see our email!</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={goToDashboard} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Go to Dashboard
              </Button>

              <div className="text-sm text-gray-400">
                Automatically redirecting to dashboard in {countdown} seconds...
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>💡 You'll get a notification on your dashboard when payment is confirmed</p>
              <p>📞 For urgent support, contact us at support@skilloraclouds.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
