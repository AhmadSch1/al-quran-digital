import { getAllSurah } from "@/lib/api";
import { SurahList } from "@/components/surah-list";

export default async function HomePage() {
  const surahs = await getAllSurah();

  return <SurahList surahs={surahs} />;
}
