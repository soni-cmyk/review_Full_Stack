import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [fakeReviewCount, setFakeReviewCount] = useState(0);

  const fetchFakeReviewCount = async () => {
    try {
      const res = await axios.get("/admin/fake-reviews");
      setFakeReviewCount(res?.data?.length || 0);
    } catch (err) {
      console.error(err);
      setFakeReviewCount(0);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
      setFakeReviewCount(0);
      return // reset for users
    }
    //  Only admin should call this API
    if (role === "admin") {
      fetchFakeReviewCount();
    } else {
      setFakeReviewCount(0); // reset for users
    }
  }, []);

  return (
    <ReviewContext.Provider
      value={{ fakeReviewCount, setFakeReviewCount, fetchFakeReviewCount }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
export default ReviewContext;