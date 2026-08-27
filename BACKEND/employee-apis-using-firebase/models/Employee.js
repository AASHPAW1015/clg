const db =require('../config/db');

class Employee{
    static async find(){
        const snapshot= await db.collection('employees').get();
        if(snapshot.empty){
            return[];
        }

        const employees=[];
        snapshot.forEach((doc)=>{
            employees.push({
                id:doc.id, ...doc.data()
            })
        });
        return employees;
    }

    static async findById(id){
        const docRef= db.collection('employees').doc(id);
        const doc= await docRef.get();
        if(!doc.exists){
            return null;
        }
        return{id:doc.id, ...doc.data()};
    }
    
    static async create(employee){
        const docRef= await db.collection('employees').add(employee);
        const doc= await docRef.get();
        if(!doc.exists){
            return null;
        }
        return {id:doc.id, ...doc.data()};
    }

    static async findbyIdAndUpdate(id,employee){
        const docRef=  db.collection('employees').doc(id);
        const doc= await docRef.get();
        if(!doc.exists){
            return null;
        }
        await docRef.update(employee);
        const updatedEmployeeData= await docRef.get();
        return{id:updatedEmployeeData.id,...updatedEmployeeData.data()};
    }

    static async findbyIdAndDelete(id){
        const docRef=  db.collection('employees').doc(id);
        const doc= await docRef.get();
        if(!doc.exists){
            return null;
        }
        await docRef.delete();
        return{id:doc.id,...doc.data()};
    }
}

module.exports=Employee;