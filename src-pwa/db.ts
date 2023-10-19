// import { openDB, IDBPDatabase } from 'idb'

// /*
//     user info {
//         username,
//         encrypted master password,
//         jwt token?
//     }
//     user settings {
//         default algo
//         timeout
//         pin settings {
//             enabled?

//         }
//     },


//     Service worker needs to be able to clear the unencrypted master password from memory
//     after a timeout, or when the user locks the app
//     (or when the user navigates away from the app?)

//     doesnt need to be able to hash the passwords
//     but it could do that to keep the transmission of the master password to a minimum
//     (and to keep the master password out of the browser's memory)

    
// */

// export const initDb = async () => {
//   const db = await openDB('hashpass', undefined, {
//     upgrade (db, old, newdb, tx) {
//       db.createObjectStore('authed', { keyPath: 'id'})
      
//       console.log(db, old, newdb, tx)
//     }
//   })
//   console.log(db)
  
//   const wrappedDb = new Database(db)
//   return wrappedDb


// }

// interface queryParams {
//   storeName: string,
//   query?: any
// }

// export class Database {

//   db;
//   constructor (database: IDBPDatabase<unknown>) {
//     this.db = database
//   }

//   async find (params: queryParams) {
//     let cursor = await this.db.transaction(params.storeName).store.openCursor()

//     const results = []
//     while (true) {
//       if (!cursor) break;

//       const [key, value] = [cursor.key, cursor.value]
//       if (!params.query) {
//         results.push(value)
//       } else {
//         if (compare(params.query, value)) results.push(value)
//       }
//       cursor = await cursor.continue()
//     }

//     // console.log(results)
//     return results
//   }

//   // async findOne (params) {

//   // }

//   async findById (params) {
//     const res = await this.db.get(params.storeName, params.query?.key)
//     return res
//   }

// }

// const compare = (query, obj, allowNull = true) => {
//   const val : boolean = Object.keys(query).every(key => {
//     const value = query[key]
//     if (value instanceof Object && obj[key]) return compare(value, obj[key])
//     return value == obj[key] || (allowNull && obj[key] == null)
//   }) as boolean

//   return val
// }

// export default initDb