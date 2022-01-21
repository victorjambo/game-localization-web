import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGames, fetchGame } from "./thunkActions";

export const defaultGame = {
  created_at: "",
  release_date: "",
  id: "",
  name: "",
  word_count: 0,
  available_languages: [],
}

interface IGame {
  created_at: string;
  release_date: string;
  id: string;
  name: string;
  word_count: number;
  available_languages: string[];
}

interface IGamesState {
  games: IGame[];
  game: IGame;
  loadingGames: boolean;
  errorGames: boolean;
  loadingGame: boolean;
  errorGame: boolean;
  gameNotFound: boolean;
}

const initialState: IGamesState = {
  games: [],
  game: defaultGame,
  loadingGames: false,
  errorGames: false,
  errorGame: false,
  loadingGame: false,
  gameNotFound: false,
};

const gamesSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    appendGame(state, action: PayloadAction<IGame>) {
      state.games.unshift(action.payload)
    },
    updateGameField(state, action: PayloadAction<{field: string, value: string | string[]}>) {
      const { field, value } = action.payload;
      (state.game as any)[field] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchGames.fulfilled,
        (state, action: PayloadAction<{ games: IGame[] }>) => {
          state.loadingGames = false;
          state.games = action.payload.games;
        }
      )
      .addCase(fetchGames.pending, (state) => {
        state.loadingGames = true;
      })
      .addCase(fetchGames.rejected, (state) => {
        state.errorGames = true;
      })
      .addCase(fetchGame.fulfilled, (state, action: PayloadAction<IGame>) => {
        state.loadingGame = false;
        if (action.payload) {
          state.game = action.payload;
          state.gameNotFound = false;
        } else {
          state.gameNotFound = true;
          state.game = defaultGame;
        }
      })
      .addCase(fetchGame.pending, (state) => {
        state.loadingGame = true;
      })
      .addCase(fetchGame.rejected, (state) => {
        state.loadingGame = true;
      });
  },
});

export const { appendGame, updateGameField } = gamesSlice.actions;
export default gamesSlice.reducer;
