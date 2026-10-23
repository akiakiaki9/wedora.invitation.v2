const METADATA = {
  ru: {
    title: 'Алишер и Юлдуз — свадебное приглашение',
    description: 'Приглашение на свадьбу Алишера и Юлдуз. 1 ноября 2026 года, в 14:00, Bonu Restaurant.',
  },
  en: {
    title: 'Alisher & Yulduz — Wedding invitation',
    description: 'Wedding invitation for Alisher and Yulduz. November 1, 2026 at 2:00 PM, Bonu Restaurant.',
  },
  uz: {
    title: 'Alisher va Yulduz — to‘y taklifnomasi',
    description: 'Alisher va Yulduzning to‘yiga taklifnoma. 2026-yil 1-noyabr, soat 14:00, Bonu Restaurant.',
  },
  oz: {
    title: 'Алишер ва Юлдуз — тўй таклифномаси',
    description: 'Алишер ва Юлдузнинг тўйига таклифнома. 2026-йил 1-ноябрь, соат 14:00, Bonu Restaurant.',
  },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return METADATA[lang] || METADATA.ru;
}

export default function LanguageLayout({ children }) {
  return children;
}
