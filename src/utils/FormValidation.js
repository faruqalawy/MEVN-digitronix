export const validateCustomerInformation = (info) => {
  const errors = [];

  if (!info.email) errors.push('Email is required.');
  if (!info.firstName) errors.push('First Name is required.');
  if (!info.lastName) errors.push('Last Name is required.');
  if (!info.country) errors.push('Country / Region is required.');
  if (!info.streetAddress) errors.push('Street Address is required.');
  if (!info.province) errors.push('Province is required.');
  if (!info.city) errors.push('Town / City is required.');
  if (!info.postcode) errors.push('Postcode / ZIP is required.');
  if (!info.phone) errors.push('Your Phone Number is required.');

  return errors;
};

export const validatePaymentMethod = () => {
  const errors = [];
  // Placeholder for future payment validation logic
  errors.push('Invalid payment method.');  // Always show this error for now
  return errors;
};
