/* =========================================
   HONSPIRIT — 魂의 순간 (MOMENTS) · 공개 갤러리
   읽기 전용. 업로드는 관계자 전용 studio.html 에서만 이루어진다.
   ========================================= */

'use strict';

const HS_MOMENTS = (() => {

  const M = window.HS_M;
  const { CFG, el, esc, capOf, srcOf, fmtDate, fmtDateShort, lang } = M;

  /* ─── 동적 문자열 (정적 텍스트는 data-i18n) ─── */
  const L = {
    ko: { count: n => `${n}개의 순간`, end: '모든 순간을 보았습니다', anon: 'HONSPIRIT',
          offline: '갤러리를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
          shareText: '혼스피릿의 순간 — HONSPIRIT 酒之魂' },
    en: { count: n => `${n} moment${n === 1 ? '' : 's'}`, end: 'You have reached the last moment', anon: 'HONSPIRIT',
          offline: 'The gallery could not be loaded. Please try again shortly.',
          shareText: 'A moment with HONSPIRIT — 酒之魂' },
    zh: { count: n => `${n} 个瞬间`, end: '已浏览全部瞬间', anon: 'HONSPIRIT',
          offline: '画廊加载失败，请稍后再试。',
          shareText: 'HONSPIRIT 的瞬间 — 酒之魂' },
  };
  const t = k => L[lang()][k];

  /* ─── 상태 ─── */
  const S = { items: [], view: [], cursor: 0, filter: 'all',
              cols: [], colH: [], colCount: 0, lbIndex: -1, done: false };

  /* ─────────────────────────────────────────
     메이슨리 월
     ───────────────────────────────────────── */
  // 사진이 적을 때 빈 열이 남지 않도록 장수에 맞춰 열을 줄인다
  function colsFor() {
    const w = window.innerWidth;
    const max = w <= 768 ? 2 : w <= 1024 ? 3 : 4;
    return Math.max(1, Math.min(max, S.view.length || max));
  }

  function buildCols(wall) {
    S.colCount = colsFor();
    wall.innerHTML = '';
    S.cols = [];
    S.colH = [];
    for (let i = 0; i < S.colCount; i++) {
      const c = document.createElement('div');
      c.className = 'moment-col';
      wall.appendChild(c);
      S.cols.push(c);
      S.colH.push(0);
    }
  }

  function place(node, weight) {
    let idx = 0;
    for (let i = 1; i < S.colH.length; i++) if (S.colH[i] < S.colH[idx]) idx = i;
    S.cols[idx].appendChild(node);
    S.colH[idx] += weight;
  }

  function cardEl(item, href) {
    const card = document.createElement(href ? 'a' : 'article');
    card.className = 'moment-card';
    card.dataset.id = item.id;
    if (href) {
      card.href = href;
    } else {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
    }

    const cap = capOf(item);
    const author = item.author || t('anon');

    card.innerHTML = `
      <div class="moment-media" style="aspect-ratio:${item.w} / ${item.h}">
        <img src="${esc(srcOf(item))}" alt="${esc(cap || 'HONSPIRIT moment')}" loading="lazy" decoding="async">
      </div>
      <div class="moment-body">
        ${cap ? `<p class="moment-caption">${esc(cap)}</p>` : ''}
        <div class="moment-meta">
          <span class="moment-author">${esc(author)}</span>
          <span class="moment-dot"></span>
          <span class="moment-date">${esc(fmtDateShort(item.createdAt))}</span>
        </div>
      </div>`;

    if (!href) {
      const open = () => openLightbox(item.id);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    }
    return card;
  }

  function applyFilter() {
    const f = S.filter;
    S.view = f === 'all' ? S.items.slice() : S.items.filter(i => i.tag === f);
    S.cursor = 0;
    S.done = false;

    const wall = el('momentsWall');
    if (!wall) return;
    buildCols(wall);
    el('momentsEnd')?.setAttribute('hidden', '');

    const empty = el('momentsEmpty');
    if (empty) empty.hidden = S.view.length > 0;

    const count = el('momentsCount');
    if (count) count.textContent = t('count')(S.view.length);

    renderBatch();
  }

  function renderBatch() {
    if (S.done) return;
    const next = S.view.slice(S.cursor, S.cursor + CFG.batch);
    next.forEach(item => {
      const capLen = (capOf(item) || '').length;
      place(cardEl(item), item.h / item.w + 0.22 + Math.min(capLen / 80, 1.4) * 0.16);
    });
    S.cursor += next.length;

    if (S.cursor >= S.view.length) {
      S.done = true;
      const end = el('momentsEnd');
      if (end && S.view.length) { end.textContent = t('end'); end.removeAttribute('hidden'); }
    }
  }

  /* ─────────────────────────────────────────
     라이트박스
     ───────────────────────────────────────── */
  function openLightbox(id) {
    if (!el('lightbox')) return;
    const i = S.view.findIndex(x => x.id === id);
    if (i < 0) return;
    S.lbIndex = i;
    paintLightbox();
    el('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    el('lightbox')?.classList.remove('open');
    document.body.style.overflow = '';
    S.lbIndex = -1;
  }

  function stepLightbox(d) {
    if (S.lbIndex < 0 || !S.view.length) return;
    S.lbIndex = (S.lbIndex + d + S.view.length) % S.view.length;
    paintLightbox();
  }

  function paintLightbox() {
    const item = S.view[S.lbIndex];
    if (!item) return;
    el('lbImage').src = srcOf(item);
    el('lbImage').alt = capOf(item) || 'HONSPIRIT moment';
    el('lbCaption').textContent = capOf(item);
    el('lbAuthor').textContent = item.author || t('anon');
    el('lbDate').textContent = fmtDate(item.createdAt);
    el('lbShare').hidden = !navigator.share;
  }

  async function currentBlob() {
    const item = S.view[S.lbIndex];
    if (!item) return null;
    if (item.kind === 'local') return item.blob;
    try { return await (await fetch(srcOf(item))).blob(); } catch { return null; }
  }

  /* ─────────────────────────────────────────
     홈 티저
     ───────────────────────────────────────── */
  function paintTeaser() {
    const box = el('momentsTeaser');
    if (!box) return;

    const section = box.closest('section');
    if (!S.items.length) {                    // 올린 사진이 없으면 섹션 자체를 숨긴다
      if (section) section.hidden = true;
      return;
    }
    if (section) section.hidden = false;

    const shown = S.items.slice(0, 4);
    box.style.gridTemplateColumns = `repeat(${shown.length}, minmax(0, 1fr))`;
    box.innerHTML = '';
    shown.forEach(item => {
      const card = cardEl(item, 'moments.html');
      // 티저는 4:5 로 통일해 한 줄이 가지런히 떨어지게 한다
      card.querySelector('.moment-media').style.aspectRatio = '4 / 5';
      box.appendChild(card);
    });
  }

  /* ─────────────────────────────────────────
     바인딩
     ───────────────────────────────────────── */
  function bindWall() {
    document.querySelectorAll('#momentFilters .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#momentFilters .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        S.filter = chip.dataset.filter;
        applyFilter();
      });
    });

    const sentinel = el('momentsSentinel');
    if (sentinel) {
      new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) renderBatch();
      }, { rootMargin: '900px 0px' }).observe(sentinel);
    }

    let rt = null;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (colsFor() !== S.colCount) applyFilter(); }, 180);
    });
  }

  function bindLightbox() {
    el('lbClose')?.addEventListener('click', closeLightbox);
    el('lightbox')?.addEventListener('click', e => { if (e.target.id === 'lightbox') closeLightbox(); });
    el('lbPrev')?.addEventListener('click', () => stepLightbox(-1));
    el('lbNext')?.addEventListener('click', () => stepLightbox(1));

    document.addEventListener('keydown', e => {
      if (!el('lightbox')?.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });

    let x0 = null;
    const stage = el('lightboxStage');
    stage?.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    stage?.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 56) stepLightbox(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });

    el('lbShare')?.addEventListener('click', async () => {
      const blob = await currentBlob();
      const file = blob ? new File([blob], 'honspirit-moment.jpg', { type: 'image/jpeg' }) : null;
      try {
        if (file && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], text: t('shareText') });
        } else {
          await navigator.share({ title: 'HONSPIRIT', text: t('shareText'), url: location.href });
        }
      } catch { /* 사용자가 취소 */ }
    });
  }

  function onLangChange() {
    if (el('momentsWall')) applyFilter();
    if (el('momentsTeaser')) paintTeaser();
    if (S.lbIndex >= 0) paintLightbox();
  }

  async function init() {
    if (!el('momentsWall') && !el('momentsTeaser')) return;

    const { items, error } = await M.loadFeed();
    S.items = items;

    if (el('momentsWall')) {
      bindWall();
      bindLightbox();
      applyFilter();
      if (error) {
        const note = el('momentsNotice');
        if (note) { note.textContent = t('offline'); note.hidden = false; }
      }
    }
    paintTeaser();

    // 언어 전환 훅 체이닝 (main.js 의 카운터 갱신을 덮어쓰지 않는다)
    const prev = window.HS_onLangChange;
    window.HS_onLangChange = l => {
      if (typeof prev === 'function') prev(l);
      onLangChange();
    };
  }

  document.addEventListener('DOMContentLoaded', init);

  return { reload: async () => { S.items = (await M.loadFeed()).items; applyFilter(); paintTeaser(); } };
})();

window.HS_MOMENTS = HS_MOMENTS;
