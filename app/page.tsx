import {
  Search,
  Plus,
  Filter,
  SortAsc,
  Heart,
  Grid,
  Users,
  Zap,
  Trophy,
  Eye,
  Brain,
  Gauge,
  Shield,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function SuperheroApp() {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  12 Heroes
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  2 Villains
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
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">18.8% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strongest</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Superman</div>
              <p className="text-xs text-muted-foreground">Strength: 10/10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Smartest</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Batman</div>
              <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search heroes, villains, powers, teams..." className="pl-12 h-12 text-lg" />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Button variant="outline" className="h-12 bg-transparent">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by Name
            </Button>

            <Button variant="outline" className="h-12 bg-transparent">
              <Grid className="h-4 w-4" />
            </Button>

            <Button className="h-12">
              <Plus className="h-4 w-4 mr-2" />
              Add Character
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Advanced Filters</h3>
            <Button variant="ghost">Clear All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Team</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All teams
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All categories
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Universe</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All universes
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                All statuses
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Minimum Strength: 0/10</label>
            <div className="relative flex w-full touch-none select-none items-center mt-2">
              <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <div className="absolute h-full bg-primary" style={{ width: "0%" }} />
              </div>
              <div className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains">Villains (2)</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Hero Card 1 - Superman */}
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Superman"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              {/* Status indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                  Active
                </Badge>
              </div>

              {/* Universe badge */}
              <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">DC</Badge>

              {/* Favorite button */}
              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>

              {/* View details button */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">Superman</h3>
                  <p className="text-sm text-gray-600">Clark Kent</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">Hero</Badge>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                Justice League
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                The Last Son of Krypton, protector of Earth and symbol of hope for all humanity.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Strength</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Intelligence</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Speed</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-medium">Durability</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>

              {/* Powers */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Super Strength
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Flight
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    +4 more
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">First appeared: 1938</div>
            </CardContent>
          </Card>

          {/* Hero Card 2 - Batman */}
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Batman"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                  Active
                </Badge>
              </div>

              <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">DC</Badge>

              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4 text-gray-600" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">Batman</h3>
                  <p className="text-sm text-gray-600">Bruce Wayne</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">Hero</Badge>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                Justice League
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                The Dark Knight of Gotham City, using fear as a weapon against crime and corruption.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Strength</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Intelligence</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Speed</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-medium">Durability</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Martial Arts
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Detective Skills
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    +3 more
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">First appeared: 1939</div>
            </CardContent>
          </Card>

          {/* Hero Card 3 - Wonder Woman */}
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Wonder Woman"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                  Active
                </Badge>
              </div>

              <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">DC</Badge>

              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">Wonder Woman</h3>
                  <p className="text-sm text-gray-600">Diana Prince</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">Hero</Badge>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                Justice League
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                Amazonian princess and warrior, champion of truth, justice, and equality.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Strength</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Intelligence</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Speed</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-medium">Durability</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Super Strength
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Flight
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    +4 more
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">First appeared: 1941</div>
            </CardContent>
          </Card>

          {/* Hero Card 4 - Spider-Man */}
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Spider-Man"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                  Active
                </Badge>
              </div>

              <Badge className="absolute top-3 right-3 text-xs bg-red-600 text-white">Marvel</Badge>

              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4 text-gray-600" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">Spider-Man</h3>
                  <p className="text-sm text-gray-600">Peter Parker</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">Hero</Badge>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                Avengers
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                Your friendly neighborhood Spider-Man, with great power comes great responsibility.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Strength</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Intelligence</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Speed</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-medium">Durability</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Wall Crawling
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Spider Sense
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    +3 more
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">First appeared: 1962</div>
            </CardContent>
          </Card>

          {/* Hero Card 5 - Iron Man */}
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Iron Man"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                  Active
                </Badge>
              </div>

              <Badge className="absolute top-3 right-3 text-xs bg-red-600 text-white">Marvel</Badge>

              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">Iron Man</h3>
                  <p className="text-sm text-gray-600">Tony Stark</p>
                </div>
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">Hero</Badge>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                Avengers
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                Billionaire genius inventor who uses his technology to protect the world.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Strength</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Intelligence</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Speed</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-medium">Durability</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Powered Armor
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Genius Intellect
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    +3 more
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">First appeared: 1963</div>
            </CardContent>
          </Card>

          {/* Hero Card 6 - Deadpool */}
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Deadpool"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                  Active
                </Badge>
              </div>

              <Badge className="absolute top-3 right-3 text-xs bg-red-600 text-white">Marvel</Badge>

              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4 text-gray-600" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">Deadpool</h3>
                  <p className="text-sm text-gray-600">Wade Wilson</p>
                </div>
                <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">Anti-Hero</Badge>
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                X-Force
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                The Merc with a Mouth, an unpredictable anti-hero with accelerated healing powers.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium">Strength</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium">Intelligence</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium">Speed</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-purple-500" />
                    <span className="text-xs font-medium">Durability</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    Healing Factor
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Martial Arts
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-gray-100">
                    +3 more
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">First appeared: 1991</div>
            </CardContent>
          </Card>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
