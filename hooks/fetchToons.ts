import { Toons, Webtoon } from "@/constants/comcom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getToonsByDay(
  toons: Toons,
  day: string,
  random: boolean = false,
  limit: number = 20
): Webtoon[] {
  const dayData = toons.ONGOING.find(
    (toonData) => toonData.day.toLowerCase() === day.toLowerCase()
  );

  if (!dayData) return [];

  const webtoons = dayData.webtoons;

  if (random) {
    return webtoons.sort(() => Math.random() - 0.5).slice(0, limit);
  }

  return webtoons.slice(0, limit);
}

export function getToonsByFiveGenresWithMostLiked(
  toons: Toons
): Record<string, Webtoon[]> {
  const genreLikes: Record<string, Webtoon[]> = {};

  toons.ONGOING.forEach(({ webtoons }) => {
    webtoons.forEach((toon) => {
      const genre = toon.genre || "Unknown";
      if (!genreLikes[genre]) {
        genreLikes[genre] = [];
      }
      genreLikes[genre].push(toon);
    });
  });

  const sortedGenres = Object.entries(genreLikes)
    .sort(([, a], [, b]) => {
      const totalLikesA = a.reduce(
        (sum, toon) => sum + parseInt(toon.likes || "0"),
        0
      );
      const totalLikesB = b.reduce(
        (sum, toon) => sum + parseInt(toon.likes || "0"),
        0
      );
      return totalLikesB - totalLikesA;
    })
    .slice(0, 1);

  return Object.fromEntries(sortedGenres);
}

export function getLeastLikedToons(
  toons: Toons,
  limit: number = 20
): Webtoon[] {
  const allToons: Webtoon[] = [];

  toons.ONGOING.forEach(({ webtoons }) => {
    allToons.push(...webtoons);
  });

  return allToons
    .sort((a, b) => parseInt(a.likes || "0") - parseInt(b.likes || "0"))
    .slice(0, limit);
}

export function getAverageLikedToons(
  toons: Toons,
  limit: number = 20
): Webtoon[] {
  const allToons: Webtoon[] = [];

  toons.ONGOING.forEach(({ webtoons }) => {
    allToons.push(...webtoons);
  });

  const totalLikes = allToons.reduce(
    (sum, toon) => sum + parseInt(toon.likes || "0"),
    0
  );
  const averageLikes = totalLikes / allToons.length;

  return allToons
    .filter(
      (toon) =>
        parseInt(toon.likes || "0") >= averageLikes * 0.9 &&
        parseInt(toon.likes || "0") <= averageLikes * 1.1
    )
    .slice(0, limit);
}

export function getToonsByGenre(
  toons: Toons,
  genre: string,
  limit: number = 20
): Webtoon[] {
  const allToons: Webtoon[] = [];

  toons.ONGOING.forEach(({ webtoons }) => {
    allToons.push(...webtoons);
  });

  return allToons
    .filter((toon) => toon.genre?.toLowerCase() === genre.toLowerCase())
    .slice(0, limit);
}

export function getToonsByAuthor(
  toons: Toons,
  author: string,
  limit: number = 20
): Webtoon[] {
  const allToons: Webtoon[] = [];

  toons.ONGOING.forEach(({ webtoons }) => {
    allToons.push(...webtoons);
  });

  return allToons
    .filter((toon) => toon.author?.toLowerCase().includes(author.toLowerCase()))
    .slice(0, limit);
}
