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
		e.preventDefault();
		this._show = !this._show;
		this._adjustToWindow();
	}

	_handleHover(e) {
		if (this.trigger == 'hover')
			this._show = true;
	}

	_adjustToWindow() {
		if (!this._show) {
			return;
		}

		var winWidth = window.innerWidth;
		var triggerX = this.getBoundingClientRect().left;
		var popoverX = this.popoverElm.getBoundingClientRect().left;
		var popoverWidth = this.popoverElm.offsetWidth;

		console.log(winWidth, popoverX,  triggerX)

		switch (true) {
			case ((triggerX - popoverWidth - 9) < 0 || popoverX < 0):
				console.log(1)
				this._setRightPosition();
				break;
			case (triggerX + popoverWidth + 9 > winWidth):
				console.log(2)
				this._setLeftPosition();
				break;
			default:
				console.log(3)
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
		this.popoverElm.style.top =  this.offsetHeight + this.pointerElm.offsetHeight + 2 + 'px'
	}
	_setLeftPosition() {
		console.log('left')
		this._position = 'left';
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft - this.popoverElm.offsetWidth - this.pointerElm.offsetWidth - 2 + 'px'
	}

	_setRightPosition() {
		console.log('right')
		this._position = 'right';
		this._setRightLeftPositionTop();
		this.popoverElm.style.left = this.triggerElm.offsetLeft + this.pointerElm.offsetWidth + this.triggerElm.offsetWidth + 2 +'px'
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
