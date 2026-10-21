import type { ProductDetail } from "./types"

type CompositionTableProps = Pick<
  ProductDetail,
  "unitStatement" | "ingredients" | "excipients" | "colour" | "composition"
>

export function CompositionTable({
  unitStatement,
  ingredients,
  excipients,
  colour,
  composition,
}: CompositionTableProps) {
  const rows = ingredients?.filter((row) => row.ingredient) ?? []

  return (
    <div className="rounded-card border border-blue-100 bg-white p-5 lg:p-7">
      <h2 className="font-heading text-2xl font-bold text-navy-900">Composition</h2>

      {rows.length > 0 ? (
        <table className="mt-4 w-full text-left text-sm">
          <caption className="mb-3 text-left text-[15px] text-ink-muted">
            {unitStatement || "Each unit contains:"}
          </caption>
          <thead>
            <tr className="border-b border-blue-100 text-ink">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Ingredient
              </th>
              <th scope="col" className="py-2 pr-3 font-semibold">
                Standard
              </th>
              <th scope="col" className="py-2 text-right font-semibold">
                Strength
              </th>
            </tr>
          </thead>
          <tbody className="text-ink-muted">
            {rows.map((row) => (
              <tr key={row._key} className="border-b border-line align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-ink">
                  {row.ingredient}
                </th>
                <td className="py-2.5 pr-3">{row.standard || "—"}</td>
                <td className="py-2.5 text-right">{row.strength || "—"}</td>
              </tr>
            ))}
            {excipients && (
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-2.5 pr-3 font-medium text-ink">
                  Excipients
                </th>
                <td className="py-2.5 pr-3" />
                <td className="py-2.5 text-right">{excipients}</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-[15px] text-ink-muted">{composition}</p>
      )}

      {colour && (
        <p className="mt-4 text-sm text-ink-muted">
          <span className="font-semibold text-ink">Colour:</span> {colour}
        </p>
      )}
    </div>
  )
}
