import {bindable} from "aurelia-framework";

export class App {

  // experiment 1
  lastName:string = "Lam";

  // experiment 2
  @bindable wordCount:number = 46;
  wordCountChanged(newValue, oldValue) {
    console.log(newValue, typeof newValue);
  }

  // experiment 3
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

  // experiment 4
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

  // run both formatting functions at the beginning
  constructor() {
    this.unformattedValueChanged(this.unformattedValue, null);
    this.dateStringChanged(this.dateString, null);
  }

}
