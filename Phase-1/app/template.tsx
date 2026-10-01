// Runs on every page change: the new page fades in softly.
// Opacity only (no movement) so popups and the sticky header keep working.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
