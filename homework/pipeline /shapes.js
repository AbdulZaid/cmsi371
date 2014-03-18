/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
	
	field: function () {
        var X = 0.95,
          Y = 0.45,
          Z = -0.05;

        return {
          vertices: [
              [X, Y, Z],
              [X, -Y, Z],
              [-X, -Y, Z],
              [-X, Y, Z],
              [X, Y, -Z],
              [X, -Y, -Z],
              [-X, -Y, -Z],
              [-X, Y, -Z]
          ],

          indices: [
              [ 0, 1, 3 ], 
              [ 3, 2, 1 ],
              [ 0, 1, 5 ], // Sides
              [ 5, 4, 0 ],
              [ 3, 2, 6 ],
              [ 6, 7, 3 ],
              [ 0, 3, 4 ], // Top
              [ 3, 4, 7 ],
              [ 1, 2, 5 ], // Bottom
              [ 2, 5, 6 ],
              [ 4, 5, 6 ], // Back
              [ 4, 6, 7 ]
          ]
        };
    },
    /*
     * Returns the vertices for a cube.
     */
    cube: function () {
        var X = 0.3,
            Y = 0.36,
            Z = 0.5;
            
        return {
            vertices: [
                [X, Y, Z],
                [X, Y, -Z],
                [X, -Y, Z],
                [X, -Y, -Z],
                [-X, Y, Z],
                [-X, Y, -Z],
                [-X, -Y, Z],
                [-X, -Y, -Z]
            ],
                
            indices: [
                [0, 1, 3],
                [2, 0, 3],
                [7, 2, 3],
                [6, 7, 2],
                [4, 0, 2],
                [6, 4, 2],
                [5, 1, 7],
                [1, 3, 7],
                [4, 5, 7],
                [6, 4, 7],
                [4, 5, 0],
                [5, 1, 0]
            ]
        };
    },
        /*
         * Returns the vertices and indices for a sphere.
         */
    sphere: function () {
        var radius = 0.5,
            theta,
            sinTheta,
            cosTheta,
            phi,
            latitudeBelts = 40,
            longitudeBelts = 40,
            vertices = [],
            indices = [],
            top,
            bottom,
            x,
            y,
            z,
            i,
            j,
            k,
            l,
            sphereValues = {};
        
        for (i = 0; i < latitudeBelts + 1; i += 1) {
            theta = (i * Math.PI) / latitudeBelts;
            sinTheta = Math.sin(theta);
            cosTheta = Math.cos(theta);
            
            for (j = 0; j < longitudeBelts + 1; j += 1) {
                phi = (j * 2 * Math.PI) / longitudeBelts;
                x = radius * Math.cos(phi) * sinTheta;
                y = radius * cosTheta;
                z = radius * Math.sin(phi) * sinTheta;
                //pushes to the vertices the measured x, y, and z.
                vertices.push([x, y, z]);
            }
        }
        
        for (i = 0; i < latitudeBelts + 1; i += 1) {
            for (j = 0; j < longitudeBelts + 1; j += 1) {
                top = (i * (longitudeBelts + 1)) + j;
                bottom = top + longitudeBelts + 1;
                //pushes to the indices array.
                indices.push([top, bottom, top + 1]);
                indices.push([bottom, bottom + 1, top + 1]);
            }
        }
        
        sphereValues.vertices = vertices;
        sphereValues.indices = indices;
        return sphereValues;
    },
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
