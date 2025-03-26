"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  ShoppingCart,
  CalendarIcon,
  User,
  Settings,
  ChevronRight,
  Plus,
  Trash2,
  Heart,
  Filter,
  Home,
  BarChart2,
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Leaf,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function MealPlannerApp() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [budget, setBudget] = useState([50])
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [progress, setProgress] = useState(65)

  // Mock data for dashboard
  const weeklyNutrition = [
    { day: "Mon", calories: 1850, protein: 75, carbs: 220, fat: 60 },
    { day: "Tue", calories: 2100, protein: 90, carbs: 240, fat: 65 },
    { day: "Wed", calories: 1950, protein: 85, carbs: 210, fat: 62 },
    { day: "Thu", calories: 2000, protein: 88, carbs: 230, fat: 63 },
    { day: "Fri", calories: 2200, protein: 95, carbs: 250, fat: 70 },
    { day: "Sat", calories: 2300, protein: 100, carbs: 260, fat: 75 },
    { day: "Sun", calories: 1900, protein: 80, carbs: 200, fat: 60 },
  ]

  const renderLoginScreen = () => (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-10 w-10 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl text-center">{isLogin ? "Welcome back" : "Create an account"}</CardTitle>
          <CardDescription className="text-center">
            {isLogin ? "Enter your credentials to access your account" : "Enter your information to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" placeholder="hello@example.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <Button variant="link" className="px-0 text-xs font-normal h-auto">
                  Forgot password?
                </Button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={showPassword ? "text" : "password"} className="pl-10 pr-10" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="confirm-password" type={showPassword ? "text" : "password"} className="pl-10 pr-10" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setActiveTab("dashboard")}>
            {isLogin ? "Sign in" : "Create account"}
          </Button>
          <div className="text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-emerald-600"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your meal plan overview</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="thisWeek">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85.50 / $100.00</div>
            <Progress value={progress} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{100 - progress}% of your budget remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Meals Planned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 / 21</div>
            <Progress value={85} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">3 meals left to plan this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">8.5 / 10</div>
            <Progress value={85} className="h-2 mt-2 bg-emerald-100">
              <div className="h-full bg-emerald-600 rounded-full" />
            </Progress>
            <p className="text-xs text-muted-foreground mt-2">Great job! Your meal plan is eco-friendly</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>This Week's Meal Plan</CardTitle>
            <CardDescription>Your upcoming meals for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyNutrition.map((day) => (
                <div key={day.day} className="flex items-center">
                  <div className="w-12 text-sm font-medium">{day.day}</div>
                  <div className="flex-1 ml-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-sm font-medium">
                        {
                          [
                            "Avocado Toast",
                            "Smoothie Bowl",
                            "Oatmeal",
                            "Breakfast Burrito",
                            "Pancakes",
                            "Yogurt Parfait",
                            "Egg Sandwich",
                          ][weeklyNutrition.findIndex((d) => d.day === day.day)]
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium">
                        {
                          [
                            "Quinoa Salad",
                            "Lentil Soup",
                            "Veggie Wrap",
                            "Buddha Bowl",
                            "Pasta Salad",
                            "Falafel Plate",
                            "Grain Bowl",
                          ][weeklyNutrition.findIndex((d) => d.day === day.day)]
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">
                        {
                          [
                            "Stir Fry",
                            "Curry",
                            "Roasted Vegetables",
                            "Bean Chili",
                            "Stuffed Peppers",
                            "Veggie Burger",
                            "Tacos",
                          ][weeklyNutrition.findIndex((d) => d.day === day.day)]
                        }
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{day.calories} cal</div>
                    <div className="text-xs text-muted-foreground">
                      P: {day.protein}g • C: {day.carbs}g • F: {day.fat}g
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Full Calendar
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutritional Overview</CardTitle>
            <CardDescription>Weekly average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Calories</span>
                  <span className="font-medium">2,043 / day</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[85%]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Protein</span>
                  <span className="font-medium">87g / day</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[90%]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Carbs</span>
                  <span className="font-medium">230g / day</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[75%]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fat</span>
                  <span className="font-medium">65g / day</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[60%]" />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2 text-sm">Sustainability Highlights</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      Plant-based
                    </Badge>
                    <span className="text-sm">65% of meals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      Seasonal
                    </Badge>
                    <span className="text-sm">80% of ingredients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      Local
                    </Badge>
                    <span className="text-sm">45% of ingredients</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorite Recipes</CardTitle>
          <CardDescription>Your most used recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted relative">
                  <img
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={`Recipe ${i}`}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 rounded-full text-red-500"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {["Mediterranean Bowl", "Lentil Soup", "Veggie Stir Fry"][i - 1]}
                      </h3>
                      <p className="text-sm text-muted-foreground">Used 8 times • 520 calories</p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      $12
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-4 w-4" />
            View All Favorites
          </Button>
        </CardFooter>
      </Card>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9f6]">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-semibold">MealMate</h1>
          </div>
          {activeTab !== "login" && (
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation - Only show if logged in */}
        {activeTab !== "login" && (
          <aside className="hidden md:flex w-64 flex-col border-r bg-white">
            <nav className="flex-1 space-y-1 p-4">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "calendar" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("calendar")}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                Meal Calendar
              </Button>
              <Button
                variant={activeTab === "recipes" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("recipes")}
              >
                <Heart className="mr-2 h-5 w-5" />
                Recipes
              </Button>
              <Button
                variant={activeTab === "grocery" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("grocery")}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Grocery List
              </Button>
              <Button
                variant={activeTab === "nutrition" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("nutrition")}
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Nutrition
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-5 w-5" />
                Profile
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => setActiveTab("login")}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </nav>
          </aside>
        )}

        {/* Mobile Navigation - Only show if logged in */}
        {activeTab !== "login" && (
          <div className="md:hidden w-full">
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="dashboard">
                  <Home className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <CalendarIcon className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="recipes">
                  <Heart className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="grocery">
                  <ShoppingCart className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="profile">
                  <User className="h-5 w-5" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === "login" && renderLoginScreen()}
          {activeTab === "dashboard" && renderDashboard()}

          {activeTab === "calendar" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Meal Calendar</CardTitle>
                    <CardDescription>Plan your meals for the month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                  </CardContent>
                </Card>

                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>
                      {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </CardTitle>
                    <CardDescription>Your planned meals for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Breakfast</h3>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md bg-emerald-100 flex items-center justify-center">
                                <img
                                  src="/placeholder.svg?height=48&width=48"
                                  alt="Avocado Toast"
                                  className="h-10 w-10 rounded"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">Avocado Toast</h4>
                                <p className="text-sm text-muted-foreground">320 calories</p>
                              </div>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Lunch</h3>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md bg-emerald-100 flex items-center justify-center">
                                <img
                                  src="/placeholder.svg?height=48&width=48"
                                  alt="Quinoa Salad"
                                  className="h-10 w-10 rounded"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">Quinoa Salad</h4>
                                <p className="text-sm text-muted-foreground">450 calories</p>
                              </div>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Dinner</h3>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md bg-emerald-100 flex items-center justify-center">
                                <img
                                  src="/placeholder.svg?height=48&width=48"
                                  alt="Vegetable Stir Fry"
                                  className="h-10 w-10 rounded"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">Vegetable Stir Fry</h4>
                                <p className="text-sm text-muted-foreground">520 calories</p>
                              </div>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Find Meal Plans</CardTitle>
                  <CardDescription>Search for meal plans based on your budget and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Weekly Budget: ${budget}</Label>
                      <Slider id="budget" min={20} max={200} step={5} value={budget} onValueChange={setBudget} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="diet">Diet Type</Label>
                        <Select defaultValue="any">
                          <SelectTrigger id="diet" className="mt-1">
                            <SelectValue placeholder="Select diet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="paleo">Paleo</SelectItem>
                            <SelectItem value="keto">Keto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="servings">Servings</Label>
                        <Select defaultValue="2">
                          <SelectTrigger id="servings" className="mt-1">
                            <SelectValue placeholder="Select servings" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 person</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="4">4 people</SelectItem>
                            <SelectItem value="6">6+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Select defaultValue="week">
                          <SelectTrigger id="duration" className="mt-1">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">1 day</SelectItem>
                            <SelectItem value="week">1 week</SelectItem>
                            <SelectItem value="month">1 month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button className="w-full md:w-auto">Find Meal Plans</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "recipes" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Recipe Browser</h2>
                  <p className="text-muted-foreground">Find and save your favorite recipes</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search recipes..." className="w-full md:w-[300px] pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Dietary Restrictions & Allergens</CardTitle>
                  <CardDescription>Filter recipes based on your dietary needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gluten" />
                      <Label htmlFor="gluten">Gluten-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dairy" />
                      <Label htmlFor="dairy">Dairy-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nuts" />
                      <Label htmlFor="nuts">Nut-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="soy" />
                      <Label htmlFor="soy">Soy-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="shellfish" />
                      <Label htmlFor="shellfish">Shellfish-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="eggs" />
                      <Label htmlFor="eggs">Egg-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegetarian" />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegan" />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted relative">
                      <img
                        src={`/placeholder.svg?height=200&width=400`}
                        alt={`Recipe ${i}`}
                        className="object-cover w-full h-full"
                      />
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {
                              [
                                "Mediterranean Bowl",
                                "Lentil Soup",
                                "Veggie Stir Fry",
                                "Quinoa Salad",
                                "Sweet Potato Curry",
                                "Mushroom Risotto",
                              ][i - 1]
                            }
                          </h3>
                          <p className="text-sm text-muted-foreground">30 mins • 520 calories</p>
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                          $12
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {i % 2 === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Gluten-Free
                          </Badge>
                        )}
                        {i % 3 === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Vegan
                          </Badge>
                        )}
                        {i % 4 === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Low-Carb
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "grocery" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Grocery List</h2>
                  <p className="text-muted-foreground">Manage your shopping list</p>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping List</CardTitle>
                    <CardDescription>Items for this week's meal plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Produce</h3>
                          <div className="space-y-2">
                            {[
                              "Spinach (1 bunch)",
                              "Avocados (3)",
                              "Bell peppers (2)",
                              "Carrots (1 lb)",
                              "Broccoli (1 head)",
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Checkbox id={`item-${i}`} />
                                <Label htmlFor={`item-${i}`} className="flex-1">
                                  {item}
                                </Label>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-2">Pantry</h3>
                          <div className="space-y-2">
                            {[
                              "Quinoa (1 box)",
                              "Olive oil",
                              "Canned beans (2)",
                              "Brown rice (1 bag)",
                              "Pasta (whole grain)",
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Checkbox id={`pantry-${i}`} />
                                <Label htmlFor={`pantry-${i}`} className="flex-1">
                                  {item}
                                </Label>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="font-medium mb-2">Dairy & Refrigerated</h3>
                          <div className="space-y-2">
                            {["Almond milk", "Greek yogurt", "Tofu (firm)", "Eggs (1 dozen)", "Feta cheese"].map(
                              (item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Checkbox id={`dairy-${i}`} />
                                  <Label htmlFor={`dairy-${i}`} className="flex-1">
                                    {item}
                                  </Label>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">15 items remaining</p>
                    </div>
                    <Button variant="outline">Clear Completed</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Tracker</CardTitle>
                    <CardDescription>Estimated cost: $85.50</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Weekly budget</span>
                          <span className="font-medium">$100.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Estimated cost</span>
                          <span className="font-medium">$85.50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining</span>
                          <span className="font-medium text-emerald-600">$14.50</span>
                        </div>
                      </div>

                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[85%]" />
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Savings Tips</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                              <span className="text-xs text-emerald-700">1</span>
                            </div>
                            <span>Buy seasonal produce to save $5-10</span>
                          </li>
                          <li className="flex gap-2">
                            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                              <span className="text-xs text-emerald-700">2</span>
                            </div>
                            <span>Check for store brand alternatives</span>
                          </li>
                          <li className="flex gap-2">
                            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                              <span className="text-xs text-emerald-700">3</span>
                            </div>
                            <span>Buy beans and grains in bulk</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Nutrition Tracker</h2>
                  <p className="text-muted-foreground">Monitor your nutritional intake</p>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="thisWeek">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="thisWeek">This Week</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Calories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,043</div>
                    <Progress value={85} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">85% of daily target</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Protein</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87g</div>
                    <Progress value={90} className="h-2 mt-2 bg-blue-100">
                      <div className="h-full bg-blue-500 rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-2">90% of daily target</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Carbs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">230g</div>
                    <Progress value={75} className="h-2 mt-2 bg-amber-100">
                      <div className="h-full bg-amber-500 rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-2">75% of daily target</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Fat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">65g</div>
                    <Progress value={60} className="h-2 mt-2 bg-red-100">
                      <div className="h-full bg-red-500 rounded-full" />
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-2">60% of daily target</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Breakdown</CardTitle>
                  <CardDescription>Nutritional information by meal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal, i) => (
                      <div key={i}>
                        <h3 className="font-medium mb-2">{meal}</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-md bg-emerald-100 flex items-center justify-center">
                                  <img
                                    src="/placeholder.svg?height=48&width=48"
                                    alt={meal}
                                    className="h-10 w-10 rounded"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">
                                    {i === 0
                                      ? "Avocado Toast"
                                      : i === 1
                                        ? "Quinoa Salad"
                                        : i === 2
                                          ? "Vegetable Stir Fry"
                                          : "Mixed Nuts & Fruit"}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {i === 0
                                      ? "320 calories"
                                      : i === 1
                                        ? "450 calories"
                                        : i === 2
                                          ? "520 calories"
                                          : "280 calories"}
                                  </p>
                                </div>
                              </div>
                              <div className="md:ml-auto grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Protein</p>
                                  <p className="font-medium">
                                    {i === 0 ? "15g" : i === 1 ? "22g" : i === 2 ? "28g" : "12g"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Carbs</p>
                                  <p className="font-medium">
                                    {i === 0 ? "40g" : i === 1 ? "65g" : i === 2 ? "70g" : "25g"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Fat</p>
                                  <p className="font-medium">
                                    {i === 0 ? "18g" : i === 1 ? "12g" : i === 2 ? "15g" : "20g"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Goals</CardTitle>
                  <CardDescription>Track your progress towards your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Daily Calorie Target</Label>
                        <span className="font-medium">2,400 calories</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current intake</span>
                          <span className="font-medium">2,043 calories</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[85%]" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Macronutrient Distribution</Label>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Protein</span>
                            <span className="font-medium">25%</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[90%]" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Carbs</span>
                            <span className="font-medium">50%</span>
                          </div>
                          <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[75%]" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Fat</span>
                            <span className="font-medium">25%</span>
                          </div>
                          <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[60%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    Adjust Nutritional Goals
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Profile & Settings</h2>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">Jane Doe</h3>
                        <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Edit Profile
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    <nav className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Preferences
                      </Button>
                    </nav>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dietary Preferences</CardTitle>
                      <CardDescription>Customize your meal planning experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="diet-pref">Diet Type</Label>
                            <Select defaultValue="flexitarian">
                              <SelectTrigger id="diet-pref">
                                <SelectValue placeholder="Select diet" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="omnivore">Omnivore</SelectItem>
                                <SelectItem value="flexitarian">Flexitarian</SelectItem>
                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                                <SelectItem value="paleo">Paleo</SelectItem>
                                <SelectItem value="keto">Keto</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="calories">Daily Calorie Target</Label>
                            <Select defaultValue="2000">
                              <SelectTrigger id="calories">
                                <SelectValue placeholder="Select calories" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1500">1500 calories</SelectItem>
                                <SelectItem value="1800">1800 calories</SelectItem>
                                <SelectItem value="2000">2000 calories</SelectItem>
                                <SelectItem value="2500">2500 calories</SelectItem>
                                <SelectItem value="3000">3000 calories</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2">Allergens & Restrictions</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {["Gluten", "Dairy", "Nuts", "Eggs", "Soy", "Shellfish", "Fish", "Wheat", "Sesame"].map(
                              (allergen, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                  <Checkbox id={`allergen-${i}`} />
                                  <Label htmlFor={`allergen-${i}`}>{allergen}</Label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>App Settings</CardTitle>
                      <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notifications">Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive meal reminders and updates</p>
                          </div>
                          <Switch id="notifications" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                          </div>
                          <Switch id="dark-mode" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="weekly-report">Weekly Report</Label>
                            <p className="text-sm text-muted-foreground">Receive a summary of your meal planning</p>
                          </div>
                          <Switch id="weekly-report" defaultChecked />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select defaultValue="usd">
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                              <SelectItem value="cad">CAD ($)</SelectItem>
                              <SelectItem value="aud">AUD ($)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button>Save Settings</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

