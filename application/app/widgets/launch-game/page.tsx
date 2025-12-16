import { ArcadeGameWidget } from "@/components/arcade-game-widget";

export default async function LaunchGameWidget({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const game = typeof params.game === "string" ? params.game : undefined;
  return <ArcadeGameWidget initialGame={game} />;
}

