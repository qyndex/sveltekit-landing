<script lang="ts">
  interface Testimonial {
    id: string;
    author_name: string;
    author_title: string | null;
    content: string;
    rating: number | null;
  }
  interface Props {
    testimonials: Testimonial[];
  }
  let { testimonials }: Props = $props();
</script>

<section class="testimonials" id="testimonials">
  <div class="container">
    <h2>What people are saying</h2>
    {#if testimonials.length === 0}
      <p class="empty">No testimonials yet.</p>
    {:else}
      <div class="grid">
        {#each testimonials as testimonial (testimonial.id)}
          <blockquote class="card">
            <p class="quote">&ldquo;{testimonial.content}&rdquo;</p>
            {#if testimonial.rating}
              <div class="rating" aria-label="{testimonial.rating} out of 5 stars">
                {#each Array(5) as _, i}
                  <span class="star" aria-hidden="true">{i < testimonial.rating! ? '\u2605' : '\u2606'}</span>
                {/each}
              </div>
            {/if}
            <footer>
              <cite class="author">{testimonial.author_name}</cite>
              {#if testimonial.author_title}
                <span class="title">{testimonial.author_title}</span>
              {/if}
            </footer>
          </blockquote>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .testimonials { padding: 5rem 1rem; background: #f8fafc; }
  .container { max-width: 64rem; margin: 0 auto; }
  h2 { font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 3rem; }
  .empty { text-align: center; color: #94a3b8; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: 1.5rem; }
  .card {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .quote { color: #334155; line-height: 1.6; font-style: italic; flex: 1; }
  .rating { display: flex; gap: 0.125rem; }
  .star { color: #f59e0b; font-size: 1.125rem; }
  footer { display: flex; flex-direction: column; gap: 0.125rem; }
  .author { font-weight: 600; font-style: normal; color: #1e293b; }
  .title { font-size: 0.875rem; color: #64748b; }
</style>
