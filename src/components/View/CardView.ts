import { IAction, IProduct } from '../../types';
import { IEvents } from '../base/events';
import IView from './IView';

export class CardView implements IView {
	protected _cardElement: HTMLElement;
	protected _cardCategoryElement: HTMLElement;
	protected _cardTitleElement: HTMLElement;
	protected _cardImageElement: HTMLImageElement;
	protected _cardPriceElement: HTMLElement;

	protected _categoryClassNames = <Record<string, string>>{
		'дополнительное': 'additional',
		'софт-скил': 'soft',
		'кнопка': 'button',
		'хард-скил': 'hard',
		'другое': 'other',
	};

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IAction
	) {
		this._cardElement = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;

		this._cardCategoryElement = this._cardElement.querySelector('.card__category');
		this._cardTitleElement = this._cardElement.querySelector('.card__title');
		this._cardImageElement = this._cardElement.querySelector('.card__image');
		this._cardPriceElement = this._cardElement.querySelector('.card__price');

    this._cardCategoryElement.classList.add(
      `card__category__${this._cardCategoryElement.textContent}`
    );

		if (actions.onClick) {
			this._cardElement.addEventListener('click', actions.onClick);
		}
	}

	render(data: IProduct) {
    this._cardCategoryElement.textContent = data.category;
    this._cardTitleElement.textContent = data.title;
    this._cardImageElement.src = data.image;
    this._cardImageElement.alt = this._cardTitleElement.textContent;
    this._cardPriceElement.textContent = `${String(data.price)} синапсов` || 'Бесценно';
    return this._cardElement;
  }
}
