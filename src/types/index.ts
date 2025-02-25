// Интерфейс для товара
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс для формы, заполняемой пользователем
interface IOrderForm {
  payment?: string;
  address?: string;
  email?: string;
  phone?: string;
}

// Интерфейс для провалидированных данных
interface IValidatedOrderData {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

// Интерфейс для итоговых данных заказа
interface IOrderData extends IValidatedOrderData {
  total: number;
  items: string[];
}


// Интерфейс для резыльтата заказа
interface IOrderResult {
  id: string,
  total: number;
}

// Интерфейс для ошибки
interface IErrorData {
  message: string
}