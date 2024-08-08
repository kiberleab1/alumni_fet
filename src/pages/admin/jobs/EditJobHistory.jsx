import React, { useState } from "react";
import {
  createAddress,
  createDepartment,
  createInstitute,
  updateJobHistory,
  getInstitutes,
} from "src/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";

export default function EditJobHistory({ jobHistory }) {
  console.log(jobHistory);
  const [departmentError, setDepartmentError] = useState("");
  const [jobHistoryFields, setJobHistoryFields] = useState({
    title: jobHistory.title ? jobHistory.title : "",
    description: jobHistory.description ? jobHistory.description : "",
    status: jobHistory.status ? jobHistory.status : "",
    duration: jobHistory.duration ? jobHistory.duration : "",
    address: jobHistory.address ? jobHistory.address : "",
  });

  const clearJobHistoryFields = () => {
    setJobHistoryFields({
      title: jobHistory.title ? jobHistory.title : "",
      description: jobHistory.description ? jobHistory.description : "",
      status: jobHistory.status ? jobHistory.status : "",
      duration: jobHistory.duration ? jobHistory.duration : "",
      address: jobHistory.address ? jobHistory.address : "",
    });
  };

  const handleJobHistoryClear = () => {
    clearJobHistoryFields();
  };

  const handleUpdateJobHistoryClick = async (e) => {
    e.preventDefault();
    if (
      !jobHistoryFields.title ||
      !jobHistoryFields.description ||
      !jobHistoryFields.status
    ) {
      setDepartmentError("Please fill in all required fields!");
      return;
    }

    const uodateJobHistoryFields = {
      id: jobHistory.id,
      title: jobHistoryFields.title,
      address: jobHistoryFields.address,
      duration: jobHistoryFields.duration,
      status: jobHistoryFields.status,
      description: jobHistoryFields.description,
    };
    console.log(uodateJobHistoryFields);
    try {
      const result = await updateJobHistory(uodateJobHistoryFields);
      toast.success("Job History Updated successfully!");
      setDepartmentError();
      console.log("Update jobHistory result:", result.data);
    } catch (error) {
      toast.success("Error Updating jobHistory!");
      console.error("Error Updating jobHistory!", error);
      setDepartmentError(error);
    }
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Job History Information
            </h2>
          </div>
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="job-title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    title="job-title"
                    id="job-title"
                    required
                    value={jobHistoryFields.title}
                    onChange={(e) =>
                      setJobHistoryFields({
                        ...jobHistoryFields,
                        title: e.target.value,
                      })
                    }
                    autoComplete="job_title"
                    placeholder="Job Title"
                    className="block w-full bg-white border-gray-500 rounded-md border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium font-mono"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="job-duration"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Duration
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    title="job_duration"
                    id="job_duration"
                    autoComplete="job_duration"
                    value={jobHistoryFields.duration}
                    onChange={(e) =>
                      setJobHistoryFields({
                        ...jobHistoryFields,
                        duration: e.target.value,
                      })
                    }
                    className="col-span-2 sm:col-span-1 block w-full bg-white border-gray-500 rounded-md border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium font-mono"
                    placeholder="Job Duration"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="job-status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    title="job_history_status"
                    id="job_history_status"
                    autoComplete="text"
                    value={jobHistoryFields.status}
                    onChange={(e) =>
                      setJobHistoryFields({
                        ...jobHistoryFields,
                        status: e.target.value,
                      })
                    }
                    className="col-span-2 sm:col-span-1 block w-full bg-white border-gray-500 rounded-md border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium font-mono"
                    placeholder="Status"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="job_address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    title="job_address"
                    id="job_address"
                    value={jobHistoryFields.address}
                    onChange={(e) =>
                      setJobHistoryFields({
                        ...jobHistoryFields,
                        address: e.target.value,
                      })
                    }
                    className="col-span-2 sm:col-span-1 block w-full bg-white border-gray-500 rounded-md border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium font-mono"
                    placeholder="Job Address"
                  />
                </div>
              </div>
              {/* <div className="sm:col-span-2">
                                <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                    Job History Institute
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={jobHistoryFields.status}
                                        onChange={(e) => setJobHistoryFields({ ...jobHistoryFields, status: e.target.value })}
                                        className="mt-1 block w-full bg-white border-gray-500 rounded-md border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5 font-medium font-mono"
                                    >
                                        {institutions.map((institute) => (
                                            <option key={institute.id} value={institute.id}>
                                                {institute.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="jobHistory-description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="jobHistory-description"
                    title="jobHistory-description"
                    rows="3"
                    required
                    value={jobHistoryFields.description}
                    onChange={(e) =>
                      setJobHistoryFields({
                        ...jobHistoryFields,
                        description: e.target.value,
                      })
                    }
                    className="block w-full bg-white border-gray-500 rounded-md border-1 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium font-mono"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            {departmentError && (
              <p className="text-red-600 font-mono">{departmentError}</p>
            )}
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-100"
              onClick={handleJobHistoryClear}
            >
              Clear
            </button>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleUpdateJobHistoryClick}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
