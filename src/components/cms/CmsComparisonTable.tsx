import React from "react";
import { checkMark } from "./CmsRichText";

/**
 * ERP Page Creation "Comparison Table" / "Difference Table" sections. They
 * arrive as `richText` with `content.erpType` and a structured `content.table`
 * (columns + rows, cell 0 = row name). When the table is valid it is rendered
 * here in the site's style; otherwise the renderer falls back to `bodyHtml`.
 */

const MAX_COLUMNS = 12;
const MAX_ROWS = 200;
const MAX_CELL_LENGTH = 1000;

export interface ComparisonTableData {
  erpType: "comparisonTable" | "differenceTable";
  heading: string;
  note: string;
  columns: string[];
  rows: string[][];
  /** Index of the highlighted column (never 0), or -1. */
  highlight: number;
  highlightLabel: string;
}

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((cell) => typeof cell === "string" && cell.length <= MAX_CELL_LENGTH);

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function parseComparisonTable(content: Record<string, unknown>): ComparisonTableData | null {
  const erpType = content.erpType;
  if (erpType !== "comparisonTable" && erpType !== "differenceTable") return null;
  const table = content.table;
  if (typeof table !== "object" || table === null || Array.isArray(table)) return null;
  const { columns, rows } = table as Record<string, unknown>;
  if (!isStringArray(columns) || columns.length < 2 || columns.length > MAX_COLUMNS) return null;
  if (!Array.isArray(rows) || rows.length > MAX_ROWS || !rows.every(isStringArray)) return null;

  const wanted = str(content.highlight).toLowerCase();
  const highlight = wanted ? columns.findIndex((column, index) => index > 0 && column.trim().toLowerCase() === wanted) : -1;
  return {
    erpType,
    heading: str(content.heading),
    note: str(content.note),
    columns,
    // Every row as wide as the header.
    rows: (rows as string[][]).map((row) => columns.map((_, index) => row[index] ?? "")),
    highlight,
    highlightLabel: highlight > 0 ? str(content.highlightLabel) : "",
  };
}

function Cell({ value, highlighted }: { value: string; highlighted: boolean }) {
  const mark = checkMark(value);
  return (
    <td
      className={[
        "border-b border-l border-foreground/10 px-4 py-3.5 align-top md:px-5",
        mark ? "text-center" : "",
        mark === "yes" ? "text-lg font-bold text-green-600" : "",
        mark === "no" ? "text-lg text-muted-foreground/60" : "",
        highlighted ? "bg-[#FF3D77]/[0.06]" : "",
      ].join(" ")}
    >
      {mark ? <span aria-label={mark === "yes" ? "Yes" : "No"}>{value.trim()}</span> : value}
    </td>
  );
}

export function CmsComparisonTable({ data, sectionClassName }: { data: ComparisonTableData; sectionClassName: string }) {
  const { columns, rows, highlight, highlightLabel } = data;
  return (
    <div className={sectionClassName}>
      {data.heading && (
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">{data.heading}</h2>
      )}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-foreground/10 [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm md:text-base">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={[
                    "border-b border-foreground/10 bg-foreground/[0.04] px-4 py-4 align-bottom font-semibold md:px-5",
                    index > 0 ? "border-l" : "sticky left-0 z-10 bg-background",
                    index === highlight ? "border-t-2 border-t-[#FF3D77] bg-[#FF3D77]/[0.08] text-[#FF3D77]" : "",
                  ].join(" ")}
                >
                  <span className="flex flex-wrap items-center gap-2">
                    {column}
                    {index === highlight && highlightLabel && (
                      <span className="rounded-full bg-[#FF3D77] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {highlightLabel}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-foreground/[0.025] [&:last-child>*]:border-b-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-b border-foreground/10 bg-background px-4 py-3.5 align-top font-semibold md:px-5"
                >
                  {row[0]}
                </th>
                {row.slice(1).map((cell, index) => (
                  <Cell key={index} value={cell} highlighted={index + 1 === highlight} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.note && <p className="mt-4 text-sm leading-relaxed opacity-70">{data.note}</p>}
    </div>
  );
}
