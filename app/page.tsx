"use client"
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart2, MessageSquare, TrendingUp, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Dashboard from "@/components/dashboard"
import Predictor from "@/components/predictor"
import SocialFeed from "@/components/social-feed"
import About from "@/components/about"
import FighterProfiles from "@/components/fighter-profiles"
import ComparisonTool from "@/components/comparison-tool"
import DataVisualization from "@/components/data-visualization"
import EnhancedSearch from "@/components/enhanced-search"
import { mockFights } from "@/lib/mock-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme, setTheme } = useTheme()
  const [recentUpdate, setRecentUpdate] = useState("")
  const [updateCount, setUpdateCount] = useState(0)
  const [selectedFighterId, setSelectedFighterId] = useState<string | null>(null)
  const [selectedFightId, setSelectedFightId] = useState<string | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        "Odds for Jones vs Gane shifted from -220 to -235",
        "New social post about Adesanya detected",
        "Fight prediction confidence increased for Nunes vs Peña",
        "3 new tweets about Poirier detected",
        "Betting volume increased for Edwards vs Usman",
      ]

      const randomUpdate = updates[Math.floor(Math.random() * updates.length)]
      setRecentUpdate(randomUpdate)
      setUpdateCount((prev) => prev + 1)
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle search selections
  useEffect(() => {
    if (selectedFighterId) {
      setActiveTab("fighters")
      setSelectedFighterId(null)
    }
  }, [selectedFighterId])

  useEffect(() => {
    if (selectedFightId) {
      setActiveTab("dashboard")
      setSelectedFightId(null)
    }
  }, [selectedFightId])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-10 w-10 relative">
              <Image src="/images/predictBetLogo.png" alt="PredictBet Logo" fill className="object-contain" />
            </div>
            <Link href="/" onClick={() => setActiveTab("overview")} className="text-foreground">
              PredictBet
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="predict">Predict</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="fighters">Fighters</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="visualization">Visualize</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <div className="container py-2 border-b">
        <EnhancedSearch
          onSelectFighter={(id) => setSelectedFighterId(id)}
          onSelectFight={(id) => setSelectedFightId(id)}
          onSelectTab={(tab) => setActiveTab(tab)}
        />
      </div>

      {recentUpdate && (
        <div className="bg-accent py-2 border-b">
          <div className="container flex items-center">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
            <span className="text-accent-foreground">{recentUpdate}</span>
          </div>
        </div>
      )}

      <main className="container py-6">
        {activeTab === "overview" ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl ufc-black">
                UFC Fight Predictions & Odds Tracking
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
                PredictBet helps you make informed UFC fight predictions by analyzing betting odds, social sentiment,
                and historical data.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={() => setActiveTab("dashboard")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("predict")}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Try Predictor
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-chart-1"
                onClick={() => setActiveTab("dashboard")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                      <BarChart2 className="h-5 w-5 text-chart-1" />
                    </div>
                    <div>
                      <h3 className="font-medium">Odds Tracking</h3>
                      <p className="text-sm text-muted-foreground">Monitor betting odds movement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-chart-2"
                onClick={() => setActiveTab("dashboard")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sentiment Analysis</h3>
                      <p className="text-sm text-muted-foreground">Track public opinion trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-chart-3"
                onClick={() => setActiveTab("social")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <h3 className="font-medium">Social Feed</h3>
                      <p className="text-sm text-muted-foreground">Real-time social media updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-chart-4"
                onClick={() => setActiveTab("fighters")}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-chart-4/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-chart-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Fighter Profiles</h3>
                      <p className="text-sm text-muted-foreground">Detailed fighter statistics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Featured Fights</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockFights.slice(0, 3).map((fight) => (
                  <Card key={fight.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">
                            <span className="text-fighter-blue">{fight.fighterA}</span> vs{" "}
                            <span className="text-fighter-red">{fight.fighterB}</span>
                          </h3>
                          <p className="text-sm text-muted-foreground">{fight.date}</p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setActiveTab("fighters")
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                      <div className="p-4 flex justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Odds</p>
                          <p
                            className={`font-medium ${fight.currentOdds > 0 ? "text-odds-positive" : "text-odds-negative"}`}
                          >
                            {fight.currentOdds > 0 ? `+${fight.currentOdds}` : fight.currentOdds}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Opening Odds</p>
                          <p
                            className={`font-medium ${fight.openingOdds > 0 ? "text-odds-positive" : "text-odds-negative"}`}
                          >
                            {fight.openingOdds > 0 ? `+${fight.openingOdds}` : fight.openingOdds}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Movement</p>
                          <p className="font-medium">
                            {Math.abs(fight.currentOdds - fight.openingOdds)}
                            {fight.currentOdds < fight.openingOdds ? "↓" : "↑"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "predict" && <Predictor />}
            {activeTab === "social" && <SocialFeed />}
            {activeTab === "fighters" && <FighterProfiles />}
            {activeTab === "compare" && <ComparisonTool />}
            {activeTab === "visualization" && <DataVisualization />}
            {activeTab === "about" && <About />}
          </>
        )}
      </main>
    </div>
  )
}
