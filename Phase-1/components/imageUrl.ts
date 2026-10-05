// Ask the photo host for a photo only as big as it will be shown.
// Pexels and Unsplash resize on their side when the URL says `w=…`, so a 24px
// tab icon no longer downloads an 800px photo. Any other link (for example a
// photo pasted in admin from another site) is returned unchanged.
export function sized(url: string | undefined, width: number): string {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname === 'images.pexels.com') {
      u.searchParams.set('auto', 'compress');
      u.searchParams.set('cs', 'tinysrgb');
      u.searchParams.set('w', String(width));
      return u.toString();
    }
    if (u.hostname === 'images.unsplash.com') {
      u.searchParams.set('w', String(width));
      u.searchParams.set('q', '75');
      u.searchParams.set('auto', 'format');
      return u.toString();
    }
  } catch {
    // relative path like /logo.png — leave as is
  }
  return url;
}
