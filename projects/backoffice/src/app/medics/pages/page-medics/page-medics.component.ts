import { Component, OnInit } from '@angular/core';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { UtilsServices } from '../../../helpers/services/utils.service';
import { BaseComponent } from '../../../shared/classes/base-component';
import { FormComponent } from '../../components/form/form.component';
import { MedicApplication } from '../../application/medic.application';
import { MedicEntity } from '../../domain/entities/medic.entity';
import { ResultPage } from '../../../shared/interfaces/result-page.interface';
import {
  MedicPropertiesOptional,
  MedicPropertiesRequired,
} from '../../domain/entities/medic.entity';

@Component({
  selector: 'amb-page-medics',
  templateUrl: './page-medics.component.html',
  styleUrls: ['./page-medics.component.css'],
})
export class PageMedicsComponent extends BaseComponent implements OnInit {
  metaData: MetaDataColumn[] = [
    { field: 'nombre', header: 'Name', sortable: true },
    { field: 'apellido', header: 'Lastname', sortable: true },
    { field: 'segundo_nombre', header: 'Surname', sortable: true },
    { field: 'correo', header: 'Email', sortable: true },
    { field: 'cmp', header: 'CMP', sortable: true },
  ];
  listFields = ['name', 'cmp', 'age'];
  data!: MedicEntity[];
  dataOriginal!: MedicEntity[];
  totalRecords = 0;
  currentPage = 0;

  constructor(
    protected override utilsService: UtilsServices,
    private medicApplication: MedicApplication
  ) {
    super(utilsService);
  }

  ngOnInit(): void {
    this.getPage(0);
  }

  getPage(page: number): void {
    this.medicApplication
      .getPage(page)
      .subscribe((data: ResultPage<MedicEntity>) => {
        this.currentPage = page;
        this.totalRecords = data.totalRecords;
        this.data = data.records;
        this.dataOriginal = data.records;
      });
  }
  openForm(row: any = null) {
    const reference = this.utilsService.showModal(FormComponent, {
      panelClass: `form-modal`,
      data: row,
      disableClose: true,
    });
    reference.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      if (result.id) {
        // actualizando
        this.medicApplication
          .update(result.id, result.medic)
          .subscribe((result) => {
            console.log(result);
            this.getPage(this.currentPage);
          });
      } else {
        //insertando
        this.medicApplication.insert(result.medic).subscribe((result) => {
          console.log(result);
          this.getPage(this.currentPage);
        });
      }
    });
  }
  changePage(page: number) {
    this.getPage(page);
  }
  search(term: string) {
    // necesito buscar
    if (term) {
      this.data = this.data.filter(
        (el: any) =>
          el.nombre.toLowerCase().includes(term) ||
          el.apellido.toLowerCase().includes(term)
      );
    } else {
      this.data = [...this.dataOriginal]; // copia de data
    }
  }
}
