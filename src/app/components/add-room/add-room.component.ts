import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})

export class AddRoomComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetRoomForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  roomForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['Double Room', 'Premium King Room', 'Deluxe Room', 'Family Room'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private roomApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.roomForm = this.fb.group({
      room_name: ['', [Validators.required]],
      room_email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.roomForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.roomForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitRoomForm() {
    if (this.roomForm.valid) {
      this.roomApi.AddRoom(this.roomForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/rooms-list'))
      });
    }
  }

}