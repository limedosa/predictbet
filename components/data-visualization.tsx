"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { mockFights, mockFighterProfiles } from "@/lib/mock-data"

export default function DataVisualization() {
  const [selectedTab, setSelectedTab] = useState("odds-movement")
  const [selectedFighterId, setSelectedFighterId] = useState("fighter1")
  const [selectedFightId, setSelectedFightId] = useState("fight1")

  const fighters = Object.entries(mockFighterProfiles).map(([id, fighter]) => ({
    id,
    name: fighter.name,
  }))

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Data Visualization</h1>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="odds-movement">Odds Movement</TabsTrigger>
          <TabsTrigger value="win-distribution">Win Distribution</TabsTrigger>
          <TabsTrigger value="fighter-stats">Fighter Stats</TabsTrigger>
          <TabsTrigger value="weight-class">Weight Class Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="odds-movement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UFC Fight Odds Movement</CardTitle>
              <CardDescription>Track how betting odds change over time for upcoming fights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Select a Fight</label>
                <Select value={selectedFightId} onValueChange={setSelectedFightId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a fight" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFights.map((fight) => (
                      <SelectItem key={fight.id} value={fight.id}>
                        {fight.fighterA} vs {fight.fighterB} - {fight.date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <OddsMovementChart fightId={selectedFightId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="win-distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fighter Win Distribution</CardTitle>
              <CardDescription>Breakdown of how fighters win their matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Select a Fighter</label>
                <Select value={selectedFighterId} onValueChange={setSelectedFighterId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a fighter" />
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
              <WinDistributionChart fighterId={selectedFighterId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fighter-stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fighter Performance Radar</CardTitle>
              <CardDescription>Comprehensive view of fighter attributes and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Select a Fighter</label>
                <Select value={selectedFighterId} onValueChange={setSelectedFighterId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a fighter" />
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
              <FighterRadarChart fighterId={selectedFighterId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight-class" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight Class Activity</CardTitle>
              <CardDescription>Number of fights and finishes by weight class</CardDescription>
            </CardHeader>
            <CardContent>
              <WeightClassActivityChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OddsMovementChart({ fightId }: { fightId: string }) {
  // Mock data for odds movement over time
  const selectedFight = mockFights.find((fight) => fight.id === fightId) || mockFights[0]

  // Generate odds movement data
  const generateOddsData = () => {
    const startDate = new Date("2023-01-01")
    const data = []

    // Starting odds
    let fighterAOdds = selectedFight.openingOdds
    let fighterBOdds = -selectedFight.openingOdds

    // Generate data points for each week
    for (let i = 0; i < 12; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i * 7)

      // Random fluctuation in odds
      const fluctuationA = Math.floor(Math.random() * 40) - 20
      const fluctuationB = -fluctuationA

      fighterAOdds += fluctuationA
      fighterBOdds += fluctuationB

      data.push({
        date: currentDate.toISOString().split("T")[0],
        [selectedFight.fighterA]: fighterAOdds,
        [selectedFight.fighterB]: fighterBOdds,
      })
    }

    // Ensure the last data point matches the current odds
    data[data.length - 1] = {
      ...data[data.length - 1],
      [selectedFight.fighterA]: selectedFight.currentOdds,
      [selectedFight.fighterB]: -selectedFight.currentOdds,
    }

    return data
  }

  const oddsData = generateOddsData()

  return (
    <ChartContainer
      config={{
        [selectedFight.fighterA]: {
          label: selectedFight.fighterA,
          color: "hsl(var(--fighter-blue))",
        },
        [selectedFight.fighterB]: {
          label: selectedFight.fighterB,
          color: "hsl(var(--fighter-red))",
        },
      }}
      className="h-[400px]"
    >
      <LineChart data={oddsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getMonth() + 1}/${date.getDate()}`
          }}
        />
        <YAxis />
        <ChartTooltip />
        <Legend />
        <Line type="monotone" dataKey={selectedFight.fighterA} stroke="#0284c7" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={selectedFight.fighterB} stroke="#dc2626" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ChartContainer>
  )
}

function WinDistributionChart({ fighterId }: { fighterId: string }) {
  const fighter = mockFighterProfiles[fighterId] || mockFighterProfiles.fighter1

  // Generate win distribution data
  const winData = [
    { name: "KO/TKO", value: Math.floor(fighter.record.wins * 0.4) },
    { name: "Submission", value: Math.floor(fighter.record.wins * 0.3) },
    {
      name: "Decision",
      value: fighter.record.wins - Math.floor(fighter.record.wins * 0.4) - Math.floor(fighter.record.wins * 0.3),
    },
  ]

  const COLORS = ["#dc2626", "#0284c7", "#16a34a"]

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <ChartContainer config={{}} className="h-[300px]">
          <PieChart>
            <Pie
              data={winData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {winData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip />
            <Legend />
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-medium mb-4">{fighter.name}'s Win Methods</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">KO/TKO</span>
              <span className="text-sm font-medium">{winData[0].value} wins</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-fighter-red"
                style={{ width: `${(winData[0].value / fighter.record.wins) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Submission</span>
              <span className="text-sm font-medium">{winData[1].value} wins</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-fighter-blue"
                style={{ width: `${(winData[1].value / fighter.record.wins) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Decision</span>
              <span className="text-sm font-medium">{winData[2].value} wins</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-chart-2"
                style={{ width: `${(winData[2].value / fighter.record.wins) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FighterRadarChart({ fighterId }: { fighterId: string }) {
  const fighter = mockFighterProfiles[fighterId] || mockFighterProfiles.fighter1

  // Generate radar chart data based on fighter stats
  const radarData = [
    {
      subject: "Striking",
      A: fighter.stats.strikingAccuracy,
      fullMark: 100,
    },
    {
      subject: "Power",
      A: fighter.stats.strikesLandedPerMin * 10,
      fullMark: 100,
    },
    {
      subject: "Defense",
      A: 100 - fighter.stats.strikesAbsorbedPerMin * 10,
      fullMark: 100,
    },
    {
      subject: "Takedowns",
      A: fighter.stats.takedownAccuracy,
      fullMark: 100,
    },
    {
      subject: "TDD",
      A: fighter.stats.takedownDefense,
      fullMark: 100,
    },
    {
      subject: "Submissions",
      A: fighter.stats.submissionAverage * 20,
      fullMark: 100,
    },
  ]

  return (
    <ChartContainer config={{}} className="h-[400px]">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name={fighter.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
        <ChartTooltip />
      </RadarChart>
    </ChartContainer>
  )
}

function WeightClassActivityChart() {
  // Mock data for weight class activity
  const weightClassData = [
    { name: "Flyweight", fights: 24, finishes: 10, finishRate: 41.7 },
    { name: "Bantamweight", fights: 32, finishes: 15, finishRate: 46.9 },
    { name: "Featherweight", fights: 28, finishes: 14, finishRate: 50.0 },
    { name: "Lightweight", fights: 36, finishes: 18, finishRate: 50.0 },
    { name: "Welterweight", fights: 30, finishes: 16, finishRate: 53.3 },
    { name: "Middleweight", fights: 26, finishes: 15, finishRate: 57.7 },
    { name: "Light Heavyweight", fights: 22, finishes: 14, finishRate: 63.6 },
    { name: "Heavyweight", fights: 20, finishes: 16, finishRate: 80.0 },
  ]

  return (
    <ChartContainer config={{}} className="h-[400px]">
      <BarChart data={weightClassData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <ChartTooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="fights" name="Total Fights" fill="#8884d8" />
        <Bar yAxisId="left" dataKey="finishes" name="Finishes" fill="#82ca9d" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="finishRate"
          name="Finish Rate (%)"
          stroke="#ff7300"
          strokeWidth={2}
        />
      </BarChart>
    </ChartContainer>
  )
}
