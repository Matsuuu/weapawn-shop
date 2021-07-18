import { css, html, LitElement } from 'lit-element';
import { Draggable } from './Draggable';

export class TechComponent extends Draggable(LitElement) {
    static get properties() {
        return {
            posX: { type: Number },
            posY: { type: Number },
        };
    }

    constructor() {
        super();
        this.posX = 0;
        this.posY = 0;
    }

    firstUpdated() {
        super.firstUpdated();

        this.style.setProperty("--top-offset", this.posY + "px");
        this.style.setProperty("--left-offset", this.posX + "px");
    }

    render() {
        return html` <header></header> `;
    }

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    display: flex;
                    background: dimgrey;
                    width: 200px;
                    height: 200px;
                    border-radius: 8px;
                    box-shadow: 0 3px 3px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
                        0 1px 8px 0 rgb(0 0 0 / 12%);
                    border: 4px solid #1e252f;
                    box-sizing: border-box;
                }

                header {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: darkblue;
                    height: 1rem;
                    width: 100%;
                    border-radius: 4px 4px 0 0;
                }
            `,
        ];
    }
}

if (!customElements.get('tech-component')) {
    //@ts-ignore
    customElements.define('tech-component', TechComponent);
}
