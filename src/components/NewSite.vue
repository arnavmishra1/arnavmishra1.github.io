<script setup>
import { me, projects } from '../content.js'

const photo = import.meta.env.BASE_URL + me.photo

// v-reveal: fades an element in the first time it scrolls into view.
const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              observer.unobserve(e.target)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      )

const vReveal = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.transitionDelay = `${value}ms`
    if (observer) observer.observe(el)
    else el.classList.add('in')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
</script>

<template>
  <div class="site">
    <aside class="contact" aria-label="Contact">
      <a :href="`mailto:${me.email}`">{{ me.email }}</a>
      <a :href="me.github" target="_blank" rel="noopener">GitHub</a>
      <span class="rule" />
    </aside>

    <main>
      <section class="hero">
        <img v-reveal :src="photo" :alt="`Photo of ${me.name}`" class="photo" width="112" height="112" />
        <h1 v-reveal="80">{{ me.name }}</h1>
        <p v-reveal="160" class="bio">{{ me.bio }}</p>
        <a v-reveal="320" href="#projects" class="cue" aria-label="Scroll to projects">
          <span>Projects</span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M7 1v12M1.5 7.5 7 13l5.5-5.5" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </a>
      </section>

      <section id="projects" class="projects">
        <h2 v-reveal class="eyebrow">Projects</h2>
        <article v-for="(p, i) in projects" :key="p.name" v-reveal class="project">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ p.name }}</h3>
            <p>{{ p.blurb }}</p>
            <ul class="tags">
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
            <div class="links">
              <a :href="p.live" target="_blank" rel="noopener" class="primary">Open app <span aria-hidden="true">↗</span></a>
              <a :href="p.repo" target="_blank" rel="noopener">GitHub repo <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </article>
      </section>

      <footer v-reveal class="foot">© {{ new Date().getFullYear() }} {{ me.name }}</footer>
    </main>
  </div>
</template>

<style scoped>
.site {
  --ink: #111;
  --muted: #6b6b6b;
  --faint: #e8e8e8;
  min-height: 100vh;
  background: #fff;
  color: var(--ink);
  font: 400 17px/1.6 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
}

/* ---- contact rail on the left edge ---- */
.contact {
  position: fixed;
  left: 28px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  font-size: 13px;
  letter-spacing: 0.04em;
}
.contact a {
  writing-mode: vertical-rl;
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s, transform 0.2s;
}
.contact a:hover {
  color: var(--ink);
  transform: translateY(-3px);
}
.contact .rule {
  width: 1px;
  height: 90px;
  background: var(--faint);
}

main {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---- hero ---- */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0 40px;
}
.photo {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--faint);
}
h1 {
  margin: 28px 0 12px;
  font-size: clamp(36px, 7vw, 52px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
}
.bio {
  margin: 0;
  max-width: 34ch;
  font-size: 19px;
  color: var(--muted);
}
.cue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 56px;
  align-self: flex-start;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--muted);
}
.cue svg {
  animation: bob 2s ease-in-out infinite;
}
@keyframes bob {
  50% {
    transform: translateY(4px);
  }
}

/* ---- projects ---- */
.projects {
  padding: 40px 0 80px;
  scroll-margin-top: 40px;
}
.eyebrow {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.project {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 8px;
  padding: 40px 0;
  border-top: 1px solid var(--faint);
}
.num {
  font-size: 13px;
  color: var(--muted);
  padding-top: 8px;
  font-variant-numeric: tabular-nums;
}
h3 {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.project p {
  margin: 0 0 16px;
  color: var(--muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 22px;
  padding: 0;
  list-style: none;
}
.tags li {
  font-size: 12px;
  padding: 3px 10px;
  border: 1px solid var(--faint);
  border-radius: 999px;
  color: var(--muted);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.links a {
  font-size: 15px;
  text-decoration: none;
  padding: 9px 16px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}
.links a:hover,
.links a.primary {
  background: var(--ink);
  color: #fff;
}
.links a.primary:hover {
  background: #333;
}

.foot {
  padding: 40px 0 48px;
  border-top: 1px solid var(--faint);
  font-size: 13px;
  color: var(--muted);
}

/* ---- scroll fade-in ---- */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.reveal.in {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .cue svg {
    animation: none;
  }
}

/* ---- small screens: contact moves to a row at the bottom ---- */
@media (max-width: 760px) {
  .site {
    padding-bottom: 56px;
  }
  .contact {
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border-top: 1px solid var(--faint);
  }
  .contact a {
    writing-mode: horizontal-tb;
  }
  .contact .rule {
    display: none;
  }
  main {
    padding: 0 16px;
  }
  .project {
    grid-template-columns: 1fr;
  }
}
</style>
