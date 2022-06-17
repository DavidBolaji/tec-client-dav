

export const User = {
    register: `user/register`,
    login: `user/login`,
    update: `user/update`,
    find:(id) => {
        return `user/find/${id}`
    },
    tutors: `user/find/tutors`,
    activate: `user/activate`,
    delete:(id) => {
        return `user/delete/${id}`
    },
    logout: `user/logout`
}

export const Blog = {
    create: `blog/create`,
    find: `blog/find`,
    findOne:(id) => {
        return `blog/find/${id}`
    },
    updateOne:(id) => {
        return `blog/update/${id}`
    },
    delete:(id) => {
        return `blog/delete/${id}`
    },
}