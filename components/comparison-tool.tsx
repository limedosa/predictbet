"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockFighterProfiles } from "@/lib/mock-data"
import { ArrowLeftRight } from "lucide-react"

export default function ComparisonTool() {
  const [fighter1Id, setFighter1Id] = useState("fighter1")
  const [fighter2Id, setFighter2Id] = useState("fighter2")

  const fighter1 = mockFighterProfiles[fighter1Id]
  const fighter2 = mockFighterProfiles[fighter2Id]

  const fighters = Object.entries(mockFighterProfiles).map(([id, fighter]) => ({
    id,
    name: fighter.name,
  }))

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fighter Comparison Tool</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Fighters to Compare</CardTitle>
          <CardDescription>Choose two fighters to see a side-by-side comparison of their stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <label className="text-sm font-medium mb-2 block">Fighter 1</label>
              <Select value={fighter1Id} onValueChange={setFighter1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fighter" />
                </SelectTrigger>
                <SelectContent>
                  {fighters.map((fighter) => (
                    <SelectItem key={fighter.id} value={fighter.id}>
                      {fighter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center">
              <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <ArrowLeftRight className="h-5 w-5" />
              </div>
              <div className="md:hidden h-10 flex items-center justify-center">
                <ArrowLeftRight className="h-5 w-5 rotate-90" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Fighter 2</label>
              <Select value={fighter2Id} onValueChange={setFighter2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fighter" />
                </SelectTrigger>
                <SelectContent>
                  {fighters.map((fighter) => (
                    <SelectItem key={fighter.id} value={fighter.id}>
                      {fighter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {fighter1 && fighter2 && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fighter Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 bg-fighter-blue">
                    <AvatarFallback className="text-xl text-white">
                      {fighter1.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-fighter-blue">{fighter1.name}</h3>
                    <p className="text-muted-foreground">{fighter1.nickname}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:justify-end">
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-fighter-red">{fighter2.name}</h3>
                    <p className="text-muted-foreground">{fighter2.nickname}</p>
                  </div>
                  <Avatar className="h-16 w-16 bg-fighter-red">
                    <AvatarFallback className="text-xl text-white">
                      {fighter2.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
                <div>
                  <h4 className="font-medium mb-2">Physical Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span>{fighter1.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span>{fighter1.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>{fighter1.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reach:</span>
                      <span>{fighter1.reach}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stance:</span>
                      <span>{fighter1.stance}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Physical Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{fighter2.age}</span>
                      <span className="text-muted-foreground">Age:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.height}</span>
                      <span className="text-muted-foreground">Height:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.weight}</span>
                      <span className="text-muted-foreground">Weight:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.reach}</span>
                      <span className="text-muted-foreground">Reach:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.stance}</span>
                      <span className="text-muted-foreground">Stance:</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
                <div>
                  <h4 className="font-medium mb-2">Record</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span>{fighter1.record.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wins:</span>
                      <span>{fighter1.record.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses:</span>
                      <span>{fighter1.record.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KO/TKO:</span>
                      <span>{fighter1.record.ko}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Record</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{fighter2.record.total}</span>
                      <span className="text-muted-foreground">Total:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.record.wins}</span>
                      <span className="text-muted-foreground">Wins:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.record.losses}</span>
                      <span className="text-muted-foreground">Losses:</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{fighter2.record.ko}</span>
                      <span className="text-muted-foreground">KO/TKO:</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="striking">
                <TabsList className="mb-6">
                  <TabsTrigger value="striking">Striking</TabsTrigger>
                  <TabsTrigger value="grappling">Grappling</TabsTrigger>
                </TabsList>

                <TabsContent value="striking" className="space-y-8">
                  <ComparisonStat
                    label="Striking Accuracy"
                    value1={fighter1.stats.strikingAccuracy}
                    value2={fighter2.stats.strikingAccuracy}
                    unit="%"
                  />
                  <ComparisonStat
                    label="Strikes Landed per Min"
                    value1={fighter1.stats.strikesLandedPerMin}
                    value2={fighter2.stats.strikesLandedPerMin}
                  />
                  <ComparisonStat
                    label="Strikes Absorbed per Min"
                    value1={fighter1.stats.strikesAbsorbedPerMin}
                    value2={fighter2.stats.strikesAbsorbedPerMin}
                    lowerIsBetter
                  />
                </TabsContent>

                <TabsContent value="grappling" className="space-y-8">
                  <ComparisonStat
                    label="Takedown Accuracy"
                    value1={fighter1.stats.takedownAccuracy}
                    value2={fighter2.stats.takedownAccuracy}
                    unit="%"
                  />
                  <ComparisonStat
                    label="Takedown Defense"
                    value1={fighter1.stats.takedownDefense}
                    value2={fighter2.stats.takedownDefense}
                    unit="%"
                  />
                  <ComparisonStat
                    label="Submission Average"
                    value1={fighter1.stats.submissionAverage}
                    value2={fighter2.stats.submissionAverage}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

interface ComparisonStatProps {
  label: string
  value1: number
  value2: number
  unit?: string
  lowerIsBetter?: boolean
}

function ComparisonStat({ label, value1, value2, unit = "", lowerIsBetter = false }: ComparisonStatProps) {
  // Determine which fighter has the advantage
  const fighter1Better = lowerIsBetter ? value1 < value2 : value1 > value2
  const fighter2Better = lowerIsBetter ? value2 < value1 : value2 > value1
  const equal = value1 === value2

  // Calculate the relative percentages for the progress bars
  const total = value1 + value2
  const percent1 = (value1 / total) * 100
  const percent2 = (value2 / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className={fighter1Better ? "text-fighter-blue font-bold" : ""}>
          {value1}
          {unit}
        </span>
        <span>{label}</span>
        <span className={fighter2Better ? "text-fighter-red font-bold" : ""}>
          {value2}
          {unit}
        </span>
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full ${fighter1Better ? "bg-fighter-blue" : equal ? "bg-primary" : "bg-fighter-blue/60"}`}
          style={{ width: `${percent1}%` }}
        />
        <div
          className={`h-full ${fighter2Better ? "bg-fighter-red" : equal ? "bg-primary" : "bg-fighter-red/60"}`}
          style={{ width: `${percent2}%` }}
        />
      </div>
    </div>
  )
}
