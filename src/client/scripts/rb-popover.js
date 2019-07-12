/*************
 * RB-POPOVER
 *************/
 import { RbBase, props, html } from '../../base/scripts/base.js';
 import Converter               from '../../base/scripts/public/props/converters.js';
 import View                    from '../../base/scripts/public/view/directives.js';
 import template                from '../views/rb-popover.html';
 import '../../rb-button/scripts/rb-button.js';

 export class RbPopover extends RbBase() {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.version = '0.0.17';
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
		this.rb.events.host.add(['click']);
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
		this._attachEvents();
		if (this.open) this.triggerUpdate();
	}

	/* Properties
	 *************/
	static get props() {
		return {
			caption: props.string,
			fitContent: props.boolean,
			hover: props.boolean,
			pin: props.boolean, // popover only closes by clicking trigger
			iconFlip: props.string,
			iconKind: props.string,
			iconSize: props.number,
			iconSpeed: props.number,
			iconRotate: props.number,
			iconSource: props.string,
			iconValign: props.string,
			inheritColor: props.boolean,
			kind: Object.assign({}, props.string, {
				default: 'default'
			}),
			open: Object.assign({}, props.boolean, {
				deserialize: Converter.boolean
			}),
			position: Object.assign({}, props.string, {
				default: 'top'
			}),
			iconBurst: Object.assign({}, props.boolean, {
				deserialize: Converter.valueless
			}),
			iconPulse: Object.assign({}, props.boolean, {
				deserialize: Converter.valueless
			}),
			iconSpin: Object.assign({}, props.boolean, {
				deserialize: Converter.valueless
			})
		}
	}

	/* Getters
	 **********/
	get _hasOnclick() { // :boolean (readonly)
		return !!this.rb.events.host.events.click;
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
		if (!this.open) return;
		if (!this.rb.view.isReady) return;
		this._setPosition();
	}

	/* Event Management
	 *******************/
	_attachEvents() { // :void
		this.rb.elms.trigger.onclick = this._clickToggle.bind(this);
		this.rb.events.add(this.rb.elms.trigger, 'mouseover', this._hoverToggle);
		this.rb.events.add(window, 'click touchstart', this._windowClickToggle, {
			capture: true // so event fires first
		});
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

	/* Actions
	 **********/
	async _runOnclick(evt) { // :string | undefined
		if (this.open) return;
		const result = await this.rb.events.host.run(evt);
		return result;
	}

	/* Event Handlers
	 *****************/
	async _clickToggle(evt) { // :void
		if (this._hasOnclick) await this._runOnclick(evt);
		this.open = !this.open;
	}
	_hoverToggle(evt) { // :void
		if (!this.hover) return;
		if (this.open) return;
		this.open = true;
	}
	_windowClickToggle(evt) { // :void
		if (this.pin) return;
		if (!this.open) return;
		const path = evt.composedPath();
		if (path.includes(this.rb.elms.popover)) return;
		if (path.includes(this.rb.elms.trigger)) return;
		this.open = false;
	}

	/* Template
	 ***********/
	render({ props, state }) { // :string
		return html template;
	}
}

customElements.define('rb-popover', RbPopover);