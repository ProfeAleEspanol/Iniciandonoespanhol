import { cookies } from "next/headers";

const COOKIE_NAME = "profe-ale-progress";

function normalizeLessonIds(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getCompletedLessonIds() {
  const cookieStore = await cookies();
  return new Set(normalizeLessonIds(cookieStore.get(COOKIE_NAME)?.value));
}

export async function saveCompletedLessonIds(lessonIds: Iterable<string>) {
  const cookieStore = await cookies();
  const value = Array.from(new Set(Array.from(lessonIds))).join(",");

  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}
