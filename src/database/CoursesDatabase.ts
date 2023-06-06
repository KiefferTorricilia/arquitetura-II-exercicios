import { Course } from "../models/Course";
import { Courses } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class CoursesDatabase extends BaseDatabase {
    public static TABLE_NAME = "courses"

    public async getCourses():Promise<Courses[]> {
        
        const result: Courses[] = await BaseDatabase.connection(CoursesDatabase.TABLE_NAME)
        return result
    }

    public async findUserById (id:string):Promise<Courses> {
        const [result]: Courses[] | undefined = await BaseDatabase.connection(CoursesDatabase.TABLE_NAME).where({id})
        return result
    }

    public async createCourse (course:Courses ):Promise<void> {
        await BaseDatabase.connection(CoursesDatabase.TABLE_NAME).insert(course)
    }

    public async deleteCourse (id:string):Promise<void> {
        await BaseDatabase.connection(CoursesDatabase.TABLE_NAME).delete().where({id: id})
    }

    public async updateCourse (id:string, course: Course):Promise<void> {
        await BaseDatabase.connection(CoursesDatabase.TABLE_NAME).update(course).where({id})
    }

    
}