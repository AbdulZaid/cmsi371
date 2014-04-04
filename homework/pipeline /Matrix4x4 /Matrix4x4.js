
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

        // GL expects its matrices in column major order.
        return [
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) + zs,
            (xz * oneMinusC) - ys,
            0.0,

            (xy * oneMinusC) - zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) + xs,
            0.0,

            (xz * oneMinusC) + ys,
            (yz * oneMinusC) - xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ];
    };

    // Returns the element specified by the user.
    matrix4x4.prototype.elementAt = function (index) {
        if (index < 0 || index > 15) {
            throw "Index out of bounds";
        }
        return this.elements[index];
    };

    // Returns the row specified by the user.
    matrix4x4.prototype.rowAt = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds";
        }

        return [this.elements[0 + (index * 4)],
                this.elements[1 + (index * 4)],
                this.elements[2 + (index * 4)],
                this.elements[3 + (index * 4)]];
    };

    // Returns the column specified by the user.
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

        // Dimensionality check.
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


    return matrix4x4;
})();
