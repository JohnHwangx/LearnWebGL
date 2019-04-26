/**
 * Makes a scale matrix
 * @param {number} sx x scale.
 * @param {number} sy y scale.
 * @param {number} sz z scale.
 * @param {Matrix4} [dst] optional matrix to store result
 * @return {Matrix4} dst or a new matrix if none provided
 * @memberOf module:webgl-3d-math
 */
function scaling(sx, sy, sz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = sx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = sy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = sz;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

/**
 * Multiply by an z rotation matrix
 * @param {Matrix4} m matrix to multiply
 * @param {number} angleInRadians amount to rotate
 * @param {Matrix4} [dst] optional matrix to store result
 * @return {Matrix4} dst or a new matrix if none provided
 * @memberOf module:webgl-3d-math
 */
function zRotate(m, angleInRadians, dst) {
    // This is the optimized verison of
    // return multiply(m, zRotation(angleInRadians), dst);
    dst = dst || new Float32Array(16);

    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;

    if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

/**
 * Multiply by a scaling matrix
 * @param {Matrix4} m matrix to multiply
 * @param {number} sx x scale.
 * @param {number} sy y scale.
 * @param {number} sz z scale.
 * @param {Matrix4} [dst] optional matrix to store result
 * @return {Matrix4} dst or a new matrix if none provided
 * @memberOf module:webgl-3d-math
 */
function scale(m, sx, sy, sz, dst) {
    // This is the optimized verison of
    // return multiply(m, scaling(sx, sy, sz), dst);
    dst = dst || new Float32Array(16);

    dst[0] = sx * m[0 * 4 + 0];
    dst[1] = sx * m[0 * 4 + 1];
    dst[2] = sx * m[0 * 4 + 2];
    dst[3] = sx * m[0 * 4 + 3];
    dst[4] = sy * m[1 * 4 + 0];
    dst[5] = sy * m[1 * 4 + 1];
    dst[6] = sy * m[1 * 4 + 2];
    dst[7] = sy * m[1 * 4 + 3];
    dst[8] = sz * m[2 * 4 + 0];
    dst[9] = sz * m[2 * 4 + 1];
    dst[10] = sz * m[2 * 4 + 2];
    dst[11] = sz * m[2 * 4 + 3];

    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

export default { scaling, zRotate, scale };