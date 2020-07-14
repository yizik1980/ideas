import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectOption } from '../../model/select-option';

@Component({
  selector: 'app-multi-selection',
  templateUrl: './multi-selection.component.html',
  styleUrls: ['./multi-selection.component.scss']
})
export class MultiSelectionComponent implements OnInit {

  constructor() { }
  show: boolean;
  key: number;
  selectedAll: boolean;
  @Input()
  text: string;
  @Input()
  options: Array<SelectOption>;
  @Output()
  currentSelection = new EventEmitter<Array<SelectOption>>();
  selectedOptions: Array<SelectOption> = new Array<SelectOption>();
  ngOnInit() {
    this.show = false;
    this.selectedAll = false;
    // this.selectedOptions.push(this.options[0]);
  }
  open() {
    this.show = true;
  }
  close() {
    this.show = false;
    this.currentSelection.emit(this.selectedOptions);
  }
  clear() {
    this.show = false;
    this.selectedOptions = new Array<SelectOption>();
  }
  addItem(item: SelectOption) {
    if (this.selectedOptions.length === this.options.length) {
      return;
    }
    const index = this.selectedOptions.indexOf(item);
    if (index === -1) {
      this.selectedOptions.push(item);
    }
    const oindex = this.options.indexOf(item);
    console.log(oindex);
    if (oindex !== -1) {
      this.options[oindex].selected = true;
    }
  }
  removeItem(item: SelectOption) {
    const index = this.selectedOptions.indexOf(item);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    }
    const oindex = this.options.indexOf(item);
    if (oindex !== -1) {
      this.options[oindex].selected = false;
    }
  }
  select(optionItem: SelectOption) {
    optionItem.selected = !optionItem.selected;
    if (optionItem.selected) {
      this.addItem(optionItem);
    } else {
      this.removeItem(optionItem);
    }
  }

  selectAll() {
    this.selectedAll = !this.selectedAll;
    if (this.selectedAll) {
      this.options.forEach(s => {
        s.selected = true;
      });
      this.selectedOptions = JSON.parse(JSON.stringify(this.options));
    } else {
      this.options.forEach(s => {
        s.selected = false;
      });
      this.selectedOptions = new Array<SelectOption>();
    }
  }

}
