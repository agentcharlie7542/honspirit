/* =========================================
   HONSPIRIT — MOMENTS STUDIO (관계자 전용)
   비밀 링크로 접근 → 비밀번호 로그인 → 업로드 · 게시 관리
   쓰기 권한은 Supabase 로그인 토큰으로만 열린다.
   ========================================= */

'use strict';

(() => {

  const M = window.HS_M;
  const { CFG, PREVIEW_EDGE, el, esc, SB, Local } = M;

  const S = {
    picks: [], active: 0,
    tone: 'champagne', crop: 'auto', mark: true,
    busy: false, items: [],
  };
  let previewTimer = null;

  const localMode = () => !SB.on();

  /* ─────────────────────────────────────────
     토스트
     ───────────────────────────────────────── */
  let toastTimer = null;
  function toast(msg, kind) {
    const n = el('studioToast');
    if (!n) return;
    n.textContent = msg;
    n.classList.toggle('moments-toast--warn', kind === 'warn');
    n.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => n.classList.remove('show'), 4200);
  }

  /* ─────────────────────────────────────────
     로그인 게이트
     ───────────────────────────────────────── */
  function showApp(show) {
    el('studioGate').hidden = show;
    el('studioApp').hidden = !show;
    const who = el('studioWho');
    if (who) who.textContent = localMode() ? '로컬 미리보기 모드' : SB.staffEmail();
  }

  async function signIn(e) {
    e.preventDefault();
    const btn = el('gateSubmit');
    const email = el('gateEmail').value.trim();
    const pw = el('gatePassword').value;
    if (!email || !pw) { toast('이메일과 비밀번호를 입력해 주세요', 'warn'); return; }

    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = '확인 중…';
    try {
      await SB.signIn(email, pw);
      el('gatePassword').value = '';
      showApp(true);
      await loadManaged();
      toast('환영합니다 · ' + SB.staffEmail());
    } catch (err) {
      console.warn('[studio]', err);
      toast(/invalid|credential|grant/i.test(err.message)
        ? '이메일 또는 비밀번호가 올바르지 않습니다'
        : '로그인 실패 — ' + err.message, 'warn');
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  async function signOut() {
    await SB.signOut();
    resetComposer();
    showApp(false);
    toast('로그아웃되었습니다');
  }

  /* ─────────────────────────────────────────
     사진 선택 · 편집
     ───────────────────────────────────────── */
  function resetComposer() {
    S.picks.forEach(p => URL.revokeObjectURL(p.thumb));
    S.picks = [];
    S.active = 0;
    S.tone = 'champagne';
    S.crop = 'auto';
    S.mark = true;

    el('studioStage1').hidden = false;
    el('studioForm').hidden = true;
    el('studioFile').value = '';
    el('studioForm').reset();

    document.querySelectorAll('#toneChips .chip').forEach(c =>
      c.classList.toggle('active', c.dataset.tone === 'champagne'));
    document.querySelectorAll('#cropChips .chip').forEach(c =>
      c.classList.toggle('active', c.dataset.crop === 'auto'));
    el('studioPreview')?.querySelector('canvas')?.remove();
  }

  async function addFiles(fileList) {
    const files = [...fileList].filter(f => f.type.startsWith('image/'));
    if (!files.length) { toast('이미지 파일만 올릴 수 있습니다', 'warn'); return; }

    const room = CFG.maxFiles - S.picks.length;
    if (room <= 0) { toast(`한 번에 최대 ${CFG.maxFiles}장까지 올릴 수 있습니다`, 'warn'); return; }
    if (files.length > room) toast(`한 번에 최대 ${CFG.maxFiles}장까지 올릴 수 있습니다`, 'warn');

    for (const file of files.slice(0, room)) {
      try {
        const bmp = await M.decode(file);
        S.picks.push({ bmp, thumb: URL.createObjectURL(file) });
      } catch { toast(`${file.name} — 이 형식의 이미지는 읽을 수 없습니다`, 'warn'); }
    }
    if (!S.picks.length) return;

    el('studioStage1').hidden = true;
    el('studioForm').hidden = false;
    S.active = Math.min(S.active, S.picks.length - 1);
    paintThumbs();
    schedulePreview();
  }

  function paintThumbs() {
    const box = el('studioThumbs');
    box.innerHTML = '';
    S.picks.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sheet-thumb' + (i === S.active ? ' active' : '');
      b.innerHTML = `<img src="${p.thumb}" alt=""><span class="sheet-thumb-x" aria-hidden="true">×</span>`;
      b.addEventListener('click', e => {
        if (e.target.classList.contains('sheet-thumb-x')) {
          URL.revokeObjectURL(p.thumb);
          S.picks.splice(i, 1);
          if (!S.picks.length) { resetComposer(); return; }
          S.active = Math.min(S.active, S.picks.length - 1);
        } else {
          S.active = i;
        }
        paintThumbs();
        schedulePreview();
      });
      box.appendChild(b);
    });
    if (S.picks.length < CFG.maxFiles) {
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'sheet-thumb-add';
      add.textContent = '+';
      add.addEventListener('click', () => el('studioFile').click());
      box.appendChild(add);
    }
    el('studioPickCount').textContent = `${S.picks.length}장 선택됨`;
  }

  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(paintPreview, 70);
  }

  async function paintPreview() {
    const pick = S.picks[S.active];
    const wrap = el('studioPreview');
    if (!pick || !wrap) return;
    wrap.classList.add('busy');
    try {
      const canvas = await M.render(pick.bmp, { tone: S.tone, crop: S.crop, mark: S.mark }, PREVIEW_EDGE);
      wrap.querySelector('canvas')?.remove();
      wrap.appendChild(canvas);
    } catch { toast('미리보기를 만들지 못했습니다', 'warn'); }
    wrap.classList.remove('busy');
  }

  /* ─────────────────────────────────────────
     게시
     ───────────────────────────────────────── */
  async function publish(e) {
    e.preventDefault();
    if (S.busy) return;
    if (!S.picks.length) { toast('사진을 먼저 선택해 주세요', 'warn'); return; }

    const token = localMode() ? null : await SB.token();
    if (!localMode() && !token) {
      showApp(false);
      toast('세션이 만료되었습니다. 다시 로그인해 주세요', 'warn');
      return;
    }

    S.busy = true;
    const btn = el('studioPublish');
    const label = btn.textContent;
    btn.disabled = true;

    const meta = {
      author:     (el('studioAuthor').value || 'HONSPIRIT').trim().slice(0, 40),
      caption:    (el('studioCaption').value || '').trim().slice(0, 220),
      caption_en: (el('studioCaptionEn').value || '').trim().slice(0, 220),
      caption_zh: (el('studioCaptionZh').value || '').trim().slice(0, 220),
      tag:        el('studioTag').value || '',
      status:     el('studioHidden').checked ? 'hidden' : 'approved',
    };

    let ok = 0;
    try {
      for (let i = 0; i < S.picks.length; i++) {
        btn.textContent = `게시 중… ${i + 1}/${S.picks.length}`;
        const canvas = await M.render(S.picks[i].bmp, { tone: S.tone, crop: S.crop, mark: S.mark }, CFG.maxEdge);
        const blob = await M.toBlob(canvas, CFG.quality);
        if (!blob) throw new Error('이미지 인코딩 실패');

        const id = 'm_' + Date.now().toString(36) + '_' + i + Math.random().toString(36).slice(2, 7);

        if (localMode()) {
          await Local.put(Object.assign({
            id, kind: 'local', blob, w: canvas.width, h: canvas.height,
            tone: S.tone, official: true, createdAt: new Date().toISOString(),
          }, meta));
        } else {
          const path = `${new Date().getFullYear()}/${id}.jpg`;
          await SB.upload(path, blob, token);
          await SB.insert(Object.assign({
            id, path, w: canvas.width, h: canvas.height, tone: S.tone,
          }, meta), token);
        }
        ok++;
      }

      resetComposer();
      await loadManaged();
      toast(localMode()
        ? `${ok}장 저장 완료 — Supabase 미설정이라 이 기기에만 보관됩니다`
        : `${ok}장이 갤러리에 게시되었습니다`);
    } catch (err) {
      console.error('[studio]', err);
      toast((ok ? `${ok}장까지 게시 후 중단 — ` : '게시 실패 — ') + err.message, 'warn');
      await loadManaged();
    } finally {
      S.busy = false;
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  /* ─────────────────────────────────────────
     게시된 순간 관리
     ───────────────────────────────────────── */
  async function loadManaged() {
    const box = el('studioManage');
    if (!box) return;
    box.innerHTML = '<p class="studio-hint">불러오는 중…</p>';
    try {
      S.items = localMode()
        ? (await Local.all()).map(r => Object.assign({}, r, { kind: 'local' }))
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        : await SB.list({ token: await SB.token() });
    } catch (err) {
      box.innerHTML = `<p class="studio-hint">목록을 불러오지 못했습니다 — ${esc(err.message)}</p>`;
      return;
    }
    paintManaged();
  }

  function paintManaged() {
    const box = el('studioManage');
    el('studioManageCount').textContent = `${S.items.length}장`;

    if (!S.items.length) {
      box.innerHTML = '<p class="studio-hint">아직 게시된 사진이 없습니다.</p>';
      return;
    }

    box.innerHTML = '';
    S.items.forEach(item => {
      const tagName = t => ({ soul: '酒之魂', spirit: '酒之灵', heart: '酒之心' }[t] || t);

      const row = document.createElement('div');
      row.className = 'studio-item' + (item.status === 'hidden' ? ' studio-item--hidden' : '');
      row.innerHTML = `
        <div class="studio-row">
          <div class="studio-row-thumb"><img src="${esc(M.srcOf(item))}" alt="" loading="lazy"></div>
          <div class="studio-row-body">
            <p class="studio-row-cap">${esc(item.caption || '(캡션 없음)')}</p>
            <p class="studio-row-meta">
              ${esc(item.author || 'HONSPIRIT')} · ${esc(M.fmtDateShort(item.createdAt))} ·
              ${item.tag ? esc(tagName(item.tag)) : '태그 없음'} ·
              <span class="studio-row-state">${item.status === 'hidden' ? '숨김' : '게시 중'}</span>
            </p>
          </div>
          <div class="studio-row-acts">
            <button class="chip" type="button" data-act="edit">수정</button>
            <button class="chip" type="button" data-act="toggle">${item.status === 'hidden' ? '게시' : '숨김'}</button>
            <button class="chip chip--danger" type="button" data-act="delete">삭제</button>
          </div>
        </div>

        <div class="studio-edit" hidden>
          <div class="sheet-field">
            <span class="sheet-label">캡션 · 한국어</span>
            <textarea class="form-textarea" data-f="caption" rows="2" maxlength="220" style="min-height:70px"></textarea>
          </div>
          <div class="sheet-field">
            <span class="sheet-label">Caption · English</span>
            <textarea class="form-textarea" data-f="caption_en" rows="2" maxlength="220" style="min-height:70px"
              placeholder="비워두면 한국어 캡션이 그대로 보입니다"></textarea>
          </div>
          <div class="sheet-field">
            <span class="sheet-label">字幕 · 中文</span>
            <textarea class="form-textarea" data-f="caption_zh" rows="2" maxlength="220" style="min-height:70px"
              placeholder="비워두면 한국어 캡션이 그대로 보입니다"></textarea>
          </div>
          <div class="form-grid" style="margin-top:16px;">
            <div class="form-group">
              <label class="form-label">표기 이름</label>
              <input class="form-input" type="text" data-f="author" maxlength="40" placeholder="HONSPIRIT">
            </div>
            <div class="form-group">
              <label class="form-label">함께한 제품</label>
              <select class="form-select" data-f="tag">
                <option value="">선택 안 함</option>
                <option value="soul">酒之魂 · Soul</option>
                <option value="spirit">酒之灵 · Spirit</option>
                <option value="heart">酒之心 · Heart</option>
              </select>
            </div>
          </div>
          <div class="sheet-actions">
            <button class="btn btn-outline" type="button" data-act="edit-cancel">취소</button>
            <button class="btn btn-primary" type="button" data-act="edit-save">저장</button>
          </div>
        </div>`;

      const panel = row.querySelector('.studio-edit');
      const field = f => panel.querySelector(`[data-f="${f}"]`);
      const fill  = () => ['caption', 'caption_en', 'caption_zh', 'author', 'tag']
        .forEach(f => { field(f).value = item[f] || ''; });

      row.querySelector('[data-act="edit"]').addEventListener('click', () => {
        const open = panel.hidden;
        if (open) fill();
        panel.hidden = !open;
        row.classList.toggle('studio-item--editing', open);
        if (open) field('caption').focus();
      });
      row.querySelector('[data-act="edit-cancel"]').addEventListener('click', () => {
        panel.hidden = true;
        row.classList.remove('studio-item--editing');
      });
      row.querySelector('[data-act="edit-save"]').addEventListener('click', ev =>
        saveEdit(item, {
          caption:    field('caption').value.trim().slice(0, 220),
          caption_en: field('caption_en').value.trim().slice(0, 220),
          caption_zh: field('caption_zh').value.trim().slice(0, 220),
          author:     field('author').value.trim().slice(0, 40) || 'HONSPIRIT',
          tag:        field('tag').value,
        }, ev.currentTarget));

      row.querySelector('[data-act="toggle"]').addEventListener('click', () => toggleStatus(item));
      row.querySelector('[data-act="delete"]').addEventListener('click', () => removeItem(item));
      box.appendChild(row);
    });
  }

  async function saveEdit(item, fields, btn) {
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = '저장 중…';
    try {
      if (localMode()) await Local.put(Object.assign({}, item, fields));
      else await SB.patch(item.id, fields, await SB.token());
      Object.assign(item, fields);
      paintManaged();
      toast('수정되었습니다');
    } catch (err) {
      toast('수정 실패 — ' + err.message, 'warn');
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  async function toggleStatus(item) {
    const next = item.status === 'hidden' ? 'approved' : 'hidden';
    try {
      if (localMode()) {
        await Local.put(Object.assign({}, item, { status: next }));
      } else {
        await SB.setStatus(item.id, next, await SB.token());
      }
      item.status = next;
      paintManaged();
      toast(next === 'hidden' ? '갤러리에서 숨겼습니다' : '갤러리에 다시 게시했습니다');
    } catch (err) {
      toast('변경 실패 — ' + err.message, 'warn');
    }
  }

  async function removeItem(item) {
    if (!confirm('이 사진을 완전히 삭제할까요? 되돌릴 수 없습니다.')) return;
    try {
      if (localMode()) await Local.del(item.id);
      else await SB.remove(item, await SB.token());
      M.dropURL(item.id);
      S.items = S.items.filter(i => i.id !== item.id);
      paintManaged();
      toast('삭제되었습니다');
    } catch (err) {
      toast('삭제 실패 — ' + err.message, 'warn');
    }
  }

  /* ─────────────────────────────────────────
     초기화
     ───────────────────────────────────────── */
  function bind() {
    el('gateForm').addEventListener('submit', signIn);
    el('studioSignOut').addEventListener('click', signOut);

    const drop = el('studioDrop');
    const input = el('studioFile');
    drop.addEventListener('click', () => input.click());
    input.addEventListener('change', () => { if (input.files?.length) addFiles(input.files); input.value = ''; });

    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault(); drop.classList.add('dragover');
    }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault(); drop.classList.remove('dragover');
    }));
    drop.addEventListener('drop', e => { if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files); });

    document.querySelectorAll('#toneChips .chip').forEach(chip => chip.addEventListener('click', () => {
      document.querySelectorAll('#toneChips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      S.tone = chip.dataset.tone;
      schedulePreview();
    }));

    document.querySelectorAll('#cropChips .chip').forEach(chip => chip.addEventListener('click', () => {
      document.querySelectorAll('#cropChips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      S.crop = chip.dataset.crop;
      schedulePreview();
    }));

    el('studioMark').addEventListener('change', e => { S.mark = e.target.checked; schedulePreview(); });
    el('studioForm').addEventListener('submit', publish);
    el('studioCancel').addEventListener('click', resetComposer);
  }

  async function init() {
    bind();

    if (localMode()) {
      // Supabase 미설정 — 설정 안내를 띄우고 로그인 없이 미리보기로 동작시킨다
      el('studioSetup').hidden = false;
      el('studioGateBox').hidden = true;
      showApp(true);
      await loadManaged();
      return;
    }

    el('gateEmail').value = CFG.staffEmail || '';
    const token = await SB.token();
    if (token) {
      showApp(true);
      await loadManaged();
    } else {
      showApp(false);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
