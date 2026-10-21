import { getImageProps } from "next/image"

import { heroImages } from "@/lib/site"

// Art direction (Next.js image docs): portrait photo below lg, landscape from lg.
// Below lg the photo is cropped right of centre so the scientist sits off to the side.
export function HeroImage() {
  const common = {
    alt: "",
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  } as const

  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, ...heroImages.desktop })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, ...heroImages.mobile })

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source srcSet={mobile} />
      <img
        {...rest}
        alt=""
        className="absolute inset-0 size-full object-cover object-[72%_bottom] lg:object-right"
      />
    </picture>
  )
}
