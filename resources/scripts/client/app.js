import Header from './global/header';
import DropdownMenu from './global/dropdownMenu';
import Offcanvas from './global/offcanvas';
import OffcanvasNavigation from './global/offcanvasNavigation';
import { EditableSvg } from './utils/utilities';

import Testimonials from './blocks/testimonials';
import ContentSlider from './blocks/content-slider';
import LogoWallSlide from './blocks/logo-wall';
import Accordion from './blocks/accordion';
import Tabs from './blocks/tabs';
import { LightboxGallery } from './blocks/gallery';

document.addEventListener('DOMContentLoaded', function () {
	Testimonials();
	ContentSlider();
	LogoWallSlide();
	Accordion();
	Tabs();
	LightboxGallery();

	// editable svg
    Array.from(document.querySelectorAll('.editable-svg')).map((img) => EditableSvg(img));

	// site header
	const header = document.querySelector('.site-header');
	if (header) {
		new Header(header);
	}

	// dropdown menu
	DropdownMenu();

	// off canvas
	const offcanvas = document.querySelector('.offcanvas');
	if (offcanvas) {
		new Offcanvas(offcanvas);
	}
	OffcanvasNavigation();
});
