
export const newLayoutModel = (stored) => 
{
    return ({
    isActive: true,
    idCompany: stored.company.id,
    createdBy: stored?.user.email,
    modifiedBy: stored?.user.email,
    content: "[]",
    styles: "[]"
})
}

export const cloneLayoutModel = (stored) => {
    return ({
        isActive: true,
    createdBy: stored?.user.email,
    modifiedBy: stored?.user.email,})
}