<script lang="ts">
  interface FaqItem {
    id: string;
    question: string;
    answer: string;
  }
  interface Props {
    faqs: FaqItem[];
  }
  let { faqs }: Props = $props();

  let openId = $state<string | null>(null);

  function toggle(id: string) {
    openId = openId === id ? null : id;
  }
</script>

<section class="faq" id="faq">
  <div class="container">
    <h2>Frequently asked questions</h2>
    {#if faqs.length === 0}
      <p class="empty">No FAQs yet.</p>
    {:else}
      <dl class="accordion">
        {#each faqs as faq (faq.id)}
          {@const isOpen = openId === faq.id}
          <div class="item" class:open={isOpen}>
            <dt>
              <button
                type="button"
                aria-expanded={isOpen}
                onclick={() => toggle(faq.id)}
              >
                <span>{faq.question}</span>
                <span class="chevron" aria-hidden="true">{isOpen ? '\u2212' : '\u002B'}</span>
              </button>
            </dt>
            {#if isOpen}
              <dd>{faq.answer}</dd>
            {/if}
          </div>
        {/each}
      </dl>
    {/if}
  </div>
</section>

<style>
  .faq { padding: 5rem 1rem; }
  .container { max-width: 48rem; margin: 0 auto; }
  h2 { font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 3rem; }
  .empty { text-align: center; color: #94a3b8; }
  .accordion { display: grid; gap: 0; }
  .item { border-bottom: 1px solid #e2e8f0; }
  .item:first-child { border-top: 1px solid #e2e8f0; }
  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    text-align: left;
    gap: 1rem;
  }
  button:hover { color: #1e40af; }
  .chevron { font-size: 1.25rem; flex-shrink: 0; color: #94a3b8; }
  dd {
    margin: 0;
    padding: 0 0 1.25rem;
    color: #475569;
    line-height: 1.6;
  }
</style>
