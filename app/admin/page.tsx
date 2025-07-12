"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Package,
  Search,
  Download,
  RefreshCw,
  User,
  CheckCircle,
  Clock,
  LogOut,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourierDetailsModal } from "@/components/courier-details-modal"
import { emailService, type OrderEmailData, type StatusUpdateEmailData, type CourierDetails } from "@/lib/email-service"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Order {
  id: string
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  totalAmount: number
  status: "pending" | "in-progress" | "transit" | "completed" | "cancelled"
  orderDate: string
  estimatedDelivery: string
  courierDetails?: CourierDetails
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "cortez_admin", password: "Cortez@2025" })
  const [loginError, setLoginError] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [courierModalOpen, setCourierModalOpen] = useState(false)
  const [selectedOrderForCourier, setSelectedOrderForCourier] = useState<Order | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ [key: string]: "sending" | "sent" | "failed" }>({})

  // Product management state
  const [products, setProducts] = useState<any[]>([])
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [productLoading, setProductLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")

  // Mock admin credentials (in real app, this would be handled by backend authentication)
  const ADMIN_CREDENTIALS = {
    username: "cortez_admin",
    password: "Cortez@2025",
  }

  
    useEffect(() => {
      const fetchOrders = async () => {
        setIsLoading(true)
        try {
          const res = await fetch("/api/orders")
          const data = await res.json()
          setOrders(data)
          setFilteredOrders(data)
        } catch (error) {
          console.error("Failed to load orders", error)
        } finally {
          setIsLoading(false)
        }
      }

      if (isLoggedIn) {
        fetchOrders()
      }
    }, [isLoggedIn])

  // Fetch products
  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts()
    }
  }, [isLoggedIn])

  const fetchProducts = async () => {
    setProductLoading(true)
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to load products", error)
    } finally {
      setProductLoading(false)
    }
  }


  useEffect(() => {
    let filtered = orders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.phone.includes(searchTerm),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, statusFilter, orders])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (loginForm.username === ADMIN_CREDENTIALS.username && loginForm.password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true)
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginForm({ username: "", password: "" })
    setOrders([])
    setFilteredOrders([])
    setSelectedOrder(null)
    setSearchTerm("")
    setStatusFilter("all")
  }

const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
  const order = orders.find((o) => o.id === orderId)
  if (!order) return

  if (newStatus === "transit") {
    handleStatusUpdateWithCourier(order, newStatus)
    return
  }

  try {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: orderId, newStatus }),
    })

    // Update local state
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    )

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
    }

    if (order && newStatus !== "pending") {
      sendStatusUpdateEmail(order, newStatus)
    }
  } catch (error) {
    console.error("Failed to update order status:", error)
    alert("Failed to update order status. Please try again.")
  }
}


  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "transit":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <Package className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <RefreshCw className="h-4 w-4" />
      case "transit":
        return <Package className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const exportOrders = () => {
    const csvContent = [
      ["Order ID", "Customer Name", "Email", "Phone", "Total Amount", "Status", "Order Date"].join(","),
      ...filteredOrders.map((order) =>
        [
          order.orderId,
          order.customerName,
          order.email,
          order.phone,
          order.totalAmount,
          order.status,
          formatDate(order.orderDate),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cortez-orders-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const sendOrderNotificationEmail = async (order: Order) => {
    setEmailStatus((prev) => ({ ...prev, [order.id]: "sending" }))

    const emailData: OrderEmailData = {
      orderId: order.orderId,
      customerName: order.customerName,
      customerEmail: order.email,
      totalAmount: order.totalAmount,
      items: order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      address: order.address,
      city: order.city,
      state: order.state,
      pincode: order.pincode,
      orderDate: order.orderDate,
    }

    const success = await emailService.sendOrderNotification(emailData)
    setEmailStatus((prev) => ({ ...prev, [order.id]: success ? "sent" : "failed" }))

    if (success) {
      alert("Order notification sent to sales team successfully!")
    } else {
      alert("Failed to send order notification. Please try again.")
    }
  }

  const handleStatusUpdateWithCourier = (order: Order, newStatus: Order["status"]) => {
    if (newStatus === "transit") {
      setSelectedOrderForCourier(order)
      setCourierModalOpen(true)
    } else {
      updateOrderStatus(order.id, newStatus)
      sendStatusUpdateEmail(order, newStatus)
    }
  }

  const sendStatusUpdateEmail = async (order: Order, newStatus: Order["status"], courierDetails?: CourierDetails) => {
    const emailData: StatusUpdateEmailData = {
      orderId: order.orderId,
      customerName: order.customerName,
      customerEmail: order.email,
      newStatus: newStatus,
      courierDetails: courierDetails,
    }

    const success = await emailService.sendStatusUpdateEmail(emailData)

    if (success) {
      alert(`Status update email sent to ${order.customerName} successfully!`)
    } else {
      alert("Failed to send status update email. Please try again.")
    }
  }

  const handleCourierDetailsSubmit = async (courierDetails: CourierDetails) => {
    if (!selectedOrderForCourier) return

    // Update order status to transit
    updateOrderStatus(selectedOrderForCourier.id, "transit")

    // Send email with courier details
    await sendStatusUpdateEmail(selectedOrderForCourier, "transit", courierDetails)

    // Update the order with courier details (in real app, save to database)
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrderForCourier.id ? { ...order, courierDetails, status: "transit" as const } : order,
      ),
    )
  }

  // Product delete handler
  async function handleDeleteProduct(id: number) {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      alert("Failed to delete product")
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-orange-600">Cortez Admin</CardTitle>
            <p className="text-gray-600">Admin Panel Access</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input
                  type="text"
                  placeholder="Enter admin username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Login to Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-orange-600">Cortez Admin Panel</h1>
            <Badge className="bg-green-100 text-green-800">Online</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={exportOrders}>
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter((o) => o.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter((o) => o.status === "in-progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.filter((o) => o.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation and Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="w-fit mx-auto">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Orders List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Orders Management</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setIsLoading(true)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-4 mt-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search by Order ID, Name, Email, or Phone"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="max-h-96 overflow-y-auto">
                      {filteredOrders.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No orders found matching your criteria</div>
                      ) : (
                        <div className="space-y-2 p-4">
                          {filteredOrders.map((order) => (
                            <div
                              key={order.id}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                                selectedOrder?.id === order.id ? "border-orange-500 bg-orange-50" : "border-gray-200"
                              }`}
                              onClick={() => setSelectedOrder(order)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900">{order.orderId}</span>
                                    <Badge className={getStatusColor(order.status)}>
                                      {getStatusIcon(order.status)}
                                      <span className="ml-1 capitalize">{order.status.replace("-", " ")}</span>
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">{order.customerName}</p>
                                  <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">{formatPrice(order.totalAmount)}</p>
                                  <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedOrder ? (
                      <div className="space-y-6">
                        {/* Order Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">Order Information</h3>
                            <Badge className={getStatusColor(selectedOrder.status)}>
                              {getStatusIcon(selectedOrder.status)}
                              <span className="ml-1 capitalize">{selectedOrder.status.replace("-", " ")}</span>
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order ID:</span>
                              <span className="font-medium">{selectedOrder.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order Date:</span>
                              <span>{formatDate(selectedOrder.orderDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Est. Delivery:</span>
                              <span>{formatDate(selectedOrder.estimatedDelivery)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="font-bold text-orange-600">{formatPrice(selectedOrder.totalAmount)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Customer Details */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">Customer Details</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{selectedOrder.customerName}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a href={`mailto:${selectedOrder.email}`} className="text-sm text-blue-600 hover:underline">
                                {selectedOrder.email}
                              </a>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <a href={`tel:${selectedOrder.phone}`} className="text-sm text-blue-600 hover:underline">
                                {selectedOrder.phone}
                              </a>
                            </div>
                            <div className="flex items-start space-x-3">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div className="text-sm">
                                <p>{selectedOrder.address}</p>
                                <p>
                                  {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">Order Items</h3>
                          <div className="space-y-2">
                            {selectedOrder.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-3 p-2 border border-gray-200 rounded">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Status Update */}
                        <div className="space-y-3">
                          <h3 className="font-semibold text-gray-900">Update Status</h3>
                          <Select
                            value={selectedOrder.status}
                            onValueChange={(value: Order["status"]) => {
                              if (value === "transit") {
                                handleStatusUpdateWithCourier(selectedOrder, value)
                              } else {
                                updateOrderStatus(selectedOrder.id, value)
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="transit">In Transit</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => sendOrderNotificationEmail(selectedOrder)}
                              disabled={emailStatus[selectedOrder.id] === "sending"}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              {emailStatus[selectedOrder.id] === "sending"
                                ? "Sending..."
                                : emailStatus[selectedOrder.id] === "sent"
                                  ? "Email Sent ✓"
                                  : "Send Order to Sales Team"}
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email Update
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Customer
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Package className="h-4 w-4 mr-2" />
                              Generate Invoice
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select an order to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Product Management</CardTitle>
                  <Button onClick={() => { setEditingProduct(null); setProductModalOpen(true) }}>
                    + Add Product
                  </Button>
                </CardHeader>
                <CardContent>
                  {productLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading products...</div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No products found</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">In Stock</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td className="px-4 py-2">
                                <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-12 h-12 object-cover rounded" />
                              </td>
                              <td className="px-4 py-2 font-medium text-gray-900">{product.name}</td>
                              <td className="px-4 py-2">₹{product.price?.toLocaleString()}</td>
                              <td className="px-4 py-2">{product.category}</td>
                              <td className="px-4 py-2">{product.in_stock ? "Yes" : "No"}</td>
                              <td className="px-4 py-2 text-right space-x-2">
                                <Button size="sm" variant="outline" onClick={() => { setEditingProduct(product); setProductModalOpen(true) }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Product Modal (scaffold) */}
        <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            {/* TODO: Add form fields here */}
            <div className="py-8 text-center text-gray-500">Product form coming soon...</div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Courier Details Modal */}
      <CourierDetailsModal
        isOpen={courierModalOpen}
        onClose={() => {
          setCourierModalOpen(false)
          setSelectedOrderForCourier(null)
        }}
        onSubmit={handleCourierDetailsSubmit}
        orderInfo={{
          orderId: selectedOrderForCourier?.orderId || "",
          customerName: selectedOrderForCourier?.customerName || "",
        }}
      />
    </div>
  )
}
