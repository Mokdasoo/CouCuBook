import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { Coupon, CouponBook, Gift } from "../src/types/coupon";


function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
    const db = SQLite.openDatabase("coucubook.db");
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => { });
    return db;
}

const database = openDatabase();

export const createCouponBookTable = () : Promise<void>  => {
    const promise = new Promise<void>((resolve, reject) => {
      database.transaction((db) => {
        db.executeSql(
          `CREATE TABLE IF NOT EXISTS couponbooks (
                  id INTEGER PRIMARY KEY NOT NULL,
                  title TEXT NOT NULL,
                  cover_color TEXT NOT NULL,
                  publicationDate TEXT NOT NULL,
                  expiredDate TEXT NOT NULL
              )`,
          [],
          () => {
            resolve();
          },
          (_, error): boolean| any => {
            reject(error);
          }
        );
      });
    });
    return promise;
  };

  export const createCouponTable = () : Promise<void>  => {
    const promise = new Promise<void>((resolve, reject) => {
      database.transaction((db) => {
        db.executeSql(
          `CREATE TABLE IF NOT EXISTS coupons (
                  id INTEGER PRIMARY KEY NOT NULL,
                  title TEXT NOT NULL,
                  content TEXT NOT NULL,
                  image INTEGER NOT NULL,
                  paper_color TEXT NOT NULL,
                  book_id INTEGER NOT NULL,
                  FOREIGN KEY (book_id) REFERENCES couponbooks (id) ON DELETE CASCADE
            )`,
          [],
          () => {
            resolve();
          },
          (_, error): boolean| any => {
            reject(error);
          }
        );
      });
    });
    return promise;
  };

  export const createGiftTable = () : Promise<void>  => {
    const promise = new Promise<void>((resolve, reject) => {
      database.transaction((db) => {
        db.executeSql(
          `CREATE TABLE IF NOT EXISTS gifts (
                  id INTEGER PRIMARY KEY NOT NULL,
                  book_id INTEGER NOT NULL,
                  isgifted INTEGER NOT NULL,
                  FOREIGN KEY (book_id) REFERENCES couponbooks (id) ON DELETE CASCADE
            )`,
          [],
          () => {
            resolve();
          },
          (_, error): boolean| any => {
            reject(error);
          }
        );
      });
    });
    return promise;
  };

  export const insertCouponBooks = (book : CouponBook) => {
    const promise = new Promise<any>((resolve, reject) => {
      database.transaction((tx) => {
        //쿠폰북 수정 분기해야함
        tx.executeSql(
            !book.id ? 
                `INSERT INTO couponbooks (title, cover_color, publicationDate, expiredDate) VALUES (?, ?, ?, ?)` : 
                `UPDATE couponbooks SET title=?, cover_color=?, publicationDate=?, expiredDate=? where id=?`
            ,
            !book.id ?
            [
                book.title,
                book.cover_color,
                book.publicationDate,
                book.expiredDate,
            ] : 
            [
                book.title,
                book.cover_color,
                book.publicationDate,
                book.expiredDate,
                book.id
            ]
            ,
          (_, result) => {
            console.log(result);
            resolve(result);
          },
          (_, err): boolean| any  => {
            reject(err);
          }
        );
      });
    });
  
    return promise;
  };

  export const insertGift = (book_id : number) => {
    const promise = new Promise<any>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO gifts (book_id, isgifted) VALUES (?, ?)`,
          [
            book_id,
            0
          ],
          (_, result) => {
            console.log(result);
            resolve(result);
          },
          (_, err): boolean| any  => {
            reject(err);
          }
        );
      });
    });
  
    return promise;
  };

  export const updateGift = (book_id : number) => {
    const promise = new Promise<any>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `UPDATE gifts SET isgifted=? WHERE book_id=?`,
          [
            1,
            book_id,
          ],
          (_, result) => {
            console.log(result);
            resolve(result);
          },
          (_, err): boolean| any  => {
            reject(err);
          }
        );
      });
    });
  
    return promise;
  };

  export const insertCoupons = (coupon : Coupon) => {
    const promise = new Promise<any>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO coupons (title, content, image, paper_color, book_id) VALUES (?, ?, ?, ?, ?)`,
          [
            coupon.title,
            coupon.content,
            coupon.image,
            coupon.paper_color,
            coupon.book_id!
          ],
          (_, result) => {
            console.log(result);
            resolve(result);
          },
          (_, err): boolean| any  => {
            reject(err);
          }
        );
      });
    });
  
    return promise;
  };
  
  export const fetchBooks = () => {
    const promise = new Promise<CouponBook[]>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM couponbooks",
          [],
          async (_, result) => {
            const books : CouponBook[] = [];
                await result.rows._array.reduce(async(prevPromise, book) => {
                    await prevPromise;
                    const res = await fetchCoupons(book.id);
                    books.push({
                        ...book,
                        coupons: [...res]
                    });
                }, Promise.resolve());
            resolve(books);
            
          },
          (_, error): boolean| any => {
            reject(error);
          }
        );
      });
    });
    return promise;
  };

  export const fetchCoupons = (book_id: number) => {
    const promise = new Promise<Coupon[]>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM coupons WHERE book_id = ?`, 
                [book_id],
                (_, result) => {
                    resolve(result.rows._array);
                },    
                (_, error): boolean| any => {
                    reject(error);
                },    
            );
        });
    });
    return promise;
  }

  export const fetchGift = (book_id: number) => {
    const promise = new Promise<Gift>((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM gifts WHERE book_id = ?`, 
                [book_id],
                (_, result) => {
                    resolve(result.rows._array[0]);
                },    
                (_, error): boolean| any => {
                    reject(error);
                },    
            );
        });
    });
    return promise;
  }
  export const deleteCouponBookDB = (id: number) => {
    const promise = new Promise<any>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM couponbooks WHERE id=?`,
          [
            id
          ],
          (_, result) => {
            console.log(result);
            resolve(result);
          },
          (_, err): boolean| any  => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };

  export const deleteCouponDB = (id: number) => {
    const promise = new Promise<any>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM coupons WHERE id=?`,
          [
            id
          ],
          (_, result) => {
            console.log(result);
            resolve(result);
          },
          (_, err): boolean| any  => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };