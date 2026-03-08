// mbti-system.js
// 榮格八維 × 九型人格 全息探索系統核心邏輯
// GitHub: [User's Repo] (To be filled)

document.addEventListener('DOMContentLoaded', () => {
    initSystem();
    loadUserData(); // Auto-load saved data
});

/* =========================================
   Data & Configuration
   ========================================= */
const typeInfo = {
    'ENTP': { avatar: '🃏', name: 'ENTP (發明家)' }, 'INTP': { avatar: '🦉', name: 'INTP (邏輯學家)' },
    'ENTJ': { avatar: '🦁', name: 'ENTJ (陸軍元帥)' }, 'INTJ': { avatar: '♟️', name: 'INTJ (建築師)' },
    'ENFP': { avatar: '🐬', name: 'ENFP (競選者)' }, 'INFP': { avatar: '🦋', name: 'INFP (調停者)' },
    'ENFJ': { avatar: '🦸‍♂️', name: 'ENFJ (主人公)' }, 'INFJ': { avatar: '🦄', name: 'INFJ (提倡者)' },
    'ESTP': { avatar: '🚀', name: 'ESTP (創業者)' }, 'ISTP': { avatar: '🛠️', name: 'ISTP (鑑賞家)' },
    'ESTJ': { avatar: '⚖️', name: 'ESTJ (總經理)' }, 'ISTJ': { avatar: '📋', name: 'ISTJ (物流師)' },
    'ESFP': { avatar: '🎭', name: 'ESFP (表演者)' }, 'ISFP': { avatar: '🎨', name: 'ISFP (探險家)' },
    'ESFJ': { avatar: '🧸', name: 'ESFJ (執政官)' }, 'ISFJ': { avatar: '🛡️', name: 'ISFJ (守衛者)' }
};

const mbtiColors = {
    'ENTP': { name: 'NT 分析家', color: '紫', css: 'bg-purple-100 text-purple-800 border-purple-300' },
    'INTP': { name: 'NT 分析家', color: '紫', css: 'bg-purple-100 text-purple-800 border-purple-300' },
    'ENTJ': { name: 'NT 分析家', color: '紫', css: 'bg-purple-100 text-purple-800 border-purple-300' },
    'INTJ': { name: 'NT 分析家', color: '紫', css: 'bg-purple-100 text-purple-800 border-purple-300' },
    'ENFP': { name: 'NF 外交家', color: '綠', css: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'INFP': { name: 'NF 外交家', color: '綠', css: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'ENFJ': { name: 'NF 外交家', color: '綠', css: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'INFJ': { name: 'NF 外交家', color: '綠', css: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'ESTP': { name: 'SP 探險家', color: '黃', css: 'bg-amber-100 text-amber-800 border-amber-300' },
    'ISTP': { name: 'SP 探險家', color: '黃', css: 'bg-amber-100 text-amber-800 border-amber-300' },
    'ESFP': { name: 'SP 探險家', color: '黃', css: 'bg-amber-100 text-amber-800 border-amber-300' },
    'ISFP': { name: 'SP 探險家', color: '黃', css: 'bg-amber-100 text-amber-800 border-amber-300' },
    'ESTJ': { name: 'SJ 守護者', color: '藍', css: 'bg-blue-100 text-blue-800 border-blue-300' },
    'ISTJ': { name: 'SJ 守護者', color: '藍', css: 'bg-blue-100 text-blue-800 border-blue-300' },
    'ESFJ': { name: 'SJ 守護者', color: '藍', css: 'bg-blue-100 text-blue-800 border-blue-300' },
    'ISFJ': { name: 'SJ 守護者', color: '藍', css: 'bg-blue-100 text-blue-800 border-blue-300' }
};

const mbtiHealth = {
    'ENTP': { high: '極具包容力的創新解局者，能將狂想化為現實，不再為了贏而爭辯', low: '愛詭辯的噴子，為了反對而反對，散漫無紀律，用歪理逃避責任' },
    'INTP': { high: '透徹宇宙真理的智者，能產出跨時代的系統架構，並溫和地分享知識', low: '極度孤僻的社恐，陷入虛無主義，對現實生活毫無掌控力，鄙視凡人' },
    'ENTJ': { high: '具備宏大願景且知人善任的卓越領袖，懂得傾聽與授權', low: '冷血的暴君，只看績效不顧人情，用高壓統治掩飾內心的不安' },
    'INTJ': { high: '深思熟慮的戰略大師，能將偉大洞見完美落地，造福人類', low: '極端傲慢的偏執狂，脫離現實，覺得全世界都是無法理解自己的笨蛋' },
    'ENFP': { high: '充滿感染力的靈感繆斯，能真正啟發並治癒他人，具備極強執行力', low: '情緒化的巨嬰，三分鐘熱度，逃避一切責任與承諾，過度依賴他人' },
    'INFP': { high: '內心強大的靈魂守護者，用藝術與真理為世界帶來光，果斷且勇敢', low: '深陷受害者情結，自怨自艾，用道德綁架身邊的人，與現實完全脫節' },
    'ENFJ': { high: '無私且極具魅力的精神導師，引領群體走向卓越，懂得界線', low: '虛榮的控制狂，用情緒勒索來操控他人，極度害怕被討厭而失去自我' },
    'INFJ': { high: '看透人心且具備神聖使命感的引路人，能在理想與現實中取得平衡', low: '切斷與世界的聯繫，陷入「只有我最特別、最懂」的孤獨妄想與神經質' },
    'ESTP': { high: '勇敢果決的實干家，在危機中最可靠的破局者，具備長遠眼光', low: '盲目追求刺激的賭徒，不計後果，毫無底線，用物質麻痺空虛' },
    'ISTP': { high: '冷靜精確的工匠大師，能在混亂中理出頭緒，並願意教導他人', low: '極度冷漠、自私，完全無視他人的感受與社會規範，充滿攻擊性' },
    'ESTJ': { high: '公正無私的社會支柱，建立高效且造福眾人的秩序，懂得體恤下屬', low: '僵化死板的微觀管理者，強迫所有人遵守他的規矩，聽不進任何變革' },
    'ISTJ': { high: '一絲不苟、值得信賴的基石，具備極高的專業度，對新事物保持開放', low: '頑固不化的守舊派，極度害怕改變，對任何未知的風險充滿敵意' },
    'ESFP': { high: '熱愛生命、充滿感染力的快樂泉源，能帶給周遭人實質的溫暖與幫助', low: '極度膚淺的享樂主義者，無法忍受一絲無聊，逃避任何深刻的思考與承諾' },
    'ISFP': { high: '敏銳且溫柔的藝術家，活出最純粹真實的自我，並具備強大行動力', low: '極端敏感、玻璃心，只要受到一點批評就全面崩潰退縮，沈溺在憂鬱中' },
    'ESFJ': { high: '溫暖無私的照顧者，能凝聚團隊並帶來深刻的歸屬感，懂得愛自己', low: '八卦且愛操控的小圈圈領袖，用「我是為你好」來情勒別人，極度虛榮' },
    'ISFJ': { high: '默默付出、堅定溫柔的保護者，是所有人的避風港，且能勇敢表達需求', low: '充滿怨氣的殉道者，一邊委屈付出卻又一邊用翻舊帳來折磨親近的人' }
};

const fourSidesDesc = {
    Ego: { title: '1. 顯意識 (Ego)', tag: '顯意識 ( 英雄/面具)', color: 'text-indigo-300', icon: '🎭', text: '你的日常生活狀態，也是你感知與應對世界的預設模式。這個面具是最讓你感到安全、自信且習慣的地方。' },
    Subconscious: { title: '2. 潛意識 (Subconscious)', tag: '潛意識 ( 渴望/赤子)', color: 'text-emerald-300', icon: '👶', text: '四個字母完全相反。這是你內心渴望擁有、但平時可能笨拙的「快樂源泉」。當你不帶恐懼時，你會自然變成這個樣子，帶來純真的幸福感。' },
    Unconscious: { title: '3. 無意識 (Unconscious)', tag: '無意識 ( 陰影/導師)', color: 'text-amber-300', icon: '🎓', text: 'E/I、J/P 相反。這是一體兩面的背影。當你面臨壓力或需解決複雜問題時，你會被迫召喚這個成熟卻痛苦的陰影，它是你通往個體化智慧的必經之路。' },
    Superego: { title: '4. 超我 (Superego)', tag: '超我 ( 神明/毀滅)', color: 'text-rose-400', icon: '🔥', text: 'N/S、T/F 相反。這是與你完全陌生的異次元生物。平時這是你的「垃圾桶」，但當你人生遭遇極致毀滅時，若能將其整合，你將獲得如神一般的無畏與完整。' }
};

const functionsStack = {
    'ENTP': ['Ne', 'Ti', 'Fe', 'Si'], 'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
    'ENTJ': ['Te', 'Ni', 'Se', 'Fi'], 'INTJ': ['Ni', 'Te', 'Fi', 'Se'],
    'ENFP': ['Ne', 'Fi', 'Te', 'Si'], 'INFP': ['Fi', 'Ne', 'Si', 'Te'],
    'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'], 'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
    'ESTP': ['Se', 'Ti', 'Fe', 'Ni'], 'ISTP': ['Ti', 'Se', 'Ni', 'Fe'],
    'ESTJ': ['Te', 'Si', 'Ne', 'Fi'], 'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],
    'ESFP': ['Se', 'Fi', 'Te', 'Ni'], 'ISFP': ['Fi', 'Se', 'Ni', 'Te'],
    'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'], 'ISFJ': ['Si', 'Fe', 'Ti', 'Ne']
};

const funcNames = { 'Ne': '外傾直覺', 'Ni': '內傾直覺', 'Se': '外傾感覺', 'Si': '內傾感覺', 'Te': '外傾思維', 'Ti': '內傾思維', 'Fe': '外傾情感', 'Fi': '內傾情感' };

const deepFuncDesc = {
    'Ne': '【外傾直覺 (Ne)：探索可能性的雷達】<br>你的大腦是一台全天候運作的多維度雷達，不斷掃描外部世界的「可能性」與「潛在關聯」。你不滿足於表面的現狀，總是在問「如果...會怎樣？」(What if?)。這賦予了你強大的發散性思維、跳躍式聯想力與跨領域的創新天賦。你擅長從單調的現實中看見無數種未來的，但也可能因為想法太多而難以聚焦。',
    'Ni': '【內傾直覺 (Ni)：洞察本質的先知】<br>你的大腦像是一座深不可測的煉金術工坊。它會自動將龐雜的外部資訊吸入潛意識，經過長時間的提煉與收斂，最後在某個瞬間突然湧現出一個「終極真相」或「核心趨勢」(Aha! moments)。這賦予了你驚人的前瞻性、戰略眼光與看透事物本質的能力。你追求的是唯一的、必然的未來，而非多種可能。',
    'Se': '【外傾感覺 (Se)：極致體驗的戰士】<br>你的意識與當下的物理世界有著最高解析度的連結。你具備極強的臨場反應、敏銳的五感體驗與即興操作能力。你討厭空談理論，傾向於直接動手去觸摸、去操作、去征服。這讓你成為危機時刻最可靠的行動者，但也可能讓你過度追求感官刺激而忽視長期後果。',
    'Si': '【內傾感覺 (Si)：守護傳承的基石】<br>你的大腦是一個龐大且精密的個人經驗資料庫。你傾向於將當下的體驗與過去的記憶進行精確比對，從中建立起穩定、可靠的規律與標準作業程序 (SOP)。這賦予了你極高的耐心、對細節的極致掌控力與守護秩序的能力。你是讓社會與組織穩定運作的基石，但也可能因為過度依賴過去而抗拒改變。',
    'Te': '【外傾思維 (Te)：高效執行的統帥】<br>你的大腦是講求客觀效率與結果的執行引擎。你擅長將混亂的外部環境系統化，制定規則、優化流程、分配資源並強勢推動目標落地。對你來說，「管用」比「正確」更重要，實用性與可衡量的績效 (KPI) 勝過一切主觀感受。這讓你成為天生的管理者，但也可能顯得冷酷無情。',
    'Ti': '【內傾思維 (Ti)：解構真理的邏輯學家】<br>你致力於在內心建構一個完美、無懈可擊的邏輯框架。你追求「為什麼會這樣」的底層原理，喜歡精準定義概念、拆解複雜系統。你不在乎外界的權威或效率，只在乎邏輯是否自洽。這帶來了極度冷靜、客觀且獨立的批判性思考能力，但也可能讓你陷入鑽牛角尖的理論迷宮。',
    'Fe': '【外傾情感 (Fe)：凝聚人心的外交家】<br>你的大腦對外部世界的情緒氛圍、人際動態與群體價值觀有著雷達般的敏銳度。你渴望建立和諧的人際關係，擅長共情、安撫他人，並願意為了群體的福祉而調整自己的行為與表達方式。你是團隊的黏著劑，但也可能因為過度迎合他人而失去了真實的自我界線。',
    'Fi': '【內傾情感 (Fi)：守護靈魂的騎士】<br>你的內心擁有一座深邃、豐富且極具個人色彩的情感宇宙。你極度重視個人的核心價值、真實感受與信仰 (Authenticity)。你不輕易妥協於外界的壓力，擁有一套不容侵犯的道德底線。這賦予了你強大的感染力與對人性的深層同理，但也可能讓你顯得情緒化或過度自我中心。'
};

const funcKeywords = {
    'Ne': '發散聯想 • 頭腦風暴 • 未來可能 • 打破框架 • 多線並行',
    'Ni': '收斂洞察 • 終極預測 • 潛意識直覺 • 戰略佈局 • 看透本質',
    'Se': '活在當下 • 五感體驗 • 臨場反應 • 現實感知 • 極限操作',
    'Si': '經驗記憶 • 傳統守護 • 細節比對 • 穩定規律 • 身體感知',
    'Te': '客觀效率 • 資源調度 • 系統建構 • 執行落地 • KPI 導向',
    'Ti': '內部邏輯 • 定義精準 • 底層架構 • 原理拆解 • 獨立思考',
    'Fe': '群體和諧 • 情緒共鳴 • 社會規範 • 人際潤滑 • 察言觀色',
    'Fi': '核心價值 • 個人信仰 • 道德底線 • 真實自我 • 深層共情'
};

const relationsDB = {
    'ENTP': { dual: 'INFJ', mirror: 'INTP', conflict: 'ISFP' }, 'INTP': { dual: 'ENFJ', mirror: 'ENTP', conflict: 'ESFP' },
    'ENTJ': { dual: 'INFP', mirror: 'INTJ', conflict: 'ISFJ' }, 'INTJ': { dual: 'ENFP', mirror: 'ENTJ', conflict: 'ESFJ' },
    'ENFP': { dual: 'INTJ', mirror: 'INFP', conflict: 'ISTP' }, 'INFP': { dual: 'ENTJ', mirror: 'ENFP', conflict: 'ESTP' },
    'ENFJ': { dual: 'INTP', mirror: 'INFJ', conflict: 'ISTJ' }, 'INFJ': { dual: 'ENTP', mirror: 'ENFJ', conflict: 'ESTJ' },
    'ESTP': { dual: 'ISFJ', mirror: 'ISTP', conflict: 'INFP' }, 'ISTP': { dual: 'ESFJ', mirror: 'ESTP', conflict: 'ENFP' },
    'ESTJ': { dual: 'ISFP', mirror: 'ISTJ', conflict: 'INFJ' }, 'ISTJ': { dual: 'ESFP', mirror: 'ESTJ', conflict: 'ENFJ' },
    'ESFP': { dual: 'ISTJ', mirror: 'ISFP', conflict: 'INTP' }, 'ISFP': { dual: 'ESTJ', mirror: 'ESFP', conflict: 'ENTP' },
    'ESFJ': { dual: 'ISTP', mirror: 'ISFJ', conflict: 'INTJ' }, 'ISFJ': { dual: 'ESTP', mirror: 'ESFJ', conflict: 'ENTJ' }
};

const axesDesc = {
    'Ne-Si': '發散可能 / 收斂經驗。你擅長在過去的安全與經驗基礎上，向外發想無數的新可能性。',
    'Ni-Se': '收斂洞察 / 發散體驗。你擅長在混亂且豐富的現實體驗中，提煉出唯一的終極真相與未來走向。',
    'Te-Fi': '客觀效率 / 個人信念。你以外部的標準與成就來推動進度，核心動力始由深層個人道德驅動。',
    'Ti-Fe': '客觀真理 / 群體和諧。你追求絕對純粹的內部邏輯架構，並用溫和方式來維持外界人際。'
};

const stressDB = {
    'ENTP': { loop: '【Ne-Fe 迴圈】過度渴望外界認同。你會不停地拋出新點子來博取關注，卻完全忽略邏輯檢驗。你變得極度在意別人的反應，甚至為了討好群眾而犧牲真理，結果變成一個滑稽且空洞的表演者。', grip: '【Si 劫持】被微小的細節逼瘋。平時最討厭SOP的你，突然變得對身體健康極度焦慮。你會死守著某些奇怪的規矩，對過去的一個小錯誤耿耿於懷，覺得自己得了絕症或人生毀了。' },
    'INTP': { loop: '【Ti-Si 迴圈】困在過去的資料庫中。你會不斷地回想過去的失敗經驗，用邏輯證明自己「未來也一定會失敗」。你拒絕嘗試新方法，變得極度封閉、憤世嫉俗，活在自己的邏輯死胡同裡。', grip: '【Fe 劫持】情緒像火山爆發。平時冷靜的你，突然變得極度敏感、易怒，覺得全世界都在針對你。你會像個長不大的孩子一樣哭鬧，渴望別人的關愛卻又用攻擊性的語言推開大家。' },
    'ENTJ': { loop: '【Te-Se 迴圈】暴走的工作狂。你為了追求短期的快感與績效，完全無視長期後果。你會變得極度衝動、揮霍無度，或者用高壓統治來掩飾內心的焦慮，聽不進任何人的建議，像一台失控的推土機。', grip: '【Fi 劫持】深陷自我懷疑的泥沼。平時自信爆棚的你，突然覺得自己是個徹頭徹尾的失敗者，沒人愛、沒價值。你會在深夜裡獨自流淚，覺得所有的成就都毫無意義，被巨大的空虛感吞噬。' },
    'INTJ': { loop: '【Ni-Fi 迴圈】偏執的受害者。你會陷入一種「全世界都無法理解我」的自戀與自憐中。你會將自己的主觀感受當作絕對真理，覺得別人都很庸俗、邪惡。你切斷與外界的聯繫，活在一個充滿陰謀論的封閉宇宙。', grip: '【Se 劫持】感官毀滅的放縱。平時極度自律的你，突然開始暴飲暴食、酗酒、沉迷色情或瘋狂購物。你會試圖用強烈的物理刺激來麻痺大腦，完全放棄對未來的思考，只想毀掉當下。' },
    'ENFP': { loop: '【Ne-Te 迴圈】專斷獨行的暴君。為了快速達成目標，你失去了原本的溫柔與彈性。你變得極度沒耐心、講話尖酸刻薄，強迫別人照你的意思做。你誤以為這叫「效率」，其實只是在發洩焦慮。', grip: '【Si 劫持】被過去的幽靈纏身。你突然變得極度保守、畏縮，對身體的一點小病痛感到恐慌。你會不斷反芻過去的尷尬回憶，覺得自己這輩子都不會再好起來了，完全失去了對未來的希望。' },
    'INFP': { loop: '【Fi-Si 迴圈】過去創傷的囚徒。你會把過去所有的委屈與失敗拿出來反覆回味，覺得自己是世界上最悲慘的人。你拒絕接受新的可能性，把自己鎖在房間裡，對抗外界任何試圖幫助你的力量。', grip: '【Te 劫持】冷酷的邏輯審判者。平時溫和的你，突然變得很兇、很愛指揮別人。你會用最苛刻的標準去挑剔別人的錯誤，講話變得極度具攻擊性與邏輯性（雖然往往是歪理），以此來保護受傷的內心。' },
    'ENFJ': { loop: '【Fe-Se 迴圈】膚淺的社交花蝴蝶。你為了維持受歡迎的形象，不斷地迎合當下的流行或別人的喜好。你失去了深度的思考，變得極度在乎外表與物質享受，卻感到內心越來越空虛。', grip: '【Ti 劫持】冷漠的虛無主義者。你突然覺得人性很醜陋，覺得自己之前的付出都是傻瓜。你會用冷酷的邏輯去分析人際關係，得出「沒人值得信任」的結論，然後徹底封閉自己，與世界隔絕。' },
    'INFJ': { loop: '【Ni-Ti 迴圈】鑽牛角尖的隱士。你會切斷所有情感連結，躲在腦子裡建構一套完美的理論來解釋世界（通常是很灰暗的）。你拒絕現實檢驗，覺得只有自己掌握了真理，別人都是愚蠢的凡人。', grip: '【Se 劫持】毀滅性的衝動。平時謹慎的你，突然會做出極度危險的事（如飆車、一夜情、衝動離職）。你會渴望破壞一切現狀，享受那種毀滅帶來的短暫快感，完全不計後果。' },
    'ESTP': { loop: '【Se-Fe 迴圈】譁眾取寵的小丑。你為了博取關注，會做出越來越誇張、危險的舉動。你極度依賴別人的掌聲來定義自己，若被忽視就會感到憤怒。你失去了邏輯判斷，隨波逐流。', grip: '【Ni 劫持】末日預言家。平時天不怕地不怕的你，突然對未來產生極度恐慌。你會覺得有人在背後害你，或者覺得世界末日要來了。你會把一個小徵兆解讀為巨大的災難，完全失去了理智。' },
    'ISTP': { loop: '【Ti-Ni 迴圈】陰謀論的偏執狂。你覺得自己看透了世界的運作（通常是負面的），並拒絕接受任何反面證據。你變得極度多疑，覺得所有人都在騙你，把自己封閉在狹隘的邏輯孤島中。', grip: '【Fe 劫持】情緒崩潰的嬰兒。平時酷酷的你，突然會因為一點小事而情緒大爆發，大哭大鬧或者對人發火。你會覺得沒人愛你、沒人懂你，用最笨拙的方式去討拍，讓大家都嚇壞了。' },
    'ESTJ': { loop: '【Te-Ne 迴圈】無法聚焦的瞎忙族。你試圖同時控制所有變數，想出無數個「可能出錯」的劇本，然後制定無數個計畫去防堵。你變得神經質、急躁，把團隊搞得人仰馬翻，卻沒有任何實質產出。', grip: '【Fi 劫持】受傷的孤獨老人。你突然覺得自己這麼努力都是為了什麼？覺得沒人哪怕感謝你一句。你會陷入深度的情感憂鬱，覺得自己是受害者，沉浸在自憐中無法自拔。' },
    'ISTJ': { loop: '【Si-Fi 迴圈】懷舊的怨婦/怨夫。你會不斷抱怨「今不如昔」，覺得現在的變化都是再變壞。你會過度執著於過去的某個情感細節，覺得自己被辜負了，並拒絕任何修復關係的嘗試。', grip: '【Ne 劫持】災難想像的受害者。平時穩重的你，突然覺得天要塌了。你會把一個小小的未知數想像成巨大的災難（如：他沒接電話=他出車禍了）。你會變得極度神經質，到處散播恐慌。' },
    'ESFP': { loop: '【Se-Te 迴圈】強勢的控制狂。你為了維持你的享樂生活，開始強迫別人配合你的步調。你變得急躁、霸道，聽不進別人的感受，只想著如何用最快的方法得到你要的快樂。', grip: '【Ni 劫持】黑暗的宿命論者。你突然覺得人生毫無意義，覺得未來一片黑暗。你會對某些神祕學或宿命論產生奇怪的執著，覺得自己注定失敗，完全失去了原本的活力。' },
    'ISFP': { loop: '【Fi-Ni 迴圈】自命不凡的孤獨者。你覺得自己是唯一清醒的人，別人都不懂藝術、不懂生活。你活在自己的幻想世界裡，拒絕與現實接軌，變得極度難搞與傲慢。', grip: '【Te 劫持】尖酸刻薄的批評家。平時隨和的你，突然開始攻擊別人的辦事效率與智商。你會用最無情的標準去批判周圍的人，變得極度獨裁與不講理，只為了掩飾內心的慌張。' },
    'ESFJ': { loop: '【Fe-Ne 迴圈】焦慮的八卦王。你腦中充滿了各種「大家可能會討厭我」的幻想。你會不斷地去打聽消息、討好別人，結果反而變得虛偽且令人厭煩。原本的關心變成了情緒勒索。', grip: '【Ti 劫持】殘酷的切割者。你突然覺得這些人際關係都是虛假的，覺得被利用了。你會用冷酷的邏輯去計算彼此的付出，得出「不划算」的結論，然後無情地把親近的人踢出你的生活。' },
    'ISFJ': { loop: '【Si-Ti 迴圈】僵化的邏輯潔癖。你會死守著一套過去的操作手冊，並用邏輯證明「為什麼不能改」。你變得極度固執、挑剔，對於任何創新都嗤之以鼻，覺得那是違反邏輯的。', grip: '【Ne 劫持】失控的焦慮製造機。平時溫和的你，突然對未來充滿了恐懼。你會想像出無數種可怕的後果，並覺得自己無力阻止。你會變得語無倫次，到處尋求保證卻又聽不進安慰。' }
};

const adviceGuides = {
    Inferior: {
        'Se': '<strong>【克服 Se 恐懼：找回身體的錨】</strong><br>你的大腦傾向於活在未來或抽象世界，這讓你對「當下」的不可控感到極度焦慮。你可能會因為害怕發生意外而不敢行動，或者反過來在壓力下過度放縱感官（暴飲暴食）。<br>🚀 <strong>進化策略：</strong> 不要逼自己變成運動健將。試著每天花 5 分鐘專注在一個簡單的感官體驗上，像是仔細品嚐一杯咖啡、感受腳踩在地上的觸感。讓「現實」成為你的盟友，而不是敵人。',
        'Si': '<strong>【克服 Si 恐懼：與過去和解】</strong><br>你總是看向前方，新奇的事物吸引著你，但這也意味著你潛意識裡極度抗拒重複、細節與身體的內部訊號。你可能經常忘記吃飯、忽視健康，直到身體強迫你停下來。<br>🚀 <strong>進化策略：</strong> 建立一個「極簡」的規律習慣，比如每天同一時間起床。把這看作是節省大腦能量的手段，讓你更能專注去探索未知。學會尊重身體的極限，它是你探索世界的載體。',
        'Ne': '<strong>【克服 Ne 恐懼：擁抱未知的驚喜】</strong><br>你習慣依賴可靠的經驗與穩定的規律，對於突如其來的變數或「如果」感到恐慌。這可能讓你變得過度保守，錯失了許多人生風景。<br>🚀 <strong>進化策略：</strong> 試著每週做一件「小小的冒險」，例如走一條沒走過的路回家、點一道沒吃過的菜。告訴自己：「最糟的情況也不過如此。」你會發現，未知並沒有想像中那麼可怕，甚至充滿樂趣。',
        'Ni': '<strong>【克服 Ni 恐懼：相信直覺的指引】</strong><br>你活生生的體驗與當下，但這讓你很難靜下來去聽那些「沒有根據」的直覺。你可能過度依賴眼見為憑的數據，而忽視了事情發展的長遠趨勢。<br>🚀 <strong>進化策略：</strong> 當你有一個「模糊的感覺」時，別急著否定它。把它寫下來，過一段時間再回來看是否應驗。練習每天花點時間獨處冥想，讓大腦從吵雜的外部世界抽離，讓潛意識的聲音浮現。',
        'Te': '<strong>【克服 Te 恐懼：展現真實的權威】</strong><br>你溫暖、包容，但也因此害怕衝突與展現強勢。你可能為了維持關係而不敢說出真話，或者對於「結構化」、「講求績效」感到壓力山大，覺得那很沒有人情味。<br>🚀 <strong>進化策略：</strong> 把「效率」與「規則」看作是保護大家的工具，而不是壓迫的手段。試著在小事情上練習果斷下指令。你要明白，有時候明確的界線與高效的決策，才是對群體最大的慈悲。',
        'Ti': '<strong>【克服 Ti 恐懼：建立獨立思考】</strong><br>你非常在乎人際和諧與別人的看法，這讓你常常忽略了事情本身的邏輯對錯。你可能害怕因堅持真理而破壞關係，導致你隨波逐流。<br>🚀 <strong>進化策略：</strong> 在做決定前，試著先抽離情感，問自己：「這件事在邏輯上合理嗎？」。練習區分「觀點」與「人」。你有權利擁有獨立的思考，這不代表你不愛大家。真理與愛是可以並存的。',
        'Fe': '<strong>【克服 Fe 恐懼：卸下社交的防備】</strong><br>你擁有豐富的內在情感或縝密的邏輯，但對於「社交氛圍」感到棘手。你可能覺得客套話很虛偽，或者害怕自己在人群中表現得像個外星人。<br>🚀 <strong>進化策略：</strong> 嘗試單純為了「讓別人開心」而做一個小小的舉動，不求回報，也不用想太多。社交不一定要虛偽，它可以是一種善意的傳遞。觀察別人笑的時候，試著去感受那份情緒的流動。',
        'Fi': '<strong>【克服 Fi 恐懼：直面靈魂的底線】</strong><br>你擅長解決外部問題，效率極高，但往往忽略了內心深處的真實感受。你可能覺得情緒是沒產值的雜訊，直到你在某個深夜感到莫名的空虛。<br>🚀 <strong>進化策略：</strong> 停止用忙碌來逃避感受。每天問自己：「我現在感覺如何？這是我真心想要的嗎？」。為自己設立幾條絕對不容妥協的道德底線，那是你生而為人的尊嚴，不是阻礙效率的絆腳石。'
    },
    Trickster: {
        'Se': '<strong>【警惕 Se 小丑】</strong><br>你可能會突然產生一種莫名的自信，覺得自己可以像動作巨星一樣臨場反應，結果往往是笨手笨腳、搞砸現場。或者透過強迫性的物理體驗（如暴飲暴食、瘋狂購物）來紓壓，卻毫無真正的享受感。<br>⚠️ <strong>解法：</strong> 承認自己在物理世界的操作上比較遲鈍。重要場合請依賴事前準備，別迷信臨場發揮。',
        'Si': '<strong>【警惕 Si 小丑】</strong><br>你的記憶會騙人。你可能信誓旦旦地說「我記得就是這樣」，但事實完全相反。你會極度抗拒細節檢查，覺得那是浪費時間，結果往往在小數點上翻船。<br>⚠️ <strong>解法：</strong> 永遠不要相信你的腦袋。把所有細節記在筆記軟體裡。檢查兩次，或者找個細心的夥伴幫你。',
        'Ne': '<strong>【警惕 Ne 小丑】</strong><br>你會突然陷入奇怪的猜測，覺得別人「話中有話」，或者對未來產生毫無根據的悲觀/樂觀預期。你以為你在洞察，其實只是在胡思亂想的投射。<br>⚠️ <strong>解法：</strong> 當你覺得「這件事一定是怎樣」時，強迫自己找出三個反例。去找個 Ne 強勢的朋友聊聊，打破你的思維迴圈。',
        'Ni': '<strong>【警惕 Ni 小丑】</strong><br>你會嘲笑那些談論「願景」與「意義」的人，覺得他們在鬼扯。但有時候你又會突然深信某個毫無邏輯的陰謀論，變得極度固執且不可理喻。<br>⚠️ <strong>解法：</strong> 保持開放。當你看不懂某個趨勢時，別急著否定。多參考歷史數據與客觀分析，別讓主觀的一時直覺帶著跑。',
        'Te': '<strong>【警惕 Te 小丑】</strong><br>你可能會試圖表現得很強勢、有組織，制定各種計畫，但執行起來卻是一團亂。你可能會過度糾結於無意義的流程，卻忽略了真正的目標。<br>⚠️ <strong>解法：</strong> 承認自己不是天生的指揮官。尋求專業的專案管理工具協助，或者讓擅長 Te 的人來主導流程，你專注於內容本身。',
        'Ti': '<strong>【警惕 Ti 小丑】</strong><br>你可能會用一堆歪理來為自己的錯誤辯護，邏輯雖然自洽但完全脫離現實。你會在無關緊要定義上鑽牛角尖，卻對明顯的邏輯漏洞視而不見。<br>⚠️ <strong>解法：</strong> 別為了贏而爭辯。當別人指出你的邏輯錯誤時，深呼吸，先別急著反擊。試著用「解決問題」而非「證明我對」的角度思考。',
        'Fe': '<strong>【警惕 Fe 小丑】</strong><br>你可能完全讀不懂空氣，講出讓全場尷尬的話還不自知。或者反過來，你這時候會變得極度敏感，覺得大家都在嘲笑你，把普通的眼神解讀為敵意。<br>⚠️ <strong>解法：</strong> 多觀察，少臆測。在做涉及他人的決定前，直接開口問：「這樣做你們覺得如何？」。真誠的詢問比拙劣的猜測好一萬倍。',
        'Fi': '<strong>【警惕 Fi 小丑】</strong><br>你可能會把別人的批評都當作是對你人格的攻擊。你會變得莫名情緒化，覺得全世界都對不起你，但又說不出具體哪個價值觀受傷了。<br>⚠️ <strong>解法：</strong> 當情緒上來時，先暫停。寫下你的感受。你會發現很多時候那是自尊心作祟，而非真正的價值觀衝突。學會與自己的脆弱共處。'
    },
    Demon: {
        'Se': '<strong>【馴服 Se 惡魔】</strong><br>在極度崩潰時，你會想要摧毀眼前的一切物理存在。摔東西、飆車、或者徹底放棄對現實的感知，活在虛無中。這是一股毀滅性的力量。<br>🔥 <strong>轉化：</strong> 當你感到這股衝動時，去運動。去跑、去打拳、去流汗。把這股破壞力轉化為對身體極限的突破。在絕境中，你那「豁出去」的勇氣是最後的翻盤希望。',
        'Si': '<strong>【馴服 Si 惡魔】</strong><br>你會陷入對過去的無限悔恨與翻舊帳中。你會記住每一個曾經傷害過你的人與細節，並用這些回憶來折磨自己與他人，變得極度惡毒與記仇。<br>🔥 <strong>轉化：</strong> 學會原諒過去的一種方式，是承認它們是讓你變得更強大的養分。把這股對細節的執著，用在建立一個能夠守護你與所愛之人的堅固堡壘（如財務規劃、健康管理）。',
        'Ne': '<strong>【馴服 Ne 惡魔】</strong><br>你會看到一萬種未來的災難場景。你會覺得人生毫無希望，所有路都被堵死了。你會散播恐慌，讓周圍的人也陷入絕望的瘋狂中。<br>🔥 <strong>轉化：</strong> 既然能看到最糟的未來，那就去找出那個「起死回生」的唯一劇本。你的惡魔能看見所有人忽視的盲點。把這種瘋狂的想像力用在「破壞式創新」，徹底顛覆規則。',
        'Ni': '<strong>【馴服 Ni 惡魔】</strong><br>你會產生極度黑暗的偏執，覺得全世界都在算計你，或者深信一個毀滅性的命運。你會切斷所有連結，成為一個孤獨的預言家，等待末日降臨。<br>🔥 <strong>轉化：</strong> 這種洞察力雖然黑暗，但往往直指核心。試著把它用來「避險」。你能看見系統最深層的腐敗與風險，你是那個能在鐵達尼號撞冰山前發出警告的人。',
        'Te': '<strong>【馴服 Te 惡魔】</strong><br>你會變成一個冷血殘酷的暴君。為了達成目的，不惜犧牲任何人。你會用最無情的手段去輾壓阻礙者，只為了證明你是對的，不僅要贏，還要贏得徹底。<br>🔥 <strong>轉化：</strong> 當世界一片混亂、無人能負責時，這股力量能讓你成為最後的支柱。用這股霸氣去推翻那些腐敗且無效的舊體制。在最危急的時刻，你需要這份冷酷來力挽狂瀾。',
        'Ti': '<strong>【馴服 Ti 惡魔】</strong><br>你會用最尖銳、最冷漠的邏輯去解構別人的信仰與價值。你會精確地找出別人最痛的弱點進行打擊，把一切情感都貶低為無意義的化學反應。<br>🔥 <strong>轉化：</strong> 這是一把手術刀。不要用它來殺人，用它來切除思想的毒瘤。用你的邏輯去對抗那些虛偽的權威與誤導大眾的謊言。你是真理最後的守衛者。',
        'Fe': '<strong>【馴服 Fe 惡魔】</strong><br>你會操控人心，煽動群眾的情緒來達成你的報復。你會由愛生恨，創造出一種讓大家都感到愧疚與痛苦的氛圍，享受那種扭曲的情感連結。<br>🔥 <strong>轉化：</strong> 你擁有撼動靈魂的力量。別用它來毀滅，用它來喚醒。歷史上許多偉大的變革者都擁有這股力量。你可以成為精神領袖，將人們的痛苦轉化為改變世界的動力。',
        'Fi': '<strong>【馴服 Fi 惡魔】</strong><br>你會覺得自己是世界上最悲慘的受害者，並要求全世界為你的痛苦買單。你會進行道德綁架，或者玉石俱焚，為了維護你所謂的「正義」拉所有人陪葬。<br>🔥 <strong>轉化：</strong> 這是一股神聖的憤怒。當弱者被欺凌、當正義被踐踏時，只有你敢站出來對抗全世界。把這股寧為玉碎的烈火，用來保護那些無法發聲的人。'
    }
};

const enneaDB = {
    '1': { name: '改革者', sin: '憤怒', fear: '腐敗、邪惡、有缺陷', desire: '善良、正直、平衡', defense: '反向形成 (Reaction Formation)', center: '本能中心/腹 (Gut)', growth: '7', growthDesc: '放下嚴格的批判，變得更放鬆、隨性、充滿快樂', stress: '4', stressDesc: '陷入自我懷疑，覺得自己不被理解，變得憂鬱與嫉妒', vibe: '更加自律、完美主義、帶有極強的道德責任感' },
    '2': { name: '助人者', sin: '驕傲', fear: '不被愛、不被需要', desire: '感受到被愛、被需要', defense: '壓抑 (Repression)', center: '情感中心/心 (Heart)', growth: '4', growthDesc: '學會照顧自己的需求，探索內在深層的情感', stress: '8', stressDesc: '覺得付出沒回報而變得極度具攻擊性與控制慾', vibe: '更加熱情、渴望被需要，帶有高 Fe 的溫暖特質' },
    '3': { name: '成就者', sin: '虛榮', fear: '毫無價值、失敗', desire: '感覺有價值、被認可', defense: '認同/偽裝 (Identification)', center: '情感中心/心 (Heart)', growth: '6', growthDesc: '放下個人光環，變得更忠誠、願意為團隊合作', stress: '9', stressDesc: '面臨失敗時會變得麻木、逃避現實、放棄努力', vibe: '極度目標導向、重視形象與效率，像個無情的工作狂' },
    '4': { name: '藝術型', sin: '嫉妒', fear: '平庸無奇、沒有自我', desire: '找到自我定位與獨特性', defense: '內投作用 (Introjection)', center: '情感中心/心 (Heart)', growth: '1', growthDesc: '變得有紀律、客觀，將藝術靈感落實為具體行動', stress: '2', stressDesc: '過度依賴他人，為了獲得關注而過度付出', vibe: '更加憂鬱、追求獨特與美感，帶有高 Fi 的浪漫與敏感' },
    '5': { name: '觀察者', sin: '貪婪', fear: '無知、無能、被吞噬', desire: '具備能力與知識', defense: '隔離 (Isolation)', center: '思維中心/腦 (Head)', growth: '8', growthDesc: '走出大腦，變得果斷、自信，將知識轉化為力量', stress: '7', stressDesc: '變得散漫、無法專注，瘋狂尋求無意義的新刺激', vibe: '極度抽離、冷靜、大幅降低情感與社交需求' },
    '6': { name: '忠誠型', sin: '恐懼', fear: '失去支持與指引', desire: '獲得安全感與支持', defense: '投射 (Projection)', center: '思維中心/腦 (Head)', growth: '9', growthDesc: '放下焦慮，變得包容、放鬆，信任宇宙的運作', stress: '3', stressDesc: '為了掩飾不安而變得極度競爭、虛榮且傲慢', vibe: '更加謹慎、尋求安全感與群體認同，危機意識極強' },
    '7': { name: '活躍型', sin: '貪食', fear: '被剝奪、陷入痛苦', desire: '快樂、滿足、體驗', defense: '合理化 (Rationalization)', center: '思維中心/腦 (Head)', growth: '5', growthDesc: '安靜下來，專注於深度的探索與沉思，不再逃避', stress: '1', stressDesc: '變得極度暴躁、批判、死板且充滿不合理的要求', vibe: '追求新鮮感、極度樂觀與逃避痛苦，思維靈活且跳躍' },
    '8': { name: '挑戰者', sin: '縱慾', fear: '被控制、受到傷害', desire: '保護自己、掌控命運', defense: '否認 (Denial)', center: '本能中心/腹 (Gut)', growth: '2', growthDesc: '放下防備，展現鐵漢柔情，真心關懷與守護弱小', stress: '5', stressDesc: '感到威脅時會退縮、切斷聯繫，變得多疑且恐懼', vibe: '控制欲強、充滿攻擊性與保護慾、絕對不容挑戰' },
    '9': { name: '和平型', sin: '怠惰', fear: '衝突、失去聯繫', desire: '維持平靜與和諧', defense: '麻醉 (Narcotization)', center: '本能中心/腹 (Gut)', growth: '3', growthDesc: '找回自我價值，變得積極主動、追求世俗成就', stress: '6', stressDesc: '面對衝突時變得極度焦慮、多疑且充滿被動攻擊', vibe: '追求和平、逃避衝突、極度容易妥協、溫和無害' }
};

const variantDB = {
    'SP': { title: '自保優先 (SP)', focus: '物質安全、健康與個人舒適', vibe: '比一般同型號更接地氣、謹慎且獨立', effect: '這大幅強化了你資源囤積與自我保護的本能' },
    'SO': { title: '社交優先 (SO)', focus: '群體地位、責任與社會歸屬', vibe: '比一般同型號更具責任感與關注人際網絡', effect: '這極度強化了你對社會階層與群體氣氛的敏感度' },
    'SX': { title: '一對一優先 (SX)', focus: '激情體驗、競爭力與靈魂融合', vibe: '充滿侵略性與極致的個人魅力', effect: '這徹底點燃了你突破極限與尋求強烈刺激的渴望' }
};

const rolesList = [
    { n: '第 1 位: 主導位', c: 'text-rose-400 font-bold tracking-widest', border: 'border-hero' }, 
    { n: '第 2 位: 輔助位', c: 'text-blue-400 font-bold tracking-widest', border: 'border-parent' }, 
    { n: '第 3 位: 少年位', c: 'text-emerald-400 font-bold tracking-widest', border: 'border-child' }, 
    { n: '第 4 位: 劣勢位', c: 'text-slate-300 font-bold tracking-widest', border: 'border-inferior' }, 
    { n: '第 5 位: 對手', c: 'text-slate-400 tracking-widest', border: 'border-opponent' }, 
    { n: '第 6 位: 巫師', c: 'text-slate-400 tracking-widest', border: 'border-senex' }, 
    { n: '第 7 位: 小丑位', c: 'text-amber-400 font-bold tracking-widest', border: 'border-trickster' }, 
    { n: '第 8 位: 惡魔位', c: 'text-red-500 font-bold tracking-widest', border: 'border-demon' }
];

const opposites = { 'E':'I', 'I':'E', 'N':'S', 'S':'N', 'T':'F', 'F':'T', 'J':'P', 'P':'J' };

/* =========================================
   Logic & Interactivity
   ========================================= */

// === 單雙人模式切換控制 ===
let isDualMode = false;

function toggleDualMode() {
    isDualMode = !isDualMode;
    const bPanel = document.getElementById('userB_panel');
    const btnText = document.getElementById('toggleDualText');
    const btnIcon = document.getElementById('toggleDualIcon');
    const btn = document.getElementById('toggleDualBtn');
    const chartPanel = document.getElementById('chartPanel');
    const userATitle = document.getElementById('userATitle');

    if(isDualMode) {
        bPanel.classList.remove('hidden');
        setTimeout(() => bPanel.classList.remove('opacity-0'), 10);
        chartPanel.classList.replace('lg:col-span-3', 'lg:col-span-2');
        userATitle.innerHTML = '🔴 使用者 A 分數';
        btnText.innerText = '移除第二人 (返回單人)';
        btnIcon.innerText = '➖';
        btn.classList.replace('bg-slate-100', 'bg-rose-100');
        btn.classList.replace('hover:bg-slate-200', 'hover:bg-rose-200');
        btn.classList.replace('text-slate-700', 'text-rose-700');
    } else {
        bPanel.classList.add('opacity-0');
        setTimeout(() => {
            bPanel.classList.add('hidden');
            chartPanel.classList.replace('lg:col-span-2', 'lg:col-span-3');
        }, 300);
        userATitle.innerHTML = '👤 你的測試分數';
        btnText.innerText = '加入第二人進行比對';
        btnIcon.innerText = '➕';
        btn.classList.replace('bg-rose-100', 'bg-slate-100');
        btn.classList.replace('hover:bg-rose-200', 'hover:bg-slate-200');
        btn.classList.replace('text-rose-700', 'text-slate-700');
    }
    drawCustomRadar();
    saveUserData(); // Save mode preference
}

// === 新手指南彈窗控制 ===
function toggleGuide() {
    const modal = document.getElementById('guideModal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before changing opacity
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.remove('pointer-events-none');
        }, 10);
        document.body.style.overflow = 'hidden'; 
    } else {
        modal.classList.add('opacity-0');
        modal.classList.add('pointer-events-none');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Wait for transition
        document.body.style.overflow = 'auto';
    }
}

// === 動態探索器邏輯 ===
function updateAnalyzer() {
    const mbti = document.getElementById('mbtiSelector').value;
    const ennea = document.getElementById('enneagramSelector').value;
    const variant = document.getElementById('variantSelector').value;
    if(!mbti) return;

    saveUserData(); // Save selections

    const container = document.getElementById('analysisContainer');
    container.classList.remove('fade-in'); void container.offsetWidth; container.classList.add('fade-in');
    
    // 如果之前是隱藏的，現在顯示
    container.classList.remove('hidden');

    document.getElementById('avatarIcon').innerText = typeInfo[mbti].avatar;
    document.getElementById('typeName').innerText = typeInfo[mbti].name;
    
    const col = mbtiColors[mbti];
    const badge = document.getElementById('mbtiColorBadge');
    badge.innerText = `${col.name}`;
    badge.className = `px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${col.css}`;

    document.getElementById('mbtiHigh').innerText = mbtiHealth[mbti].high;
    document.getElementById('mbtiLow').innerText = mbtiHealth[mbti].low;

    const funcs = functionsStack[mbti];
    const fullStack = [funcs[0], funcs[1], funcs[2], funcs[3], funcs[0][0]+(funcs[0][1]=='e'?'i':'e'), funcs[1][0]+(funcs[1][1]=='e'?'i':'e'), funcs[2][0]+(funcs[2][1]=='e'?'i':'e'), funcs[3][0]+(funcs[3][1]=='e'?'i':'e')];

    // 動態深度分析 1-3位
    document.getElementById('descHero').innerHTML = `<strong>${funcNames[funcs[0]]} (${funcs[0]})</strong> 作為你的核心引擎，就像是呼吸一樣自然。${deepFuncDesc[funcs[0]]}`;
    document.getElementById('descParent').innerHTML = `為了平衡主導功能的衝動，你的大腦發展出了 <strong>${funcNames[funcs[1]]} (${funcs[1]})</strong>。${deepFuncDesc[funcs[1]]}`;
    document.getElementById('descChild').innerHTML = `<strong>${funcNames[funcs[2]]} (${funcs[2]})</strong> 是你放鬆與創意的來源。當你沒有壓力時，它會帶給你極大的快樂，但在壓力下也可能讓你顯得盲目與任性。${deepFuncDesc[funcs[2]]}`;

    const sub = mbti.split('').map(c => opposites[c]).join('');
    const unc = opposites[mbti[0]] + mbti[1] + mbti[2] + opposites[mbti[3]];
    const sup = mbti[0] + opposites[mbti[1]] + opposites[mbti[2]] + mbti[3];
    document.getElementById('mindEgo').innerText = mbti; document.getElementById('mindSub').innerText = sub;
    document.getElementById('mindUnc').innerText = unc; document.getElementById('mindSup').innerText = sup;

    document.getElementById('lifeStage1').innerText = `${funcs[0]} (${funcNames[funcs[0]]})`;
    document.getElementById('lifeStage2').innerText = `${funcs[1]} (${funcNames[funcs[1]]})`;
    document.getElementById('lifeStage3').innerText = `${funcs[2]} (${funcNames[funcs[2]]})`;
    document.getElementById('lifeStage4').innerText = `${funcs[3]} (${funcNames[funcs[3]]})`;

    const rel = relationsDB[mbti];
    document.getElementById('relDual').innerText = `${rel.dual} (${typeInfo[rel.dual].name.split(' ')[1]})`;
    document.getElementById('relMirror').innerText = `${rel.mirror} (${typeInfo[rel.mirror].name.split(' ')[1]})`;
    document.getElementById('relConflict').innerText = `${rel.conflict} (${typeInfo[rel.conflict].name.split(' ')[1]})`;

    const pAxis = (funcs.includes('Ne') && funcs.includes('Si')) ? 'Ne-Si' : 'Ni-Se';
    const jAxis = (funcs.includes('Te') && funcs.includes('Fi')) ? 'Te-Fi' : 'Ti-Fe';
    document.getElementById('perceivingAxis').innerText = pAxis + ' 軸'; document.getElementById('perceivingAxisDesc').innerText = axesDesc[pAxis];
    document.getElementById('judgingAxis').innerText = jAxis + ' 軸'; document.getElementById('judgingAxisDesc').innerText = axesDesc[jAxis];

    document.getElementById('loopTitle').innerText = `${funcs[0]}-${funcs[2]} Loop`; document.getElementById('loopDesc').innerText = stressDB[mbti].loop;
    document.getElementById('gripTitle').innerText = `${funcs[3]} Grip`; document.getElementById('gripDesc').innerText = stressDB[mbti].grip;

    const sides = [
        { type: 'Ego', mbti: mbti, desc: fourSidesDesc.Ego },
        { type: 'Sub', mbti: sub, desc: fourSidesDesc.Subconscious },
        { type: 'Unc', mbti: unc, desc: fourSidesDesc.Unconscious },
        { type: 'Sup', mbti: sup, desc: fourSidesDesc.Superego }
    ];
    
    const fsGrid = document.getElementById('fourSidesGrid');
    if(fsGrid) {
        fsGrid.innerHTML = '';
        sides.forEach(s => {
            fsGrid.innerHTML += `
            <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/80 transition-all group">
                <div class="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
                    <span class="text-xs font-bold ${s.desc.color} uppercase tracking-wider">${s.desc.tag}</span>
                    <span class="text-xl opacity-50 group-hover:opacity-100 transition-opacity">${s.desc.icon}</span>
                </div>
                <div class="text-3xl font-black text-white mb-1 tracking-tight">${s.mbti}</div>
                <div class="text-[10px] text-slate-400 font-mono mb-3 uppercase tracking-widest">${typeInfo[s.mbti].name.split(' ')[1]}</div>
                <p class="text-xs text-slate-300 leading-relaxed font-medium opacity-90">${s.desc.text}</p>
            </div>`;
        });
    }

    // 完整八維排序表 (帶關鍵字的深色卡片)
    const grid = document.getElementById('eightFunctionsGrid'); grid.innerHTML = '';
    fullStack.forEach((func, idx) => {
        grid.innerHTML += `
        <div class="func-card p-6 rounded-2xl flex flex-col items-center ${rolesList[idx].border}">
            <span class="text-xs ${rolesList[idx].c} mb-3 uppercase">${rolesList[idx].n}</span>
            <span class="text-4xl font-black text-white mb-2 tracking-wider">${func}</span>
            <span class="text-sm font-bold text-slate-300 mb-4 bg-slate-800 px-4 py-1.5 rounded-full shadow-inner">${funcNames[func]}</span>
            <div class="text-[13px] text-slate-400 text-center leading-loose border-t border-slate-700/80 pt-4 w-full font-medium">
                ${funcKeywords[func]}
            </div>
        </div>`;
    });

    document.getElementById('guideInfTitle').innerText = `第 4 位：${funcs[3]} (劣勢位)`; document.getElementById('guideInfText').innerHTML = adviceGuides.Inferior[funcs[3]];
    document.getElementById('guideTriTitle').innerText = `第 7 位：${fullStack[6]} (小丑位)`; document.getElementById('guideTriText').innerHTML = adviceGuides.Trickster[fullStack[6]];
    document.getElementById('guideDemTitle').innerText = `第 8 位：${fullStack[7]} (惡魔位)`; document.getElementById('guideDemText').innerHTML = adviceGuides.Demon[fullStack[7]];

    // 🔥 終極個人化報告字串生成 (Synthesis)
    let reportHTML = `<p><strong>【大腦原廠設定】</strong> 你是屬於 <span class="${col.css} px-2 py-0.5 rounded font-bold">${col.name}</span> 家族的 <strong>${mbti}</strong>。你的大腦主要依賴 <span class="text-rose-400 font-bold">${funcs[0]} (${funcNames[funcs[0]]})</span> 作為探索世界與解決問題的最強引擎，並用 <span class="text-blue-400 font-bold">${funcs[1]}</span> 來保持理智的煞車與平衡。</p>`;
    
    if (ennea) {
        let edata = enneaDB[ennea];
        reportHTML += `<p class="mt-4"><strong>【深層靈魂驅力】</strong> 然而，MBTI 只是你的工具，真正驅動你靈魂的是隸屬於 <span class="text-amber-400 font-bold">${edata.center}</span> 的 <span class="text-amber-400 font-bold">第 ${ennea} 型 (${edata.name})</span>。你終其一生在對抗「${edata.fear}」的恐懼，這迫使你的主導功能 (${funcs[0]}) 染上了強烈的「${edata.sin}」色彩。當你感到威脅時，你的大腦會毫不猶豫地啟動「${edata.defense}」來保護你免受傷害。</p>`;
    }
    if (variant) {
        let vdata = variantDB[variant];
        reportHTML += `<p class="mt-4"><strong>【生存本能加成】</strong> 作為 <span class="text-emerald-400 font-bold">${vdata.title}</span>，你將上述所有的認知與靈魂能量，全數投注在「${vdata.focus}」上。這使得你在人群中${vdata.vibe}，並且${vdata.effect}。</p>`;
    }
    
    let evolutionText = "";
    if(ennea) {
        evolutionText = `當你身心健康時，你不僅能展現出「${mbtiHealth[mbti].high}」的完美特質，更會朝向 ${enneaDB[ennea].growth}型 演化，${enneaDB[ennea].growthDesc}；但若落入極度壓力，你可能會退化成「${mbtiHealth[mbti].low}」，並解離至 ${enneaDB[ennea].stress}型，${enneaDB[ennea].stressDesc}。`;
    } else {
        evolutionText = `當你身心健康時，你能展現出「${mbtiHealth[mbti].high}」的完美特質；但若落入極度壓力與低階狀態，你可能會淪為「${mbtiHealth[mbti].low}」。`;
    }
    
    reportHTML += `<p class="mt-5 text-amber-200 bg-amber-900/40 p-5 rounded-2xl border border-amber-500/30 shadow-inner"><strong>【演化與覺醒警告】</strong> ${evolutionText} 請時刻覺察自己的狀態，接納陰影，完成你的個體化旅程！</p>`;
    
    document.getElementById('ultimateReport').innerHTML = reportHTML;
}

// === 圖表繪製區 (自訂雷達圖) ===
const hexToRgba = (hex, alpha) => { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return `rgba(${r}, ${g}, ${b}, ${alpha})`; };
const radarOptions = { responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, min: 0, max: 150, ticks: { display: false, stepSize: 30 }, pointLabels: { font: { size: 12, weight: 'bold' } } } } };
const radarLabels = ['Te','Ti','Fe','Fi','Se','Si','Ne','Ni'];
const scoreKeys = ['Te', 'Ti', 'Fe', 'Fi', 'Se', 'Si', 'Ne', 'Ni'];
const defaultScore = 100;

const mbtiData = { 'ENTJ': [135, 90, 75, 80, 95, 70, 100, 120], 'INTJ': [120, 90, 70, 95, 75, 80, 100, 135], 'ENTP': [95, 120, 85, 75, 90, 70, 135, 100], 'INTP': [90, 135, 75, 85, 70, 95, 120, 100], 'ENFJ': [85, 75, 135, 100, 95, 70, 90, 120], 'INFJ': [75, 95, 120, 100, 70, 80, 90, 135], 'ENFP': [95, 75, 90, 120, 85, 70, 135, 100], 'INFP': [75, 80, 90, 135, 70, 95, 120, 100], 'ESTJ': [135, 95, 80, 70, 90, 120, 100, 75], 'ISTJ': [120, 90, 75, 95, 80, 135, 70, 100], 'ESFJ': [80, 70, 135, 95, 90, 120, 100, 75], 'ISFJ': [75, 90, 120, 95, 80, 135, 70, 100], 'ESTP': [95, 120, 85, 70, 135, 80, 100, 75], 'ISTP': [90, 135, 70, 80, 120, 95, 75, 100], 'ESFP': [95, 75, 90, 120, 135, 80, 100, 75], 'ISFP': [75, 80, 90, 135, 120, 95, 75, 100] };
const colors16 = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#94a3b8', '#64748b'];

// 雙人雷達圖繪製函數
window.myCustomChart = null;

function clearInputs(userPrefix) {
    scoreKeys.forEach((key) => {
        const el = document.getElementById(`${userPrefix}${key}`);
        if (el) el.value = defaultScore;
    });

    drawCustomRadar();
    saveUserData();
}

function drawCustomRadar() {
    // saveUserData(); // Removed: Drawing shouldn't trigger saving to avoid overwriting data on init


    const inputsA = [
        parseInt(document.getElementById('aTe').value)||0, parseInt(document.getElementById('aTi').value)||0,
        parseInt(document.getElementById('aFe').value)||0, parseInt(document.getElementById('aFi').value)||0,
        parseInt(document.getElementById('aSe').value)||0, parseInt(document.getElementById('aSi').value)||0,
        parseInt(document.getElementById('aNe').value)||0, parseInt(document.getElementById('aNi').value)||0
    ];
    
    const datasets = [{ label: '使用者 A', data: inputsA, borderColor: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', borderWidth: 3, pointRadius: 4 }];

    if(isDualMode) {
        const inputsB = [
            parseInt(document.getElementById('bTe').value)||0, parseInt(document.getElementById('bTi').value)||0,
            parseInt(document.getElementById('bFe').value)||0, parseInt(document.getElementById('bFi').value)||0,
            parseInt(document.getElementById('bSe').value)||0, parseInt(document.getElementById('bSi').value)||0,
            parseInt(document.getElementById('bNe').value)||0, parseInt(document.getElementById('bNi').value)||0
        ];
        datasets.push({ label: '使用者 B', data: inputsB, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 3, pointRadius: 4 });
    }
    
    const compareType = document.getElementById('compareSelector').value;
    if(compareType && mbtiData[compareType]) {
        const cIdx = Object.keys(mbtiData).indexOf(compareType);
        datasets.push({ label: `平均 ${compareType} 常模`, data: mbtiData[compareType], borderColor: hexToRgba(colors16[cIdx], 0.6), borderDash: [5, 5], borderWidth: 2, backgroundColor: 'transparent' });
    }

    if(window.myCustomChart) { window.myCustomChart.destroy(); }
    
    // Ensure canvas exists
    const ctx = document.getElementById('customRadarChart');
    if (!ctx) return;

    window.myCustomChart = new Chart(ctx, { type: 'radar', data: { labels: radarLabels, datasets: datasets }, options: { ...radarOptions, plugins: { legend: { position: 'bottom' } } } });
}

// 16型小圖表生成 & 薪資圖 (Initialization)
function initCharts() {
    const container16 = document.getElementById('all16ChartsContainer');
    if(!container16) return;

    // Clear existing if any (for re-init safety)
    container16.innerHTML = '';
    let cIdx = 0;
    
    for (const [type, data] of Object.entries(mbtiData)) {
        const chartId = `chart_16_${cIdx}`; const color = colors16[cIdx];
        const div = document.createElement('div');
        div.className = "bg-slate-50 rounded-xl p-3 flex flex-col items-center border border-slate-100 hover:shadow-md transition-shadow";
        div.innerHTML = `<h4 class="text-xs md:text-sm font-bold text-slate-700 mb-2">${type}</h4><div class="relative w-full aspect-square max-w-[150px]"><canvas id="${chartId}"></canvas></div>`;
        container16.appendChild(div);
        
        setTimeout(() => { 
            const canvas = document.getElementById(chartId);
            if(canvas) {
                new Chart(canvas, { type: 'radar', data: { labels: radarLabels, datasets: [{ data: data, backgroundColor: hexToRgba(color, 0.15), borderColor: color, pointBackgroundColor: color, borderWidth: 2, pointRadius: 3 }] }, options: { ...radarOptions, plugins: { legend: { display: false } } } }); 
            }
        }, 0);
        cIdx++;
    }

    const salaryCtx = document.getElementById('salaryBarChart');
    if(salaryCtx) {
        new Chart(salaryCtx, { type: 'bar', data: { labels: ['ENTJ', 'ESTJ', 'ENTP', 'INTJ', 'ESTP', '平均', 'INFP'], datasets: [{ label: '相對薪資', data: [145, 138, 125, 122, 118, 100, 85], backgroundColor: ['#fb7185', '#fb7185', '#818cf8', '#818cf8', '#94a3b8', '#e2e8f0', '#34d399'], borderRadius: 4 }]}, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    }
}

function initSystem() {
    // Attach Listeners
    document.getElementById('mbtiSelector').addEventListener('change', () => { updateAnalyzer(); saveUserData(); });
    document.getElementById('enneagramSelector').addEventListener('change', () => { updateAnalyzer(); saveUserData(); });
    document.getElementById('variantSelector').addEventListener('change', () => { updateAnalyzer(); saveUserData(); });
    
    document.getElementById('toggleDualBtn').addEventListener('click', toggleDualMode);

    // Score Inputs Listeners
    const scoreInputs = ['aTe','aTi','aFe','aFi','aSe','aSi','aNe','aNi', 'bTe','bTi','bFe','bFi','bSe','bSi','bNe','bNi'];
    scoreInputs.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener('change', () => { drawCustomRadar(); saveUserData(); });
            el.addEventListener('input', () => { drawCustomRadar(); }); // Live update (no save)
        }
    });

    document.getElementById('compareSelector').addEventListener('change', drawCustomRadar);

    initCharts();
    drawCustomRadar();
}

/* =========================================
   Persistence (LocalStorage)
   ========================================= */
const STORAGE_KEY = 'mbti_system_v1';

function saveUserData() {
    const data = {
        mbti: document.getElementById('mbtiSelector').value,
        enneagram: document.getElementById('enneagramSelector').value,
        variant: document.getElementById('variantSelector').value,
        scoresA: {
            Te: document.getElementById('aTe').value, Ti: document.getElementById('aTi').value,
            Fe: document.getElementById('aFe').value, Fi: document.getElementById('aFi').value,
            Se: document.getElementById('aSe').value, Si: document.getElementById('aSi').value,
            Ne: document.getElementById('aNe').value, Ni: document.getElementById('aNi').value
        },
        scoresB: {
            Te: document.getElementById('bTe').value, Ti: document.getElementById('bTi').value,
            Fe: document.getElementById('bFe').value, Fi: document.getElementById('bFi').value,
            Se: document.getElementById('bSe').value, Si: document.getElementById('bSi').value,
            Ne: document.getElementById('bNe').value, Ni: document.getElementById('bNi').value
        },
        isDualMode: isDualMode
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadUserData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        
        // Load MBTI specific selections
        if(data.mbti) {
            document.getElementById('mbtiSelector').value = data.mbti;
            // Only update analyzer if MBTI is present
            // We'll call updateAnalyzer at the end
        }
        if(data.enneagram) document.getElementById('enneagramSelector').value = data.enneagram;
        if(data.variant) document.getElementById('variantSelector').value = data.variant;

        // Load Scores A
        if(data.scoresA) {
            Object.keys(data.scoresA).forEach(k => {
                const el = document.getElementById('a'+k);
                if(el) el.value = data.scoresA[k];
            });
        }
        
        // Load Scores B
        if(data.scoresB) {
            Object.keys(data.scoresB).forEach(k => {
                const el = document.getElementById('b'+k);
                if(el) el.value = data.scoresB[k];
            });
        }

        // Restore Dual Mode state
        if (data.isDualMode && !isDualMode) {
             toggleDualMode();
        }

        // Refresh UI
        drawCustomRadar();
        if(data.mbti) updateAnalyzer();

    } catch (e) {
        console.error("Failed to load saved data", e);
    }
}
