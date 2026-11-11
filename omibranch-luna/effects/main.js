/*
 * Luna helper (paperclip Skrepysh or cat) — theme effect for Remnawave Minishop (trusted-dom, api 1).
 * Omibranch · omibranch.uk · MIT
 *
 * The Omibranch cat lives in the window title bars of the Luna theme, like the
 * old Office assistant: it walks along a bar, hops to the window you read the
 * longest, sits there, falls asleep when you are away and now and then shows a
 * yellow XP balloon with a hint built from what is really on the screen.
 *
 * Rules it never breaks:
 *  - it only sits where its whole body is clear of buttons, links, fields and
 *    the content of other windows; a balloon is skipped rather than placed over
 *    a control;
 *  - it never travels across a payment button (it ducks out and reappears);
 *  - the page works and looks the same without it; prefers-reduced-motion and
 *    the in-balloon pause stop every movement.
 */

const CAT_POSES = {
  sit: { file: "effects/cat/sit.webp", w: 878, h: 1205 },
  look: { file: "effects/cat/look.webp", w: 836, h: 1207 },
  walkA: { file: "effects/cat/walk-a.webp", w: 909, h: 976 },
  walkB: { file: "effects/cat/walk-b.webp", w: 885, h: 936 },
  sleep: { file: "effects/cat/sleep.webp", w: 1146, h: 881 },
  point: { file: "effects/cat/point.webp", w: 976, h: 1231 },
  jump: { file: "effects/cat/jump.webp", w: 1051, h: 829 },
  peek: { file: "effects/cat/peek.webp", w: 966, h: 865 },
  wave: { file: "effects/cat/wave.webp", w: 898, h: 1210 },
};
const CLIP_POSES = {
    sit: { file: "effects/clip/sit.webp", w: 537, h: 1205 },
    look: { file: "effects/clip/look.webp", w: 542, h: 1210 },
    point: { file: "effects/clip/point.webp", w: 693, h: 1210 },
    sleep: { file: "effects/clip/sleep.webp", w: 1391, h: 587 },
    wave: { file: "effects/clip/wave.webp", w: 673, h: 1210 },
    peek: { file: "effects/clip/peek.webp", w: 527, h: 723 },
    jump: { file: "effects/clip/jump.webp", w: 989, h: 783 },
    walkA: { file: "effects/clip/walk-a.webp", w: 668, h: 1160 },
    walkB: { file: "effects/clip/walk-b.webp", w: 753, h: 1155 },
};
// Two helpers share one behaviour: the paperclip "Скрепыш" (default) and the cat.
const SETS = {
  clip: { poses: CLIP_POSES, k: 1.75 },
  cat: { poses: CAT_POSES, k: 1 },
};
const STORE_WHO = "luna-assistant";
const SIT_PX = 1205; // source height of the sitting pose; every pose shares its scale

const WINDOW_SELECTOR = ".card, .dialog-card, .notification-preferences";
const CONTROL_SELECTOR =
  'a, button, input, select, textarea, label, summary, [role="button"], [role="switch"], [role="tab"], [contenteditable="true"]';
const PAY_SELECTOR = ".payment-submit-button, .btn-primary";
const STORE_PAUSE = "luna-cat-paused";
const STORE_HIDE = "luna-cat-hidden";

const TEXT = {
  ru: {
    helper: "Помощник",
    menuTitle: "Чем помочь?",
    menuText: "Я сижу на окне, которое вы читаете, и подсказываю по делу.",
    tip: "Подсказка",
    nap: "Поспи",
    hide: "Спрячься",
    wake: "Разбудить",
    close: "Закрыть",
    morning: "Доброе утро",
    day: "Добрый день",
    evening: "Добрый вечер",
    night: "Доброй ночи",
    homeActive: (cta) => cta ? `Подписка активна. Новое устройство подключается кнопкой «${cta}».` : "Подписка активна. Я посижу здесь.",
    homeInactiveTitle: "Подписка не активна",
    homeInactiveTrial: (cta) => `Можно начать с пробного периода: кнопка «${cta}».`,
    homeInactive: (cta) => cta ? `Вернуть доступ можно кнопкой «${cta}».` : "Вернуть доступ можно оплатой подписки.",
    trafficTitle: "Трафик заканчивается",
    traffic: (pct) => `Использовано ${pct}%. Как на диске C:, только интереснее.`,
    checkoutTitle: "Похоже, вы выбираете тариф",
    checkoutBest: (label, unit, worst) => `Дешевле всего месяц выходит в варианте «${label}»: ${unit} вместо ${worst}.`,
    checkoutPlain: "Выберите период и способ оплаты, я подожду.",
    changeTitle: "Похоже, вы меняете тариф",
    change: "Я посижу тут, пока вы выбираете.",
    devicesTitle: "Найдено новое оборудование",
    devicesFull: (used, max) => `Шучу. Подключено ${used} из ${max}, мест больше нет: ненужное можно отключить ниже.`,
    devices: (used, max) => `Шучу. Подключено ${used} из ${max}.`,
    supportTitle: "Похоже, вам нужна помощь",
    support: "Опишите проблему в обращении. Отвечают люди.",
    settingsTitle: "Настройки",
    settings: "Здесь меняют язык и режим темы. А меня можно усыпить: нажмите на меня.",
    inviteTitle: "Похоже, вы зовёте друзей",
    invite: (cta) => `Ссылку проще всего отправить кнопкой «${cta}».`,
    installTitle: "Похоже, вы настраиваете подключение",
    install: "Выберите платформу и приложение, шаги появятся ниже.",
    sleepTitle: "Сплю",
    sleep: "Нажмите на меня, чтобы разбудить.",
  },
  en: {
    helper: "Helper",
    menuTitle: "How can I help?",
    menuText: "I sit on the window you are reading and give useful hints.",
    tip: "A hint",
    nap: "Take a nap",
    hide: "Hide",
    wake: "Wake up",
    close: "Close",
    morning: "Good morning",
    day: "Good afternoon",
    evening: "Good evening",
    night: "Good night",
    homeActive: (cta) => cta ? `Your subscription is active. Add a new device with “${cta}”.` : "Your subscription is active. I will sit here.",
    homeInactiveTitle: "Subscription inactive",
    homeInactiveTrial: (cta) => `You can start with a trial: “${cta}”.`,
    homeInactive: (cta) => cta ? `Get access back with “${cta}”.` : "Get access back by paying for a subscription.",
    trafficTitle: "Running low on traffic",
    traffic: (pct) => `${pct}% used. Like drive C:, only more exciting.`,
    checkoutTitle: "It looks like you are choosing a plan",
    checkoutBest: (label, unit, worst) => `The cheapest month is in “${label}”: ${unit} instead of ${worst}.`,
    checkoutPlain: "Pick a period and a payment method, I will wait.",
    changeTitle: "It looks like you are changing your plan",
    change: "I will sit here while you choose.",
    devicesTitle: "Found new hardware",
    devicesFull: (used, max) => `Just kidding. ${used} of ${max} connected, no free slots: unused ones can be removed below.`,
    devices: (used, max) => `Just kidding. ${used} of ${max} connected.`,
    supportTitle: "It looks like you need help",
    support: "Describe the problem in a request. People answer.",
    settingsTitle: "Settings",
    settings: "Language and theme mode live here. You can also put me to sleep: click me.",
    inviteTitle: "It looks like you are inviting friends",
    invite: (cta) => `The easiest way to share the link is “${cta}”.`,
    installTitle: "It looks like you are setting up a connection",
    install: "Pick a platform and an app, the steps will appear below.",
    sleepTitle: "Sleeping",
    sleep: "Click me to wake me up.",
  },
};

const CLIP_TEXT = {
  ru: {
    support: "Опишите проблему в обращении. Отвечают люди, а не скрепки.",
    callOther: "Позвать котика",
    menuText: "Я скрепка-помощник Скрепыш. Сижу на окне, которое вы читаете, и подсказываю по делу.",
  },
  en: {
    support: "Describe the problem in a request. People answer, not paperclips.",
    callOther: "Call the cat",
    menuText: "I am Skrepysh, the paperclip helper. I sit on the window you are reading and give useful hints.",
  },
};
const CAT_TEXT = {
  ru: { support: "Опишите проблему в обращении. Отвечают люди, а не коты.", callOther: "Позвать Скрепыша" },
  en: { support: "Describe the problem in a request. People answer, not cats.", callOther: "Call the paperclip" },
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const box = (r, pad = 0) => ({ x: r.left + pad, y: r.top + pad, w: r.width - 2 * pad, h: r.height - 2 * pad });

function storage(kind, key, value) {
  try {
    const s = kind === "session" ? sessionStorage : localStorage;
    if (value === undefined) return s.getItem(key);
    if (value === null) s.removeItem(key);
    else s.setItem(key, value);
  } catch {
    /* Private mode or blocked storage: the cat simply forgets. */
  }
  return null;
}

function visibleText(el) {
  return String(el?.textContent || "").replace(/\s+/g, " ").trim();
}

function parseMoney(text) {
  const m = String(text || "").replace(/ | /g, " ").match(/(\d[\d ]*(?:[.,]\d+)?)/);
  if (!m) return NaN;
  return parseFloat(m[1].replace(/ /g, "").replace(",", "."));
}

export function mount(host, initialContext) {
  let context = initialContext || {};
  const lang = String(context.language || document.documentElement.lang || "ru").toLowerCase().startsWith("ru") ? "ru" : "en";
  let assistant = storage("local", STORE_WHO) === "cat" ? "cat" : "clip";
  let T = { ...TEXT[lang], ...(assistant === "cat" ? CAT_TEXT : CLIP_TEXT)[lang] };
  const POSES_NOW = () => SETS[assistant].poses;
  const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => Boolean(context.reducedMotion || reduceQuery.matches);

  if (storage("session", STORE_HIDE) === "1") {
    return { update(next) { context = next || context; }, dispose() {} };
  }

  /* ---------------- DOM ---------------- */
  const layer = document.createElement("div");
  layer.className = "luna-cat-layer";
  layer.setAttribute("aria-hidden", "false");

  const cat = document.createElement("button");
  cat.type = "button";
  cat.className = "luna-cat";
  cat.setAttribute("aria-label", T.helper);
  cat.dataset.pose = "sit";
  const flip = document.createElement("span");
  flip.className = "luna-cat-flip";
  cat.appendChild(flip);
  const imgs = {};
  function buildImgs() {
    flip.textContent = "";
    for (const k of Object.keys(imgs)) delete imgs[k];
    for (const [name, pose] of Object.entries(POSES_NOW())) {
      const img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      img.draggable = false;
      img.dataset.pose = name;
      img.src = host.asset(pose.file);
      flip.appendChild(img);
      imgs[name] = img;
    }
    cat.dataset.who = assistant;
  }
  buildImgs();
  const zzz = document.createElement("span");
  zzz.className = "luna-cat-zzz";
  zzz.textContent = "z";
  cat.appendChild(zzz);

  const balloon = document.createElement("div");
  balloon.className = "luna-balloon";
  balloon.setAttribute("role", "status");
  balloon.setAttribute("aria-live", "polite");
  balloon.hidden = true;
  const bHead = document.createElement("div");
  bHead.className = "luna-balloon-head";
  const bIcon = document.createElement("img");
  bIcon.className = "luna-balloon-icon";
  bIcon.alt = "";
  bIcon.src = host.asset("icons/info.webp");
  const bTitle = document.createElement("strong");
  const bClose = document.createElement("button");
  bClose.type = "button";
  bClose.className = "luna-balloon-close";
  bClose.setAttribute("aria-label", T.close);
  bHead.append(bIcon, bTitle, bClose);
  const bText = document.createElement("p");
  const bActions = document.createElement("div");
  bActions.className = "luna-balloon-actions";
  const bTail = document.createElement("span");
  bTail.className = "luna-balloon-tail";
  balloon.append(bHead, bText, bActions, bTail);

  layer.append(cat, balloon);
  document.body.appendChild(layer);

  /* ---------------- state ---------------- */
  const S = {
    scale: 0, // px per source px
    pose: "sit",
    face: 1, // 1 = right, -1 = left
    mode: "none", // none | enter | sit | walk | jump | duck | sleep
    perch: null, // { el, u }
    goal: null, // { el, u }
    jump: null, // { from:{el,u}, to:{el,u}, t0, dur, arc }
    duck: null,
    modeT: 0,
    lastInput: performance.now(),
    paused: storage("local", STORE_PAUSE) === "1",
    scores: new Map(),
    pointer: { x: -1, y: -1, t: 0 },
    lastTap: { el: null, t: 0 },
    scrollT: 0,
    screen: "",
    screenT: performance.now(),
    tipShown: new Set(),
    lastTip: 0,
    balloon: null, // { kind, until, side }
    raf: null,
    lookT: 0,
    x: -999,
    y: -999,
    visible: false,
    dialogOpen: false,
  };

  function poseSize(name) {
    const p = POSES_NOW()[name];
    return { w: Math.round(p.w * S.scale), h: Math.round(p.h * S.scale) };
  }

  function setPose(name) {
    if (S.pose === name) return;
    S.pose = name;
    cat.dataset.pose = name;
  }

  /* ---------------- geometry ---------------- */
  function barHeight(win) {
    const cs = getComputedStyle(win);
    const v = parseFloat(cs.getPropertyValue(win.classList.contains("card-compact") ? "--lw-bar-h-sm" : "--lw-bar-h"));
    return Number.isFinite(v) && v > 0 ? v : 24;
  }

  function viewport() {
    const nav = document.querySelector(".bottom-nav");
    let bottom = innerHeight;
    if (nav && innerWidth < 1024) {
      const r = nav.getBoundingClientRect();
      if (r.height && r.top < innerHeight) bottom = r.top;
    }
    let left = 0;
    if (nav && innerWidth >= 1024) left = nav.getBoundingClientRect().right;
    return { top: 0, bottom, left, right: innerWidth };
  }

  function openDialog() {
    const cards = [...document.querySelectorAll(".dialog .dialog-card")].filter((el) => el.getClientRects().length);
    return cards[cards.length - 1] || null;
  }

  function windows() {
    const dlg = openDialog();
    if (dlg) return [dlg];
    return [...document.querySelectorAll(WINDOW_SELECTOR)].filter(
      (el) => !el.closest(".dialog") && el.getClientRects().length && el.offsetWidth > 120
    );
  }

  function titleRight(win, r) {
    // A real title sitting in the bar (status, dialog): the cat sits after it.
    const h = win.matches(".status-card:not(.status-card-inactive)")
      ? win.querySelector(".sub-status-main > h2")
      : win.matches(".dialog-card") ? win.querySelector(".dialog-title-copy > h2") : null;
    if (!h) return 30;
    const range = document.createRange();
    range.selectNodeContents(h);
    const rects = [...range.getClientRects()].filter((x) => x.width);
    range.detach?.();
    if (!rects.length) return 30;
    const right = Math.max(...rects.map((x) => x.right));
    return right - r.left + 10;
  }

  function span(win, r) {
    const { w } = poseSize("sit");
    let lo = titleRight(win, r) + w / 2;
    let hi = r.width - 10 - w / 2;
    const close = win.querySelector(".dialog-close-button");
    if (close) hi = Math.min(hi, close.getBoundingClientRect().left - r.left - 8 - w / 2);
    return { lo, hi };
  }

  let obstacleCache = { t: 0, list: [], pay: [] };
  // Everything the cat must not cover: controls, and every piece of real
  // content (text, pictures, progress bars). Window frames, paddings and the
  // wallpaper are fair game.
  function obstacles(now) {
    if (now - obstacleCache.t < 400) return obstacleCache;
    const list = [];
    const vp = viewport();
    const inView = (b) => b.y < vp.bottom && b.y + b.h > 0 && b.w > 0 && b.h > 0;
    const scope = openDialog() || document.querySelector(".app-shell") || document.body;
    // The shop logo (mark + name) is never covered by a balloon or the cat.
    const add = (el, ctrl) => {
      if (el.matches(".brand-mark, .home-brand h1, .login-brand h1, .home-logo-slot")) ctrl = true;
      const b = box(el.getBoundingClientRect());
      if (inView(b)) list.push({ b, el, ctrl, win: el.closest(WINDOW_SELECTOR) });
    };
    for (const el of scope.querySelectorAll(CONTROL_SELECTOR)) {
      if (layer.contains(el) || el.matches(".dialog-backdrop")) continue;
      add(el, true);
    }
    const seen = new Set();
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = n.parentElement;
      if (!el || seen.has(el) || !n.nodeValue.trim() || layer.contains(el)) continue;
      seen.add(el);
      if (el.closest(CONTROL_SELECTOR)) continue;
      add(el, false);
    }
    for (const el of scope.querySelectorAll("svg, img, .progress, .brand-mark")) {
      if (seen.has(el) || layer.contains(el) || el.closest(CONTROL_SELECTOR)) continue;
      add(el, false);
    }
    const pay = [...scope.querySelectorAll(PAY_SELECTOR)].map((el) => box(el.getBoundingClientRect()));
    obstacleCache = { t: now, list, pay };
    return obstacleCache;
  }

  // Feet point of the cat on a perch, in viewport coordinates.
  function feet(perch) {
    const r = perch.el.getBoundingClientRect();
    return { x: r.left + perch.u, y: r.top + barHeight(perch.el) - 1, r };
  }

  function clearAt(win, u, now, pose = "sit") {
    const r = win.getBoundingClientRect();
    const { w, h } = poseSize(pose);
    const fy = r.top + barHeight(win) - 1;
    const b = { x: r.left + u - w / 2, y: fy - h, w, h };
    const vp = viewport();
    if (b.y < vp.top + 4 || fy > vp.bottom - 2 || b.x < vp.left + 2 || b.x + b.w > vp.right - 2) return false;
    for (const o of obstacles(now).list) {
      if (!o.ctrl && o.win === win) continue; // its own title is handled by span()
      if (hit(b, o.b)) return false;
    }
    return true;
  }

  function findSeat(win, now, preferX) {
    const r = win.getBoundingClientRect();
    const { lo, hi } = span(win, r);
    if (hi < lo) return null;
    const want = clamp(preferX == null ? lo + (hi - lo) * 0.78 : preferX - r.left, lo, hi);
    for (let d = 0; d <= hi - lo; d += 10) {
      for (const u of d ? [want + d, want - d] : [want]) {
        if (u < lo || u > hi) continue;
        if (clearAt(win, u, now)) return { el: win, u };
      }
    }
    return null;
  }

  /* ---------------- attention ---------------- */
  function focusWindow(list) {
    const now = performance.now();
    if (S.lastTap.el && now - S.lastTap.t < 8000 && list.includes(S.lastTap.el)) return S.lastTap.el;
    if (S.pointer.t && now - S.pointer.t < 4000) {
      for (const el of list) {
        const r = el.getBoundingClientRect();
        if (S.pointer.x >= r.left && S.pointer.x <= r.right && S.pointer.y >= r.top && S.pointer.y <= r.bottom) return el;
      }
    }
    const vp = viewport();
    const line = vp.top + (vp.bottom - vp.top) * 0.45;
    let best = null;
    let bd = Infinity;
    for (const el of list) {
      const r = el.getBoundingClientRect();
      const d = line < r.top ? r.top - line : line > r.bottom ? line - r.bottom : 0;
      if (d < bd) { bd = d; best = el; }
    }
    return bd < (vp.bottom - vp.top) * 0.4 ? best : null;
  }

  function tickAttention(dt) {
    const list = windows();
    for (const [el, v] of S.scores) {
      if (!el.isConnected || !list.includes(el)) S.scores.delete(el);
      else S.scores.set(el, v * Math.pow(0.8, dt));
    }
    const f = focusWindow(list);
    if (f) S.scores.set(f, (S.scores.get(f) || 0) + dt);
    return list;
  }

  function preferredWindow(list) {
    let best = null;
    let bs = 0;
    for (const el of list) {
      const s = S.scores.get(el) || 0;
      if (s > bs) { bs = s; best = el; }
    }
    if (!best) {
      const homeCard = host.targets("home.card.surface")[0]?.parentElement;
      best = list.includes(homeCard) ? homeCard : list[0] || null;
    }
    return { el: best, score: bs };
  }

  /* ---------------- movement ---------------- */
  function startJump(to, now) {
    const from = S.perch;
    if (!from || reduced()) { S.perch = to; S.mode = "sit"; return; }
    const a = feet(from);
    const b = feet(to);
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    // Never fly across a pay button: sample the arc, otherwise duck and reappear.
    const { pay } = obstacles(now);
    const { w, h } = poseSize("jump");
    const arc = clamp(dist * 0.35, 26, 90);
    let blocked = false;
    for (let i = 1; i < 12 && !blocked; i++) {
      const t = i / 12;
      const x = lerp(a.x, b.x, t);
      const y = lerp(a.y, b.y, t) - arc * 4 * t * (1 - t);
      const bb = { x: x - w / 2, y: y - h, w, h };
      blocked = pay.some((p) => hit(bb, p));
    }
    if (blocked || dist > innerHeight * 0.9) {
      S.duck = { to, t0: now };
      S.mode = "duck";
      return;
    }
    S.face = b.x >= a.x ? 1 : -1;
    S.jump = { from: { ...from }, to, t0: now, dur: clamp(260 + dist * 0.9, 360, 720), arc };
    S.mode = "jump";
  }

  function travelTo(seat, now) {
    if (!seat) return;
    if (S.perch && S.perch.el === seat.el) {
      S.goal = seat;
      if (Math.abs(seat.u - S.perch.u) > 6 && !reduced()) S.mode = "walk";
      else { S.perch.u = seat.u; S.mode = "sit"; }
      return;
    }
    startJump(seat, now);
  }

  /* ---------------- balloon ---------------- */
  function greeting() {
    const h = new Date().getHours();
    return h < 5 ? T.night : h < 12 ? T.morning : h < 18 ? T.day : h < 23 ? T.evening : T.night;
  }

  function primaryText(scope) {
    const el = [...(scope || document).querySelectorAll(".btn-primary")].find((b) => b.getClientRects().length && visibleText(b));
    return el ? visibleText(el) : "";
  }

  function tipFor(screen) {
    if (screen === "checkout") {
      const dlg = openDialog();
      const cards = [...(dlg?.querySelectorAll(".period-card") || [])];
      const rows = cards
        .map((c) => {
          const unitEl = c.querySelector(".period-unit-price");
          const flow = unitEl?.querySelector("[aria-label]");
          let unitText = flow ? String(flow.getAttribute("aria-label") || "").trim() : "";
          if (!unitText && unitEl) unitText = visibleText(unitEl).replace(/\s*(за месяц|per month|\/\s*мес\.?|a month)\s*$/i, "");
          if (lang === "ru") unitText = unitText.replace(/(\d)\.(\d)/, "$1,$2");
          const label = visibleText(c.querySelector("strong")) || visibleText(c).split(" ").slice(0, 2).join(" ");
          return { label, unitText, unit: parseMoney(unitText) };
        })
        .filter((x) => x.label && Number.isFinite(x.unit) && x.unit > 0 && x.unitText);
      if (rows.length >= 2) {
        const best = rows.reduce((a, b) => (b.unit < a.unit ? b : a));
        const worst = rows.reduce((a, b) => (b.unit > a.unit ? b : a));
        if (worst.unit - best.unit >= 1) {
          return { title: T.checkoutTitle, text: T.checkoutBest(best.label, best.unitText, worst.unitText), icon: "info" };
        }
      }
      return { title: T.checkoutTitle, text: T.checkoutPlain, icon: "info" };
    }
    if (screen === "change") return { title: T.changeTitle, text: T.change, icon: "info" };
    if (screen === "home") {
      const inactive = document.querySelector(".status-card-inactive");
      const trialBtn = document.querySelector(".trial-card-action");
      if (inactive) {
        if (trialBtn && visibleText(trialBtn)) return { title: T.homeInactiveTitle, text: T.homeInactiveTrial(visibleText(trialBtn)), icon: "warning" };
        return { title: T.homeInactiveTitle, text: T.homeInactive(primaryText(document.querySelector(".home-bottom"))), icon: "warning" };
      }
      let pct = 0;
      for (const el of document.querySelectorAll(".traffic-card-compact .traffic-summary-right span:last-child")) {
        const v = parseFloat(visibleText(el));
        if (Number.isFinite(v)) pct = Math.max(pct, v);
      }
      if (pct >= 85) return { title: T.trafficTitle, text: T.traffic(Math.round(pct)), icon: "warning", win: document.querySelector(".traffic-card-compact") };
      return { title: greeting(), text: T.homeActive(primaryText(document.querySelector(".home-bottom"))), icon: "info" };
    }
    if (screen === "devices") {
      const m = visibleText(document.querySelector(".devices-summary-card")).match(/(\d+)\s*(?:из|of|\/)\s*(\d+)/i);
      if (m) {
        const used = +m[1];
        const max = +m[2];
        return { title: T.devicesTitle, text: used >= max ? T.devicesFull(used, max) : T.devices(used, max), icon: "info" };
      }
      return null;
    }
    if (screen === "support") return { title: T.supportTitle, text: T.support, icon: "info" };
    if (screen === "settings") return { title: T.settingsTitle, text: T.settings, icon: "info" };
    if (screen === "invite") {
      const btn = [...document.querySelectorAll(".gift-entry .btn, .bonus-card .btn")].find((b) => /копир|copy/i.test(visibleText(b)));
      return btn ? { title: T.inviteTitle, text: T.invite(visibleText(btn)), icon: "info" } : null;
    }
    if (screen === "install") return { title: T.installTitle, text: T.install, icon: "info" };
    return null;
  }

  function clearActions() {
    bActions.replaceChildren();
    bActions.hidden = true;
  }

  function addAction(label, fn) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "luna-balloon-btn";
    b.textContent = label;
    host.listen(b, "click", (e) => { e.stopPropagation(); fn(); });
    bActions.appendChild(b);
    bActions.hidden = false;
  }

  function showBalloon({ title, text, icon = "info", actions = null, kind = "tip", ttl = 8000 }) {
    bTitle.textContent = title;
    bText.textContent = text;
    bIcon.src = host.asset(icon === "warning" ? "icons/warning.webp" : "icons/info.webp");
    clearActions();
    if (actions) for (const [label, fn] of actions) addAction(label, fn);
    balloon.hidden = false;
    balloon.dataset.kind = kind;
    S.balloon = { kind, until: performance.now() + ttl, place: null };
    balloon.classList.remove("is-in");
    void balloon.offsetWidth;
    balloon.classList.add("is-in");
    if (!placeBalloon(performance.now(), true)) hideBalloon();
  }

  function hideBalloon() {
    balloon.hidden = true;
    S.balloon = null;
    if (S.mode === "sit" && (S.pose === "point" || S.pose === "wave")) setPose("sit");
  }

  // Balloon goes above the cat, else below the bar; never over a control.
  function placeBalloon(now, first = false) {
    if (!S.balloon || !S.perch) return false;
    const vp = viewport();
    const bw = Math.min(268, innerWidth - 24);
    balloon.style.width = bw + "px";
    const bh = balloon.offsetHeight || 90;
    const { h } = poseSize(S.pose);
    const f = feet(S.perch);
    const catTop = f.y - h;
    const tries = [
      { side: "above", y: catTop - bh - 12 },
      { side: "below", y: f.y + 10 },
    ];
    const r = S.perch.el.getBoundingClientRect();
    const leftHalf = f.x < r.left + r.width / 2;
    const xs = leftHalf ? [0.22, 0.5, 0.78] : [0.78, 0.5, 0.22];
    const all = obstacles(now).list;
    const ctrls = all.filter((o) => o.ctrl);
    // First try to cover no text at all, then accept text but never a control.
    const texts = all.filter((o) => !o.ctrl);
    for (const strict of first ? [true, false] : [false]) {
      for (const t of first ? tries : tries.filter((x) => x.side === S.balloon.place?.side)) {
        for (const fx of first ? xs : [S.balloon.place?.fx ?? xs[0]]) {
          const x = clamp(f.x - bw * fx, vp.left + 8, vp.right - bw - 8);
          const b = { x, y: t.y, w: bw, h: bh };
          if (b.y < vp.top + 6 || b.y + b.h > vp.bottom - 6) continue;
          if (ctrls.some((o) => hit(b, o.b))) continue;
          if (strict && texts.some((o) => hit(b, o.b))) continue;
          S.balloon.place = { side: t.side, fx, strict, toward: x + bw / 2 >= f.x ? 1 : -1 };
          balloon.dataset.side = t.side;
          balloon.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(t.y)}px, 0)`;
          bTail.style.left = clamp(f.x - x - 9, 14, bw - 30) + "px";
          return true;
        }
      }
    }
    return false;
  }

  function maybeTip(now) {
    if (S.paused || S.balloon || S.mode !== "sit" || !S.perch) return;
    if (S.lastTip && now - S.lastTip < 12000) return;
    if (now - S.scrollT < 1500 || now - S.screenT < (S.screen === "checkout" ? 5000 : 3000)) return;
    if (document.activeElement && document.activeElement.matches?.("input, textarea, select, [contenteditable]")) return;
    if (S.tipShown.has(S.screen)) return;
    const tip = tipFor(S.screen);
    if (!tip) { S.tipShown.add(S.screen); return; }
    if (tip.win && S.perch.el !== tip.win && !reduced()) {
      const seat = findSeat(tip.win, now);
      if (seat) { travelTo(seat, now); return; }
    }
    S.tipShown.add(S.screen);
    S.lastTip = now;
    setPose(S.screen === "home" && !document.querySelector(".status-card-inactive") ? "wave" : "point");
    showBalloon(tip);
  }

  /* ---------------- screens ---------------- */
  function detectScreen() {
    const dlg = openDialog();
    if (dlg) return dlg.matches(".webapp-payment-dialog") ? "checkout" : dlg.matches(".webapp-tariff-change-dialog") ? "change" : "dialog";
    if (document.querySelector(".home-screen")) return "home";
    if (document.querySelector(".devices-summary-card")) return "devices";
    if (document.querySelector(".support-overview-card")) return "support";
    if (document.querySelector(".settings-profile")) return "settings";
    if (document.querySelector(".gift-entry, .bonus-card")) return "invite";
    if (document.querySelector(".install-layout")) return "install";
    return location.pathname;
  }

  /* ---------------- pause, sleep, menu ---------------- */
  function setPaused(v) {
    S.paused = v;
    storage("local", STORE_PAUSE, v ? "1" : null);
    hideBalloon();
    if (v) { S.mode = "sleep"; setPose("sleep"); }
    else { S.mode = "sit"; setPose("sit"); S.lastInput = performance.now(); }
    layer.classList.toggle("is-paused", v);
  }

  function switchAssistant() {
    assistant = assistant === "clip" ? "cat" : "clip";
    storage("local", STORE_WHO, assistant);
    T = { ...TEXT[lang], ...(assistant === "cat" ? CAT_TEXT : CLIP_TEXT)[lang] };
    cat.setAttribute("aria-label", T.helper);
    hideBalloon();
    buildImgs();
    S.scale = 0;
    S.pose = "";
    setPose(S.mode === "sleep" ? "sleep" : "sit");
    S.tipShown.clear();
    const imgList = Object.values(imgs);
    Promise.all(imgList.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))).then(() => {
      if (!host.signal.aborted) { computeScale(); S.lastInput = performance.now(); }
    });
  }

  function hideCat() {
    storage("session", STORE_HIDE, "1");
    hideBalloon();
    layer.classList.add("is-gone");
    host.timeout(() => { layer.hidden = true; }, reduced() ? 0 : 260);
  }

  host.listen(cat, "click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (S.paused) { setPaused(false); return; }
    if (S.balloon?.kind === "menu") { hideBalloon(); return; }
    if (S.mode !== "sit" && S.mode !== "sleep") return;
    if (S.mode === "sleep") { S.mode = "sit"; setPose("sit"); }
    setPose("point");
    showBalloon({
      title: T.menuTitle,
      text: T.menuText,
      kind: "menu",
      ttl: 15000,
      actions: [
        [T.tip, () => { S.tipShown.delete(S.screen); S.lastTip = 0; S.screenT = 0; S.scrollT = 0; hideBalloon(); maybeTip(performance.now()); }],
        [T.nap, () => setPaused(true)],
        [T.callOther, () => switchAssistant()],
        [T.hide, () => hideCat()],
      ],
    });
  });
  host.listen(bClose, "click", (e) => { e.stopPropagation(); hideBalloon(); });

  /* ---------------- input ---------------- */
  const wake = () => {
    S.lastInput = performance.now();
    if (S.mode === "sleep" && !S.paused) { S.mode = "sit"; setPose("sit"); }
  };
  host.listen(window, "pointermove", (e) => {
    if (e.pointerType === "touch") return;
    S.pointer = { x: e.clientX, y: e.clientY, t: performance.now() };
    wake();
  });
  host.listen(window, "pointerdown", (e) => {
    const win = e.target instanceof Element ? e.target.closest(WINDOW_SELECTOR) : null;
    if (win) S.lastTap = { el: win, t: performance.now() };
    if (S.balloon && S.balloon.kind !== "menu" && !balloon.contains(e.target) && !cat.contains(e.target)) hideBalloon();
    if (S.screen === "checkout" && e.target instanceof Element && e.target.closest(".dialog-card")) S.screenT = performance.now();
    wake();
  }, true);
  host.listen(window, "keydown", wake);
  host.listen(window, "scroll", () => { S.scrollT = performance.now(); wake(); }, true);
  host.listen(window, "resize", () => { S.scale = 0; obstacleCache.t = 0; });

  /* ---------------- main loop ---------------- */
  let last = performance.now();
  let tickT = 0;

  function computeScale() {
    const bar = 24;
    const sitH = clamp(bar + 18 + (innerWidth >= 1024 ? 6 : 0), 38, 50);
    S.scale = (sitH * SETS[assistant].k) / SIT_PX;
    for (const [name, img] of Object.entries(imgs)) {
      const { w, h } = poseSize(name);
      img.width = w;
      img.height = h;
    }
  }

  function chooseHome(now) {
    const list = windows();
    const pref = preferredWindow(list);
    const order = [pref.el, ...list.filter((x) => x !== pref.el)].filter(Boolean);
    for (const el of order) {
      const seat = findSeat(el, now, S.pointer.t && now - S.pointer.t < 4000 ? S.pointer.x : null);
      if (seat) return seat;
    }
    return null;
  }

  function think(now, dt) {
    const list = tickAttention(dt);
    const scr = detectScreen();
    const dialog = Boolean(openDialog());
    if (dialog !== S.dialogOpen) {
      S.dialogOpen = dialog;
      layer.classList.toggle("is-over-dialog", dialog);
      hideBalloon();
      obstacleCache.t = 0;
    }
    if (scr !== S.screen) {
      S.screen = scr;
      S.screenT = now;
      if (S.balloon) hideBalloon();
      S.scores.clear();
    }
    if (S.paused) {
      if (!S.perch || !S.perch.el.isConnected || !list.includes(S.perch.el)) {
        S.perch = chooseHome(now);
      }
      return;
    }
    if (S.perch && (S.mode === "jump" || S.mode === "duck" || S.mode === "enter")) return;

    const perchOk = S.perch && S.perch.el.isConnected && list.includes(S.perch.el) && clearAt(S.perch.el, S.perch.u, now, S.pose === "sleep" ? "sleep" : "sit");
    const pref = preferredWindow(list);
    const idle = now - S.lastInput;
    const night = new Date().getHours() < 6;

    if (!perchOk) {
      const seat = chooseHome(now);
      if (!seat) { S.visible = false; return; }
      if (!S.perch || !S.perch.el.isConnected || !S.visible) {
        S.perch = seat;
        S.mode = reduced() ? "sit" : "enter";
        S.modeT = now;
        S.visible = true;
        if (!reduced()) setPose("peek");
      } else {
        travelTo(seat, now);
      }
      return;
    }
    S.visible = true;

    if (S.mode === "sleep") return;
    if (idle > (night ? 20000 : 45000) && S.mode === "sit" && !S.balloon) {
      S.mode = "sleep";
      setPose("sleep");
      return;
    }
    if (S.balloon && S.balloon.kind === "tip" && pref.el && pref.el !== S.perch.el && pref.score > 1.4 && now - S.lastTip > 2500) {
      hideBalloon(); // the visitor moved on, so does the hint
    }
    if (S.mode === "sit" && !S.balloon && pref.el && pref.el !== S.perch.el) {
      const cur = S.scores.get(S.perch.el) || 0;
      if (pref.score > 1.8 && pref.score > cur * 1.25) {
        const seat = findSeat(pref.el, now, S.pointer.t && now - S.pointer.t < 4000 ? S.pointer.x : null);
        if (seat) { travelTo(seat, now); return; }
      }
    }
    if (S.mode === "sit" && !S.balloon && S.pointer.t && now - S.pointer.t < 1500 && !reduced()) {
      // Curious about a slow pointer on its own window: shuffle closer.
      const r = S.perch.el.getBoundingClientRect();
      if (S.pointer.y >= r.top && S.pointer.y <= r.bottom) {
        const { lo, hi } = span(S.perch.el, r);
        const u = clamp(S.pointer.x - r.left, lo, hi);
        if (Math.abs(u - S.perch.u) > 70 && clearAt(S.perch.el, u, now)) { S.goal = { el: S.perch.el, u }; S.mode = "walk"; }
      }
    }
    if (S.mode === "sit" && !S.balloon && !reduced() && now > (S.wanderT || (S.wanderT = now + 9000))) {
      // Cats shift about: now and then a few steps along the bar.
      S.wanderT = now + 9000 + Math.random() * 8000;
      const r = S.perch.el.getBoundingClientRect();
      const { lo, hi } = span(S.perch.el, r);
      if (hi - lo > 40) {
        const u = clamp(S.perch.u + (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 60), lo, hi);
        if (Math.abs(u - S.perch.u) > 20 && clearAt(S.perch.el, u, now)) { S.goal = { el: S.perch.el, u }; S.mode = "walk"; }
      }
    }
    maybeTip(now);
  }

  function render(now) {
    if (!S.perch || !S.visible) {
      layer.classList.add("is-away");
      return;
    }
    layer.classList.remove("is-away");
    let x;
    let y;
    let squash = 1;
    const rm = reduced();
    if (S.mode === "enter") {
      const t = (now - S.modeT) / 1000;
      const f = feet(S.perch);
      x = f.x;
      y = f.y;
      if (t < 1.1) setPose("peek");
      else { S.mode = "sit"; setPose("sit"); }
    } else if (S.mode === "jump" && S.jump) {
      const t = clamp((now - S.jump.t0) / S.jump.dur, 0, 1);
      const a = feet(S.jump.from);
      const b = feet(S.jump.to);
      const e = easeInOut(t);
      x = lerp(a.x, b.x, e);
      y = lerp(a.y, b.y, e) - S.jump.arc * 4 * e * (1 - e);
      setPose(t < 0.12 || t > 0.9 ? "walkB" : "jump");
      if (t >= 1) {
        S.perch = S.jump.to;
        S.jump = null;
        S.mode = "sit";
        S.landT = now;
        setPose("sit");
      }
    } else if (S.mode === "duck" && S.duck) {
      const t = (now - S.duck.t0) / 1000;
      if (t < 0.22) {
        const f = feet(S.perch);
        x = f.x; y = f.y;
        squash = 1 - t / 0.22;
      } else {
        if (S.perch !== S.duck.to) S.perch = S.duck.to;
        const f = feet(S.perch);
        x = f.x; y = f.y;
        squash = clamp((t - 0.32) / 0.25, 0, 1);
        if (t > 0.6) { S.mode = "sit"; S.duck = null; squash = 1; }
      }
      setPose("sit");
    } else if (S.mode === "walk" && S.goal) {
      const dir = Math.sign(S.goal.u - S.perch.u);
      S.face = dir || S.face;
      const step = 64 * Math.min(0.05, (now - last) / 1000);
      if (Math.abs(S.goal.u - S.perch.u) <= step) { S.perch.u = S.goal.u; S.mode = "sit"; S.goal = null; setPose("sit"); }
      else S.perch.u += dir * step;
      if (S.mode === "walk") setPose(Math.floor(now / 150) % 2 ? "walkA" : "walkB");
      const f = feet(S.perch);
      x = f.x;
      y = f.y - (Math.floor(now / 150) % 2 ? 1 : 0);
    } else {
      const f = feet(S.perch);
      x = f.x;
      y = f.y;
      if (S.mode === "sit" && !S.balloon && !rm) {
        // Reads along: now and then turns its head to the text.
        if (now > S.lookT) {
          setPose(S.pose === "look" ? "sit" : Math.random() < 0.45 ? "look" : "sit");
          S.lookT = now + 3500 + Math.random() * 5000;
        }
      }
      if (S.landT && now - S.landT < 160 && !rm) squash = 0.86 + 0.14 * ((now - S.landT) / 160);
    }
    const { w, h } = poseSize(S.pose);
    const faceOk = S.pose === "walkA" || S.pose === "walkB" || S.pose === "jump" || S.pose === "point" || S.pose === "look";
    let face = faceOk ? S.face : 1;
    if (S.pose === "point") face = S.balloon?.place?.toward || 1;
    if (S.pose === "look") face = S.perch.u > S.perch.el.getBoundingClientRect().width / 2 ? 1 : -1;
    const breathe = S.mode === "sit" && !rm ? 1 + 0.018 * Math.sin(now / 600) : S.mode === "sleep" && !rm ? 1 + 0.03 * Math.sin(now / 900) : 1;
    S.x = x;
    S.y = y;
    cat.style.width = w + "px";
    cat.style.height = h + "px";
    cat.style.transform = `translate3d(${Math.round(x - w / 2)}px, ${Math.round(y - h)}px, 0)`;
    flip.style.transform = `scale(${face}, ${(breathe * squash).toFixed(3)})`;
    layer.classList.toggle("is-moving", S.mode === "walk" || S.mode === "jump" || S.mode === "duck");
    layer.classList.toggle("is-sleeping", S.mode === "sleep");
    if (S.balloon) {
      if (now > S.balloon.until && S.balloon.kind !== "menu") hideBalloon();
      else if (now > S.balloon.until) hideBalloon();
      else if (!placeBalloon(now)) hideBalloon();
    }
  }

  function frame(now) {
    if (!S.scale) computeScale();
    const dt = Math.min(0.1, (now - last) / 1000);
    tickT += dt;
    if (tickT > 0.25) { think(now, tickT); tickT = 0; }
    render(now);
    last = now;
  }

  let stopLoop = null;
  function startLoop() {
    if (stopLoop) return;
    last = performance.now();
    stopLoop = host.animation(frame);
  }

  // Reduced motion still needs the cat to follow its window while scrolling,
  // so the loop stays; it just never animates anything by itself.
  const ready = Promise.all(Object.values(imgs).map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())));
  ready.then(() => {
    if (host.signal.aborted) return;
    computeScale();
    layer.classList.add("is-ready");
    if (S.paused) { S.mode = "sleep"; setPose("sleep"); layer.classList.add("is-paused"); }
    startLoop();
  });

  host.watchTargets(() => { obstacleCache.t = 0; });

  return {
    update(next) {
      context = next || context;
      layer.classList.toggle("is-dark", context.variant === "dark");
    },
    dispose() {
      if (stopLoop) stopLoop();
      layer.remove();
    },
  };
}
