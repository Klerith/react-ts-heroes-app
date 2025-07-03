"use client"

import { useState, useEffect } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("superhero-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (heroId: string) => {
    const newFavorites = favorites.includes(heroId) ? favorites.filter((id) => id !== heroId) : [...favorites, heroId]

    setFavorites(newFavorites)
    localStorage.setItem("superhero-favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (heroId: string) => favorites.includes(heroId)

  return { favorites, toggleFavorite, isFavorite }
}
