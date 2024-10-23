const ACTIVE_CLASS = 'is-active';
const OFFCANVAS_NAVIGATION = '.offcanvas__navigation';
const OFFCANVAS_MENU_ITEM_HAS_SUBMENU = '.menu-item-has-children, .mega-menu__sub-menu .menu-item-has-children';
const OFFCANVAS_MEGA_MENU = '.mega-menu';
const OFFCANVAS_MEGA_MENU_SUBMENU = '.mega-menu__sub-menu';
const ARROW_CLASS = 'dropdown-arrow';

export default function OffcanvasNavigation() {
    document.querySelectorAll(OFFCANVAS_NAVIGATION).forEach((offcanvasNavigation) => {
        let dropdownItems = offcanvasNavigation.querySelectorAll(OFFCANVAS_MENU_ITEM_HAS_SUBMENU);

        dropdownItems.forEach((dropdownItem) => {
            const innerMenu = dropdownItem.querySelector(`${OFFCANVAS_MEGA_MENU}, ${OFFCANVAS_MEGA_MENU_SUBMENU}`);

            if (innerMenu) {

                const link = dropdownItem.querySelector('a');
                const arrow = dropdownItem.querySelector(`.${ARROW_CLASS}`);

                dropdownItem.innerHTML = '';

                const div = document.createElement('div');
                div.classList.add('arrow-wrapper');

                div.appendChild(link);
                div.appendChild(arrow);

                dropdownItem.appendChild(div);
                dropdownItem.appendChild(innerMenu);

                const arrowWrapper = dropdownItem.querySelector(`.arrow-wrapper`);

                arrowWrapper.addEventListener('click', () => {
                    const hasActiveClass = dropdownItem.classList.contains(ACTIVE_CLASS);

                    if (hasActiveClass) {
                        dropdownItem.classList.remove(ACTIVE_CLASS);
                    } else {
                        dropdownItem.classList.add(ACTIVE_CLASS);
                    }
                    
                });
            }
        });
    });
}