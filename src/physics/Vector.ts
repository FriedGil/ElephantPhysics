export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    public subtract(vector: Vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    public multiply(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    public divide(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;
    }

    public magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize() {
        this.divide(this.magnitude());
    }

    public copy(){
        return new Vector(this.x,this.y);
    }

    public static add(vector1: Vector, vector2: Vector) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    public static subtract(vector1: Vector, vector2: Vector) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    public static multiply(vector: Vector, scalar: number) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    public static divide(vector: Vector, scalar: number) {
        return new Vector(vector.x / scalar, vector.y / scalar);
    }

    public static dot(vector1: Vector, vector2: Vector) {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    public static cross(vector1: Vector, vector2: Vector) {
        return vector1.x * vector2.y - vector1.y * vector2.x;
    }

    public static distance(vector1: Vector, vector2: Vector) {
        return Vector.subtract(vector1, vector2).magnitude();
    }

    public static normalize(vector1: Vector) {
        return new Vector(vector1.x / vector1.magnitude(), vector1.y / vector1.magnitude());
    }


}