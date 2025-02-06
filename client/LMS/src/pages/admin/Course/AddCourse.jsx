import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseAPI";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const AddCourse = () => {
    const [course, setCourse] = useState("");
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const handleCategorychange = (value) => {
        setCategory(value);
    };
    const [createCourse,{data,error,isLoading,isSuccess}] = useCreateCourseMutation();
    const courseHandler = async () => {
        await createCourse({ courseTitle: course, category });
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course added successfully");
            navigate("/admin/course");
        }


    },[isSuccess,isLoading,error])


    return (
        <div className="flex-1 mx-10">
            <div className="mb-4">
                <h1 className="font-bold text-xl">
                   Add Course
                </h1>
                <p className="text-sm">
                    Enter Course name and respective category of the course that you want to add
                </p>
            </div>
            <div className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={course}
                        onChange={(e)=>setCourse(e.target.value)}
                        placeholder="Your Course Name"
                    />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={handleCategorychange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">
                                    Frontend Development
                                </SelectItem>
                                <SelectItem value="Fullstack Development">
                                    Fullstack Development
                                </SelectItem>
                                <SelectItem value="MERN Stack Development">
                                    MERN Stack Development
                                </SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        Back
                    </Button>
                    <Button onClick={courseHandler}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;