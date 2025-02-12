import { useGetCourseDetailPurchaseQuery } from "@/features/api/purchaseApi";

import { useParams, Navigate } from "react-router-dom";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailPurchaseQuery(courseId);

  if (isLoading) return <p>Loading...</p>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};
export default PurchaseCourseProtectedRoute;
