export const STUDENT_NAME_KEY = "profe-ale-student-name";
export const LESSON_PROGRESS_KEY = "profe-ale-lesson-progress";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readStudentName() {
  if (!isBrowser()) {
    return "";
  }

  return window.localStorage.getItem(STUDENT_NAME_KEY) ?? "";
}

export function saveStudentName(name: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STUDENT_NAME_KEY, name.trim());
}

export function clearStudentName() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STUDENT_NAME_KEY);
}

export function readCompletedLessonIds() {
  if (!isBrowser()) {
    return new Set<string>();
  }

  const rawValue = window.localStorage.getItem(LESSON_PROGRESS_KEY);

  if (!rawValue) {
    return new Set<string>();
  }

  try {
    const lessonIds = JSON.parse(rawValue);
    return new Set(Array.isArray(lessonIds) ? lessonIds : []);
  } catch {
    return new Set<string>();
  }
}

export function saveCompletedLessonIds(lessonIds: Iterable<string>) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(Array.from(new Set(lessonIds))));
}
