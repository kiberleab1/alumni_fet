import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { CiEdit, CiSaveDown1, CiSaveUp1 } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "react-query";
import { getAlumniProfileById, getImageBaseUrl } from "src/api";
import QueryResult from "src/components/utils/queryResults";

const AlumniProfile = ({ onCreateAlumniClick, onEditAlumniClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const user_id = "92faa361-3246-4f11-acae-cdb599a0d200";
  const { isError, data, isLoading } = useQuery(
    ["getAlumniProfileById"],
    () => getAlumniProfileById(user_id),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
    });
  });

  return (
    <QueryResult isError={isError} isLoading={isLoading} data={data}>
      {data != null && data?.data && data?.data?.graduation_year ? (
        <div
          className="flex flex-col items-center min-h-screen"
          data-aos="fade-down"
        >
          <div className="flex flex-row items-center justify-center gap-3 min-w-[80%]">
            <h1 className="text-3xl sm:text-5xl font-normal">Alumni Profile</h1>
            <div>
              <CiEdit
                className="text-2xl"
                onClick={() => onEditAlumniClick(data?.data)}
              />
            </div>
          </div>

          <img
            src={getImageBaseUrl(data?.data?.user_photo)}
            alt={data?.data?.user_id}
            className="w-52 h-52 rounded-full mt-4 object-cover"
          />

          <h2 className="text-4xl mt-2 font-sans">
            {data?.data?.user_data?.name}
          </h2>

          <div className="flex items-center hover:text-blue-700 mt-2">
            <a
              className="text-lg text-gray-500 flex flex-row gap-3"
              href="mailto:helengetachew@gmail.com"
            >
              <TfiEmail className="text-2xl" />
              {data?.data?.user_data?.email}
            </a>
          </div>

          <div className="flex items-center hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <a
              href="tel:+251 900 000 000"
              className="text-gray-350 underline ml-2"
            >
              {data?.data?.user_data?.phone_number}
            </a>
          </div>

          <div className="border-b w-1/2 my-2 border-gray-300"></div>

          <div className="relative w-full max-w-[1200px] overflow-hidden">
            <div className="flex flex-row transition-all duration-500 ease-in-out ">
              <div
                className={`transition-all duration-500 ease-in-out w-[300px] sm:min-w-[550px] ${
                  isOpen
                    ? "translate-x-[-0%]"
                    : "translate-x-[0%] sm:translate-x-[50%]"
                }`}
              >
                <Table className="text-left">
                  <tbody>
                    <tr>
                      <th className="w-1/4">Degree</th>
                    </tr>
                    <tr className="bg-blue-300">
                      <td className="transform transition-transform duration-300 hover:translate-x-5">
                        {data?.data?.degree}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Graduation Date</th>
                    </tr>
                    <tr className="bg-blue-300">
                      <td className="transform transition-transform duration-300 hover:translate-x-5">
                        {data?.data?.graduation_year.split("T")[0]}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Location</th>
                    </tr>
                    <tr className="bg-blue-300">
                      <td className="transform transition-transform duration-300 hover:translate-x-5">
                        {data?.data?.user_data?.address?.country ?? "Ethiopia"},{" "}
                        {data?.data?.user_data?.address?.region ??
                          "Addis Ababa"}
                        ,{" "}
                        {data?.data?.user_data?.address?.city ?? "Addis Ababa"}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Department</th>
                    </tr>
                    <tr className="bg-blue-300">
                      <td className="transform transition-transform duration-300 hover:translate-x-5">
                        {data?.data?.department_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Skills</th>
                    </tr>
                    <tr className="bg-blue-300">
                      <td className="transform transition-transform duration-300 hover:translate-x-5">
                        {data?.data?.Skills}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Language</th>
                    </tr>
                    <tr className="bg-blue-300">
                      <td className="transform transition-transform duration-300 hover:translate-x-5">
                        {data?.data?.Language}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {isOpen && (
                <div className="w-[2px] bg-gray-300 hidden xl:block h-auto mx-4"></div>
              )}

              {isOpen && (
                <div
                  className={` transition-all duration-500 ease-in-out overflow-hidden hidden xl:block sm:min-w-[550px]`}
                >
                  <Table className="text-left">
                    <tbody>
                      <tr>
                        <th className="w-1/4">Additional Info</th>
                      </tr>
                      <tr className="bg-blue-300">
                        <td className="transform transition-transform duration-300 hover:translate-x-5">
                          {data?.data?.additionalInfo}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </div>

          <button
            className="text-black bg-white text-3xl py-2 px-4 mt-4 "
            onClick={toggle}
          >
            {isOpen ? (
              <CiSaveUp1 className="text-red-800 hover:text-red-400 rotate-90" />
            ) : (
              <CiSaveDown1 className="text-blue-800 hover:text-blue-400 rotate-90" />
            )}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">
              NO ALUMNI PROFILE FOUND
            </h1>
            <p className="text-gray-600 mb-6">
              It looks like you haven't filled out your alumni profile yet.
              <br />
              Please take a moment to create your profile and connect with other
              alumni.
            </p>
            <button
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              onClick={onCreateAlumniClick}
            >
              CREATE ALUMNI
            </button>
          </div>
        </div>
      )}
    </QueryResult>
  );
};

export default AlumniProfile;
