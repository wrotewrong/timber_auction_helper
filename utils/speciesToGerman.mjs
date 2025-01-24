const speciesToGerman = (name) => {
  const trimName = name.trim()
  const nameUpperCase = trimName.toUpperCase();
  if (nameUpperCase === 'DB') {
    return `${trimName} - Eiche`;
  } else if (nameUpperCase === 'BK') {
    return `${trimName} - Buche`;
  } else if (nameUpperCase === 'MD') {
    return `${trimName} - Lärche`;
  } else if (nameUpperCase === 'OL') {
    return `${trimName} - Erle`;
  } else if (nameUpperCase === 'SO') {
    return `${trimName} - Kiefern`;
  } else if (nameUpperCase === 'SW') {
    return `${trimName} - Fichten`;
  } else if (nameUpperCase === 'JS') {
    return `${trimName} - Eschen`;
  } else if (nameUpperCase === 'JW') {
    return `${trimName} - Berg-Ahorn`;
  } else if (nameUpperCase === 'DBCZ') {
    return `${trimName} - Roteiche`;
  } else {
    return trimName
  }
};

export default speciesToGerman;
