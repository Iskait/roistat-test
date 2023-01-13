export interface Utilizer {
  /** Имя пользователя */
  name: string;
  /** Телефон пользователя */
  phone: string;
}

export interface Form extends Utilizer {
  chief: number | null;
}
