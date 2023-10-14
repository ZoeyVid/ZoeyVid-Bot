const approvedUser = new Set();

module.exports = {
    async approvUser(user) {
        approvedUser.add(user)
        setTimeout(() => {
            approvedUser.delete(user)
        }, 10 * 60 * 1000);
    },
    async ifUserApproved(user) {
        console.log(await approvedUser.has(user))
        return await approvedUser.has(user)
    }
}
