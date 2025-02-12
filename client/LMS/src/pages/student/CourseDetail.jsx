import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailPurchaseQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;

const { data,isLoading,isError} =
  useGetCourseDetailPurchaseQuery(courseId);
  const navigate = useNavigate();


  const course = data?.course ?? {};
  const purchased = data?.purchased ?? {};

  if (isLoading) return <h1>Loading.....</h1>
  if(isError) return <h1>Failed to fetch details....</h1>
  const handleContinueCourse = () => {
    navigate(`/course-progress/${courseId}`);
  }

  
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-[#1F1F1F] text-white">
        <div className="max-w-6xl mx-auto py-12 px-6 md:px-12 flex flex-col gap-4">
          <h1 className="font-bold text-3xl md:text-4xl">{course.courseTitle}</h1>
          <p className="text-lg md:text-xl text-gray-300">{course.subTitle}</p>
          <p className="flex items-center gap-2 text-gray-400">
            Created by:{" "}
            <span className="text-[#C0C4FC] underline italic">
             {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <BadgeInfo size={18} />
            <p>Last updated:{course?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-gray-400">{course?.enrolledStudents.length} students enrolled</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
        {/* Left Section: Course Description & Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h1 className="font-semibold text-2xl">Course Description</h1>
          <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html:course.description}}/>
          

          {/* Course Content */}
          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures • 2 hours total</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.lectures.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 text-gray-700"
                >
                  <span className="text-gray-500">
                    {idx < 2 ? <PlayCircle size={18} /> : <Lock size={18} />}
                  </span>
                  <p className="font-medium">
                    Lecture {idx + 1}: {lecture.lectureTitle}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Video & Pricing */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-5 flex flex-col items-center">
              {/* Video Section */}
              <div className="w-full aspect-video mb-5 rounded-lg overflow-hidden">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url= {course.lectures[0].videoUrl   }
                  controls={true}
                />
              </div>

              {/* Course Title & Price */}
              <h2 className="text-lg font-semibold text-center">
              {course.courseTitle}
              </h2>
              <Separator className="my-4" />
              <h1 className="text-2xl font-bold text-[#2D2F31]">{course.coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-5">
              {
                purchased ? (
                  <Button onClick={ handleContinueCourse} className="text-lg md:text-xl font-semibold">Continue Course</Button>
                ) : (
                    <BuyCourseButton courseId={courseId}/>
                )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
