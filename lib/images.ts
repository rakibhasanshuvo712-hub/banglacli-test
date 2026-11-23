/** Self-hosted, optimized image served from /public/images. */
export function imageSrc(photoId: string): string {
  return `/images/${photoId}.webp`;
}
