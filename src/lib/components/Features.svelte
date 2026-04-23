<script lang="ts">
  interface Feature { icon: string; title: string; body: string; }
  interface Props { features: Feature[]; }
  let { features }: Props = $props();
</script>

<section class="features">
  <div class="container">
    <h2>Everything you need</h2>
    <div class="grid">
      {#each features as feature}
        <article class="card">
          <span class="icon" aria-hidden="true">{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .features { padding: 5rem 1rem; background: #f8fafc; }
  .container { max-width: 64rem; margin: 0 auto; }
  h2 { font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 3rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1.5rem; }
  .card { background: white; border-radius: 0.75rem; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .icon { font-size: 2rem; }
  h3 { font-size: 1.125rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
  p { color: #64748b; line-height: 1.6; }
</style>
