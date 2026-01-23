export function formateTime(duration: string) {
  return `${Math.trunc(Number(duration) / 60)}:${String(
    Number(duration) % 60
  ).padStart(2, "0")}`;
}

export function formateTimePading(duration: number) {
  return `${Math.trunc(duration / 60)}:${(duration % 60)
    .toString()
    .padStart(2, "0")}`;
}
