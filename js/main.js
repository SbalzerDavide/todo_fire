var db = firebase.firestore();


const app = new Vue ({
    el: '#app',

    data: {
        saluto: 'salutone',
        toDoList:[],
        message:'',
        editItem: -1,
        newText: "",
    },
    created(){
        vue = this;
        let noteRef = window.db.collection("note").orderBy("timestamp").limit(20).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc);
                let newItem = doc.data();
                newItem.id = doc.id;
                console.log(newItem);

                vue.toDoList.push(newItem);
                console.log(doc.id);
            });
        });
        console.log(window.db.collection("note").orderBy("timestamp", "desc").limit(3));
        

        
        // this.toDoList = 
    },
    methods:{
        addItem(index){
            if (this.message.trim() != ''){
                db.collection("note").add({
                    item:this.message,
                    check:'opacity-hidden',
                    timestamp: Date.now(),

                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    let newItem = {
                        item:this.message,
                        check:'opacity-hidden',
                        id : docRef.id
                    }
                    console.log(newItem);
                    this.message='';
                    this.toDoList.push(newItem);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            };
        },
        removeItem(index){
            console.log("eliminato");
            let actualId = this.toDoList[index].id;
            console.log(actualId);
            db.collection("note").doc(actualId).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                this.toDoList.splice(index,1);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        },
        done(index){
            console.log("aggiornato");
            if (this.toDoList[index].check === 'opacity-hidden'){
                this.toDoList[index].check = 'opacity-show';
                let actualId = this.toDoList[index].id;
                console.log(actualId);
                db.collection("note").doc(actualId).update({
                    check: 'opacity-show'
                })
                .then(() => {
                    console.log("Document successfully updated!");
                }).catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
    
            } else{
                this.toDoList[index].check = 'opacity-hidden';
                let actualId = this.toDoList[index].id;
                console.log(actualId);
                db.collection("note").doc(actualId).update({
                    check: 'opacity-hidden'
                })
                .then(() => {
                    console.log("Document successfully updated!");
                }).catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
    
            }
        },
        edit(index){
            this.editItem = index;
            console.log(this.toDoList[index].item);
            this.newText = this.toDoList[index].item;
        },
        change(index){
            let actualId = this.toDoList[index].id;
            console.log(actualId);
            db.collection("note").doc(actualId).update({
                item: this.newText,
                timestamp = Date.now()
            })
            .then(() => {
                console.log("Document successfully updated!");
                this.toDoList[index].item = this.newText;
                this.editItem = -1;
            }).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        }
    }
});

  

// db.collection("note").add({
//     item: "fare la cacca",
//     check: false,
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });

// db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//         console.log(doc.data());
//     });
// });
  