// Question bank for every module. Python reuses QUESTIONS from questions.js.
// M() = multiple choice, T() = typing challenge. lvl = easy | medium | hard.
const MODS = { py: { name: "Python", icon: "🐍" }, html: { name: "HTML", icon: "🏗️" }, css: { name: "CSS", icon: "🎨" }, js: { name: "JavaScript", icon: "⚡" } };
const M = (lvl, intro, q, code, options, answer, explain) => ({ lvl, kind: "mcq", type: "Multiple choice", intro, q, code, options, answer, explain });
const T = (lvl, intro, q, code, accept, explain) => ({ lvl, kind: "type", type: "Type it", intro, q, code, accept, explain });
const LV = ["easy","easy","easy","easy","medium","medium","medium","hard","hard","hard"];
const BANK = {
 py: [...QUESTIONS.map((x, i) => ({ lvl: LV[i], kind: "mcq", ...x })),
  T("easy","Hands on the keyboard, student!","Fill the blank so the code prints Hello.","print(___)",['"Hello"','print("Hello")'],'Text needs quotes: print("Hello").'),
  T("medium","A typo has crept in. Squash it.","Type the corrected line.",'pritn("Tung")',['print("Tung")'],'The function is print, not pritn.'),
  T("hard","Time to write real code.","Write one line that creates a list called nums holding 1, 2 and 3.","",['nums=[1,2,3]'],"Square brackets make a list: nums = [1, 2, 3].")],
 html: [
  M("easy","HTML is the skeleton of every page.","Which tag creates a link?","",["<link>","<a>","<href>","<url>"],1,"The <a> (anchor) tag makes links. Its href attribute holds the address."),
  M("easy","Headings, headings everywhere.","Which tag is the largest heading?","",["<h6>","<head>","<h1>","<title>"],2,"<h1> is the biggest heading, <h6> the smallest. <head> is something else entirely."),
  T("easy","Open the paragraph!","Type the opening tag for a paragraph.","",["<p>"],"Paragraphs use <p> ... </p>."),
  M("medium","Images need a source.","Which attribute gives an <img> its file?","",["href","src","alt","path"],1,"src (source) points to the image file. href is for links."),
  M("medium","Accessibility matters to Tung.","What does the alt attribute do?","",["Sets the size","Describes the image for screen readers","Adds a border","Makes it a link"],1,"alt text describes the image if it can't be seen or loaded."),
  T("medium","Complete the tag.","Fill the blank with the missing attribute name.",'<img ___="cat.png" alt="A cat">',["src"],"src tells the browser which image file to load."),
  M("hard","The head is hidden but important.","Which tag belongs inside <head>?","",["<h1>","<title>","<p>","<button>"],1,"<title> sets the browser tab title. Visible content goes in <body>."),
  M("hard","Semantic tags give meaning.","Which tag is best for a block of site navigation links?","",["<nav>","<div>","<span>","<section>"],0,"<nav> tells browsers and screen readers this is navigation."),
  T("hard","Build it yourself.","Write a button element with the text Go.","",["<button>Go</button>"],"<button>Go</button>: opening tag, text, closing tag.")],
 css: [
  M("easy","CSS is the makeup artist.","Which property changes text color?","",["font-color","text-style","color","foreground"],2,"color sets text color. background-color sets the background."),
  M("easy","Selectors pick targets.","Which selector targets class \"box\"?","",["#box","box",".box","*box"],2,"A dot means class (.box). A hash means id (#box)."),
  T("easy","Paint it red!","Fill the blank to turn all h1 text red.","h1 { ___: red; }",["color"],"color is the property for text color."),
  M("medium","Every element is a box.","Which space sits INSIDE the border?","",["margin","padding","gap","outline"],1,"Padding is inside the border. Margin is outside."),
  M("medium","Flexbox saves lives.","Which turns on flexbox?","",["display: flex","flex: on","layout: flex","position: flex"],0,"display: flex on the parent makes its children flex items."),
  T("medium","Space things out.","Type the declaration that puts a 10px gap between flex items.","",["gap:10px;","gap:10px"],"gap: 10px; adds space between flex/grid items."),
  M("hard","Alignment is tricky.","In a row flexbox, which centers items vertically?","",["justify-content: center","align-items: center","text-align: center","float: center"],1,"In a row, align-items works on the cross axis (vertical). justify-content works on the main axis."),
  M("hard","Layers!","What does z-index control?","",["Zoom level","Stacking order","Font weight","Width"],1,"Higher z-index elements are drawn on top of lower ones."),
  T("hard","Responsive design!","Write the opening of a media query for screens up to 600px wide, ending with {.","",["@media(max-width:600px){"],"@media (max-width: 600px) { ... } applies styles on small screens.")],
 js: [
  M("easy","JavaScript makes pages move.","Which keyword declares a value you cannot reassign?","",["let","var","const","set"],2,"const can't be reassigned. Use let for values that change."),
  M("easy","Debugging starts here.","Which prints to the browser console?","",["print()","console.log()","echo()","log.console()"],1,"console.log() writes to the developer console."),
  T("easy","Declare it!","Write a one-line declaration of x equal to 3 using let.","",["letx=3;","letx=3"],"let x = 3; creates a changeable variable."),
  M("medium","Arrays are lists.","What does [1, 2, 3].length return?","",["2","3","4","undefined"],1,"length is the number of items: 3."),
  M("medium","Equality has levels.","Which operator compares value AND type?","",["=","==","===","=>"],2,"=== is strict equality. = assigns, == converts types first."),
  T("medium","Arrow time.","Write an arrow function named add that returns a + b (one line, with const).","",["constadd=(a,b)=>a+b;","constadd=(a,b)=>a+b"],"const add = (a, b) => a + b; is a compact function."),
  M("hard","Transform arrays.","What does [1, 2, 3].map(n => n * 2) return?","",["[1, 2, 3]","6","[2, 4, 6]","[1, 4, 9]"],2,"map runs the function on each item and returns a new array."),
  M("hard","Growing arrays.","Which method adds an item to the END of an array?","",["push()","pop()","shift()","concat()"],0,"push adds to the end. pop removes from the end."),
  T("hard","Grab the element.","Type the call that selects the element with id title using querySelector.","",['document.querySelector("#title")'],'document.querySelector("#title") finds the first match for a CSS selector.')]
};

// ===== v3: C++ and Java modules =====
MODS.cpp = { name: "C++", icon: "🚀" };
MODS.java = { name: "Java", icon: "☕" };
BANK.cpp = [
 M("easy","C++ is fast and fussy.","Which header gives you cout?","",["<stdio>","<iostream>","<string>","<cout>"],1,"#include <iostream> provides cout and cin."),
 M("easy","Streams!","Which operator sends data to cout?","",[">>","<<","->","::"],1,"cout << value sends output. cin >> variable reads input."),
 T("easy","Say hello.","Write the statement that prints Hi using cout (end with a semicolon).","",['cout<<"Hi";','cout<<"Hi"<<endl;','std::cout<<"Hi";','std::cout<<"Hi"<<std::endl;'],'cout << "Hi"; prints text. Add << endl for a new line.'),
 M("medium","Integer division bites.","What does 7 / 2 give when both are int?","",["3.5","3","4","2"],1,"int / int truncates the decimal part: 3."),
 M("medium","Pointer basics.","Which line declares an int pointer p?","",["int p*;","int* p;","pointer p;","int &p;"],1,"int* p; declares a pointer. int &p would be a reference."),
 T("medium","Count to four.","Write a for loop header that runs i from 0 to 4 (five rounds).","",["for(inti=0;i<5;i++)","for(inti=0;i<=4;i++)","for(inti=0;i<5;++i)","for(inti=0;i<=4;++i)"],"for (int i = 0; i < 5; i++) runs for i = 0..4."),
 M("hard","References.","What does the & mean in void f(int& x)?","",["x is a pointer","x is passed by reference","x is a constant","x is an address-of"],1,"int& x is a reference parameter: changes to x change the caller's variable."),
 M("hard","Dynamic arrays.","Which container is a resizable array?","",["array","vector","list<int>[]","stack"],1,"vector<int> grows with push_back."),
 T("hard","Make a vector.","Declare a vector of ints named v (empty).","",["vector<int>v;","std::vector<int>v;"],"vector<int> v; creates an empty vector (needs #include <vector>)."),
 M("boss","Pointers!","What does this print?","int a = 5;\nint* p = &a;\n*p = 9;\ncout << a;",["5","9","The address of a","Error"],1,"p holds a's address; *p = 9 writes through it, changing a."),
 M("boss","References!","What does this print?","int x = 10;\nint& r = x;\nr++;\ncout << x;",["10","11","Error","Undefined"],1,"A reference is another name for x, so r++ changes x."),
 M("boss","Integer vs double.","What does this print?",'cout << 5/2 << " " << 5/2.0;',["2 2","2.5 2.5","2 2.5","3 2.5"],2,"5/2 is integer division (2). 5/2.0 involves a double (2.5)."),
 M("boss","Encapsulation.","Who can access a class's private members?","",["Any code","Only the class itself (and its friends)","Only derived classes","Only main()"],1,"private hides members from outside code. Derived classes can't see them either (that's protected)."),
 M("boss","Vectors.","What does this print?","vector<int> v = {1, 2, 3};\nv.push_back(4);\ncout << v.size();",["3","4","5","Error"],1,"push_back appends, so the size grows from 3 to 4."),
 T("boss","Alias it.","Write the line that declares an int reference r to the variable x.","",["int&r=x;"],"int& r = x; makes r another name for x.")
];
BANK.java = [
 M("easy","Java starts here.","Which method is the program's entry point?","",["start()","main()","public static void main(String[] args)","run()"],2,"The JVM looks for public static void main(String[] args)."),
 M("easy","Print it.","Which prints a line to the console?","",["print.line()","System.out.println()","console.log()","echo()"],1,"System.out.println() prints and adds a newline."),
 T("easy","Declare it.","Declare an int named age with the value 18.","",["intage=18;"],"int age = 18; Java needs the type before the name."),
 M("medium","Making objects.","Which keyword creates a new object?","",["make","new","create","alloc"],1,"new Pet(...) allocates and constructs an object."),
 M("medium","Strings.","Which is a valid String declaration?","",['string s = "hi";','String s = "hi";','String s = \'hi\';','str s = "hi";'],1,"String has a capital S and uses double quotes."),
 T("medium","Count to four.","Write a for loop header that runs i from 0 to 4 (five rounds).","",["for(inti=0;i<5;i++)","for(inti=0;i<=4;i++)","for(inti=0;i<5;++i)","for(inti=0;i<=4;++i)"],"for (int i = 0; i < 5; i++) runs for i = 0..4."),
 M("hard","Inheritance.","Which keyword makes a class inherit from another?","",["implements","extends","inherits","super"],1,"class Dog extends Animal. implements is for interfaces."),
 M("hard","Collections.","Which is a resizable list?","",["int[]","ArrayList","String[]","Array"],1,"ArrayList<T> grows as you add items."),
 T("hard","New list.","Declare an ArrayList of Strings named names and create it with the diamond operator.","",["ArrayList<String>names=newArrayList<>();"],"ArrayList<String> names = new ArrayList<>(); the <> infers the type."),
 M("boss","String trap!","What does this print?",'String a = "hi";\nString b = new String("hi");\nSystem.out.println(a == b);',["true","false","Error","hi"],1,"== compares references, and new String makes a new object. Use a.equals(b) to compare text."),
 M("boss","Division.","What does this print?",'System.out.println(7/2 + " " + 7/2.0);',["3 3","3.5 3.5","3 3.5","4 3.5"],2,"7/2 is int division (3). 7/2.0 is 3.5."),
 M("boss","OOP rules.","Which is true in Java?","",["A class can extend many classes","A class can extend one class and implement many interfaces","A class can only implement one interface","Interfaces can only have private fields"],1,"Java has single inheritance for classes but allows many interfaces."),
 M("boss","Default values.","What does this print?","int[] a = new int[3];\nSystem.out.println(a[0]);",["null","0","Error","Garbage value"],1,"Array elements start at default values: 0 for int, false for boolean, null for objects."),
 M("boss","Exceptions.","What happens when this runs?","int x = 5 / 0;",["x becomes Infinity","Compile error","ArithmeticException at runtime","x becomes 0"],2,"Integer division by zero throws ArithmeticException when the program runs."),
 T("boss","Catch it.","Write the opening line of a catch block that catches Exception e.","",["catch(Exceptione){"],"catch (Exception e) { ... } runs when the try block throws an exception.")
];
// ===== v3: boss-only questions for the original four modules =====
BANK.py.push(
 M("boss","Aliasing attack!","What does this print?","a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",["3","4","Error","[1, 2, 3, 4]"],1,"b = a copies the reference, not the list, so both names point to the same list. Use a.copy() for a real copy."),
 M("boss","Count carefully.","What does this print?","print(list(range(10, 0, -3)))",["[10, 7, 4, 1]","[10, 7, 4]","[9, 6, 3, 0]","[10, 7, 4, 1, 0]"],0,"Start at 10, step -3, stop before 0: 10, 7, 4, 1."),
 M("boss","The sneakiest Python trap!","What does this print?","def f(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(f(1), f(2))",["[1] [2]","[1, 2] [1, 2]","[1] [1, 2]","Error"],1,"The default list is created once and shared between calls, so both results show the same list [1, 2]."),
 M("boss","Dictionary dance.","What does this print?",'d = {"a": 1}\nd["b"] = d.get("c", 5)\nprint(d)',["{'a': 1, 'b': 5}","{'a': 1, 'b': None}","KeyError","{'a': 1}"],0,'get("c", 5) returns the default 5 when the key is missing, and no error occurs.'),
 M("boss","String maths.","What does this print?",'print(3 * "ab" + str(2 ** 3 // 3))',["ababab2","ab8","ababab8","ababab2.67"],0,'3 * "ab" is ababab. 2**3 is 8, 8//3 is 2, so we join ababab and "2".'),
 T("boss","Compress it!","Write a list comprehension (one line) for the squares of 0 to 4. Use x or i as the variable.","",['[x*x for x in range(5)]','[x**2 for x in range(5)]','[i*i for i in range(5)]','[i**2 for i in range(5)]'],"[x*x for x in range(5)] builds [0, 1, 4, 9, 16].")
);
BANK.html.push(
 M("boss","Forms are tricky.","How do you connect a label to its input so clicking the text focuses the field?","",['Give the label for="id" matching the input\'s id',"Put both inside a <div>","Use the same class on both","Give both the same name attribute"],0,'label for="email" matches input id="email". Clicking the label focuses the input.'),
 M("boss","Tables bend rules.","Which attribute makes one cell stretch across 3 columns?","",['colspan="3"','rowspan="3"','span="3"','width="3"'],0,"colspan merges columns; rowspan merges rows."),
 M("boss","Meaningful tags.","Which element is for self-contained content that makes sense on its own, like a blog post?","",["<section>","<aside>","<article>","<div>"],2,"<article> is independent, reusable content. <section> groups related content."),
 M("boss","Mobile matters.","What does the viewport meta tag (width=device-width, initial-scale=1) do?","",["Loads a mobile CSS file","Makes the page scale to the device width on phones","Disables zooming","Sets the page title"],1,"Without it, mobile browsers pretend the screen is wide and shrink the page."),
 M("boss","Identity crisis.","Which statement about id and class is correct?","",["An id must be unique on the page; a class can be reused","Both must be unique","A class must be unique; an id can be reused","An element can have only one class"],0,"ids identify one element. Classes group many, and an element can have several classes."),
 T("boss","Validate it!","Write an email input that is required before submitting (a single tag).","",['<input type="email" required>','<input required type="email">','<input type="email" required/>','<input required type="email"/>'],'<input type="email" required> makes the browser check for a value and an email format.')
);
BANK.css.push(
 M("boss","Specificity war!","Which rule wins for <a class=\"active\"> inside #nav and .menu?","/* A */ #nav a { color: red; }\n/* B */ .menu a.active { color: blue; }",["A: red","B: blue","They tie","Neither"],0,"An id outweighs any number of classes: A is (1,0,1) and B is (0,2,1)."),
 M("boss","Box model maths.","With box-sizing: border-box, what is the element's total width?","width: 100px;\npadding: 10px;\nborder: 5px solid;\nbox-sizing: border-box;",["100px","130px","110px","115px"],0,"border-box includes padding and border inside the width, so it stays 100px. With content-box it would be 130px."),
 M("boss","Margins collapse.","Two stacked siblings: the top has margin-bottom: 30px and the bottom has margin-top: 20px. What is the gap?","",["50px","30px","20px","10px"],1,"Vertical margins collapse to the larger value: 30px, not the sum."),
 M("boss","Grid wizardry.","What does grid-template-columns: repeat(3, 1fr) create?","",["Three equal-width columns","Three 1px columns","One column three times taller","Three rows"],0,"1fr is one fraction of the free space, so you get three equal columns."),
 M("boss","Positioning.","An element with position: absolute is placed relative to what?","",["Its nearest positioned ancestor","Always the viewport","Its previous sibling","The body, always"],0,"It looks up for the nearest ancestor with a position other than static."),
 T("boss","Sizing sanity.","Write the declaration that makes padding and border count inside an element's width.","",["box-sizing:border-box;","box-sizing:border-box"],"box-sizing: border-box; includes padding and border in the width.")
);
BANK.js.push(
 M("boss","The famous bug.","What does this print?","console.log(typeof null);",['"null"','"undefined"','"object"','"number"'],2,'typeof null is "object": a historic quirk of JavaScript.'),
 M("boss","Floating point.","What does this print?","console.log(0.1 + 0.2 === 0.3);",["true","false","undefined","Error"],1,"0.1 + 0.2 is 0.30000000000000004 in binary floating point."),
 M("boss","Sort surprise.","What does this print?","console.log([10, 9, 1].sort());",["[1, 9, 10]","[10, 9, 1]","[1, 10, 9]","[9, 10, 1]"],2,'sort() converts items to strings by default, so "1" < "10" < "9". Use sort((a, b) => a - b) for numbers.'),
 M("boss","Closures.","What does this print?","function counter() {\n  let c = 0;\n  return () => ++c;\n}\nconst a = counter();\na();\nconsole.log(a());",["1","2","0","undefined"],1,"The returned function remembers c, so it counts 1 then 2."),
 M("boss","Type coercion.","What does this print?",'console.log("5" + 3, "5" - 3);',["8 2","53 2","53 53","8 8"],1,'+ with a string concatenates ("53"). - converts to numbers (2).'),
 T("boss","Arrow function time.","Write a one-line arrow function stored in const double that returns n * 2.","",["constdouble=n=>n*2;","constdouble=(n)=>n*2;","constdouble=n=>n*2","constdouble=(n)=>n*2"],"const double = n => n * 2; is the compact arrow form.")
);

// ===== v5: new question types =====
const BUG = (lvl, intro, q, lines, answer, explain) => ({ lvl, kind: "bug", type: "Bug hunt 🐛", intro, q, code: "", lines, answer, explain });
const ORD = (lvl, intro, q, lines, explain) => ({ lvl, kind: "order", type: "Order the code 🧩", intro, q, code: "", lines, explain });
const SPD = (lvl, intro, code) => ({ lvl, kind: "type", speed: true, type: "Speed typing ⚡", intro, q: "Type this exactly. You have 20 seconds!", code, accept: [code], explain: "Nice typing! Speed comes from repetition." });
BANK.py.push(
 BUG("medium","Spot the typo!","Tap the line that has the bug.",["def total(nums):","    s = 0","    for n in nums","        s += n","    return s"],2,"The for line is missing its colon: for n in nums:"),
 ORD("hard","Assemble the program!","Put the lines in order so the program prints 6.",["total = 0","for n in [1, 2, 3]:","    total += n","print(total)"],"Create the variable, loop and add, then print after the loop (outside the indentation)."),
 SPD("easy","Fast fingers!",'print("Hello, Tung!")'));
BANK.html.push(
 BUG("medium","Broken list!","Tap the line that has the bug.",["<ul>","  <li>One</li>","  <li>Two</li","</ul>"],2,"The second list item is missing the > in its closing tag: </li>."),
 SPD("easy","Fast fingers!","<h1>Hello</h1>"));
BANK.css.push(
 BUG("medium","Stylish bug!","Tap the line that has the bug.",["h1 {","  color: red","  padding: 10px;","}"],1,"Every declaration ends with a semicolon: color: red;"),
 SPD("easy","Fast fingers!","p { color: red; }"));
BANK.js.push(
 BUG("medium","Const crisis!","Tap the line that has the bug.",["const nums = [1, 2, 3];","nums = [4, 5];","console.log(nums);"],1,"A const variable can't be reassigned. Use let, or change the array's contents instead."),
 ORD("hard","Wire the button!","Put the lines in the right order.",['const btn = document.querySelector("#go");','btn.addEventListener("click", () => {','  btn.textContent = "BONK!";','});'],"Select the element, attach the listener, write the handler body, then close it."),
 SPD("easy","Fast fingers!",'console.log("BONK");'));
BANK.cpp.push(
 BUG("medium","Compiler complaint!","Tap the line that has the bug.",["#include <iostream>","using namespace std;","int main() {",'    cout << "Hi" << endl',"    return 0;","}"],3,"The cout statement is missing its semicolon."),
 ORD("hard","Build main!","Put the lines in order to make a valid program.",["#include <iostream>","using namespace std;","int main() {",'    cout << "Hi";',"}"],"Include, namespace, main opens, statement inside, then the closing brace."),
 SPD("easy","Fast fingers!",'cout << "Hi" << endl;'));
BANK.java.push(
 BUG("hard","Off by one!","Tap the line that has the bug.",["int[] a = {1, 2, 3};","for (int i = 0; i <= a.length; i++) {","    System.out.println(a[i]);","}"],1,"i <= a.length goes one step too far and throws ArrayIndexOutOfBoundsException. Use i < a.length."),
 ORD("medium","Class first!","Put the lines in the right order.",["public class Main {","    public static void main(String[] args) {",'        System.out.println("Hi");',"    }","}"],"Class, then main inside it, then the statement, then close both braces."),
 SPD("easy","Fast fingers!",'System.out.println("Hi");'));
// Give every question an id (used by Tung's Revenge)
Object.keys(BANK).forEach(m => BANK[m].forEach(q => { q.mod = m; q.id = m + "#" + q.q + "|" + (q.code || "") + "|" + (q.lines ? q.lines.join("/") : ""); }));
