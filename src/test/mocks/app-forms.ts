// Mock for $app/forms — provides a no-op enhance action for unit tests.
// SvelteKit form enhancement is tested via E2E (Playwright), not unit tests.
import type { SubmitFunction } from "@sveltejs/kit";

export function enhance(
  form: HTMLFormElement,
  _submit?: SubmitFunction
): { destroy: () => void } {
  // No-op in unit tests — form submits normally (but jsdom won't navigate)
  return { destroy: () => {} };
}
