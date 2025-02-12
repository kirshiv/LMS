import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

const EditLecture = () => {
    const param = useParams();
    const courseId = param.courseId;
    return (
      <div>
            <div className="flex items-center justify-between mb-5 p-7">
          <div className="flex items-center gap-2">
              <Link to={`/admin/course/${courseId}/lecture`}>
                  <Button size="icon" variant="outlined" className="rounded-full">
                      <ArrowLeft size={16}/>
                  </Button>
              </Link>
              <h1 className="font-bold text-xl">
                  Update Your Lecture
              </h1>
          </div>
            </div>
            <div>
                <LectureTab/>
                </div>
      
      
    </div>
  )
}

export default EditLecture
