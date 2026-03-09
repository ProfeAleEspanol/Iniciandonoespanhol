"use client";

import { createContext, startTransition, useContext, useEffect, useState } from "react";
import { clearStudentName, readStudentName, saveStudentName } from "@/lib/student-store";

type StudentSessionContextValue = {
  isReady: boolean;
  studentName: string;
  setStudentName: (name: string) => void;
  clearStudentSession: () => void;
};

const StudentSessionContext = createContext<StudentSessionContextValue | null>(null);

export function StudentSessionProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [studentName, setStudentNameState] = useState("");

  useEffect(() => {
    startTransition(() => {
      setStudentNameState(readStudentName());
      setIsReady(true);
    });
  }, []);

  function setStudentName(name: string) {
    const nextName = name.trim();
    saveStudentName(nextName);
    setStudentNameState(nextName);
  }

  function clearStudentSession() {
    clearStudentName();
    setStudentNameState("");
  }

  return (
    <StudentSessionContext.Provider
      value={{ isReady, studentName, setStudentName, clearStudentSession }}
    >
      {children}
    </StudentSessionContext.Provider>
  );
}

export function useStudentSession() {
  const context = useContext(StudentSessionContext);

  if (!context) {
    throw new Error("useStudentSession must be used within StudentSessionProvider");
  }

  return context;
}
