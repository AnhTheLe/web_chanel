// export const REGEX_PHONE_NUMBER = /^[0-9 +-]{8,25}$/; // reg cũ bên fe-v3, k hiểu lắm
export const REGEX_PHONE_NUMBER = /(0)+([0-9]{9})\b/; // start with 0 and contain 10 digits
// /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/; // validate for international phone number
export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i;
