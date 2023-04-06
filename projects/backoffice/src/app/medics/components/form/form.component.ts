import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'amb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {
  title = '';

  group!: FormGroup;
  photoToShow: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reference: MatDialogRef<FormComponent>
  ) {
    this.title = data ? 'EDIT' : 'ADD';
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?.id),
      nombre: new FormControl(this.data?.nombre, Validators.required),
      segundo_nombre: new FormControl(
        this.data?.segundo_nombre,
        Validators.required
      ),
      apellido: new FormControl(this.data?.apellido, Validators.required),
      cmp: new FormControl(this.data?.cmp, Validators.required),
      dni: new FormControl(this.data?.dni, Validators.required),
      correo: new FormControl(this.data?.correo, [
        Validators.required,
        Validators.email,
      ]),
    });
    if (this.data) {
      this.group.addControl('foto', new FormControl(this.data?.foto));
      this.photoToShow = this.data.foto ? this.data.foto : '';
    } else {
      // es obligatorio cuando se esta insertando
      this.group.addControl('foto', new FormControl(null, Validators.required));
    }
  }
  onSave() {
    const values = this.group.value;
    const recordId = values.id;
    delete values.id;

    // formData, imagenes, puede incluir traida de archivos
    const fd = new FormData();
    for (const key of Object.keys(values)) {
      fd.append(key, values[key]);
    }
    console.log(values);
    this.reference.close({ id: recordId, medic: fd });
  }
}
