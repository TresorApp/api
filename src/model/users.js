import * as UserDb from "../db/users"
import bcrypt from "bcryptjs"

function User(userId, userName, hash, email, createdAt, updatedAt) {
    return {
        userId: userId,
        userName: userName,
        hash: hash,
        email: email,
        createdAt: createdAt,
        updatedAt: updatedAt
    };
}

export function getUser(userName) {
    return UserDb.getUser(userName)
    .then (userDb => {
        createUserFromDb(userDb)
    })
}

function checkPassord(password) {
    return bcrypt.compareSync(password, this.hash)
}

export function createNewUser(userName, password, email) {
    const hash = bcrypt.hashSync(password, 10)
    return UserDb.createUser(userName, hash, email)
        .then(userDb => {
            return createUserFromDb(userDb)
        })
}

function createUserFromDb(userDb) {
    return User(
        userDb.userId,
        userDb.userName,
        userDb.hash,
        userDb.email,
        userDb.createdAt,
        userDb.updatedAt
    )
}