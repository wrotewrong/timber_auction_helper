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
  } else if (nameUpperCase === 'SO') {
    return `${name} - Kiefern`;
  } else if (nameUpperCase === 'SW') {
    return `${name} - Fichten`;
  } else if (nameUpperCase === 'JS') {
    return `${name} - Eschen`;
  } else if (nameUpperCase === 'JW') {
    return `${name} - Berg-Ahorn`;
  } else if (nameUpperCase === 'DBCZ') {
    return `${name} - Roteiche`;
  }
};

export default speciesToGerman;
