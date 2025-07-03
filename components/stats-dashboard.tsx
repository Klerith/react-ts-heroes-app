"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Hero } from "@/types/hero"
import { Users, Heart, Zap, Trophy } from "lucide-react"

interface StatsDashboardProps {
  heroes: Hero[]
  favorites: string[]
}

export function StatsDashboard({ heroes, favorites }: StatsDashboardProps) {
  const stats = {
    total: heroes.length,
    favorites: favorites.length,
    heroes: heroes.filter((h) => h.category === "Hero").length,
    villains: heroes.filter((h) => h.category === "Villain").length,
    antiHeroes: heroes.filter((h) => h.category === "Anti-Hero").length,
    marvel: heroes.filter((h) => h.universe === "Marvel").length,
    dc: heroes.filter((h) => h.universe === "DC").length,
    active: heroes.filter((h) => h.status === "Active").length,
    strongest: heroes.reduce((prev, current) => (prev.strength > current.strength ? prev : current)),
    smartest: heroes.reduce((prev, current) => (prev.intelligence > current.intelligence ? prev : current)),
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {stats.heroes} Heroes
            </Badge>
            <Badge variant="destructive" className="text-xs">
              {stats.villains} Villains
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorites</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.favorites}</div>
          <p className="text-xs text-muted-foreground">
            {((stats.favorites / stats.total) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Strongest</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{stats.strongest.alias}</div>
          <p className="text-xs text-muted-foreground">Strength: {stats.strongest.strength}/10</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Smartest</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{stats.smartest.alias}</div>
          <p className="text-xs text-muted-foreground">Intelligence: {stats.smartest.intelligence}/10</p>
        </CardContent>
      </Card>
    </div>
  )
}
