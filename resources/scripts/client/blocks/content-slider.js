import { Splide } from '@splidejs/splide';

const TEMPLATE_SELECTOR = '.wp-block-ssm-content-slider.layout-carousel';
const SPLIDE_SELECTOR = '.splide';
const SLIDE_SELECTOR = '.splide__slide';

export default function ContentSlider() {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        template.querySelectorAll(SPLIDE_SELECTOR).forEach((slider) => {
            setupSlider(slider);
        });
    });
}

export const setupSlider = (sliderEl, layoutType = 'default') => {
    const slides = sliderEl.querySelectorAll(SLIDE_SELECTOR);

    if (slides.length === 0) return;

    slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
            splide.go(idx);
        });
    });

    const commonOptions = {
        arrows: true,
        pagination: true,
        updateOnMove: true,
        rewind: true,
    };

    const layoutSpecificOptions = layoutType === 'full-width'
        ? {
            type: 'slider',
            perPage: 1,
            cover: true,
            focus: 'center',
            autoplay: true,
            interval: 5000,
            speed: 600,
        }
        : {
            autoWidth: true,
            focus: 'center',
            gap: 30,
        };

    const options = { ...commonOptions, ...layoutSpecificOptions };

    const splide = new Splide(sliderEl, options);
    splide.mount();

    return splide;
};
