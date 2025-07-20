"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import {
    Database,
    Zap,
    ArrowRight,
} from "lucide-react"
import Link from "next/link"

export interface DatabaseStatus {
    status: string
    users: number
    workspaces: number
}

export default function Component() {




    const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchDbStatus = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/test-db")
                const data = await response.json()
                setDbStatus(data)
            } catch (error) {
                console.error("Failed to fetch database status:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchDbStatus()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                <div className="flex items-center justify-center">
                    <Database className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-slate-900 dark:text-white">ETL_Engine</span>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            <Badge variant="secondary" className="px-4 py-2">
                                <Zap className="w-4 h-4 mr-2" />
                                Powerful ETL Processing
                            </Badge>

                            <div className="space-y-4 max-w-4xl">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                    Transform Your Data with
                                    <span className="text-blue-600 block">ETL_Engine</span>
                                </h1>
                                <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
                                    Extract, Transform, and Load your data seamlessly across multiple sources. Built for scale, designed
                                    for simplicity, engineered for performance.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/signup" passHref>
                                    <Button size="lg" className="px-8 py-3">
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Stats Section */}
                            <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-800">
                                <div className="container px-4 md:px-6 mx-auto">
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold mb-2">Live System Status</h2>
                                        <p className="text-slate-600 dark:text-slate-300">Real-time data from our ETL_Engine</p>
                                    </div>
                                    <div className="grid gap-8 md:grid-cols-3 text-center">
                                        <div className="space-y-2">
                                            <div className="text-4xl font-bold text-blue-600">
                                                {isLoading ? "..." : dbStatus?.status === "connected" ? "✓" : "✗"}
                                            </div>
                                            <div className="text-slate-600 dark:text-slate-300">Database Status</div>
                                            <div className="text-sm text-slate-500">{isLoading ? "Loading..." : dbStatus?.status || "Unknown"}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-4xl font-bold text-blue-600">{isLoading ? "..." : dbStatus?.users || 0}</div>
                                            <div className="text-slate-600 dark:text-slate-300">Active Users</div>
                                            <div className="text-sm text-slate-500">Currently registered</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-4xl font-bold text-blue-600">{isLoading ? "..." : dbStatus?.workspaces || 0}</div>
                                            <div className="text-slate-600 dark:text-slate-300">Workspaces</div>
                                            <div className="text-sm text-slate-500">Active environments</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-slate-900">
                <p className="text-xs text-slate-600 dark:text-slate-400">© 2024 ETL_Engine. All rights reserved.</p>
            </footer>
        </div>
    )
}

