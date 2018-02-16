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
			_position: {
				type: Object,
				computed: '_setPosition(position)'
			},
			_show: {
				type: Boolean,
				value: true
			}

		}
	}

	/* Event Handlers
	 *****************/
	_handleClick(e) { // :void
		this._show = !this._show;
		e.preventDefault();
	}

	_handleHover(e) {
		if (this.trigger == 'hover')
			this._show = true;
	}

	_setPosition(position, e) {
		setTimeout(() => {
			var popover = this.root.querySelector('.popover')
			var pointer = this.root.querySelector('.pointer')

			pointer.style.top = (popover.offsetTop + 58) + 'px';


			if (this.caption == undefined){ // no caption
				console.log(popover.offsetHeight)
				if (popover.offsetHeight < 78){
					popover.style.top = 'calc(50% - 21px)';
					pointer.style.top = 'calc(50% - 8px)';
				}

			}

		}, 0);

		return {}
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
