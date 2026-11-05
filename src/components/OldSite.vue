<script setup>
import { me, projects } from '../content.js'

const photo = import.meta.env.BASE_URL + me.photo
const firstName = me.name.split(' ')[0]
const hits = '004217'
const updated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
</script>

<template>
  <div class="old">
    <marquee scrollamount="8" class="welcome">
      ★彡 WELCOME TO {{ firstName.toUpperCase() }}'S HOMEPAGE ON THE WORLD WIDE WEB!!! 彡★
    </marquee>

    <div class="construction">🚧 UNDER CONSTRUCTION 🚧</div>

    <table class="layout" cellpadding="6" cellspacing="4" border="3">
      <tbody>
        <tr>
          <!-- left "nav" column, where the contact info lives -->
          <td class="side" valign="top" width="170">
            <p class="side-title"><u>CONTACT ME</u></p>
            <p>
              📧 E-MAIL:<br />
              <a :href="`mailto:${me.email}`">{{ me.email }}</a>
            </p>
            <p>
              💾 MY CODE:<br />
              <a :href="me.github" target="_blank" rel="noopener">GitHub</a>
            </p>
            <hr />
            <p class="small">You are visitor #</p>
            <div class="counter">
              <span v-for="(d, i) in hits" :key="i">{{ d }}</span>
            </div>
            <hr />
            <p class="small">
              Best viewed in<br /><b>Netscape Navigator 4.0</b><br />at 800x600
            </p>
          </td>

          <td class="main" valign="top">
            <table width="100%" border="0">
              <tbody>
                <tr>
                  <td width="140" valign="top">
                    <img :src="photo" :alt="`Photo of ${me.name}`" class="photo" width="120" height="120" />
                    <center class="small">^^ thats me ^^</center>
                  </td>
                  <td valign="top">
                    <h1 class="name">{{ me.name }}</h1>
                    <p class="bio">
                      <font color="#ff0000"><b>Hi!!!</b></font> {{ me.bio }}
                      <span class="blink">NEW!</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <hr class="rainbow" />

            <h2 class="projects-title">~*~ MY PROJECTS ~*~</h2>

            <table class="project" v-for="p in projects" :key="p.name" border="2" cellpadding="8" width="100%">
              <tbody>
                <tr>
                  <td :bgcolor="p === projects[0] ? '#00ffff' : '#ff99ff'">
                    <h3>
                      <img
                        alt=""
                        width="14"
                        height="14"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpolygon points='7,0 9,5 14,5 10,8 12,14 7,10 2,14 4,8 0,5 5,5' fill='%23ff0'%20stroke='%23f00'/%3E%3C/svg%3E"
                      />
                      {{ p.name }}
                    </h3>
                    <p>{{ p.blurb }}</p>
                    <p>
                      &gt;&gt; <a :href="p.live" target="_blank" rel="noopener">CLICK HERE to try it!!</a><br />
                      &gt;&gt; <a :href="p.repo" target="_blank" rel="noopener">View the source code</a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <hr class="rainbow" />
            <center class="small">
              &lt;&lt; prev | <b>Car Nerds Web Ring</b> | next &gt;&gt;<br />
              Last updated: {{ updated }}<br />
              © {{ new Date().getFullYear() }} {{ me.name }}. All rights reserved. Do NOT steal my graphics!!!
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.old {
  min-height: 100vh;
  padding: 56px 8px 24px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #000;
  cursor: crosshair;
  background-color: #000080;
  background-image: radial-gradient(#ffff00 1px, transparent 1.5px), radial-gradient(#ffffff 1px, transparent 1.5px);
  background-size: 40px 40px, 23px 23px;
  background-position: 0 0, 11px 7px;
}

a {
  color: #0000ee;
  text-decoration: underline;
}
a:visited {
  color: #551a8b;
}
a:hover {
  color: #ff0000;
}

.welcome {
  display: block;
  background: #ff00ff;
  color: #ffff00;
  font: bold 22px 'Comic Sans MS', 'Comic Sans', cursive;
  border: 3px ridge #00ff00;
  padding: 4px 0;
}

.construction {
  margin: 10px auto;
  max-width: 420px;
  text-align: center;
  font: bold 18px Impact, 'Arial Black', sans-serif;
  color: #000;
  padding: 6px;
  background: repeating-linear-gradient(-45deg, #ffcc00 0 14px, #000 14px 28px);
  text-shadow: 0 0 3px #ffcc00, 0 0 3px #ffcc00, 0 0 3px #ffcc00;
}

.layout {
  width: 96%;
  max-width: 900px;
  margin: 0 0 0 2%;
  background: #c0c0c0;
  border-color: #ff0000;
}

.side {
  background: #008080;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}
.side a {
  color: #ffff00;
  word-break: break-all;
}
.side-title {
  font: bold 16px 'Comic Sans MS', cursive;
  color: #00ff00;
}
.small {
  font-size: 12px;
}

.counter {
  display: inline-flex;
  gap: 1px;
}
.counter span {
  font: bold 16px 'Courier New', monospace;
  background: #000;
  color: #00ff00;
  padding: 1px 3px;
  border: 1px solid #555;
}

.main {
  background: #ffff99;
}

.photo {
  border: 4px ridge #ff00ff;
  object-fit: cover;
}

.name {
  margin: 0 0 6px;
  font: bold 36px 'Comic Sans MS', 'Comic Sans', cursive;
  color: #ff0000;
  text-shadow: 2px 2px #0000ff;
}

.bio {
  margin: 0;
}

.blink {
  font-weight: bold;
  color: #ff0000;
  background: #ffff00;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    visibility: hidden;
  }
}

.rainbow {
  height: 6px;
  border: 0;
  background: linear-gradient(90deg, red, orange, yellow, lime, cyan, blue, magenta);
}

.projects-title {
  text-align: center;
  font: bold 26px 'Comic Sans MS', cursive;
  color: #008000;
  text-decoration: underline;
}

.project {
  margin-bottom: 14px;
  border-color: #000080;
}
.project h3 {
  margin: 0 0 6px;
  font: bold 22px Arial, Helvetica, sans-serif;
  color: #800000;
}
.project p {
  margin: 6px 0;
}

@media (max-width: 640px) {
  .layout,
  .layout > tbody,
  .layout > tbody > tr,
  .layout > tbody > tr > td {
    display: block;
    width: 100% !important;
    margin: 0;
  }
}
</style>
