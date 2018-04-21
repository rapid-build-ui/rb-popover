/*************
 * RB-POPOVER
 *************/
import { PolymerElement, html } from '../../../@polymer/polymer/polymer-element.js';
import { DomIf as DomIf } from '../../../@polymer/polymer/lib/elements/dom-if.js';
import '../../rb-button/scripts/rb-button.js';
import template from '../views/rb-popover.html';

export class RbPopover extends PolymerElement {
	/* Lifecycle
	 ************/
	constructor() {
		super();
	}
	connectedCallback() {
		super.connectedCallback();
		this.popoverElm = this.root.querySelector('.popover');
		this.pointerElm = this.root.querySelector('.pointer');
		this.triggerElm = this.root.querySelector('rb-button');
		this._windowClickListener = this._windowClick.bind(this);
		window.addEventListener('click', this._windowClickListener);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('click', this._windowClickListener);
	}

	/* Properties
	 *************/
	static get properties() {
		return {
			caption: {
				type: String
			},
			fitContent: {
				type: Boolean,
				value: false
			},
			hover: {
				type: Boolean,
				value: false
			},
			icon: {
				type: String,
				value: 'info-circle'
			},
			// TODO: fix positioning for big icon
			// iconSize: {
			// 	type: Number
			// },
			iconSource: {
				type: String,
			},
			kind: {
				type: String,
				value: 'default'
			},
			position: {
				type: String,
				value: 'right'
			},
			unstyled: {
				type: Boolean,
				value: false
			},
			_hidden: {
				type: Boolean,
				value: true
			}
		}
	}

	/* Computed Bindings
	 ********************/
	_fitContent(fitContent) {
		return fitContent ? 'fit-content' : null;
	}
	_iconSource(icon, iconSource) {
		if (!this.getAttribute('icon')) return 'solid';
		return iconSource;
	}
	_hidePopover(hidden) {
		return hidden ? 'hidden' : null;
	}
	_withCaption(caption) {
		return !!caption ? 'with-caption' : null;
	}
	_unstyled(unstyled) {
		return unstyled ? 'unstyled' : null;
	}

	/* Position Helpers
	 *******************/
	_resetPosition() {
		this._position = 'right';
		this.pointerElm.style.top  = null;
		this.popoverElm.style.top  = null;
		this.popoverElm.style.left = null;
	}

	_adjustToWindow() {
		this._resetPosition();

		var winWidth      = window.innerWidth;
		var winHeight     = window.innerHeight;
		var popoverX      = this.popoverElm.getBoundingClientRect().left;
		var popoverY      = this.popoverElm.getBoundingClientRect().top;
		var popoverWidth  = this.popoverElm.offsetWidth;
		var popoverHeight = this.popoverElm.offsetHeight;

		switch (true) {
			case ((popoverX - popoverWidth-9) < 0 && popoverX + popoverWidth + 9 > winWidth)://both left and right out of bounce
				this._setBottomPosition();
				break;
			case (popoverX - popoverWidth - 35 < 0):
				// console.log(2)
				this._setRightPosition();
				break;
			case (popoverX + popoverWidth + 9 > winWidth):
				// console.log(3)
				this._setLeftPosition();
				break;
			case (popoverY - popoverHeight < 0):
				this._setBottomPosition();
				break;
			case (popoverY + popoverHeight > winHeight):
				this._setTopPosition();
				break;
			default:
				// console.log('default')
				this._setPosition();
		}
	}

	_setPosition() {
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

	_setTopPosition() {
		this._position = 'top';
		this.popoverElm.style.left = this.triggerElm.offsetLeft - (this.popoverElm.offsetWidth/2 - 8) + 'px'
		this.popoverElm.style.top =  this.triggerElm.offsetTop - (this.pointerElm.offsetHeight + this.popoverElm.offsetHeight + 2) + 'px'
	}

	_setBottomPosition() {
		this._position = 'bottom';
		this.popoverElm.style.left = this.triggerElm.offsetLeft - (this.popoverElm.offsetWidth/2 - 8) + 'px'
		this.popoverElm.style.top =  this.triggerElm.offsetTop + this.pointerElm.offsetHeight + this.triggerElm.offsetHeight + 'px'
	}

	_setLeftPosition() {
		this._position = 'left';
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft - this.popoverElm.offsetWidth - this.pointerElm.offsetWidth - 2 + 'px'
	}

	_setRightPosition() {
		this._position = 'right';
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft + this.pointerElm.offsetWidth + this.triggerElm.offsetWidth + 2 +'px'
	}

	_setRightLeftPositionTop() {
		this.pointerElm.style.top = (this.popoverElm.offsetTop + 58) + 'px';
		// no caption
		if (!!this.caption) return;
		if (this.popoverElm.offsetHeight > 78) return;
		this.popoverElm.style.top = 'calc(50% - 21px)';
		this.pointerElm.style.top = 'calc(50% - 10px)';
	}

	/* Event Handlers
	 *****************/
	_handleClick(e) { // :void
		e.preventDefault();
		this._hidden = !this._hidden;
		this._adjustToWindow();
	}
	_handleHover(e) {
		if (!this.hover) return;
		if (!this._hidden) return;
		this._hidden = false;
		this._adjustToWindow();
	}
	_windowClick(e) { // :void
		if (this._hidden) return;
		if (e.path.includes(this.popoverElm)) return;
		if (e.path.includes(this.triggerElm)) return;
		this._hidden = true;
	}

	/* Template
	 ***********/
	static get template() { // :string
		return html template;
	}
}

customElements.define('rb-popover', RbPopover);
