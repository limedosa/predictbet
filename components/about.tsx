import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">About PredictBet</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Helping UFC fans make informed predictions through data analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            PredictBet is a cutting-edge platform that combines betting odds data with social media sentiment analysis
            to provide UFC fans with comprehensive insights for making informed predictions about fight outcomes.
          </p>

          <h3 className="text-lg font-medium mt-6">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Track upcoming UFC fights and betting odds movement</li>
            <li>Analyze the relationship between public sentiment and betting odds</li>
            <li>Get AI-powered fight outcome predictions</li>
            <li>Monitor social media sentiment about fighters in real-time</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Our Technology</h3>
          <p>
            PredictBet uses advanced machine learning algorithms to analyze betting patterns and social media sentiment.
            Our proprietary prediction model takes into account historical fight data, fighter statistics, betting
            trends, and public sentiment to generate accurate fight outcome predictions.
          </p>

          <div className="bg-muted p-4 rounded-lg mt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> PredictBet is for informational purposes only. We do not encourage or promote
              gambling. Always gamble responsibly and be aware of the risks involved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
