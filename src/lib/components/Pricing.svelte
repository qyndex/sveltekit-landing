<script lang="ts">
  interface Plan { name: string; price: string; period: string; features: string[]; cta: string; featured?: boolean; }
  interface Props { plans: Plan[]; }
  let { plans }: Props = $props();
</script>

<section class="pricing">
  <div class="container">
    <h2>Simple, transparent pricing</h2>
    <div class="grid">
      {#each plans as plan}
        <div class="card" class:featured={plan.featured}>
          <h3>{plan.name}</h3>
          <div class="price">
            <span class="amount">{plan.price}</span>
            <span class="period">{plan.period}</span>
          </div>
          <ul>
            {#each plan.features as feature}
              <li>✓ {feature}</li>
            {/each}
          </ul>
          <a href="/signup?plan={plan.name.toLowerCase()}" class="btn">{plan.cta}</a>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .pricing { padding: 5rem 1rem; }
  .container { max-width: 64rem; margin: 0 auto; }
  h2 { font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 3rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: 1.5rem; }
  .card { border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; text-align: center; }
  .card.featured { border-color: #1e40af; box-shadow: 0 0 0 3px rgba(30,64,175,0.15); }
  h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; }
  .price { margin-bottom: 1.5rem; }
  .amount { font-size: 2.5rem; font-weight: 800; }
  .period { color: #94a3b8; font-size: 0.875rem; }
  ul { list-style: none; padding: 0; margin: 0 0 2rem; text-align: left; display: grid; gap: 0.5rem; }
  li { color: #475569; font-size: 0.9375rem; }
  .btn { display: block; padding: 0.75rem 1.5rem; border-radius: 0.5rem; background: #1e40af; color: white; text-decoration: none; font-weight: 600; }
</style>
