import { Inject, Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import MersenneTwister from 'mersenne-twister';
import { hueShift } from './utils/colors';
import { JazziconConfig, JazziconServiceConfig } from './jazzicon.token';

const svgNamespace = 'http://www.w3.org/2000/svg';

export interface JazziconOptions {
    diameter: number,
    colors: string[],
    shapeCount: number,
}

@Injectable()
export class JazziconService {

    private readonly renderer: Renderer2;
    private generator!: MersenneTwister;

    constructor(
        @Inject(JazziconServiceConfig) private readonly config: JazziconConfig,
        private readonly rendererFactory: RendererFactory2
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null)
    }

    generateIdenticon(seed?: number | number[], options: Partial<JazziconOptions> = {}) {
        const diameter = options?.diameter || this.config.diameter;
        const shapeCount = options?.shapeCount || this.config.shapeCount;
        const colors = options?.colors || this.config.colors;

        this.generator = new MersenneTwister(seed);
        const remainingColors = hueShift(colors.slice(), this.generator);

        const elements = this.paperGen(diameter, this.genColor(remainingColors));
        const container = elements.container;

        const svg = this.renderer.createElement('svg', svgNamespace);
        this.renderer.setAttribute(svg, 'xlmns', svgNamespace);
        this.renderer.setAttribute(svg, 'x', '0');
        this.renderer.setAttribute(svg, 'y', '0');
        this.renderer.setAttribute(svg, 'width', String(diameter));
        this.renderer.setAttribute(svg, 'height', String(diameter));

        for (let i = 0; i < shapeCount - 1; i++) {
            this.genShape(remainingColors, diameter, i, shapeCount - 1, svg);
        }
        this.renderer.appendChild(container, svg);

        return container;
    }

    private genShape(remainingColors: string[], diameter: number, i: number, total: number, svg: Element) {
        const center = diameter / 2;

        const shape = this.renderer.createElement('rect', svgNamespace);
        this.renderer.setAttribute(shape, 'x', '0');
        this.renderer.setAttribute(shape, 'y', '0');
        this.renderer.setAttribute(shape, 'width', String(diameter));
        this.renderer.setAttribute(shape, 'height', String(diameter));

        const firstRot = this.generator.random();
        const angle = Math.PI * 2 * firstRot;
        const velocity = (diameter / total) * this.generator.random() + (i * diameter) / total;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const translate = `translate(${tx} ${ty})`;

        // Third random is a shape rotation on top of all of that.
        const secondRot = this.generator.random();
        const rot = (firstRot * 360) + (secondRot * 180);
        const rotate = `rotate(${rot.toFixed(1)} ${center} ${center})`;
        const transform = `${translate} ${rotate}`;
        this.renderer.setAttribute(shape, 'transform', transform);

        const fill = this.genColor(remainingColors);
        this.renderer.setAttribute(shape, 'fill', fill);

        this.renderer.appendChild(svg, shape);
    }

    private genColor(colors: string[]) {
        this.generator.random();
        const idx = Math.floor(colors.length * this.generator.random());
        return colors.splice(idx, 1)[0];
    }

    private paperGen(diameter: number, color: string) {
        const container = this.renderer.createElement('div');
        this.renderer.addClass(container, 'jazzicon-container');
        this.renderer.setStyle(container, 'width', `${diameter}px`);
        this.renderer.setStyle(container, 'height', `${diameter}px`);
        this.renderer.setStyle(container, 'background', color);
        return {
            container: container,
        };
    }

}