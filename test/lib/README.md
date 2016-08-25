## QUnit JavaScript Unit Testing framework.

QUnit is a powerful, easy-to-use, JavaScript unit testing framework. It's used
by the jQuery project to test its code and plugins but is capable of testing any
generic JavaScript code (and even capable of testing JavaScript code on the
server-side).

QUnit is especially useful for regression testing: Whenever a bug is reported,
write a test that asserts the existence of that particular bug. Then fix it and
commit both. Every time you work on the code again, run the tests. If the bug
comes up again - a regression - you'll spot it immediately and know how to fix
it, because you know what code you just changed.

[Copyright jQuery Foundation and other contributors] [1], https://jquery.org/
[1]: https://github.com/jquery/qunit/blob/master/LICENSE.txt


## QUnit plugin for asserting numbers with tolerance.

This plugin for QUnit adds close, notClose, close.percent, and notClose.percent
assertion methods to test that a number is approximately equal (or not) to an
expected number, within a given tolerance.

[Copyright jQuery Foundation and other contributors] [2], https://jquery.org/
[2]: https://github.com/JamesMGreene/qunit-assert-close/blob/master/MIT-LICENSE.txt
