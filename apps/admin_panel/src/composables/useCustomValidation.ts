// Mobile number examples: 09123456789, ۰۹۱۲۳۴۵۶۷۸۹
export const mobileNumberRegex = /^(09|۰۹)[0-9۰-۹]{9}$/;

// Phone number examples: 02112345678, ۰۲۱۱۲۳۴۵۶۷۸
export const phoneNumberRegex = /^(0|۰)[0-9۰-۹]{10}$/;

// Email examples: user@example.com, john.doe123@sub.domain.com
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// URL examples:
// https://www.example.com
// http://www.example.com
// https://example.com
// http://sub.domain.com/path
// www.example.com/path?param=value
export const urlRegex =
  /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

export const useCustomValidation = () => {
  const urlValidator = (value: string) => urlRegex.test(value);
  const emailValidator = (value: string) => emailRegex.test(value);
  const phoneNumberValidator = (value: string) => phoneNumberRegex.test(value);
  const mobileNumberValidator = (value: string) => mobileNumberRegex.test(value);

  return {
    emailValidator,
    mobileNumberValidator,
    phoneNumberValidator,
    urlValidator,
  };
};
