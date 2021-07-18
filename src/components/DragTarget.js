import { css, html, LitElement } from 'lit-element';
import { COMPONENT_DRAG, COMPONENT_DROP } from '../constants/events';
import { DRAG_INTERVAL } from '../constants/options';

export class DragTarget extends LitElement {

    static get properties() {
        return {
            currentDragComponent: { type: Object }
        };
    }

    constructor() {
        super();
        this.currentDragComponent = null;
    }

    firstUpdated() {
        window.addEventListener(COMPONENT_DRAG, this._onDrag);
        window.addEventListener(COMPONENT_DROP, this._onDrop);
    }

    _onDrag(e) {
        this.currentDragComponent = e.detail.target;
        console.log("OnDrag", e);
    }

    _onDrop(e) {
        console.log("OnDrop", e);
        const target = e.detail.target;
        const offset = e.detail.position;
        console.log("Target", target);
        // TODO: Check if can be dropped

        target.style.setProperty("--top-offset", offset.y + "px");
        target.style.setProperty("--left-offset", offset.x + "px");
    }

    render() {
        return html`<slot></slot>`;
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                background: url('/assets/axiom-pattern.png');
                background-size: ${DRAG_INTERVAL}px;
                background-position: center;
            }
        `;
    }
}

if (!customElements.get('drag-target')) {
    customElements.define('drag-target', DragTarget);
}
