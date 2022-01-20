import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}
const initialState: IGamesState = {
  games: [
    {
      created_at: "2022-01-19T19:50:56.101083",
      release_date: "2022-01-11T15:36:38",
      id: "0594cb67-221e-402b-b865-d65df50834a0",
      name: "God of war",
      word_count: 123,
      available_languages: ["en", "de", "ru", "it", "ko", "pt"],
    },
  ],
};

const gamesSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
});

// export const {} = gamesSlice.actions;
export default gamesSlice.reducer;
