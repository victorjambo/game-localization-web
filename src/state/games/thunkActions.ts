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
