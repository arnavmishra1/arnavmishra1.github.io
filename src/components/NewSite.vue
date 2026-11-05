<script setup>
import { me, projects } from '../content.js'

const base = import.meta.env.BASE_URL
const photo = base + me.photo

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
      <a :href="`mailto:${me.email}`" :aria-label="`Email ${me.email}`">
        <span class="long">{{ me.email }}</span><span class="short">Email</span>
      </a>
      <a :href="me.github" target="_blank" rel="noopener">GitHub</a>
      <a :href="me.linkedin" target="_blank" rel="noopener">LinkedIn</a>
    </aside>

    <!-- Points at the old/new switch (ModeToggle.vue, fixed top-right). -->
    <div class="hint" aria-hidden="true">
      <span class="hint-text">try this!!!!!</span>
      <svg width="84" height="62" viewBox="0 0 84 62">
        <path d="M4 56 C 34 58, 66 44, 74 10" />
        <path d="M64 18 L74 8 L80 21" />
      </svg>
    </div>

    <main>
      <section class="hero">
        <img v-reveal :src="photo" :alt="`Photo of ${me.name}`" class="photo" width="112" height="112" />
        <h1 v-reveal="80">{{ me.name }}</h1>
        <p v-reveal="160" class="bio">{{ me.newbio }}</p>
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
          <a :href="p.live" target="_blank" rel="noopener" class="shot" :aria-label="`Open ${p.name}`">
            <img :src="base + p.image" :alt="`Screenshot of ${p.name}`" loading="lazy" />
          </a>
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

/* ---- contact links, pinned top-left to mirror the toggle ---- */
.contact {
  position: fixed;
  top: 20px;
  left: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 18px;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  font: 500 13px/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: 0.02em;
}
.contact a {
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s;
}
.contact a:hover {
  color: var(--ink);
}
.contact .short {
  display: none;
}

/* ---- "try this" doodle pointing at the toggle ---- */
.hint {
  position: absolute;
  top: 52px;
  right: 86px;
  z-index: 5;
  display: flex;
  align-items: flex-end;
  pointer-events: none;
  animation: hint-in 0.6s 0.9s both, nudge 2.4s 1.5s ease-in-out infinite;
}
.hint-text {
  margin: 0 6px -14px 0;
  font: bold 22px 'Comic Sans MS', 'Comic Sans', 'Chalkboard SE', cursive;
  color: #ff00ff;
  transform: rotate(-8deg);
  white-space: nowrap;
}
.hint svg {
  fill: none;
  stroke: #ff00ff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@keyframes hint-in {
  from {
    opacity: 0;
  }
}
@keyframes nudge {
  50% {
    transform: translate(4px, -4px);
  }
}

main {
  max-width: 860px;
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
  grid-template-columns: 40px 1fr 300px;
  gap: 8px 28px;
  align-items: start;
  padding: 40px 0;
  border-top: 1px solid var(--faint);
}
.shot {
  display: block;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--faint);
  background: #f4f4f4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.shot:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}
.shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
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
  .cue svg,
  .hint {
    animation: none;
  }
}

/* ---- phones: shorten the email link so it fits beside the toggle ---- */
@media (max-width: 520px) {
  .contact .long {
    display: none;
  }
  .contact .short {
    display: inline;
  }
}

@media (max-width: 760px) {
  .contact {
    top: 12px;
    left: 12px;
  }
  main {
    padding: 0 16px;
  }
  .hint {
    top: 42px;
    right: 72px;
    /* `scale`, not `transform`, so it doesn't fight the nudge animation */
    scale: 0.85;
    transform-origin: top right;
  }
  .project {
    grid-template-columns: 1fr;
  }
  .num {
    display: none;
  }
  .shot {
    order: -1;
    margin-bottom: 12px;
  }
}
</style>
