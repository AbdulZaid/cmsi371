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

        var matrix1 = new Matrix4x4(2, 1, 3, -12,
                                1, 2, -83, -64,
                                -150, -20, 30, 0,
                                -20, 45,  62, 82),

            matrix2 = new Matrix4x4(3, 96, 9, 12,
                                1, -20, 380, -400,
                                10, 200, -390, 40,
                                20, 40, 60, 870),

            multiplicationResult = matrix1.multiply(matrix2);
        deepEqual(multiplicationResult.elements,
            [-203, 292, -1492, -10696,
             -2105, -19104, 29299, -59788,
             -170, -8000, -20650, 7400,
             2245, 12860, -2340, 55580],
            "4x4 matrix multiplication third test");

        var matrix1 = new Matrix4x4(3, 96, 9, 12,
                                1, 0, 380, -400,
                                50, 1, -390, 40,
                                0, 40, 10, 80),

            matrix2 = new Matrix4x4(3, 96, 9, 12,
                                1, -0, 380, -400,
                                10, 0, -390, 40,
                                20, 40, 60, 70),

            multiplicationResult = matrix1.multiply(matrix2);
        deepEqual(multiplicationResult.elements,
            [435, 768, 33717, -37164,
             -4197, -15904, -172191, -12788,
             -2949, 6400, 155330, -12600,
             1740, 3200, 16100, -10000],
            "4x4 matrix multiplication fourth test");

        var matrix1 = new Matrix4x4(3, 4, 9, 12,
                                1, 0, 1, -1,
                                22, 1, -2, 40000000000,
                                0, 2, 1, 80),

            matrix2 = new Matrix4x4(3, 6, 9, 12,
                                1, 0, 380, 2,
                                1, 1, 0, 0,
                                2, 40, 60, 7),

            multiplicationResult = matrix1.multiply(matrix2);
        deepEqual(multiplicationResult.elements,
            [46, 507, 2267, 128,
             2, -33, -51, 5,
             80000000065, 1600000000130, 2400000000578,  280000000266,
             163, 3201, 5560, 564],
            "4x4 matrix multiplication Fifth test");
    });
    

    test("Translation, of Matrices", function () {
        var matrix = Matrix4x4.getTranslationMatrix(5, 9, 10);
        deepEqual(matrix.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, 10,
             0, 0, 0, 1],
            "Translation matrix First success");
        
        var matrix = Matrix4x4.getTranslationMatrix(1, 92, 110);
        deepEqual(matrix.elements,
            [1, 0, 0, 1,
             0, 1, 0, 92,
             0, 0, 1, 110,
             0, 0, 0, 1],
            "Translation matrix Second success");
        
        var matrix = Matrix4x4.getTranslationMatrix(15, 229, 210);
        deepEqual(matrix.elements,
            [1, 0, 0, 15,
             0, 1, 0, 229,
             0, 0, 1, 210,
             0, 0, 0, 1],
            "Translation matrix Third success");
        
        var matrix = Matrix4x4.getTranslationMatrix(2, 55, -120);
        deepEqual(matrix.elements,
            [1, 0, 0, 2,
             0, 1, 0, 55,
             0, 0, 1, -120,
             0, 0, 0, 1],
            "Translation matrix Fourth success");
        
        var matrix = Matrix4x4.getTranslationMatrix(5, 9, 10);
        deepEqual(matrix.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, 10,
             0, 0, 0, 1],
            "Translation matrix Sixth success");
        
        var matrix = Matrix4x4.getTranslationMatrix(115, -9, 210);
        deepEqual(matrix.elements,
            [1, 0, 0, 115,
             0, 1, 0, -9,
             0, 0, 1, 210,
             0, 0, 0, 1],
            "Translation matrix Seventh success");
        
        var matrix = Matrix4x4.getTranslationMatrix(0, 0, 0);
        deepEqual(matrix.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Translation matrix Eighth success");
        
        var matrix = Matrix4x4.getTranslationMatrix(11115, 0, -10);
        deepEqual(matrix.elements,
            [1, 0, 0, 11115,
             0, 1, 0, 0,
             0, 0, 1, -10,
             0, 0, 0, 1],
            "Translation matrix Ninth success");
        
        var matrix = Matrix4x4.getTranslationMatrix(1, 1, 1);
        deepEqual(matrix.elements,
            [1, 0, 0, 1,
             0, 1, 0, 1,
             0, 0, 1, 1,
             0, 0, 0, 1],
            "Translation matrix Tenth success");
        
        var matrix = Matrix4x4.getTranslationMatrix(22222, 555555, -12120);
        deepEqual(matrix.elements,
            [1, 0, 0, 22222,
             0, 1, 0, 555555,
             0, 0, 1, -12120,
             0, 0, 0, 1],
            "Translation matrix Eleventh success");
        
        var matrix = Matrix4x4.getTranslationMatrix(5, 9, 100000000);
        deepEqual(matrix.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, 100000000,
             0, 0, 0, 1],
            "Translation matrix Twelfth success");
    });

    test("Scaling, of Matrices", function () {
        matrix = Matrix4x4.getScaleMatrix(2, 5, 21);
        deepEqual(matrix.elements,
            [2, 0, 0, 0,
             0, 5, 0, 0,
             0, 0, 21, 0,
             0, 0, 0, 1],
            "Scale matrix First success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
        
        matrix = Matrix4x4.getScaleMatrix(1, 1, 1);
        deepEqual(matrix.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Scale matrix Second success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
        
        matrix = Matrix4x4.getScaleMatrix(-222, -225, -11);
        deepEqual(matrix.elements,
            [-222, 0, 0, 0,
             0, -225, 0, 0,
             0, 0, -11, 0,
             0, 0, 0, 1],
            "Scale matrix Third success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
        
        matrix = Matrix4x4.getScaleMatrix(2, 25, 101010);
        deepEqual(matrix.elements,
            [2, 0, 0, 0,
             0, 25, 0, 0,
             0, 0, 101010, 0,
             0, 0, 0, 1],
            "Scale matrix Fourth success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
        
        matrix = Matrix4x4.getScaleMatrix(22, 55, 11);
        deepEqual(matrix.elements,
            [22, 0, 0, 0,
             0, 55, 0, 0,
             0, 0, 11, 0,
             0, 0, 0, 1],
            "Scale matrix Fifth success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);

        matrix = Matrix4x4.getScaleMatrix(-2, 555, 2111);
        deepEqual(matrix.elements,
            [-2, 0, 0, 0,
             0, 555, 0, 0,
             0, 0, 2111, 0,
             0, 0, 0, 1],
            "Scale matrix Sixth success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);

                matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
        
        matrix = Matrix4x4.getScaleMatrix(2, 25, -101010);
        deepEqual(matrix.elements,
            [2, 0, 0, 0,
             0, 25, 0, 0,
             0, 0, -101010, 0,
             0, 0, 0, 1],
            "Scale matrix Seventh success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);
        
        matrix = Matrix4x4.getScaleMatrix(22, -55, 11);
        deepEqual(matrix.elements,
            [22, 0, 0, 0,
             0, -55, 0, 0,
             0, 0, 11, 0,
             0, 0, 0, 1],
            "Scale matrix Eighth success");

        matrix = new Matrix4x4(0, 1, 2, 3,
                           4, 5, 6, 7,
                           8, 9, 10, 11,
                           12, 13, 14, 15);

        matrix = Matrix4x4.getScaleMatrix(-222222, -555, 2111);
        deepEqual(matrix.elements,
            [-222222, 0, 0, 0,
             0, -555, 0, 0,
             0, 0, 2111, 0,
             0, 0, 0, 1],
            "Scale matrix Ninth success");

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
        var matrix = Matrix4x4.getOrthoMatrix(-4, 2, 4, -2, -10, 10),
            width = 4 + 4,
            height = 2 + 2,
            depth = 10 + 10;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");

        var matrix = Matrix4x4.getOrthoMatrix(-400, 100, 400, -100, -10, 10),
            width = 400 + 400,
            height = 100 + 100,
            depth = 10 + 10;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");

        var matrix = Matrix4x4.getOrthoMatrix(-24, 22, 24, -22, -120, 120),
            width = 24 + 24,
            height = 22 + 22,
            depth = 120 + 120;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");
        
        var matrix = Matrix4x4.getOrthoMatrix(-334, 2, 334, -2, -10, 10),
            width = 334 + 334,
            height = 2 + 2,
            depth = 10 + 10;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");

        var matrix = Matrix4x4.getOrthoMatrix(-4, 122, 4, -122, -10, 10),
            width = 4 + 4,
            height = 122 + 122,
            depth = 10 + 10;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");

        var matrix = Matrix4x4.getOrthoMatrix(-22, 2, 22, -2, -1, 1),
            width = 22 + 22,
            height = 2 + 2,
            depth = 1 + 1;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");

        var matrix = Matrix4x4.getOrthoMatrix(-4, 11, 4, -11, -5, 5),
            width = 4 + 4,
            height = 11 + 11,
            depth = 5 + 5;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");

        var matrix = Matrix4x4.getOrthoMatrix(-11111, 11, 11111, -11, -5, 5),
            width = 11111 + 11111,
            height = 11 + 11,
            depth = 5 + 5;
        deepEqual(matrix.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Matrix orthogonal projection");
    });

    test("Frustum Matrix4x4 Projection", function () {
        var matrix = Matrix4x4.getFrustumMatrix(0, 1, 1, 0, 0, 2);
        width = 1;
        height = 1;
        depth = 2;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");

        var matrix = Matrix4x4.getFrustumMatrix(0, 10, 12, 0, 0, 22);
        width = 10;
        height = 12;
        depth = 22;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");
        
        var matrix = Matrix4x4.getFrustumMatrix(0, 112, 111111, 0, 0, 2334);
        width = 112;
        height = 111111;
        depth = 2334;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");

        var matrix = Matrix4x4.getFrustumMatrix(0, 10101, 101010, 0, 0, 20001);
        width = 10101;
        height = 101010;
        depth = 20001;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");
        
        var matrix = Matrix4x4.getFrustumMatrix(0, 121, 1211, 0, 0, 332);
        width = 121;
        height = 1211;
        depth = 332;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");

        var matrix = Matrix4x4.getFrustumMatrix(0, 1231, 120001, 0, 0, 21212);
        width = 1231;
        height = 120001;
        depth = 21212;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");

        var matrix = Matrix4x4.getFrustumMatrix(0, 777, 13, 0, 0, 2);
        width = 777;
        height = 13;
        depth = 2;
        deepEqual(matrix.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Matrix frustum projection");

        var matrix = Matrix4x4.getFrustumMatrix(0, 99, 11, 0, 0, 3122);
        width = 99;
        height = 11;
        depth = 3122;
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

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [1, 4, 2, 120,
             1, 5, 2, 130,
             1, 6, 2, 140,
             1, 7, 2, 150],
            "Matrix conversion");

        var matrix = new Matrix4x4(11, 11, 11, 11,
                               40, 50, 60, 70,
                               -2, -2, -2, -2,
                               120, 130, 140, 150);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [11, 40, -2, 120,
             11, 50, -2, 130,
             11, 60, -2, 140,
             11, 70, -2, 150],
            "Matrix conversion");
        
        var matrix = new Matrix4x4(111, 111, 111, 111,
                               412, 512, 612, 712,
                               -212, -212, -212, -212,
                               12012, 13012, 14012, 15012);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [111, 412, -212, 12012,
             111, 512, -212, 13012,
             111, 612, -212, 14012,
             111, 712, -212, 15012],
            "Matrix conversion");
        
        var matrix = new Matrix4x4(-112, -112, -112, -112,
                               412, 512, 612, -712,
                               212, 212, 212, -212,
                               120, 130, 140, -150);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [-112, 412, 212, 120,
             -112, 512, 212, 130,
             -112, 612, 212, 140,
             -112, -712, -212, -150],
            "Matrix conversion");
        
        var matrix = new Matrix4x4(-1, 1, 1, 1,
                               4, 5, -6, 7,
                               2, 2, 2, -2,
                               120, 130, -140, 150);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [-1, 4, 2, 120,
             1, 5, 2, 130,
             1, -6, 2, -140,
             1, 7, -2, 150] ,
            "Matrix conversion");
        
        var matrix = new Matrix4x4(0, 0, 0, 0,
                               40, 50, 60, 70,
                               2, 2, 2, 2,
                               120, 130, 140, 150);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [0, 40, 2, 120,
             0, 50, 2, 130,
             0, 60, 2, 140,
             0, 70, 2, 150] ,
            "Matrix conversion");
        
        var matrix = new Matrix4x4(-1, 1, 1, -1,
                               4, -5, 6, -7,
                               2, -2, 2, -2,
                               120, -130, 140, -150);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [-1, 4, 2, 120,
             1, -5, -2, -130,
             1, 6, 2, 140,
             -1, -7, -2, -150] ,
            "Matrix conversion");

        var matrix = new Matrix4x4(1, 1, 1, 1,
                               121123123124, 121123123124, 6, 7,
                               2, 2, 2, 2,
                               120, 130, 140, 121123123124);

            matrixConversion = matrix.conversion();

        deepEqual(matrixConversion,
            [1, 121123123124, 2, 120,
             1, 121123123124, 2, 130,
             1, 6, 2, 140,
             1, 7, 2, 121123123124] ,
            "Matrix conversion");
    });

});
