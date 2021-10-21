import firebase from "../_conn";
const realtimeDatabase = firebase.database();

class RealTimeDatabase {
  static async writeCollection({ data = {}, collection = "" }) {
    return realtimeDatabase
      .ref(`${collection}`)
      .set(data)
      .then((res) => res)
      .catch((err) => {
        console.log("[FirebaseRealtimeDatabase Error]", err);
      });
  }
  static async pushCollection({ data = {}, collection = "" }) {
    return realtimeDatabase
      .ref(`${collection}`)
      .push(data)
      .then((res) => res)
      .catch((err) => {
        console.log("[FirebaseRealtimeDatabase Error]", err);
      });
  }
  static async readCollection({ collection, cb }) {
    let _doc;
    const data = await realtimeDatabase
      .ref(collection)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (cb) cb(doc.val());
          _doc = doc.val();
          return doc.val();
        } else {
          console.log(
            `[FirebaseRealtimeDatabase], Document ${collection} dont exist.`
          );
        }
      })
      .then((doc) => {
        return doc;
      });

    return data;
  }

  static async updateCollection({ data = {}, collection = "" }) {
    return await realtimeDatabase
      .ref(`${collection}`)
      .update(data)
      .then((res) => res)
      .catch((err) => {
        console.log("[FirebaseRealtimeDatabase Error]", err);
      });
  }

  static async onUpdateCollecion({ collection = "", onUpdate = () => {} }) {
    /* console.log("[Firebase Realtimedatabase]", `${collection}: Trigger init.`); */

    realtimeDatabase.ref(`${collection}`).on(
      "value",
      async (value) => {
        const data = await this.readCollection({ collection, cb: onUpdate });
        return data;
      },
      (err) => {
        console.log(err);
      }
    );

    return true;
  }
}

export default RealTimeDatabase;
