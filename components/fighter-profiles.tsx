"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { fighterDataService, ProcessedFighterData } from "@/lib/services/fighter-data"

export default function FighterProfiles() {
  const [selectedFighterId, setSelectedFighterId] = useState<string>("")
  const [fighters, setFighters] = useState<ProcessedFighterData[]>([])
  const [filteredFighters, setFilteredFighters] = useState<ProcessedFighterData[]>([])
  const [selectedFighter, setSelectedFighter] = useState<ProcessedFighterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadFighters = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Load ALL fighters from the CSV data
        const fightersData = await fighterDataService.getAllFighters()
        setFighters(fightersData)
        setFilteredFighters(fightersData)
        
        // Set the first fighter as selected by default
        if (fightersData.length > 0) {
          setSelectedFighterId(fightersData[0].id)
          setSelectedFighter(fightersData[0])
        }
      } catch (err) {
        setError('Failed to load fighter data. Please try again later.')
        console.error('Error loading fighters:', err)
      } finally {
        setLoading(false)
      }
    }

    loadFighters()
  }, [])

  useEffect(() => {
    if (selectedFighterId && fighters.length > 0) {
      const fighter = fighters.find(f => f.id === selectedFighterId)
      setSelectedFighter(fighter || null)
    }
  }, [selectedFighterId, fighters])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFighters(fighters)
    } else {
      const filtered = fighters.filter(fighter =>
        fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fighter.nickname && fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredFighters(filtered)
    }
  }, [searchQuery, fighters])

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fighter Profiles</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fighter Profiles</h1>
        </div>
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!selectedFighter) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fighter Profiles</h1>
        </div>
        <Alert>
          <AlertDescription>No fighter data available.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fighter Profiles</h1>
        <div className="text-sm text-muted-foreground">
          {filteredFighters.length} of {fighters.length} fighters
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fighters</CardTitle>
              <CardDescription>Search and select a fighter to view their profile</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search fighters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                <div className="space-y-1 p-2">
                  {filteredFighters.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No fighters found matching "{searchQuery}"
                    </div>
                  ) : (
                    filteredFighters.map((fighter) => (
                      <button
                        key={fighter.id}
                        className={`w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors ${
                          selectedFighterId === fighter.id
                            ? "bg-primary/10 font-medium border border-primary/20"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedFighterId(fighter.id)}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {fighter.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{fighter.name}</div>
                          {fighter.nickname && (
                            <div className="text-xs text-muted-foreground truncate">
                              "{fighter.nickname}"
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {fighter.weight} • {fighter.stance}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-0 bg-gradient-to-r from-fighter-blue/10 to-fighter-red/10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedFighter.name}</CardTitle>
                  {selectedFighter.nickname && (
                    <CardDescription className="text-base">"{selectedFighter.nickname}"</CardDescription>
                  )}
                </div>
                <Avatar className="h-16 w-16 bg-gradient-to-r from-fighter-blue to-fighter-red">
                  <AvatarFallback className="text-xl text-white">
                    {selectedFighter.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div>
                  <h3 className="font-medium mb-2">Fighter Info</h3>
                  <div className="space-y-1 text-sm">
                    {selectedFighter.age > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span>{selectedFighter.age}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span>{selectedFighter.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>{selectedFighter.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reach:</span>
                      <span>{selectedFighter.reach}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stance:</span>
                      <span>{selectedFighter.stance}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Record</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span>{selectedFighter.record.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wins:</span>
                      <span className="text-sentiment-positive">{selectedFighter.record.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses:</span>
                      <span className="text-sentiment-negative">{selectedFighter.record.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Draws:</span>
                      <span>{selectedFighter.record.draws}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KO/TKO:</span>
                      <span>{selectedFighter.record.ko}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fighter Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="striking">
                <TabsList className="mb-4">
                  <TabsTrigger value="striking">Striking</TabsTrigger>
                  <TabsTrigger value="grappling">Grappling</TabsTrigger>
                </TabsList>
                <TabsContent value="striking" className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Striking Accuracy</span>
                      <span className="text-sm font-medium">{selectedFighter.stats.strikingAccuracy}%</span>
                    </div>
                    <Progress value={selectedFighter.stats.strikingAccuracy} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Strikes Landed per Min</span>
                      <span className="text-sm font-medium">{selectedFighter.stats.strikesLandedPerMin}</span>
                    </div>
                    <Progress value={selectedFighter.stats.strikesLandedPerMin * 10} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Strikes Absorbed per Min</span>
                      <span className="text-sm font-medium">{selectedFighter.stats.strikesAbsorbedPerMin}</span>
                    </div>
                    <Progress value={selectedFighter.stats.strikesAbsorbedPerMin * 10} className="h-2" />
                  </div>
                </TabsContent>
                <TabsContent value="grappling" className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Takedown Accuracy</span>
                      <span className="text-sm font-medium">{selectedFighter.stats.takedownAccuracy}%</span>
                    </div>
                    <Progress value={selectedFighter.stats.takedownAccuracy} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Takedown Defense</span>
                      <span className="text-sm font-medium">{selectedFighter.stats.takedownDefense}%</span>
                    </div>
                    <Progress value={selectedFighter.stats.takedownDefense} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Submission Average</span>
                      <span className="text-sm font-medium">{selectedFighter.stats.submissionAverage}</span>
                    </div>
                    <Progress value={selectedFighter.stats.submissionAverage * 20} className="h-2" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Fights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedFighter.recentFights.map((fight, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">vs {fight.opponent}</div>
                      <div className="text-sm text-muted-foreground">{fight.date}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-medium ${
                          fight.result === "Win"
                            ? "text-sentiment-positive"
                            : fight.result === "Loss"
                              ? "text-sentiment-negative"
                              : "text-muted-foreground"
                        }`}
                      >
                        {fight.result}
                      </div>
                      <div className="text-sm text-muted-foreground">{fight.method}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between mb-1">
                  <span>UFC Stats Profile:</span>
                  <a 
                    href={selectedFighter.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Official Stats
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}