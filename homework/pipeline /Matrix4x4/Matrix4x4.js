
var Matrix4x4 = (function () {
    // Define the constructor.
    var matrix4x4 = function () {
        this.elements = arguments.length ?
            [].slice.call(arguments) :
            //simple 16 elemet matrix.
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1];
    };    

    // A function for checking dimensions,
    // throwing an exception when different.
    var checkDimensions = function (matrix1, matrix2) {
        if (matrix1.dimensions() !== matrix2.dimensions()) {
            throw "The two matrices have different dimensions";
        }
    };
    
    // Basic methods.
    matrix4x4.prototype.dimensions = function () {
        return this.elements.length;
    };

    matrix4x4.getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,

            // We can't calculate this until we have normalized
            // the axis vector of rotation.
            x2, // "2" for "squared."
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        // Matrix4x4 in row major order.
        return new Matrix4x4(
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) - zs,
            (xz * oneMinusC) + ys,
            0.0,

            (xy * oneMinusC) + zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) - xs,
            0.0,

            (xz * oneMinusC) - ys,
            (yz * oneMinusC) + xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        );
    };
    
    // Returns the array of elements in the matrix.
    matrix4x4.prototype.elements = function () {
        return this.elements;
    };

    // Returns the element specified.
    matrix4x4.prototype.elementAt = function (index) {
        if (index < 0 || index > 15) {
            throw "Index out of bounds";
        }
        return this.elements[index];
    };

    // Returns the row specified.
    matrix4x4.prototype.rowAt = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds";
        }

        return [this.elements[0 + (index * 4)],
                this.elements[1 + (index * 4)],
                this.elements[2 + (index * 4)],
                this.elements[3 + (index * 4)]];
    };

    // Returns the column specified.
    matrix4x4.prototype.columnAt = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds";
        }

        return [this.elements[index],
                this.elements[index + 4],
                this.elements[index + 8],
                this.elements[index + 12]];
    };

    // Matrix multiplication. Checks if the dimensions of both matricies are the same.
    matrix4x4.prototype.multiply = function (m) {
        var result = new Matrix4x4(),
            total,
            rows = 4,
            columns = 4;

        // Check the dimensions.
        checkDimensions(this, m);

        for (var i = 0; i < rows; i ++) {
            for (var j = 0; j < columns; j ++) {
                total = 0;
                for (var k = 0; k < rows; k ++) {
                    total += this.elementAt((i * 4) + k) * m.elementAt((k * 4) + j); 
                }
                result.elements[(i * 4) + j] = total;
            }
        }
        
        return result;
    };

    matrix4x4.getTranslationMatrix = function (tx, ty, tz) {
        return new Matrix4x4(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        );
    };

    matrix4x4.getScaleMatrix = function (sx, sy, sz) {
        return new Matrix4x4(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        );
    };

    matrix4x4.getOrthoMatrix = function (left, top, right, bottom, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;
        
        // 4x4 Matrix.
        return new Matrix4x4(
            2 / width,
            0,
            0,
            0,

            0,
            2 / height,
            0,
            0,

            0,
            0,
            -2.0 / depth,
            0,

            -(right + left) / width,
            -(top + bottom) / height,
            -(zFar + zNear) / depth,
            1
        );
    };

    matrix4x4.getFrustumMatrix = function (left, top, right, bottom, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        // 4x4 Matrix in row major order.
        return new Matrix4x4(
            2.0 * zNear / width,
            0.0,
            (right + left) / width,
            0.0,

            0.0,
            2.0 * zNear / height,
            (top + bottom) / height,
            0.0,

            0.0,
            0.0,
            -(zFar + zNear) / depth,
            -2.0 * zFar * zNear / depth,

            0.0,
            0.0,
            -1.0,
            0.0
        );
    };

    matrix4x4.lookAt = function (px, py, pz, qx, qy, qz, upx, upy, upz) {
        var p = new Vector(px, py, pz),
            q = new Vector(qx, qy, qz),
            up = new Vector(upx, upy, upz);

        var ze = p.subtract(q).unit(),
            ye = up.subtract(up.projection(ze)).unit(),
            xe = ye.cross(ze);

        return new matrix4x4(
            xe.x(), xe.y(), xe.z(), -p.dot(xe),
            ye.x(), ye.y(), ye.z(), -p.dot(ye),
            ze.x(), ze.y(), ze.z(), -p.dot(ze),
            0, 0, 0, 1
        );
    };
    
    //Conversion/convenience functions to prepare the matrix data for 
    //direct consumption by WebGL and GLSL 
    matrix4x4.prototype.conversion = function () {
        return this.columnAt(0).concat(
               this.columnAt(1).concat(
               this.columnAt(2).concat(
               this.columnAt(3))));
    };

    return matrix4x4;
})();
