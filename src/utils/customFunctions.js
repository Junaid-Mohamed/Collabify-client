export const getDueDate = (createdAt,dayToComplete) =>{
    const dueDate = new Date(createdAt);
    dueDate.setDate(dueDate.getDate()+dayToComplete);
    return dueDate.toISOString().split('T')[0];
}