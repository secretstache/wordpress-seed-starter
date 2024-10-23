import lightGallery from 'lightgallery';
export function LightboxGallery() {
  const galleries = document.querySelectorAll('.wp-block-gallery');

  galleries.forEach((gallery) => {
    const regexImage = /.+\.(gif|jpe?g|png|webp|svg|avif|heif|heic|tif?f|)($|\?)/i;
    const images = gallery.querySelectorAll('.wp-block-image');

    let isLightbox = false;

    images.forEach((image) => {
      const link = image.querySelector('a');

      if(link && regexImage.test(link.getAttribute('href'))) {
        isLightbox = true;
        link.classList.add('lightgallery-item');
      }
    });

    if(isLightbox) {
      lightGallery(gallery, {
        licenseKey: '4B0B052C-5BCB4CCF-99EF0E30-D0B78394',
        selector: '.lightgallery-item',
        download: false,
      });
    }
  });
}