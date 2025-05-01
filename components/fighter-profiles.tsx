"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockFights, mockFighterProfiles } from "@/lib/mock-data"

export default function FighterProfiles() {
  const [selectedFighterId, setSelectedFighterId] = useState("fighter1")

  // Get all fighters from the fights data
  const fighters = mockFights.reduce(
    (acc, fight) => {
      if (!acc.some((f) => f.id === `fighter-${fight.id}-A`)) {
        acc.push({
          id: `fighter-${fight.id}-A`,
          name: fight.fighterA,
          opponent: fight.fighterB,
          fightDate: fight.date,
        })
      }
      if (!acc.some((f) => f.id === `fighter-${fight.id}-B`)) {
        acc.push({
          id: `fighter-${fight.id}-B`,
          name: fight.fighterB,
          opponent: fight.fighterA,
          fightDate: fight.date,
        })
      }
      return acc
    },
    [] as { id: string; name: string; opponent: string; fightDate: string }[],
  )

  const selectedFighter = mockFighterProfiles[selectedFighterId] || mockFighterProfiles.fighter1

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fighter Profiles</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fighters</CardTitle>
              <CardDescription>Select a fighter to view their profile</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 p-2">
                {fighters.map((fighter) => (
                  <button
                    key={fighter.id}
                    className={`w-full flex items-center gap-2 p-2 rounded-md text-left ${
                      selectedFighterId === fighter.id.replace("fighter-", "").replace("-A", "").replace("-B", "")
                        ? "bg-primary/10 font-medium"
                        : "hover:bg-muted"
                    }`}
                    onClick={() =>
                      setSelectedFighterId(fighter.id.replace("fighter-", "").replace("-A", "").replace("-B", ""))
                    }
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {fighter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{fighter.name}</div>
                      <div className="text-xs text-muted-foreground">
                        vs {fighter.opponent} • {fighter.fightDate}
                      </div>
                    </div>
                  </button>
                ))}
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
                  <CardDescription>{selectedFighter.nickname}</CardDescription>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span>{selectedFighter.age}</span>
                    </div>
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
                      <span>{selectedFighter.record.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses:</span>
                      <span>{selectedFighter.record.losses}</span>
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
        </div>
      </div>
    </div>
  )
}
