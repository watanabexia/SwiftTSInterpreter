// This is a sample code to test the functions in Swift-Barcelona.
// Try to uncomment the commented line and check the error message.
var g = -5

func add(a: Int, b:Int, c: Int) -> Int {
    var d = 0
    g = 1 // Modify Global Variable

    if (a > 6) {
        d = 3
    } else {
        d = 5 + a + b + c
    }

    d = d - g
    return d
}

var c: Int

c = -add(a:1+g,b:3,c:5)
c = add(a:add(a:1,b:g,c:4)+1,b:1,c:5+1)
// c = add(x:2,b:2,c:4)
// c = add(a:2,b:1)
// c = add(b:1,a:3,c:2)
// c = add(a:"ABC",b:5,c:7)
c

// func minus(a: Int, b:Int, c: Int) {
func minus(a: Int, b:Int, c: Int) -> Int {
    var d = a + b + c
    d = d - 1
    // return "ABC"
    return d
}

let d = minus(a:1,b:2,c:3) + 1
d
