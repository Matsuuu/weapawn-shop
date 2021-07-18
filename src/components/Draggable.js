import { css } from 'lit';
import { COMPONENT_DRAG, COMPONENT_DROP } from '../constants/events';
import { roundTo } from '../util/rounding';

let dragElementCopy;

export function Draggable(superclass) {
    return class DraggableMixin extends superclass {
        firstUpdated() {
            this.draggable = true;

            this.addEventListener('dragstart', this._onDraggableDragStart);
            this.addEventListener('dragend', this._onDraggableDragEnd);

            this.draggableDragOffset = { x: 0, y: 0 };
        }

        /**
         * @param {DragEvent} e
         */
        _onDraggableDragStart(e) {
            console.log(e);
            // Create clone node
            dragElementCopy = this.cloneNode(true);
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
            console.log(e);
            this.draggableDragOffset = {
                x: roundTo(e.x - this.draggableDragOffset.x, 50),
                y: roundTo(e.y - this.draggableDragOffset.y, 50),
            }

            console.log(this.draggableDragOffset);
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
                    opacity: 0;
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
