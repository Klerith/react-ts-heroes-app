"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Heart, Zap, Brain, Gauge, Shield, Calendar, Users, MapPin } from "lucide-react"
import Image from "next/image"
import type { Hero } from "@/types/hero"
import { cn } from "@/lib/utils"

interface HeroDetailsModalProps {
  hero: Hero | null
  isOpen: boolean
  onClose: () => void
  isFavorite: boolean
  onToggleFavorite: (heroId: string) => void
}

export function HeroDetailsModal({ hero, isOpen, onClose, isFavorite, onToggleFavorite }: HeroDetailsModalProps) {
  if (!hero) return null

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
        return "text-green-600"
      case "Retired":
        return "text-yellow-600"
      case "Deceased":
        return "text-red-600"
      default:
        return "text-gray-600"
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

  const totalPower = hero.strength + hero.intelligence + hero.speed + hero.durability

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{hero.alias}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image and basic info */}
          <div className="space-y-4">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image src={hero.image || "/placeholder.svg"} alt={hero.alias} fill className="object-cover" />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                onClick={() => onToggleFavorite(hero.id)}
              >
                <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("text-sm", getCategoryColor(hero.category))}>{hero.category}</Badge>
                <Badge className={cn("text-sm", getUniverseColor(hero.universe))}>{hero.universe}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Real Name:</strong> {hero.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Team:</strong> {hero.team}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>First Appearance:</strong> {hero.firstAppearance}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      hero.status === "Active"
                        ? "bg-green-500"
                        : hero.status === "Retired"
                          ? "bg-yellow-500"
                          : hero.status === "Deceased"
                            ? "bg-red-500"
                            : "bg-gray-500",
                    )}
                  />
                  <span className={cn("text-sm font-medium", getStatusColor(hero.status))}>{hero.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details and stats */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{hero.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Abilities & Stats</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Strength</span>
                    </div>
                    <span className="text-sm font-bold">{hero.strength}/10</span>
                  </div>
                  <Progress value={hero.strength * 10} className="h-3" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Intelligence</span>
                    </div>
                    <span className="text-sm font-bold">{hero.intelligence}/10</span>
                  </div>
                  <Progress value={hero.intelligence * 10} className="h-3" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Speed</span>
                    </div>
                    <span className="text-sm font-bold">{hero.speed}/10</span>
                  </div>
                  <Progress value={hero.speed * 10} className="h-3" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Durability</span>
                    </div>
                    <span className="text-sm font-bold">{hero.durability}/10</span>
                  </div>
                  <Progress value={hero.durability * 10} className="h-3" />
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total Power Level</span>
                    <span className="text-lg font-bold text-blue-600">{totalPower}/40</span>
                  </div>
                  <Progress value={(totalPower / 40) * 100} className="h-4 mt-2" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Powers & Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {hero.powers.map((power, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {power}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
