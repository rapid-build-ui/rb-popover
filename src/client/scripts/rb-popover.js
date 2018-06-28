/*************
 * RB-POPOVER
 *************/
import { props, withComponent } from '../../../skatejs/dist/esnext/index.js';
import { html, withRenderer } from './renderer.js';
import '../../rb-button/scripts/rb-button.js';
import template from '../views/rb-popover.html';

export class RbPopover extends withComponent(withRenderer()) {
	/* Lifecycle
	 ************/
	constructor() {
		super();
		this.state = {
			position: null
		};
	}
	connected() {
		setTimeout(() => { // (timeout to ensure template is rendered)
			this.popoverElm = this.shadowRoot.querySelector('.popover');
			this.pointerElm = this.shadowRoot.querySelector('.pointer');
			this.triggerElm = this.shadowRoot.querySelector('rb-button');
			this._windowClickListener = this._windowClick.bind(this);
			window.addEventListener('click', this._windowClickListener);
		});
	}
	disconnected() {
		window.removeEventListener('click', this._windowClickListener);
	}

	/* Properties
	 *************/
	static get props() {
		return {
			caption: props.string,
			fitContent: props.boolean,
			hover: props.boolean,
			kind: props.string,
			position: Object.assign({}, props.string, {
				default: 'right'
			}),
			showPopover: Object.assign({}, props.boolean, {
				deserialize(val) {
					return /^true$/i.test(val);;
				}
			}),
			unstyled: props.boolean,
			icon: props.string,
			// iconSize: props.number, // TODO: fix positioning for big icon
			iconSource: props.string
		}
	}

	/* Position Helpers
	 *******************/
	_resetPosition() {
		this.state.position = this.position;
		this.pointerElm.style.top  = null;
		this.popoverElm.style.top  = null;
		this.popoverElm.style.left = null;
	}

	_adjustToWindow() { // :void
		if (!this.popoverElm) return;
		this._resetPosition();

		const winWidth      = window.innerWidth;
		const winHeight     = window.innerHeight;
		const popoverX      = this.popoverElm.getBoundingClientRect().left;
		const popoverY      = this.popoverElm.getBoundingClientRect().top;
		const popoverWidth  = this.popoverElm.offsetWidth;
		const popoverHeight = this.popoverElm.offsetHeight;

		switch (true) {
			case ((popoverX - popoverWidth-9) < 0 && popoverX + popoverWidth + 9 > winWidth)://both left and right out of bounce
				this._setBottomPosition();
				break;
			case (popoverX - popoverWidth - 35 < 0):
				this._setRightPosition();
				break;
			case (popoverX + popoverWidth + 9 > winWidth):
				this._setLeftPosition();
				break;
			case (popoverY - popoverHeight < 0):
				this._setBottomPosition();
				break;
			case (popoverY + popoverHeight > winHeight):
				this._setTopPosition();
				break;
			default:
				this._setPosition();
		}
	}

	_setPosition() { // :void
		switch (this.position) {
			case 'left':
				this._setLeftPosition();
				break;
			case 'top':
				this._setTopPosition();
				break;
			case 'bottom':
				this._setBottomPosition();
				break;
			default:
				this._setRightPosition()
		}
	}

	_setTopPosition() { // :void
		this.state.position = 'top';
		this.popoverElm.style.left = this.triggerElm.offsetLeft - (this.popoverElm.offsetWidth/2 - 8) + 'px'
		this.popoverElm.style.top =  this.triggerElm.offsetTop - (this.pointerElm.offsetHeight + this.popoverElm.offsetHeight + 2) + 'px'
	}

	_setBottomPosition() { // :void
		this.state.position = 'bottom';
		this.popoverElm.style.left = this.triggerElm.offsetLeft - (this.popoverElm.offsetWidth/2 - 8) + 'px'
		this.popoverElm.style.top =  this.triggerElm.offsetTop + this.pointerElm.offsetHeight + this.triggerElm.offsetHeight + 'px'
	}

	_setLeftPosition() { // :void
		this.state.position = 'left';
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft - this.popoverElm.offsetWidth - this.pointerElm.offsetWidth - 2 + 'px'
	}

	_setRightPosition() { // :void
		this.state.position = 'right';
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft + this.pointerElm.offsetWidth + this.triggerElm.offsetWidth + 2 +'px'
	}

	_setRightLeftPositionTop() { // :void
		this.pointerElm.style.top = (this.popoverElm.offsetTop + 58) + 'px';
		if (!!this.caption) return;
		// no caption scenario
		if (this.popoverElm.offsetHeight > 78) return;
		this.popoverElm.style.top = 'calc(50% - 21px)';
		this.pointerElm.style.top = 'calc(50% - 10px)';
	}

	/* Event Handlers
	 *****************/
	_handleClick(e) { // :void
		this.showPopover = !this.showPopover;
	}
	_handleHover(e) { // :void
		if (!this.hover) return;
		if (this.showPopover) return;
		this.showPopover = true;
	}
	_windowClick(e) { // :void
		if (!this.showPopover) return;
		const path = e.composedPath();
		if (path.includes(this.popoverElm)) return;
		if (path.includes(this.triggerElm)) return;
		this.showPopover = false;
	}

	/* Observer
	 ***********/
	updating(prevProps) {
		// console.log(prevProps.showPopover, this.showPopover);
		if (!this.showPopover) return;
		if (prevProps.showPopover === this.showPopover) return;
		setTimeout(() => { // (timeout to ensure popover has dimensions)
			this._adjustToWindow();
			this.triggerUpdate();
		})
	}

	/* Template
	 ***********/
	render({ props, state }) { // :string
		return html template;
	}
}

customElements.define('rb-popover', RbPopover);