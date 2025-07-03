export interface Hero {
  id: string
  name: string
  alias: string
  powers: string[]
  description: string
  strength: number
  intelligence: number
  speed: number
  durability: number
  team: string
  image: string
  firstAppearance: string
  status: "Active" | "Retired" | "Deceased" | "Unknown"
  category: "Hero" | "Villain" | "Anti-Hero"
  universe: "Marvel" | "DC" | "Other"
}

export interface HeroFilters {
  search: string
  team: string
  category: string
  universe: string
  status: string
  minStrength: number
}

export interface PaginationInfo {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
