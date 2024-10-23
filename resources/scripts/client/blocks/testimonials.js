import Splide from '@splidejs/splide';

const TEMPLATE_CLASS = '.wp-block-ssm-testimonials';
const SLIDER_CLASS = '.splide';
const ITEM_CLASS = '.testimonials__item';
const PAGINATION_ITEM_CLASS = '.splide__pagination__page';

export default function Testimonials() {
    document.querySelectorAll(TEMPLATE_CLASS).forEach((template) => {
        const carousel = template.querySelector(SLIDER_CLASS);
        if (carousel) {
            setupSlider(carousel);
        }
    });
}

export function setupSlider(carousel) {
    if (!carousel) return;

    const splide = new Splide(carousel);

    splide.on('pagination:mounted', function () {
        const paginationItems = carousel.querySelectorAll(PAGINATION_ITEM_CLASS);
        const slides = carousel.querySelectorAll(ITEM_CLASS);

        slides.forEach((slide, index) => {
            const dataImage = slide.dataset.image;
            if (paginationItems[index]) {
                paginationItems[index].style.backgroundImage = `url('${dataImage}')`;
            }
        });
    });

    splide.mount();

    return splide;
}
