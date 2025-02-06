import { Course } from "../models/course_model.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";
export const createCourse= async (req,res)=>{
    try {
        const {courseTitle,category}=req.body;
        if(!courseTitle || !category){
            return res.status(400).json({
                message:"Course Title and Category Required",
                success:false
            })
        }
        const course= await Course.create({
            courseTitle,
            category,
            creator:req.id
        });
        return res.status(201).json({
            course,
            message:"Course Created Successfully"
        })
    } catch (error) {
        return res.status(401).json({
            message:"Failed to create Course",
            success:false
        })
    }
}

export const getCourseEnrolled = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creater: userId });

        if (!courses || courses.length === 0) {
            return res.status(404).json({
                message: "Course not found",
                status: false,
                courses: []
            });
        }

        return res.status(200).json({
            status: true,
            courses
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to fetch courses",
            status: false
        });
    }
};
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseLevel, courseTitle, description, category, coursePrice } = req.body;
        const thumbnail = req.file;
        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not Found",
                success: false
            })
        
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMedia(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path);
        }
        const updatedData = { courseLevel, courseTitle, description, category, coursePrice, courseThumbnail: courseThumbnail?.secure_url }
        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });
        return res.status(200).json({
            course,
            message: "Course Updated"
        })
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to update courses",
            status: false
        })
    }
};

export const getCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not Found",
                success: false
            })
        
        }
        return res.status(200).json({
            course,
            message: "Course fetched Successfully"
        })
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to fetch courses",
            status: false
        })
    }
};