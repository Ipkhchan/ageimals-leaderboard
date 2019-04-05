function orderSingleObject(orderedKeys, object) {
  const orderedObject = {};

  orderedKeys.forEach((key) => {
    const [originalKey, renamedKey] = key;

    if (object[originalKey] || object[originalKey] === 0) {
      orderedObject[renamedKey] = object[originalKey];
    }
  });

  return orderedObject;
}

function orderObjects(orderedKeys, objects) {
  const orderedObjects = objects.map((object) =>
    orderSingleObject(orderedKeys, object),
  );

  return orderedObjects;
}

module.exports = {
  orderSingleObject: orderSingleObject,
  orderObjects: orderObjects,
};
