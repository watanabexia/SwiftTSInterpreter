// This is a sample code to test the classes in Swift-Barcelona.
var g = -5

func add(a: Int, b:Int, c: Int) -> Int {
    let d = a + b + c
    return d
}

var age = 12500

class Baby {
    var age: Int
    init(age: Int) {
        self.age = age
    }
}
var baby1 = Baby(age: add(a: 1, b: 2, c: 3))
var random_age = 10
baby1.age
baby1.age = 110
baby1.age

class Adult {
    var name = "Amy"
    var real_age: Int
    required init(age: Int, name: String) {
        self.name = name
        self.real_age = age
    }
    var age: Int {
        get {
            return real_age
        }
        set(a) {
            real_age = a
        }
    }
    var sum: Int {
        get {
            let baby_age = baby1.age
            return baby_age + random_age + real_age + self.give_me_five()
        }
    }
    func add_age(add: Int) {
        real_age = real_age + add
    }
    func give_me_five() -> Int {
        let a = self.real_age
        return a + 5
    }
}
var adult1 = Adult(age: 10, name: "Amy")
adult1.age = 5
adult1.add_age(add: 11)
adult1.sum + adult1.give_me_five()
