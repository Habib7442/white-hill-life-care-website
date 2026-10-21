import type { ProductDetail } from "./types"

type StorageCardProps = Pick<ProductDetail, "directions" | "storage" | "manufacturer">

export function StorageCard({ directions, storage, manufacturer }: StorageCardProps) {
  const maker = manufacturer?.name || manufacturer?.address || manufacturer?.licenceNo

  if (!directions && !storage && !maker) return null

  return (
    <div className="rounded-card border border-blue-100 bg-white p-5 lg:p-7">
      <h2 className="font-heading text-2xl font-bold text-navy-900">Storage &amp; Handling</h2>

      <dl className="mt-4 flex flex-col gap-4 text-[15px]">
        {directions && (
          <div>
            <dt className="font-semibold text-ink">Dosage</dt>
            <dd className="text-ink-muted">{directions}</dd>
          </div>
        )}
        {storage && (
          <div>
            <dt className="font-semibold text-ink">Storage</dt>
            <dd className="whitespace-pre-line text-ink-muted">{storage}</dd>
          </div>
        )}
        {maker && (
          <div>
            <dt className="font-semibold text-ink">Manufactured by</dt>
            <dd className="text-ink-muted">
              {manufacturer?.name && <span className="block text-ink">{manufacturer.name}</span>}
              {manufacturer?.address && (
                <span className="block whitespace-pre-line">{manufacturer.address}</span>
              )}
              {/* Some packs give a different licence (e.g. "FSSAI Lic. No. …"),
                  so the default label is added only when the value has none. */}
              {manufacturer?.licenceNo && (
                <span className="block">
                  {/\blic\b/i.test(manufacturer.licenceNo)
                    ? manufacturer.licenceNo
                    : `Mfg. Lic. No.: ${manufacturer.licenceNo}`}
                </span>
              )}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}
