// Decides before first paint whether the home page splash plays.
// It plays only on the first load of "/" in a browser tab. Reloads, Back,
// returning to Home from another page, or landing on another page first all
// set <html data-splash="skip">, which hides the Preloader (app/globals.css).
// The attribute stays on <html> across client-side navigations, so a remounted
// Preloader stays hidden too.
// If sessionStorage is blocked (it throws), `seen` stays true and the splash is
// skipped, rather than replaying on every load.
const script = `(function(){var d=document.documentElement,seen=true;try{var k="wh-splash-seen";seen=!!sessionStorage.getItem(k);sessionStorage.setItem(k,"1")}catch(e){}if(seen||location.pathname!=="/"){d.dataset.splash="skip"}else{setTimeout(function(){d.dataset.splash="skip"},2900)}})()`

/**
 * Inline script that runs during HTML parsing, before the Preloader renders.
 * Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md:
 * "text/plain" on the client avoids React's dev warning about rendering scripts.
 */
export function SplashGate() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
}
