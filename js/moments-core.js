/* =========================================
   HONSPIRIT — MOMENTS core
   moments.html(공개 갤러리) 과 studio.html(관계자 업로드) 가 함께 쓰는 모듈
     · Supabase REST 클라이언트 (SDK 없이 fetch 만 사용)
     · 이미지 파이프라인 (리사이즈 · 톤 보정 · 브랜드 마크)
     · 브랜드 큐레이션 시드 · 로컬 미리보기 저장소
   ========================================= */

'use strict';

const HS_M = (() => {

  /* ─────────────────────────────────────────
     설정
     ───────────────────────────────────────── */
  const CFG = Object.assign({
    supabase: null,
    staffEmail: '',
    maxEdge: 1440,
    quality: 0.86,
    batch: 8,
    maxFiles: 6,
    maxRows: 500,
  }, window.HS_MOMENTS_CONFIG || {});

  const PREVIEW_EDGE = 900;

  /* ─────────────────────────────────────────
     공용 헬퍼
     ───────────────────────────────────────── */
  const el = id => document.getElementById(id);

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  const lang = () => {
    const l = document.documentElement.lang || 'ko';
    return ['ko', 'en', 'zh'].includes(l) ? l : 'ko';
  };

  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const l = lang();
    return d.toLocaleDateString(l === 'ko' ? 'ko-KR' : l === 'zh' ? 'zh-CN' : 'en-GB',
      { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // 카드용 — 2열 모바일에서 작성자 이름을 밀어내지 않도록 고정폭 숫자 표기
  function fmtDateShort(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const p2 = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${p2(d.getMonth() + 1)}.${p2(d.getDate())}`;
  }

  // 캡션은 언어별로 저장하고, 없으면 한국어로 폴백한다
  function capOf(item) {
    if (item.capML) return item.capML[lang()] || item.capML.ko || '';
    const l = lang();
    if (l === 'en') return item.caption_en || item.caption || '';
    if (l === 'zh') return item.caption_zh || item.caption || '';
    return item.caption || '';
  }

  const urls = new Map();
  function srcOf(item) {
    if (item.kind === 'local') {
      if (!urls.has(item.id)) urls.set(item.id, URL.createObjectURL(item.blob));
      return urls.get(item.id);
    }
    return item.src;
  }
  function dropURL(id) {
    const u = urls.get(id);
    if (u) { URL.revokeObjectURL(u); urls.delete(id); }
  }
  window.addEventListener('pagehide', () => {
    urls.forEach(u => URL.revokeObjectURL(u));
    urls.clear();
  });

  /* ─────────────────────────────────────────
     톤 프리셋 — Noir & Champagne
     ───────────────────────────────────────── */
  const TONES = {
    original: { filter: '', overlay: null, vignette: 0 },
    champagne: {
      filter: 'saturate(0.90) contrast(1.06) brightness(1.03) sepia(0.14)',
      overlay: { mode: 'soft-light', stops: [[0, 'rgba(216,189,130,0.36)'], [1, 'rgba(12,12,13,0.28)']] },
      vignette: 0.20,
    },
    noir: {
      filter: 'grayscale(0.78) contrast(1.16) brightness(0.95)',
      overlay: { mode: 'soft-light', stops: [[0, 'rgba(216,189,130,0.22)'], [1, 'rgba(10,10,11,0.55)']] },
      vignette: 0.30,
    },
    ember: {
      filter: 'saturate(1.05) contrast(1.10) sepia(0.26) brightness(0.98)',
      overlay: { mode: 'overlay', stops: [[0, 'rgba(184,151,90,0.30)'], [1, 'rgba(42,25,10,0.32)']] },
      vignette: 0.26,
    },
    ink: {
      filter: 'grayscale(1) contrast(1.22) brightness(1.02)',
      overlay: { mode: 'soft-light', stops: [[0, 'rgba(244,237,224,0.20)'], [1, 'rgba(12,12,13,0.42)']] },
      vignette: 0.22,
    },
  };

  const CROPS = { auto: null, '4:5': 1.25, '1:1': 1, '3:2': 2 / 3 };

  /* ─────────────────────────────────────────
     브랜드 큐레이션 시드 — DB 가 비어 있어도 벽이 비지 않도록
     ───────────────────────────────────────── */
  const SEEDS = [
    { id: 's01', src: 'images/hon_vertical.jpeg', w: 1200, h: 1500, tag: 'soul',   at: '2026-05-02T20:10:00+09:00',
      cap: { ko: '따르는 소리마저 느리게 흐르던 밤. 酒之魂은 서두르지 않는 술입니다.',
             en: 'A night where even the pour ran slow. 酒之魂 is not a spirit to be hurried.',
             zh: '连倒酒声都变慢的夜晚。酒之魂，是不该被催促的酒。' } },
    { id: 's02', src: 'images/suqian.jpg',        w: 1024, h: 759,  tag: '',        at: '2026-04-27T06:40:00+09:00',
      cap: { ko: '쑤첸의 새벽 물안개. 이 물이 한 잔의 시작이 됩니다.',
             en: 'Dawn mist over Suqian. This water is where the glass begins.',
             zh: '宿迁清晨的水雾。一杯酒，自此开始。' } },
    { id: 's03', src: 'images/ling_vertical.jpeg', w: 1200, h: 1500, tag: 'spirit', at: '2026-04-19T21:55:00+09:00',
      cap: { ko: '오늘의 테이블에 놓인 灵. 가벼운 대화가 오래 남는 밤이었습니다.',
             en: '灵 on tonight’s table. Light talk that stayed long after.',
             zh: '今晚桌上的灵。轻声的谈话，久久不散。' } },
    { id: 's04', src: 'images/total.jpeg',        w: 1920, h: 1080, tag: '',        at: '2026-04-11T18:30:00+09:00',
      cap: { ko: '魂 · 灵 · 心 — 세 개의 온도가 한 자리에 모였습니다.',
             en: '魂 · 灵 · 心 — three temperatures gathered at one table.',
             zh: '魂 · 灵 · 心 —— 三种温度，聚于一席。' } },
    { id: 's05', src: 'images/xin_vertical.jpeg', w: 1200, h: 1500, tag: 'heart',  at: '2026-03-28T19:05:00+09:00',
      cap: { ko: '가장 자주 여는 병이 가장 오래 남습니다. 心, 평일 저녁의 술.',
             en: 'The bottle opened most often lingers longest. 心, a weeknight spirit.',
             zh: '开得最勤的那瓶，留得最久。心，平常夜晚的酒。' } },
    { id: 's06', src: 'images/hon.jpeg',          w: 1920, h: 1080, tag: 'soul',    at: '2026-03-15T22:20:00+09:00',
      cap: { ko: '잔을 내려놓고도 향이 남았습니다.',
             en: 'The glass was down, and the aroma stayed.',
             zh: '杯已放下，香气仍在。' } },
    { id: 's07', src: 'images/scroll-jiuzhi.png', w: 1520, h: 1960, tag: '',        at: '2026-03-02T11:00:00+09:00',
      cap: { ko: '酒之 — 술의, 그리고 사람의.',
             en: '酒之 — of the spirit, and of the people.',
             zh: '酒之 —— 酒的，也是人的。' } },
    { id: 's08', src: 'images/ling.jpeg',         w: 1920, h: 1080, tag: 'spirit',  at: '2026-02-21T20:40:00+09:00',
      cap: { ko: '灵 42% vol. 두 번째 잔부터 진짜 이야기가 시작됩니다.',
             en: '灵 42% vol. The real conversation starts at the second glass.',
             zh: '灵 42% vol。真正的话，从第二杯开始。' } },
    { id: 's09', src: 'images/jiuzhi.png',        w: 1920, h: 1047, tag: '',        at: '2026-02-08T15:10:00+09:00',
      cap: { ko: '안주하지 않는 영혼에 경의를.',
             en: 'To the souls that never settle.',
             zh: '敬不甘的灵魂。' } },
    { id: 's10', src: 'images/xin.jpeg',          w: 1920, h: 1080, tag: 'heart',   at: '2026-01-24T19:45:00+09:00',
      cap: { ko: '心 38% vol. 나누기 위해 만든 도수입니다.',
             en: '心 38% vol. A strength made for sharing.',
             zh: '心 38% vol。为分享而生的度数。' } },
  ].map(s => ({
    id: s.id, kind: 'seed', src: s.src, w: s.w, h: s.h, tag: s.tag,
    official: true, status: 'approved',
    author: 'HONSPIRIT', capML: s.cap, createdAt: s.at,
  }));

  /* ─────────────────────────────────────────
     로컬 미리보기 저장소 (Supabase 미설정 시에만 사용)
     ───────────────────────────────────────── */
  const DB = { name: 'hs_moments', ver: 1, store: 'moments' };
  let dbp = null;

  function openDB() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB.name, DB.ver);
      r.onupgradeneeded = () => {
        const db = r.result;
        if (!db.objectStoreNames.contains(DB.store)) {
          db.createObjectStore(DB.store, { keyPath: 'id' }).createIndex('createdAt', 'createdAt');
        }
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }

  function txn(mode, fn) {
    return openDB().then(db => new Promise((res, rej) => {
      const t = db.transaction(DB.store, mode);
      const rq = fn(t.objectStore(DB.store));
      rq.onsuccess = () => res(rq.result);
      rq.onerror = () => rej(rq.error);
    }));
  }

  const Local = {
    all: () => txn('readonly',  s => s.getAll()).catch(() => []),
    put: r  => txn('readwrite', s => s.put(r)),
    del: id => txn('readwrite', s => s.delete(id)),
  };

  /* ─────────────────────────────────────────
     Supabase REST 클라이언트
     공개 읽기는 anon key, 쓰기는 로그인 JWT 로만 가능하다.
     (테이블·스토리지 RLS 가 anon 쓰기를 막는다 — SUPABASE_SETUP.md 참고)
     ───────────────────────────────────────── */
  const SESSION_KEY = 'hs_studio_session';

  const SB = {
    on() {
      const c = CFG.supabase;
      return !!(c && c.url && c.anonKey);
    },
    base()   { return String(CFG.supabase.url).replace(/\/+$/, ''); },
    key()    { return CFG.supabase.anonKey; },
    bucket() { return CFG.supabase.bucket || 'moments'; },
    table()  { return CFG.supabase.table  || 'moments'; },

    head(token, extra) {
      return Object.assign({
        apikey: this.key(),
        Authorization: 'Bearer ' + (token || this.key()),
      }, extra || {});
    },

    publicURL(path) {
      return `${this.base()}/storage/v1/object/public/${this.bucket()}/${encodeURI(path)}`;
    },

    /* ── 세션 ── */
    session: null,

    loadSession() {
      if (this.session) return this.session;
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        this.session = raw ? JSON.parse(raw) : null;
      } catch { this.session = null; }
      return this.session;
    },
    saveSession(s) {
      if (!s || !s.access_token) return null;
      s.expires_at = s.expires_at || Math.floor(Date.now() / 1000) + (s.expires_in || 3600);
      this.session = s;
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* 시크릿 모드 */ }
      return s;
    },
    clearSession() {
      this.session = null;
      try { localStorage.removeItem(SESSION_KEY); } catch { /* noop */ }
    },
    staffEmail() {
      return this.loadSession()?.user?.email || '';
    },

    async signIn(email, password) {
      const res = await fetch(`${this.base()}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { apikey: this.key(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error_description || data.msg || data.message || `HTTP ${res.status}`;
        throw new Error(msg);
      }
      return this.saveSession(data);
    },

    async refresh() {
      const s = this.loadSession();
      if (!s?.refresh_token) { this.clearSession(); return null; }
      const res = await fetch(`${this.base()}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: { apikey: this.key(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: s.refresh_token }),
      });
      if (!res.ok) { this.clearSession(); return null; }
      return this.saveSession(await res.json());
    },

    // 만료 1분 전부터 미리 갱신한다
    async token() {
      const s = this.loadSession();
      if (!s) return null;
      if (Date.now() > (s.expires_at * 1000) - 60000) {
        const next = await this.refresh();
        return next ? next.access_token : null;
      }
      return s.access_token;
    },

    async signOut() {
      const t = this.session?.access_token;
      if (t) {
        try {
          await fetch(`${this.base()}/auth/v1/logout`, {
            method: 'POST', headers: this.head(t),
          });
        } catch { /* 로컬 세션만 지워도 충분하다 */ }
      }
      this.clearSession();
    },

    /* ── 조회 ── */
    rowToItem(row) {
      return {
        id: row.id, kind: 'remote', path: row.path,
        src: this.publicURL(row.path),
        w: row.w, h: row.h, tag: row.tag || '',
        official: true, status: row.status,
        author: row.author || 'HONSPIRIT',
        caption: row.caption || '', caption_en: row.caption_en || '', caption_zh: row.caption_zh || '',
        createdAt: row.created_at,
      };
    },

    // token 을 주면 숨김 상태까지 함께 읽는다 (studio 관리 목록용)
    async list({ limit = CFG.maxRows, token = null } = {}) {
      const q = new URLSearchParams({
        select: '*', order: 'created_at.desc', limit: String(limit),
      });
      if (!token) q.set('status', 'eq.approved');
      const res = await fetch(`${this.base()}/rest/v1/${this.table()}?${q}`, { headers: this.head(token) });
      if (!res.ok) throw new Error(`목록을 읽지 못했습니다 (HTTP ${res.status})`);
      return (await res.json()).map(r => this.rowToItem(r));
    },

    /* ── 쓰기 (로그인 필요) ── */
    async upload(path, blob, token) {
      const res = await fetch(`${this.base()}/storage/v1/object/${this.bucket()}/${encodeURI(path)}`, {
        method: 'POST',
        headers: this.head(token, { 'Content-Type': 'image/jpeg', 'x-upsert': 'false' }),
        body: blob,
      });
      if (!res.ok) throw new Error(`이미지 업로드 실패 (HTTP ${res.status})`);
      return path;
    },

    async insert(row, token) {
      const res = await fetch(`${this.base()}/rest/v1/${this.table()}`, {
        method: 'POST',
        headers: this.head(token, { 'Content-Type': 'application/json', Prefer: 'return=representation' }),
        body: JSON.stringify(row),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || `저장 실패 (HTTP ${res.status})`);
      }
      return this.rowToItem((await res.json())[0]);
    },

    async patch(id, fields, token) {
      const res = await fetch(`${this.base()}/rest/v1/${this.table()}?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: this.head(token, { 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
        body: JSON.stringify(fields),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || `수정 실패 (HTTP ${res.status})`);
      }
    },

    setStatus(id, status, token) { return this.patch(id, { status }, token); },

    async remove(item, token) {
      const res = await fetch(`${this.base()}/rest/v1/${this.table()}?id=eq.${encodeURIComponent(item.id)}`, {
        method: 'DELETE', headers: this.head(token, { Prefer: 'return=minimal' }),
      });
      if (!res.ok) throw new Error(`삭제 실패 (HTTP ${res.status})`);
      // 행이 지워지면 파일은 고아가 되므로 함께 정리한다
      try {
        await fetch(`${this.base()}/storage/v1/object/${this.bucket()}/${encodeURI(item.path)}`, {
          method: 'DELETE', headers: this.head(token),
        });
      } catch { /* 파일만 남는 것은 치명적이지 않다 */ }
    },
  };

  /* ─────────────────────────────────────────
     이미지 파이프라인
     ───────────────────────────────────────── */
  let fontsReady = false;
  async function ensureFonts() {
    if (fontsReady || !document.fonts) { fontsReady = true; return; }
    try {
      await Promise.all([
        document.fonts.load('700 60px "Nanum Myeongjo"'),
        document.fonts.load('400 24px "Marcellus"'),
        document.fonts.ready,
      ]);
    } catch { /* 폰트가 없으면 시스템 세리프로 대체된다 */ }
    fontsReady = true;
  }

  async function decode(file) {
    if (window.createImageBitmap) {
      try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* noop */ }
      try { return await createImageBitmap(file); } catch { /* noop */ }
    }
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload  = () => { URL.revokeObjectURL(url); res(img); };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('decode')); };
      img.src = url;
    });
  }

  // 세로형은 3:4보다 길지 않게, 가로형은 3:2보다 넓지 않게 — 메이슨리 리듬 유지
  function geometry(sw, sh, crop, maxEdge) {
    const ratio = CROPS[crop] || clamp(sh / sw, 0.66, 1.45);
    const srcRatio = sh / sw;

    let sx = 0, sy = 0, sW = sw, sH = sh;
    if (srcRatio > ratio)      { sH = Math.round(sw * ratio); sy = Math.round((sh - sH) / 2); }
    else if (srcRatio < ratio) { sW = Math.round(sh / ratio); sx = Math.round((sw - sW) / 2); }

    let W, H;
    if (ratio >= 1) { H = Math.min(maxEdge, sH); W = Math.max(1, Math.round(H / ratio)); }
    else            { W = Math.min(maxEdge, sW); H = Math.max(1, Math.round(W * ratio)); }
    return { sx, sy, sW, sH, W, H };
  }

  function drawTracked(ctx, text, rightX, baseY, size, spacing, color) {
    ctx.font = `${size}px "Marcellus", "EB Garamond", Georgia, serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    const chars = [...text];
    const widths = chars.map(c => ctx.measureText(c).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
    let x = rightX - total;
    chars.forEach((c, i) => { ctx.fillText(c, x, baseY); x += widths[i] + spacing; });
  }

  function drawMark(ctx, W, H) {
    const unit = Math.min(W, H);
    const pad = Math.round(unit * 0.045);

    ctx.save();

    // 하단 스크림 — 로고 가독성 확보
    const scrimH = Math.round(H * 0.24);
    const sg = ctx.createLinearGradient(0, H - scrimH, 0, H);
    sg.addColorStop(0, 'rgba(10,10,11,0)');
    sg.addColorStop(1, 'rgba(10,10,11,0.52)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, H - scrimH, W, scrimH);

    // 샴페인 골드 헤어라인
    ctx.lineWidth = Math.max(1, unit * 0.0022);
    ctx.strokeStyle = 'rgba(216,189,130,0.40)';
    ctx.strokeRect(pad + 0.5, pad + 0.5, W - pad * 2 - 1, H - pad * 2 - 1);

    const zh = Math.round(unit * 0.055);
    const en = Math.round(unit * 0.021);
    const x  = W - pad - Math.round(unit * 0.032);
    const y  = H - pad - Math.round(unit * 0.034);

    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = 'rgba(230,211,160,0.94)';
    ctx.font = `700 ${zh}px "Nanum Myeongjo", Georgia, serif`;
    ctx.fillText('酒之魂', x, y - Math.round(en * 1.6));

    drawTracked(ctx, 'HONSPIRIT', x, y, en, unit * 0.012, 'rgba(244,237,224,0.80)');
    ctx.restore();
  }

  async function render(bmp, opt, maxEdge) {
    await ensureFonts();
    const g = geometry(bmp.width, bmp.height, opt.crop, maxEdge);
    const c = document.createElement('canvas');
    c.width = g.W; c.height = g.H;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const tone = TONES[opt.tone] || TONES.original;
    const hasFilter = 'filter' in ctx;

    if (hasFilter && tone.filter) ctx.filter = tone.filter;
    ctx.drawImage(bmp, g.sx, g.sy, g.sW, g.sH, 0, 0, g.W, g.H);
    if (hasFilter) ctx.filter = 'none';

    if (tone.overlay) {
      ctx.save();
      ctx.globalCompositeOperation = tone.overlay.mode;
      const lg = ctx.createLinearGradient(0, 0, g.W * 0.4, g.H);
      tone.overlay.stops.forEach(([p, col]) => lg.addColorStop(p, col));
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, g.W, g.H);
      ctx.restore();
    }

    if (tone.vignette > 0) {
      const r = Math.hypot(g.W, g.H) / 2;
      const rg = ctx.createRadialGradient(g.W / 2, g.H / 2, r * 0.52, g.W / 2, g.H / 2, r);
      rg.addColorStop(0, 'rgba(10,10,11,0)');
      rg.addColorStop(1, `rgba(10,10,11,${tone.vignette})`);
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, g.W, g.H);
    }

    if (opt.mark) drawMark(ctx, g.W, g.H);
    return c;
  }

  const toBlob = (canvas, q) => new Promise(res => canvas.toBlob(res, 'image/jpeg', q));

  /* ─────────────────────────────────────────
     피드 로딩 — DB(또는 로컬 미리보기) + 브랜드 시드
     ───────────────────────────────────────── */
  async function loadFeed() {
    let rows = [];
    let error = null;

    if (SB.on()) {
      try { rows = await SB.list({}); }
      catch (e) { error = e; console.warn('[moments]', e); }
    } else {
      // 로컬 미리보기에서도 '숨김'은 공개 갤러리에 노출하지 않는다 (DB 모드와 동작 일치)
      rows = (await Local.all())
        .filter(r => r.status !== 'hidden')
        .map(r => Object.assign({}, r, { kind: 'local', official: true }));
    }

    const items = rows.concat(SEEDS)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return { items, error };
  }

  return {
    CFG, PREVIEW_EDGE, TONES, CROPS, SEEDS,
    el, esc, clamp, lang, fmtDate, fmtDateShort, capOf, srcOf, dropURL,
    Local, SB, decode, render, toBlob, loadFeed,
  };
})();

window.HS_M = HS_M;
