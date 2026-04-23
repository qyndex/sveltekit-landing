<script lang="ts">
  import { enhance } from "$app/forms";

  interface Props {
    /** Contextual label shown above the form (e.g. "Join the waitlist") */
    heading?: string;
  }
  let { heading = "Join the waitlist" }: Props = $props();

  let submitted = $state(false);
  let errorMsg = $state<string | null>(null);
</script>

<section class="waitlist" id="waitlist">
  <div class="container">
    <h2>{heading}</h2>
    <p class="subtitle">Be the first to know when new features launch.</p>

    {#if submitted}
      <div class="success" role="status">
        <p>You're on the list! We'll be in touch.</p>
      </div>
    {:else}
      <form
        method="POST"
        action="?/joinWaitlist"
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === 'success') {
              submitted = true;
              errorMsg = null;
            } else if (result.type === 'failure') {
              errorMsg = (result.data as { error?: string })?.error ?? 'Something went wrong. Please try again.';
            } else {
              errorMsg = 'Something went wrong. Please try again.';
            }
          };
        }}
      >
        <div class="fields">
          <div class="field">
            <label for="waitlist-name">Name <span class="optional">(optional)</span></label>
            <input type="text" id="waitlist-name" name="name" placeholder="Jane Doe" autocomplete="name" />
          </div>
          <div class="field">
            <label for="waitlist-email">Email <span class="required">*</span></label>
            <input type="email" id="waitlist-email" name="email" placeholder="jane@example.com" required autocomplete="email" />
          </div>
        </div>
        <input type="hidden" name="source" value="landing-page" />
        <button type="submit">Join Waitlist</button>
        {#if errorMsg}
          <p class="error" role="alert">{errorMsg}</p>
        {/if}
      </form>
    {/if}
  </div>
</section>

<style>
  .waitlist { padding: 5rem 1rem; background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); color: white; }
  .container { max-width: 32rem; margin: 0 auto; text-align: center; }
  h2 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
  .subtitle { opacity: 0.9; margin-bottom: 2rem; }
  .fields { display: grid; gap: 1rem; margin-bottom: 1rem; text-align: left; }
  .field { display: flex; flex-direction: column; gap: 0.25rem; }
  label { font-size: 0.875rem; font-weight: 600; }
  .optional { font-weight: 400; opacity: 0.7; }
  .required { color: #fca5a5; }
  input[type="text"], input[type="email"] {
    padding: 0.75rem 1rem;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 0.5rem;
    background: rgba(255,255,255,0.1);
    color: white;
    font-size: 1rem;
  }
  input::placeholder { color: rgba(255,255,255,0.5); }
  input:focus { outline: none; border-color: white; background: rgba(255,255,255,0.15); }
  button {
    width: 100%;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 0.5rem;
    background: white;
    color: #1e40af;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  button:hover { opacity: 0.9; }
  .success {
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 0.75rem;
    padding: 2rem;
  }
  .success p { font-size: 1.125rem; font-weight: 600; }
  .error { color: #fca5a5; font-size: 0.875rem; margin-top: 0.5rem; }
</style>
