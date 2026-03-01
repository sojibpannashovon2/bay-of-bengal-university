# bay-of-bengal-university

# npm install -D @types/express -- If there are issue found on req and res

# npm i -- save-dev @types/cors

# It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to node-dev -r ts-node/register ..., nodemon -x ts-node ... variations because there is no need to instantiate ts-node compilation each time.

      ts-node-dev --respawn --transpile-only server.ts




// Query works is Mongoose Model in Service Page
              import { Student } from "./student.model";
              import { TStudent } from "./student.interface";
            
            const createStudentIntoDB = async (studentData: TStudent) => {
              //! Custom static Methods
            
              if (await Student.isUserExist(studentData.id)) {
                throw new Error("User Already Exists");
              }
              const result = await Student.create(studentData);

  //! Custom instance method
  /*  const student = new Student(studentData); //! Create an instance
              if (await student.isUserExist(student.id)) {
                 throw new Error("User Already Exists");
               }
            
               const result = await student.save();  
               
               */

        return result;
      };
//? Get all database from student database
                  const getAllStudentsFromDB = async () => {
                    const result = await Student.find();
                    return result;
                  };
//?Get Single Data from student database
                  const getStudentFromDB = async (id: string) => {
                    // const result = await Student.findOne({ id });
                    const result = await Student.aggregate([{ $match: { id: id } }]);
                    return result;
                  };

//?Delete Single Data from student database
                  const deleteStudentFromDB = async (id: string) => {
                    const result = await Student.updateOne({ id }, { isDeleted: true });
                    return result;
                  };
                  export const StudentServices = {
                    createStudentIntoDB,
                    getAllStudentsFromDB,
                    getStudentFromDB,
                    deleteStudentFromDB,
                  };
