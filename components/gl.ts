import { mat4 } from 'gl-matrix';

export function err(e: string): never {
    throw new Error(e);
}

type PrefixKeys<T, Tprefix extends string> = {
    [K in keyof T]: K extends `${Tprefix}${infer X}` ? X : never;
}[keyof T];

type UniformMatrixTypes = `Matrix${PrefixKeys<
    WebGL2RenderingContext,
    'uniformMatrix'
>}`;

export class Program {
    constructor(
        protected vertexSrc: string,
        protected fragmentSrc: string,
    ) {}

    protected _program: WebGLProgram | undefined;

    public compile(gl: WebGL2RenderingContext) {
        const vs =
            gl.createShader(gl.VERTEX_SHADER) ?? err('Couldnt create VS');
        const fs =
            gl.createShader(gl.FRAGMENT_SHADER) ?? err('Couldnt create FS');

        gl.shaderSource(vs, this.vertexSrc);
        gl.compileShader(vs);
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
            err(gl.getShaderInfoLog(vs)!);

        gl.shaderSource(fs, this.fragmentSrc);
        gl.compileShader(fs);
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
            err(gl.getShaderInfoLog(fs)!);

        const prog = gl.createProgram() ?? err('Couldnt create program');

        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);

        gl.detachShader(prog, vs);
        gl.detachShader(prog, fs);
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            err(`Couldn't link program\n${gl.getProgramInfoLog(prog)}`);
        }

        this._program = prog;
    }

    public get program(): WebGLProgram {
        return this._program ?? err("Program wasn't compiled/linked");
    }

    public uniformMtx<T extends UniformMatrixTypes>(
        gl: WebGL2RenderingContext,
        type: T,
        uniform: string,
        value: Iterable<number>,
        transpose: boolean = false,
        ...range: [] | [number] | [number, number]
    ) {
        const ul = gl.getUniformLocation(
            this._program ?? err("linkedn't"),
            uniform,
        );

        gl[`uniform${type}`](ul, transpose, value, ...range);
    }

    public uniformUi<T extends 1 | 2 | 3 | 4>(
        gl: WebGL2RenderingContext,
        n: T,
        uniform: string,
        ...value: T extends 1
            ? [number]
            : T extends 2
              ? [number, number]
              : T extends 3
                ? [number, number, number]
                : [number, number, number, number]
    ) {
        const ul = gl.getUniformLocation(
            this._program ?? err("linkedn't"),
            uniform,
        );
        (gl[`uniform${n}ui`] as any)(ul, ...(value as any as number[]));
    }
}

type GL = WebGL2RenderingContext;

export class GlArrayBuffer {
    protected _buf: WebGLBuffer | undefined;
    constructor(public data: Float32Array) {}

    public get buf() {
        return this._buf ?? err('Not pushed');
    }

    push(gl: GL) {
        if (!this._buf) {
            this._buf = gl.createBuffer() ?? err('Could not create buffer');
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buf);
        gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
    }
}

export class LineGeometry {
    constructor(
        public transform: mat4,
        protected geometry: GlArrayBuffer,
        public program: Program,
        public lineWidth: number = 1,
    ) {}

    draw(gl: GL, projectionMatrix: mat4) {
        const positionAttribLocation = gl.getAttribLocation(
            this.program.program,
            'position',
        );
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.buf);

        gl.vertexAttribPointer(
            positionAttribLocation,
            3,
            gl.FLOAT,
            false,
            0,
            0,
        );

        gl.useProgram(this.program.program);

        this.program.uniformMtx(
            gl,
            'Matrix4fv',
            'projectionMatrix',
            projectionMatrix,
        );

        this.program.uniformMtx(
            gl,
            'Matrix4fv',
            'modelViewMatrix',
            this.transform,
        );

        gl.lineWidth(this.lineWidth);
        gl.drawArrays(gl.LINES, 0, this.geometry.data.length / 3);
    }
}

export function lerp(f: number, to: number, x: number) {
    return f + (to - f) * x;
}

type GridFn = (x: number, y: number) => number;

export function buildGridData(w: number, h: number, fn: GridFn = () => 0) {
    const buf = new Float32Array((4 * w * h + 2 * h + 2 * w) * 3);
    let i = 0;
    function vertex(x: number, y: number) {
        buf[i++] = x;
        buf[i++] = y;
        buf[i++] = fn(x, y);
    }

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            vertex(x, y);
            vertex(x, y + 1);
            vertex(x, y);
            vertex(x + 1, y);
        }
        vertex(w, y);
        vertex(w, y + 1);
    }

    for (let x = 0; x < w; x++) {
        vertex(x, h);
        vertex(x + 1, h);
    }

    return buf;
}
