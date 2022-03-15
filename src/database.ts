import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

var {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_TEST_DB,
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    ENV
} = process.env

var client = new Pool

console.log(ENV)

if (ENV === 'dev'){
  client = new Pool ({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
    })
    

}

if (ENV === 'test'){
 client = new Pool ({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB,
        host: POSTGRES_HOST,
})
}

export default client