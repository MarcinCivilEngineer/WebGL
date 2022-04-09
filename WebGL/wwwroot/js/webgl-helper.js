WebGLHelper = {

    gl: WebGLRenderingContext,

    setup: function (gl) {
        this.gl = gl;
    },

createProgram: function (vsource, fsource) {
        var program = this.gl.createProgram();
        var vshader = this.createShader(vsource, this.gl.VERTEX_SHADER);
        var fshader = this.createShader(fsource, this.gl.FRAGMENT_SHADER);

        this.gl.attachShader(program, vshader);
        this.gl.attachShader(program, fshader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            throw "error: WebGL.linkProgram. " + this.gl.getProgramInfoLog(program);
        }

        return program;
    },

    createShader: function (sourceCode, type) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, sourceCode);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw "error: WebGL.compileShader. " + this.gl.getShaderInfoLog(shader);
        }

        return shader;
    }
}