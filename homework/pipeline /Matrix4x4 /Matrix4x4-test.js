/*
 * Unit tests for our vector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var matrix1 = new Matrix4x4();
            deepEqual(matrix1.elements,
                [1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 0, 0, 0, 1],
                "Default matrix constructor");

        m = new Matrix4x4(0, 1, 2, 3,
                      90, 24, 67, 32,
                      123, 5, Math.PI, 6,
                      3.2, 4, 0, 7);

        deepEqual(m.elements,
            [0, 1, 2, 3,
             90, 24, 67, 32,
             123, 5, Math.PI, 6,
             3.2, 4, 0, 7],
            "Matrix constructor with passed values");

        m = new Matrix4x4(2, 2, 2, 2,
                      3, 3, 3, 30,
                      81, 39, 140, 141,
                      122, 132, 143, 152);

        deepEqual(m.rowAt(0),
            [2, 2, 2, 2],
            "Testing matrix at raw one is successful");
        deepEqual(m.rowAt(1),
            [3, 3, 3, 30],
            "Testing matrix at raw two is successful");
        deepEqual(m.rowAt(2),
            [81, 39, 140, 141],
            "Testing matrix at raw three is successful");
        deepEqual(m.rowAt(3),
            [122, 132, 143, 152],
            "Testing matrix at raw four is successful");

        deepEqual(m.columnAt(0),
            [2, 3, 81, 122],
            "Testing matrix at column one is successful");
        deepEqual(m.columnAt(1),
            [2, 3, 39, 132],
            "Testing matrix at column two is successful");
        deepEqual(m.columnAt(2),
            [2, 3, 140, 143],
            "Testing matrix at column three is successful");
        deepEqual(m.columnAt(3),
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
        var m = Matrix4x4.getTranslationMatrix(5, 9, 10);
        deepEqual(m.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, 10,
             0, 0, 0, 1],
            "Translation matrix success");
    });

    test("Scaling, of Matrices", function () {
        m = Matrix4x4.getScaleMatrix(2, 5, 21);
        deepEqual(m.elements,
            [2, 0, 0, 0,
             0, 5, 0, 0,
             0, 0, 21, 0,
             0, 0, 0, 1],
            "Scale matrix success");

        m = new Matrix4x4(0, 1, 2, 3,
                      4, 5, 6, 7,
                      8, 9, 10, 11,
                      12, 13, 14, 15);
    });

    test("Rotation, of Matrices", function () {
        m = Matrix4x4.getRotationMatrix(30, 0, 0, 1);
        deepEqual(m.elements,
            [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), 0, 0,
             Math.sin(Math.PI / 6),  Math.cos(Math.PI / 6), 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Rotation of the matrix by 30 degrees about the z-axis");

        m = Matrix4x4.getRotationMatrix(270, 0, 1, 0);
        deepEqual(m.elements,
            [Math.cos(3 * (Math.PI / 2)), 0, Math.sin(3 * (Math.PI / 2)), 0,
             0, 1, 0, 0,
             -Math.sin(3 * (Math.PI / 2)), 0, Math.cos(3 * (Math.PI / 2)), 0,
             0, 0, 0, 1],
            "Rotation of the matrix by 270 degrees about the y-axis");

        m = Matrix4x4.getRotationMatrix(50, 1, 0, 0);
        deepEqual(m.elements,
            [1, 0, 0, 0,
             0, Math.cos(50 * Math.PI / 180), -Math.sin(50 * Math.PI / 180), 0,
             0, Math.sin(50 * Math.PI / 180),  Math.cos(50 * Math.PI / 180), 0,
             0, 0, 0, 1],
            "Rotation of the matrix by 87 degrees about the x-axis");
    });

});
