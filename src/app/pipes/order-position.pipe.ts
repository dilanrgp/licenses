import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPosition',
})
export class OrderPositionPipe implements PipeTransform {

  transform(po: string, position: string ): string {
    // Eliminar ceros a la izquierda del PO
    const formattedPo = po.replace(/^0+/, '');
    
    // Eliminar ceros a la izquierda de la posición
    const formattedPosition = position.replace(/^0+/, '');
    
    // Combinar los valores formateados con un guión
    return `${formattedPo}-${formattedPosition}`;
  }

}
