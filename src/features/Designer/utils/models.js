
export const newLayoutModel = (stored) => 
{
    return ({
    isActive: true,
    idCompany: stored.company.id,
    createdBy: stored?.useremail,
    modifiedBy: stored?.useremail,
    content: "[]",
    styles: "[]"
})
}

export const cloneLayoutModel = (stored) => {
    return ({
        isActive: true,
    createdBy: stored?.useremail,
    modifiedBy: stored?.useremail,})
}