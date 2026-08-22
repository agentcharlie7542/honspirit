/* =========================================
   HONSPIRIT — MOMENTS 설정
   ─────────────────────────────────────────
   구조
     · moments.html  → 누구나 보는 공개 갤러리 (읽기 전용)
     · studio.html   → 관계자 전용 업로드 페이지 (비밀 링크 + 비밀번호)

   아래 supabase 항목을 채우면 DB 모드로 전환되어
   업로드한 사진이 모든 방문자에게 보입니다.
   비워두면 studio 가 이 기기(IndexedDB)에만 저장하는 미리보기 모드로 동작합니다.

   ── Supabase 설정 순서 (SUPABASE_SETUP.md 에 전체 안내) ──
     1) supabase.com 프로젝트 생성
     2) SQL Editor 에서 SUPABASE_SETUP.md 의 SQL 실행
     3) Authentication → Users 에서 관계자 계정 1개 생성
     4) Authentication → Sign In / Providers → Email 의
        "Allow new users to sign up" 을 반드시 OFF
     5) Project Settings → API 의 Project URL / anon public key 를 아래에 붙여넣기
   ========================================= */

window.HS_MOMENTS_CONFIG = {

  /* ── Supabase (비우면 로컬 미리보기 모드) ── */
  supabase: {
    url:     'https://ynexywjkewjzlhkgfaxx.supabase.co',
    anonKey: 'sb_publishable_lzQlF6J8v1Ldu2--jDu1Bw_njZz-Igi',
    bucket:  'moments',
    table:   'moments',
  },

  /* ── studio 로그인 기본 이메일 (비밀번호는 코드에 두지 않습니다) ── */
  staffEmail: 'admin@honspirit.com',

  /* ── 튜닝 값 ── */
  maxEdge:  1440,   // 저장 시 긴 변 최대 px
  quality:  0.86,   // JPEG 품질
  batch:    8,      // 무한 스크롤 1회 렌더 개수
  maxFiles: 6,      // 한 번에 올릴 수 있는 사진 수
  maxRows:  500,    // 갤러리가 한 번에 읽어오는 최대 장수
};
