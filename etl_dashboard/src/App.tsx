"use client"

import { useState } from "react"
import {
  Search,
  Users,
  BarChart3,
  BookOpen,
  Home,
  Settings,
  TrendingUp,
  FileText,
  Calendar,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, XAxis, YAxis, LineChart, Line, Bar, BarChart } from "recharts"

// Mock data
const facultyData = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    position: "Professor",
    department: "Computer Science",
    school: "Engineering",
    researchAreas: ["Machine Learning", "Artificial Intelligence", "Data Mining"],
    email: "s.chen@university.edu",
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    position: "Associate Professor",
    department: "Mathematics",
    school: "Sciences",
    researchAreas: ["Numerical Analysis", "Computational Mathematics", "Optimization"],
    email: "m.rodriguez@university.edu",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    position: "Assistant Professor",
    department: "Computer Science",
    school: "Engineering",
    researchAreas: ["Machine Learning", "Computer Vision", "Deep Learning"],
    email: "e.watson@university.edu",
  },
  {
    id: 4,
    name: "Dr. James Liu",
    position: "Lecturer",
    department: "Statistics",
    school: "Sciences",
    researchAreas: ["Statistical Learning", "Bayesian Methods", "Data Science"],
    email: "j.liu@university.edu",
  },
  {
    id: 5,
    name: "Dr. Anna Kowalski",
    position: "Professor",
    department: "Physics",
    school: "Sciences",
    researchAreas: ["Quantum Computing", "Theoretical Physics", "Machine Learning"],
    email: "a.kowalski@university.edu",
  },
]

// Faculty composition data
const positionData = [
  { position: "Professor", count: 45, color: "#3b82f6" },
  { position: "Associate Professor", count: 32, color: "#10b981" },
  { position: "Assistant Professor", count: 28, color: "#f59e0b" },
  { position: "Lecturer", count: 15, color: "#ef4444" },
  { position: "Research Fellow", count: 12, color: "#8b5cf6" },
]

const departmentData = [
  { department: "Computer Science", count: 25 },
  { department: "Mathematics", count: 18 },
  { department: "Physics", count: 15 },
  { department: "Statistics", count: 12 },
  { department: "Engineering", count: 22 },
  { department: "Biology", count: 14 },
]

// Analytics data for papers
const papersByYear = [
  { year: "2019", papers: 145 },
  { year: "2020", papers: 167 },
  { year: "2021", papers: 189 },
  { year: "2022", papers: 234 },
  { year: "2023", papers: 278 },
  { year: "2024", papers: 312 },
]

const papersByDomain = [
  { domain: "Machine Learning", papers: 89, color: "#3b82f6" },
  { domain: "Data Science", papers: 67, color: "#10b981" },
  { domain: "Computer Vision", papers: 54, color: "#f59e0b" },
  { domain: "Natural Language Processing", papers: 43, color: "#ef4444" },
  { domain: "Robotics", papers: 38, color: "#8b5cf6" },
  { domain: "Cybersecurity", papers: 32, color: "#06b6d4" },
  { domain: "Quantum Computing", papers: 28, color: "#ec4899" },
  { domain: "Bioinformatics", papers: 24, color: "#84cc16" },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r-0 bg-gradient-to-b from-slate-50 to-white">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900">Academic Analytics</span>
            <p className="text-xs text-slate-500">Research Intelligence Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive
                  className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-50 data-[active=true]:to-purple-50 data-[active=true]:text-blue-700 data-[active=true]:border-blue-200"
                >
                  <a href="#dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-slate-50">
                  <a href="#supervisor-finder">
                    <Search className="h-4 w-4" />
                    <span>Supervisor Finder</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-slate-50">
                  <a href="#analytics">
                    <TrendingUp className="h-4 w-4" />
                    <span>Publication Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-slate-50">
                  <a href="#faculty">
                    <GraduationCap className="h-4 w-4" />
                    <span>Faculty Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-slate-50">
                  <a href="#research">
                    <BookOpen className="h-4 w-4" />
                    <span>Research Domains</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-slate-50">
                  <a href="#settings">
                    <Settings className="h-4 w-4" />
                    <span>ETL Configuration</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedSchool, setSelectedSchool] = useState("all")

  const filteredFaculty = facultyData.filter((faculty) => {
    const matchesSearch =
      searchTerm === "" ||
      faculty.researchAreas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || faculty.department === selectedDepartment
    const matchesSchool = selectedSchool === "all" || faculty.school === selectedSchool

    return matchesSearch && matchesDepartment && matchesSchool
  })

  const filteredPositionData = positionData.filter((item) => {
    if (selectedDepartment === "all" && selectedSchool === "all") return true
    // In a real app, this would filter based on actual department/school data
    return true
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="flex h-16 items-center border-b bg-white/80 backdrop-blur-sm px-6 shadow-sm">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Academic Research Dashboard
            </h1>
            <p className="text-sm text-slate-600">Comprehensive analytics for research intelligence</p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Total Faculty</CardTitle>
                <Users className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">132</div>
                <p className="text-xs text-blue-200">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-100">Research Domains</CardTitle>
                <BookOpen className="h-5 w-5 text-emerald-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45</div>
                <p className="text-xs text-emerald-200">Active research areas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Total Publications</CardTitle>
                <FileText className="h-5 w-5 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,325</div>
                <p className="text-xs text-purple-200">+18.2% this year</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Supervisor Finder */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Supervisor Finder
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Discover faculty expertise across research domains
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search research areas (e.g., Machine Learning, Numerical Analysis)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/80"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full border-slate-200 bg-white/80">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Statistics">Statistics</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                    <SelectTrigger className="w-full border-slate-200 bg-white/80">
                      <SelectValue placeholder="School" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Schools</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Sciences">Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredFaculty.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <Search className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-500">No faculty found matching your criteria</p>
                    </div>
                  ) : (
                    filteredFaculty.map((faculty) => (
                      <div
                        key={faculty.id}
                        className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200 hover:bg-white/80"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold text-slate-900">{faculty.name}</h4>
                            <p className="text-sm text-slate-600 font-medium">{faculty.position}</p>
                            <p className="text-xs text-slate-500">
                              {faculty.department} • {faculty.school}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                          >
                            View Profile
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {faculty.researchAreas.map((area) => (
                            <Badge
                              key={area}
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200"
                            >
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Faculty Composition Analytics */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-orange-50/50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Faculty Composition
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600">Distribution by position and department</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Position Distribution */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-slate-700">Faculty by Position</h4>
                    <ChartContainer
                      config={{
                        count: {
                          label: "Count",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-48"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredPositionData}>
                          <XAxis
                            dataKey="position"
                            tick={{ fontSize: 11, fill: "#64748b" }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            axisLine={{ stroke: "#e2e8f0" }}
                            tickLine={{ stroke: "#e2e8f0" }}
                          />
                          <YAxis
                            tick={{ fontSize: 12, fill: "#64748b" }}
                            axisLine={{ stroke: "#e2e8f0" }}
                            tickLine={{ stroke: "#e2e8f0" }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>

                  {/* Department Distribution */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-slate-700">Faculty by Department</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {departmentData.map((dept) => (
                        <div
                          key={dept.department}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-lg border border-orange-100/50"
                        >
                          <span className="text-xs font-medium text-slate-700">{dept.department}</span>
                          <Badge variant="outline" className="border-orange-200 text-orange-700">
                            {dept.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Publication Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Papers by Year */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Publications by Year
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600">Research output trends over time</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer
                  config={{
                    papers: {
                      label: "Papers",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-48"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={papersByYear}>
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={{ stroke: "#e2e8f0" }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="papers"
                        stroke="url(#gradient)"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: "#059669" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#0d9488" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Papers by Domain */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50/50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Publications by Domain
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-600">Research distribution across domains</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {papersByDomain.slice(0, 6).map((domain, index) => (
                    <div
                      key={domain.domain}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-white/60 to-slate-50/60 border border-slate-200/50 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: domain.color }} />
                        <span className="text-xs font-medium text-slate-700 truncate">{domain.domain}</span>
                      </div>
                      <Badge variant="outline" className="text-xs font-semibold">
                        {domain.papers}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Future Analytics Widgets Placeholder */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-white/60 to-slate-50/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Advanced Analytics Hub
              </CardTitle>
              <CardDescription className="text-slate-600">
                Expandable workspace for comprehensive research intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-dashed border-slate-300/50 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50/50 to-white/50 hover:from-blue-50 hover:to-blue-25 transition-all duration-300">
                  <div className="text-slate-500">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium">Citation Analysis</p>
                    <p className="text-xs text-slate-400 mt-1">Impact metrics & trends</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-300/50 rounded-xl p-8 text-center bg-gradient-to-br from-emerald-50/50 to-white/50 hover:from-emerald-50 hover:to-emerald-25 transition-all duration-300">
                  <div className="text-slate-500">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="text-sm font-medium">Collaboration Networks</p>
                    <p className="text-xs text-slate-400 mt-1">Research partnerships</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-300/50 rounded-xl p-8 text-center bg-gradient-to-br from-purple-50/50 to-white/50 hover:from-purple-50 hover:to-purple-25 transition-all duration-300">
                  <div className="text-slate-500">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium">Funding Analytics</p>
                    <p className="text-xs text-slate-400 mt-1">Grant success rates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  )
}
