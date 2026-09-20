"use client";

import { useEffect, useState } from "react";
import type { ProfileSummary } from "@/lib/profile";

interface ProfileState {
  error: string | null;
  loading: boolean;
  profile: ProfileSummary | null;
}

export function useProfile() {
  const [state, setState] = useState<ProfileState>({
    error: null,
    loading: true,
    profile: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load profile");
        }

        if (isMounted) {
          setState({
            error: null,
            loading: false,
            profile: payload.profile,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            error:
              error instanceof Error ? error.message : "Unable to load profile",
            loading: false,
            profile: null,
          });
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
