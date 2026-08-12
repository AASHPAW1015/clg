const supabase = require('../config/db');

class Employee {
     async findAll() {
     const{data, error}= await supabase.from('employee').select('*');
     if (error) {
       throw new Error("something went wrong");
     }
     return data;
       }
       async findById(id) {
        const{data, error}= await supabase.from('employee').select('*').eq('id', id).maybeSingle();
        if (error) {
          throw new Error("something went wrong");
        }
        return data;
       }
       async create(employee) {
        const{data, error}= await supabase.from('employee').insert(employee).select('*').single();
        if (error) {
          throw new Error(error.message || error.details || "something went wrong");
        }
        return data;
       }

       async findByIdandUpdate(id,employee) {
        const{data, error}= await supabase.from('employee').update(employee).eq('id', id).select('*').maybeSingle();
        if (error) {
          throw new Error("something went wrong");
        }
        return data;
       }

       async findByIdandDelete(id) {
        const{data, error}= await supabase.from('employee').delete().eq('id', id).select('*').maybeSingle();
        if (error) {
          throw new Error("something went wrong");
        }
        return data;
       }
}

module.exports = new Employee();