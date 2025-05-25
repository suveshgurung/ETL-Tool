import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Database, FileText, Braces, Zap, Shield, Clock, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function ETLServiceWebsite() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <RefreshCw className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">DataFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>
        <div className="ml-6 flex gap-2">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <Badge variant="secondary" className="px-4 py-1">
                  ETL Made Simple
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Transform Your Data
                  <span className="text-blue-600"> Seamlessly</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Extract, Transform, and Load data between MongoDB, CSV, JSON, MySQL, and PostgreSQL with our powerful
                  ETL service. No coding required.
                </p>
              </div>

              {/* Data Type Icons */}
              <div className="flex flex-wrap justify-center gap-6 py-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">MongoDB</span>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 mt-6" />
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">CSV</span>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 mt-6" />
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Braces className="w-8 h-8 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium">JSON</span>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 mt-6" />
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">MySQL</span>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 mt-6" />
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">PostgreSQL</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Simple three-step process to transform your data
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold">Extract</h3>
                <p className="text-gray-600">
                  Connect to your data source and extract the information you need from MongoDB, MySQL, PostgreSQL, CSV,
                  or JSON files.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold">Transform</h3>
                <p className="text-gray-600">
                  Apply data transformations, cleaning, and mapping rules to ensure your data is in the right format for
                  your destination.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold">Load</h3>
                <p className="text-gray-600">
                  Load the transformed data into your target destination, whether it's a database, file format, or data
                  warehouse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Everything you need for seamless data transformation
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-yellow-600 mb-2" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Process millions of records in minutes with our optimized ETL engine
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle>Secure & Reliable</CardTitle>
                  <CardDescription>
                    Enterprise-grade security with end-to-end encryption and data validation
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>Real-time Processing</CardTitle>
                  <CardDescription>
                    Schedule automated ETL jobs or process data in real-time as it arrives
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <RefreshCw className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Auto-mapping</CardTitle>
                  <CardDescription>
                    Intelligent field mapping and data type conversion between different formats
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle>Data Validation</CardTitle>
                  <CardDescription>
                    Built-in data quality checks and validation rules to ensure data integrity
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Database className="w-8 h-8 text-indigo-600 mb-2" />
                  <CardTitle>Multi-format Support</CardTitle>
                  <CardDescription>
                    Support for MongoDB, CSV, JSON, MySQL, and PostgreSQL with more coming soon
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Supported Conversions */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Supported Conversions</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Convert between any of our supported data formats
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  from: "MongoDB",
                  to: "PostgreSQL",
                  icon1: Database,
                  icon2: Database,
                  color1: "text-green-600",
                  color2: "text-purple-600",
                },
                {
                  from: "CSV",
                  to: "MySQL",
                  icon1: FileText,
                  icon2: Database,
                  color1: "text-orange-600",
                  color2: "text-blue-600",
                },
                {
                  from: "JSON",
                  to: "MongoDB",
                  icon1: Braces,
                  icon2: Database,
                  color1: "text-yellow-600",
                  color2: "text-green-600",
                },
                {
                  from: "MySQL",
                  to: "CSV",
                  icon1: Database,
                  icon2: FileText,
                  color1: "text-blue-600",
                  color2: "text-orange-600",
                },
                {
                  from: "PostgreSQL",
                  to: "JSON",
                  icon1: Database,
                  icon2: Braces,
                  color1: "text-purple-600",
                  color2: "text-yellow-600",
                },
                {
                  from: "CSV",
                  to: "PostgreSQL",
                  icon1: FileText,
                  icon2: Database,
                  color1: "text-orange-600",
                  color2: "text-purple-600",
                },
              ].map((conversion, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="flex items-center justify-between p-0">
                    <div className="flex items-center space-x-2">
                      <conversion.icon1 className={`w-6 h-6 ${conversion.color1}`} />
                      <span className="font-medium">{conversion.from}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center space-x-2">
                      <conversion.icon2 className={`w-6 h-6 ${conversion.color2}`} />
                      <span className="font-medium">{conversion.to}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Pricing</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Choose the plan that fits your data transformation needs
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for small projects</CardDescription>
                  <div className="text-3xl font-bold">
                    $29<span className="text-sm font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Up to 1GB data transfer
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />5 ETL jobs per month
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Email support
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="text-3xl font-bold">
                    $99<span className="text-sm font-normal">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Up to 10GB data transfer
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Unlimited ETL jobs
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Real-time processing
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="text-3xl font-bold">Custom</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Unlimited data transfer
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      24/7 dedicated support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      SLA guarantee
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Transform Your Data?
              </h2>
              <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                Join thousands of companies using DataFlow to streamline their data operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50"
      >
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-gray-900">DataFlow</span>
        </div>
        <p className="text-xs text-gray-600 sm:ml-4">© 2024 DataFlow. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Documentation
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}
