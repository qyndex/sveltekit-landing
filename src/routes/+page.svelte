<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Features from "$lib/components/Features.svelte";
  import Testimonials from "$lib/components/Testimonials.svelte";
  import Pricing from "$lib/components/Pricing.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import WaitlistForm from "$lib/components/WaitlistForm.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.title} — Build faster</title>
  <meta name="description" content={data.description} />
</svelte:head>

<Hero tagline={data.tagline} cta={data.cta} />
<Features features={data.features} />
<Testimonials testimonials={data.testimonials} />
<Pricing plans={data.plans} />
<Faq faqs={data.faqs} />
<WaitlistForm />
