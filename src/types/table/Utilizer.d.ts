export interface Utilizer {
  /** Имя пользователя */
  name: string;
  /** Телефон пользователя */
  phone: string;
  /** ID пользователя */
  id: string;
  /** Начальник пользователя */
  chief: string | null;
  /** Список подчиненных */
  subordinates: Utilizer[];
}
