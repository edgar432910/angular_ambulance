import { UtilsServices } from '../../helpers/services/utils.service';

export abstract class BaseComponent {
  abstract data: any;
  constructor(protected utilsService: UtilsServices) {}

  delete(row: any) {
    const response = this.utilsService.showConfirm(`Delete it? are you sure?`);
    response.subscribe((result) => {
      console.log({ result });
      if (!result) return;
      if (result === 'yes') {
        // eliminar
        console.log(row);
        const position = this.data.findIndex((item: any) => item.id === row.id);
        const elements = [...this.data];
        // evalua que sea un arreglo, nada mas, entonces
        elements.splice(position, 1);
        this.data = elements;
      }
    });
  }
}
