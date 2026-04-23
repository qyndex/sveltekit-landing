// Mock for $app/stores — provides a minimal page store for unit tests.
import { writable } from "svelte/store";

export const page = writable({
  url: new URL("http://localhost:5173/"),
  params: {},
  route: { id: "/" },
  status: 200,
  error: null,
  data: {},
  form: null,
});

export const navigating = writable(null);
export const updated = writable(false);
