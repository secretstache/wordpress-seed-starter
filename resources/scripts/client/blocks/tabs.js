const TABS_SELECTOR = '.wp-block-ssm-tabs';
const NAV_ITEM_SELECTOR = '.wp-block-ssm-tabs__nav-item';
const PANEL_SELECTOR = '.wp-block-ssm-tabs__panel';

export default function Tabs() {
    const tabsContainers = document.querySelectorAll(TABS_SELECTOR);

    tabsContainers.forEach((container) => {
        setupTabs(container);
    });
}

// TODO: refactor var names navItem/tab/etc.
function setupTabs(container) {
    const navItems = container.querySelectorAll(NAV_ITEM_SELECTOR);
    const panels = container.querySelectorAll(PANEL_SELECTOR);

    if (!navItems?.length) return;

    function activateTab(tab) {
        const targetId = tab.querySelector('a').getAttribute('href').substring(1);
        const targetPanel = container.querySelector(`#${targetId}`);

        navItems.forEach(item => {
            item.classList.remove('is-active');
            item.setAttribute('aria-selected', 'false');
        });

        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        panels.forEach(panel => {
            panel.classList.remove('is-active');
            panel.setAttribute('aria-hidden', 'true');
        });

        if (targetPanel) {
            targetPanel.classList.add('is-active');
            targetPanel.setAttribute('aria-hidden', 'false');
        }
    }


    navItems.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');

        const panel = panels[index];
        if (panel) {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', tab.id);
        }

        tab.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab(tab);
        });
    });

    if (navItems.length > 0) {
        activateTab(navItems[0]);
    }
}
