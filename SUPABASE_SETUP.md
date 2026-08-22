# MOMENTS — Supabase 연결

혼스피릿 추억 갤러리를 **모든 방문자가 함께 보는 공개 갤러리**로 만드는 설정입니다.

| 페이지 | 주소 | 권한 |
|---|---|---|
| 공개 갤러리 | `/moments.html` | 누구나 **보기만** |
| 업로드 스튜디오 | `/studio.html` | 관계자 **로그인 후 업로드·관리** |

`studio.html` 은 사이트 어디에도 링크되어 있지 않고 검색엔진에서도 제외됩니다(`robots.txt` + `noindex`).
주소를 알아내도 **비밀번호 없이는 아무것도 올릴 수 없습니다.**

---

## 진행 상황

| | 단계 | 상태 |
|---|---|---|
| 1 | Supabase 프로젝트 생성 (`honspirit` · Singapore) | ✅ 완료 |
| 2 | `js/moments-config.js` 에 URL · 키 입력 | ✅ 완료 (연결 확인됨) |
| 3 | SQL 실행 — 테이블 · 버킷 · 권한 | ✅ 완료 (잠금 동작 확인함) |
| 4 | 관계자 계정 생성 (`admin@honspirit.com`) | ✅ 완료 |
| 5 | 외부인 회원가입 차단 | ⬜ **여기부터** |
| 6 | `/studio.html` 로그인 후 업로드 테스트 | ⬜ |

---

## 3. SQL 실행

아래를 새 탭에서 엽니다.

```
https://supabase.com/dashboard/project/ynexywjkewjzlhkgfaxx/sql/new
```

프로젝트 폴더의 **`supabase-setup.sql`** 파일을 열어 **전체를 복사**한 뒤,
SQL Editor에 붙여넣고 **RUN** (또는 ⌘+Enter).

맨 아래에 이런 표가 나오면 성공입니다.

| table_policies | bucket | storage_policies |
|---|---|---|
| 5 | 1 | 3 |

> 여러 번 실행해도 안전하게 만들어 두었습니다. 숫자가 다르면 그대로 알려주세요.

## 4. 관계자 계정 만들기

```
https://supabase.com/dashboard/project/ynexywjkewjzlhkgfaxx/auth/users
```

**Add user → Create new user**

- **Email**: `admin@honspirit.com`
  - ⚠️ `supabase-setup.sql` 의 `is_moments_staff()` 함수에 적힌 주소와 **글자 하나까지 같아야** 합니다
  - 실제로 메일을 받을 수 있는 주소가 아니어도 됩니다 (아래 Auto Confirm 덕분에)
- **Password**: 길고 추측하기 어려운 것으로. **이것이 스튜디오 비밀번호입니다**
- **Auto Confirm User**: ✅ 체크

## 5. 외부인 회원가입 차단 — 가장 중요

```
https://supabase.com/dashboard/project/ynexywjkewjzlhkgfaxx/auth/providers
```

**Email** 항목을 펼치고 **"Allow new users to sign up"** 을 **OFF**.

켜져 있으면 외부인이 스스로 계정을 만들 수 있습니다.
(SQL의 이메일 제한이 2차 방어선이지만, 두 겹 다 잠가두는 편이 안전합니다.)

## 6. 업로드 테스트

배포된 사이트의 `/studio.html` 에 접속 →
`admin@honspirit.com` + 4단계에서 정한 비밀번호로 로그인 → 사진 업로드 →
`/moments.html` 에서 바로 보이면 완료입니다.

---

## 운영 메모

**관계자 추가하기.** `supabase-setup.sql` 의 `is_moments_staff()` 함수 안에 이메일을 한 줄 더하고
그 함수 부분만 다시 실행한 뒤, Authentication → Users 에서 계정을 만들면 됩니다.

**비밀번호 변경.** Supabase → Authentication → Users → 해당 사용자 → `Reset password`.
홈페이지 코드는 건드릴 필요 없습니다.

**키가 공개되어도 괜찮은 이유.** `sb_publishable_...` 키는 브라우저 JS 안에 들어 있어 누구나 볼 수 있지만,
위 RLS 정책 때문에 이 키만으로는 **읽기만** 됩니다. 올리거나 지우려면 4단계 계정의 비밀번호가 필요하고,
그 비밀번호는 코드 어디에도 저장되지 않습니다.
반대로 **`sb_secret_...` / `service_role` 키는 절대 코드에 넣으면 안 됩니다.**

**로그인 유지.** 한 번 로그인하면 그 기기·브라우저에서 계속 유지됩니다.
공용 PC에서는 작업 후 반드시 로그아웃하세요.

**링크를 더 감추려면** `studio.html` 파일 이름을 아무도 못 맞출 이름
(예: `studio-9f4c21ab.html`) 으로 바꾸고 `robots.txt` 의 `Disallow` 줄도 같이 바꾸세요.
어디에서도 링크하지 않으므로 이름만 바꾸면 그대로 동작합니다.

**용량.** 사진은 긴 변 1,440px · JPEG 품질 0.86 으로 저장되어 보통 한 장에 200~400KB 입니다.
무료 플랜 스토리지 1GB 로 대략 3,000장 정도 보관할 수 있습니다.

**갤러리는 한 번에 최근 500장까지** 읽어옵니다. 그 이상 쌓이면
`js/moments-config.js` 의 `maxRows` 를 올리거나 오래된 사진을 숨김 처리하세요.
