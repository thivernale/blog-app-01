import {
  configureStore,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const nameApi = createApi({
  reducerPath: 'nameApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getName: builder.query<string[], void>({
      //query: () => `names.json`,
      // highlight-start
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      queryFn(arg, queryApi, extraOptions, baseQuery) {
        return { data: ['tails', 'heads', 'edge'] };
      },
      // highlight-end
    }),
  }),
});

const searchSlice = createSlice({
  name: 'search',
  initialState: { search: '' },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

// export const useNameQuery = nameApi.endpoints.getName.useQuery;
export const { useGetNameQuery } = nameApi;

export const { setSearch } = searchSlice.actions;

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    [nameApi.reducerPath]: nameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const selectSearch = (state: RootState) => state.search.search as string;
const selectNames = (state: RootState) =>
  nameApi.endpoints.getName.select(undefined)(state)?.data;

export const processNames = (data: string[] | undefined, search: string) =>
  (data || [])
    .filter((n) => n.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10)
    .sort();

export const filteredNamesSelector = createSelector(
  // arbitrary number of selectors
  selectNames,
  selectSearch,
  // combiner function
  processNames,
);

// initiate store
store.dispatch(nameApi.endpoints.getName.initiate(undefined));
