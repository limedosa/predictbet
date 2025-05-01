"use client"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X, User, Calendar, BarChart2, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockFights, mockFighterProfiles, mockSocialPosts } from "@/lib/mock-data"
import { useOnClickOutside } from "@/hooks/use-click-outside"

interface SearchProps {
  onSelectFighter?: (fighterId: string) => void
  onSelectFight?: (fightId: string) => void
  onSelectTab?: (tab: string) => void
  onClose?: () => void
}

export default function EnhancedSearch({ onSelectFighter, onSelectFight, onSelectTab, onClose }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{
    fighters: { id: string; name: string; nickname?: string }[]
    fights: { id: string; title: string; date: string }[]
    stats: { title: string; description: string; tab: string }[]
    posts: { id: string; content: string; username: string }[]
  }>({
    fighters: [],
    fights: [],
    stats: [],
    posts: [],
  })

  const searchRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(searchRef, () => {
    setIsOpen(false)
    if (onClose) onClose()
  })

  useEffect(() => {
    if (query.length < 2) {
      setResults({ fighters: [], fights: [], stats: [], posts: [] })
      return
    }

    const lowerQuery = query.toLowerCase()

    // Search fighters
    const fighterResults = Object.entries(mockFighterProfiles)
      .filter(
        ([_, fighter]) =>
          fighter.name.toLowerCase().includes(lowerQuery) ||
          (fighter.nickname && fighter.nickname.toLowerCase().includes(lowerQuery)),
      )
      .map(([id, fighter]) => ({
        id,
        name: fighter.name,
        nickname: fighter.nickname,
      }))
      .slice(0, 3)

    // Search fights
    const fightResults = mockFights
      .filter(
        (fight) =>
          `${fight.fighterA} vs ${fight.fighterB}`.toLowerCase().includes(lowerQuery) ||
          fight.fighterA.toLowerCase().includes(lowerQuery) ||
          fight.fighterB.toLowerCase().includes(lowerQuery),
      )
      .map((fight) => ({
        id: fight.id,
        title: `${fight.fighterA} vs ${fight.fighterB}`,
        date: fight.date,
      }))
      .slice(0, 3)

    // Search stats and visualizations
    const statsResults = [
      { title: "Odds Movement", description: "Track betting odds changes over time", tab: "dashboard" },
      { title: "Fighter Comparison", description: "Compare stats between fighters", tab: "compare" },
      { title: "Win Distribution", description: "See how fighters win their matches", tab: "visualization" },
      { title: "Fighter Stats", description: "Detailed fighter statistics", tab: "fighters" },
      { title: "Fight Predictions", description: "AI-powered fight outcome predictions", tab: "predict" },
    ]
      .filter(
        (item) => item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 3)

    // Search social posts
    const postResults = mockSocialPosts
      .filter(
        (post) => post.content.toLowerCase().includes(lowerQuery) || post.username.toLowerCase().includes(lowerQuery),
      )
      .map((post) => ({
        id: post.id,
        content: post.content,
        username: post.username,
      }))
      .slice(0, 3)

    setResults({
      fighters: fighterResults,
      fights: fightResults,
      stats: statsResults,
      posts: postResults,
    })
  }, [query])

  const handleSelectFighter = (fighterId: string) => {
    if (onSelectFighter) {
      onSelectFighter(fighterId)
    }
    setIsOpen(false)
    setQuery("")
  }

  const handleSelectFight = (fightId: string) => {
    if (onSelectFight) {
      onSelectFight(fightId)
    }
    setIsOpen(false)
    setQuery("")
  }

  const handleSelectTab = (tab: string) => {
    if (onSelectTab) {
      onSelectTab(tab)
    }
    setIsOpen(false)
    setQuery("")
  }

  const hasResults =
    results.fighters.length > 0 || results.fights.length > 0 || results.stats.length > 0 || results.posts.length > 0

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="flex items-center">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search fighters, fights, stats, posts..."
            className="w-full pl-9 pr-10"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
              onClick={() => {
                setQuery("")
                setResults({ fighters: [], fights: [], stats: [], posts: [] })
              }}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      {isOpen && query.length >= 2 && (
        <Card className="absolute top-full z-50 mt-1 w-full overflow-hidden p-0">
          <div className="max-h-[500px] overflow-auto p-2">
            {!hasResults && (
              <div className="p-4 text-center text-sm text-muted-foreground">No results found for "{query}"</div>
            )}

            {results.fighters.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground flex items-center">
                  <User className="h-3 w-3 mr-1" /> Fighters
                </h3>
                <div className="space-y-1">
                  {results.fighters.map((fighter) => (
                    <button
                      key={fighter.id}
                      className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted"
                      onClick={() => handleSelectFighter(fighter.id)}
                    >
                      <Avatar className="h-8 w-8 bg-fighter-blue">
                        <AvatarFallback className="text-white">
                          {fighter.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{fighter.name}</div>
                        {fighter.nickname && <div className="text-xs text-muted-foreground">{fighter.nickname}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.fights.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Fights
                </h3>
                <div className="space-y-1">
                  {results.fights.map((fight) => (
                    <button
                      key={fight.id}
                      className="flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-muted"
                      onClick={() => handleSelectFight(fight.id)}
                    >
                      <div className="font-medium">{fight.title}</div>
                      <div className="text-xs text-muted-foreground">{fight.date}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.stats.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground flex items-center">
                  <BarChart2 className="h-3 w-3 mr-1" /> Stats & Visualizations
                </h3>
                <div className="space-y-1">
                  {results.stats.map((stat, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center justify-between rounded-md p-2 text-left hover:bg-muted"
                      onClick={() => handleSelectTab(stat.tab)}
                    >
                      <div>
                        <div className="font-medium">{stat.title}</div>
                        <div className="text-xs text-muted-foreground">{stat.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.posts.length > 0 && (
              <div>
                <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" /> Social Posts
                </h3>
                <div className="space-y-1">
                  {results.posts.map((post) => (
                    <button
                      key={post.id}
                      className="flex w-full flex-col rounded-md p-2 text-left hover:bg-muted"
                      onClick={() => handleSelectTab("social")}
                    >
                      <div className="font-medium">{post.username}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{post.content}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
