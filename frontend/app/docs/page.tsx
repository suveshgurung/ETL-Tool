import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Search, Book, Code, Zap, Database, FileText, ExternalLink, Copy } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
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
          <Link href="/docs" className="text-sm font-medium text-blue-600">
            Documentation
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contact
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

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-50 p-6 hidden lg:block">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search docs..." className="pl-10" />
            </div>

            <nav className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Getting Started</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="#introduction" className="text-gray-600 hover:text-blue-600">
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link href="#quick-start" className="text-gray-600 hover:text-blue-600">
                      Quick Start
                    </Link>
                  </li>
                  <li>
                    <Link href="#authentication" className="text-gray-600 hover:text-blue-600">
                      Authentication
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">API Reference</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="#jobs" className="text-gray-600 hover:text-blue-600">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="#connections" className="text-gray-600 hover:text-blue-600">
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link href="#transformations" className="text-gray-600 hover:text-blue-600">
                      Transformations
                    </Link>
                  </li>
                  <li>
                    <Link href="#webhooks" className="text-gray-600 hover:text-blue-600">
                      Webhooks
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Data Sources</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="#mongodb" className="text-gray-600 hover:text-blue-600">
                      MongoDB
                    </Link>
                  </li>
                  <li>
                    <Link href="#mysql" className="text-gray-600 hover:text-blue-600">
                      MySQL
                    </Link>
                  </li>
                  <li>
                    <Link href="#postgresql" className="text-gray-600 hover:text-blue-600">
                      PostgreSQL
                    </Link>
                  </li>
                  <li>
                    <Link href="#csv" className="text-gray-600 hover:text-blue-600">
                      CSV Files
                    </Link>
                  </li>
                  <li>
                    <Link href="#json" className="text-gray-600 hover:text-blue-600">
                      JSON Files
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Guides</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="#best-practices" className="text-gray-600 hover:text-blue-600">
                      Best Practices
                    </Link>
                  </li>
                  <li>
                    <Link href="#troubleshooting" className="text-gray-600 hover:text-blue-600">
                      Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link href="#examples" className="text-gray-600 hover:text-blue-600">
                      Examples
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Documentation</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to integrate and use DataFlow's ETL services
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Book className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Learn the basics and create your first ETL job</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Code className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>Complete API documentation with examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View API Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Zap className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Examples</CardTitle>
                  <CardDescription>Real-world examples and use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Browse Examples
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Documentation Content */}
            <Tabs defaultValue="getting-started" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="api-reference">API Reference</TabsTrigger>
                <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>

              {/* Getting Started Tab */}
              <TabsContent value="getting-started" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle id="introduction">Introduction</CardTitle>
                    <CardDescription>Welcome to DataFlow's ETL service documentation</CardDescription>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      DataFlow is a powerful ETL (Extract, Transform, Load) service that enables seamless data
                      transformation between different data formats including MongoDB, MySQL, PostgreSQL, CSV, and JSON.
                    </p>
                    <p>
                      Our service provides a simple REST API and web interface to create, manage, and monitor your data
                      transformation jobs with enterprise-grade security and performance.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle id="quick-start">Quick Start</CardTitle>
                    <CardDescription>Get up and running in minutes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">1. Create an Account</h4>
                      <p className="text-sm text-gray-600">
                        Sign up for a free DataFlow account to get started with your ETL transformations.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">2. Get Your API Key</h4>
                      <p className="text-sm text-gray-600">
                        Navigate to your dashboard settings to generate your API key for programmatic access.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">3. Create Your First Job</h4>
                      <p className="text-sm text-gray-600">
                        Use our web interface or API to create your first ETL job and start transforming data.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle id="authentication">Authentication</CardTitle>
                    <CardDescription>Secure your API requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      All API requests must be authenticated using your API key in the Authorization header:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <code className="text-sm">Authorization: Bearer your_api_key_here</code>
                      <Button size="sm" variant="ghost" className="ml-2">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* API Reference Tab */}
              <TabsContent value="api-reference" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle id="jobs">Jobs API</CardTitle>
                    <CardDescription>Manage your ETL jobs programmatically</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">POST</Badge>
                        <code className="text-sm">/api/v1/jobs</code>
                      </div>
                      <p className="text-sm text-gray-600">Create a new ETL job</p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          {`{
  "name": "MongoDB to PostgreSQL Migration",
  "source": {
    "type": "mongodb",
    "connection": {
      "host": "localhost",
      "port": 27017,
      "database": "source_db",
      "collection": "users"
    }
  },
  "target": {
    "type": "postgresql", 
    "connection": {
      "host": "localhost",
      "port": 5432,
      "database": "target_db",
      "table": "users"
    }
  },
  "transformations": [
    {
      "field_mapping": {
        "_id": "id",
        "email_address": "email"
      }
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/api/v1/jobs</code>
                      </div>
                      <p className="text-sm text-gray-600">List all ETL jobs</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/api/v1/jobs/{"{job_id}"}</code>
                      </div>
                      <p className="text-sm text-gray-600">Get job details and status</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">POST</Badge>
                        <code className="text-sm">/api/v1/jobs/{"{job_id}"}/run</code>
                      </div>
                      <p className="text-sm text-gray-600">Execute a job</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Sources Tab */}
              <TabsContent value="data-sources" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <Database className="w-8 h-8 text-green-600 mb-2" />
                      <CardTitle id="mongodb">MongoDB</CardTitle>
                      <CardDescription>Connect to MongoDB databases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="text-sm">
                          {`{
  "type": "mongodb",
  "connection": {
    "host": "localhost",
    "port": 27017,
    "database": "mydb",
    "collection": "users",
    "username": "user",
    "password": "pass"
  }
}`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Database className="w-8 h-8 text-blue-600 mb-2" />
                      <CardTitle id="mysql">MySQL</CardTitle>
                      <CardDescription>Connect to MySQL databases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="text-sm">
                          {`{
  "type": "mysql",
  "connection": {
    "host": "localhost",
    "port": 3306,
    "database": "mydb",
    "table": "users",
    "username": "user",
    "password": "pass"
  }
}`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Database className="w-8 h-8 text-purple-600 mb-2" />
                      <CardTitle id="postgresql">PostgreSQL</CardTitle>
                      <CardDescription>Connect to PostgreSQL databases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="text-sm">
                          {`{
  "type": "postgresql",
  "connection": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb",
    "table": "users",
    "username": "user",
    "password": "pass"
  }
}`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <FileText className="w-8 h-8 text-orange-600 mb-2" />
                      <CardTitle id="csv">CSV Files</CardTitle>
                      <CardDescription>Process CSV files</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <pre className="text-sm">
                          {`{
  "type": "csv",
  "connection": {
    "file_path": "/path/to/file.csv",
    "delimiter": ",",
    "header": true,
    "encoding": "utf-8"
  }
}`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Examples Tab */}
              <TabsContent value="examples" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Use Cases</CardTitle>
                    <CardDescription>Real-world examples of ETL transformations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">MongoDB to PostgreSQL Migration</h4>
                      <p className="text-sm text-gray-600">
                        Migrate user data from MongoDB to PostgreSQL with field mapping and data type conversion.
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Example
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">CSV to MySQL Import</h4>
                      <p className="text-sm text-gray-600">
                        Import large CSV files into MySQL with data validation and error handling.
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Example
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Real-time JSON Processing</h4>
                      <p className="text-sm text-gray-600">
                        Process streaming JSON data and load into MongoDB with real-time transformations.
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Example
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
