import { CATEGORY_COLORS } from "@/constants/Colors";
import { ExpenseSummary } from "@/types/expense";
import { money } from "@/utils/formatter";

export function SpendingByCategory({ summary }: { summary: ExpenseSummary }) {
  const breakdown = summary.categoryBreakdown || [];
  const total = summary.totalExpenses || 1;

  let cumulativePercent = 0;
  const gradientStops = breakdown.map((item, index) => {
    const percent = (item.total / total) * 100;
    const start = cumulativePercent;
    cumulativePercent += percent;
    const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
    return `${color} ${start.toFixed(1)}% ${cumulativePercent.toFixed(1)}%`;
  });

  const backgroundGradient =
    gradientStops.length > 0
      ? `conic-gradient(${gradientStops.join(", ")})`
      : "#e8ebef";

  return (
    <section className="rounded-xl border border-[#e8ebef] bg-white p-5">
      <h2 className="font-semibold">Spending by category</h2>
      <p className="mt-1 text-sm text-[#89929f]">
        {new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Donut Chart */}
      <div
        className="mx-auto mt-7 flex h-44 w-44 items-center justify-center rounded-full"
        style={{ background: backgroundGradient }}>
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-center">
          <span className="text-xl font-semibold">
            {money(summary.totalExpenses)}
          </span>
          <span className="mt-1 text-xs text-[#89929f]">Total spent</span>
        </div>
      </div>

      {/* Chart Keys / Legend */}
      <div className="mt-6 divide-y divide-[#f0f2f5]">
        {breakdown.map((item, index) => {
          const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
          const percentage = ((item.total / total) * 100).toFixed(1);

          return (
            <div
              key={item.category}
              className="flex items-center justify-between py-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium text-[#1c2024] capitalize">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#89929f]">{percentage}%</span>
                <span className="font-semibold text-[#1c2024]">
                  {money(item.total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
