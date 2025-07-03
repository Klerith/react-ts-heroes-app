"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react"
import Image from "next/image"
import type { Hero } from "@/types/hero"
import { cn } from "@/lib/utils"

interface HeroCardProps {
  hero: Hero
  isFavorite: boolean
  onToggleFavorite: (heroId: string) => void
  onViewDetails: (hero: Hero) => void
}

export function HeroCard({ hero, isFavorite, onToggleFavorite, onViewDetails }: HeroCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Hero":
        return "bg-green-100 text-green-800 border-green-200"
      case "Villain":
        return "bg-red-100 text-red-800 border-red-200"
      case "Anti-Hero":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Retired":
        return "bg-yellow-500"
      case "Deceased":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUniverseColor = (universe: string) => {
    switch (universe) {
      case "Marvel":
        return "bg-red-600 text-white"
      case "DC":
        return "bg-blue-600 text-white"
      default:
        return "bg-purple-600 text-white"
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={hero.image || "/placeholder.svg"}
          alt={hero.alias}
          fill
          className={cn(
            "object-cover transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse" />
        )}

        {/* Status indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full", getStatusColor(hero.status))} />
          <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
            {hero.status}
          </Badge>
        </div>

        {/* Universe badge */}
        <Badge className={cn("absolute top-3 right-3 text-xs", getUniverseColor(hero.universe))}>{hero.universe}</Badge>

        {/* Favorite button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(hero.id)
          }}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </Button>

        {/* View details button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            onViewDetails(hero)
          }}
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight">{hero.alias}</h3>
            <p className="text-sm text-gray-600">{hero.name}</p>
          </div>
          <Badge className={cn("text-xs", getCategoryColor(hero.category))}>{hero.category}</Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {hero.team}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{hero.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium">Strength</span>
            </div>
            <Progress value={hero.strength * 10} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Intelligence</span>
            </div>
            <Progress value={hero.intelligence * 10} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <Progress value={hero.speed * 10} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium">Durability</span>
            </div>
            <Progress value={hero.durability * 10} className="h-2" />
          </div>
        </div>

        {/* Powers */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Powers:</h4>
          <div className="flex flex-wrap gap-1">
            {hero.powers.slice(0, 2).map((power, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {power}
              </Badge>
            ))}
            {hero.powers.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-100">
                +{hero.powers.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">First appeared: {hero.firstAppearance}</div>
      </CardContent>
    </Card>
  )
}
