import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  ChevronLeft,
  Pause,
  Square,
  RefreshCw,
  Download,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function JobDetailPage() {
  const jobData = {
    id: "job-002",
    name: "CSV to MySQL Import",
    description: "Import customer data from CSV files into MySQL database with data validation and transformation",
    source: {
      type: "CSV",
      details: "customer_data.csv (2.3MB)",
    },
    target: {
      type: "MySQL",
      details: "production.customers",
    },
    status: "running",
    progress: 67,
    recordsProcessed: "850,000",
    totalRecords: "1,270,000",
    startTime: "2024-01-15 15:45:00",
    estimatedCompletion: "2024-01-15 16:12:00",
    duration: "12m 15s",
  }

  const logs = [
    {
      timestamp: "2024-01-15 15:45:00",
      level: "INFO",
      message: "Job started successfully",
    },
    {
      timestamp: "2024-01-15 15:45:15",
      level: "INFO",
      message: "Connected to source CSV file",
    },
    {
      timestamp: "2024-01-15 15:45:30",
      level: "INFO",
      message: "Connected to target MySQL database",
    },
    {
      timestamp: "2024-01-15 15:46:00",
      level: "INFO",
      message: "Processing batch 1-1000",
    },
    {
      timestamp: "2024-01-15 15:52:30",
      level: "WARN",
      message: "Skipped 3 invalid records in batch 45-46000",
    },
    {
      timestamp: "2024-01-15 15:57:45",
      level: "INFO",
      message: "Processing batch 850000-851000",
    },
  ]

  const metrics = [
    { label: "Records/sec", value: "1,247", trend: "+5.2%" },
    { label: "Success Rate", value: "99.7%", trend: "+0.1%" },
    { label: "Data Throughput", value: "2.3 MB/s", trend: "+12%" },
    { label: "Errors", value: "23", trend: "-2" },
  ]

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
          <Button variant="outline" asChild>
            <Link href="/dashboard/jobs">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Job Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{jobData.name}</h1>
              <p className="text-gray-600">{jobData.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={
                  jobData.status === "running"
                    ? "bg-blue-100 text-blue-800"
                    : jobData.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }
              >
                {jobData.status === "running" && <Clock className="w-3 h-3 mr-1" />}
                {jobData.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                {jobData.status === "failed" && <AlertCircle className="w-3 h-3 mr-1" />}
                {jobData.status}
              </Badge>
            </div>
          </div>

          {/* Job Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{jobData.progress}%</p>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="text-center">
                    <p className="text-lg font-semibold">{jobData.recordsProcessed}</p>
                    <p className="text-sm text-gray-600">Records Processed</p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="text-center">
                    <p className="text-lg font-semibold">{jobData.duration}</p>
                    <p className="text-sm text-gray-600">Runtime</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm">
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>
                    {jobData.recordsProcessed} / {jobData.totalRecords} records
                  </span>
                </div>
                <Progress value={jobData.progress} className="h-3" />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Started: {jobData.startTime}</span>
                  <span>ETA: {jobData.estimatedCompletion}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Source Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Type</span>
                      <Badge variant="outline">{jobData.source.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Details</span>
                      <span className="text-sm text-gray-600">{jobData.source.details}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Connected
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Target Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Type</span>
                      <Badge variant="outline">{jobData.target.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Details</span>
                      <span className="text-sm text-gray-600">{jobData.target.details}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Connected
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Real-time performance data for this job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Performance chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Job Logs</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start space-x-4 p-2 hover:bg-gray-50 rounded">
                        <span className="text-xs text-gray-500 w-32 flex-shrink-0">{log.timestamp}</span>
                        <Badge
                          variant={
                            log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "secondary" : "outline"
                          }
                          className="text-xs"
                        >
                          {log.level}
                        </Badge>
                        <span className="text-sm flex-1">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Configuration</CardTitle>
                  <CardDescription>Complete configuration details for this ETL job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      {JSON.stringify(
                        {
                          name: jobData.name,
                          source: {
                            type: "csv",
                            file_path: "/uploads/customer_data.csv",
                            delimiter: ",",
                            header: true,
                          },
                          target: {
                            type: "mysql",
                            host: "prod-mysql.company.com",
                            database: "production",
                            table: "customers",
                          },
                          transformations: [
                            {
                              field_mapping: {
                                customer_id: "id",
                                full_name: "name",
                                email_address: "email",
                              },
                            },
                          ],
                          schedule: {
                            type: "manual",
                          },
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Execution History</CardTitle>
                  <CardDescription>Previous runs of this job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        date: "2024-01-15 15:45",
                        status: "running",
                        records: "850,000",
                        duration: "12m 15s",
                      },
                      {
                        date: "2024-01-14 15:30",
                        status: "completed",
                        records: "1,270,000",
                        duration: "18m 42s",
                      },
                      {
                        date: "2024-01-13 16:15",
                        status: "completed",
                        records: "1,185,000",
                        duration: "17m 23s",
                      },
                    ].map((run, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {run.status === "running" && <Clock className="w-4 h-4 text-blue-600" />}
                          {run.status === "completed" && <CheckCircle className="w-4 h-4 text-green-600" />}
                          <div>
                            <p className="font-medium">{run.date}</p>
                            <p className="text-sm text-gray-600">
                              {run.records} records • {run.duration}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            run.status === "running" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {run.status}
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
