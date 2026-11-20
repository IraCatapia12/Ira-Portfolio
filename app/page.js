"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ============ EDIT YOUR CONTENT HERE ============ */
const NAME = "IRA";
const LOCATION = "Muntinlupa City";
const EMAIL = "catapiaira15@gmail.com";

const HERO_IMG = "/ira.png";

const ROLES = ["WEB DEVELOPER", "PHOTOGRAPHER"];

const CATS = [
  "Best",
  "All",
  "People",
  "Street",
  "Night",
  "Places",
  "Wedding",
  "Details",
];

const PHOTOS = [
  { src: "/photos/1.jpg", title: "The ring", cat: "People" },
  { src: "/photos/2.jpg", title: "Shadows", cat: "People", best: true },
  { src: "/photos/3.jpg", title: "Street Style", cat: "People" },
  { src: "/photos/4.jpg", title: "Red Headlight", cat: "Details", best: true },
  { src: "/photos/5.jpg", title: "Wedding rings", cat: "Wedding" },
  { src: "/photos/6.jpg", title: "Just married", cat: "Wedding", best: true },
  { src: "/photos/7.jpg", title: "Light trails", cat: "Night" },
  { src: "/photos/8.jpg", title: "Light trails II", cat: "Night" },
  { src: "/photos/9.jpg", title: "Bike lane", cat: "Street" },
  { src: "/photos/10.JPG", title: "Lantern", cat: "Street" },
  { src: "/photos/11.JPG", title: "River boat", cat: "Places", best: true },
  { src: "/photos/12.JPG", title: "Ferris wheel", cat: "Places" },
  { src: "/photos/13.JPG", title: "Flame tree", cat: "Places" },
  { src: "/photos/14.JPG", title: "Hillside", cat: "Places", best: true },
  { src: "/photos/15.JPG", title: "Hilltop road", cat: "Places" },
  { src: "/photos/16.JPG", title: "Street play", cat: "Street" },
  { src: "/photos/17.JPG", title: "Morning Light", cat: "Street", best: true },
  { src: "/photos/18.JPG", title: "Studio Portrait", cat: "People" },
  { src: "/photos/19.jpeg", title: "Cravings to go", cat: "Night" },
  { src: "/photos/20.jpeg", title: "Park at night", cat: "Night" },
  {
    src: "/photos/21.jpg",
    title: "Carousel at night",
    cat: "Night",
    best: true,
  },
];

const thumb = (src) =>
  src.replace("/photos/", "/photos/thumbs/").replace(/\.\w+$/, ".jpg");

const BEST = PHOTOS.filter((p) => p.best);

const listFor = (c) =>
  c === "Best"
    ? BEST
    : c === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.cat === c);

const VIDEOS = [
  "https://drive.google.com/file/d/1fj1zY16DJjcIDkGvtBn7Xc5SckeynIiQ/view?usp=sharing",
  "https://drive.google.com/file/d/1ftEcr-q3JN_OPsRsAbJZ-EVWn0-AowdC/view?usp=drive_link",
  "https://drive.google.com/file/d/1d8aBscy-ewUD0iZau-yQvXbRg92977jJ/view?usp=drive_link",
  "https://drive.google.com/file/d/1ayHEYsDo2C8YMdaCkAJOrA53giiJ4LdZ/view?usp=drive_link",
  "https://drive.google.com/file/d/17r6fF8Ss_8YA_YDEL_VEWbEVssp16n1z/view?usp=drive_link",
  "https://drive.google.com/file/d/19rQif3L0dAzQVr3gGDvG6qF63Mf_Zelz/view?usp=drive_link",
  "https://drive.google.com/file/d/1xbh6Js7j9VqbbcDsv1xqdq8AqgylqGZK/view?usp=drive_link",
  "https://drive.google.com/file/d/1WPrwmOuveCyb7oawdkcV5ZxVOKFOrzT_/view?usp=drive_link",
];

const SITES = [
  {
    name: "Cahel Studio & Photobooth",
    desc: "Single-page site for events photography and photobooth rentals.",
    stack: "Next.js",
    url: "#",
  },
  {
    name: "Captured Self Shoot Studio",
    desc: "Booking website with package pricing and online reservations.",
    stack: "Next.js + Supabase",
    url: "#",
  },
  {
    name: "SnapBooth Pro",
    desc: "Photo booth kiosk app with payment QR, templates and boomerang.",
    stack: "HTML + JS",
    url: "#",
  },
];

const LINKS = [
  { label: "Instagram", url: "https://www.instagram.com/ichristinecc/?hl=en" },
  {
    label: "Facebook",
    url: "https://www.facebook.com/ira.christine.c.catapia",
  },
  { label: "GitHub", url: "https://github.com/iraCatapia" },
];

/* VIDEO LINK HANDLER */
function parseVideo(rawUrl) {
  const url = (rawUrl || "").trim();

  const yt =
    url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|live\/))([\w-]{11})/,
    ) || url.match(/youtube\.com\/watch\?(?:.*&)?v=([\w-]{11})/);

  if (yt) {
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`,
      thumb: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);

  if (vm) {
    return {
      kind: "iframe",
      src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1`,
    };
  }

  const gd = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);

  if (gd) {
    return {
      kind: "iframe",
      src: `https://drive.google.com/file/d/${gd[1]}/preview`,
      thumb: `https://drive.google.com/thumbnail?id=${gd[1]}&sz=w1000`,
    };
  }

  const tt = url.match(/tiktok\.com\/.*video\/(\d+)/);

  if (tt) {
    return {
      kind: "iframe",
      src: `https://www.tiktok.com/embed/v2/${tt[1]}`,
    };
  }

  if (/facebook\.com|fb\.watch/.test(url)) {
    return {
      kind: "iframe",
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url,
      )}&show_text=false&autoplay=true`,
    };
  }

  if (/terabox|teraboxapp|1024tera|4funbox|mirrobox|nephobox/i.test(url)) {
    return { kind: "link", src: url, label: "Terabox" };
  }

  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url)) {
    return { kind: "file", src: url };
  }

  return { kind: "link", src: url, label: "the link" };
}

/* ============ STYLES ============ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#050505;color:#f3efe6;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
::selection{background:#7c3aed;color:#fff}

.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.display{font-family:'Archivo Black','Impact',sans-serif;text-transform:uppercase;letter-spacing:-0.02em;line-height:.9}

.progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:100;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#7c3aed,#ec4899,#f97316)}

.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:28px 6vw;transition:background .3s,padding .3s}
.nav.scrolled{background:rgba(5,5,5,.92);padding:18px 6vw}
.logo{font-family:'Georgia',serif;font-style:italic;font-size:26px;transition:transform .3s}
.logo:hover{transform:rotate(-6deg) scale(1.08)}
.links{display:flex;gap:40px}
.links a{position:relative;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;opacity:.85;transition:opacity .2s,color .2s;padding-bottom:6px}
.links a::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#ec4899,#f97316);transition:transform .35s cubic-bezier(.2,.7,.2,1)}
.links a:hover{opacity:1;color:#fff}
.links a:hover::after{transform:scaleX(1)}

.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:22vh 6vw 0;overflow:hidden;background:radial-gradient(ellipse 45% 55% at 50% 85%,rgba(124,58,237,.55),rgba(30,10,60,.25) 55%,transparent 75%),#050505}
.hero::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(500px circle at var(--gx,50%) var(--gy,60%),rgba(168,85,247,.28),transparent 60%);transition:background .1s}
.tag{font-size:13px;letter-spacing:.3em;font-weight:500;position:relative;z-index:1;display:flex;gap:.6em;align-items:center;height:20px}
.role{font-weight:800;display:inline-block;animation:swap 3s ease-in-out both}
@keyframes swap{0%{opacity:0;transform:translateY(100%);filter:blur(4px)}12%,82%{opacity:1;transform:none;filter:none}100%{opacity:0;transform:translateY(-100%);filter:blur(4px)}}
.title{position:relative;z-index:1;margin-top:5vh;transform:translate3d(calc(var(--mx,0) * -26px),calc(var(--my,0) * -14px),0);transition:transform .25s ease-out}
.big{font-size:clamp(64px,13.5vw,220px);text-align:center;white-space:nowrap}
.word{display:inline-block;overflow:hidden;padding:.08em 0 .14em;margin:-.08em .2em -.14em 0;vertical-align:bottom}
.word:last-child{margin-right:0}
.letter{display:inline-block;animation:letterUp .95s cubic-bezier(.2,.8,.2,1) both}
@keyframes letterUp{from{transform:translateY(115%) rotate(6deg)}to{transform:none}}
.stage{position:absolute;left:0;right:0;bottom:0;height:82vh;max-height:900px;z-index:2;display:flex;justify-content:center;align-items:flex-end;pointer-events:none}
.cut{height:100%;transform:translate3d(calc(var(--mx,0) * 20px),calc(var(--my,0) * 10px),0);transition:transform .25s ease-out}
.cutout{height:100%;width:auto;object-fit:contain;object-position:bottom;filter:drop-shadow(0 0 60px rgba(124,58,237,.35));animation:photoIn 1.3s .5s cubic-bezier(.2,.8,.2,1) both}
@keyframes photoIn{from{opacity:0;transform:translateY(12%) scale(.96);filter:blur(10px) drop-shadow(0 0 60px rgba(124,58,237,.35))}to{opacity:1;transform:none}}
.pill{position:absolute;left:6vw;bottom:22vh;z-index:3;background:#0d0d10;border:1px solid #26262c;border-radius:8px;padding:10px 16px;font-size:12px;color:#a7f3a0;animation:rise 1s .9s both cubic-bezier(.2,.7,.2,1),float 6s 2s ease-in-out infinite}
.pill span{color:#fca5a5}
.caret{display:inline-block;width:7px;height:13px;background:#a7f3a0;margin-left:4px;vertical-align:-2px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.bio{position:absolute;left:6vw;bottom:8vh;z-index:3;max-width:260px;font-size:14px;line-height:1.6;color:#d8d4ca;animation:rise 1s 1.1s both cubic-bezier(.2,.7,.2,1)}
.cta{position:absolute;right:6vw;bottom:10vh;z-index:3;padding:16px 34px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;overflow:hidden;background:linear-gradient(90deg,#ec4899,#f97316);color:#fff;transition:transform .2s;animation:rise 1s 1.2s both cubic-bezier(.2,.7,.2,1),glow 2.6s 2.2s ease-in-out infinite}
.cta::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;transform:skewX(-20deg);background:rgba(255,255,255,.35);transition:left .6s}
.cta:hover{transform:translateY(-3px) scale(1.04)}
.cta:hover::after{left:130%}
@keyframes glow{0%,100%{box-shadow:0 10px 40px rgba(236,72,153,.3)}50%{box-shadow:0 14px 60px rgba(249,115,22,.55)}}
.scroll{position:absolute;left:50%;bottom:22px;z-index:3;width:22px;height:36px;border:1.5px solid rgba(255,255,255,.35);border-radius:12px;transform:translateX(-50%);animation:rise 1s 1.6s both}
.scroll::after{content:"";position:absolute;left:50%;top:7px;width:3px;height:7px;border-radius:2px;background:#fff;transform:translateX(-50%);animation:wheel 1.6s ease-in-out infinite}
@keyframes wheel{0%{opacity:0;transform:translate(-50%,0)}30%{opacity:1}100%{opacity:0;transform:translate(-50%,12px)}}
@keyframes rise{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
.in1{animation:rise .9s .1s both cubic-bezier(.2,.7,.2,1)}

.reveal{opacity:0;transform:translateY(60px);filter:blur(6px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1),filter .9s}
.reveal.on{opacity:1;transform:none;filter:none}

.section{padding:16vh 6vw;position:relative}
.h2{font-size:clamp(44px,8vw,128px);margin-bottom:6vh}
.muted{color:#9a968c}
.about{display:grid;grid-template-columns:1fr 1fr;gap:6vw;align-items:start}
.about p{font-size:clamp(18px,1.6vw,24px);line-height:1.6;color:#d8d4ca;margin-bottom:24px}
.facts{display:flex;flex-direction:column;gap:14px}
.facts div{display:flex;justify-content:space-between;border-bottom:1px solid #1f1f24;padding-bottom:14px;font-size:14px;transition:border-color .3s,padding-left .3s}
.facts div:hover{border-color:#ec4899;padding-left:10px}
.facts div span:first-child{color:#9a968c}

.tabs{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:4vh}
.tab{display:inline-flex;align-items:center;gap:10px;padding:12px 22px;border-radius:999px;border:1px solid #33333b;background:transparent;color:#d8d4ca;font:600 12px 'Inter',sans-serif;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:background .25s,border-color .25s,color .25s,transform .2s}
.tab:hover{border-color:#ec4899;color:#fff;transform:translateY(-2px)}
.tab.on{background:linear-gradient(90deg,#ec4899,#f97316);border-color:transparent;color:#fff;box-shadow:0 8px 30px rgba(236,72,153,.3)}
.tab small{font:500 11px 'JetBrains Mono',monospace;opacity:.7;letter-spacing:0}

.cfstage{position:relative;height:clamp(470px,80vh,760px);perspective:1500px;overflow:hidden;border-radius:24px;border:1px solid #2a2a33;background:#08080c;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none;overscroll-behavior-x:contain}
.cfstage.drag{cursor:grabbing}
.cfstage:focus-visible{border-color:#ec4899}
.cfbg{position:absolute;left:50%;top:50%;width:34%;height:34%;object-fit:cover;transform:translate(-50%,-50%) scale(3.4);filter:blur(12px);pointer-events:none;will-change:opacity}
.cfbg.in{animation:cfIn .6s both}
@keyframes cfIn{from{opacity:0}to{opacity:1}}
.cfshade{position:absolute;inset:0;z-index:0;pointer-events:none;background:rgba(5,5,5,.5)}
.cfvig{position:absolute;inset:0;z-index:300;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,transparent 50%,rgba(5,5,5,.65))}
.cfcard{position:absolute;left:50%;top:47%;width:300px;height:375px;padding:0;border:0;border-radius:18px;background:#0b0b10;cursor:pointer;box-shadow:0 10px 24px rgba(0,0,0,.45);backface-visibility:hidden;will-change:transform,opacity;transform:translate(-50%,-50%)}
.cfcard img{display:block;width:100%;height:100%;object-fit:cover;pointer-events:none;border-radius:18px}
.cfcard .dim{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;will-change:opacity;border-radius:18px}

.cfbar{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:24px}
.cftitle{font-family:'Archivo Black',sans-serif;text-transform:uppercase;font-size:clamp(22px,3vw,40px);line-height:1;animation:cfTitle .6s cubic-bezier(.2,.7,.2,1) both}
@keyframes cfTitle{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.cfmeta{margin-top:8px;font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#9a968c}
.cfctl{display:flex;gap:6px;padding:8px;border-radius:999px;background:#0d0d10;border:1px solid #26262c}
.cfctl button{width:44px;height:44px;border-radius:50%;border:0;background:transparent;color:#fff;font-size:18px;cursor:pointer;transition:background .2s,transform .2s}
.cfctl button:hover{background:linear-gradient(90deg,#ec4899,#f97316);transform:scale(1.08)}
.cfctl .on{background:linear-gradient(90deg,#ec4899,#f97316)}
.cfprog{height:3px;border-radius:3px;background:#1f1f24;margin-top:20px;overflow:hidden}
.cfprog i{display:block;height:100%;background:linear-gradient(90deg,#ec4899,#f97316);transition:width .6s cubic-bezier(.2,.7,.2,1)}
.cfhint{margin-top:14px;text-align:center;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#6b675e}

.lb{position:fixed;inset:0;z-index:200;background:rgba(5,5,5,.94);backdrop-filter:blur(8px);display:grid;place-items:center;animation:lbIn .3s both}
@keyframes lbIn{from{opacity:0}to{opacity:1}}
.lb img{max-width:90vw;max-height:84vh;object-fit:contain;border-radius:8px;box-shadow:0 20px 80px rgba(124,58,237,.3)}
.lb .lbcap{position:absolute;bottom:3vh;left:0;right:0;text-align:center;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#d8d4ca}
.lb button{position:absolute;background:rgba(255,255,255,.08);border:1px solid #33333b;color:#fff;width:48px;height:48px;border-radius:50%;font-size:20px;cursor:pointer;transition:background .2s}
.lb button:hover{background:linear-gradient(90deg,#ec4899,#f97316);border-color:transparent}
.lb .x{top:24px;right:24px}
.lb .prev{left:24px;top:50%;transform:translateY(-50%)}
.lb .next{right:24px;top:50%;transform:translateY(-50%)}

.vgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:28px}
.vcard{display:flex;flex-direction:column;gap:14px}
.vbox{position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;border:1px solid #1f1f24;background:linear-gradient(160deg,#1a1033,#0b0b10)}
.vbox iframe,.vbox video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
.vplay{position:absolute;inset:0;width:100%;height:100%;border:0;background:none;cursor:pointer;color:#fff;display:grid;place-items:center}
.vplay img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .4s}
.vplay:hover img{transform:scale(1.06);filter:brightness(.9)}
.vbtn{position:relative;width:76px;height:76px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(90deg,#ec4899,#f97316);box-shadow:0 10px 40px rgba(236,72,153,.45);transition:transform .25s;animation:pulse 2.4s ease-in-out infinite}
.vplay:hover .vbtn{transform:scale(1.12)}
.vbtn svg{width:28px;height:28px;margin-left:4px;fill:#fff}
@keyframes pulse{0%,100%{box-shadow:0 10px 40px rgba(236,72,153,.35)}50%{box-shadow:0 10px 60px rgba(249,115,22,.65)}}
.vsite{position:absolute;left:0;right:0;bottom:18px;text-align:center;font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#d8d4ca}
.vtitle{font-size:14px;font-weight:600;letter-spacing:.04em;color:#d8d4ca}
.vempty{border:1px dashed #33333b;border-radius:14px;padding:48px 24px;text-align:center;color:#9a968c;font-size:14px;line-height:1.7}
.vempty code{color:#c4b5fd}

.sites{border-top:1px solid #1f1f24}
.site{display:grid;grid-template-columns:1.2fr 2fr 1fr auto;gap:32px;align-items:center;padding:36px 0;border-bottom:1px solid #1f1f24;transition:padding .3s,background .3s}
.site:hover{padding-left:20px;background:linear-gradient(90deg,rgba(124,58,237,.14),transparent)}
.site h3{font-family:'Archivo Black',sans-serif;font-size:clamp(20px,2.4vw,34px);text-transform:uppercase;letter-spacing:-.01em;line-height:1}
.site p{color:#b9b5aa;line-height:1.5;font-size:15px}
.site .stack{font-size:12px;color:#c4b5fd}
.site .go{width:46px;height:46px;border-radius:50%;border:1px solid #33333b;display:grid;place-items:center;transition:background .2s,border-color .2s,transform .3s}
.site:hover .go{background:linear-gradient(90deg,#ec4899,#f97316);border-color:transparent;transform:rotate(45deg)}

.contact{text-align:center;padding-bottom:10vh;background:radial-gradient(ellipse 50% 60% at 50% 100%,rgba(124,58,237,.35),transparent 70%)}
.mail{display:inline-block;font-family:'Archivo Black',sans-serif;font-size:clamp(26px,5.5vw,84px);letter-spacing:-.02em;word-break:break-all;background:linear-gradient(90deg,#f3efe6 0%,#f3efe6 40%,#ec4899 50%,#f97316 60%,#f3efe6 70%,#f3efe6 100%);background-size:250% 100%;background-position:100% 0;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;transition:background-position .9s cubic-bezier(.2,.7,.2,1)}
.mail:hover{background-position:0 0}
.social{display:flex;justify-content:center;gap:40px;margin-top:6vh;flex-wrap:wrap}
.social a{font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;opacity:.8;transition:opacity .2s,transform .2s,color .2s}
.social a:hover{opacity:1;color:#c4b5fd;transform:translateY(-4px)}
.foot{margin-top:10vh;font-size:12px;color:#6b675e}

:focus-visible{outline:2px solid #c4b5fd;outline-offset:4px}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  html{scroll-behavior:auto}
  .reveal{opacity:1;transform:none;filter:none}
}

/* MOBILE RESPONSIVE */
@media (max-width:860px){
  .nav,.nav.scrolled{padding:12px 5vw 10px;flex-direction:column;align-items:stretch;gap:10px;background:rgba(5,5,5,.94);backdrop-filter:blur(14px)}
  .logo{font-size:23px;align-self:flex-start}
  .links{width:100%;gap:22px;padding:2px 0 7px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .links::-webkit-scrollbar{display:none}
  .links a{flex:0 0 auto;font-size:10px;letter-spacing:.12em}
  .hero{min-height:760px;min-height:100svh;padding:190px 5vw 0}
  .tag{font-size:10px;letter-spacing:.2em}
  .title{margin-top:4vh;width:100%}
  .big{white-space:normal;font-size:clamp(54px,15vw,108px);line-height:.98;overflow-wrap:anywhere}
  .word{margin-right:.12em}
  .stage{height:48vh;max-height:440px;bottom:115px}
  .cut{max-width:100%;width:auto}
  .cutout{max-width:100vw;height:100%;object-fit:contain}
  .pill,.scroll{display:none}
  .bio{left:5vw;right:5vw;bottom:83px;max-width:unset;text-align:center;font-size:12px;line-height:1.5}
  .cta{left:50%;right:auto;bottom:22px;transform:translateX(-50%);padding:13px 24px;font-size:10px;white-space:nowrap;letter-spacing:.15em}
  .cta:hover{transform:translateX(-50%) translateY(-2px)}
  .section{padding:90px 5vw}
  .h2{font-size:clamp(42px,12vw,76px);margin-bottom:34px}
  .about{grid-template-columns:1fr;gap:26px}
  .about p{font-size:16px;line-height:1.7;margin-bottom:18px}
  .facts div{gap:14px;font-size:12px;line-height:1.5}
  .facts div span:last-child{text-align:right}
  .tabs{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:0 -5vw 24px;padding:0 5vw 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .tabs::-webkit-scrollbar{display:none}
  .tab{flex:0 0 auto;padding:10px 14px;font-size:10px;letter-spacing:.1em}
  .cfstage{height:clamp(340px,58svh,500px);min-height:340px;border-radius:16px;perspective:1000px;touch-action:pan-y}
  .cfcard{border-radius:12px}
  .cfcard img{border-radius:12px}
  .cfbar{align-items:flex-start;gap:16px;margin-top:18px}
  .cftitle{font-size:clamp(20px,6vw,30px)}
  .cfctl{gap:3px;padding:5px}
  .cfctl button{width:38px;height:38px;font-size:16px}
  .cfhint{font-size:9px;letter-spacing:.1em;line-height:1.6}
  .lb{padding:70px 12px 90px}
  .lb img{max-width:100%;max-height:72svh}
  .lb .x{top:14px;right:14px}
  .lb .prev{left:12px;top:auto;bottom:18px;transform:none}
  .lb .next{right:12px;top:auto;bottom:18px;transform:none}
  .lb .lbcap{bottom:34px;padding:0 70px;font-size:10px;letter-spacing:.1em;line-height:1.5}
  .vgrid{grid-template-columns:1fr;gap:22px}
  .vbtn{width:60px;height:60px}
  .site{grid-template-columns:minmax(0,1fr) auto;gap:12px;padding:24px 0}
  .site h3{font-size:clamp(19px,6vw,27px)}
  .site p{font-size:13px;grid-column:1 / -1}
  .site .stack{font-size:11px;grid-column:1 / 2}
  .site .go{width:38px;height:38px;grid-column:2;grid-row:1 / span 2}
  .contact{padding-bottom:70px}
  .mail{font-size:clamp(22px,7vw,42px);overflow-wrap:anywhere}
  .social{gap:22px;margin-top:38px}
  .social a{font-size:10px;letter-spacing:.12em}
  .foot{margin-top:65px;font-size:10px}
}

@media (max-width:420px){
  .hero{min-height:740px}
  .stage{height:43vh;bottom:125px}
  .bio{bottom:88px;font-size:11px}
  .cta{bottom:24px}
  .cfstage{height:360px;min-height:360px}
  .cfbar{flex-direction:column}
  .cfctl{align-self:flex-end}
}

/* BASIC CONTENT PROTECTION DETERRENTS */
img{-webkit-user-drag:none;user-select:none;-webkit-user-select:none}
.protected-content{-webkit-user-select:none;user-select:none}
input,textarea,[contenteditable="true"]{-webkit-user-select:text;user-select:text}
`;
/* SCROLL REVEAL */
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${on ? "on" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ANIMATED TITLE */
function SplitTitle({ text }) {
  let n = 0;

  return (
    <h1 className="big display" aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span className="word" key={wi} aria-hidden="true">
          {word.split("").map((ch, ci) => (
            <span
              className="letter"
              key={ci}
              style={{ animationDelay: `${0.15 + n++ * 0.06}s` }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* VIDEO PLAY ICON */
const PlayIcon = () => (
  <span className="vbtn">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

/* VIDEO CARD */
function VideoCard({ item }) {
  const url = typeof item === "string" ? item : item.url;
  const title = typeof item === "string" ? "" : item.title;
  const v = parseVideo(url);
  const [play, setPlay] = useState(false);

  return (
    <div className="vcard">
      <div className="vbox">
        {v.kind === "file" ? (
          <video src={v.src} controls playsInline preload="metadata" />
        ) : v.kind === "iframe" ? (
          play ? (
            <iframe
              src={v.src}
              title={title || "Video"}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              className="vplay"
              onClick={() => setPlay(true)}
              aria-label={`Play ${title || "video"}`}
            >
              {v.thumb && (
                <img
                  src={v.thumb}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              <PlayIcon />
            </button>
          )
        ) : (
          <a
            className="vplay"
            href={v.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${title || "video"} on ${v.label}`}
          >
            <PlayIcon />
            <span className="vsite mono">Watch on {v.label} ↗</span>
          </a>
        )}
      </div>

      {title && <p className="vtitle">{title}</p>}
    </div>
  );
}

/* 3D COVERFLOW PHOTO GALLERY */
function Coverflow({ onOpen }) {
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(false);
  const [bg, setBg] = useState({ cur: null, prev: null });

  const list = listFor(cat);
  const n = list.length;

  const nRef = useRef(n);
  nRef.current = n;

  const stage = useRef(null);
  const cards = useRef([]);
  cards.current.length = n;

  const S = useRef({
    pos: 0,
    target: 0,
    run: false,
    last: 0,
    drag: false,
    sx: 0,
    st: 0,
    moved: 0,
    lx: 0,
    lt: 0,
    v: 0,
    active: 0,
    wt: 0,
    reduce: false,
    r: [],
    w: [],
  });

  const apply = () => {
    const st = S.current;
    const N = nRef.current;
    const els = cards.current;

    if (!els[0]) return;

    const wOf = (k) => {
      const m = ((k % N) + N) % N;
      return st.w[m] || (els[m] && els[m].offsetWidth) || 300;
    };

    const i0 = Math.floor(st.pos);
    const tt = st.pos - i0;
    const wc = wOf(i0) * (1 - tt) + wOf(i0 + 1) * tt;

    for (let i = 0; i < N; i++) {
      const el = els[i];
      if (!el) continue;

      let o = i - st.pos;
      o -= N * Math.round(o / N);

      const a = Math.abs(o);

      if (a > 5) {
        if (el.style.visibility !== "hidden") {
          el.style.visibility = "hidden";
        }
        continue;
      }

      if (el.style.visibility === "hidden") {
        el.style.visibility = "visible";
      }

      const sg = Math.sign(o);
      const wi = wOf(i);

      const x =
        sg *
        (Math.min(a, 1) * (wc * 0.5 + wi * 0.3) +
          Math.max(a - 1, 0) * wi * 0.2);

      const z = -(Math.min(a, 1) * 190 + Math.max(a - 1, 0) * 95);
      const ry = -Math.max(-1, Math.min(1, o)) * 58;
      const sc = 1 - Math.min(a, 1) * 0.05;

      el.style.transform = `translate(-50%,-50%) translate3d(${x}px,0,${z}px) rotateY(${ry}deg) scale(${sc})`;
      el.style.opacity = String(Math.max(0, Math.min(1, 5 - a)));
      el.style.zIndex = String(100 - Math.round(a * 10));

      if (el.lastChild) {
        el.lastChild.style.opacity = (Math.min(a, 1) * 0.5).toFixed(2);
      }
    }

    const act = ((Math.round(st.pos) % N) + N) % N;

    if (act !== st.active) {
      st.active = act;
      setIdx(act);
    }
  };

  /* RESIZE PHOTO CARDS */
  const sizeCard = (i) => {
    const st = S.current;
    const el = cards.current[i];
    const s = stage.current;

    if (!el || !s) return;

    const r = st.r[i] || 0.8;
    const baseH = Math.min(s.clientHeight * 0.68, 520);
    const maxW = s.clientWidth * 0.62;

    let w = baseH * r;
    let h = baseH;

    if (w > maxW) {
      w = maxW;
      h = w / r;
    }

    el.style.width = `${w}px`;
    el.style.height = `${h}px`;

    st.w[i] = w;
  };

  const sizeAll = () => {
    for (let i = 0; i < nRef.current; i++) {
      sizeCard(i);
    }

    apply();
  };

  /* ANIMATION LOOP */
  const tick = (t) => {
    const st = S.current;
    const dt = Math.min(0.05, (t - (st.last || t)) / 1000);

    st.last = t;

    const k = st.reduce ? 1 : 1 - Math.exp(-dt * (st.drag ? 30 : 8));

    st.pos += (st.target - st.pos) * k;

    if (Math.abs(st.target - st.pos) < 0.0006) {
      st.pos = st.target;
    }

    apply();

    if (st.pos !== st.target || st.drag) {
      requestAnimationFrame(tick);
    } else {
      st.run = false;
      st.last = 0;
    }
  };

  const kick = () => {
    const st = S.current;

    if (!st.run) {
      st.run = true;
      st.last = 0;
      requestAnimationFrame(tick);
    }
  };

  /* NAVIGATION */
  const go = (d) => {
    const st = S.current;
    st.target = Math.round(st.target) + d;
    kick();
  };

  const goTo = (i) => {
    const st = S.current;
    const N = nRef.current;

    let d = i - st.active;
    d -= N * Math.round(d / N);

    st.target = Math.round(st.target) + d;
    kick();
  };

  const onCard = (i) => {
    if (S.current.moved > 6) return;

    if (i === S.current.active) {
      onOpen(list, i);
    } else {
      goTo(i);
    }
  };

  /* PHOTO CARDS */
  const cardEls = useMemo(
    () =>
      list.map((p, i) => (
        <button
          key={`${cat}-${p.src}`}
          ref={(el) => {
            if (el) cards.current[i] = el;
          }}
          className="cfcard"
          onClick={() => onCard(i)}
          aria-label={p.title}
        >
          <img
            src={thumb(p.src)}
            alt={p.title}
            draggable={false}
            loading="eager"
            decoding="async"
            onLoad={(e) => {
              const im = e.currentTarget;

              if (!im.naturalHeight) return;

              S.current.r[i] = im.naturalWidth / im.naturalHeight;

              sizeCard(i);
              apply();
            }}
          />

          <i className="dim" />
        </button>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cat],
  );

  /* RESET WHEN CATEGORY CHANGES */
  useEffect(() => {
    const st = S.current;

    st.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    st.pos = 0;
    st.target = 0;
    st.active = 0;
    st.r = [];
    st.w = [];

    cards.current.forEach((el, i) => {
      const im = el && el.firstChild;

      if (im && im.complete && im.naturalHeight) {
        st.r[i] = im.naturalWidth / im.naturalHeight;
      }
    });

    setIdx(0);
    sizeAll();
  }, [cat]);

  /* RESPONSIVE RESIZING */
  useEffect(() => {
    const onR = () => sizeAll();

    window.addEventListener("resize", onR);

    return () => {
      window.removeEventListener("resize", onR);
    };
  }, []);

  /* TRACKPAD SUPPORT */
  useEffect(() => {
    const el = stage.current;

    const onW = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();

      const st = S.current;
      st.target += e.deltaX / (el.clientWidth * 0.35);

      kick();

      clearTimeout(st.wt);

      st.wt = setTimeout(() => {
        st.target = Math.round(st.target);
        kick();
      }, 140);
    };

    el.addEventListener("wheel", onW, { passive: false });

    return () => {
      el.removeEventListener("wheel", onW);
    };
  }, []);

  /* SLIDESHOW */
  useEffect(() => {
    if (!auto) return;

    const id = setInterval(() => {
      if (!S.current.drag) go(1);
    }, 3200);

    return () => clearInterval(id);
  }, [auto]);

  /* BACKGROUND IMAGE */
  const cur = list[idx] || list[0];
  const curSrc = cur ? cur.src : null;

  useEffect(() => {
    if (!curSrc) return;

    setBg((b) => (b.cur === curSrc ? b : { cur: curSrc, prev: b.cur }));
  }, [curSrc]);

  /* TOUCH / MOUSE DRAG */
  const down = (e) => {
    if (e.button) return;

    const st = S.current;
    const el = stage.current;

    st.drag = true;
    st.sx = e.clientX;
    st.st = st.target;
    st.moved = 0;
    st.lx = e.clientX;
    st.lt = e.timeStamp;
    st.v = 0;

    el.classList.add("drag");
    kick();

    const W = () => el.clientWidth * 0.22;

    const move = (ev) => {
      const dx = ev.clientX - st.sx;

      st.moved = Math.max(st.moved, Math.abs(dx));

      const dtm = ev.timeStamp - st.lt;

      if (dtm > 0) {
        st.v = 0.8 * st.v + 0.2 * ((ev.clientX - st.lx) / dtm);
      }

      st.lx = ev.clientX;
      st.lt = ev.timeStamp;

      st.target = st.st - dx / W();

      kick();
    };

    const up = () => {
      st.drag = false;

      const flick = Math.max(-3, Math.min(3, (-st.v / W()) * 220));

      st.target = Math.round(st.target + flick);

      el.classList.remove("drag");

      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);

      kick();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const pad = (v) => String(v).padStart(2, "0");

  if (!cur) return null;

  return (
    <div>
      <div className="tabs">
        {CATS.map((c) => (
          <button
            key={c}
            className={`tab ${cat === c ? "on" : ""}`}
            onClick={() => setCat(c)}
          >
            {c === "Best" ? "★ Best" : c}
            <small>{listFor(c).length}</small>
          </button>
        ))}
      </div>

      <div
        className="cfstage"
        ref={stage}
        tabIndex={0}
        onPointerDown={down}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }

          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }

          if (e.key === "Enter") {
            onOpen(list, S.current.active);
          }
        }}
        aria-label="Photo gallery. Use arrow keys to browse."
      >
        {bg.prev && (
          <img
            key={`p${bg.prev}`}
            className="cfbg"
            src={thumb(bg.prev)}
            alt=""
            aria-hidden="true"
          />
        )}

        {bg.cur && (
          <img
            key={`c${bg.cur}`}
            className="cfbg in"
            src={thumb(bg.cur)}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="cfshade" />

        {cardEls}

        <div className="cfvig" />
      </div>

      <div className="cfbar">
        <div>
          <p className="cftitle" key={cur.src}>
            {cur.title}
          </p>

          <p className="cfmeta mono">
            {pad(idx + 1)} / {pad(n)} · {cur.cat}
          </p>
        </div>

        <div className="cfctl">
          <button
            className={auto ? "on" : ""}
            onClick={() => setAuto((a) => !a)}
            aria-label={auto ? "Pause slideshow" : "Play slideshow"}
          >
            {auto ? "❚❚" : "▶"}
          </button>

          <button onClick={() => go(-1)} aria-label="Previous">
            ‹
          </button>

          <button onClick={() => go(1)} aria-label="Next">
            ›
          </button>

          <button onClick={() => onOpen(list, idx)} aria-label="Full screen">
            ⤢
          </button>
        </div>
      </div>

      <div className="cfprog">
        <i style={{ width: `${((idx + 1) / n) * 100}%` }} />
      </div>

      <p className="cfhint mono">
        Drag · swipe · arrow keys · click the center photo to enlarge
      </p>
    </div>
  );
} /* MAIN PAGE */
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [year, setYear] = useState(2026);
  const [role, setRole] = useState(0);
  const [lb, setLb] = useState(null);

  const heroRef = useRef(null);
  const barRef = useRef(null);

  /* SCROLL PROGRESS */
  useEffect(() => {
    setYear(new Date().getFullYear());

    const onScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 40);

      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (barRef.current && max > 0) {
        barRef.current.style.transform = `scaleX(${Math.min(y / max, 1)})`;
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ROTATING ROLE */
  useEffect(() => {
    const id = setInterval(() => {
      setRole((r) => (r + 1) % ROLES.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  /* BASIC CONTENT PROTECTION */
  useEffect(() => {
    const blockContextMenu = (event) => {
      if (event.target.closest("img, .protected-content, .cfstage, .lb")) {
        event.preventDefault();
      }
    };

    const blockCopy = (event) => {
      if (event.target.closest("input, textarea, [contenteditable='true']")) {
        return;
      }

      event.preventDefault();
    };

    const blockShortcuts = (event) => {
      const key = event.key.toLowerCase();

      if (
        (event.ctrlKey || event.metaKey) &&
        ["c", "x", "s", "u"].includes(key)
      ) {
        if (event.target.closest("input, textarea, [contenteditable='true']")) {
          return;
        }

        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);

    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("keydown", blockShortcuts);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);

      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("keydown", blockShortcuts);
    };
  }, []);

  /* PHOTO VIEWER KEYBOARD CONTROLS */
  const lbOpen = lb !== null;

  useEffect(() => {
    if (!lbOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setLb(null);
      }

      if (e.key === "ArrowRight") {
        setLb(
          (s) =>
            s && {
              ...s,
              i: (s.i + 1) % s.items.length,
            },
        );
      }

      if (e.key === "ArrowLeft") {
        setLb(
          (s) =>
            s && {
              ...s,
              i: (s.i - 1 + s.items.length) % s.items.length,
            },
        );
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", onKey);
    };
  }, [lbOpen]);

  /* HERO MOUSE PARALLAX */
  const onMove = (e) => {
    const el = heroRef.current;

    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const r = el.getBoundingClientRect();

    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    el.style.setProperty("--mx", (px - 0.5).toFixed(3));

    el.style.setProperty("--my", (py - 0.5).toFixed(3));

    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);

    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = heroRef.current;

    if (!el) return;

    el.style.setProperty("--mx", 0);
    el.style.setProperty("--my", 0);
  };

  return (
    <>
      <style>{css}</style>

      <div className="protected-content">
        {/* SCROLL PROGRESS */}
        <div className="progress" ref={barRef} />

        {/* NAVIGATION */}
        <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
          <a href="#top" className="logo">
            Ira.
          </a>

          <div className="links">
            <a href="#about">About</a>
            <a href="#photos">Photos</a>
            <a href="#videos">Videos</a>
            <a href="#websites">Websites</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        {/* HERO */}
        <header
          id="top"
          className="hero"
          ref={heroRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <p className="tag in1">
            I&apos;M A{" "}
            <span className="role" key={role}>
              {ROLES[role]}
            </span>
          </p>

          <div className="title">
            <SplitTitle text={`Hi, I'm ${NAME}`} />
          </div>

          {imgOk && (
            <div className="stage">
              <div className="cut">
                <img
                  src={HERO_IMG}
                  alt={`${NAME}, photographer and web developer`}
                  className="cutout"
                  draggable={false}
                  onError={() => setImgOk(false)}
                />
              </div>
            </div>
          )}

          <div className="pill mono">
            const ira = {"{"} <span>&apos;photo&apos;</span> +{" "}
            <span>&apos;code&apos;</span> {"}"}
            <i className="caret" />
          </div>

          <p className="bio">
            I take photos and build the websites they live on. Based in{" "}
            {LOCATION}.
          </p>

          <a href="#photos" className="cta">
            View my work
          </a>

          <div className="scroll" aria-hidden="true" />
        </header>

        {/* ABOUT */}
        <section id="about" className="section">
          <Reveal>
            <h2 className="h2 display">About</h2>
          </Reveal>

          <div className="about">
            <Reveal delay={100}>
              <p>
                I&apos;m a photographer and an Information Technology graduate
                with a passion for combining creativity and technology. My
                technical strengths include web development, database
                management, UI/UX design, and system development, with hands-on
                experience building websites, booking systems, and custom
                applications using modern technologies.
              </p>

              <p className="muted">
                I have experience working with Next.js, React, JavaScript,
                Tailwind CSS, and Supabase, developing functional and
                user-friendly digital solutions. Alongside my technical
                background, photography and visual storytelling allow me to
                bring a creative perspective to every project I work on.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="facts mono">
                <div>
                  <span>Based in</span>
                  <span>{LOCATION}</span>
                </div>

                <div>
                  <span>Shoots</span>
                  <span>Events, portraits, studio</span>
                </div>

                <div>
                  <span>Builds</span>
                  <span>Next.js, Supabase</span>
                </div>

                <div>
                  <span>Available</span>
                  <span>Open for bookings</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PHOTOS */}
        <section id="photos" className="section">
          <Reveal>
            <h2 className="h2 display">Photos</h2>
          </Reveal>

          <Coverflow onOpen={(items, i) => setLb({ items, i })} />
        </section>

        {/* FULLSCREEN PHOTO VIEWER */}
        {lb !== null && lb.items[lb.i] && (
          <div
            className="lb"
            onClick={() => setLb(null)}
            role="dialog"
            aria-modal="true"
          >
            <img
              src={lb.items[lb.i].src}
              alt={lb.items[lb.i].title}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />

            <p className="lbcap mono">
              {lb.items[lb.i].title} · {lb.i + 1}/{lb.items.length}
            </p>

            <button
              className="x"
              onClick={() => setLb(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <button
              className="prev"
              onClick={(e) => {
                e.stopPropagation();

                setLb({
                  ...lb,
                  i: (lb.i - 1 + lb.items.length) % lb.items.length,
                });
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <button
              className="next"
              onClick={(e) => {
                e.stopPropagation();

                setLb({
                  ...lb,
                  i: (lb.i + 1) % lb.items.length,
                });
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        )}

        {/* VIDEOS */}
        <section id="videos" className="section">
          <Reveal>
            <h2 className="h2 display">Videos</h2>
          </Reveal>

          {VIDEOS.length === 0 ? (
            <Reveal>
              <div className="vempty mono">
                No videos yet.
                <br />
                Paste your links into the <code>VIDEOS</code> list at the top of{" "}
                <code>page.js</code>.
              </div>
            </Reveal>
          ) : (
            <div className="vgrid">
              {VIDEOS.map((item, i) => (
                <Reveal key={i} delay={(i % 2) * 120}>
                  <VideoCard item={item} />
                </Reveal>
              ))}
            </div>
          )}
        </section>

        {/* WEBSITES */}
        <section id="websites" className="section">
          <Reveal>
            <h2 className="h2 display">Websites</h2>
          </Reveal>

          <div className="sites">
            {SITES.map((s, i) => (
              <Reveal key={s.name} delay={i * 120}>
                <a className="site" href={s.url}>
                  <h3>{s.name}</h3>

                  <p>{s.desc}</p>

                  <span className="stack mono">{s.stack}</span>

                  <span className="go" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <Reveal>
            <h2 className="h2 display" style={{ marginBottom: "4vh" }}>
              Let&apos;s work
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <a className="mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </Reveal>

          <Reveal delay={300}>
            <div className="social">
              {LINKS.map((l) => (
                <a key={l.label} href={l.url}>
                  {l.label}
                </a>
              ))}
            </div>

            <p className="foot mono">© {year} Ira. Photo + code.</p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
