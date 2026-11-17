let SITE_CONTENT = null;

function setText(id, value) {
  const el = document.getElementById(id);
  if (el == null || value == null) return;
  el.innerHTML = value;
}

function applyContent(data) {
  SITE_CONTENT = data;

  // meta
  setText("meta-introHint", data.meta.introHint);
  const toastEl = document.getElementById("toast");
  if (toastEl) toastEl.textContent = data.meta.toastCopied;

  // hero
  setText("hero-badge", data.hero.badge);
  setText("hero-name1", data.hero.name1);
  setText("hero-name2", data.hero.name2);
  setText("hero-cta", data.hero.cta);
  setText("gate-name-groom", data.hero.name1);
  setText("gate-name-bride", data.hero.name2);
  setText("hero-dateLabel1", data.hero.dateLabel1);
  setText("hero-dateNum", data.hero.dateNum);
  setText(
    "hero-dateLabel2",
    `${data.hero.dateLabel2}<br />${data.hero.dateYear}`,
  );
  setText("hero-cta", data.hero.cta);

  // profile
  setText("profile-groom-label", data.profile.groom.label);
  setText("profile-groom-name", data.profile.groom.name);
  setText("profile-groom-quote", `"${data.profile.groom.quote}"`);
  setText("profile-bride-label", data.profile.bride.label);
  setText("profile-bride-name", data.profile.bride.name);
  setText("profile-bride-quote", `"${data.profile.bride.quote}"`);

  // moments
  setText("moments-heading", data.moments.heading);

  // love story
  setText("loveStory-heading", data.loveStory.heading);
  setText("loveStory-sub", data.loveStory.sub);
  data.loveStory.timeline.forEach((item, i) => {
    setText(`loveStory-timeline-${i}-year`, item.year);
    setText(`loveStory-timeline-${i}-chapter`, item.chapter);
    setText(`loveStory-timeline-${i}-title`, item.title);
    setText(`loveStory-timeline-${i}-body`, item.body);
  });
  setText("loveStory-closingQuote", data.loveStory.closingQuote);
  setText("loveStory-closingSig", data.loveStory.closingSig);

  // gallery
  setText("gallery-heading", data.gallery.heading);

  // wedding info
  const wi = data.weddingInfo;
  setText("weddingInfo-sectionTitle", wi.sectionTitle);
  setText("weddingInfo-groomFamily-label", wi.groomFamily.label);
  setText("weddingInfo-groomFamily-names", wi.groomFamily.names);
  setText("weddingInfo-groomFamily-address", wi.groomFamily.address);
  setText("weddingInfo-brideFamily-label", wi.brideFamily.label);
  setText("weddingInfo-brideFamily-names", wi.brideFamily.names);
  setText("weddingInfo-brideFamily-address", wi.brideFamily.address);
  setText("weddingInfo-announce1", wi.announce1);
  setText("weddingInfo-announce2", wi.announce2);
  setText("weddingInfo-groom-name", wi.groom.name);
  setText("weddingInfo-groom-label", wi.groom.label);
  setText("weddingInfo-bride-name", wi.bride.name);
  setText("weddingInfo-bride-label", wi.bride.label);

  setText("weddingInfo-ceremony-note", wi.ceremony.note);
  setText("weddingInfo-ceremony-atLabel", wi.ceremony.atLabel);
  setText("weddingInfo-ceremony-time", wi.ceremony.time);
  setText("weddingInfo-ceremony-dayLabel", wi.ceremony.dayLabel);
  setText("weddingInfo-ceremony-dateNum", wi.ceremony.dateNum);
  setText("weddingInfo-ceremony-monthLabel", wi.ceremony.monthLabel);
  setText("weddingInfo-ceremony-year", wi.ceremony.year);
  setText("weddingInfo-ceremony-lunar", wi.ceremony.lunar);

  // Lịch tiệc cưới mặc định ban đầu
  applyReceptionSchedule((wi.reception && wi.reception.defaultDate) || "19");

  setText("weddingInfo-location-label", wi.location.label);
  setText("weddingInfo-location-groomVenue", wi.location.groomVenue);
  setText("weddingInfo-location-groomAddress", wi.location.groomAddress);
  setText("weddingInfo-location-brideVenue", wi.location.brideVenue);
  setText("weddingInfo-location-brideAddress", wi.location.brideAddress);
  const groomMap = document.getElementById("weddingInfo-location-groomMap");
  if (groomMap && wi.location.groomMapSrc) groomMap.src = wi.location.groomMapSrc;
  const brideMap = document.getElementById("weddingInfo-location-brideMap");
  if (brideMap && wi.location.brideMapSrc) brideMap.src = wi.location.brideMapSrc;

  // gift
  setText("gift-heading", data.gift.heading);
  setText("gift-envelopeNames", data.gift.envelopeNames);
  setText("gift-hint", data.gift.hint);

  // rsvp
  setText("rsvp-heading", data.rsvp.heading);
  const nameInput = document.getElementById("rsvp-nameInput");
  if (nameInput) nameInput.placeholder = data.rsvp.namePlaceholder;
  setText("rsvp-attendBtn", data.rsvp.attendBtn);
  setText("rsvp-declineBtn", data.rsvp.declineBtn);
  const wishInput = document.getElementById("rsvp-wishInput");
  if (wishInput) wishInput.placeholder = data.rsvp.wishPlaceholder;
  setText("rsvp-submitBtn", data.rsvp.submitBtn);

  // footer
  setText("footer-thankYou", data.footer.thankYou);
  setText("footer-signature", data.footer.signature);

  const lixiWrapper = document.getElementById("lixi-wrapper");
  if (lixiWrapper) {
    lixiWrapper.addEventListener("click", () => {
      copyToClipboard(data.gift.accountNumber, data.gift.envelopeNames);
    });
  }
}

function applyReceptionSchedule(dateKey) {
  if (!SITE_CONTENT || !SITE_CONTENT.weddingInfo || !SITE_CONTENT.weddingInfo.reception) return;
  const rec = SITE_CONTENT.weddingInfo.reception;
  const schedules = rec.schedules || {};
  const normalizedKey = String(dateKey || "").trim();
  const sched = (normalizedKey && schedules[normalizedKey]) || schedules[rec.defaultDate || "19"] || rec;

  setText("weddingInfo-reception-title", rec.title);
  const receptionNote = sched.note || (normalizedKey === "20"
    ? "Hãy dành chút thời gian đến chia sẻ niềm vui và dùng bữa cơm thân mật cùng gia đình chúng mình tại nhà trai vào lúc"
    : "Hãy dành chút thời gian đến chia sẻ niềm vui và dùng bữa cơm thân mật cùng gia đình chúng mình tại nhà gái vào lúc");
  setText("weddingInfo-reception-note", receptionNote);

  // Lễ Thành Hôn luôn được cử hành tại nhà trai
  const ceremonyNote = (SITE_CONTENT.weddingInfo && SITE_CONTENT.weddingInfo.ceremony && SITE_CONTENT.weddingInfo.ceremony.note) || "Lễ Thành Hôn được cử hành tại nhà trai";
  setText("weddingInfo-ceremony-note", ceremonyNote);

  setText("weddingInfo-reception-time", sched.time);
  setText("weddingInfo-reception-dayLabel", sched.dayLabel);
  setText("weddingInfo-reception-dateNum", sched.dateNum);
  setText("weddingInfo-reception-monthLabel", sched.monthLabel);
  setText("weddingInfo-reception-year", sched.year);
  setText("weddingInfo-reception-lunar", sched.lunar);
  setText("weddingInfo-reception-welcomeLabel", sched.welcomeLabel);
  setText("weddingInfo-reception-welcomeTime", sched.welcomeTime);
  setText("weddingInfo-reception-startLabel", sched.startLabel);
  setText("weddingInfo-reception-startTime", sched.startTime);

  // Cập nhật phần ngoài cổng chào/phong bì intro gate (chỉ ngày · tháng · năm)
  const monthNum = String(sched.monthLabel || "").replace(/[^0-9]/g, "") || "12";
  const introDateEl = document.getElementById("intro-gate-date");
  if (introDateEl) {
    introDateEl.textContent = `${sched.dateNum} · ${monthNum} · ${sched.year}`;
  }

  // Cập nhật phần Hero (Save The Date) theo ngày của khách mời
  const heroSched = (SITE_CONTENT.hero && SITE_CONTENT.hero.schedules && SITE_CONTENT.hero.schedules[normalizedKey]) || {
    dateLabel1: sched.dayLabel,
    dateNum: sched.dateNum,
    dateLabel2: sched.monthLabel,
    dateYear: sched.year
  };
  setText("hero-dateLabel1", heroSched.dateLabel1);
  setText("hero-dateNum", heroSched.dateNum);
  setText("hero-dateLabel2", `${heroSched.dateLabel2}<br />${heroSched.dateYear}`);
}

let resolvedGuestName = "Người Thân";
let resolvedGuestDate = "19";

async function resolveGuestInfo() {
  let guestName = "Người Thân";
  let targetDate = null;

  // 1. Kiểm tra tham số trên URL: ?to=... hoặc ?guest=... hoặc ?u=...
  const urlParams = new URLSearchParams(window.location.search);
  const paramGuest = urlParams.get("to") || urlParams.get("guest") || urlParams.get("u");
  const paramDate = urlParams.get("date") || urlParams.get("ngay") || urlParams.get("d");
  if (paramDate && paramDate.trim()) {
    targetDate = paramDate.trim();
  }

  // 2. Tải danh sách guests.json để tra cứu thông tin
  let guestsData = null;
  try {
    let res = await fetch("/assets/data/guests.json?v=" + Date.now());
    if (!res.ok) {
      res = await fetch("./assets/data/guests.json?v=" + Date.now());
    }
    if (res.ok) {
      guestsData = await res.json();
    }
  } catch (err) {
    try {
      const res = await fetch("./assets/data/guests.json?v=" + Date.now());
      if (res.ok) guestsData = await res.json();
    } catch (e) {
      console.warn("Không thể tải danh sách guests.json:", err);
    }
  }

  // Hàm tra cứu khách từ guests.json theo slug hoặc tên
  function lookupGuest(query) {
    if (!guestsData || !query) return null;
    const qClean = query.toLowerCase().replace(/[-_\s]+/g, "");

    const group20 = guestsData.guestsDay20 || guestsData.day20 || guestsData["20"] || {};
    const group19 = guestsData.guestsDay19 || guestsData.day19 || guestsData["19"] || {};

    // Nếu trên URL có truyền ?date=19 hoặc ?date=20, ưu tiên nhóm ngày đó trước
    const order = targetDate === "19" ? [
      { grp: group19, date: "19", names: guestsData.namesDay19 },
      { grp: group20, date: "20", names: guestsData.namesDay20 }
    ] : [
      { grp: group20, date: "20", names: guestsData.namesDay20 },
      { grp: group19, date: "19", names: guestsData.namesDay19 }
    ];

    for (const item of order) {
      if (item.grp) {
        for (const k in item.grp) {
          const val = item.grp[k];
          const valName = typeof val === "object" ? (val.name || val.ten) : val;
          if (k.toLowerCase().replace(/[-_\s]+/g, "") === qClean ||
            (valName && typeof valName === "string" && valName.toLowerCase().replace(/[-_\s]+/g, "") === qClean)) {
            return { name: valName || query, date: item.date };
          }
        }
      }
      if (Array.isArray(item.names)) {
        if (item.names.some(n => n && n.toLowerCase().replace(/[-_\s]+/g, "") === qClean)) {
          return { name: query, date: item.date };
        }
      }
    }

    // e. Kiểm tra trực tiếp ở cấp ngoài (root object)
    for (const k in guestsData) {
      if (["guestsDay19", "guestsDay20", "day19", "day20", "19", "20", "namesDay19", "namesDay20", "_huong_dan"].includes(k)) continue;
      const val = guestsData[k];
      const valName = typeof val === "object" ? (val.name || val.ten) : val;
      const valDate = typeof val === "object" ? String(val.date || val.ngay || "19") : null;
      if (k.toLowerCase().replace(/[-_\s]+/g, "") === qClean ||
        (valName && typeof valName === "string" && valName.toLowerCase().replace(/[-_\s]+/g, "") === qClean)) {
        return { name: valName || query, date: valDate || "19" };
      }
    }

    return null;
  }

  if (paramGuest && paramGuest.trim()) {
    guestName = decodeURIComponent(paramGuest.trim());
    const found = lookupGuest(guestName);
    if (found) {
      if (found.name) guestName = found.name;
      if (!targetDate && found.date) targetDate = found.date;
    }
  } else {
    // Kiểm tra đường dẫn URL dạng /anhcuong hoặc /anh-cuong
    let path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (path && !path.includes(".") && path.toLowerCase() !== "index") {
      const slug = decodeURIComponent(path).toLowerCase();
      const found = lookupGuest(slug);
      if (found) {
        guestName = found.name;
        if (!targetDate && found.date) targetDate = found.date;
      } else {
        // Nếu không có trong guests.json, giải mã tên trực tiếp từ đường dẫn nếu có
        let decoded = decodeURIComponent(path).replace(/[-_]+/g, " ").trim();
        if (decoded) {
          guestName = decoded.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        }
      }
    }
  }

  // Nếu chưa có targetDate, dùng defaultDate trong content.json hoặc mặc định 19
  if (!targetDate) {
    targetDate = (SITE_CONTENT && SITE_CONTENT.weddingInfo && SITE_CONTENT.weddingInfo.reception && SITE_CONTENT.weddingInfo.reception.defaultDate) || "19";
  }

  // Hiển thị tên khách mời ở thiệp cưới và trên phong bao mở đầu
  const guestEl = document.getElementById("weddingInfo-guest-name");
  if (guestEl) {
    guestEl.textContent = guestName;
  }
  const introGuestEl = document.getElementById("intro-gate-guest");
  if (introGuestEl) {
    introGuestEl.textContent = guestName;
  }

  resolvedGuestName = guestName;
  resolvedGuestDate = targetDate;

  // Cập nhật lịch tiệc cưới tương ứng theo ngày của khách mời
  applyReceptionSchedule(targetDate);

  // Tự động điền tên vào ô gửi lời chúc nếu là khách mời cụ thể
  const rsvpNameInput = document.getElementById("rsvp-nameInput");
  if (rsvpNameInput && guestName !== "Người Thân") {
    rsvpNameInput.value = guestName;
    rsvpNameInput.placeholder = guestName;
  }
}

function loadContent() {
  const fetchContent = (url) => fetch(url + "?v=" + Date.now()).then((r) => r.ok ? r.json() : Promise.reject());
  return fetchContent("/assets/data/content.json")
    .catch(() => fetchContent("./assets/data/content.json"))
    .then((data) => {
      applyContent(data);
      resolveGuestInfo();
    })
    .catch((e) => {
      console.warn("content.json lỗi:", e);
      resolveGuestInfo();
    });
}

loadContent();

// ── NHẠC NỀN: CHỈ PHÁT KHI BẤM VÀO CON DẤU MỞ CỔNG ──
// (không còn autoplay lúc tải trang / không còn phát khi chạm/scroll/gõ phím bất kỳ)

function createPetal() {
  const c = document.getElementById("petal-container");
  if (!c) return;
  const p = document.createElement("div");
  p.className = "petal";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = Math.random() * 4 + 6 + "s";
  p.style.width = Math.random() * 15 + 10 + "px";
  p.style.height = Math.random() * 15 + 10 + "px";
  c.appendChild(p);
  setTimeout(() => p.remove(), 10000);
}
setInterval(createPetal, 700);

function reveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100)
      el.classList.add("active");
  });
}
window.addEventListener("scroll", reveal);
reveal();

document.querySelectorAll(".fan-item").forEach((item) => {
  item.addEventListener(
    "touchstart",
    () => {
      document
        .querySelectorAll(".fan-item")
        .forEach((el) => el.classList.remove("tapped"));
      item.classList.add("tapped");
    },
    { passive: true },
  );
});
document.addEventListener(
  "touchstart",
  (e) => {
    if (!e.target.closest(".fan-item"))
      document
        .querySelectorAll(".fan-item")
        .forEach((el) => el.classList.remove("tapped"));
  },
  { passive: true },
);

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener(
    "touchstart",
    () => {
      document
        .querySelectorAll(".gallery-item.touched")
        .forEach((el) => el.classList.remove("touched"));
      item.classList.add("touched");
      setTimeout(() => item.classList.remove("touched"), 700);
    },
    { passive: true },
  );
});

const gObs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    }),
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);
document.querySelectorAll(".gallery-reveal").forEach((el) => gObs.observe(el));

const glowClasses = ["glow-1", "glow-2", "glow-3"];
const sparkSymbols = [
  "✦",
  "✧",
  "★",
  "☆",
  "✩",
  "✫",
  "✬",
  "✭",
  "✮",
  "❀",
  "✿",
  "❁",
  "❈",
  "❉",
  "•",
  "◦",
];
const MAX_SPARKS = 14;

document.querySelectorAll(".gallery-item").forEach((item, i) => {
  item.classList.add(glowClasses[i % 3]);
  item.style.animationDelay = i * 0.38 + "s";
});

function spawnSpark(item) {
  if (item.querySelectorAll(".star-spark").length >= MAX_SPARKS) return;
  const spark = document.createElement("span");
  spark.className = "star-spark";
  spark.textContent =
    sparkSymbols[Math.floor(Math.random() * sparkSymbols.length)];
  const startX = 5 + Math.random() * 90;
  const startY = 5 + Math.random() * 90;
  spark.style.left = startX + "%";
  spark.style.top = startY + "%";
  const angle = Math.random() * Math.PI * 2;
  const radius = 35 + Math.random() * 45;
  const sx = Math.cos(angle) * radius;
  const sy = Math.sin(angle) * radius - 15;
  const sr = (Math.random() - 0.5) * 270;
  const dur = 1.2 + Math.random() * 1.2;
  spark.style.setProperty("--sx", sx + "px");
  spark.style.setProperty("--sy", sy + "px");
  spark.style.setProperty("--sr", sr + "deg");
  spark.style.animationDuration = dur + "s";
  spark.style.fontSize = 11 + Math.random() * 12 + "px";
  item.appendChild(spark);
  setTimeout(() => spark.remove(), dur * 1000 + 80);
}

const sparkObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        for (let i = 0; i < 10; i++)
          setTimeout(() => spawnSpark(e.target), i * 100);
        const interval = setInterval(() => {
          if (!document.contains(e.target)) {
            clearInterval(interval);
            return;
          }
          spawnSpark(e.target);
        }, 140);
        e.target._sparkInterval = interval;
      } else {
        clearInterval(e.target._sparkInterval);
      }
    });
  },
  { threshold: 0.1 },
);
document
  .querySelectorAll(".gallery-item")
  .forEach((el) => sparkObs.observe(el));

function copyToClipboard(text, name) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  });
  const toast = document.getElementById("toast");
  toast.style.transform = "translate(-50%, 0)";
  setTimeout(() => {
    toast.style.transform = "translate(-50%, 8rem)";
  }, 2200);
}

function createBubble() {
  const c = document.getElementById("seal-container");
  if (!c) return;
  const b = document.createElement("div");
  b.className = "seal-bubble";
  const s = Math.random() * 9 + 5;
  b.style.width = s + "px";
  b.style.height = s + "px";
  b.style.left = Math.random() * 60 + 20 + "%";
  b.style.bottom = "28%";
  b.style.animationDuration = Math.random() * 1.8 + 3 + "s";
  c.appendChild(b);
  setTimeout(() => b.remove(), 6500);
}
setInterval(createBubble, 140);

(function () {
  const lsObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("ls-visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  document.querySelectorAll(".ls-card, .ls-closing").forEach(function (el) {
    lsObs.observe(el);
  });
})();

(function () {
  function initSmoke(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    const particles = [];

    function spawn() {
      const edge = Math.random();
      let x, y;
      if (edge < 0.6) {
        x = canvas.width * (0.05 + Math.random() * 0.9);
        y = canvas.height * (0.72 + Math.random() * 0.18);
      } else if (edge < 0.8) {
        x = canvas.width * (0.02 + Math.random() * 0.14);
        y = canvas.height * (0.35 + Math.random() * 0.55);
      } else {
        x = canvas.width * (0.84 + Math.random() * 0.14);
        y = canvas.height * (0.35 + Math.random() * 0.55);
      }
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.55,
        vy: -(0.32 + Math.random() * 0.58),
        radius: 12 + Math.random() * 20,
        alpha: 0,
        maxAlpha: 0.2 + Math.random() * 0.22,
        life: 0,
        maxLife: 160 + Math.random() * 150,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.007 + Math.random() * 0.013,
        growRate: 0.1 + Math.random() * 0.11,
      });
    }

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 20 === 0) spawn();
      frame++;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.52;
        p.y += p.vy;
        p.radius += p.growRate;
        if (p.life < 35) {
          p.alpha = (p.life / 35) * p.maxAlpha;
        } else if (p.life > p.maxLife - 70) {
          p.alpha = ((p.maxLife - p.life) / 70) * p.maxAlpha;
        } else {
          p.alpha = p.maxAlpha;
        }
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(26,42,58,${p.alpha * 0.65})`);
        grad.addColorStop(0.3, `rgba(44,62,80,${p.alpha * 0.42})`);
        grad.addColorStop(0.65, `rgba(70,90,110,${p.alpha * 0.18})`);
        grad.addColorStop(1, `rgba(90,110,130,0)`);
        ctx.beginPath();
        ctx.ellipse(
          p.x,
          p.y,
          p.radius,
          p.radius * 1.45,
          Math.sin(p.wobble) * 0.38,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = grad;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  window.addEventListener("load", () => {
    initSmoke("smoke-groom");
    initSmoke("smoke-bride");
  });
})();

(function () {
  const SHOW_INTERVAL = 30000;
  const DISPLAY_DURATION = 7000;
  let wishes = [],
    idx = 0;
  let container, nameEl, textEl, hideTimer;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildDom() {
    container = document.getElementById("wish-float");
    if (!container) return false;
    container.className = "wish-corner";
    container.innerHTML = `
          <div class="wish-corner-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2 .35v.16l8 5.8 8-5.8v-.16H4Zm16 2.4-7.43 5.39a1 1 0 0 1-1.14 0L4 8.25V18h16V8.25Z" />
            </svg>
          </div>
          <div class="wish-corner-bubble">
            <div class="wish-corner-name" id="wishCornerName"></div>
            <div class="wish-corner-text" id="wishCornerText"></div>
          </div>
        `;
    nameEl = container.querySelector("#wishCornerName");
    textEl = container.querySelector("#wishCornerText");
    return true;
  }

  function spawn() {
    if (!container || !wishes.length) return;
    const w = wishes[idx % wishes.length];
    idx++;
    nameEl.textContent = w.name;
    textEl.textContent = w.content_wish;

    clearTimeout(hideTimer);
    container.classList.add("show");
    hideTimer = setTimeout(
      () => container.classList.remove("show"),
      DISPLAY_DURATION,
    );
  }

  if (!buildDom()) return;

  // Khởi tạo Firebase
  const firebaseConfig = {
    projectId: "wedding-invitation-e0ba5",
    appId: "1:360617041174:web:1d405d7effc25cd26f8437",
    storageBucket: "wedding-invitation-e0ba5.firebasestorage.app",
    apiKey: "AIzaSyAuJVib1QoVpxjokcZ3G8p6r56cATIFGHw",
    authDomain: "wedding-invitation-e0ba5.firebaseapp.com",
    messagingSenderId: "360617041174",
    measurementId: "G-NSW2TBQFXN",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  // Load bong bóng lời chúc từ Firestore
  db.collection("rsvp").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    const loadedWishes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.wish) {
        loadedWishes.push({ name: data.name, content_wish: data.wish });
      }
    });
    if (loadedWishes.length > 0) {
      wishes = shuffle(loadedWishes);
    }
  });

  // Hiển thị bong bóng ban đầu từ file (backup)
  // Đã bỏ fetch wish.json để ép trình duyệt xoá sạch lời chúc cũ bị lưu trong bộ nhớ đệm (cache)
  setTimeout(spawn, 1500);
  setInterval(spawn, SHOW_INTERVAL);

  // --- LOGIC FORM RSVP ---
  let isAttending = null; // null: chưa chọn, true: tham gia, false: từ chối

  const attendBtn = document.getElementById("rsvp-attendBtn");
  const declineBtn = document.getElementById("rsvp-declineBtn");
  const nameInput = document.getElementById("rsvp-nameInput");
  const wishInput = document.getElementById("rsvp-wishInput");
  const submitBtn = document.getElementById("rsvp-submitBtn");

  if (attendBtn && declineBtn) {
    attendBtn.addEventListener("click", () => {
      isAttending = true;
      attendBtn.style.background = "var(--navy)";
      attendBtn.style.color = "#fff";
      declineBtn.style.background = "transparent";
      declineBtn.style.color = "var(--navy)";
    });

    declineBtn.addEventListener("click", () => {
      isAttending = false;
      declineBtn.style.background = "var(--navy)";
      declineBtn.style.color = "#fff";
      attendBtn.style.background = "transparent";
      attendBtn.style.color = "var(--navy)";
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const name = nameInput.value.trim();
      const wish = wishInput.value.trim();

      if (!name) {
        alert("Vui lòng nhập tên của bạn nhé!");
        return;
      }

      submitBtn.textContent = "ĐANG GỬI...";
      submitBtn.disabled = true;

      try {
        await db.collection("rsvp").add({
          name: name,
          wish: wish,
          isAttending: isAttending,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Gửi email báo hiệu có lời chúc mới qua Web3Forms
        const emailData = {
          access_key: "f0a0de58-04ad-4874-866d-2227de069a46",
          subject: `💌 Thiệp Cưới: Lời chúc mới từ ${name}`,
          from_name: "Thiệp Cưới",
          Khách_Mời: name,
          Xác_nhận_tham_dự: isAttending === true ? "Sẽ đến dự" : (isAttending === false ? "Rất tiếc vắng mặt" : "Chưa phản hồi"),
          Lời_chúc: wish
        };

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(emailData)
        }).catch(err => console.log("Lỗi gửi mail:", err));

        alert("Cảm ơn bạn đã gửi lời chúc!");
        nameInput.value = (resolvedGuestName && resolvedGuestName !== "Người Thân") ? resolvedGuestName : "";
        wishInput.value = "";
        isAttending = null;
        attendBtn.style.background = "transparent";
        attendBtn.style.color = "var(--navy)";
        declineBtn.style.background = "transparent";
        declineBtn.style.color = "var(--navy)";
      } catch (e) {
        console.error("Lỗi khi gửi lời chúc: ", e);
        alert("Lỗi: " + e.message + "\n(Vui lòng kiểm tra lại bước tạo Firestore Database ở Test Mode!)");
      } finally {
        submitBtn.textContent = "GỬI LỜI CHÚC";
        submitBtn.disabled = false;
      }
    });
  }
})();

(function () {
  const gate = document.getElementById("intro-gate");
  const seal = document.getElementById("intro-gate-seal");
  const container = document.getElementById("envelope-container");
  if (!gate) return;

  document.documentElement.classList.add("intro-locked");

  function openGate() {
    if (gate.classList.contains("opening")) return;
    gate.classList.add("opening");

    const unlockSound = document.getElementById("unlock-sound");
    if (unlockSound) {
      unlockSound.currentTime = 0;
      unlockSound.play().catch(() => { });
    }

    // Bật nhạc nền ngay khi phong bì mở ra
    setTimeout(() => {
      const audio = document.getElementById("bg-music");
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => { });
      }
    }, 400);

    // Mở khóa cuộn trang và làm mờ màn hình chuyển tiếp mượt mà vào giao diện
    setTimeout(() => {
      document.documentElement.classList.remove("intro-locked");
      gate.classList.add("gate-hidden");
    }, 750);

    // Xóa gate khỏi DOM sau khi hoàn tất
    setTimeout(() => {
      gate.remove();
    }, 1600);
  }

  if (seal) {
    seal.addEventListener("click", openGate);
    seal.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        openGate();
      },
      { passive: false }
    );
  }

  if (container) {
    container.addEventListener("click", openGate);
  }
})();
