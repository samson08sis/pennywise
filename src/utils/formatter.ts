export const dateLabel = (date: string) => {
  const dateOnly = date.split("T")[0];
  const d = new Date(`${dateOnly}T12:00:00`);

  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
};
export const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount
  );
