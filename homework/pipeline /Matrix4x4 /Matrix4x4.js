
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


    // Basic methods.
    matrix4x4.prototype.dimensions = function () {
        return this.elements.length;
    };

    return matrix4x4;
})();
