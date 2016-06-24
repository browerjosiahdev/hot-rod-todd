'use strict';

	// Import the precompiled Handlebars templates.js file
import Templates from 'templates';

/**
 * This class defines the base functionality for html components. These
 * component classes define the component logic, while equivalent sass and
 * handlebars files define the component view.
 */
class ComponentBase {
	/**
	 * Constructor
	 * @param  {object} data           JSON data object
	 * @param  {HTMLElement} container HTML container
	 */
	constructor ( data, container ) {
    this.data = data;
    this.container = container;
		this.preprocess();
	}

	/**
	 * Process the data before it is used to populate the handlebars template.
	 */
	preprocess () {
		return this;
	}

	/**
	 * Initialize the component items.
	 */
	init () {
		const html = Handlebars.templates[this.data.template](this.data);
		this.container.innerHTML = html;
		return this;
	}

	destroy () {
		this.container.innerHTML = '';
		return this;
	}

	addClass ( className ) {
		this.container.classList.add(className);
		return this;
	}

	removeClass ( className ) {
		this.container.classList.remove(className);
		return this;
	}

	/**
	 * Show the component.
	 * @param  {boolean} noAnimate Should the show animation be suppressed?
	 */
	show ( noAnimate ) {
		if (noAnimate) {
			this.container.classList.add('no-animate');
		}
		else {
			this.container.classList.remove('no-animate');
		}
		this.container.classList.remove('hidden');
		return this;
	}

	/**
	 * Hide the component.
	 * @param  {boolean} noAnimate Should the hide animation be suppressed?
	 */
	hide ( noAnimate ) {
		if (noAnimate) {
			this.container.classList.add('no-animate');
		}
		else {
			this.container.classList.remove('no-animate');
		}
		this.container.classList.add('hidden');
		return this;
	}
}

export default ComponentBase
