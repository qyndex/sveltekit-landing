import "clsx";
import { g as getContext, e as ensure_array_like, a as attr, s as store_get, b as escape_html, u as unsubscribe_stores } from "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const links = [
      { href: "/#features", label: "Features" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" }
    ];
    $$renderer2.push(`<nav aria-label="Main navigation" class="svelte-1h32yp1"><a href="/" class="logo svelte-1h32yp1" aria-label="Home">Launchpad</a> <ul class="svelte-1h32yp1"><!--[-->`);
    const each_array = ensure_array_like(links);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", link.href)}${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "page" : void 0)} class="svelte-1h32yp1">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <div class="actions svelte-1h32yp1"><a href="/login" class="btn-ghost svelte-1h32yp1">Log in</a> <a href="/signup" class="btn-primary svelte-1h32yp1">Get Started</a></div></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<footer class="svelte-jz8lnl"><div class="container svelte-jz8lnl"><p class="svelte-jz8lnl">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Launchpad. All rights reserved.</p> <nav aria-label="Footer links" class="svelte-jz8lnl"><a href="/privacy" class="svelte-jz8lnl">Privacy</a> <a href="/terms" class="svelte-jz8lnl">Terms</a> <a href="/contact" class="svelte-jz8lnl">Contact</a></nav></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  Nav($$renderer);
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!----> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
