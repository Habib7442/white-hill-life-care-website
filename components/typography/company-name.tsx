import { company } from "@/lib/site"

type CompanyNameProps = {
  /** Use the registered name ("WhiteHill Lifecares Pvt Ltd"). */
  legal?: boolean
}

// The company name is always set in bold wherever it appears in copy.
export function CompanyName({ legal = false }: CompanyNameProps) {
  return (
    <strong className="font-semibold text-navy-900">
      {legal ? company.legalName : company.name}
    </strong>
  )
}
