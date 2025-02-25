// Интерфейс для товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс для обработки событий 
export interface IAction {
  onClick(event: MouseEvent): void;
}

// Интерфейс для формы, заполняемой пользователем
export interface IOrderForm {
  payment?: string;
  address?: string;
  email?: string;
  phone?: string;
}

// Интерфейс для провалидированных данных
export interface IValidatedOrderData {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

// Интерфейс для итоговых данных заказа
export interface IOrderData extends IValidatedOrderData {
  total: number;
  items: string[];
}


// Интерфейс для резыльтата заказа
export interface IOrderResult {
  id: string,
  total: number;
}

// Интерфейс для ошибки
export interface IErrorData {
  message: string
}