import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  FileText,
  Braces,
  Plus,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  Server,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const recentJobs = [
    {
      id: "job-001",
      name: "MongoDB to PostgreSQL Migration",
      source: "MongoDB",
      target: "PostgreSQL",
      status: "completed",
      progress: 100,
      recordsProcessed: "1.2M",
      duration: "45m 32s",
    },
    {
      id: "job-002",
      name: "CSV to MySQL Import",
      source: "CSV",
      target: "MySQL",
      status: "running",
      progress: 67,
      recordsProcessed: "850K",
      duration: "12m 15s",
    },
    {
      id: "job-003",
      name: "JSON to MongoDB Sync",
      source: "JSON",
      target: "MongoDB",
      status: "failed",
      progress: 23,
      recordsProcessed: "120K",
      duration: "5m 42s",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "running":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link href="/" className="flex items-center justify-center">
          <Database className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">DataFlow</span>
        </Link>
        <nav className="ml-8 flex gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-blue-600">
            Dashboard
          </Link>
          <Link href="/dashboard/jobs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Jobs
          </Link>
          <Link href="/dashboard/settings" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button asChild>
            <Link href="/dashboard/jobs/new">
              <Plus className="w-4 h-4 mr-2" />
              New ETL Job
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Monitor your ETL jobs and data transformations</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2GB</div>
                <p className="text-xs text-muted-foreground">+8.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 running, 1 scheduled</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent ETL Jobs</CardTitle>
              <CardDescription>Your latest data transformation jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <h4 className="font-medium">{job.name}</h4>
                        <p className="text-sm text-gray-600">
                          {job.source} → {job.target}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{job.recordsProcessed} records</p>
                        <p className="text-xs text-gray-600">{job.duration}</p>
                      </div>

                      <div className="w-24">
                        <Progress value={job.progress} className="h-2" />
                        <p className="text-xs text-gray-600 mt-1">{job.progress}%</p>
                      </div>

                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>

                      <div className="flex space-x-2">
                        {job.status === "running" ? (
                          <Button size="sm" variant="outline">
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/jobs">View All Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Common ETL operations to get you started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dashboard/jobs/new?template=mongodb-postgres">
                    <Database className="w-4 h-4 mr-2" />
                    MongoDB to PostgreSQL
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dashboard/jobs/new?template=csv-mysql">
                    <FileText className="w-4 h-4 mr-2" />
                    CSV to MySQL
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/dashboard/jobs/new?template=json-mongodb">
                    <Braces className="w-4 h-4 mr-2" />
                    JSON to MongoDB
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system performance and health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response Time</span>
                  <span className="text-sm font-medium text-green-600">125ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Queue Status</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Centers</span>
                  <span className="text-sm font-medium text-green-600">3 Active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
