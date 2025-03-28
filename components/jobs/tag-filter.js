// components/jobs/tag-filter.js
"use client";

import { useState, useEffect } from "react";
import TagList from "@/components/jobs/tag-list";
import JobList from "@/components/jobs/job-list"; // Import the JobList component

const TagFilter = ({ jobs }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Function to toggle selected tags
  const handleToggleTag = (tag) => {
    setSelectedTags(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((item) => item !== tag) // Remove tag
          : [...prevTags, tag] // Add tag
    );
  };

  // Filter jobs based on selected tags
  useEffect(() => {
    // console.log("Selected Tags:", selectedTags);
    // console.log(
    //   "Jobs before filtering:",
    //   jobs.map((job) => ({ title: job.jobTitle, tags: job.selectedTags }))
    // );

    const filteredJobs = jobs.filter(
      (job) =>
        selectedTags.length === 0
          ? true // If no tags are selected, show all jobs
          : selectedTags.every((tag) => (job.selectedTags || []).includes(tag)) // Default to an empty array
    );
    setFilteredJobs(filteredJobs); // Update filtered jobs state
  }, [selectedTags, jobs]);

  return (
    <div>
      {/* Render the TagList component and pass necessary props */}
      <TagList selectedTags={selectedTags} onToggleTag={handleToggleTag} />

      {/* Render filtered job list */}
      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default TagFilter;
