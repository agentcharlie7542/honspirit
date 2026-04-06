/* =========================================
   HORNSPIRIT — i18n 다국어 시스템
   KO (한국어) | EN (English) | ZH (中文)
   ========================================= */

'use strict';

const HS_I18N = (() => {

  const STORAGE_KEY = 'hs_lang';

  /* ─── 번역 데이터 ─── */
  const T = {

    /* ════════════════════════════════════════
       한국어 (기본)
    ════════════════════════════════════════ */
    ko: {
      /* NAV */
      'nav.story':    '브랜드 스토리',
      'nav.products': '제품',
      'nav.origin':   '산지 이야기',
      'nav.partners': 'B2B 파트너십',
      'nav.contact':  '문의',
      'nav.cta':      '파트너십 문의',
      'nav.sub':      '혼스피릿 · 酒之魂',

      /* AGE GATE */
      'age.title':  '만 19세 이상이십니까?',
      'age.desc':   '혼스피릿은 주류를 취급합니다.<br>법적 음주 가능 연령 확인이 필요합니다.',
      'age.yes':    '예, 19세 이상입니다',
      'age.no':     '아니오',
      'age.legal':  '미성년자의 음주는 법으로 금지되어 있습니다.<br>주류는 성인에게만 판매됩니다.',

      /* HERO */
      'hero.badge': '🏆 1,300년 양조의 땅, 쑤첸(宿迁) 정통 생산',
      'hero.title': '백주의 영혼',
      'hero.desc':  '5,000년 쑤첸의 역사가 한 잔에 담기다',
      'hero.cta1':  '브랜드 스토리 보기',
      'hero.cta2':  '제품 알아보기',
      'hero.t1':    '중국 3대 백주 산지 공식 인정',
      'hero.t2':    '양허(洋河) 공장 파트너십',
      'hero.t3':    '한국 정식 수입 통관 완료',

      /* PHILOSOPHY */
      'phil.label':      'Brand Philosophy',
      'phil.title':      '술 한 잔에 담긴 인간의 삶',
      'phil.desc':       'HORNSPIRIT은 중국 전통 백주의 유구한 역사와 현대적 한국 감성을 융합합니다.<br>魂(혼) · 灵(령) · 心(심) — 세 가지 가치가 하나의 잔에 담깁니다.',
      'phil.1.title':    '영혼의 깊이',
      'phil.1.desc':     '수백 년을 기다린 맛.<br>고독과 아름다움을 품은 한 잔.',
      'phil.1.emotion':  '한(恨)',
      'phil.2.title':    '활기찬 에너지',
      'phil.2.desc':     '오늘의 즐거움을 담아.<br>삶의 활기를 채워주는 술.',
      'phil.2.emotion':  '흥(興)',
      'phil.3.title':    '따뜻한 유대',
      'phil.3.desc':     '당신과 나를 잇는 술.<br>진솔한 열정과 인간적 온기.',
      'phil.3.emotion':  '정(情)',

      /* TRUST BAR */
      'trust.label':  'By the Numbers',
      'trust.title':  '숫자로 보는 신뢰',
      'trust.1':      '쑤첸 양조 역사',
      'trust.2':      '글로벌 백주 브랜드<br>가치 세계 순위',
      'trust.3':      '쑤첸 백주<br>생산기지 규모',
      'trust.4':      '쑤첸 주류 산업<br>종사 인원',
      'trust.5':      '酒之魂 정통<br>농향형 도수',

      /* PRODUCTS PREVIEW */
      'prod.label':          'Our Products',
      'prod.title':          '깊이(魂), 활기(灵), 따뜻함(心)을 선택하세요',
      'prod.soul.copy':      '수백 년 전통 양조 기법과 장기 숙성. 이 한 병에 쑤첸 천 년의 시간이 담겼습니다.',
      'prod.soul.channel':   '호텔 · 파인다이닝 · VIP 선물',
      'prod.spirit.copy':    '젊은 감각과 정통의 만남. 오늘 밤 당신의 테이블을 빛낼 술.',
      'prod.spirit.channel': '이자카야 · 바 · 골프장',
      'prod.heart.copy':     '부드럽고 따뜻하게. 소중한 사람과 나누는 가장 진솔한 한 잔.',
      'prod.heart.channel':  '편의점 · 대형마트 · 식당',
      'prod.detail':         '자세히 보기',

      /* ORIGIN TEASER */
      'origin.label':  'Origin Story',
      'origin.quote':  '아일레이가 위스키의 성지이듯,<br><em>쑤첸은 백주의 성지입니다.</em>',
      'origin.body':   '중국 장쑤성 쑤첸(宿迁). 5,000년 문명의 땅에서 1,300년을 이어온 양조 전통.<br>회하(淮河)의 맑은 물, 홍택호(洪泽湖)의 비옥한 미생물이 빚어낸 자연의 선물 —<br>그것이 酒之魂입니다.',
      'origin.s1':     '문명의 역사',
      'origin.s2':     '양조의 전통',
      'origin.s3':     '백주 산지 위상',
      'origin.cta':    '산지 이야기 더 보기 →',

      /* B2B BANNER */
      'b2b.label':    'B2B Partnership',
      'b2b.title':    '프리미엄 백주,<br>귀사의 테이블에<br>올려드립니다',
      'b2b.desc':     '골프장 · 호텔 · 이자카야 · 면세점 파트너를 모집합니다.<br>채널별 맞춤 공급 조건과 전략적 파트너십을 제공합니다.',
      'b2b.ch1':      '골프장 · 클럽',
      'b2b.ch2':      '호텔 · 파인다이닝',
      'b2b.ch3':      '이자카야 · 바',
      'b2b.ch4':      '편의점 · 마트',
      'b2b.ch5':      '면세점',
      'b2b.ch6':      'VIP 기프트',
      'b2b.box.title':'파트너십 혜택',
      'b2b.f1':       '채널별 맞춤 공급 조건 및 전담 MD 지원',
      'b2b.f2':       '현장 시음회 및 마케팅 콘텐츠 제공',
      'b2b.f3':       '소량 발주 가능 · 정기 공급 시스템',
      'b2b.f4':       '양허(洋河) 공장 파트너십 — 검증된 품질 관리',
      'b2b.f5':       '한국 정식 수입 통관 완료 · 식약처 기준 적합',
      'b2b.cta':      '파트너십 문의하기 →',

      /* FOOTER */
      'footer.company':  '혼스피릿 코리아 · 한국 수입 법인',
      'footer.prod':     '제품',
      'footer.brand':    '브랜드',
      'footer.policy':   '정책',
      'footer.privacy':  '개인정보처리방침',
      'footer.terms':    '이용약관',
      'footer.story':    '브랜드 스토리',
      'footer.origin':   '산지 이야기',
      'footer.partners': '파트너십',
      'footer.contact':  '문의',
      'footer.warning':  '⚠ 미성년자 음주 금지 · 임신 중 음주는 태아에게 해롭습니다',
      'footer.legal':    '주류는 만 19세 이상에게만 판매됩니다 · 음주운전 절대 금지',

      /* ── STORY PAGE ── */
      'story.hero.label':  'Brand Story',
      'story.hero.title':  '술 한 잔에 담긴<br><span class="gold">인간의 삶</span>',
      'story.hero.desc':   'HORNSPIRIT은 단순한 술이 아닙니다. 중국 전통 백주의 천 년 역사와 현대 한국 감성이 만나 탄생한, 영혼의 음료입니다.',
      'story.p1.label':    'Part 01',
      'story.p1.title':    'HORNSPIRIT<br>탄생 이야기',
      'story.p1.body1':    '브랜드 창립자들은 묻었습니다. 술이 단순한 음료를 넘어설 수 있다면 — 그것은 어떤 모습일까?',
      'story.p1.body2':    '한국의 한(恨)은 깊고 묵직한 감정의 응축입니다. 중국의 白酒는 수천 년의 역사를 한 모금에 담아냅니다. 두 문화가 만나는 지점에서 HORNSPIRIT이 태어났습니다.',
      'story.p1.l1':       '술이 단순한 음료를 넘어 — 삶의 깊이(魂)를 담는다',
      'story.p1.l2':       '활기(灵)를 불어넣어 인간의 에너지를 깨운다',
      'story.p1.l3':       '열정(心)으로 사람과 사람을 잇는다',
      'story.p2.label':    'Part 02',
      'story.p2.title':    '장인의 시간',
      'story.p2.desc':     '전통 농향형(浓香型) 제조 과정. 자연과 시간, 장인의 손끝이 만나는 순간.',
      'story.s1.name':     '원료 선별',
      'story.s1.desc':     '쑤첸 평야의 최상급 수수(고량)와 밀을 엄선합니다.',
      'story.s2.name':     '누룩 제조',
      'story.s2.desc':     '수백 년 미생물 생태계가 살아있는 전통 누룩(曲)을 만듭니다.',
      'story.s3.name':     '발효',
      'story.s3.desc':     '지하 움 발효조에서 천천히 깊어지는 향과 맛의 탄생.',
      'story.s4.name':     '증류',
      'story.s4.desc':     '전통 토증기(土甑器) 방식으로 순수한 원주를 추출합니다.',
      'story.s5.name':     '장기 숙성',
      'story.s5.desc':     '도자기 항아리 속에서 세월과 함께 깊어지는 맛.',
      'story.s6.name':     '블렌딩 & 병입',
      'story.s6.desc':     '수석 블렌더의 손으로 완성되는 최종 향미 밸런스.',
      'story.p3.label':    'Part 03',
      'story.p3.title':    '우리가<br>선택받은 이유',
      'story.p3.desc':     '중국 TOP3 백주 생산 파트너, 정통 원료, 검증된 품질 관리. HORNSPIRIT이 선택받는 세 가지 이유.',
      'story.cta.title':   'HORNSPIRIT을 경험하세요',
      'story.cta.desc':    '1,300년의 시간이 담긴 한 잔을 만나보세요.',
      'story.cta.btn1':    '제품 보러가기',
      'story.cta.btn2':    '산지 이야기 →',

      /* ── ORIGIN PAGE ── */
      'origin.hero.label': 'Origin Story',
      'origin.hero.title': '백주의 성지,<br><span class="gold">宿迁(쑤첸)</span>',
      'origin.hero.desc':  '아일레이가 위스키의 성지이듯, 쑤첸은 백주의 성지입니다.<br>5,000년 문명의 땅에서 1,300년을 이어온 양조 전통.',
      'origin.h1.label':   'History',
      'origin.h1.title':   '5,000년의 땅',
      'origin.h1.body':    '쑤첸(宿迁)은 중국 장쑤성에 위치하며 5,000년 이상의 문명사와 2,700년 이상의 도시 역사를 가진 고도(古都)입니다. 1,300년 이상의 양조 역사를 가진 양허(洋河)와 쌍구(双沟) 두 브랜드 모두 쑤첸에서 탄생했습니다.',
      'origin.n.label':    "Nature's Secret",
      'origin.n.title':    '자연이 만드는 비밀',
      'origin.n.desc':     '쑤첸이 백주의 성지가 된 데는 자연적 이유가 있습니다.<br>물, 땅, 공기, 시간 — 네 가지 자연 조건의 완벽한 조화.',
      'origin.n1.name':    '물 (水)',
      'origin.n1.desc':    '회하(淮河)와 홍택호(洪泽湖) — 천혜의 수질과 습지 생태계. 미네랄이 풍부한 강물이 백주의 순도와 향미를 결정짓습니다.',
      'origin.n2.name':    '땅 (地)',
      'origin.n2.desc':    '황하 충적 평야의 비옥한 토양. 수수(고량)와 밀 등 백주 원료의 최고 산지.',
      'origin.n3.name':    '공기 (氣)',
      'origin.n3.desc':    '온난하고 습한 기후. 누룩(曲) 발효에 이상적인 자연 환경. 수백 년의 미생물이 살아 숨쉽니다.',
      'origin.n4.name':    '시간 (時)',
      'origin.n4.desc':    '1,300년 장인의 손끝에서 전해진 발효 비법. 세대를 넘어 계승되는 전통 제조법.',
      'origin.i.label':    'Industry Scale',
      'origin.i.title':    '세계가 인정한<br>백주의 수도',
      'origin.i.body':     '쑤첸은 중국 3대 백주 브랜드 중 하나인 양허(洋河)의 고향이자, 세계 독주 시장에서 인정받은 백주 산업의 심장부입니다.',
      'origin.birth.title':'酒之魂의 탄생지',
      'origin.birth.quote':'혼스피릿은 이 쑤첸의 유서 깊은 공장에서 탄생합니다.<br>단순한 술이 아닌, 쑤첸의 비옥한 토양과 장인의 시간이<br>응축된 — 백주의 영혼.',
      'origin.birth.body': '5,000년 문명의 땅, 1,300년 양조의 역사, 자연이 허락한 최상의 환경. 이 모든 것이 한 병의 HORNSPIRIT에 담겨 당신 앞에 서있습니다.',

      /* ── PRODUCTS PAGE ── */
      'products.hero.label': 'Our Products',
      'products.hero.title': '깊이 · 활기 · 따뜻함<br><span class="gold">세 가지 영혼</span>',
      'products.hero.desc':  '1,300년 쑤첸의 전통이 세 가지 표정으로 당신 앞에 서다.<br>당신의 순간에 맞는 영혼을 선택하세요.',
      'products.compare.label': 'Comparison',
      'products.compare.title': '제품 한눈에 비교하기',
      'products.tab.grade':    '등급',
      'products.tab.abv':      '도수',
      'products.tab.vol':      '용량',
      'products.tab.price':    '소비자가',
      'products.tab.keyword':  '감성 키워드',
      'products.tab.channel':  '주요 채널',
      'products.soul.label':   'SOUL · 영혼',
      'products.soul.title':   '불멸의 본질,<br>장기 숙성의 깊이',
      'products.soul.quote':   '"수백 년 전통 양조 기법과 장기 숙성. 이 한 병에 쑤첸 천 년의 시간이 담겼습니다."',
      'products.soul.desc':    '酒之魂은 HORNSPIRIT의 플래그십입니다. 한(恨)의 감성 — 깊고 고독한 아름다움을 담은 최상급 라인.',
      'products.soul.channel': '호텔 · 파인다이닝 · VIP 선물',
      'products.soul.aroma':   '향미 노트',
      'products.soul.pairing': '추천 페어링',
      'products.spirit.label': 'SPIRIT · 활기',
      'products.spirit.title': '현대적 트위스트,<br>활기찬 에너지',
      'products.spirit.quote': '"젊은 감각과 정통의 만남. 오늘 밤 당신의 테이블을 빛낼 술."',
      'products.spirit.desc':  '酒之灵은 흥(興)의 감성을 담은 프리미엄 라인입니다. 활기찬 에너지와 사교적 즐거움을 위한 술.',
      'products.spirit.channel': '이자카야 · 바 · 골프장',
      'products.heart.label':  'HEART · 따뜻함',
      'products.heart.title':  '일상의 따뜻함,<br>정통 쉽게 즐기기',
      'products.heart.quote':  '"부드럽고 따뜻하게. 소중한 사람과 나누는 가장 진솔한 한 잔."',
      'products.heart.desc':   '酒之心은 정(情)의 감성 — 따뜻한 유대와 일상의 온기를 담은 클래식 라인입니다.',
      'products.heart.channel': '편의점 · 대형마트 · 식당',
      'products.cta.buy':      '구매 문의하기',
      'products.cta.b2b':      'B2B 공급 문의',
      'products.cta.buy2':     '구매처 안내',

      /* ── PARTNERS PAGE ── */
      'partners.hero.label': 'B2B Partnership',
      'partners.hero.title': '프리미엄 백주,<br>귀사의 테이블에<br><span class="gold">올려드립니다</span>',
      'partners.hero.desc':  '골프장 · 호텔 · 이자카야 · 면세점 파트너를 모집합니다.<br>채널별 맞춤 공급 조건과 전략적 파트너십을 제공합니다.',
      'partners.ch.label':   'Channel Lineup',
      'partners.ch.title':   '채널별 공급 라인업',
      'partners.form.label': 'Apply Now',
      'partners.form.title': '파트너십 신청',
      'partners.form.desc':  '아래 폼을 작성해 주시면 담당자가 48시간 이내에 연락드립니다.',
      'partners.f.company':  '상호명 *',
      'partners.f.name':     '담당자명 *',
      'partners.f.phone':    '연락처 *',
      'partners.f.email':    '이메일 *',
      'partners.f.type':     '사업 형태 *',
      'partners.f.product':  '희망 제품 라인',
      'partners.f.qty':      '예상 월 발주량',
      'partners.f.message':  '추가 문의사항',
      'partners.f.submit':   '파트너십 문의 제출하기',
      'partners.f.note':     '제출 후 48시간 이내에 담당자가 연락드립니다.',

      /* ── CONTACT PAGE ── */
      'contact.hero.label': 'Contact Us',
      'contact.hero.title': '문의 · 구매 안내',
      'contact.hero.desc':  '소비자 문의, 구매처 안내, SNS 채널.<br>HORNSPIRIT과 소통하세요.',
      'contact.form.title': '소비자 문의',
      'contact.f.name':     '이름 *',
      'contact.f.email':    '이메일 *',
      'contact.f.type':     '문의 유형',
      'contact.f.subject':  '제목 *',
      'contact.f.message':  '내용 *',
      'contact.f.agree':    '개인정보 수집 및 이용에 동의합니다.',
      'contact.f.submit':   '문의 보내기',
      'contact.b2b.title':  '사업체이신가요?',
      'contact.b2b.desc':   'B2B 파트너십 전용 문의는 아래 버튼을 이용해주세요.',
      'contact.b2b.btn':    'B2B 파트너십 문의하기 →',
    },

    /* ════════════════════════════════════════
       English
    ════════════════════════════════════════ */
    en: {
      'nav.story':    'Brand Story',
      'nav.products': 'Products',
      'nav.origin':   'Origin',
      'nav.partners': 'B2B Partnership',
      'nav.contact':  'Contact',
      'nav.cta':      'Partner Inquiry',
      'nav.sub':      'Hornspirit · 酒之魂',

      'age.title':  'Are you 19 or older?',
      'age.desc':   'HORNSPIRIT handles alcoholic beverages.<br>Age verification is required by law.',
      'age.yes':    'Yes, I am 19+',
      'age.no':     'No',
      'age.legal':  'Alcohol consumption by minors is prohibited by law.<br>Alcohol is sold to adults only.',

      'hero.badge': '🏆 Authentically Produced in Suqian — 1,300 Years of Brewing History',
      'hero.title': 'Soul of Baijiu',
      'hero.desc':  '5,000 years of Suqian heritage, distilled into one glass',
      'hero.cta1':  'View Brand Story',
      'hero.cta2':  'Explore Products',
      'hero.t1':    "Officially recognized as China's Top 3 baijiu region",
      'hero.t2':    'Yanghe Distillery Partnership',
      'hero.t3':    'Official Korean import clearance completed',

      'phil.label':      'Brand Philosophy',
      'phil.title':      'Life Itself, in Every Pour',
      'phil.desc':       'HORNSPIRIT fuses centuries of Chinese baijiu tradition with modern Korean sensibility.<br>Soul · Spirit · Heart — three values, one glass.',
      'phil.1.title':    'Depth of Soul',
      'phil.1.desc':     'A taste worth centuries of waiting.<br>A glass that holds solitude and beauty.',
      'phil.1.emotion':  'Han · Solitude',
      'phil.2.title':    'Vibrant Energy',
      'phil.2.desc':     "Carrying today's joy.<br>A drink that fills life with spirit.",
      'phil.2.emotion':  'Heung · Vitality',
      'phil.3.title':    'Warm Connection',
      'phil.3.desc':     'The drink that bonds you and me.<br>Passion and human warmth.',
      'phil.3.emotion':  'Jeong · Warmth',

      'trust.label':  'By the Numbers',
      'trust.title':  'Trust by the Numbers',
      'trust.1':      'Years of brewing<br>history in Suqian',
      'trust.2':      'Global baijiu brand<br>value ranking',
      'trust.3':      'Suqian baijiu<br>production base',
      'trust.4':      'Suqian liquor<br>industry workers',
      'trust.5':      'Jiuzhihun authentic<br>nong-xiang ABV',

      'prod.label':          'Our Products',
      'prod.title':          'Choose your soul — Depth, Vitality, or Warmth',
      'prod.soul.copy':      'Traditional brewing mastery and long aging. A millennium of Suqian heritage in one bottle.',
      'prod.soul.channel':   'Hotels · Fine Dining · VIP Gifts',
      'prod.spirit.copy':    'Where modern sensibility meets tradition. The spirit to illuminate your table tonight.',
      'prod.spirit.channel': 'Izakaya · Bar · Golf Club',
      'prod.heart.copy':     'Smooth and warm. The most sincere glass to share with someone special.',
      'prod.heart.channel':  'Convenience Store · Supermarket · Restaurant',
      'prod.detail':         'View Details',

      'origin.label':  'Origin Story',
      'origin.quote':  'As Islay is the sacred land of whisky,<br><em>Suqian is the sacred land of baijiu.</em>',
      'origin.body':   'Suqian, Jiangsu, China. A 1,300-year brewing tradition on land with 5,000 years of civilization.<br>The pure waters of the Huai River, the rich microorganisms of Hongze Lake — nature\'s gift.<br>That is 酒之魂.',
      'origin.s1':     'Years of civilization',
      'origin.s2':     'Brewing tradition',
      'origin.s3':     "World's baijiu prestige",
      'origin.cta':    'Read the Full Origin Story →',

      'b2b.label':    'B2B Partnership',
      'b2b.title':    'Premium Baijiu,<br>For Your<br>Establishment',
      'b2b.desc':     'Recruiting partners across golf clubs, hotels, izakaya, and duty-free.<br>Channel-specific supply terms and strategic partnership support.',
      'b2b.ch1':      'Golf Club',
      'b2b.ch2':      'Hotel · Fine Dining',
      'b2b.ch3':      'Izakaya · Bar',
      'b2b.ch4':      'Convenience · Market',
      'b2b.ch5':      'Duty Free',
      'b2b.ch6':      'VIP Gift',
      'b2b.box.title':'Partnership Benefits',
      'b2b.f1':       'Channel-specific supply terms & dedicated MD support',
      'b2b.f2':       'On-site tasting events & marketing content',
      'b2b.f3':       'Small-batch orders available · Regular supply system',
      'b2b.f4':       'Yanghe Distillery Partnership — verified quality control',
      'b2b.f5':       'Korean import clearance & MFDS compliance certified',
      'b2b.cta':      'Inquire About Partnership →',

      'footer.company':  'HORNSPIRIT Korea · Official Korean Importer',
      'footer.prod':     'Products',
      'footer.brand':    'Brand',
      'footer.policy':   'Legal',
      'footer.privacy':  'Privacy Policy',
      'footer.terms':    'Terms of Use',
      'footer.story':    'Brand Story',
      'footer.origin':   'Origin Story',
      'footer.partners': 'Partnership',
      'footer.contact':  'Contact',
      'footer.warning':  '⚠ No alcohol for minors · Alcohol during pregnancy harms the fetus',
      'footer.legal':    'Alcohol sold to adults 19+ only · Never drink and drive',

      'story.hero.label': 'Brand Story',
      'story.hero.title': 'Life Itself,<br><span class="gold">in Every Pour</span>',
      'story.hero.desc':  'HORNSPIRIT is more than a spirit. Born where a millennium of Chinese baijiu tradition meets modern Korean sensibility.',
      'story.p1.label':   'Part 01',
      'story.p1.title':   'The Birth of<br>HORNSPIRIT',
      'story.p1.body1':   'Our founders asked: what if a drink could be more than a drink — what if it could hold the depth of a life?',
      'story.p1.body2':   "Korea's Han is a deep, layered emotion. China's Baijiu carries millennia in every sip. HORNSPIRIT was born at the intersection of these two worlds.",
      'story.p1.l1':      'Beyond a beverage — carrying the depth of life (魂)',
      'story.p1.l2':      'Infusing vitality (灵) to awaken the human spirit',
      'story.p1.l3':      'Connecting people through passion (心)',
      'story.p2.label':   'Part 02',
      'story.p2.title':   "The Artisan's Time",
      'story.p2.desc':    'Traditional nong-xiang (浓香型) production. Where nature, time, and the artisan\'s hands meet.',
      'story.s1.name':    'Ingredient Selection',
      'story.s1.desc':    'The finest sorghum and wheat from the Suqian plains are carefully selected.',
      'story.s2.name':    'Qu Cultivation',
      'story.s2.desc':    'Traditional qu (曲) made from centuries-old microbial ecosystems.',
      'story.s3.name':    'Fermentation',
      'story.s3.desc':    'Slow, deep fermentation in underground mud cellars.',
      'story.s4.name':    'Distillation',
      'story.s4.desc':    'Pure base spirit extracted using traditional clay pot distillation.',
      'story.s5.name':    'Long Aging',
      'story.s5.desc':    'Maturing in ceramic jars, deepening with time.',
      'story.s6.name':    'Blending & Bottling',
      'story.s6.desc':    "Final aroma balance crafted by the master blender's hands.",
      'story.p3.label':   'Part 03',
      'story.p3.title':   'Why We Are<br>Chosen',
      'story.p3.desc':    "China's TOP 3 production partner, authentic ingredients, verified quality. Three reasons HORNSPIRIT stands apart.",
      'story.cta.title':  'Experience HORNSPIRIT',
      'story.cta.desc':   'Discover a glass that holds 1,300 years of time.',
      'story.cta.btn1':   'View Products',
      'story.cta.btn2':   'Origin Story →',

      'origin.hero.label': 'Origin Story',
      'origin.hero.title': 'The Sacred Land<br><span class="gold">of Baijiu — Suqian</span>',
      'origin.hero.desc':  'As Islay is the home of whisky, Suqian is the sacred land of baijiu.<br>A 1,300-year brewing tradition on land with 5,000 years of civilization.',
      'origin.h1.label':   'History',
      'origin.h1.title':   '5,000 Years of Land',
      'origin.h1.body':    'Suqian, located in Jiangsu Province, boasts over 5,000 years of civilization and 2,700+ years of city history. Both Yanghe and Shuanggou — with over 1,300 years of brewing history — were born here.',
      'origin.n.label':    "Nature's Secret",
      'origin.n.title':    "Nature's Hidden Secret",
      'origin.n.desc':     "There are natural reasons Suqian became baijiu's sacred land.<br>Water, earth, air, time — a perfect harmony of four natural conditions.",
      'origin.n1.name':    'Water (水)',
      'origin.n1.desc':    'The Huai River and Hongze Lake — pristine waters and wetland ecosystems. Mineral-rich water defines the purity and aroma of baijiu.',
      'origin.n2.name':    'Earth (地)',
      'origin.n2.desc':    'The fertile alluvial plain of the Yellow River. Premier source of sorghum and wheat for baijiu production.',
      'origin.n3.name':    'Air (氣)',
      'origin.n3.desc':    'Warm, humid climate ideal for qu fermentation. Centuries-old microorganisms live and breathe here.',
      'origin.n4.name':    'Time (時)',
      'origin.n4.desc':    "Fermentation secrets passed down through 1,300 years of artisan hands. A taste that only time can create.",
      'origin.i.label':    'Industry Scale',
      'origin.i.title':    'The World-Recognized<br>Capital of Baijiu',
      'origin.i.body':     "Suqian is the hometown of Yanghe, one of China's top 3 baijiu brands, and the heart of the world's recognized baijiu industry.",
      'origin.birth.title':'The Birthplace of 酒之魂',
      'origin.birth.quote':'HORNSPIRIT is born in this storied Suqian distillery.<br>Not merely a spirit — but the soul of baijiu,<br>distilled from Suqian\'s rich earth and artisan time.',
      'origin.birth.body': 'Five thousand years of civilization, 1,300 years of brewing heritage, the finest natural environment. All of this stands before you in one bottle of HORNSPIRIT.',

      'products.hero.label': 'Our Products',
      'products.hero.title': 'Depth · Vitality · Warmth<br><span class="gold">Three Souls</span>',
      'products.hero.desc':  "1,300 years of Suqian tradition in three expressions.<br>Choose the soul that fits your moment.",
      'products.compare.label': 'Comparison',
      'products.compare.title': 'Product Comparison at a Glance',
      'products.tab.grade':    'Grade',
      'products.tab.abv':      'ABV',
      'products.tab.vol':      'Volume',
      'products.tab.price':    'Retail Price',
      'products.tab.keyword':  'Character',
      'products.tab.channel':  'Main Channel',
      'products.soul.label':   'SOUL · Depth',
      'products.soul.title':   'Immortal Essence,<br>Long-Aged Depth',
      'products.soul.quote':   '"Traditional brewing mastery and long aging. A millennium of Suqian time in one bottle."',
      'products.soul.desc':    'Jiuzhihun is the HORNSPIRIT flagship — the Han (恨) sensibility of deep, solitary beauty in its finest expression.',
      'products.soul.channel': 'Hotels · Fine Dining · VIP Gifts',
      'products.soul.aroma':   'Aroma Notes',
      'products.soul.pairing': 'Pairing Suggestions',
      'products.spirit.label': 'SPIRIT · Vitality',
      'products.spirit.title': 'Modern Twist,<br>Vibrant Energy',
      'products.spirit.quote': '"Where modern sensibility meets tradition. The spirit to illuminate your table tonight."',
      'products.spirit.desc':  'Jiuzhiling carries the Heung (興) sensibility — vibrant energy and social joy in a premium expression.',
      'products.spirit.channel': 'Izakaya · Bar · Golf Club',
      'products.heart.label':  'HEART · Warmth',
      'products.heart.title':  'Everyday Warmth,<br>Authentic & Approachable',
      'products.heart.quote':  '"Smooth and warm. The most sincere glass to share with someone special."',
      'products.heart.desc':   'Jiuzhixin carries the Jeong (情) sensibility — warm bonds and everyday warmth in its classic expression.',
      'products.heart.channel': 'Convenience Store · Supermarket · Restaurant',
      'products.cta.buy':      'Purchase Inquiry',
      'products.cta.b2b':      'B2B Supply Inquiry',
      'products.cta.buy2':     'Where to Buy',

      'partners.hero.label': 'B2B Partnership',
      'partners.hero.title': 'Premium Baijiu,<br>For Your<br><span class="gold">Establishment</span>',
      'partners.hero.desc':  'Recruiting partners across golf clubs, hotels, izakaya, and duty-free.<br>Channel-specific supply terms and strategic partnership.',
      'partners.ch.label':   'Channel Lineup',
      'partners.ch.title':   'Supply Lineup by Channel',
      'partners.form.label': 'Apply Now',
      'partners.form.title': 'Partnership Application',
      'partners.form.desc':  'Fill out the form and our team will contact you within 48 hours.',
      'partners.f.company':  'Company Name *',
      'partners.f.name':     'Contact Person *',
      'partners.f.phone':    'Phone *',
      'partners.f.email':    'Email *',
      'partners.f.type':     'Business Type *',
      'partners.f.product':  'Preferred Product Line',
      'partners.f.qty':      'Estimated Monthly Order',
      'partners.f.message':  'Additional Inquiries',
      'partners.f.submit':   'Submit Partnership Inquiry',
      'partners.f.note':     'Our team will contact you within 48 hours of submission.',

      'contact.hero.label': 'Contact Us',
      'contact.hero.title': 'Contact & Purchase',
      'contact.hero.desc':  'Consumer inquiries, purchase locations, and SNS channels.<br>Get in touch with HORNSPIRIT.',
      'contact.form.title': 'Consumer Inquiry',
      'contact.f.name':     'Name *',
      'contact.f.email':    'Email *',
      'contact.f.type':     'Inquiry Type',
      'contact.f.subject':  'Subject *',
      'contact.f.message':  'Message *',
      'contact.f.agree':    'I agree to the collection and use of personal information.',
      'contact.f.submit':   'Send Inquiry',
      'contact.b2b.title':  'Are you a business?',
      'contact.b2b.desc':   'For B2B partnership inquiries, please use the button below.',
      'contact.b2b.btn':    'B2B Partnership Inquiry →',
    },

    /* ════════════════════════════════════════
       中文 (简体)
    ════════════════════════════════════════ */
    zh: {
      'nav.story':    '品牌故事',
      'nav.products': '产品',
      'nav.origin':   '产地故事',
      'nav.partners': 'B2B合作',
      'nav.contact':  '联系我们',
      'nav.cta':      '合作咨询',
      'nav.sub':      '魂斯皮利特 · 酒之魂',

      'age.title':  '您是否已满19周岁？',
      'age.desc':   'HORNSPIRIT涉及酒类产品。<br>需要确认您的法定饮酒年龄。',
      'age.yes':    '是，我已满19岁',
      'age.no':     '否',
      'age.legal':  '未成年人饮酒违法。<br>酒类产品仅向成年人销售。',

      'hero.badge': '🏆 宿迁正宗出品 · 千三百年酿酒圣地',
      'hero.title': '白酒之魂',
      'hero.desc':  '五千年宿迁历史，凝聚于一杯之中',
      'hero.cta1':  '品牌故事',
      'hero.cta2':  '了解产品',
      'hero.t1':    '中国三大白酒产区官方认定',
      'hero.t2':    '洋河酒厂战略合作伙伴',
      'hero.t3':    '韩国正规进口通关完成',

      'phil.label':      '品牌理念',
      'phil.title':      '每一杯，皆是人生',
      'phil.desc':       'HORNSPIRIT 融合中国白酒的千年历史与现代韩国感性。<br>魂 · 灵 · 心 — 三种价值，一杯之中。',
      'phil.1.title':    '灵魂之深',
      'phil.1.desc':     '等待数百年的味道。<br>蕴含孤独与美丽的一杯。',
      'phil.1.emotion':  '恨 · 深沉',
      'phil.2.title':    '活力之灵',
      'phil.2.desc':     '承载今日之欢愉。<br>注入生命活力的美酒。',
      'phil.2.emotion':  '兴 · 活力',
      'phil.3.title':    '温情之心',
      'phil.3.desc':     '连接你与我的酒。<br>真挚热情与人情温暖。',
      'phil.3.emotion':  '情 · 温情',

      'trust.label':  '数字见证',
      'trust.title':  '以数字铸就信赖',
      'trust.1':      '宿迁酿酒历史',
      'trust.2':      '全球白酒品牌<br>价值排名',
      'trust.3':      '宿迁白酒<br>生产基地规模',
      'trust.4':      '宿迁酒业<br>从业人员',
      'trust.5':      '酒之魂正宗<br>浓香型度数',

      'prod.label':          '我们的产品',
      'prod.title':          '选择您的灵魂 — 深邃、活力或温情',
      'prod.soul.copy':      '传统酿造工艺与长期陈酿。一瓶之中，承载宿迁千年时光。',
      'prod.soul.channel':   '高档酒店 · 精致餐厅 · VIP礼品',
      'prod.spirit.copy':    '现代感性与传统工艺的邂逅。今夜，点亮您的餐桌。',
      'prod.spirit.channel': '居酒屋 · 酒吧 · 高尔夫球场',
      'prod.heart.copy':     '柔和温暖。与挚爱之人共享最真诚的一杯。',
      'prod.heart.channel':  '便利店 · 大型超市 · 餐厅',
      'prod.detail':         '查看详情',

      'origin.label':  '产地故事',
      'origin.quote':  '正如艾雷岛是威士忌的圣地，<br><em>宿迁是白酒的圣地。</em>',
      'origin.body':   '中国江苏宿迁。五千年文明之地，传承一千三百年的酿造传统。<br>淮河清泉，洪泽湖丰富微生物——大自然的馈赠。<br>这就是酒之魂。',
      'origin.s1':     '文明历史',
      'origin.s2':     '酿造传统',
      'origin.s3':     '全球白酒地位',
      'origin.cta':    '了解更多产地故事 →',

      'b2b.label':    'B2B合作',
      'b2b.title':    '高端白酒，<br>为您的场所<br>量身定制',
      'b2b.desc':     '诚邀高尔夫球场、酒店、居酒屋、免税店合作伙伴。<br>提供各渠道定制供应条件与战略合作支持。',
      'b2b.ch1':      '高尔夫 · 俱乐部',
      'b2b.ch2':      '酒店 · 精致餐厅',
      'b2b.ch3':      '居酒屋 · 酒吧',
      'b2b.ch4':      '便利店 · 超市',
      'b2b.ch5':      '免税店',
      'b2b.ch6':      'VIP礼品',
      'b2b.box.title':'合作优势',
      'b2b.f1':       '各渠道定制供应条件及专属MD支持',
      'b2b.f2':       '现场品鉴活动及营销内容提供',
      'b2b.f3':       '可小批量订购 · 定期供应体系',
      'b2b.f4':       '洋河酒厂战略合作 — 有保障的品质管控',
      'b2b.f5':       '韩国正规进口通关完成 · 符合食药处标准',
      'b2b.cta':      '立即咨询合作 →',

      'footer.company':  'HORNSPIRIT Korea · 韩国进口法人',
      'footer.prod':     '产品',
      'footer.brand':    '品牌',
      'footer.policy':   '法律条款',
      'footer.privacy':  '隐私政策',
      'footer.terms':    '使用条款',
      'footer.story':    '品牌故事',
      'footer.origin':   '产地故事',
      'footer.partners': '合作伙伴',
      'footer.contact':  '联系我们',
      'footer.warning':  '⚠ 未成年人禁止饮酒 · 孕期饮酒有害胎儿健康',
      'footer.legal':    '酒类产品仅向19岁以上成年人销售 · 严禁酒后驾车',

      'story.hero.label': '品牌故事',
      'story.hero.title': '每一杯，<br><span class="gold">皆是人生</span>',
      'story.hero.desc':  'HORNSPIRIT不仅仅是一款白酒。它诞生于中国千年白酒传统与现代韩国感性的交汇之处。',
      'story.p1.label':   '第一章',
      'story.p1.title':   'HORNSPIRIT<br>的诞生',
      'story.p1.body1':   '我们的创始人曾问道：如果一杯酒能超越饮料本身——它将承载怎样的意义？',
      'story.p1.body2':   '韩国的"恨"是深沉凝练的情感积淀。中国白酒则将数千年历史凝于一口之中。HORNSPIRIT诞生于这两种文化的交汇之处。',
      'story.p1.l1':      '超越饮料——承载生命之深度（魂）',
      'story.p1.l2':      '注入活力（灵），唤醒人类的生命力',
      'story.p1.l3':      '以热情（心）连接人与人',
      'story.p2.label':   '第二章',
      'story.p2.title':   '匠人的时光',
      'story.p2.desc':    '传统浓香型酿造工艺。自然、时间与匠人之手的邂逅。',
      'story.s1.name':    '原料甄选',
      'story.s1.desc':    '严选宿迁平原最优质的高粱和小麦。',
      'story.s2.name':    '制曲',
      'story.s2.desc':    '采用传承数百年微生物生态系统的传统酒曲。',
      'story.s3.name':    '发酵',
      'story.s3.desc':    '在地下泥窖中缓慢发酵，香气与口感逐渐升华。',
      'story.s4.name':    '蒸馏',
      'story.s4.desc':    '采用传统土甑蒸馏工艺，萃取纯净原酒。',
      'story.s5.name':    '长期陈酿',
      'story.s5.desc':    '在陶瓷坛中随岁月沉淀，口感愈发醇厚。',
      'story.s6.name':    '勾调与装瓶',
      'story.s6.desc':    '由首席调酒师亲手完成最终香气平衡。',
      'story.p3.label':   '第三章',
      'story.p3.title':   '我们被选择<br>的理由',
      'story.p3.desc':    '中国TOP3白酒生产合作伙伴、正宗原料、有保障的品质管控——HORNSPIRIT被选择的三大理由。',
      'story.cta.title':  '体验HORNSPIRIT',
      'story.cta.desc':   '探寻承载一千三百年时光的那一杯。',
      'story.cta.btn1':   '查看产品',
      'story.cta.btn2':   '产地故事 →',

      'origin.hero.label': '产地故事',
      'origin.hero.title': '白酒圣地，<br><span class="gold">宿迁</span>',
      'origin.hero.desc':  '正如艾雷岛是威士忌的圣地，宿迁是白酒的圣地。<br>五千年文明之地，传承一千三百年的酿造传统。',
      'origin.h1.label':   '历史',
      'origin.h1.title':   '五千年的土地',
      'origin.h1.body':    '宿迁位于江苏省，拥有超过5000年的文明史和2700余年的建城史。拥有1300余年历史的洋河和双沟两大品牌均诞生于此。',
      'origin.n.label':    '自然之秘',
      'origin.n.title':    '自然造就的秘密',
      'origin.n.desc':     '宿迁成为白酒圣地有其自然原因。<br>水、地、气、时——四大自然条件的完美和谐。',
      'origin.n1.name':    '水',
      'origin.n1.desc':    '淮河与洪泽湖——得天独厚的水质与湿地生态系统。矿物质丰富的江水决定了白酒的纯净度与香气。',
      'origin.n2.name':    '地',
      'origin.n2.desc':    '黄河冲积平原的肥沃土壤。高粱、小麦等白酒原料的顶级产地。',
      'origin.n3.name':    '气',
      'origin.n3.desc':    '温暖湿润的气候，是酒曲发酵的理想自然环境。数百年的微生物在此生息繁衍。',
      'origin.n4.name':    '时',
      'origin.n4.desc':    '一千三百年匠人之手代代相传的发酵秘诀。唯有岁月方能造就的滋味。',
      'origin.i.label':    '产业规模',
      'origin.i.title':    '世界公认的<br>白酒之都',
      'origin.i.body':     '宿迁是中国三大白酒品牌之一洋河的故乡，也是全球公认的白酒产业核心。',
      'origin.birth.title':'酒之魂的诞生地',
      'origin.birth.quote':'HORNSPIRIT诞生于这座宿迁历史悠久的酒厂。<br>不仅仅是一瓶酒——而是宿迁沃土与匠人时光<br>凝聚而成的白酒之魂。',
      'origin.birth.body': '五千年文明的土地，一千三百年酿造的历史，大自然赐予的最佳环境。这一切，都凝聚于一瓶HORNSPIRIT之中，呈现于您面前。',

      'products.hero.label': '我们的产品',
      'products.hero.title': '深邃 · 活力 · 温情<br><span class="gold">三种灵魂</span>',
      'products.hero.desc':  '宿迁一千三百年传统，以三种面貌呈现于您面前。<br>选择属于您此刻的灵魂。',
      'products.compare.label': '产品对比',
      'products.compare.title': '一览产品对比',
      'products.tab.grade':    '等级',
      'products.tab.abv':      '度数',
      'products.tab.vol':      '容量',
      'products.tab.price':    '零售价',
      'products.tab.keyword':  '情感关键词',
      'products.tab.channel':  '主要渠道',
      'products.soul.label':   '魂 · 深邃',
      'products.soul.title':   '不朽之本质，<br>长期陈酿之深度',
      'products.soul.quote':   '"传统酿造工艺与长期陈酿。一瓶之中，承载宿迁千年时光。"',
      'products.soul.desc':    '酒之魂是HORNSPIRIT的旗舰产品。承载"恨"的感性——深沉、孤独之美的极致表达。',
      'products.soul.channel': '高档酒店 · 精致餐厅 · VIP礼品',
      'products.soul.aroma':   '香气描述',
      'products.soul.pairing': '搭配建议',
      'products.spirit.label': '灵 · 活力',
      'products.spirit.title': '现代感性，<br>活力四射',
      'products.spirit.quote': '"现代感性与传统工艺的邂逅。今夜，点亮您的餐桌。"',
      'products.spirit.desc':  '酒之灵承载"兴"的感性——活力与社交愉悦的高端表达。',
      'products.spirit.channel': '居酒屋 · 酒吧 · 高尔夫球场',
      'products.heart.label':  '心 · 温情',
      'products.heart.title':  '日常温情，<br>正宗易饮',
      'products.heart.quote':  '"柔和温暖。与挚爱之人共享最真诚的一杯。"',
      'products.heart.desc':   '酒之心承载"情"的感性——温情羁绊与日常温暖的经典表达。',
      'products.heart.channel': '便利店 · 大型超市 · 餐厅',
      'products.cta.buy':      '购买咨询',
      'products.cta.b2b':      'B2B供货咨询',
      'products.cta.buy2':     '购买渠道',

      'partners.hero.label': 'B2B合作',
      'partners.hero.title': '高端白酒，<br>为您的场所<br><span class="gold">量身定制</span>',
      'partners.hero.desc':  '诚邀高尔夫球场、酒店、居酒屋、免税店合作伙伴。<br>提供各渠道定制供应条件与战略合作支持。',
      'partners.ch.label':   '渠道阵容',
      'partners.ch.title':   '各渠道供货阵容',
      'partners.form.label': '立即申请',
      'partners.form.title': '合作申请',
      'partners.form.desc':  '填写表单后，我们的工作人员将在48小时内与您联系。',
      'partners.f.company':  '公司名称 *',
      'partners.f.name':     '联系人 *',
      'partners.f.phone':    '联系电话 *',
      'partners.f.email':    '电子邮件 *',
      'partners.f.type':     '业务类型 *',
      'partners.f.product':  '希望产品线',
      'partners.f.qty':      '预计月订购量',
      'partners.f.message':  '其他咨询',
      'partners.f.submit':   '提交合作申请',
      'partners.f.note':     '提交后48小时内，工作人员将与您联系。',

      'contact.hero.label': '联系我们',
      'contact.hero.title': '咨询 · 购买指南',
      'contact.hero.desc':  '消费者咨询、购买渠道及社交媒体。<br>与HORNSPIRIT取得联系。',
      'contact.form.title': '消费者咨询',
      'contact.f.name':     '姓名 *',
      'contact.f.email':    '电子邮件 *',
      'contact.f.type':     '咨询类型',
      'contact.f.subject':  '主题 *',
      'contact.f.message':  '内容 *',
      'contact.f.agree':    '我同意收集和使用个人信息。',
      'contact.f.submit':   '发送咨询',
      'contact.b2b.title':  '您是企业客户吗？',
      'contact.b2b.desc':   'B2B合作专项咨询，请使用下方按钮。',
      'contact.b2b.btn':    'B2B合作咨询 →',
    },
  };

  /* ─── 상태 ─── */
  let lang = 'ko';

  /* ─── 번역 적용 ─── */
  function apply() {
    const cur = T[lang] || T.ko;

    // textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = cur[el.dataset.i18n] ?? T.ko[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });

    // innerHTML (줄바꿈·태그 포함)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = cur[el.dataset.i18nHtml] ?? T.ko[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });

    // placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const v = cur[el.dataset.i18nPh] ?? T.ko[el.dataset.i18nPh];
      if (v !== undefined) el.placeholder = v;
    });

    // html[lang]
    document.documentElement.lang = lang;

    // 버튼 active
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang)
    );
  }

  function setLang(l) {
    if (!T[l]) return;
    lang = l;
    localStorage.setItem('hs_lang', l);
    apply();
  }

  /* ─── IP 기반 자동 감지 ─── */
  function fromBrowser() {
    const l = (navigator.language || 'ko').toLowerCase();
    if (l.startsWith('zh')) return 'zh';
    if (l.startsWith('ko')) return 'ko';
    return 'en';
  }

  async function fromIP() {
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 2500);
      const r = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
      const d = await r.json();
      const cc = d.country_code;
      if (cc === 'KR') return 'ko';
      if (['CN','TW','HK','MO','SG'].includes(cc)) return 'zh';
      return 'en';
    } catch { return null; }
  }

  /* ─── 초기화 ─── */
  async function init() {
    // 1. 저장된 언어 우선
    const stored = localStorage.getItem('hs_lang');
    if (stored && T[stored]) {
      lang = stored;
      apply();
      initSwitchers();
      return;
    }

    // 2. 브라우저 언어로 즉시 렌더링
    lang = fromBrowser();
    apply();
    initSwitchers();

    // 3. IP 감지 후 보정
    const ipLang = await fromIP();
    if (ipLang && ipLang !== lang) {
      lang = ipLang;
      localStorage.setItem('hs_lang', lang);
      apply();
    }
  }

  function initSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  return { init, setLang };

})();

document.addEventListener('DOMContentLoaded', HS_I18N.init);
