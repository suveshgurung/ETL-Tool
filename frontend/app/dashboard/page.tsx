"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Database,
    Home,
    Users,
    Workflow,
    Bell,
    User,
    LogOut,
    Plus,
    Activity,
    Server,
    Zap,
} from "lucide-react"

const menuItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
]

export interface DatabaseStatus {
    status: string
    users: number
    workspaces: number
}



export default function DashboardPage() {
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
        // Refresh every 30 seconds
        const interval = setInterval(fetchDbStatus, 30000)
        return () => clearInterval(interval)
    }, [])

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-4 py-2">
                        <Database className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold">ETL_Engine</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.title === "Dashboard"}>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                                <Server className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    {isLoading ? (
                                        <div className="text-2xl font-bold">Loading...</div>
                                    ) : (
                                        <>
                                            <div className="text-2xl font-bold capitalize">{dbStatus?.status || "Unknown"}</div>
                                            <Badge variant={dbStatus?.status === "connected" ? "default" : "destructive"}>
                                                {dbStatus?.status === "connected" ? "Online" : "Offline"}
                                            </Badge>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{isLoading ? "..." : dbStatus?.users || 0}</div>
                                <p className="text-xs text-muted-foreground">Active users in system</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Workspaces</CardTitle>
                                <Workflow className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{isLoading ? "..." : dbStatus?.workspaces || 0}</div>
                                <p className="text-xs text-muted-foreground">Active workspaces</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

