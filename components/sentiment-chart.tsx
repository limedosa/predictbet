"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import { mockSentimentData } from "@/lib/mock-data"

interface SentimentChartProps {
  fightId: string
}

export default function SentimentChart({ fightId }: SentimentChartProps) {
  // Get data for the selected fight
  const data = mockSentimentData[fightId] || mockSentimentData.default

  return (
    <ChartContainer
      config={{
        sentiment: {
          label: "Public Sentiment",
          color: "hsl(var(--chart-1))",
        },
        odds: {
          label: "Betting Odds",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        />
        <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
        <YAxis yAxisId="right" orientation="right" domain={[-500, 500]} />
        <ChartTooltip content={<CustomTooltip />} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sentiment"
          stroke="var(--color-sentiment)"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="right" type="monotone" dataKey="odds" stroke="var(--color-odds)" strokeWidth={2} />
        <Legend />
      </LineChart>
    </ChartContainer>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })

    const sentiment = payload[0].value
    const odds = payload[1].value
    const keyTweet = payload[0].payload.keyTweet

    return (
      <Card className="p-0 border shadow-md">
        <CardContent className="p-3 space-y-2">
          <p className="font-medium">{date}</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Sentiment</p>
              <p className="font-medium">{sentiment}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Odds</p>
              <p className="font-medium">{odds > 0 ? `+${odds}` : odds}</p>
            </div>
          </div>
          {keyTweet && (
            <div className="border-t pt-2 mt-2">
              <p className="text-xs text-muted-foreground">Key Post</p>
              <p className="text-sm">{keyTweet}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return null
}
