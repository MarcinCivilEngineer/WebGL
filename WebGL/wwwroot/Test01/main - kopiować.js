Test01 = {
    gl: WebGLRenderingContext,

    run: function () {
        var view = document.getElementById('viewport');
        var canvas = document.createElement('canvas');
        canvas.id = 'mainCanvas';
        canvas.width = 640;
        canvas.height = 480;
        canvas.style.border = '3px solid green';
        
        view.appendChild(canvas);

        this.gl = canvas.getContext('experimental-webgl');

        var vertices = [-0.5, 0.5, 0.5, -0.5, -0.5, -0.5,0.5,0.3];

        var vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        var vsource
            = 'attribute vec2 pos;'
            + 'void main() {'
            + '   gl_Position = vec4(pos, 0, 1);'
            + '   gl_PointSize=10.0;'
            + '}';

        var fsource
            = 'void main() {'
            + '   gl_FragColor = vec4(0,0.8,0,1);'
            + '}';

        var program = this.createProgram(vsource, fsource);

        this.gl.useProgram(program);

        var pos = this.gl.getAttribLocation(program, 'pos');
        this.gl.vertexAttribPointer(pos, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(pos);

        this.gl.viewport(0, 0, canvas.width, canvas.height);


        this.gl.clearColor(0.2, 0.2, 0.2, 1);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.drawArrays(this.gl.LINE_STRIP, 0, 4);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
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