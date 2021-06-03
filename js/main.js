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
                vue.toDoList.push(doc.data());
            });
        });
        
        // this.toDoList = 
    },
    methods:{
        addItem(index){
            if (this.message.trim() != ''){
                this.toDoList.push({
                    item:this.message,
                    check:'opacity-hidden',
                });
            };
            this.message='';
        },
        removeItem(index){
            this.toDoList.splice(index,1);
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

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
    });
});
  