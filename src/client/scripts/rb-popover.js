/*************
 * RB-POPOVER
 *************/
import { props, withComponent } from '../../../skatejs/dist/esnext/index.js';
import { html, withRenderer } from './renderer.js';
import EventService from './event-service.js';
import '../../rb-button/scripts/rb-button.js';
import template from '../views/rb-popover.html';

export class RbPopover extends withComponent(withRenderer()) {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.rbEvent = EventService.call(this);
		this.state = {
			hasContent: false,
			// needed to set back original position
			position: null,
			// retries to make popover viewable
			// this prevents infinite loop
			retries: {
				cnt: 0,
				limit: 3,
				reset() { // :void (mutator: cnt)
					this.cnt = 0;
				},
				isDone() { // :boolean
					if (this.cnt <= this.limit) return false;
					this.reset();
					return true;
				}
			}
		};
	}
	viewReady() {
		super.viewReady && super.viewReady();
		this.elms = {
			rbPopover: this.shadowRoot.querySelector('.rb-popover'),
			trigger:   this.shadowRoot.querySelector('rb-button'),
			popover:   this.shadowRoot.querySelector('.popover'),
			pointer:   this.shadowRoot.querySelector('.pointer'),
			caption:   this.shadowRoot.querySelector('.caption')
		}
		this._hasContent(this.shadowRoot.querySelector('slot'));
		this.rbEvent.add(window, 'window', 'click touchstart', '_windowClickToggle');
	}
	disconnected() {
		this.rbEvent.remove(window, 'window', 'click touchstart', '_windowClickToggle');
	}

	/* Properties
	 *************/
	static get props() {
		return {
			caption: props.string,
			fitContent: props.boolean,
			hover: props.boolean,
			kind: props.string,
			unstyled: props.boolean,
			icon: props.string,
			iconSize: props.number,
			iconSource: props.string,
			position: Object.assign({}, props.string, {
				default: 'right'
			}),
			showPopover: Object.assign({}, props.boolean, {
				deserialize(val) {
					return /^true$/i.test(val);
				}
			})
		}
	}

	/* View Updaters
	 ****************/
	_updateCssPositionClass(action, position = null) { // :void
		const cssClasses = action === 'add' ? [position] : ['left','right','top','bottom'];
		this.elms.rbPopover.classList[action](...cssClasses);
	}
	_updateCssTopStyles(action, dims) { // :void
		if (action === 'remove') {
			this.elms.pointer.style.top = null;
			this.elms.popover.style.top = null;
			return;
		}
		// must be positioned left or right and have caption and content (css handles the rest)
		if (['left','right'].indexOf(this.state.position) === -1) return;
		if (!(!!this.caption && this.state.hasContent)) return;
		const coords = this._getPopoverCoords(dims);
		this.elms.popover.style.top = `${coords.popoverTop}px`;
		this.elms.pointer.style.top = `${coords.pointerTop}px`;
	}

	/* Coordinates & Dimensions
	 ***************************/
	_getPopoverCoords(dims) { // :{}
		return {
			pointerTop: dims.caption.height,
			popoverTop: (
				(dims.trigger.height / 2) -
				dims.caption.height - dims.pointer.height + 3 // + a little top bumper
			)
		}
	}
	_getDimensions() { // :{}
		return {
			trigger: this.elms.trigger.getBoundingClientRect(),
			popover: this.elms.popover.getBoundingClientRect(),
			pointer: this.elms.pointer.getBoundingClientRect(),
			caption: this.elms.caption && this.elms.caption.getBoundingClientRect(),
			viewport: {
				height: window.innerHeight,
				width:  window.innerWidth
			}
		}
	}

	/* Positioning
	 **************/
	_resetPosition(position = null) { // :void
		this.state.position = position || this.position;
		this._updateCssTopStyles('remove');
		this._updateCssPositionClass('remove');
	}
	_setPosition(position = null) { // :void (recursive until viewable)
		if (this.state.retries.isDone()) return; // see retries.limit
		// Bootstrap
		this._resetPosition(position);
		let dims = this._getDimensions();

		// Update View
		this._updateCssTopStyles('add', dims); // conditionally see method
		this._updateCssPositionClass('add', this.state.position);

		// Is Viewable?
		dims = this._getDimensions();
		const isViewable = this._isViewable(dims);
		if (isViewable) return this.state.retries.reset();

		// Make Viewable
		position = this._geViewablePosition(dims, this.state.position, this.state.retries.cnt);
		this.state.retries.cnt++;
		this._setPosition(position);
	}

	/* Make Viewable
	 ****************/
	_isViewable(dims) { // :boolean (relative to viewport)
		return (
			dims.popover.top    >= 0 &&
			dims.popover.left   >= 0 &&
			dims.popover.bottom <= dims.viewport.height &&
			dims.popover.right  <= dims.viewport.width
		)
	}
	_geViewablePosition(dims, position, retry) { // :string
		let newPosition;
		switch (true) {
			case position === 'left':
				newPosition = retry === 1 ? 'bottom' : 'right';
				break;
			case position === 'right':
				newPosition = retry === 1 ? 'bottom' : 'left';
				break;
			case position === 'top':
				newPosition = retry === 1 ? 'right' : 'bottom';
				break;
			case position === 'bottom':
				newPosition = retry === 1 ? 'right' : 'top';
				break;
		}
		return newPosition;
	}

	/* Slot Event Handlers
	 **********************/
	_trimSlot(slot) { // :void (mutator: slot.textContent)
		for (const child of slot.assignedNodes()) {
			if (child.nodeType !== 3) continue;
			const text = child.textContent;
			if (!text) continue;
			if (child.nextSibling && child.nextSibling.nodeType === 1) {
				child.textContent = text.trimLeft();
				continue;
			}
			child.textContent = text.trim();
		}
	}
	_hasContent(e) { // :void
		const slot = e.tagName ? e : e.currentTarget;
		this._trimSlot(slot);
		this.state.hasContent = false;
		for (const child of slot.assignedNodes()) {
			if (child.nodeType === 1) {
				this.state.hasContent = true;
				break;
			}
			if (child.nodeType !== 3) continue;
			if (!child.textContent.length) continue;
			this.state.hasContent = true; break;
		}
		const action = this.state.hasContent ? 'add' : 'remove';
		this.shadowRoot.querySelector('.rb-popover').classList[action]('with-content');
	}

	/* Event Handlers
	 *****************/
	_clickToggle(e) { // :void
		this.showPopover = !this.showPopover;
	}
	_hoverToggle(e) { // :void
		if (!this.hover) return;
		if (this.showPopover) return;
		this.showPopover = true;
	}
	_windowClickToggle(e) { // :void
		if (!this.showPopover) return;
		const path = e.composedPath();
		if (path.includes(this.elms.popover)) return;
		if (path.includes(this.elms.trigger)) return;
		this.showPopover = false;
	}

	/* Observer
	 ***********/
	async rendered() { // :void
		if (!this.elms) return;
		if (!this.elms.pointer) return;
		if (!this.showPopover) return;
		// await to ensure trigger/rb-button has dimensions
		// TODO: find better way to ensure sub-component are ready
		await(async()=>{})();
		this._setPosition();
	}

	/* Template
	 ***********/
	render({ props }) { // :string
		return html template;
	}
}

customElements.define('rb-popover', RbPopover);