import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Database,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const jobs = [
    {
      id: "job-001",
      name: "MongoDB to PostgreSQL Migration",
      source: "MongoDB",
      target: "PostgreSQL",
      status: "completed",
      created: "2024-01-15",
      lastRun: "2024-01-15 14:30",
      schedule: "One-time",
      recordsProcessed: "1.2M",
    },
    {
      id: "job-002",
      name: "CSV to MySQL Import",
      source: "CSV",
      target: "MySQL",
      status: "running",
      created: "2024-01-14",
      lastRun: "2024-01-15 15:45",
      schedule: "Daily",
      recordsProcessed: "850K",
    },
    {
      id: "job-003",
      name: "JSON to MongoDB Sync",
      source: "JSON",
      target: "MongoDB",
      status: "failed",
      created: "2024-01-13",
      lastRun: "2024-01-15 09:15",
      schedule: "Hourly",
      recordsProcessed: "120K",
    },
    {
      id: "job-004",
      name: "PostgreSQL to CSV Export",
      source: "PostgreSQL",
      target: "CSV",
      status: "scheduled",
      created: "2024-01-12",
      lastRun: "2024-01-14 22:00",
      schedule: "Weekly",
      recordsProcessed: "2.1M",
    },
    {
      id: "job-005",
      name: "MySQL to JSON Transform",
      source: "MySQL",
      target: "JSON",
      status: "paused",
      created: "2024-01-10",
      lastRun: "2024-01-13 16:20",
      schedule: "Manual",
      recordsProcessed: "450K",
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
      case "scheduled":
        return <Calendar className="w-4 h-4 text-purple-600" />
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-600" />
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
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
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
          <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard/jobs" className="text-sm font-medium text-blue-600">
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
              <h1 className="text-3xl font-bold text-gray-900">ETL Jobs</h1>
              <p className="text-gray-600">Manage your data transformation jobs</p>
            </div>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search jobs..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Source Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>{jobs.length} total jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <h4 className="font-medium">{job.name}</h4>
                        <p className="text-sm text-gray-600">
                          {job.source} → {job.target} • {job.recordsProcessed} records
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{job.schedule}</p>
                        <p className="text-xs text-gray-600">Last run: {job.lastRun}</p>
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
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
