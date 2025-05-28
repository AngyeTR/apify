
export const filtercarts = (data, id)=>{
  const cart = data.filter(item=> item.idCustomer == id)
  const index = cart.length
const filtered = (index == 0 ? {lines:[]} : cart[index-1])
return filtered
} 

export const filterFavorites = (data)=>{
  const filtered = data.filter(item=> item.isFavorite == true)
  const items = []
  filtered?.map(item=> items.push(item.id))
  return items
}