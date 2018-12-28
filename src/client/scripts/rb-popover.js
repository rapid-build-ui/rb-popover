/*************
 * RB-POPOVER
 *************/
 import { props, html, RbBase } from '../../rb-base/scripts/rb-base.js';
 import view from '../../rb-base/scripts/view-directives.js';
 import '../../rb-button/scripts/rb-button.js';
 import template from '../views/rb-popover.html';

 export class RbPopover extends RbBase() {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.state = {
			coords: { popover: {}, pointer: {} },
			hasContent: false,
			position: null, // needed to set back original position
			retries: { // retries to make popover viewable (this prevents infinite loop)
				cnt: 0,
				limit: 3,
				reset() { // :void (mutator: cnt)
					this.cnt = 0;
				},
				isDone() { // :boolean (mutator: cnt)
					if (this.cnt <= this.limit) { this.cnt++; return false; }
					this.reset();
					return true;
				}
			}
		};
	}
	viewReady() {
		super.viewReady && super.viewReady();
		Object.assign(this.rb.elms, {
			trigger: this.shadowRoot.querySelector('rb-button'),
			popover: this.shadowRoot.querySelector('.popover'),
			pointer: this.shadowRoot.querySelector('.pointer'),
			caption: this.shadowRoot.querySelector('.caption')
		});
		this._hasContent(this.shadowRoot.querySelector('slot'));
		this.rb.events.add(window, 'click touchstart', this._windowClickToggle, {
			capture: true // so event fires first
		});
		if (this.showPopover) this.triggerUpdate();
	}

	/* Properties
	 *************/
	static get props() {
		return {
			caption: props.string,
			fitContent: props.boolean,
			hover: props.boolean,
			kind: props.string,
			pin: props.boolean, // popover only closes by clicking trigger
			unstyled: props.boolean,
			iconKind: props.string,
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

	/* Dimensions & Coordinates
	 ***************************/
	_getDimensions() { // :{}
		return {
			trigger: this.rb.elms.trigger.getBoundingClientRect(),
			popover: this.rb.elms.popover.getBoundingClientRect(),
			pointer: this.rb.elms.pointer.getBoundingClientRect(),
			caption: this.rb.elms.caption && this.rb.elms.caption.getBoundingClientRect(),
			viewport: {
				height: window.innerHeight,
				width:  window.innerWidth
			}
		}
	}
	_getPopoverCoords(dims) { // :{}
		return {
			pointerTop: dims.caption.height,
			popoverTop: (
				(dims.trigger.height / 2) -
				dims.caption.height - dims.pointer.height + 3 // + a little top bumper
			)
		}
	}

	/* Style Helpers
	 ****************/
	_clearTopStyles() { // :void
		this.state.coords.popover.top = null;
		this.state.coords.pointer.top = null;
	}
	_updateTopStyles(position, dims) { // :void
		if (['left','right'].indexOf(position) === -1)  return this._clearTopStyles(); // if top or bottom css handles positioning
		if (!(!!this.caption && this.state.hasContent)) return this._clearTopStyles(); // if not caption and content css handles positioning
		const coords = this._getPopoverCoords(dims);
		this.state.coords.popover.top = `${coords.popoverTop}px`;
		this.state.coords.pointer.top = `${coords.pointerTop}px`;
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
	_geViewablePosition(position) { // :string (counterclockwise)
		switch (position) {
			case 'right':  return 'top';
			case 'top':    return 'left';
			case 'left':   return 'bottom';
			case 'bottom': return 'right';
		}
	}

	/* Popover Positioning
	 **********************/
	async _setPosition() { // :void (recursive until viewable)
		if (await this.state.retries.isDone()) return;
		const dims = this._getDimensions();
		if (this.state.retries.cnt === 1) {
			this.state.position = this.position;
		} else {
			const isViewable = this._isViewable(dims);
			if (isViewable) return this.state.retries.reset();
			this.state.position = this._geViewablePosition(this.state.position);
		}
		this._updateTopStyles(this.state.position, dims);
		this.triggerUpdate(); // triggers rendered()
	}
	rendered() { // :void
		super.rendered && super.rendered();
		if (!this.showPopover) return;
		if (!this.rb.view.isReady) return;
		this._setPosition();
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
		if (this.pin) return;
		if (!this.showPopover) return;
		const path = e.composedPath();
		if (path.includes(this.rb.elms.popover)) return;
		if (path.includes(this.rb.elms.trigger)) return;
		this.showPopover = false;
	}

	/* Template
	 ***********/
	render({ props, state }) { // :string
		return html template;
	}
}

customElements.define('rb-popover', RbPopover);