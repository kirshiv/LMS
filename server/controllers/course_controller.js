import { Course } from "../models/course_model.js";
import { Lecture } from "../models/lecture_model.js";
import { deleteMedia, deleteVideo, uploadMedia } from "../utils/cloudinary.js";
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
        const { courseLevel, courseTitle, description, category, coursePrice,subTitle } = req.body;
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
        const updatedData = { subTitle,courseLevel, courseTitle, description, category, coursePrice, courseThumbnail: courseThumbnail?.secure_url }
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
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;
        if (!lectureTitle || !courseId)
        {
            return res.status(500).json({
                message: "Lecture not found or doesnt exists",
                success:false
            })
        }
        const lecture = await Lecture.create({ lectureTitle });
        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(201).json({
            lecture,
            message:"Lecture created Successfully"
        })

    } catch (error) {
         console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to fetch courses",
            status: false
        })
    }
};
export const courseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(404).json({
                message: "Course Not found",
                success: false
            })
        }
        return res.status(200).json({
            lectures: course.lectures
        })
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to fetch lectures",
            status: false
        })
  
    }
};
export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo,  isPreviewFree} = req.body;
        const { courseId, lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not Found",
                success: false
            })
        }
        if (lecture.lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
         lecture.isPreviewFree =   isPreviewFree;
        await lecture.save();
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(200).json({
            lecture,
            message: "Lecture Added"
        })
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to add lectures",
            status: false
        })
    }
};
export const deleteLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found"
            })
        }
        //delete video
        if (lecture.publicId) {
            await deleteVideo(lecture.publicId);
        }
        //remove lecture reference from course
        await Course.updateOne({
            lectures: lectureId
        }, { $pull: { lectures: lectureId } });
        return res.status(200).json({
            message: "Lecture Deleted ",
            success: true
        })
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            message: "Failed to fetch lectures",
            status: false
        })
    }
};

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        console.log(lectureId);
        
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        return res.status(200).json({
            lecture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lecture by id"
        })
    }
};

export const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;
        const course = await Course.findById(courseId);
         if (!course) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }

        course.isPublished = publish === "true";
        await course.save();
        const courseMessage = course.isPublished ? "Published" : "Unpublish"
        return res.status(200).json({
            message: `Course is ${courseMessage} `,
            success:false
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to publish course",
            success:false
        })
    }
};
export const getPublishedCourse = async (_, res) => {
    try {
        const course = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name photoURL" });
        if (!course) {
            return res.status(500).json({
                message: "No Course is published",
                success: false
            })
        }
        return res.status(200).json({
            course
        })
    } catch (error) {
        return res.status(500).json({
            message: "No Course Found",
            success: false
        })
    }
};
export const searchQuery = async (req, res) => {
  try {
    const { query = "", categories = "", sortByPrice = "" } = req.query;

    // Convert categories into an array
    const categoryArray = categories ? categories.split(",") : [];

    // Define search criteria
    const searchQuery = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { courseSubTitle: { $regex: query, $options: "i" } },
      ],
    };

    // Apply category filter if provided
    if (categoryArray.length > 0) {
      searchQuery.category = { $in: categoryArray };
    } else {
      searchQuery.$or.push({ category: { $regex: query, $options: "i" } });
    }

    // Define sorting options
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; // Ascending order
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; // Descending order
    }

    // Fetch courses
    let courses = await Course.find(searchQuery)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

