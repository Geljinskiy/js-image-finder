export function makeLayout({
  src,
  alt,
  likes,
  views,
  comments,
  downloads,
} = {}) {
  return `<div class="photo-card">
  <img class="gallery-image" src="${src}" alt="${alt}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
}
