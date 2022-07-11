const getAllData = async (userFilter) => {
    try {
        const user = await User.findAll({
            where: userFilter
        });
        return user;
        
    } catch (error) {
        console.log(error);

    }
    
    
}
module.exports = {
    getAllData
}