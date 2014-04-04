/*
 * Unit tests for our Matrix object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var matrix = new Matrix4x4();
            deepEqual(matrix.elements,
                [1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 0, 0, 0, 1],
                "Default matrix constructor");

        matrix = new Matrix4x4(0, 1, 2, 3,
                      90, 24, 67, 32,
                      123, 5, Math.PI, 6,
                      3.2, 4, 0, 7);

        deepEqual(matrix.elements,
            [0, 1, 2, 3,
             90, 24, 67, 32,
             123, 5, Math.PI, 6,
             3.2, 4, 0, 7],
            "Matrix constructor with passed values");

        matrix = new Matrix4x4(2, 2, 2, 2,
                      3, 3, 3, 30,
                      81, 39, 140, 141,
                      122, 132, 143, 152);

        deepEqual(matrix.rowAt(0),
            [2, 2, 2, 2],
            "Testing matrix at raw one is successful");
        deepEqual(matrix.rowAt(1),
            [3, 3, 3, 30],
            "Testing matrix at raw two is successful");
        deepEqual(matrix.rowAt(2),
            [81, 39, 140, 141],
            "Testing matrix at raw three is successful");
        deepEqual(matrix.rowAt(3),
            [122, 132, 143, 152],
            "Testing matrix at raw four is successful");

        deepEqual(matrix.columnAt(0),
            [2, 3, 81, 122],
            "Testing matrix at column one is successful");
        deepEqual(matrix.columnAt(1),
            [2, 3, 39, 132],
            "Testing matrix at column two is successful");
        deepEqual(matrix.columnAt(2),
            [2, 3, 140, 143],
            "Testing matrix at column three is successful");
        deepEqual(matrix.columnAt(3),
            [2, 30, 141, 152],
            "Testing matrix at column four is successful");
    });


    test("Matrix Multiplication", function () {
        var matrix1 = new Matrix4x4(0, 1, 2, 3,
                                4, 5, 6, 7,
                                8, 9, 10, 11,
                                12, 13, 14, 15),

            matrix2 = new Matrix4x4(0, 1, 2, 3,
                                4, 5, 6, 7,
                                8, 9, 10, 11,
                                12, 13, 14, 15),

            multiplicationResult = matrix1.multiply(matrix2);

        equal(multiplicationResult.dimensions(), 16, "Matrix size check");
        deepEqual(multiplicationResult.elements,
            [56, 62, 68, 74,
             152, 174, 196, 218,
             248, 286, 324, 362,
             344, 398, 452, 506],
            "4x4 matrix multiplication first test");


        var matrix1 = new Matrix4x4(2, 1, 3, -12,
                                1, 2, -83, -64,
                                -150, -20, 30, 0,
                                -20, 45,  62, 82),

            matrix2 = new Matrix4x4(3, 6, 9, 12,
                                -1, -2, -3, -4,
                                -10, 20, -30, 40,
                                20, 40, 60, 80),

            multiplicationResult = matrix1.multiply(matrix2);
        deepEqual(multiplicationResult.elements,
            [-265, -410, -795, -820,
             -449, -4218, -1347, -8436,
             -730, -260, -2190, -520,
             915, 4310, 2745, 8620],
            "4x4 matrix multiplication second test");
    });
    

    test("Translation, of Matrices", function () {
        var matrix = Matrix4x4.getTranslationMatrix(5, 9, 10);
        deepEqual(matrix.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, 10,
             0, 0, 0, 1],
            "Translation matrix success");
    });

    test("Scaling, of Matrices", function () {
        matrix = Matrix4x4.getScaleMatrix(2, 5, 21);
        deepEqual(matrix.elements,
            [2, 0, 0, 0,
             0, 5, 0, 0,
             0, 0, 21, 0,
             0, 0, 0, 1],
            "Scale matrix success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
    });

    test("Rotation, of Matrices", function () {
        matrix = Matrix4x4.getRotationMatrix(30, 0, 0, 1);
        deepEqual(matrix.elements,
            [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), 0, 0,
             Math.sin(Math.PI / 6), Math.cos(Math.PI / 6), 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Rotation of the matrix by 30 degrees about the z-axis");

        matrix = Matrix4x4.getRotationMatrix(270, 0, 1, 0);
        deepEqual(matrix.elements,
            [Math.cos(3 * (Math.PI / 2)), 0, Math.sin(3 * (Math.PI / 2)), 0,
             0, 1, 0, 0,
             -Math.sin(3 * (Math.PI / 2)), 0, Math.cos(3 * (Math.PI / 2)), 0,
             0, 0, 0, 1],
            "Rotation of the matrix by 270 degrees about the y-axis");

        matrix = Matrix4x4.getRotationMatrix(50, 1, 0, 0);
        deepEqual(matrix.elements,
            [1, 0, 0, 0,
             0, Math.cos(50 * Math.PI / 180), -Math.sin(50 * Math.PI / 180), 0,
             0, Math.sin(50 * Math.PI / 180), Math.cos(50 * Math.PI / 180), 0,
             0, 0, 0, 1],
            "Rotation of the matrix by 50 degrees about the x-axis");
    });

    test("Ortho Matrix4x4 Projection", function () {
        var matrix = Matrix4x4.getOrthoMatrix(-4, 4, -2, 2, -10, 10),
            width = 4 + 4,
            height = 2 + 2,
            depth = 10 + 10;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");
    });

    test("Frustum Matrix4x4 Projection", function () {
        var matrix = Matrix4x4.getFrustumMatrix(0, 1, 0, 1, 0, 1);
        width = 1;
        height = 1;
        depth = 1;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");
    });

    test("Matrix Conversion and Convenience functions", function () {
        var matrix = new Matrix4x4(1, 1, 1, 1,
                               4, 5, 6, 7,
                               2, 2, 2, 2,
                               120, 130, 140, 150);

            matrixConversion = matrix.Conversion();

        deepEqual(matrixConversion,
            [1, 4, 2, 120,
             1, 5, 2, 130,
             1, 6, 2, 140,
             1, 7, 2, 150] ,
            "Matrix conversion");
    });
});
