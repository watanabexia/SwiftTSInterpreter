protocol Person {
    var name: String { get }
    var age: Int { get set }
}

class Adult: Person {
    var real_age = 0
    var name: Int {
        get {
            return 3
        }
    }
    var age: Int {
        get {
            return real_age
        }
        set(a) {
            real_age = a + 1
        }
    }
}

var adult1 = Adult()
var test: Int
test = adult1.name
test = adult1.age
adult1.age = 2
test = adult1.age
adult1 = 3
test