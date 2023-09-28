import { Injectable } from '@nestjs/common';

@Injectable()
export class FlagService {
  private allowCreateFlag: boolean = false;

  setAllowCreateFlag(value: boolean): void {
    this.allowCreateFlag = value;
  }

  getAllowCreateFlag(): boolean {
    return this.allowCreateFlag;
  }
}
