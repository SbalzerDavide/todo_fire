var db = firebase.firestore();


const app = new Vue ({
    el: '#app',

    data: {
        saluto: 'salutone',
        toDoList:[],
        message:'',
    },
    created(){
        vue = this;
        window.db.collection("note").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let newItem = doc.data();
                newItem.id = doc.id;

                vue.toDoList.push(newItem);
                console.log(doc.id);
            });
        });
        
        // this.toDoList = 
    },
    methods:{
        addItem(index){
            if (this.message.trim() != ''){
                db.collection("note").add({
                    item:this.message,
                    check:'opacity-hidden',
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
                this.toDoList.push({
                    item:this.message,
                    check:'opacity-hidden',
                });
            };
            this.message='';
        },
        removeItem(index){
            this.toDoList.splice(index,1);
            db.collection("note").doc("KT0DlXIPKOHZmpJ6kMkE").delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        },
        done(index){
            if (this.toDoList[index].check === 'opacity-hidden'){
                this.toDoList[index].check = 'opacity-show';
            } else{
                this.toDoList[index].check = 'opacity-hidden';
            }
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
  