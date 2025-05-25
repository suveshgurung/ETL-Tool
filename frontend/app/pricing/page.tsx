"use client"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  RefreshCw,
  CheckCircle,
  X,
  Zap,
  Shield,
  Headphones,
  Users,
  Database,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [dataVolume, setDataVolume] = useState([10])

  const calculatePrice = (basePrice: number) => {
    const price = isAnnual ? basePrice * 10 : basePrice
    return price
  }

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small projects and testing",
      basePrice: 29,
      features: [
        "Up to 1GB data transfer/month",
        "5 ETL jobs",
        "Basic transformations",
        "Email support",
        "Standard connectors",
        "Job scheduling",
      ],
      limitations: ["No real-time processing", "No custom transformations", "No priority support"],
      popular: false,
    },
    {
      name: "Professional",
      description: "For growing businesses and teams",
      basePrice: 99,
      features: [
        "Up to 10GB data transfer/month",
        "Unlimited ETL jobs",
        "Advanced transformations",
        "Priority email support",
        "All connectors",
        "Real-time processing",
        "Custom field mapping",
        "Webhook notifications",
        "API access",
      ],
      limitations: ["No dedicated support", "No custom integrations"],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      basePrice: 299,
      features: [
        "Unlimited data transfer",
        "Unlimited ETL jobs",
        "Custom transformations",
        "24/7 dedicated support",
        "Custom connectors",
        "Real-time processing",
        "Advanced monitoring",
        "SLA guarantee (99.9%)",
        "Custom integrations",
        "On-premise deployment",
        "SSO integration",
        "Advanced security",
      ],
      limitations: [],
      popular: false,
    },
  ]

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
          <Link href="/pricing" className="text-sm font-medium text-blue-600">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Simple, Transparent
                  <span className="text-blue-600"> Pricing</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Choose the perfect plan for your ETL needs. Start free, scale as you grow.
                </p>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${!isAnnual ? "font-medium" : "text-gray-600"}`}>Monthly</span>
                <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
                <span className={`text-sm ${isAnnual ? "font-medium" : "text-gray-600"}`}>
                  Annual
                  <Badge variant="secondary" className="ml-2">
                    Save 20%
                  </Badge>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-blue-200 shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${calculatePrice(plan.basePrice)}</span>
                      <span className="text-gray-600">/{isAnnual ? "year" : "month"}</span>
                      {isAnnual && <div className="text-sm text-green-600 mt-1">Save ${plan.basePrice * 2.4}/year</div>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{limitation}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full ${plan.popular ? "" : "variant-outline"}`} asChild>
                      <Link href="/auth/signup">{plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Calculator */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing Calculator</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-4">
                  Estimate your costs based on your data volume and usage
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Calculate Your Costs</CardTitle>
                  <CardDescription>Adjust the sliders to see pricing for your specific needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Monthly Data Volume</Label>
                      <span className="font-medium">{dataVolume[0]} GB</span>
                    </div>
                    <Slider
                      value={dataVolume}
                      onValueChange={setDataVolume}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>1 GB</span>
                      <span>100 GB</span>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-2">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-medium mb-2">Recommended Plan</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {dataVolume[0] <= 1 ? "Starter" : dataVolume[0] <= 10 ? "Professional" : "Enterprise"}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Best fit for {dataVolume[0]} GB/month</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-center">
                        <h4 className="font-medium mb-2">Monthly Cost</h4>
                        <p className="text-2xl font-bold">
                          $
                          {dataVolume[0] <= 1
                            ? 29
                            : dataVolume[0] <= 10
                              ? 99
                              : 299 + Math.floor((dataVolume[0] - 50) / 10) * 50}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Per month</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 text-center">
                        <h4 className="font-medium mb-2">Annual Savings</h4>
                        <p className="text-2xl font-bold text-green-600">
                          $
                          {dataVolume[0] <= 1
                            ? Math.floor(29 * 2.4)
                            : dataVolume[0] <= 10
                              ? Math.floor(99 * 2.4)
                              : Math.floor((299 + Math.floor((dataVolume[0] - 50) / 10) * 50) * 2.4)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">With annual billing</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button size="lg" asChild>
                      <Link href="/auth/signup">Start Free Trial</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Feature Comparison</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-4">
                Compare features across all plans to find the right fit
              </p>
            </div>

            <Tabs defaultValue="features" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Core Features</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="support">Support & SLA</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-8">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4 font-medium">Feature</th>
                            <th className="text-center p-4 font-medium">Starter</th>
                            <th className="text-center p-4 font-medium">Professional</th>
                            <th className="text-center p-4 font-medium">Enterprise</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Data Transfer", "1GB/month", "10GB/month", "Unlimited"],
                            ["ETL Jobs", "5", "Unlimited", "Unlimited"],
                            ["Real-time Processing", "❌", "✅", "✅"],
                            ["Custom Transformations", "❌", "Basic", "Advanced"],
                            ["API Access", "❌", "✅", "✅"],
                            ["Webhook Notifications", "❌", "✅", "✅"],
                            ["Job Scheduling", "✅", "✅", "✅"],
                            ["Data Validation", "Basic", "Advanced", "Enterprise"],
                          ].map((row, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-4 font-medium">{row[0]}</td>
                              <td className="p-4 text-center">{row[1]}</td>
                              <td className="p-4 text-center">{row[2]}</td>
                              <td className="p-4 text-center">{row[3]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="mt-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <Database className="w-8 h-8 text-blue-600 mb-2" />
                      <CardTitle>Databases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>✅ MongoDB</li>
                        <li>✅ MySQL</li>
                        <li>✅ PostgreSQL</li>
                        <li>✅ SQLite</li>
                        <li>🔒 Oracle (Enterprise)</li>
                        <li>🔒 SQL Server (Enterprise)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Zap className="w-8 h-8 text-yellow-600 mb-2" />
                      <CardTitle>File Formats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>✅ CSV</li>
                        <li>✅ JSON</li>
                        <li>✅ XML</li>
                        <li>✅ Excel</li>
                        <li>🔒 Parquet (Pro+)</li>
                        <li>🔒 Avro (Pro+)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                      <CardTitle>Cloud Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>🔒 AWS S3 (Pro+)</li>
                        <li>🔒 Google Cloud (Pro+)</li>
                        <li>🔒 Azure Blob (Pro+)</li>
                        <li>🔒 Snowflake (Enterprise)</li>
                        <li>🔒 BigQuery (Enterprise)</li>
                        <li>🔒 Redshift (Enterprise)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Headphones className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Email support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">48-hour response</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">99% uptime</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Professional</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Headphones className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Priority email support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">24-hour response</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">99.5% uptime</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Dedicated support team</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">4-hour response</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">99.9% SLA guarantee</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    question: "Can I change my plan at any time?",
                    answer:
                      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
                  },
                  {
                    question: "Is there a free trial available?",
                    answer:
                      "Yes, we offer a 14-day free trial for all plans. No credit card required to get started. You can explore all features and see how DataFlow fits your needs.",
                  },
                  {
                    question: "What happens if I exceed my data transfer limit?",
                    answer:
                      "If you exceed your monthly data transfer limit, we'll notify you and you can either upgrade your plan or purchase additional data transfer at $0.10 per GB.",
                  },
                  {
                    question: "Do you offer custom enterprise solutions?",
                    answer:
                      "Yes, we offer custom enterprise solutions including on-premise deployment, custom integrations, and dedicated support. Contact our sales team for more information.",
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept all major credit cards (Visa, MasterCard, American Express) and ACH transfers for enterprise customers. All payments are processed securely through Stripe.",
                  },
                  {
                    question: "Can I cancel my subscription at any time?",
                    answer:
                      "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period, and you won't be charged again.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                Start your free trial today and see how DataFlow can transform your data operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" variant="secondary" className="px-8" asChild>
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 text-white border-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
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
