import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, AlertTriangle, Clock, Activity, Server, Zap } from "lucide-react"
import Link from "next/link"

export default function StatusPage() {
  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.98%",
      responseTime: "125ms",
      description: "Main API endpoint for all ETL operations",
    },
    {
      name: "Job Processing Engine",
      status: "operational",
      uptime: "99.95%",
      responseTime: "N/A",
      description: "Core ETL job processing and execution",
    },
    {
      name: "Database Cluster",
      status: "operational",
      uptime: "99.99%",
      responseTime: "45ms",
      description: "Primary database infrastructure",
    },
    {
      name: "File Storage",
      status: "degraded",
      uptime: "99.85%",
      responseTime: "250ms",
      description: "File upload and storage services",
    },
    {
      name: "Notification Service",
      status: "operational",
      uptime: "99.92%",
      responseTime: "89ms",
      description: "Email and webhook notifications",
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: "99.97%",
      responseTime: "67ms",
      description: "User authentication and authorization",
    },
  ]

  const incidents = [
    {
      id: "inc-001",
      title: "Intermittent file upload delays",
      status: "investigating",
      severity: "minor",
      started: "2024-01-15 14:30 UTC",
      description: "Some users may experience slower than normal file upload speeds.",
      updates: [
        {
          time: "14:45 UTC",
          message: "We have identified the issue and are working on a fix.",
        },
        {
          time: "14:30 UTC",
          message: "We are investigating reports of slow file uploads.",
        },
      ],
    },
  ]

  const maintenances = [
    {
      id: "maint-001",
      title: "Scheduled database maintenance",
      status: "scheduled",
      severity: "maintenance",
      scheduled: "2024-01-20 02:00 UTC",
      duration: "2 hours",
      description: "Routine database maintenance to improve performance.",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "outage":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "outage":
        return "bg-red-100 text-red-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <RefreshCw className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">DataFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Documentation
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="/status" className="text-sm font-medium text-blue-600">
            Status
          </Link>
        </nav>
        <div className="ml-6 flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">All Systems Operational</h1>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Current status of DataFlow services and infrastructure
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Last updated: January 15, 2024 at 15:30 UTC</span>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overall Status */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">99.96%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">125ms</div>
                  <p className="text-xs text-muted-foreground">Average API response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <p className="text-xs text-muted-foreground">Minor issues</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jobs Processed</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Status */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Service Status</h2>
                <p className="text-gray-600 mt-2">Current operational status of all DataFlow services</p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-6 ${
                          index !== services.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(service.status)}
                          <div>
                            <h4 className="font-medium">{service.name}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">Uptime: {service.uptime}</p>
                            {service.responseTime !== "N/A" && (
                              <p className="text-xs text-gray-600">Response: {service.responseTime}</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Current Incidents */}
        {incidents.length > 0 && (
          <section className="w-full py-12">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Current Incidents</h2>
                  <p className="text-gray-600 mt-2">Active incidents and their resolution progress</p>
                </div>

                {incidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <span>{incident.title}</span>
                        </CardTitle>
                        <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                      </div>
                      <CardDescription>
                        Started: {incident.started} • Severity: {incident.severity}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{incident.description}</p>
                      <div className="space-y-3">
                        <h4 className="font-medium">Updates:</h4>
                        {incident.updates.map((update, index) => (
                          <div key={index} className="flex space-x-3 text-sm">
                            <span className="text-gray-500 w-20 flex-shrink-0">{update.time}</span>
                            <span>{update.message}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Scheduled Maintenance */}
        {maintenances.length > 0 && (
          <section className="w-full py-12 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Scheduled Maintenance</h2>
                  <p className="text-gray-600 mt-2">Upcoming maintenance windows</p>
                </div>

                {maintenances.map((maintenance) => (
                  <Card key={maintenance.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-purple-600" />
                          <span>{maintenance.title}</span>
                        </CardTitle>
                        <Badge className={getStatusColor(maintenance.status)}>{maintenance.status}</Badge>
                      </div>
                      <CardDescription>
                        Scheduled: {maintenance.scheduled} • Duration: {maintenance.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{maintenance.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Subscribe to Updates */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Updated</h2>
              <p className="text-gray-600">
                Subscribe to status updates and get notified about incidents and maintenance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button>Subscribe</Button>
              </div>
              <div className="flex justify-center space-x-4 text-sm">
                <Link href="/rss" className="text-blue-600 hover:underline">
                  RSS Feed
                </Link>
                <Link href="/api/status" className="text-blue-600 hover:underline">
                  Status API
                </Link>
                <Link href="/status/history" className="text-blue-600 hover:underline">
                  Status History
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-gray-900">DataFlow</span>
        </div>
        <p className="text-xs text-gray-600 sm:ml-4">© 2024 DataFlow. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Privacy Policy
          </Link>
          <Link href="/docs" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Documentation
          </Link>
          <Link href="/contact" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}
