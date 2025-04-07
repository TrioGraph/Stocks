import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { data } from '../../assets/Stocks'
import { DataService } from '../data.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  dynamicFormGroup!: FormGroup;  //defined the dynamicFormGroup

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dynamicFormGroup = new FormGroup({
      refreshToken: new FormControl(''),
      });
      console.log('refreshToken:: ', localStorage.getItem('refreshToken'));
      this.dynamicFormGroup.controls['refreshToken'].setValue(localStorage.getItem('refreshToken'));
  }

  onSubmit() {
    console.warn(this.dynamicFormGroup.value);
    this.dataService.getToken();
  }

}
