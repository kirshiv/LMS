import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPublishedCourseQuery } from "@/features/api/courseAPI";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading, error } = useGetPublishedCourseQuery();
  const navigate = useNavigate();
  const courses = data?.courses || [];

  
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="p-4">
      <Button onClick={() => navigate("create")} className="mb-4">
        Create a new course
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-left">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length ? (
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium text-left">{course?.coursePrice || "NA"}</TableCell>
                <TableCell>
                  <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => navigate( `${course._id}`)}>
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No courses available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
