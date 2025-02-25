import IView from "./IView";
import { EventEmitter } from "../base/events";

export default class BasketItemView implements IView{
  protected _title: HTMLElement;
  protected _price: HTMLButtonElement;
  protected _removeButton: HTMLButtonElement;
  
  protected _id: string | null = null;

  constructor(protected container: HTMLElement, protected events: EventEmitter) {

  }

  render(data: {id: string, title: string}) {
    if (data) {
      this._id = data.id;
      this._title.textContent = data.title;
    }
    return this.container;
  }
}

