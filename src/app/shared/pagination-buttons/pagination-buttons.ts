import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';

@Component({
  selector: 'clqt-pagination-buttons',
  imports: [GsButtons],
  templateUrl: './pagination-buttons.html',
  styleUrl: './pagination-buttons.scss',
})
export class PaginationButtons {
  @Input({ required: true }) public availablePages?: {
    actualPage: number;
    totalPages: number;
    pages: number[];
  };

  @Output() public requiredPage = new EventEmitter<number>();

  public buttonType = gsButtonTypeEnum;
  public targetType = gsTabTargetEnum;
  public variantType = gsVariant;
}
