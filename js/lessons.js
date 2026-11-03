// Tung's Classroom. Each lesson = [title, explanation (\n = new paragraph), code example, Tung's tip]
const LESSONS = {
py: [
["Variables, types & input","A variable is a name that points to a value. Python picks the type for you: int (5), float (2.5), str (\"hi\"), bool (True/False). Check it with type(x).\ninput() always returns a str, so convert with int() or float() when you need a number. f-strings drop values into text.",`name = input("Name? ")
age = int(input("Age? "))
print(f"{name} is {age}")
print(type(age))   # <class 'int'>`,"Anything in quotes is text, even \"42\"!"],
["Operators & decisions","Arithmetic: + - * / (true division) // (floor division) % (remainder) ** (power). Comparisons (== != < > <= >=) give True or False; combine them with and, or, not.\nif / elif / else run exactly one branch. Indentation (4 spaces) marks the block.",`x = 17
print(x // 5, x % 5, x ** 2)   # 3 2 289
if x > 20:
    print("big")
elif x > 10:
    print("medium")
else:
    print("small")`,"== compares. A single = assigns."],
["Loops","for walks through a sequence. range(start, stop, step) stops BEFORE stop, so range(3) is 0, 1, 2. while repeats as long as its condition is True.\nbreak leaves the loop; continue skips to the next round.",`for i in range(10, 0, -3):
    print(i)          # 10 7 4 1
n = 3
while n > 0:
    print(n)
    n -= 1`,"Forget to change n in a while loop and it runs forever."],
["Functions & scope","def defines a function and return sends a value back (no return means None). Parameters can have default values. Variables created inside a function are local to it.\nTrap: a default like lst=[] is created ONCE and shared by every call, so avoid mutable defaults.",`def add(a, b=1):
    return a + b

print(add(2))      # 3
print(add(2, 5))   # 7`,"Name functions with verbs: add, greet, bonk."],
["Lists, tuples, sets & dicts","list [ ] is ordered and changeable. tuple ( ) is ordered and fixed. set { } keeps unique items. dict {key: value} looks values up by key.\nIndexes start at 0, negative indexes count from the end, and a[1:3] slices. b = a copies the reference, not the list; use a.copy(). A list comprehension builds a list in one line.",`logs = ["oak", "pine", "birch"]
print(logs[0], logs[-1], logs[1:])
hero = {"name": "Tung", "hp": 100}
print(hero["hp"], hero.get("mp", 0))
squares = [n * n for n in range(5)]`,"Dictionary get() never crashes on a missing key."],
["Strings, errors & classes","Strings are sequences: len(s), s[0], s.upper(), s.split(). try / except catches errors so the program doesn't crash.\nA class bundles data and behaviour. __init__ builds a new object and self means \"this object\".",`class Pet:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return self.name + " says hi"

try:
    print(Pet("Tung").speak())
    print(int("abc"))
except ValueError:
    print("Not a number!")`,"Catch specific errors, not everything."]],
html: [
["Page structure & text","Every page: <!DOCTYPE html>, then <html> containing <head> (title, meta) and <body> (what people see). Headings <h1> to <h6>, paragraphs <p>, <strong>, <em>, <br>, <hr>.\nMost tags come in pairs (<p>...</p>). Void tags like <img>, <br>, <input>, <meta> have no closing tag. Extra spaces and line breaks are ignored.",`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Hello</title></head>
<body>
  <h1>Welcome</h1>
  <p>This is <strong>bold</strong> and <em>italic</em>.</p>
</body>
</html>`,"One <h1> per page keeps things tidy."],
["Links, images & lists","<a href=\"url\"> makes a link (target=\"_blank\" opens a new tab). <img src=\"file\" alt=\"description\"> shows an image; alt is read by screen readers.\n<ul> makes bullets, <ol> numbers, and each item is an <li>. Lists can be nested. Relative URLs (images/cat.png) point inside your site; absolute URLs start with https://.",`<a href="https://example.com" target="_blank">Visit</a>
<img src="images/log.png" alt="A wooden log" width="200">
<ol>
  <li>HTML</li>
  <li>CSS
    <ul><li>Flexbox</li><li>Grid</li></ul>
  </li>
</ol>`,"No alt text, no accessibility."],
["Tables","<table> holds rows <tr>. Cells are <td>, header cells are <th>. Group rows with <thead> and <tbody>.\ncolspan merges cells across columns and rowspan merges them down rows. Use tables for data, not for page layout.",`<table>
  <thead><tr><th>Name</th><th>Score</th></tr></thead>
  <tbody>
    <tr><td>Tung</td><td>100</td></tr>
    <tr><td colspan="2">Total: 100</td></tr>
  </tbody>
</table>`,"colspan = columns, rowspan = rows."],
["Forms","<form action=\"/send\" method=\"post\"> wraps inputs. <input type=\"text|email|password|checkbox|radio|color|number\">, <textarea>, <select> with <option>, and <button>.\nConnect a label to its field: <label for=\"email\"> matches <input id=\"email\">. Useful attributes: name, placeholder, required, value.",`<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <select name="lang"><option>Python</option><option>Java</option></select>
  <button type="submit">Send</button>
</form>`,"Clicking a linked label focuses its input."],
["Semantic layout","Semantic tags describe meaning: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>. They help screen readers and search engines.\n<article> is self-contained content (a blog post). <section> groups related content. <div> and <span> are neutral containers for block and inline use.",`<header><h1>My Blog</h1></header>
<nav><a href="/">Home</a></nav>
<main>
  <article><h2>Post</h2><p>Text...</p></article>
  <aside>Related links</aside>
</main>
<footer>© 2026</footer>`,"Prefer meaning over <div> soup."],
["id, class & meta","An id must be unique on the page. A class can be reused, and an element can have several classes (class=\"card big\"). CSS and JavaScript use both to find elements.\nIn <head>: <meta charset=\"utf-8\"> for text encoding, <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> for phones, <link rel=\"stylesheet\" href=\"style.css\">. Scripts load with <script src=\"app.js\"></script>.",`<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <p id="intro" class="note big">Hi</p>
  <script src="app.js"><\/script>
</body>`,"Without the viewport tag, phones shrink your page."]],
css: [
["Selectors, colors & specificity","Selectors pick elements: p (element), .card (class), #nav (id), div p (descendant), ul > li (child), a:hover (pseudo-class). Colors: names, #hex, rgb().\nWhen rules clash, specificity decides: inline style > id > class > element. If still tied, the later rule wins.",`h1 { color: tomato; }
.card { background: #fff4dc; }
#nav a { color: red; }          /* id beats class */
.menu a.active { color: blue; }
a:hover { text-decoration: underline; }`,"One id outweighs any number of classes."],
["The box model","Every element is a box: content, padding (inside), border, margin (outside). box-sizing: border-box makes width include padding and border, which is far easier to plan.\nVertical margins between siblings collapse: 30px and 20px give a 30px gap, not 50px. Units: px, %, em, rem (root font size), vw/vh (viewport).",`* { box-sizing: border-box; }
.box {
  width: 100px;
  padding: 10px;
  border: 5px solid brown;
  margin: 20px auto;
}`,"Start every project with box-sizing: border-box."],
["Display & positioning","display: block fills the row, inline flows with text, inline-block flows but accepts width/height, none hides the element.\nposition: static (default), relative (offset from itself), absolute (relative to the nearest positioned ancestor), fixed (relative to the viewport), sticky (scrolls then sticks). z-index controls stacking.",`.parent { position: relative; }
.badge {
  position: absolute;
  top: 0; right: 0;
  z-index: 10;
}`,"Absolute needs a positioned parent, or it escapes."],
["Flexbox","display: flex on a parent lines its children in a row. flex-direction sets the main axis. justify-content aligns along the main axis, align-items along the cross axis. gap spaces items and flex-wrap lets them wrap.\nflex: 1 lets an item grow to fill free space.",`.row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
}
.row .grow { flex: 1; }`,"justify = main axis, align = cross axis."],
["Grid","display: grid builds rows and columns. grid-template-columns: repeat(3, 1fr) makes three equal columns (fr = a fraction of free space). gap spaces cells, and grid-column: span 2 stretches an item.\nUse grid for 2D layouts and flexbox for 1D rows or columns.",`.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.wide { grid-column: span 2; }`,"fr means a share of the leftover space."],
["Responsive design & motion","Media queries change styles by screen size. Design mobile-first, then add wider rules. CSS variables store reusable values.\ntransition animates changes smoothly; transform moves, scales or rotates; @keyframes defines multi-step animations.",`:root { --accent: #d9822b; }
.btn { background: var(--accent); transition: transform .2s; }
.btn:hover { transform: scale(1.1); }
@media (max-width: 600px) {
  .layout { grid-template-columns: 1fr; }
}
@keyframes bob { 50% { transform: translateY(-4px); } }`,"Mobile first, always."]],
js: [
["Variables & types","Use const by default and let when the value changes; avoid var. Types: number, string, boolean, null, undefined, object (plus symbol and bigint). typeof tells you the type, and typeof null is \"object\" (a famous old bug).\nUse === (strict, checks type) instead of ==. Numbers are floating point: 0.1 + 0.2 is 0.30000000000000004. Template literals use backticks for text with embedded values.",`const name = "Tung";
let hits = 0;
hits += 1;
console.log(typeof name, typeof null);   // string object
console.log(0.1 + 0.2 === 0.3);          // false
console.log(3 === "3", 3 == "3");        // false true`,"Always reach for === first."],
["Operators & control flow","+ concatenates when either side is a string (\"5\" + 3 gives \"53\"), but - converts to numbers (\"5\" - 3 gives 2). Falsy values: 0, \"\", null, undefined, NaN, false. Everything else is truthy.\nif / else, switch, the ternary (cond ? a : b), and loops: for, while, for...of.",`const n = 7;
console.log(n % 2 === 0 ? "even" : "odd");
for (let i = 0; i < 3; i++) console.log(i);
for (const x of [10, 20]) console.log(x);
console.log("5" + 3, "5" - 3);   // 53 2`,"JavaScript will happily mix types. You must not."],
["Functions","Declaration: function add(a, b) { return a + b; }. Arrow function: const add = (a, b) => a + b; Parameters can have defaults.\nA closure is a function that remembers the variables around where it was created. Functions can be passed around as values (callbacks).",`const add = (a, b = 1) => a + b;
console.log(add(2));    // 3

function counter() {
  let c = 0;
  return () => ++c;
}
const next = counter();
next();
console.log(next());    // 2`,"Closures are just functions with a memory."],
["Arrays & objects","Arrays: push/pop (end), shift/unshift (start), map, filter, reduce, forEach, includes. sort() sorts as STRINGS by default, so [10, 9, 1].sort() gives [1, 10, 9]; use sort((a, b) => a - b) for numbers.\nObjects store key/value pairs (obj.key). Destructuring and spread (...) copy and unpack. JSON.stringify and JSON.parse convert to and from text.",`const nums = [3, 1, 2];
console.log(nums.map(n => n * 2));          // [6, 2, 4]
console.log(nums.sort((a, b) => a - b));    // [1, 2, 3]
const hero = { name: "Tung", hp: 100 };
const { name, hp } = hero;
const copy = { ...hero, hp: 80 };`,"Never trust the default sort for numbers."],
["The DOM & events","The DOM is the page as objects. document.querySelector('#id') finds an element. Change it with textContent, classList.add/remove, and style.\nReact to the user with addEventListener(\"click\", handler). createElement and appendChild add new elements.",`const btn = document.querySelector("#go");
btn.addEventListener("click", () => {
  btn.textContent = "BONK!";
  btn.classList.add("hit");
});
const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").appendChild(li);`,"textContent is safer than innerHTML for user text."],
["Async JavaScript","setTimeout runs code later. A Promise represents a value that will arrive. async functions use await to wait for promises without blocking the page. fetch() requests data from a server.\nWrap awaits in try / catch to handle network errors.",`async function load() {
  try {
    const res = await fetch("/data.json");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Failed:", err);
  }
}
setTimeout(() => console.log("later"), 1000);`,"await only works inside async functions."]],
cpp: [
["Program structure & I/O","C++ is compiled: your source is turned into an executable by a compiler (like g++), then you run it. Every program starts at int main(). Statements end with a semicolon.\n#include <iostream> gives you cout (output, with <<) and cin (input, with >>). endl ends a line.",`#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Age? ";
    cin >> age;
    cout << "You are " << age << endl;
    return 0;
}`,"Forget the semicolon and the compiler will scold you."],
["Types & operators","Basic types: int, long, float, double, char, bool, string (#include <string>). int / int truncates: 7 / 2 is 3, while 7 / 2.0 is 3.5. % gives the remainder. static_cast<double>(x) converts types.\nUse const for values that must not change. ++, --, +=, -= are shortcuts.",`int a = 7, b = 2;
cout << a / b << " " << a % b << endl;      // 3 1
cout << a / 2.0 << endl;                    // 3.5
const double PI = 3.14159;
double avg = static_cast<double>(a + b) / 2;`,"Integer division eats the decimals."],
["Control flow","if / else if / else, switch, and loops: for, while, do-while (runs at least once). break leaves a loop, continue skips to the next round.\nThe classic loop: for (int i = 0; i < n; i++) counts 0 up to n - 1.",`for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    cout << i << " ";                  // 0 1 3 4
}
int n = 3;
while (n > 0) { cout << n-- << " "; }  // 3 2 1`,"i < 5 gives five rounds: 0 to 4."],
["Functions","A function has a return type, name and parameters. Declare a prototype before main if the function is defined after it. Parameters are copied (pass by value), so changes inside don't affect the caller.\nPass by reference with & (int& x) to modify the original or avoid big copies. C++ also supports default arguments and overloading (same name, different parameters).",`void addOne(int& x) { x++; }
int square(int n) { return n * n; }
int main() {
    int a = 5;
    addOne(a);
    cout << a << " " << square(4);      // 6 16
}`,"& in a parameter means: work on the original."],
["Arrays, strings & vectors","A plain array int a[5] has a fixed size and NO bounds checking: a[10] is undefined behaviour. string has length(), substr(), and + for joining.\nvector<int> (#include <vector>) is a resizable array: push_back, size(), pop_back(). A range-based for loop visits every element.",`vector<int> v = {1, 2, 3};
v.push_back(4);
cout << v.size() << endl;               // 4
for (int x : v) cout << x << " ";
string s = "Tung";
cout << s.length() << s[0];             // 4T`,"Prefer vector over raw arrays."],
["Pointers, references & classes","A pointer stores a memory address. & gets an address, * follows a pointer. int* p = &a; then *p = 9; changes a. A reference (int& r = x;) is another name for an existing variable. new allocates memory and delete frees it.\nA class groups data and functions. private members are hidden from outside code; public ones are the interface. A constructor runs when an object is created.",`int a = 5;
int* p = &a;
*p = 9;                    // a is now 9
int& r = a;
r++;                       // a is now 10

class Pet {
private:
    string name;
public:
    Pet(string n) { name = n; }
    string getName() { return name; }
};`,"A reference never changes what it points to. A pointer can."]],
java: [
["Structure & basics","Java code lives inside classes. The program starts at public static void main(String[] args). Source is compiled to bytecode which the JVM runs on any machine.\nJava is statically typed: int, double, boolean, char, String (capital S, it's a class). final makes a constant. System.out.println prints a line.",`public class Main {
    public static void main(String[] args) {
        int age = 18;
        final double PI = 3.14;
        String name = "Tung";
        System.out.println(name + " is " + age);
    }
}`,"The file name must match the public class name."],
["Operators & control flow","Same operators as C++. int / int is integer division (7 / 2 is 3). == on primitives compares values, but on Strings it compares references, so use s1.equals(s2).\nif / else, switch, for, while, do-while, and the enhanced for loop (for (int x : arr)).",`String a = "hi";
String b = new String("hi");
System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true
for (int i = 0; i < 3; i++) {
    System.out.print(i + " ");
}`,"Compare strings with equals, never with ==."],
["Methods & arrays","A method has a return type, name and parameters. static methods belong to the class, so you can call them without making an object. Overloading means the same name with different parameters.\nArrays have a fixed size, are zero-indexed, start filled with defaults (0, false, null), and arr.length is a field (no parentheses).",`static int square(int n) { return n * n; }

int[] a = new int[3];
System.out.println(a[0]);          // 0
int[] b = {4, 5, 6};
System.out.println(b.length);      // 3
int[][] grid = new int[2][3];`,"length for arrays, length() for Strings."],
["Classes & objects","A class is a blueprint, an object is a thing built from it with new. Fields hold data, constructors set it up, this means the current object.\nEncapsulation: make fields private and expose them through public getters and setters. static members belong to the class itself.",`class Pet {
    private String name;
    public Pet(String name) { this.name = name; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
Pet p = new Pet("Tung");
System.out.println(p.getName());`,"Private fields, public methods."],
["Inheritance & interfaces","extends makes a class inherit from ONE parent. super calls the parent's constructor or methods. @Override replaces an inherited method. An abstract class can't be instantiated.\nAn interface lists methods a class promises to provide, and a class can implement many interfaces. Polymorphism lets a parent-type variable hold a child object.",`class Animal { void speak() { System.out.println("..."); } }
class Dog extends Animal {
    @Override void speak() { System.out.println("Woof"); }
}
interface Flyer { void fly(); }
class Bird extends Animal implements Flyer {
    public void fly() { System.out.println("Flap"); }
}
Animal a = new Dog();
a.speak();   // Woof`,"One parent, many interfaces."],
["Collections & exceptions","ArrayList<String> is a resizable list (add, get, size, remove). HashMap<K, V> stores key/value pairs (put, get). Generics (<String>) say what type a collection holds.\ntry / catch / finally handles errors. 5 / 0 on ints throws ArithmeticException at runtime. Checked exceptions must be handled or declared; unchecked ones (like ArithmeticException) don't have to be.",`import java.util.*;
ArrayList<String> names = new ArrayList<>();
names.add("Tung");
System.out.println(names.get(0) + " " + names.size());
HashMap<String, Integer> hp = new HashMap<>();
hp.put("Tung", 100);
try {
    int x = 5 / 0;
} catch (Exception e) {
    System.out.println("Oops: " + e.getMessage());
}`,"Catch the narrowest exception you can."]]
};
