import { throttle } from '../utils/utilities';

const STICKY_CLASS = 'sticky';

function Header(header) {
    const sticky = 0;

    const stickyHeader = () => {
        if (window.scrollY > sticky) {
            header.classList.add(STICKY_CLASS, 'top-0', 'left-0');
        } else {
            header.classList.remove(STICKY_CLASS, 'top-0', 'left-0');
        }
    };

    stickyHeader();

    const scrollCallback = throttle(stickyHeader, 100);
    window.addEventListener('scroll', scrollCallback);
}

export default Header;
