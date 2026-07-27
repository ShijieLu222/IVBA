import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { components } from "./generated/schema";

type HealthResponse = components["schemas"]["HealthResponse"];
type Profile = components["schemas"]["Profile"];
type ErrorResponse = components["schemas"]["ErrorResponse"];

function readEnv(name: string): string | undefined {
  try {
    // Works in Next/Node; Expo inlines EXPO_PUBLIC_* at bundle time.
    return (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.[name];
  } catch {
    return undefined;
  }
}

const baseUrl =
  readEnv("NEXT_PUBLIC_API_BASE_URL") ??
  readEnv("EXPO_PUBLIC_API_BASE_URL") ??
  "http://localhost:8080";

export const ivbaApi = createApi({
  reducerPath: "ivbaApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Auth token wiring comes later (SecureStore / Auth SDK).
      return headers;
    },
  }),
  tagTypes: ["Me"],
  endpoints: (build) => ({
    getHealthz: build.query<HealthResponse, void>({
      query: () => "/healthz",
    }),
    getMe: build.query<Profile, void>({
      query: () => "/v1/me",
      providesTags: ["Me"],
      // Scaffold: surface typed error body when Auth is not configured.
      transformErrorResponse: (response) =>
        response.data as ErrorResponse | undefined,
    }),
  }),
});

export const { useGetHealthzQuery, useGetMeQuery } = ivbaApi;
