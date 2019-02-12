function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function main() {
    var canvas = document.getElementById("c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    var vertexShaderSource = document.getElementById("2d-vertex-shader");
    var fragmentShaderSource = document.getElementById("2d-fragment-shader");

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    var positionAttributeLocation = gl.getAttributeLocation(program, "a_position");

    var positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, postionBuffer);

    var position = [
        0, 0,
        0, 0.5,
        0.7, 0
    ];

    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(position),gl.STATIC_DRAW);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0,0,gl.canvas.width,gl.canvas.height);

    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

    var size=2;
    var type= gl.FLOAT;
    var normalize=false;
    var stride=0;
    var offset=0;
    gl.vertexAttribPointer(positionAttributeLocation,size,type,normalize,stride,offset);

    var primitiveType=gl.TRIANGLES;
    var offset=0;
    var count=3;
    gl.drawArray(primitiveType,offset,count);
}