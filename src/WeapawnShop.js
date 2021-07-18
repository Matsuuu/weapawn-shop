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
            width: 1600px;
            height: 1600px;
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
                <tech-component .posX=${300} .posY=${150}></tech-component>
                
            </drag-target>
    `;
    }
}
