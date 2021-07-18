import { css } from 'lit';
import { COMPONENT_DRAG, COMPONENT_DROP } from '../constants/events';
import { DRAG_INTERVAL } from '../constants/options';
import { roundTo } from '../util/rounding';

let dragElementCopy;

export function Draggable(superclass) {
    return class DraggableMixin extends superclass {
        firstUpdated() {
            this.draggable = true;

            this.addEventListener('dragstart', this._onDraggableDragStart);
            this.addEventListener('dragend', this._onDraggableDragEnd);
            this.addEventListener('drag', this._onDraggableDrag);

            this.draggableDragOffset = { x: 0, y: 0 };
        }

        /**
         * @param {DragEvent} e
         */
        _onDraggableDrag(e) {
            if (e.x === 0 && e.y === 0) return;
            this.style.setProperty("--top-offset", e.y - this.draggableDragOffset.y + "px");
            this.style.setProperty("--left-offset", e.x - this.draggableDragOffset.x + "px");
        }

        /**
         * @param {DragEvent} e
         */
        _onDraggableDragStart(e) {
            console.log(e);
            // Create clone node
            dragElementCopy = /*this.cloneNode(true);*/ document.createElement("span");
            dragElementCopy.setAttribute('ghost', '');
            this.parentNode.appendChild(dragElementCopy);

            e.dataTransfer.setDragImage(dragElementCopy, e.offsetX, e.offsetY);

            this.setAttribute('dragging', '');
            this.draggableDragOffset = { x: e.offsetX, y: e.offsetY };

            window.dispatchEvent(new CustomEvent(COMPONENT_DRAG, { detail: { target: this } }));
        }

        /**
         * @param {DragEvent} e
         */
        _onDraggableDragEnd(e) {
            this.draggableDragOffset = {
                x: roundTo(e.x - this.draggableDragOffset.x, DRAG_INTERVAL),
                y: roundTo(e.y - this.draggableDragOffset.y, DRAG_INTERVAL),
            }

            window.dispatchEvent(new CustomEvent(COMPONENT_DROP, { detail: { target: this, position: this.draggableDragOffset } }));

            this.removeAttribute('dragging');
            dragElementCopy.remove();
        }

        static get styles() {
            return css`
                :host {
                    cursor: grab;
                    position: absolute;
                    top: var(--top-offset, 0);
                    left: var(--left-offset, 0);
                }

                :host([dragging]) {
                    cursor: grabbing;
                }

                :host([ghost]) {
                    position: absolute;
                    top: -9999px;
                    left: -9999px;
                }
            `;
        }
    };
}
