import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Users,
  Activity,
  TrendingUp,
  Server,
  AlertTriangle,
  CheckCircle,
  Search,
  Download,
  Settings,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const systemStats = [
    { label: "Total Users", value: "2,847", change: "+12%", icon: Users },
    { label: "Active Jobs", value: "156", change: "+8%", icon: Activity },
    { label: "Data Processed", value: "1.2TB", change: "+24%", icon: Database },
    { label: "System Uptime", value: "99.9%", change: "+0.1%", icon: Server },
  ]

  const recentUsers = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john@company.com",
      plan: "Professional",
      status: "active",
      joined: "2024-01-15",
      usage: "8.2GB",
    },
    {
      id: "user-002",
      name: "Jane Smith",
      email: "jane@startup.io",
      plan: "Starter",
      status: "active",
      joined: "2024-01-14",
      usage: "0.8GB",
    },
    {
      id: "user-003",
      name: "Mike Johnson",
      email: "mike@enterprise.com",
      plan: "Enterprise",
      status: "suspended",
      joined: "2024-01-10",
      usage: "45.2GB",
    },
  ]

  const systemAlerts = [
    {
      id: "alert-001",
      type: "warning",
      message: "High CPU usage on server cluster 2",
      timestamp: "2024-01-15 14:30",
      severity: "medium",
    },
    {
      id: "alert-002",
      type: "info",
      message: "Scheduled maintenance completed successfully",
      timestamp: "2024-01-15 12:00",
      severity: "low",
    },
    {
      id: "alert-003",
      type: "error",
      message: "Database connection timeout for MySQL cluster",
      timestamp: "2024-01-15 10:15",
      severity: "high",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link href="/" className="flex items-center justify-center">
          <Database className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">DataFlow Admin</span>
        </Link>
        <nav className="ml-8 flex gap-6">
          <Link href="/admin" className="text-sm font-medium text-blue-600">
            Dashboard
          </Link>
          <Link href="/admin/users" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Users
          </Link>
          <Link href="/admin/jobs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Jobs
          </Link>
          <Link href="/admin/system" className="text-sm font-medium hover:text-blue-600 transition-colors">
            System
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor and manage your DataFlow platform</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Shield className="w-4 h-4 mr-2" />
                Security Audit
              </Button>
            </div>
          </div>

          {/* System Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {systemStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="alerts">System Alerts</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Analytics</CardTitle>
                    <CardDescription>Platform usage over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Usage analytics chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Metrics</CardTitle>
                    <CardDescription>Monthly recurring revenue and growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Monthly Revenue</span>
                        <span className="text-sm font-bold">$47,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Growth Rate</span>
                        <span className="text-sm font-bold text-green-600">+18.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Churn Rate</span>
                        <span className="text-sm font-bold text-red-600">2.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">ARPU</span>
                        <span className="text-sm font-bold">$166</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current status of all system components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">API Gateway</p>
                        <p className="text-sm text-gray-600">Response time: 125ms</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Database Cluster</p>
                        <p className="text-sm text-gray-600">Load: 67%</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Job Queue</p>
                        <p className="text-sm text-gray-600">156 active jobs</p>
                      </div>
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Search users..." className="pl-10 w-64" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Plans</SelectItem>
                          <SelectItem value="starter">Starter</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">{user.plan}</p>
                            <p className="text-xs text-gray-600">Usage: {user.usage}</p>
                          </div>

                          <Badge
                            className={
                              user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {user.status}
                          </Badge>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Monitoring</CardTitle>
                  <CardDescription>Monitor all ETL jobs across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">156</p>
                      <p className="text-sm text-gray-600">Active Jobs</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">1,247</p>
                      <p className="text-sm text-gray-600">Completed Today</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-red-600">23</p>
                      <p className="text-sm text-gray-600">Failed Jobs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Recent system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {alert.type === "error" && <AlertTriangle className="w-5 h-5 text-red-600" />}
                          {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                          {alert.type === "info" && <CheckCircle className="w-5 h-5 text-blue-600" />}
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm text-gray-600">{alert.timestamp}</p>
                          </div>
                        </div>
                        <Badge
                          className={
                            alert.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
