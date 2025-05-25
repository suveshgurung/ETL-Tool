import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Database, FileText, Braces, ArrowRight, Play, Save, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NewJobPage() {
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
          <Link href="/dashboard/jobs" className="text-sm font-medium hover:text-blue-600 transition-colors">
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New ETL Job</h1>
            <p className="text-gray-600">Configure your data transformation pipeline</p>
          </div>

          <Tabs defaultValue="source" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="source">1. Source</TabsTrigger>
              <TabsTrigger value="target">2. Target</TabsTrigger>
              <TabsTrigger value="transform">3. Transform</TabsTrigger>
              <TabsTrigger value="schedule">4. Schedule</TabsTrigger>
            </TabsList>

            {/* Source Configuration */}
            <TabsContent value="source" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Source Configuration</CardTitle>
                  <CardDescription>Select and configure your data source</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="source-type">Source Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mongodb">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-green-600" />
                            MongoDB
                          </div>
                        </SelectItem>
                        <SelectItem value="mysql">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-blue-600" />
                            MySQL
                          </div>
                        </SelectItem>
                        <SelectItem value="postgresql">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-purple-600" />
                            PostgreSQL
                          </div>
                        </SelectItem>
                        <SelectItem value="csv">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-orange-600" />
                            CSV File
                          </div>
                        </SelectItem>
                        <SelectItem value="json">
                          <div className="flex items-center">
                            <Braces className="w-4 h-4 mr-2 text-yellow-600" />
                            JSON File
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="host">Host</Label>
                      <Input id="host" placeholder="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input id="port" placeholder="5432" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="database">Database</Label>
                      <Input id="database" placeholder="my_database" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collection">Collection/Table</Label>
                      <Input id="collection" placeholder="users" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="password" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="query">Query/Filter (Optional)</Label>
                    <Textarea id="query" placeholder="SELECT * FROM users WHERE created_at > '2024-01-01'" rows={3} />
                  </div>

                  <Button className="w-full">Test Connection</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Target Configuration */}
            <TabsContent value="target" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Target Configuration</CardTitle>
                  <CardDescription>Configure where your transformed data will be loaded</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="target-type">Target Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mongodb">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-green-600" />
                            MongoDB
                          </div>
                        </SelectItem>
                        <SelectItem value="mysql">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-blue-600" />
                            MySQL
                          </div>
                        </SelectItem>
                        <SelectItem value="postgresql">
                          <div className="flex items-center">
                            <Database className="w-4 h-4 mr-2 text-purple-600" />
                            PostgreSQL
                          </div>
                        </SelectItem>
                        <SelectItem value="csv">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-orange-600" />
                            CSV File
                          </div>
                        </SelectItem>
                        <SelectItem value="json">
                          <div className="flex items-center">
                            <Braces className="w-4 h-4 mr-2 text-yellow-600" />
                            JSON File
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="target-host">Host</Label>
                      <Input id="target-host" placeholder="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-port">Port</Label>
                      <Input id="target-port" placeholder="3306" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="target-database">Database</Label>
                      <Input id="target-database" placeholder="target_database" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-collection">Collection/Table</Label>
                      <Input id="target-collection" placeholder="migrated_users" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="target-username">Username</Label>
                      <Input id="target-username" placeholder="username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-password">Password</Label>
                      <Input id="target-password" type="password" placeholder="password" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="write-mode">Write Mode</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select write mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="insert">Insert (Create new records)</SelectItem>
                        <SelectItem value="upsert">Upsert (Insert or update)</SelectItem>
                        <SelectItem value="replace">Replace (Overwrite existing)</SelectItem>
                        <SelectItem value="append">Append (Add to existing)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Test Connection</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transform Configuration */}
            <TabsContent value="transform" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Transformation Rules</CardTitle>
                  <CardDescription>Configure how your data should be transformed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="job-name">Job Name</Label>
                    <Input id="job-name" placeholder="MongoDB to PostgreSQL Migration" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe what this ETL job does..." rows={3} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Field Mapping</h4>
                    <div className="space-y-3">
                      <div className="grid gap-4 md:grid-cols-3 items-center">
                        <Input placeholder="Source field" />
                        <ArrowRight className="w-4 h-4 mx-auto" />
                        <Input placeholder="Target field" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-3 items-center">
                        <Input placeholder="user_id" />
                        <ArrowRight className="w-4 h-4 mx-auto" />
                        <Input placeholder="id" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-3 items-center">
                        <Input placeholder="email_address" />
                        <ArrowRight className="w-4 h-4 mx-auto" />
                        <Input placeholder="email" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Add Field Mapping
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <Input id="batch-size" placeholder="1000" type="number" />
                    <p className="text-sm text-gray-600">Number of records to process at once</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Configuration */}
            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Scheduling</CardTitle>
                  <CardDescription>Configure when and how often this job should run</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-type">Schedule Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual (Run on demand)</SelectItem>
                        <SelectItem value="once">One-time execution</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="cron">Custom (Cron expression)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date (Optional)</Label>
                      <Input id="end-date" type="datetime-local" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cron-expression">Cron Expression</Label>
                    <Input id="cron-expression" placeholder="0 0 * * *" />
                    <p className="text-sm text-gray-600">Advanced scheduling using cron syntax</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Settings</h4>
                    <div className="space-y-2">
                      <Label htmlFor="notification-email">Email Notifications</Label>
                      <Input id="notification-email" placeholder="admin@company.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notify On</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Job completion</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Job failure</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Job warnings</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Job
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Save & Run Now
                    </Button>
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
