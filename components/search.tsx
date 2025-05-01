"use client"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockFights, mockFighterProfiles } from "@/lib/mock-data"
import { useOnClickOutside } from "@/hooks/use-click-outside"

interface SearchProps {
  onSelectFighter?: (fighterId: string) => void
  onSelectFight?: (fightId: string) => void
  onClose?: () => void
}

export default function Search({ onSelectFighter, onSelectFight, onClose }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{
    fighters: { id: string; name: string; nickname?: string }[]
    fights: { id: string; title: string; date: string }[]
  }>({
    fighters: [],
    fights: [],
  })

  const searchRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(searchRef, () => {
    setIsOpen(false)
    if (onClose) onClose()
  })

  useEffect(() => {
    if (query.length < 2) {
      setResults({ fighters: [], fights: [] })
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
      .slice(0, 5)

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
      .slice(0, 5)

    setResults({
      fighters: fighterResults,
      fights: fightResults,
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

  const hasResults = results.fighters.length > 0 || results.fights.length > 0

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search fighters, fights..."
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
                setResults({ fighters: [], fights: [] })
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
          <div className="max-h-[300px] overflow-auto p-2">
            {!hasResults && (
              <div className="p-4 text-center text-sm text-muted-foreground">No results found for "{query}"</div>
            )}

            {results.fighters.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">Fighters</h3>
                <div className="space-y-1">
                  {results.fighters.map((fighter) => (
                    <button
                      key={fighter.id}
                      className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted"
                      onClick={() => handleSelectFighter(fighter.id)}
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
                        <div className="font-medium">{fighter.name}</div>
                        {fighter.nickname && <div className="text-xs text-muted-foreground">{fighter.nickname}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.fights.length > 0 && (
              <div>
                <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">Fights</h3>
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
          </div>
        </Card>
      )}
    </div>
  )
}
