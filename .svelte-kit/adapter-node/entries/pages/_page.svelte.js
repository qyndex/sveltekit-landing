import { b as escape_html, a as attr, e as ensure_array_like, d as stringify, f as attr_class, h as head } from "../../chunks/root.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { tagline, cta } = $$props;
    $$renderer2.push(`<section class="hero svelte-1q37ri0"><div class="container svelte-1q37ri0"><h1 class="svelte-1q37ri0">${escape_html(tagline)}</h1> <p class="subtitle svelte-1q37ri0">The modern platform for ambitious developers. Build, deploy, scale.</p> <div class="cta-group svelte-1q37ri0"><a${attr("href", cta.href)} class="btn btn-primary svelte-1q37ri0">${escape_html(cta.label)}</a> <a href="/demo" class="btn btn-secondary svelte-1q37ri0">Watch Demo</a></div></div></section>`);
  });
}
function Features($$renderer, $$props) {
  let { features } = $$props;
  $$renderer.push(`<section class="features svelte-1dpem8h" id="features"><div class="container svelte-1dpem8h"><h2 class="svelte-1dpem8h">Everything you need</h2> <div class="grid svelte-1dpem8h"><!--[-->`);
  const each_array = ensure_array_like(features);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let feature = each_array[$$index];
    $$renderer.push(`<article class="card svelte-1dpem8h"><span class="icon svelte-1dpem8h" aria-hidden="true">${escape_html(feature.icon)}</span> <h3 class="svelte-1dpem8h">${escape_html(feature.title)}</h3> <p class="svelte-1dpem8h">${escape_html(feature.body)}</p></article>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function Testimonials($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { testimonials } = $$props;
    $$renderer2.push(`<section class="testimonials svelte-1jhcrt0" id="testimonials"><div class="container svelte-1jhcrt0"><h2 class="svelte-1jhcrt0">What people are saying</h2> `);
    if (testimonials.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty svelte-1jhcrt0">No testimonials yet.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="grid svelte-1jhcrt0"><!--[-->`);
      const each_array = ensure_array_like(testimonials);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let testimonial = each_array[$$index_1];
        $$renderer2.push(`<blockquote class="card svelte-1jhcrt0"><p class="quote svelte-1jhcrt0">“${escape_html(testimonial.content)}”</p> `);
        if (testimonial.rating) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="rating svelte-1jhcrt0"${attr("aria-label", `${stringify(testimonial.rating)} out of 5 stars`)}><!--[-->`);
          const each_array_1 = ensure_array_like(Array(5));
          for (let i = 0, $$length2 = each_array_1.length; i < $$length2; i++) {
            each_array_1[i];
            $$renderer2.push(`<span class="star svelte-1jhcrt0" aria-hidden="true">${escape_html(i < testimonial.rating ? "★" : "☆")}</span>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <footer class="svelte-1jhcrt0"><cite class="author svelte-1jhcrt0">${escape_html(testimonial.author_name)}</cite> `);
        if (testimonial.author_title) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="title svelte-1jhcrt0">${escape_html(testimonial.author_title)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></footer></blockquote>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function Pricing($$renderer, $$props) {
  let { plans } = $$props;
  $$renderer.push(`<section class="pricing svelte-omzaxu" id="pricing"><div class="container svelte-omzaxu"><h2 class="svelte-omzaxu">Simple, transparent pricing</h2> <div class="grid svelte-omzaxu"><!--[-->`);
  const each_array = ensure_array_like(plans);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let plan = each_array[$$index_1];
    $$renderer.push(`<div${attr_class("card svelte-omzaxu", void 0, { "featured": plan.featured })}><h3 class="svelte-omzaxu">${escape_html(plan.name)}</h3> <div class="price svelte-omzaxu"><span class="amount svelte-omzaxu">${escape_html(plan.price)}</span> <span class="period svelte-omzaxu">${escape_html(plan.period)}</span></div> <ul class="svelte-omzaxu"><!--[-->`);
    const each_array_1 = ensure_array_like(plan.features);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let feature = each_array_1[$$index];
      $$renderer.push(`<li class="svelte-omzaxu">✓ ${escape_html(feature)}</li>`);
    }
    $$renderer.push(`<!--]--></ul> <a${attr("href", `/signup?plan=${stringify(plan.name.toLowerCase())}`)} class="btn svelte-omzaxu">${escape_html(plan.cta)}</a></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function Faq($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { faqs } = $$props;
    let openId = null;
    $$renderer2.push(`<section class="faq svelte-1vyz8mk" id="faq"><div class="container svelte-1vyz8mk"><h2 class="svelte-1vyz8mk">Frequently asked questions</h2> `);
    if (faqs.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty svelte-1vyz8mk">No FAQs yet.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<dl class="accordion svelte-1vyz8mk"><!--[-->`);
      const each_array = ensure_array_like(faqs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let faq = each_array[$$index];
        const isOpen = openId === faq.id;
        $$renderer2.push(`<div${attr_class("item svelte-1vyz8mk", void 0, { "open": isOpen })}><dt><button type="button"${attr("aria-expanded", isOpen)} class="svelte-1vyz8mk"><span>${escape_html(faq.question)}</span> <span class="chevron svelte-1vyz8mk" aria-hidden="true">${escape_html(isOpen ? "−" : "+")}</span></button></dt> `);
        if (isOpen) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<dd class="svelte-1vyz8mk">${escape_html(faq.answer)}</dd>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></dl>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function WaitlistForm($$renderer, $$props) {
  let { heading = "Join the waitlist" } = $$props;
  $$renderer.push(`<section class="waitlist svelte-r2xnp1" id="waitlist"><div class="container svelte-r2xnp1"><h2 class="svelte-r2xnp1">${escape_html(heading)}</h2> <p class="subtitle svelte-r2xnp1">Be the first to know when new features launch.</p> `);
  {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<form method="POST" action="?/joinWaitlist"><div class="fields svelte-r2xnp1"><div class="field svelte-r2xnp1"><label for="waitlist-name" class="svelte-r2xnp1">Name <span class="optional svelte-r2xnp1">(optional)</span></label> <input type="text" id="waitlist-name" name="name" placeholder="Jane Doe" autocomplete="name" class="svelte-r2xnp1"/></div> <div class="field svelte-r2xnp1"><label for="waitlist-email" class="svelte-r2xnp1">Email <span class="required svelte-r2xnp1">*</span></label> <input type="email" id="waitlist-email" name="email" placeholder="jane@example.com" required="" autocomplete="email" class="svelte-r2xnp1"/></div></div> <input type="hidden" name="source" value="landing-page" class="svelte-r2xnp1"/> <button type="submit" class="svelte-r2xnp1">Join Waitlist</button> `);
    {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]--></form>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.title)} — Build faster</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", data.description)}/>`);
    });
    Hero($$renderer2, { tagline: data.tagline, cta: data.cta });
    $$renderer2.push(`<!----> `);
    Features($$renderer2, { features: data.features });
    $$renderer2.push(`<!----> `);
    Testimonials($$renderer2, { testimonials: data.testimonials });
    $$renderer2.push(`<!----> `);
    Pricing($$renderer2, { plans: data.plans });
    $$renderer2.push(`<!----> `);
    Faq($$renderer2, { faqs: data.faqs });
    $$renderer2.push(`<!----> `);
    WaitlistForm($$renderer2, {});
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
