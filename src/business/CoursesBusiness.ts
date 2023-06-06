import { CoursesDatabase} from "../database/CoursesDatabase"
import { Course } from "../models/Course"
import { Courses } from "../types"



export class CoursesBusiness {

    public getCourses = async ():Promise<Courses[]> => {

        const coursesDatabase = new CoursesDatabase
        const result: Courses[] = await coursesDatabase.getCourses()
        
        return result
    }

    public createCourse = async (input:Courses):Promise<any> => {
        const {id, name, lessons} = input;

        
        
        const newCourse = new Course(
            id,
            name,
            lessons
        );

        const newCourseDB: Courses = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }
        const coursesDatabase = new CoursesDatabase()
        await coursesDatabase.createCourse(newCourseDB)

        const output = {
            message: "Cadastro realizado com sucesso",
            course: newCourse
        }

        return output
    }

    public deleteCourse = async (id:string):Promise<any> => {

        const courseDatabase = new CoursesDatabase()
        const courseDB = await courseDatabase.findUserById(id)
        const result = await courseDatabase.deleteCourse(id)

        const output = {
            message: "Curso deletado com sucesso",
            course: courseDB
        }
        return output

    }

    public updateCourse = async (input:Courses):Promise<any> => {
        const {id, name, lessons} = input

        const courseDatabase = new CoursesDatabase()
        const courseDB = await courseDatabase.findUserById(id)

        const course = new Course (
            courseDB.id,
            courseDB.name,
            courseDB.lessons
        )

        if(name) {
            course.setName(name)
        }
        if(lessons){
            course.setLessons(lessons)
        }

        const result = await courseDatabase.updateCourse(id, course)

        const output = {
            message: "Curso atualizado com sucesso.",
            course: courseDB
        }

        return output

    }

}