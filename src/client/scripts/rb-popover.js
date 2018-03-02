/*************
 * RB-POPOVER
 *************/
import { Element as PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { DomIf as DomIf } from '../../../@polymer/polymer/lib/elements/dom-if.js';
import template from '../views/rb-popover.html';

export class RbPopover extends PolymerElement {
	/* Lifecycle
	 ************/
	constructor() {
		super();
	}

	ready() {
		super.ready();
		this.popoverElm = this.root.querySelector('.popover')
		this.pointerElm = this.root.querySelector('.pointer')
		this.triggerElm = this.root.querySelector('rb-icon')

	}

	/* Properties
	 *************/
	static get properties() {
		return {
			caption: {
				type: String
			},
			kind: {
				type: String,
				value: 'default'
			},
			position: {
				type: String,
				value: 'right'
			},
			trigger: {
				type: String,
				value: 'click'
			},
			// _position: {
			// 	type: Object,
			// 	computed: '_setPosition(position)'
			// },
			_show: {
				type: Boolean,
				value: false
			}

		}
	}

	/* Event Handlers
	 *****************/
	_handleClick(e) { // :void
		this._show = !this._show;
		this._setPosition(this.position)
		e.preventDefault();
	}

	_handleHover(e) {
		if (this.trigger == 'hover')
			this._show = true;
	}

	_setPosition(position, e) {
		setTimeout(() => {
			switch(position) {
				case 'top':
				this._setTopPosition()
					break;
				case 'bottom':
					this._setBottomPosition()
					break;
				case 'left':
					this._setLeftPosition()
					break
				default:
					this._setRightPosition()
			}

		}, 0);

		return {}
	}

	_adjustToWindow() {
		console.log(window.scrollY)
		console.log(window.screenLeft)

	}


	_setTopPosition() {
		this.popoverElm.style.left = this.triggerElm.offsetLeft - (this.popoverElm.offsetWidth/2 - 8) + 'px'
		this.popoverElm.style.top =  this.triggerElm.offsetTop - (this.pointerElm.offsetHeight + this.popoverElm.offsetHeight + 2) + 'px'
		// console.log(this.popoverElm.offsetWidth)
		// this._adjustToWindow()
	}

	_setBottomPosition() {
		this.popoverElm.style.left = this.triggerElm.offsetLeft - (this.popoverElm.offsetWidth/2 - 8) + 'px'
		this.popoverElm.style.top =  this.offsetHeight + this.pointerElm.offsetHeight + 2 + 'px'
	}
	_setLeftPosition() {
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft - this.popoverElm.offsetWidth - this.pointerElm.offsetWidth - 2 + 'px'
	}

	_setRightPosition() {
		this._setRightLeftPositionTop();
	}

	_setRightLeftPositionTop() {
		this.pointerElm.style.top = (this.popoverElm.offsetTop + 58) + 'px';
		if (this.caption == undefined){ // no caption
			if (this.popoverElm.offsetHeight < 78){
				this.popoverElm.style.top = 'calc(50% - 21px)';
				this.pointerElm.style.top = 'calc(50% - 8px)';
			}

		}
	}

	_showPopover(show) {
		if (show) return null;
		return 'hidden';
	}

	/* Template
	 ***********/
	static get template() { // :string
		return template;
	}
}

customElements.define('rb-popover', RbPopover);
