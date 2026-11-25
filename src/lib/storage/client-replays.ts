import { DecisionReplay } from "@/types";

const STORAGE_KEY = "reality_replay_client_store_v1";

export function getClientReplays(): DecisionReplay[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : Object.values(parsed);
  } catch {
    return [];
  }
}

export function getClientReplayById(id: string): DecisionReplay | null {
  const all = getClientReplays();
  return all.find((r) => r.id === id) || null;
}

export function saveClientReplay(replay: DecisionReplay): void {
  if (typeof window === "undefined") return;
  try {
    const all = getClientReplays();
    const idx = all.findIndex((r) => r.id === replay.id);
    if (idx >= 0) {
      all[idx] = replay;
    } else {
      all.unshift(replay);
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.warn("Could not save replay to localStorage:", e);
  }
}

export function deleteClientReplay(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = getClientReplays().filter((r) => r.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.warn("Could not delete replay from localStorage:", e);
  }
}
