import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useDeleteLectureMutation, useEditLectureMutation, useGetLectureByIdQuery } from "@/features/api/courseAPI";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const LectureTab = () => {
     const navigate = useNavigate();
    const MEDIA_API = "http://localhost:8080/api/v1/media"
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);
    const params = useParams();
    const { courseId, lectureId } = params;
    const { data: lectureData,refetch } = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture;
   useEffect(() => {
       if (lecture) {
           refetch();
       setLectureTitle(lecture.lectureTitle);
       setIsFree(lecture.isPreviewFree);
       setUploadVideoInfo(lecture.videoInfo);
     }
   }, [lecture]);
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/uploadMedia`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });


        // Ensure data contains expected fields
        if (
          res.data &&
          res.data.data &&
          res.data.data.url &&
          res.data.data.public_id
        ) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });

          setBtnDisable(false);
          toast.success(res.data.message);
        } else {
          toast.error(
            "Unexpected error during upload. Please check API response."
          );
        }
      } catch (error) {
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };
    const [deleteLecture,{isSuccess:deleteSuccess,isLoading:deleteLoading}] = useDeleteLectureMutation();
    const [editLecture, {  isLoading, isSuccess, error }] = useEditLectureMutation();
    const updateCourseHandler = async () => {

        console.log({ lectureTitle,
            uploadVideoInfo,
            isFree,
            courseId,
            lectureId,})
        await editLecture({
            lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree: isFree,
            courseId,
            lectureId,
        })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Lecture Updated Successfully")
        }
        if (error) {
            toast.error("Failed to upload");
        }
    }, [isSuccess, error]);
    const handleDeletelecture = async () => {
        await deleteLecture(lectureId);
        navigate(-1);
    };
    useEffect(() => {
        if (deleteSuccess) {
            toast.success("Lecture Deleted Successfully")
        }
        
    },[deleteSuccess])
        return (
            <Card>
                <CardHeader>
                    <div>
                        <CardTitle className="flex">Edit Lecture</CardTitle>
                        <CardDescription className="flex">
                            Make Changes to your Lecture
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="destructive" className="flex items-right" onClick={handleDeletelecture}>
                            Remove Lecture
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label className="flex">Title</Label>
                        <Input
                            type="text"
                            placeholder="Ex.Introduction"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <Label className="flex my-2">
                            Video<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="file"
                            className="w-fit"
                            accept="video/*"
                            onChange={fileChangeHandler}
                        />
                    </div>
                    <div className="flex items-center space-x-2 my-5">
                        <Switch checked={ isFree} onCheckedChange={setIsFree} id="freeCourse" />
                        <Label htmlFor="freeCourse">Free</Label>
                    </div>
                    {mediaProgress && (
                        <div className="my-5">
                            <Progress value={uploadProgress} />
                            <p>{uploadProgress}% uploaded</p>
                        </div>
                    )}
                    <div className="flex">
                        <Button onClick={updateCourseHandler}>Update Course</Button>
                    </div>
                </CardContent>
            </Card>
        );
};

export default LectureTab;
