const formatDigit = (value) => {
  if (value < 10) {
    return "0" + value;
  }

  return value;
};

const formatDate = (dateISOFormat) => {
  const dateObject = new Date(dateISOFormat);

  const fechaDeEntrega = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`;

  const hours = formatDigit(dateObject.getHours());
  const minutes = formatDigit(dateObject.getMinutes());

  const horaDeEntrega = `${hours}:${minutes} hrs`;

  return fechaDeEntrega + " " + horaDeEntrega;
};

export default formatDate;
