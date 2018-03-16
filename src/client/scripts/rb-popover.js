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
		this._windowClickListener = this._windowClick.bind(this);

	}

	connectedCallback() {
		super.connectedCallback();
		this.popoverElm = this.root.querySelector('.popover')
		this.pointerElm = this.root.querySelector('.pointer')
		this.triggerElm = this.root.querySelector('rb-icon')
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

	_resetPosition() {
		this._position = 'right';
		this.pointerElm.style.top = null;
		this.popoverElm.style.top = null;
		this.popoverElm.style.left = null;
	}
	_handleHover(e) {
		if (this.trigger == 'hover'){
			this._show = true;
			this._adjustToWindow();
		}

	}

	_adjustToWindow() {
		if (!this._show) {
			this._resetPosition();
			return;
		}

		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var popoverX = this.popoverElm.getBoundingClientRect().left;
		var popoverY = this.popoverElm.getBoundingClientRect().top;
		var popoverWidth = this.popoverElm.offsetWidth;
		var popoverHeight = this.popoverElm.offsetHeight;


		switch (true) {
			case ((popoverX - popoverWidth-9) < 0 && popoverX + popoverWidth + 9 > winWidth)://both left and right out of bounce
				this._setBottomPosition();
				break;
			case (popoverX - popoverWidth - 35 < 0):
				console.log(2)
				this._setRightPosition();
				break;
			case (popoverX + popoverWidth + 9 > winWidth):
				console.log(3)
				this._setLeftPosition();
				break;
			case (popoverY - popoverHeight < 0):
				this._setBottomPosition();
				break;
			case (popoverY + popoverHeight > winHeight):
				this._setTopPosition();
				break;
			default:
				console.log('default')
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
		if (this.caption == undefined){ // no caption
			if (this.popoverElm.offsetHeight < 78){
				this.popoverElm.style.top = 'calc(50% - 21px)';
				this.pointerElm.style.top = 'calc(50% - 8px)';
			}

		}

	}

	_withCaption() {
		if(this.caption != undefined) return 'with-caption';
	}


	_showPopover(show) {
		if (show) return null;
		return 'hidden';
	}

	/* Window Event Handlers
	 ************************/
	_windowClick(e) { // :void
		if (!this._show) return;
		if (e.path.includes(this.popoverElm)) return;
		if (e.path.includes(this.triggerElm)) return;
		this._show = false;
	}

	/* Template
	 ***********/
	static get template() { // :string
		return template;
	}
}

customElements.define('rb-popover', RbPopover);
