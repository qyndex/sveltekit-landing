<script lang="ts">
  interface Props {
    tagline: string;
    cta: { label: string; href: string };
  }
  let { tagline, cta }: Props = $props();
</script>

<section class="hero">
  <div class="container">
    <h1>{tagline}</h1>
    <p class="subtitle">The modern platform for ambitious developers. Build, deploy, scale.</p>
    <div class="cta-group">
      <a href={cta.href} class="btn btn-primary">{cta.label}</a>
      <a href="/demo" class="btn btn-secondary">Watch Demo</a>
    </div>
  </div>
</section>

<style>
  .hero {
    background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
    color: white;
    padding: 6rem 1rem;
    text-align: center;
  }
  .container { max-width: 56rem; margin: 0 auto; }
  h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.1; }
  .subtitle { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem; }
  .cta-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn { padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s; }
  .btn:hover { opacity: 0.9; }
  .btn-primary { background: white; color: #1e40af; }
  .btn-secondary { border: 2px solid white; color: white; }
</style>
