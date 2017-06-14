# experiments
Testing ground for aurelia inquiries

[Demo](https://aurelia-training.github.io/experiments);

## Experiment 1
Conclusion: bound values change after every keystroke

## Experiment 2
Conclusion: `wordCount` changes type from number to string, even if a numerical value is inputted

## Experiment 3
 - Note: can use libraries such as [`jquery-numberformatter`](https://code.google.com/archive/p/jquery-numberformatter/) but there's no native custom number formatter that I know of
 - Note: because `<input>` values are strings I will keep all values as strings instead of numbers and do regular expression parsing on them instead of using a library

Conclusion: number formatting in JS is actually quite tedious as far as I know; no vanilla solutions

## Experiment 4
 - Note: again, there are libraries such as [`dateformat`](http://blog.stevenlevithan.com/archives/date-time-format) but I decided to go VanillaJS in my approach

Conclusion: date formatting is less tedious than other number formatting because of getter functions, but still some conventions for the `<input>` element that need to be met
