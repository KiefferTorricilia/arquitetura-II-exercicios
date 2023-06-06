import { Request, Response } from "express-serve-static-core";
import { CoursesBusiness } from "../business/CoursesBusiness";
import { BaseError } from "../errors/BaseError";
import { Courses } from "../types";


export class CoursesController {

    public getCourses = async (req: Request, res: Response) => {
        try {

            const coursesBusiness = new CoursesBusiness
            const result = await coursesBusiness.getCourses()

            res.status(200).send(result)
        } catch (error) {
            console.log(error);

            if (res.statusCode === 200){
                res.status(500);
            };

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createCourse = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }

            const coursesBussiness = new CoursesBusiness()
            const output = await coursesBussiness.createCourse(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error);

            if(res.statusCode === 200){
                res.status(500);
            };

            if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado.")
            }
            
        }
    }

    public deleteCourse = async (req:Request, res: Response) => {
        try {
            const id:string = req.params.id;

            const courseBusiness = new CoursesBusiness()
            const output = await courseBusiness.deleteCourse(id)

            res.status(200).send(output)
        } catch (error) {
            console.log(error);

            if(res.statusCode === 200){
                res.status(500);
            };

            if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado.")
            }
        }

    }

    public updateCourse = async (req: Request, res: Response) => {
        try {
            const id:string = req.params.id
            const name:string = req.body.name;
            const lessons:number = req.body.lessons;

            const input: Courses = {
                id,
                name,
                lessons
            }

            const courseBusiness = new CoursesBusiness()
            const output = await courseBusiness.updateCourse(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error);

            if(res.statusCode === 200){
                res.status(500);
            }

            if (error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado.")
            }
        }
    }

}