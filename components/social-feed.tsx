"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockFights, mockSocialPosts } from "@/lib/mock-data"
import { Twitter, MessageSquare } from "lucide-react"

export default function SocialFeed() {
  const [selectedFighterId, setSelectedFighterId] = useState<string>("")

  // Create a list of all fighters from the fights data
  const fighters = mockFights.reduce(
    (acc, fight) => {
      acc.push({ id: `A-${fight.id}`, name: fight.fighterA })
      acc.push({ id: `B-${fight.id}`, name: fight.fighterB })
      return acc
    },
    [] as { id: string; name: string }[],
  )

  // Get posts for the selected fighter
  const posts = selectedFighterId
    ? mockSocialPosts.filter((post) => post.fighterId === selectedFighterId)
    : mockSocialPosts.slice(0, 10)

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Social Sentiment Feed</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fighter Social Media Sentiment</CardTitle>
          <CardDescription>
            View recent social media posts about UFC fighters and their sentiment analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Filter by Fighter</label>
            <Select value={selectedFighterId} onValueChange={setSelectedFighterId}>
              <SelectTrigger>
                <SelectValue placeholder="All fighters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All fighters</SelectItem>
                {fighters.map((fighter) => (
                  <SelectItem key={fighter.id} value={fighter.id}>
                    {fighter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {posts.map((post) => {
                const fighter = fighters.find((f) => f.id === post.fighterId)

                return (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="mr-4 mt-0.5">
                        {post.platform === "twitter" ? (
                          <Twitter className="h-5 w-5 text-sky-500" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {post.username}
                            {fighter && (
                              <span className="ml-2 text-sm text-muted-foreground">discussing {fighter.name}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.timestamp).toLocaleString()}
                            </span>
                            <SentimentBadge sentiment={post.sentiment} />
                          </div>
                        </div>
                        <p>{post.content}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

function SentimentBadge({ sentiment }: { sentiment: "positive" | "negative" | "neutral" }) {
  const variants = {
    positive:
      "bg-sentiment-positive/20 text-sentiment-positive dark:bg-sentiment-positive/30 dark:text-sentiment-positive",
    negative:
      "bg-sentiment-negative/20 text-sentiment-negative dark:bg-sentiment-negative/30 dark:text-sentiment-negative",
    neutral: "bg-sentiment-neutral/20 text-sentiment-neutral dark:bg-sentiment-neutral/30 dark:text-sentiment-neutral",
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variants[sentiment]}`}>
      {sentiment === "positive" && "+"}
      {sentiment === "negative" && "-"}
      {sentiment === "neutral" && "○"} {sentiment}
    </span>
  )
}
