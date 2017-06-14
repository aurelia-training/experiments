import {bindable} from "aurelia-framework";

export class App {

  // experiment 1
  lastName:string = "Lam";
  // conclusion: changes after every keystroke

  // experiment 2
  @bindable wordCount:number = 46;
  wordCountChanged(newValue, oldValue) {
    console.log(newValue, typeof newValue);
  }
  // conclusion: wordCount changes type from number to string, even if a numerical value is inputted

  // experiment 3
  // note: can use libraries such as jquery-numberformatter (https://code.google.com/archive/p/jquery-numberformatter/) but there's no native custom number formatter that I know of
  // note: because <input> values are strings I will keep all values as strings instead of numbers and do regular expression parsing on them instead of using a library
  @bindable unformattedValue:string = "3426.1179";
  formattedValue:string;
  unformattedValueChanged(newValue, oldValue) {
    let match = /(\d+)(\.\d+)?/.exec(newValue);
    if(match == null) {
      this.formattedValue = "Invalid number";
      return;
    }

    // round after two decimal places
    let afterDecimal = parseFloat(match[2] || "0").toFixed(2);

    // add commas at spacing 3
    let beforeDecimal = match[1];
    for(let i = beforeDecimal.length-3; i > 0; i -= 3) {
      beforeDecimal = beforeDecimal.slice(0, i) + "," + beforeDecimal.slice(i);
    }

    // concatenate everything back together again
    this.formattedValue = "$" + beforeDecimal + afterDecimal.toString().slice(1);
  }
  // conclusio: number formatting in JS is actually quite tedious as far as I know

  // experiment 4
  // note: again, there are libraries such as dateformat (http://blog.stevenlevithan.com/archives/date-time-format) but I decided to go VanillaJS in my approach
  dateObject:Date = new Date();
  @bindable dateString:string = this.dateObject.toJSON().slice(0, 10); // this formats the date object to RFC3339 standards, which the <input type="date"> accepts
  dateMMDDYYYY:string;
  dateDDMM:string;
  dateYYYY:string;
  dateStringChanged(newValue, oldValue) {
    this.dateObject = new Date(newValue);
    let date = ("0" + this.dateObject.getDate()).slice(-2);
    let month = ("0" + (this.dateObject.getMonth() + 1)).slice(-2); // month is zero-indexed
    let year = this.dateObject.getFullYear();

    this.dateMMDDYYYY = month + "/" + date + "/" + year;
    this.dateDDMM = date + " " + month;
    this.dateYYYY = "" + year;
  }
  // result: date formatting is less tedious than other number formatting because of getter functions, but still some conventions for the <input> element that need to be met

  // run both formatting functions at the beginning
  constructor() {
    this.unformattedValueChanged(this.unformattedValue, null);
    this.dateStringChanged(this.dateString, null);
  }

}
