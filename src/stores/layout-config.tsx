import { atom } from "nanostores";

export const $cardOrientation = atom<"vertical" | "horizontal">("horizontal");

export function toggleCardOrientation() {
  $cardOrientation.set(
    $cardOrientation.get() == "vertical" ? "horizontal" : "vertical",
  );
}

export const $layoutOrientation = atom<"list" | "grid">("list");

export function toggleLayoutOrientation() {
  $layoutOrientation.set($layoutOrientation.get() == "list" ? "grid" : "list");

  if ($layoutOrientation.get() == "list") $cardOrientation.set("horizontal");
}
