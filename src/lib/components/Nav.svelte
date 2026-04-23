<script lang="ts">
  import { page } from "$app/stores";

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];
</script>

<nav aria-label="Main navigation">
  <a href="/" class="logo" aria-label="Home">Launchpad</a>
  <ul>
    {#each links as link}
      <li><a href={link.href} aria-current={$page.url.pathname === link.href ? "page" : undefined}>{link.label}</a></li>
    {/each}
  </ul>
  <div class="actions">
    <a href="/login" class="btn-ghost">Log in</a>
    <a href="/signup" class="btn-primary">Get Started</a>
  </div>
</nav>

<style>
  nav { display: flex; align-items: center; gap: 2rem; padding: 1rem 2rem; border-bottom: 1px solid #f1f5f9; }
  .logo { font-weight: 700; font-size: 1.25rem; text-decoration: none; color: #1e293b; }
  ul { list-style: none; display: flex; gap: 1.5rem; padding: 0; margin: 0; flex: 1; }
  a { color: #475569; text-decoration: none; font-size: 0.9375rem; }
  a:hover { color: #1e293b; }
  .actions { display: flex; gap: 0.75rem; align-items: center; }
  .btn-ghost { padding: 0.5rem 1rem; }
  .btn-primary { padding: 0.5rem 1.25rem; background: #1e40af; color: white !important; border-radius: 0.5rem; font-weight: 600; }
</style>
