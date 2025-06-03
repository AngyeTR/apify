const rawData = window.localStorage.getItem("data")
const stored = JSON.parse(rawData)
const date = new Date().toISOString();

export const adaptNewCartModel= (dataSet, product, userId) => {
  console.log(dataSet)
  dataSet["modifiedBy"]= stored .user.email
  dataSet["createdBy"]= stored .user.email
  dataSet["idCompany"]= stored.company.id
  dataSet["idCustomer"]= userId
  dataSet["docDate"]= date
  dataSet["app"]= 1
  dataSet["lines"]= [
    {
      isActive: true,
      idCompany: stored.company.id,
      createdBy: stored .user.email,
      modifiedBy: stored .user.email,
      idCustomer: userId,
      idProduct: product.id,
      lineNum: 1,
      productName: product.name,
      quantity: 1,
      price: product.price,
      taxRate: 0,
      taxValue: 0,
      discPrcnt: 0,
      discValue: 0,
      total: 0
    }]

    return dataSet
}

export const adaptAddingCartModel= (dataSet, product, userId) => {
  dataSet["app"]= dataSet.app + 1
  dataSet["lines"]= [
    {
      isActive: true,
      idCompany: stored.company.id,
      createdBy: stored .user.email,
      modifiedBy: stored .user.email,
      idCustomer: userId,
      idProduct: product.id,
      lineNum: dataSet.lines.length,
      productName: product.name,
      quantity: 1,
      price: product.price,
      taxRate: 0,
      taxValue: 0,
      discPrcnt: 0,
      discValue: 0,
      total: 0,
      idPreOrder: dataSet.id
    }]
    return dataSet
}

export const adaptquantityChangeCartModel= (dataSet, productId, quantity) => {
const index = dataSet.lines.findIndex(item => item.idProduct == productId);
 dataSet["lines"][index].quantity= quantity
  return dataSet 
}

export const adaptDeleteCartModel= (dataSet, productId) => {
    const newLines = dataSet.lines.filter(item => item.idProduct != productId)
    newLines.map(item => {delete item.id; delete item.idPreOrder})
    const { id, lines, ...rest } = dataSet;

  rest["app"]= dataSet.app -1
  rest["lines"]= newLines

  return rest
}

export const adaptFavoriteModel= (dataSet, userId, productId ) => {
  dataSet["modifiedBy"]= stored .user.email
  dataSet["createdBy"]= stored .user.email
  dataSet["idCompany"]= stored.company.id
  dataSet["idCustomer"]= userId
  dataSet["idProduct"]= parseInt(productId)
  dataSet["startDate"] = date
  return dataSet
}