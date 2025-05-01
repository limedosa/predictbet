"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import SentimentChart from "./sentiment-chart"
import { mockFights } from "@/lib/mock-data"

export default function Dashboard() {
  const [selectedFight, setSelectedFight] = useState(mockFights[0])

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">UFC Fight Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-t-4 border-t-chart-1">
          <CardHeader>
            <CardTitle>Upcoming Fights</CardTitle>
            <CardDescription>Track upcoming UFC fights and betting odds movement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Fight</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Opening Odds</TableHead>
                    <TableHead>Current Odds</TableHead>
                    <TableHead>Movement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFights.map((fight) => {
                    const oddsShift = Math.abs(fight.currentOdds - fight.openingOdds)
                    const isLargeShift = oddsShift > 100

                    return (
                      <TableRow
                        key={fight.id}
                        className={isLargeShift ? "bg-amber-50 dark:bg-amber-950/20" : ""}
                        onClick={() => setSelectedFight(fight)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell className="font-medium">
                          <span className="text-fighter-blue">{fight.fighterA}</span> vs{" "}
                          <span className="text-fighter-red">{fight.fighterB}</span>
                        </TableCell>
                        <TableCell>{fight.date}</TableCell>
                        <TableCell className={fight.openingOdds > 0 ? "text-odds-positive" : "text-odds-negative"}>
                          {fight.openingOdds > 0 ? `+${fight.openingOdds}` : fight.openingOdds}
                        </TableCell>
                        <TableCell className={fight.currentOdds > 0 ? "text-odds-positive" : "text-odds-negative"}>
                          {fight.currentOdds > 0 ? `+${fight.currentOdds}` : fight.currentOdds}
                        </TableCell>
                        <TableCell>
                          {isLargeShift ? (
                            <Badge
                              variant={fight.currentOdds < fight.openingOdds ? "default" : "destructive"}
                              className={
                                fight.currentOdds < fight.openingOdds ? "bg-odds-positive" : "bg-odds-negative"
                              }
                            >
                              {fight.currentOdds < fight.openingOdds ? "↓" : "↑"}
                              {oddsShift}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">
                              {fight.currentOdds < fight.openingOdds ? "↓" : "↑"}
                              {oddsShift}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-chart-2">
          <CardHeader>
            <CardTitle>Sentiment vs. Odds Analyzer</CardTitle>
            <CardDescription>
              <span className="text-fighter-blue">{selectedFight.fighterA}</span> vs{" "}
              <span className="text-fighter-red">{selectedFight.fighterB}</span> - {selectedFight.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SentimentChart fightId={selectedFight.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
