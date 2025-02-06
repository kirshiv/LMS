import React from 'react'

const CreateLecture = () => {
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
                        placeholder="Your Course Name"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        Back
                    </Button>
                    <Button >
                        Create
                    </Button>
                </div>
            </div>
        </div>
  )
}

export default CreateLecture
