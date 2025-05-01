"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { mockFights, mockPredictions } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"

export default function Predictor() {
  const [selectedFightId, setSelectedFightId] = useState<string>("")

  const selectedFight = mockFights.find((fight) => fight.id === selectedFightId)
  const prediction = selectedFightId ? mockPredictions[selectedFightId] : null

  const disagreesWithOdds =
    prediction &&
    ((prediction.predictedWinner === "fighterA" && selectedFight?.currentOdds > 0) ||
      (prediction.predictedWinner === "fighterB" && selectedFight?.currentOdds < 0))

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fight Outcome Predictor</h1>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Predict Fight Outcome</CardTitle>
          <CardDescription>Select a fight to see the predicted outcome based on our AI model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
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

          {prediction && selectedFight && (
            <div className="space-y-6">
              <div className="text-center py-6 border rounded-lg bg-gradient-to-r from-chart-1/10 to-chart-2/10">
                <h3 className="text-xl font-bold mb-2">Predicted Winner</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
                  {prediction.predictedWinner === "fighterA" ? selectedFight.fighterA : selectedFight.fighterB}
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Model Confidence</span>
                  <span className="text-sm font-medium">{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>

              {disagreesWithOdds && (
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Prediction Disagrees with Betting Odds</AlertTitle>
                  <AlertDescription>
                    Our model predicts{" "}
                    {prediction.predictedWinner === "fighterA" ? selectedFight.fighterA : selectedFight.fighterB} will
                    win, but they are currently the underdog according to betting odds.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="border rounded-lg p-4 bg-fighter-blue/10 border-fighter-blue/30">
                  <h4 className="font-medium mb-2 text-fighter-blue">{selectedFight.fighterA}</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>Win Probability: {prediction.fighterAProb}%</p>
                    <p>
                      Current Odds:{" "}
                      <span className={selectedFight.currentOdds > 0 ? "text-odds-positive" : "text-odds-negative"}>
                        {selectedFight.currentOdds > 0 ? `+${selectedFight.currentOdds}` : selectedFight.currentOdds}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-fighter-red/10 border-fighter-red/30">
                  <h4 className="font-medium mb-2 text-fighter-red">{selectedFight.fighterB}</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>Win Probability: {prediction.fighterBProb}%</p>
                    <p>
                      Current Odds:{" "}
                      <span className={selectedFight.currentOdds < 0 ? "text-odds-negative" : "text-odds-positive"}>
                        {selectedFight.currentOdds < 0
                          ? selectedFight.currentOdds
                          : `+${Math.abs(selectedFight.currentOdds)}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
