'use client';

import { use, useEffect, useRef, useState } from 'react';
import { FiAperture, FiArrowDownRight, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { GiFlowerStar } from 'react-icons/gi';

const MAP_URL = 'https://maps.app.goo.gl/41WV3npd4YdzTyEv7';
const AUDIO_SRC = '/music/christina-perri-a-thousand-years.mp3';
const WEDDING_START = new Date('2026-11-01T14:00:00+05:00').getTime();
const QURAN_VERSE = 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً';
const LOCALES = [
  { code: 'ru', label: 'РУ' },
  { code: 'en', label: 'EN' },
  { code: 'uz', label: 'UZ' },
  { code: 'oz', label: 'ЎЗ' },
];

const COPY = {
  ru: {
    browserTitle: 'Алишер и Юлдуз — свадебное приглашение',
    langLabel: 'Язык',
    sectionsLabel: 'Разделы приглашения',
    musicOn: 'Включить музыку',
    musicOff: 'Выключить музыку',
    musicError: 'Не удалось включить музыку. Нажмите ещё раз.',
    date: '1 ноября 2026',
    month: 'ноябрь',
    weekday: 'воскресенье',
    badge: 'Свадебное приглашение',
    names: 'Алишер & Юлдуз',
    quote: 'Два сердца. Одна история.',
    open: 'Открыть приглашение',
    swipe: 'Нажмите, чтобы продолжить',
    labels: ['Приглашение', 'Наша история', 'День свадьбы', 'Место', 'С благодарностью', 'До встречи'],
    inviteTitle: 'Дорогие родные и друзья!',
    inviteText: 'С радостью приглашаем вас разделить с нами один из самых важных и счастливых дней нашей жизни.',
    inviteNote: 'Будем счастливы видеть вас рядом',
    storyKicker: 'День, который мы запомним',
    storyTitle: 'Начало нашей<br />новой главы',
    storyText: 'Среди близких и дорогих сердцу людей мы хотим отпраздновать начало нашей семейной истории. Ваше присутствие сделает этот день по-настоящему особенным.',
    galleryKicker: 'Маленькие мгновения',
    galleryTitle: 'Наша история —<br /><em>в фотографиях</em>',
    eventKicker: 'Сохраните дату',
    eventTitle: 'Будем ждать<br /><em>вас на свадьбе</em>',
    countdownTitle: 'Осталось до свадьбы',
    countdownUnits: ['Дней', 'Часов', 'Минут', 'Секунд'],
    countdownComplete: 'Свадебный день настал!',
    timeLabel: 'Начало торжества',
    placeLabel: 'Место',
    addressLabel: 'Адрес',
    eventNote: 'Воскресенье · ждём вас с 14:00',
    quranLabel: 'Слова из Священного Корана',
    quranReference: 'Сура «Ар-Рум», 30:21',
    quranMeaning: '«И из Его знамений — то, что Он сотворил для вас супруг из вас самих, чтобы вы находили в них покой, и установил между вами любовь и милосердие. Поистине, в этом — знамения для людей размышляющих».',
    locationKicker: 'Как нас найти',
    locationTitle: 'Bonu Restaurant',
    locationText: 'Отметьте этот день в календаре и приезжайте разделить с нами радость. Нажмите на кнопку, чтобы открыть маршрут.',
    mapButton: 'Открыть карту',
    thanksKicker: 'От всего сердца',
    thanksTitle: 'Спасибо, что<br /><em>будете с нами</em>',
    thanksText: 'Ваши улыбки, добрые слова и тёплые пожелания станут лучшим украшением нашего праздника.',
    finalKicker: 'С любовью приглашаем',
    finalTitle: 'До встречи<br /><em>на нашей свадьбе</em>',
    finalDate: '1 ноября 2026 · 14:00',
  },
  en: {
    browserTitle: 'Alisher & Yulduz — Wedding invitation',
    langLabel: 'Language',
    sectionsLabel: 'Invitation sections',
    musicOn: 'Play music',
    musicOff: 'Pause music',
    musicError: 'Music could not start. Please try again.',
    date: 'November 1, 2026',
    month: 'November',
    weekday: 'Sunday',
    badge: 'Wedding invitation',
    names: 'Alisher & Yulduz',
    quote: 'Two hearts. One story.',
    open: 'Open invitation',
    swipe: 'Tap to continue',
    labels: ['Invitation', 'Our story', 'Wedding day', 'Venue', 'With gratitude', 'See you soon'],
    inviteTitle: 'Dear family and friends!',
    inviteText: 'We are delighted to invite you to share one of the most meaningful and joyful days of our lives.',
    inviteNote: 'We will be happy to celebrate with you',
    storyKicker: 'A day to remember',
    storyTitle: 'The beginning of<br />our next chapter',
    storyText: 'We want to celebrate the beginning of our family story surrounded by the people dearest to us. Having you there will make the day truly special.',
    galleryKicker: 'Little moments',
    galleryTitle: 'Our story —<br /><em>in photographs</em>',
    eventKicker: 'Save the date',
    eventTitle: 'We would love<br /><em>to celebrate with you</em>',
    countdownTitle: 'Time left until the wedding',
    countdownUnits: ['Days', 'Hours', 'Minutes', 'Seconds'],
    countdownComplete: 'The wedding day is here!',
    timeLabel: 'Celebration begins',
    placeLabel: 'Venue',
    addressLabel: 'Address',
    eventNote: 'Sunday · join us from 2:00 PM',
    quranLabel: 'A verse from the Holy Qur’an',
    quranReference: 'Surah Ar-Rum, 30:21',
    quranMeaning: '“And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.”',
    locationKicker: 'Find your way',
    locationTitle: 'Bonu Restaurant',
    locationText: 'Save the date and come celebrate with us. Follow the link below to open the location.',
    mapButton: 'Open map',
    thanksKicker: 'From the heart',
    thanksTitle: 'Thank you for<br /><em>being part of our day</em>',
    thanksText: 'Your smiles, kind words, and warm wishes will be the loveliest part of our celebration.',
    finalKicker: 'With love, you are invited',
    finalTitle: 'Until we meet<br /><em>at our wedding</em>',
    finalDate: 'November 1, 2026 · 2:00 PM',
  },
  uz: {
    browserTitle: 'Alisher va Yulduz — to‘y taklifnomasi',
    langLabel: 'Til',
    sectionsLabel: 'Taklifnoma bo‘limlari',
    musicOn: 'Musiqani yoqish',
    musicOff: 'Musiqani to‘xtatish',
    musicError: 'Musiqani yoqib bo‘lmadi. Qayta urinib ko‘ring.',
    date: '2026-yil 1-noyabr',
    month: 'noyabr',
    weekday: 'yakshanba',
    badge: 'To‘y taklifnomasi',
    names: 'Alisher & Yulduz',
    quote: 'Ikki qalb. Bir hikoya.',
    open: 'Taklifnomani ochish',
    swipe: 'Davom etish uchun bosing',
    labels: ['Taklifnoma', 'Hikoyamiz', 'To‘y kuni', 'Manzil', 'Minnatdorchilik', 'Ko‘rishguncha'],
    inviteTitle: 'Aziz yaqinlarimiz!',
    inviteText: 'Hayotimizdagi eng muhim va quvonchli kunlardan birini biz bilan birga nishonlashga sizni taklif qilamiz.',
    inviteNote: 'Sizni yonimizda ko‘rishdan baxtiyormiz',
    storyKicker: 'Yodda qoladigan kun',
    storyTitle: 'Yangi sahifamizning<br />go‘zal boshlanishi',
    storyText: 'Oila qurish hikoyamizning boshlanishini qalbimizga yaqin insonlar bilan nishonlamoqchimiz. Sizning ishtirokingiz bu kunni yanada unutilmas qiladi.',
    galleryKicker: 'Unutilmas lahzalar',
    galleryTitle: 'Hikoyamiz —<br /><em>suratlarda</em>',
    eventKicker: 'Sanani belgilab qo‘ying',
    eventTitle: 'Sizni to‘yimizda<br /><em>kutib qolamiz</em>',
    countdownTitle: 'To‘yga qadar qoldi',
    countdownUnits: ['Kun', 'Soat', 'Daqiqa', 'Soniya'],
    countdownComplete: 'To‘y kuni yetib keldi!',
    timeLabel: 'Tantanali marosim',
    placeLabel: 'Maskan',
    addressLabel: 'Manzil',
    eventNote: 'Yakshanba · soat 14:00 dan boshlab',
    quranLabel: 'Muqaddas Qur’ondan oyat',
    quranReference: 'Rum surasi, 30:21',
    quranMeaning: '«Uning oyatlaridan biri — sizlar taskin topishingiz uchun o‘zlaringizdan juftlar yaratgani va orangizda mehr-muhabbat va rahm-shafqat paydo qilganidir. Albatta, bunda tafakkur qiladigan qavm uchun oyatlar bordir».',
    locationKicker: 'Manzilimiz',
    locationTitle: 'Bonu Restaurant',
    locationText: 'Ushbu sanani taqvimingizga belgilab qo‘ying va quvonchimizga sherik bo‘ling. Manzilni xaritada ochish uchun tugmani bosing.',
    mapButton: 'Xaritada ochish',
    thanksKicker: 'Chin qalbimizdan',
    thanksTitle: 'Biz bilan<br /><em>bo‘lishingiz uchun rahmat</em>',
    thanksText: 'Tabassumingiz, ezgu so‘zlaringiz va tilaklaringiz bayramimizga yanada fayz bag‘ishlaydi.',
    finalKicker: 'Mehr bilan taklif etamiz',
    finalTitle: 'To‘yimizda<br /><em>ko‘rishguncha</em>',
    finalDate: '2026-yil 1-noyabr · 14:00',
  },
  oz: {
    browserTitle: 'Алишер ва Юлдуз — тўй таклифномаси',
    langLabel: 'Тил',
    sectionsLabel: 'Таклифнома бўлимлари',
    musicOn: 'Мусиқани ёқиш',
    musicOff: 'Мусиқани тўхтатиш',
    musicError: 'Мусиқани ёқиб бўлмади. Қайта уриниб кўринг.',
    date: '2026-йил 1-ноябрь',
    month: 'ноябрь',
    weekday: 'якшанба',
    badge: 'Тўй таклифномаси',
    names: 'Алишер & Юлдуз',
    quote: 'Икки қалб. Бир ҳикоя.',
    open: 'Таклифномани очиш',
    swipe: 'Давом этиш учун босинг',
    labels: ['Таклифнома', 'Ҳикоямиз', 'Тўй куни', 'Манзил', 'Миннатдорчилик', 'Кўришгунча'],
    inviteTitle: 'Азиз яқинларимиз!',
    inviteText: 'Ҳаётимиздаги энг муҳим ва қувончли кунлардан бирини биз билан бирга нишонлашга сизларни таклиф қиламиз.',
    inviteNote: 'Сизни ёнимизда кўришдан бахтиёрмиз',
    storyKicker: 'Ёдда қоладиган кун',
    storyTitle: 'Янги саҳифамизнинг<br />гўзал бошланиши',
    storyText: 'Оила қуриш ҳикоямизнинг бошланишини қалбимизга яқин инсонлар билан нишонламоқчимиз. Сизнинг иштирокингиз бу кунни янада унутилмас қилади.',
    galleryKicker: 'Унутилмас лаҳзалар',
    galleryTitle: 'Ҳикоямиз —<br /><em>суратларда</em>',
    eventKicker: 'Санани белгилаб қўйинг',
    eventTitle: 'Сизни тўйимизда<br /><em>кутиб қоламиз</em>',
    countdownTitle: 'Тўйга қадар қолди',
    countdownUnits: ['Кун', 'Соат', 'Дақиқа', 'Сония'],
    countdownComplete: 'Тўй куни етиб келди!',
    timeLabel: 'Тантанали маросим',
    placeLabel: 'Макон',
    addressLabel: 'Манзил',
    eventNote: 'Якшанба · соат 14:00 дан бошлаб',
    quranLabel: 'Муқаддас Қуръондан оят',
    quranReference: 'Рум сураси, 30:21',
    quranMeaning: '«Унинг оятларидан бири — сизлар таскин топишингиз учун ўзларингиздан жуфтлар яратгани ва орангизда меҳр-муҳаббат ва раҳм-шафқат пайдо қилганидир. Албатта, бунда тафаккур қиладиган қавм учун оятлар бордир».',
    locationKicker: 'Манзилимиз',
    locationTitle: 'Bonu Restaurant',
    locationText: 'Ушбу санани тақвимингизга белгилаб қўйинг ва қувончимизга шерик бўлинг. Манзилни харитада очиш учун тугмани босинг.',
    mapButton: 'Харитада очиш',
    thanksKicker: 'Чин қалбимиздан',
    thanksTitle: 'Биз билан<br /><em>бўлганингиз учун раҳмат</em>',
    thanksText: 'Табассумингиз, эзгу сўзларингиз ва тилакларингиз байрамимизга янада файз бағишлайди.',
    finalKicker: 'Меҳр билан таклиф этамиз',
    finalTitle: 'Тўйимизда<br /><em>кўришгунча</em>',
    finalDate: '2026-йил 1-ноябрь · 14:00',
  },
};

const SECTION_IDS = ['cover', 'invitation', 'story', 'event', 'location', 'thanks', 'final'];

function BotanicalOrnament({ className = '' }) {
  return (
    <svg
      className={`botanical-ornament ${className}`}
      viewBox="0 0 300 400"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 382C91 317 121 251 151 179c28-68 54-119 119-158M82 321C70 255 49 222 14 195M119 241c46-12 76-9 110 12M150 176c-30-45-42-82-35-128M188 105c42 4 70 18 95 42M50 354c-4-48-20-79-49-104M101 282c-12-43-9-78 11-111" strokeWidth="2" />
        <path d="M78 319c-39-4-60-25-64-63 37 7 58 28 64 63ZM105 278c-37-3-57-23-63-59 36 7 57 27 63 59ZM113 57c-30-25-38-53-24-84 28 23 36 51 24 84ZM191 106c20-32 48-44 82-35-20 30-48 42-82 35ZM228 250c9-37 31-57 67-61-8 36-30 56-67 61ZM40 230c-36 3-61-12-77-45 37-2 62 13 77 45Z" strokeWidth="1.5" />
        <path d="M192 96c-19-33-15-61 12-84 15 34 11 62-12 84ZM151 179c-38-19-52-45-43-80 35 16 49 43 43 80ZM150 180c17-39 42-56 78-50-13 36-39 53-78 50ZM75 322c-18-38-13-68 16-91 14 39 9 69-16 91Z" strokeWidth="1.5" />
        <path d="M238 51c-8-10-7-20 3-29 9 10 9 20-3 29ZM151 178c-9-13-8-26 5-38 12 13 11 25-5 38ZM253 246c-10-11-10-23 2-35 11 12 10 24-2 35ZM114 60c-13-6-18-17-13-32 14 7 19 17 13 32Z" strokeWidth="1.5" />
        <path d="M151 178c-21-15-26-35-12-59 22 17 26 37 12 59Zm0 0c-25 7-43-2-53-28 25-8 43 1 53 28Zm0 0c6-26 23-38 49-35-6 26-23 38-49 35Zm0 0c23 13 30 32 18 56-23-13-29-32-18-56Z" strokeWidth="1.5" />
      </g>
      <g fill="currentColor">
        <circle cx="151" cy="178" r="4" />
        <circle cx="239" cy="50" r="2.5" />
        <circle cx="254" cy="245" r="2.5" />
        <circle cx="114" cy="59" r="2.5" />
      </g>
    </svg>
  );
}

export default function InvitationPage({ params }) {
  const { lang: routeLang } = use(params);
  const lang = COPY[routeLang] ? routeLang : 'ru';
  const t = COPY[lang];
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const audioRef = useRef(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [curtainsOpening, setCurtainsOpening] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const remainingSeconds = Math.floor(Math.max(0, WEDDING_START - Date.now()) / 1000);
      setCountdown({
        days: Math.floor(remainingSeconds / 86400),
        hours: Math.floor((remainingSeconds % 86400) / 3600),
        minutes: Math.floor((remainingSeconds % 3600) / 60),
        seconds: remainingSeconds % 60,
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'none';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
      setMusicError(false);
    } catch {
      setIsPlaying(false);
      setMusicError(true);
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setMusicError(false);
      return;
    }
    void playMusic();
  };

  const goToSection = (index) => {
    const container = containerRef.current;
    const section = sectionRefs.current[index];
    if (!container || !section) return;
    container.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    setActiveSection(index);
  };

  const openInvitation = () => {
    if (isUnlocked) return;
    setIsUnlocked(true);
    setCurtainsOpening(true);
    void playMusic();
    window.setTimeout(() => {
      setCurtainsOpening(false);
      goToSection(1);
    }, 1500);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const index = Math.round(container.scrollTop / container.clientHeight);
    setActiveSection(Math.min(index, SECTION_IDS.length - 1));
  };

  return (
    <main className="invitation-app">
      <header className="site-controls">
        <a className="monogram" href={`/${lang}`} aria-label={t.names}>
          A<span>&</span>Y
        </a>
        <div className="control-group">
          <nav className="language-switcher" aria-label={t.langLabel}>
            {LOCALES.map(({ code, label }) => (
              <a
                key={code}
                href={`/${code}`}
                className={lang === code ? 'language-link active' : 'language-link'}
                lang={code}
                aria-current={lang === code ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            className={`music-button ${isPlaying ? 'playing' : ''}`}
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? t.musicOff : t.musicOn}
            title={isPlaying ? t.musicOff : t.musicOn}
          >
            <span className="music-bars" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="music-button-label">{isPlaying ? t.musicOff : t.musicOn}</span>
          </button>
        </div>
      </header>

      {isUnlocked && (
        <nav className="section-nav" aria-label={t.sectionsLabel}>
          {t.labels.map((label, index) => (
            <button
              key={SECTION_IDS[index + 1]}
              type="button"
              className={`section-dot ${activeSection === index + 1 ? 'active' : ''}`}
              onClick={() => goToSection(index + 1)}
              aria-label={label}
              aria-current={activeSection === index + 1 ? 'step' : undefined}
            />
          ))}
        </nav>
      )}

      <div ref={containerRef} className="snap-container" onScroll={handleScroll}>
        <section
          id="cover"
          ref={(element) => { sectionRefs.current[0] = element; }}
          className={`snap-section hero-section ${curtainsOpening ? 'curtain-opening' : ''}`}
        >
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-wash" />
          <div className="hero-frame" aria-hidden="true" />
          <BotanicalOrnament className="hero-botanical hero-botanical-left" />
          <BotanicalOrnament className="hero-botanical hero-botanical-right" />
          <div className="hero-copy">
            <p className="hero-kicker"><span />{t.badge}<span /></p>
            <p className="hero-prelude">{t.quote}</p>
            <h1>{t.names}</h1>
            <p className="hero-date">{t.date}<span>·</span>14:00</p>
            <div className="hero-ornament" aria-hidden="true"><i /><FiAperture className="ornament-icon" /><i /></div>
            <button className="open-button" type="button" onClick={openInvitation}>
              <span className="open-icon" aria-hidden="true">{isUnlocked ? <FiCheck /> : <FiArrowDownRight />}</span>
              {isUnlocked ? t.labels[0] : t.open}
            </button>
            {!isUnlocked && <p className="open-hint">{t.swipe}</p>}
          </div>
          <span className="hero-index">01 <i /> 07</span>
          {musicError && <p className="music-error" role="status">{t.musicError}</p>}
          {(!isUnlocked || curtainsOpening) && (
            <div className={`curtain-layer ${curtainsOpening ? 'curtain-opening' : ''}`} aria-hidden="true">
              <div className="curtain-valance" />
              <div className="curtain-panel curtain-panel-left" />
              <div className="curtain-panel curtain-panel-right" />
              <BotanicalOrnament className="curtain-embroidery" />
              <div className="curtain-pull curtain-pull-left" />
              <div className="curtain-pull curtain-pull-right" />
            </div>
          )}
          {curtainsOpening && <div className="curtain-flash" aria-hidden="true" />}
        </section>

        {isUnlocked && (
          <>
            <section
              id="invitation"
              ref={(element) => { sectionRefs.current[1] = element; }}
              className="snap-section invitation-section"
            >
              <div className="paper-texture" aria-hidden="true" />
              <div className="invitation-border" aria-hidden="true" />
              <BotanicalOrnament className="invitation-botanical" />
              <div className="invitation-copy">
                <p className="section-kicker">{t.badge}</p>
                <span className="section-flourish" aria-hidden="true"><FiAperture className="ornament-icon" /></span>
                <h2>{t.inviteTitle}</h2>
                <p className="invitation-message">{t.inviteText}</p>
                <blockquote className="quran-verse">
                  <p className="quran-label">{t.quranLabel}</p>
                  <p className="quran-arabic" lang="ar" dir="rtl">{QURAN_VERSE}</p>
                  <cite>{t.quranReference}</cite>
                  <p className="quran-meaning">{t.quranMeaning}</p>
                </blockquote>
                <div className="invitation-signature">{t.names}</div>
                <p className="invitation-note">{t.inviteNote}</p>
              </div>
              <BotanicalOrnament className="invitation-botanical invitation-botanical-right" />
              <span className="section-index">02</span>
            </section>

            <section
              id="story"
              ref={(element) => { sectionRefs.current[2] = element; }}
              className="snap-section story-section"
            >
              <div className="story-medallion" aria-hidden="true">
                <BotanicalOrnament />
                <GiFlowerStar className="botanical-mark" />
                <i />
              </div>
              <div className="story-copy">
                <p className="section-kicker">{t.storyKicker}</p>
                <h2 dangerouslySetInnerHTML={{ __html: t.storyTitle }} />
                <span className="short-rule" />
                <p>{t.storyText}</p>
                <div className="story-signature">{t.names}</div>
              </div>
              <span className="section-index">03</span>
            </section>

            {/*
            <section
              id="gallery"
              className="snap-section gallery-section"
            >
              <div className="gallery-heading">
                <p className="section-kicker">{t.galleryKicker}</p>
                <h2 dangerouslySetInnerHTML={{ __html: t.galleryTitle }} />
              </div>
              <div className="gallery-art" aria-hidden="true">
                <div className="gallery-arch">
                  <BotanicalOrnament className="gallery-botanical" />
                  <span className="gallery-rose"><GiFlowerStar className="botanical-mark" /></span>
                </div>
                <span className="gallery-seal">A <i><FiAperture className="seal-ornament" /></i> Y</span>
                <div className="gallery-petals"><i /><i /><i /><i /><i /></div>
              </div>
              <span className="section-index">04</span>
            </section>
            */}

            <section
              id="event"
              ref={(element) => { sectionRefs.current[3] = element; }}
              className="snap-section event-section"
            >
              <div className="event-floral-wash" aria-hidden="true" />
              <BotanicalOrnament className="event-botanical" />
              <div className="event-copy">
                <p className="section-kicker">{t.eventKicker}</p>
                <h2 dangerouslySetInnerHTML={{ __html: t.eventTitle }} />
                <div className="event-date-card">
                  <div className="event-date-info">
                    <div className="date-number"><span>{t.month}</span><strong>01</strong><small>2026</small></div>
                    <div className="date-details">
                      <p><span>{t.labels[2]}</span><strong>{t.weekday}</strong></p>
                      <p><span>{t.timeLabel}</span><strong>14:00</strong></p>
                      <p><span>{t.placeLabel}</span><strong>Bonu Restaurant</strong></p>
                    </div>
                  </div>
                  <div className="wedding-countdown" role="timer" aria-label={t.countdownTitle}>
                    <p className="countdown-title">{countdown ? t.countdownTitle : '\u00a0'}</p>
                    {countdown ? (
                      <div className="countdown-units">
                        {[countdown.days, countdown.hours, countdown.minutes, countdown.seconds].map((value, index) => (
                          <div className="countdown-unit" key={t.countdownUnits[index]}>
                            <strong>{String(value).padStart(2, '0')}</strong>
                            <span>{t.countdownUnits[index]}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="countdown-loading" aria-hidden="true">-- : -- : -- : --</p>
                    )}
                    {countdown?.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 && (
                      <p className="countdown-complete">{t.countdownComplete}</p>
                    )}
                  </div>
                </div>
                <p className="event-note">{t.eventNote}</p>
              </div>
              <span className="section-index">04</span>
            </section>

            <section
              id="location"
              ref={(element) => { sectionRefs.current[4] = element; }}
              className="snap-section location-section"
            >
              <div className="location-copy">
                <p className="section-kicker">{t.locationKicker}</p>
                <h2>{t.locationTitle}</h2>
                <p>{t.locationText}</p>
                <a className="map-button" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                  <span>{t.mapButton}</span><b aria-hidden="true"><FiArrowUpRight /></b>
                </a>
                <p className="location-address">{t.addressLabel} <span>Bonu Restaurant</span></p>
              </div>
              <a className="map-art" href={MAP_URL} target="_blank" rel="noopener noreferrer" aria-label={t.mapButton}>
                <div className="map-lines" aria-hidden="true" />
                <div className="map-park park-one" aria-hidden="true" />
                <div className="map-park park-two" aria-hidden="true" />
                <div className="map-road road-one" aria-hidden="true" />
                <div className="map-road road-two" aria-hidden="true" />
                <div className="map-pin" aria-hidden="true"><span><FiAperture /></span></div>
                <span className="map-caption">BONU<br />RESTAURANT</span>
                <span className="map-open-icon" aria-hidden="true"><FiArrowUpRight /></span>
              </a>
              <span className="section-index">05</span>
            </section>

            <section
              id="thanks"
              ref={(element) => { sectionRefs.current[5] = element; }}
              className="snap-section thanks-section"
            >
              <div className="thanks-seal" aria-hidden="true"><BotanicalOrnament /><GiFlowerStar className="botanical-mark" /></div>
              <div className="thanks-copy">
                <p className="section-kicker">{t.thanksKicker}</p>
                <span className="section-flourish" aria-hidden="true"><FiAperture className="ornament-icon" /></span>
                <h2 dangerouslySetInnerHTML={{ __html: t.thanksTitle }} />
                <p>{t.thanksText}</p>
                <div className="story-signature">{t.names}</div>
              </div>
              <span className="section-index">06</span>
            </section>

            <section
              id="final"
              ref={(element) => { sectionRefs.current[6] = element; }}
              className="snap-section final-section"
            >
              <div className="final-photo" aria-hidden="true" />
              <div className="final-overlay" />
              <div className="final-frame" aria-hidden="true" />
              <BotanicalOrnament className="final-botanical final-botanical-left" />
              <BotanicalOrnament className="final-botanical final-botanical-right" />
              <div className="final-copy">
                <p className="section-kicker">{t.finalKicker}</p>
                <h2 dangerouslySetInnerHTML={{ __html: t.finalTitle }} />
                <span className="hero-ornament" aria-hidden="true"><i /><FiAperture className="ornament-icon" /><i /></span>
                <p className="final-date">{t.finalDate}</p>
                <div className="final-names">{t.names}</div>
              </div>
              <span className="section-index">07</span>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
