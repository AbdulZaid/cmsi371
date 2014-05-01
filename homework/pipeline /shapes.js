/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a soccer field.
     */
	field: function () {
        var X = 0.45,
          	Y = 0.95,
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

    // JD: Note how you can combine your field and cube shapes by just having
    //     a single implementation and using a scale instance transform to
    //     produce different sizes.

    /*
     * Returns the vertices for a cube. Later will be a soocer goal.
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
                [0, 1, 3], // right side triangles.
                [2, 0, 3],
                [7, 2, 3], // top triangles.
                [6, 7, 2],
                [4, 0, 2], //back side trinagles.
                [6, 4, 2],
                [5, 1, 7], //front side triangles.
                [1, 3, 7],
                [4, 5, 7], // left side triangles.
                [6, 4, 7],
                [4, 5, 0],
                [5, 1, 0]
            ]
        };
    },
    
    /*
     * Returns the vertices and indices for a sphere. Later will be the ball to be scored.
     */
    sphere: function (radius, latitudeBelts, longitudeBelts) {
        var radius = radius,
            theta,
            sinTheta,
            cosTheta,
            phi,
            latBelts = latitudeBelts,
            longBelts = longitudeBelts,
            vertices = [],
            indices = [],
            top,
            bottom,
            x,
            y,
            z,
            i,
            j,
            sphereData = {};

        // This creates the vertices for the circle.
        for (i = 0; i < latBelts + 1; i += 1) {
            theta = (i * Math.PI) / latBelts;
            sinTheta = Math.sin(theta);
            cosTheta = Math.cos(theta);

            for (j = 0; j < longBelts + 1; j += 1) {
                phi = (j * 2 * Math.PI) / longBelts;
                x = radius * Math.cos(phi) * sinTheta;
                y = radius * cosTheta;
                z = radius * Math.sin(phi) * sinTheta;

                vertices.push([x, y, z]);
            }
        }

        // This creates the indices for the circle.
        for (i = 0; i < latBelts + 1; i += 1) {
            for (j = 0; j < longBelts + 1; j += 1) {
                top = (i * (longBelts + 1)) + j;
                bottom = top + longBelts + 1;

                indices.push([top, bottom, top + 1]);
                indices.push([bottom, bottom + 1, top + 1]);
            }
        }

        sphereData.vertices = vertices;
        sphereData.indices = indices;
        return sphereData;
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
    },
    
    toNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = indexedVertices.vertices[indexedVertices.indices[i][0]];
            p1 = indexedVertices.vertices[indexedVertices.indices[i][1]];
            p2 = indexedVertices.vertices[indexedVertices.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },

    toVertexNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                p = indexedVertices.vertices[indexedVertices.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    }


};
