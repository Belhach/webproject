const users =[];


const addUser = ({id,name,groupName}) =>{
    name = name.trim().toLowerCase();
    groupName = groupName.trim().toLowerCase();

    const existingUser = users.find((user) => user.groupName === groupName && user.name === name);

    //verify if user is already used in the selected group
    if(existingUser){
        return {error : 'username already taken'};
    }
    const user = {id,name,groupName};

    users.push(user);

    return {user}
};

const deleteUser = (id) =>{
    const index = users.findIndex((user) => user.id ===id);
    //delete user
    if(index !== -1){
        return users.splice(index,1)[0];
    }
};

const getUser = (id) =>{
    return users.find((user) => user.id ===id);
};


const getUsersInGroup = (groupName) => users.filter((user) => user.groupName === groupName);

module.exports = {addUser, deleteUser, getUser, getUsersInGroup};