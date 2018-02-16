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
			},
			trigger: {
				type: String,
				value: 'click'
			}
		}
	}

	/* Template
	 ***********/
	static get template() { // :string
		return template;
	}
}

customElements.define('rb-popover', RbPopover);
