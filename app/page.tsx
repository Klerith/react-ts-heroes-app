"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, SortAsc, Heart, Grid, List } from "lucide-react"
import type { Hero, HeroFilters } from "@/types/hero"
import { heroesData } from "@/data/heroes"
import { useFavorites } from "@/hooks/use-favorites"
import { usePagination } from "@/hooks/use-pagination"
import { HeroCard } from "@/components/hero-card"
import { HeroDetailsModal } from "@/components/hero-details-modal"
import { Pagination } from "@/components/pagination"
import { StatsDashboard } from "@/components/stats-dashboard"

export default function SuperheroApp() {
  const [heroes, setHeroes] = useState<Hero[]>(heroesData)
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const [filters, setFilters] = useState<HeroFilters>({
    search: "",
    team: "",
    category: "",
    universe: "",
    status: "",
    minStrength: 0,
  })

  const [newHero, setNewHero] = useState<Omit<Hero, "id">>({
    name: "",
    alias: "",
    powers: [],
    description: "",
    strength: 5,
    intelligence: 5,
    speed: 5,
    durability: 5,
    team: "",
    image: "/placeholder.svg?height=300&width=300",
    firstAppearance: new Date().getFullYear().toString(),
    status: "Active",
    category: "Hero",
    universe: "Other",
  })

  // Filter and sort heroes
  const filteredAndSortedHeroes = useMemo(() => {
    let filtered = heroes

    // Apply tab filter
    if (activeTab === "favorites") {
      filtered = filtered.filter((hero) => favorites.includes(hero.id))
    } else if (activeTab === "heroes") {
      filtered = filtered.filter((hero) => hero.category === "Hero")
    } else if (activeTab === "villains") {
      filtered = filtered.filter((hero) => hero.category === "Villain")
    }

    // Apply search and filters
    filtered = filtered.filter((hero) => {
      const matchesSearch =
        !filters.search ||
        hero.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        hero.alias.toLowerCase().includes(filters.search.toLowerCase()) ||
        hero.powers.some((power) => power.toLowerCase().includes(filters.search.toLowerCase())) ||
        hero.team.toLowerCase().includes(filters.search.toLowerCase())

      const matchesTeam = !filters.team || hero.team === filters.team
      const matchesCategory = !filters.category || hero.category === filters.category
      const matchesUniverse = !filters.universe || hero.universe === filters.universe
      const matchesStatus = !filters.status || hero.status === filters.status
      const matchesStrength = hero.strength >= filters.minStrength

      return matchesSearch && matchesTeam && matchesCategory && matchesUniverse && matchesStatus && matchesStrength
    })

    // Sort heroes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.alias.localeCompare(b.alias)
        case "strength":
          return b.strength - a.strength
        case "intelligence":
          return b.intelligence - a.intelligence
        case "firstAppearance":
          return Number.parseInt(a.firstAppearance) - Number.parseInt(b.firstAppearance)
        default:
          return 0
      }
    })

    return filtered
  }, [heroes, activeTab, favorites, filters, sortBy])

  const { paginatedItems, paginationInfo, goToPage, resetPagination } = usePagination(filteredAndSortedHeroes, 6)

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination()
  }, [filteredAndSortedHeroes.length, resetPagination])

  const handleAddHero = () => {
    if (newHero.name && newHero.alias) {
      const hero: Hero = {
        ...newHero,
        id: Date.now().toString(),
        powers: newHero.powers.length > 0 ? newHero.powers : ["Unknown Power"],
      }
      setHeroes([...heroes, hero])
      setNewHero({
        name: "",
        alias: "",
        powers: [],
        description: "",
        strength: 5,
        intelligence: 5,
        speed: 5,
        durability: 5,
        team: "",
        image: "/placeholder.svg?height=300&width=300",
        firstAppearance: new Date().getFullYear().toString(),
        status: "Active",
        category: "Hero",
        universe: "Other",
      })
      setIsAddModalOpen(false)
    }
  }

  const handlePowerInput = (powerString: string) => {
    const powers = powerString
      .split(",")
      .map((power) => power.trim())
      .filter((power) => power.length > 0)
    setNewHero({ ...newHero, powers })
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      team: "",
      category: "",
      universe: "",
      status: "",
      minStrength: 0,
    })
  }

  const teams = [...new Set(heroes.map((hero) => hero.team))].sort()
  const categories = [...new Set(heroes.map((hero) => hero.category))].sort()
  const universes = [...new Set(heroes.map((hero) => hero.universe))].sort()
  const statuses = [...new Set(heroes.map((hero) => hero.status))].sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Superhero Universe
          </h1>
          <p className="text-gray-600 text-lg">Discover, explore, and manage your favorite superheroes and villains</p>
        </div>

        {/* Stats Dashboard */}
        <StatsDashboard heroes={heroes} favorites={favorites} />

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search heroes, villains, powers, teams..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-12"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-12">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="intelligence">Intelligence</SelectItem>
                <SelectItem value="firstAppearance">First Appearance</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="h-12"
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>

            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="h-12">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Character
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Character</DialogTitle>
                  <DialogDescription>Create a new superhero or villain profile</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Real Name</Label>
                      <Input
                        id="name"
                        value={newHero.name}
                        onChange={(e) => setNewHero({ ...newHero, name: e.target.value })}
                        placeholder="e.g., Peter Parker"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alias">Hero/Villain Alias</Label>
                      <Input
                        id="alias"
                        value={newHero.alias}
                        onChange={(e) => setNewHero({ ...newHero, alias: e.target.value })}
                        placeholder="e.g., Spider-Man"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="powers">Powers (comma-separated)</Label>
                    <Input
                      id="powers"
                      value={newHero.powers.join(", ")}
                      onChange={(e) => handlePowerInput(e.target.value)}
                      placeholder="e.g., Super Strength, Flight, Heat Vision"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newHero.category}
                        onValueChange={(value: any) => setNewHero({ ...newHero, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hero">Hero</SelectItem>
                          <SelectItem value="Villain">Villain</SelectItem>
                          <SelectItem value="Anti-Hero">Anti-Hero</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="universe">Universe</Label>
                      <Select
                        value={newHero.universe}
                        onValueChange={(value: any) => setNewHero({ ...newHero, universe: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Marvel">Marvel</SelectItem>
                          <SelectItem value="DC">DC</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newHero.status}
                        onValueChange={(value: any) => setNewHero({ ...newHero, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Retired">Retired</SelectItem>
                          <SelectItem value="Deceased">Deceased</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="team">Team</Label>
                      <Input
                        id="team"
                        value={newHero.team}
                        onChange={(e) => setNewHero({ ...newHero, team: e.target.value })}
                        placeholder="e.g., Avengers"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstAppearance">First Appearance</Label>
                      <Input
                        id="firstAppearance"
                        value={newHero.firstAppearance}
                        onChange={(e) => setNewHero({ ...newHero, firstAppearance: e.target.value })}
                        placeholder="e.g., 1962"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Strength: {newHero.strength}/10</Label>
                        <Slider
                          value={[newHero.strength]}
                          onValueChange={([value]) => setNewHero({ ...newHero, strength: value })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Intelligence: {newHero.intelligence}/10</Label>
                        <Slider
                          value={[newHero.intelligence]}
                          onValueChange={([value]) => setNewHero({ ...newHero, intelligence: value })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Speed: {newHero.speed}/10</Label>
                        <Slider
                          value={[newHero.speed]}
                          onValueChange={([value]) => setNewHero({ ...newHero, speed: value })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Durability: {newHero.durability}/10</Label>
                        <Slider
                          value={[newHero.durability]}
                          onValueChange={([value]) => setNewHero({ ...newHero, durability: value })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newHero.description}
                      onChange={(e) => setNewHero({ ...newHero, description: e.target.value })}
                      placeholder="Brief description of the character..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddHero}>Add Character</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              <Button variant="ghost" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Team</Label>
                <Select value={filters.team} onValueChange={(value) => setFilters({ ...filters, team: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All teams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All teams">All teams</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All categories">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Universe</Label>
                <Select value={filters.universe} onValueChange={(value) => setFilters({ ...filters, universe: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All universes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All universes">All universes</SelectItem>
                    {universes.map((universe) => (
                      <SelectItem key={universe} value={universe}>
                        {universe}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All statuses">All statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <Label>Minimum Strength: {filters.minStrength}/10</Label>
              <Slider
                value={[filters.minStrength]}
                onValueChange={([value]) => setFilters({ ...filters, minStrength: value })}
                max={10}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Characters ({heroes.length})</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="heroes">Heroes ({heroes.filter((h) => h.category === "Hero").length})</TabsTrigger>
            <TabsTrigger value="villains">
              Villains ({heroes.filter((h) => h.category === "Villain").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing {paginatedItems.length} of {filteredAndSortedHeroes.length} characters
            </p>
            {Object.values(filters).some((filter) => filter !== "" && filter !== 0) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Filtered
              </Badge>
            )}
          </div>
        </div>

        {/* Character Grid */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {paginatedItems.map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                isFavorite={isFavorite(hero.id)}
                onToggleFavorite={toggleFavorite}
                onViewDetails={(hero) => {
                  setSelectedHero(hero)
                  setIsDetailsModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No characters found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        <Pagination paginationInfo={paginationInfo} onPageChange={goToPage} />

        {/* Hero Details Modal */}
        <HeroDetailsModal
          hero={selectedHero}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          isFavorite={selectedHero ? isFavorite(selectedHero.id) : false}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  )
}
