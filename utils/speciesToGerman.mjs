const speciesToGerman = (name) => {
  const nameUpperCase = name.toUpperCase();
  if (nameUpperCase === 'DB') {
    return `${name} - Eiche`;
  } else if (nameUpperCase === 'BK') {
    return `${name} - Buche`;
  } else if (nameUpperCase === 'MD') {
    return `${name} - Lärche`;
  } else if (nameUpperCase === 'OL') {
    return `${name} - Erle`;
  }
};

export default speciesToGerman;
