import { getQuestions } from "@/lib/actions";

export default async function sitemap() {
  const allQuestions = await getQuestions("all");

  const questions = allQuestions.map((m: any) => {
    return {
      url: `https://1mi2mi.com/${m.category}/${m.id}`,
      lastModified: new Date(),
      priority: 1,
    };
  });

  return [...questions];
}
