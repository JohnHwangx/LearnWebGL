/**
  * An array or typed array with 3 values.
  * @typedef {number[]|TypedArray} Vector3
  * @memberOf module:webgl-3d-math
  */

/**
 * An array or typed array with 4 values.
 * @typedef {number[]|TypedArray} Vector4
 * @memberOf module:webgl-3d-math
 */

/**
 * An array or typed array with 16 values.
 * @typedef {number[]|TypedArray} Matrix4
 * @memberOf module:webgl-3d-math
 */

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

/**
  * Multiply by an axis rotation matrix
  * @param {Matrix4} m matrix to multiply
  * @param {Vector3} axis axis to rotate around
  * @param {number} angleInRadians amount to rotate
  * @param {Matrix4} [dst] optional matrix to store result
  * @return {Matrix4} dst or a new matrix if none provided
  * @memberOf module:webgl-3d-math
  */
function axisRotate(m, axis, angleInRadians, dst) {
    // This is the optimized verison of
    // return multiply(m, axisRotation(axis, angleInRadians), dst);
    dst = dst || new Float32Array(16);

    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    var xx = x * x;
    var yy = y * y;
    var zz = z * z;
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    var oneMinusCosine = 1 - c;

    var r00 = xx + (1 - xx) * c;
    var r01 = x * y * oneMinusCosine + z * s;
    var r02 = x * z * oneMinusCosine - y * s;
    var r10 = x * y * oneMinusCosine - z * s;
    var r11 = yy + (1 - yy) * c;
    var r12 = y * z * oneMinusCosine + x * s;
    var r20 = x * z * oneMinusCosine + y * s;
    var r21 = y * z * oneMinusCosine - x * s;
    var r22 = zz + (1 - zz) * c;

    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m10 = m[4];
    var m11 = m[5];
    var m12 = m[6];
    var m13 = m[7];
    var m20 = m[8];
    var m21 = m[9];
    var m22 = m[10];
    var m23 = m[11];

    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

    if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
    }

    return dst;
}

/**
  * Makes an identity matrix.
  * @param {Matrix4} [dst] optional matrix to store result
  * @return {Matrix4} dst or a new matrix if none provided
  * @memberOf module:webgl-3d-math
  */
function identity(dst) {
    dst = dst || new Float32Array(16);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
}

/**
   * Mutliply by translation matrix.
   * @param {Matrix4} m matrix to multiply
   * @param {number} tx x translation.
   * @param {number} ty y translation.
   * @param {number} tz z translation.
   * @param {Matrix4} [dst] optional matrix to store result
   * @return {Matrix4} dst or a new matrix if none provided
   * @memberOf module:webgl-3d-math
   */
function translate(m, tx, ty, tz, dst) {
    // This is the optimized version of
    // return multiply(m, translation(tx, ty, tz), dst);
    dst = dst || new Float32Array(16);

    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];

    if (m !== dst) {
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[3] = m03;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
        dst[7] = m13;
        dst[8] = m20;
        dst[9] = m21;
        dst[10] = m22;
        dst[11] = m23;
    }

    dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
    dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
    dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
    dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

    return dst;
}

/**
  * Computes a 4-by-4 perspective transformation matrix given the angular height
  * of the frustum, the aspect ratio, and the near and far clipping planes.  The
  * arguments define a frustum extending in the negative z direction.  The given
  * angle is the vertical angle of the frustum, and the horizontal angle is
  * determined to produce the given aspect ratio.  The arguments near and far are
  * the distances to the near and far clipping planes.  Note that near and far
  * are not z coordinates, but rather they are distances along the negative
  * z-axis.  The matrix generated sends the viewing frustum to the unit box.
  * We assume a unit box extending from -1 to 1 in the x and y dimensions and
  * from -1 to 1 in the z dimension.
  * @param {number} fieldOfViewInRadians field of view in y axis.
  * @param {number} aspect aspect of viewport (width / height)
  * @param {number} near near Z clipping plane
  * @param {number} far far Z clipping plane
  * @param {Matrix4} [dst] optional matrix to store result
  * @return {Matrix4} dst or a new matrix if none provided
  * @memberOf module:webgl-3d-math
  */
function perspective(fieldOfViewInRadians, aspect, near, far, dst) {
    dst = dst || new Float32Array(16);
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (near + far) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far * rangeInv * 2;
    dst[15] = 0;

    return dst;
}

/**
* Creates a lookAt matrix.
* This is a world matrix for a camera. In other words it will transform
* from the origin to a place and orientation in the world. For a view
* matrix take the inverse of this.
* @param {Vector3} cameraPosition position of the camera
* @param {Vector3} target position of the target
* @param {Vector3} up direction
* @param {Matrix4} [dst] optional matrix to store result
* @return {Matrix4} dst or a new matrix if none provided
* @memberOf module:webgl-3d-math
*/
function lookAt(cameraPosition, target, up, dst) {
    dst = dst || new Float32Array(16);
    var zAxis = normalize(
        subtractVectors(cameraPosition, target));
    var xAxis = normalize(cross(up, zAxis));
    var yAxis = normalize(cross(zAxis, xAxis));

    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = zAxis[0];
    dst[9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = cameraPosition[0];
    dst[13] = cameraPosition[1];
    dst[14] = cameraPosition[2];
    dst[15] = 1;

    return dst;
}

/**
* Creates a lookAt matrix.
* This is a world matrix for a camera. In other words it will transform
* from the origin to a place and orientation in the world. For a view
* matrix take the inverse of this.
* @param {Vector3} cameraPosition position of the camera
* @param {Vector3} target position of the target
* @param {Vector3} up direction
* @param {Matrix4} [dst] optional matrix to store result
* @return {Matrix4} dst or a new matrix if none provided
* @memberOf module:webgl-3d-math
*/
function lookAtGlm(cameraPosition, target, up, dst) {
    dst = dst || new Float32Array(16);
    var zAxis = normalize(
        subtractVectors(target, cameraPosition));
    var xAxis = normalize(cross(zAxis, up));
    var yAxis = normalize(cross(xAxis, zAxis));

    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = -zAxis[0];
    dst[9] = -zAxis[1];
    dst[10] = -zAxis[2];
    dst[11] = 0;
    dst[12] = -cameraPosition[0];
    dst[13] = -cameraPosition[1];
    dst[14] = cameraPosition[2];
    dst[15] = 1;

    return dst;
}

/**
   * Computes the dot product of two vectors; assumes both vectors have
   * three entries.
   * @param {Vector3} a Operand vector.
   * @param {Vector3} b Operand vector.
   * @return {number} dot product
   * @memberOf module:webgl-3d-math
   */
function dot(a, b) {
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

/**
  * normalizes a vector.
  * @param {Number[]} v vector to normalzie
  * @param {Vector3} dst optional vector3 to store result
  * @return {Vector3} dst or new Vector3 if not provided
  * @memberOf module:webgl-3d-math
  */
function normalize(v, dst) {
    dst = dst || new Float32Array(3);
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    // make sure we don't divide by 0.
    if (length > 0.00001) {
        dst[0] = v[0] / length;
        dst[1] = v[1] / length;
        dst[2] = v[2] / length;
    }
    return dst;
}

/**
  * subtracts 2 vectors3s
  * @param {Vector3} a a
  * @param {Vector3} b b
  * @param {Vector3} dst optional vector3 to store result
  * @return {Vector3} dst or new Vector3 if not provided
  * @memberOf module:webgl-3d-math
  */
function subtractVectors(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
}

/**
  * Computes the cross product of 2 vectors3s
  * @param {Vector3} a a
  * @param {Vector3} b b
  * @param {Vector3} dst optional vector3 to store result
  * @return {Vector3} dst or new Vector3 if not provided
  * @memberOf module:webgl-3d-math
  */
function cross(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = a[2] * b[0] - a[0] * b[2];
    dst[2] = a[0] * b[1] - a[1] * b[0];
    return dst;
}

/**
  * Computes the inverse of a matrix.
  * @param {Matrix4} m matrix to compute inverse of
  * @param {Matrix4} [dst] optional matrix to store result
  * @return {Matrix4} dst or a new matrix if none provided
  * @memberOf module:webgl-3d-math
  */
function inverse(m, dst) {
    dst = dst || new Float32Array(16);
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0 = m22 * m33;
    var tmp_1 = m32 * m23;
    var tmp_2 = m12 * m33;
    var tmp_3 = m32 * m13;
    var tmp_4 = m12 * m23;
    var tmp_5 = m22 * m13;
    var tmp_6 = m02 * m33;
    var tmp_7 = m32 * m03;
    var tmp_8 = m02 * m23;
    var tmp_9 = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
        (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

    return dst;
}

function radians(angle){
    return angle * Math.PI / 180
}

export default {
    scaling,
    zRotate,
    scale,
    axisRotate,
    identity,
    translate,
    perspective,
    lookAt,
    inverse,
    lookAtGlm,
    normalize,
    cross,
    radians,
};