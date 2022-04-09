Test01 = {
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext,
    run: function () {
        var view = document.getElementById('viewport');
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mainCanvas';
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.canvas.style.border = '3px solid green';

        view.appendChild(this.canvas);

        this.gl = this.canvas.getContext('experimental-webgl');

        WebGLHelper.setup(this.gl);

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);


        this.gl.clearColor(0.2, 0.2, 0.2, 1);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);


        vertices = [
            -0.5, 0.5,
            0.5, -0.5,
            -0.5, -0.5,
            -0.1, 0.81,
            0.2, -.12,
0.9,0.9        ];

        this.draw(this.gl.TRIANGLE_STRIP, vertices, ' 0, 0.8, 0.3, 0.8');
        this.draw(this.gl.POINTS, vertices, ' 0.3, 0.3, 0, 0.8');
        this.draw(this.gl.LINES, vertices, ' 0.9, 0.2, 0.12, 0.4');

    },
    draw: function (mode, vertices, color) {
        var vertexSize = 2;
        var elementCount = 0;

        switch (mode) {

            case this.gl.TRIANGLE_STRIP:

                elementCount = vertices.length / vertexSize;
                break;
            case this.gl.TRIANGLES:
//                vartices = [-0.5, 0.5, 0.1, -0.5, -0.5, -0.5];



                elementCount = vertices.length / vertexSize;
                break;
            case this.gl.POINTS:
                elementCount = vertices.length / vertexSize;
                break;
            case this.gl.LINE_STRIP:
                vertices.push(vertices[0]);

  //              vertices = [
                    //-0.5, 0.5,
                    //0.5, -0.5,
                    //-0.5, -0.5,
                    //-0.5, -0.5];
                elementCount = vertices.length / vertexSize+1;
                break;
            case this.gl.LINES:

                var temp = [];
                for (var i = vertexSize; i < vertices.length; i += vertexSize) {
                    temp.push(vertices[i - 2]);
                    temp.push(vertices[i - 1]);
                    temp.push(vertices[i + 0]);
                    temp.push(vertices[i + 1]);

                }

                temp.push(vertices[vertices.length - 2]);
                temp.push(vertices[vertices.length - 1]);
                temp.push(vertices[0]);
                temp.push(vertices[1]);

                vertices = temp;

                //vertices = [
                //    -0.5, 0.5, 0.5, -0.5,
                //    0.5, -0.5, -0.5, -0.5,
                //    -0.5, -0.5, -0.5, 0.5];
                elementCount = vertices.length / vertexSize;
                break;
        }

        var vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        var vsource
            = 'attribute vec2 pos;'
            + 'void main() {'
            + '   gl_Position = vec4(pos, 0, 1);';

        if (mode == this.gl.POINTS) {
            vsource +=
                '   gl_PointSize=10.0;';
        }

        vsource += '}';

        var fsource
            = 'void main() {'
            + '   gl_FragColor = vec4(' + color+');'
            + '}';

        var program = WebGLHelper.createProgram(vsource, fsource);

        this.gl.useProgram(program);

        var pos = this.gl.getAttribLocation(program, 'pos');
        this.gl.vertexAttribPointer(pos, vertexSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(pos);



        this.gl.drawArrays(mode, 0, elementCount);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

}