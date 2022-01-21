import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    return await http.get("/games")
      .then(res => res.data)
      .catch(() => [])
  }
)

export const fetchGame = createAsyncThunk(
  'games/fetchGame',
  async (gameId: string) => {
    return await http.get(`/games/${gameId}`)
      .then(res => res.data)
      .catch(() => false)
  }
)

export const deleteGame = async (gameId: string) => {
  return await http.delete(`/games/${gameId}`)
    .then(res => res.status)
    .catch(() => false)
}

export const createGame = async (game) => {
  return await http.post(`/games`, game)
    .then(res => res.data)
    .catch(() => false)
}
