"use server"

import { revalidatePath } from "next/cache"

// Mock database - In production, replace with actual database
const users: any[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    registrationMethod: "Website",
    lastLogin: new Date().toISOString(),
    plan: "Standard",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    registrationMethod: "Google",
    lastLogin: new Date().toISOString(),
    plan: "Pro",
    status: "active",
    createdAt: new Date().toISOString(),
  },
]

const orders: any[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    userEmail: "john@example.com",
    plan: "Standard",
    amount: 15.99,
    status: "completed",
    registrationMethod: "Website",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 2,
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    plan: "Pro",
    amount: 29.99,
    status: "pending",
    registrationMethod: "Google",
    createdAt: new Date().toISOString(),
  },
]

const messages: any[] = []

export async function createUser(userData: {
  name: string
  email: string
  password: string
  registrationMethod: string
}) {
  try {
    const newUser = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      registrationMethod: userData.registrationMethod,
      lastLogin: new Date().toISOString(),
      plan: "Starter",
      status: "active",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    revalidatePath("/admin")

    return { success: true, user: newUser }
  } catch (error) {
    return { success: false, error: "Failed to create user" }
  }
}

export async function loginUser(email: string, method = "Website") {
  try {
    const user = users.find((u) => u.email === email)
    if (user) {
      user.lastLogin = new Date().toISOString()
      user.registrationMethod = method
    }

    revalidatePath("/admin")
    return { success: true, user }
  } catch (error) {
    return { success: false, error: "Login failed" }
  }
}

export async function getUsers() {
  return users
}

export async function getOrders() {
  return orders
}

export async function sendMessage(formData: FormData) {
  try {
    const recipient = formData.get("recipient") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const template = formData.get("template") as string

    const newMessage = {
      id: messages.length + 1,
      recipient,
      subject,
      message,
      template,
      sentAt: new Date().toISOString(),
      status: "sent",
    }

    messages.push(newMessage)

    // Simulate email sending
    console.log("Sending email to:", recipient)
    console.log("Subject:", subject)
    console.log("Message:", message)

    revalidatePath("/admin")
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    return { success: false, error: "Failed to send message" }
  }
}

export async function sendPanelDetails(formData: FormData) {
  try {
    const userEmail = formData.get("userEmail") as string
    const userName = formData.get("userName") as string
    const plan = formData.get("plan") as string
    const registrationMethod = formData.get("registrationMethod") as string

    // Generate panel credentials
    const panelId = Math.random().toString(36).substring(2, 8)
    const panelPassword = `mc_${panelId}_${Math.random().toString(36).substring(2, 8)}`
    const panelUrl = `https://panel.skilloraclouds.com/server/${panelId}`

    const emailContent = `
🎮 Thanks for choosing SkilloraClouds!

Dear ${userName},

Your Minecraft server is now ready and active!

🔐 Server Panel Access:
• Panel URL: ${panelUrl}
• Username: ${userEmail}
• Password: ${panelPassword}

📋 Your Account Details:
• Email: ${userEmail}
• Registration Method: ${registrationMethod}
• Server Plan: ${plan}
• Monthly Cost: ${plan === "Starter" ? "$9.99" : plan === "Standard" ? "$15.99" : "$29.99"}

🚀 Getting Started:
1. Visit your panel URL above
2. Login with your credentials
3. Start/stop your server from the control panel
4. Upload your world files and plugins
5. Configure server settings as needed

📅 Important Notes:
• Keep your credentials safe and secure
• Your server will auto-renew monthly
• Contact support for any technical issues
• Join our Discord for community help

Thank you for choosing SkilloraClouds! We're here to help you create the perfect Minecraft experience.

Best regards,
The SkilloraClouds Team
    `

    const newMessage = {
      id: messages.length + 1,
      recipient: userEmail,
      subject: "🎮 Your SkilloraClouds Server is Ready!",
      message: emailContent,
      template: "panel_details",
      sentAt: new Date().toISOString(),
      status: "sent",
      panelDetails: {
        url: panelUrl,
        username: userEmail,
        password: panelPassword,
        plan: plan,
      },
    }

    messages.push(newMessage)

    // Log the panel details (in production, this would send actual email)
    console.log("Panel Details Email Sent:")
    console.log("To:", userEmail)
    console.log("Panel URL:", panelUrl)
    console.log("Username:", userEmail)
    console.log("Password:", panelPassword)

    revalidatePath("/admin")
    return {
      success: true,
      message: "Panel details sent successfully!",
      panelDetails: {
        url: panelUrl,
        username: userEmail,
        password: panelPassword,
      },
    }
  } catch (error) {
    return { success: false, error: "Failed to send panel details" }
  }
}

export async function getMessages() {
  return messages
}

export async function createOrder(orderData: {
  userName: string
  userEmail: string
  plan: string
  amount: number
  registrationMethod: string
}) {
  try {
    const newOrder = {
      id: orders.length + 1,
      userId: users.find((u) => u.email === orderData.userEmail)?.id || users.length + 1,
      userName: orderData.userName,
      userEmail: orderData.userEmail,
      plan: orderData.plan,
      amount: orderData.amount,
      status: "pending",
      registrationMethod: orderData.registrationMethod,
      createdAt: new Date().toISOString(),
    }

    orders.push(newOrder)
    revalidatePath("/admin")

    return { success: true, order: newOrder }
  } catch (error) {
    return { success: false, error: "Failed to create order" }
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      order.status = status
      revalidatePath("/admin")
      return { success: true, order }
    }
    return { success: false, error: "Order not found" }
  } catch (error) {
    return { success: false, error: "Failed to update order status" }
  }
}
