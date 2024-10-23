import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Intersection } from '@splidejs/splide-extension-intersection';

const SPLIDE_SELECTOR = '.wp-block-ssm-logo-wall .splide';
const SLIDE_CLASS = 'splide__slide';

export default function LogoWallSlide() {
    document.querySelectorAll(SPLIDE_SELECTOR).forEach((logoWallSlide) => {
        initLogoWall(logoWallSlide);
    });
}

export const initLogoWall = (carousel) => {
    const slidesLength = carousel.querySelectorAll(`.${SLIDE_CLASS}`).length;

    if (!carousel) return;

    const options = {
        arrows: false,
        pagination: false,
        type: 'loop',
        gap: 100,
        autoWidth: true,
        breakpoints: {
            768: {
                gap: 50,
            },
        },
        autoScroll: {
            pauseOnHover: true,
            pauseOnFocus: false,
            rewind: false,
            speed: 0.9,
        },
        intersection: {
            inView: {
                autoScroll: true,
            },
            outView: {
                autoScroll: false,
            },
        },
    };

    const splide = new Splide(carousel, options);

    splide.on('overflow', function (isOverflow) {
        if (isOverflow) {
            carousel.classList.remove('is-centered');

            splide.options = {
                type: 'loop',
                clones: slidesLength,
                drag: true,
            };
        } else {
            splide.options = {
                clones: 0,
                type: 'slide',
                destroy: true,
                drag: false,
            };

            carousel.classList.add('is-centered');
        }
    });

    splide.mount({ AutoScroll, Intersection });

    return splide;
};
