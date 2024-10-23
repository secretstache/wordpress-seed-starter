const BLOCK_SELECTOR = '.wp-block-ssm-accordion, .wp-block-ssm-horizontal-accordion';
const ITEM_SELECTOR = '.wp-block-ssm-accordion__item, .wp-block-ssm-horizontal-accordion__item';
const HEADER_SELECTOR = '.wp-block-ssm-accordion__header, .wp-block-ssm-horizontal-accordion__header';
const CONTENT_SELECTOR = '.wp-block-ssm-accordion__content, .wp-block-ssm-horizontal-accordion__content';

const OPEN_CLASS = 'is-opened';
const HEADER_CLOSED_CLASS = 'h-full';
const CONTENT_OPEN_CLASS = 'mt-2';

export default function Accordion() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((el) => {
        setupAccordion(el);
    });
}

export function setupAccordion(template) {
    const accordionItems = template.querySelectorAll(ITEM_SELECTOR);

    if (!accordionItems) return;

    const open = (item) => {
        const content = item.querySelector(CONTENT_SELECTOR);
        const header = item.querySelector(HEADER_SELECTOR);
        if (!content) return;
        item.classList.add(OPEN_CLASS);
        header.classList.remove(HEADER_CLOSED_CLASS);
        content.classList.add(CONTENT_OPEN_CLASS);
        content.style.maxHeight = content.scrollHeight + 'px';
    };

    const close = (item) => {
        const content = item.querySelector(CONTENT_SELECTOR);
        const header = item.querySelector(HEADER_SELECTOR);
        if (!content) return;
        item.classList.remove(OPEN_CLASS);
        header.classList.add(HEADER_CLOSED_CLASS);
        content.classList.remove(CONTENT_OPEN_CLASS);
        content.style.maxHeight = 0;
    };

    const toggle = (item) => {
        if (item.classList.contains(OPEN_CLASS)) {
            close(item);
        } else {
            const currentItem = item.parentElement.querySelector(`.${OPEN_CLASS}`);
            if (currentItem) close(currentItem);
            open(item);
        }
    };

    const isOpenedByDefault = template.classList.contains('is-opened-by-default');

    if (isOpenedByDefault) {
        open(accordionItems[0]);
    }

    accordionItems.forEach((item) => {
        const header = item.querySelector(HEADER_SELECTOR);

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    if (item.classList.contains(OPEN_CLASS)) {
                        const content = item.querySelector(CONTENT_SELECTOR);
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                }
            }
        });

        resizeObserver.observe(item);

        header.addEventListener('click', () => toggle(item));
    });
}
