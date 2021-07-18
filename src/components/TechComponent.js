import { css, html, LitElement } from 'lit-element';
import { Draggable } from './Draggable';

export class TechComponent extends Draggable(LitElement) {
    static get styles() {
        return [super.styles, css`
            :host {
                display: flex;
                background: red;
                width: 200px;
                height: 200px;
            }
        `];
    }

    firstUpdated() {
        super.firstUpdated();
        console.log("Tech component rdy");
    }

    render() {
        return html``;
    }
}

if (!customElements.get('tech-component')) {
    customElements.define('tech-component', TechComponent);
}
