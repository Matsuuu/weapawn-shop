import { css, html, LitElement } from 'lit';
import "./components/DragTarget.js";
import "./components/TechComponent.js";

export class WeapawnShop extends LitElement {
    static get properties() {
        return {
        };
    }

    static get styles() {
        return css`

        drag-target {
            width: 800px;
            height: 800px;
            background-color: darkslategrey;
        }
    `;
    }

    constructor() {
        super();
    }

    render() {
        return html`

            <drag-target>
                <tech-component></tech-component>
                
            </drag-target>
    `;
    }
}
