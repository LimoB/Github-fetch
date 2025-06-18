import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface GitHubState {
  user: any;
  repos: any[];
  loading: boolean;
  error: string | null;
}

const initialState: GitHubState = {
  user: null,
  repos: [],
  loading: false,
  error: null,
};

export const fetchGitHubData = createAsyncThunk(
  'github/fetchGitHubData',
  async (username: string, thunkAPI) => {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('User not found');
    const user = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!repoRes.ok) throw new Error('Failed to fetch repos');
    const repos = await repoRes.json();

    return { user, repos };
  }
);

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.repos = [];
      })
      .addCase(fetchGitHubData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.repos = action.payload.repos;
      })
      .addCase(fetchGitHubData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default githubSlice.reducer;
