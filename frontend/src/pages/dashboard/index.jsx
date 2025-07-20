import UserLayout from "@/layouts/UserLayout";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAboutUser, updateUserProfile } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumePreview from "./ResumePreview";

function DashboardIndex() {
  const sideBarItems = ["Resumes", "User"];
  const [activeIdx, setActiveIdx] = useState(0);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getAboutUser({
        token: localStorage.getItem("token"),
      });
      setUserData(response);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const components = [
    <ResumesPage
      userData={userData}
      refreshUser={fetchUser}
      loading={loading}
      key="resumes"
    />,
    <UserPage
      userData={userData}
      refreshUser={fetchUser}
      loading={loading}
      key="user"
    />,
  ];

  return (
    <UserLayout>
      {/* Responsive layout: flex-col on mobile, flex-row on md+ */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 py-3 md:py-5 flex md:flex-col gap-2 md:gap-3 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-900/30 rounded-md">
          {sideBarItems.map((item, idx) => (
            <div
              key={idx}
              className={`cursor-pointer px-3 py-2 md:px-5 md:py-3 rounded text-center font-medium
                ${
                  activeIdx === idx
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-neutral-900/50"
                }
              `}
              onClick={() => setActiveIdx(idx)}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1 w-full md:w-4/5 px-2 md:px-0">
          {error && <p className="text-red-500 break-words">Error: {error}</p>}
          {loading ? <p>Loading user data...</p> : components[activeIdx]}
        </div>
      </div>
    </UserLayout>
  );
}

function ResumesPage({ userData, loading, refreshUser }) {
  const templates = [
    "/Templates/r1.webp",
    "/Templates/r2.png",
    "/Templates/r4.png",
    "/Templates/r5.png",
    "/Templates/r6.webp",
  ];

  const [resumeTitle, setResumeTitle] = useState("");
  const [bio, setBio] = useState("");
  const [currentPost, setCurrentPost] = useState("");
  const [education, setEducation] = useState([
    { school: "", degree: "", fieldOfStudy: "" },
  ]);
  const [pastWork, setPastWork] = useState([
    { company: "", position: "", Year: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleProfileSubmit = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateUserProfile({
        token,
        bio,
        currentPost,
        education,
        pastWork,
      });
      if (response && response.data.message) {
        await refreshUser();
        getAboutUser({ token: localStorage.getItem("token") });
      }
    } catch (err) {
      console.error("Profile creation failed:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading resumes...</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <ScrollArea className="h-[90vh] w-full border-none rounded-md py-4 px-2 md:px-10">
      <div className="h-full w-full py-3">
        <div className="mb-4">
          <div className="font-bold text-2xl md:text-3xl pb-2">Resumes</div>
          <p className="text-base md:text-lg">
            Welcome, {userData.userId.name}! Create a new resume below.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <div className="w-[10rem] max-w-[10rem] h-[13rem] group bg-neutral-900/80 flex justify-center items-center hover:bg-neutral-900 cursor-pointer transition-all duration-300 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10 group-hover:scale-125 transition-all duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[96vw] md:max-w-[60vw] !p-0 max-h-[95vh] overflow-auto">
                <ScrollArea className="h-[90vh] w-full px-2 md:px-6 py-4">
                  <DialogHeader className="p-2">
                    <DialogTitle>Build Your Resume</DialogTitle>
                    <DialogDescription>
                      Give it a title related to the role you&rsquo;re applying
                      for.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                        placeholder="Resume Title"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={userData.userId.username}
                        readOnly
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Bio</Label>
                      <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Current Position</Label>
                      <Input
                        value={currentPost}
                        onChange={(e) => setCurrentPost(e.target.value)}
                        placeholder="Your current job role"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Education</Label>
                      {education.map((edu, idx) => (
                        <div key={idx} className="grid gap-2 rounded">
                          <Input
                            placeholder="School"
                            value={edu.school}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].school = e.target.value;
                              setEducation(updated);
                            }}
                          />
                          <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].degree = e.target.value;
                              setEducation(updated);
                            }}
                          />
                          <Input
                            placeholder="Field of Study"
                            value={edu.fieldOfStudy}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].fieldOfStudy = e.target.value;
                              setEducation(updated);
                            }}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setEducation([
                            ...education,
                            { school: "", degree: "", fieldOfStudy: "" },
                          ])
                        }
                        className="w-fit"
                      >
                        + Add Education
                      </Button>
                    </div>

                    <div className="grid gap-2">
                      <Label>Work Experience</Label>
                      {pastWork.map((job, idx) => (
                        <div key={idx} className="grid gap-2 rounded">
                          <Input
                            placeholder="Company"
                            value={job.company}
                            onChange={(e) => {
                              const updated = [...pastWork];
                              updated[idx].company = e.target.value;
                              setPastWork(updated);
                            }}
                          />
                          <Input
                            placeholder="Position"
                            value={job.position}
                            onChange={(e) => {
                              const updated = [...pastWork];
                              updated[idx].position = e.target.value;
                              setPastWork(updated);
                            }}
                          />
                          <Input
                            placeholder="Duration in years"
                            value={job.Year}
                            onChange={(e) => {
                              const updated = [...pastWork];
                              updated[idx].Year = e.target.value;
                              setPastWork(updated);
                            }}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setPastWork([
                            ...pastWork,
                            { company: "", position: "", Year: "" },
                          ])
                        }
                        className="w-fit"
                      >
                        + Add Work
                      </Button>
                    </div>
                  </div>

                  <DialogFooter className="py-3 px-2 flex mx-2 gap-2 flex-wrap">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        disabled={submitting}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="cursor-pointer"
                      onClick={handleProfileSubmit}
                      disabled={submitting}
                      variant="secondary"
                    >
                      {submitting ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </ScrollArea>
              </DialogContent>
            </form>
          </Dialog>
          <div className="flex-1 w-full max-w-xl">
            <ResumePreview profile={userData} />
          </div>
        </div>
      </div>
      <div className="py-4 md:py-5">
        <div className="mb-4">
          <div className="font-bold text-2xl md:text-3xl pb-2">Templates</div>
          <p className="text-base md:text-lg">
            {userData.userId.name}! You can choose any of the templates below,
            all are ATS friendly, so this is the one stop solution for you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-row gap-2 md:gap-4">
          {templates.map((template, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <div className="w-full max-w-[10rem]">
                  <img
                    className="w-full aspect-[10/13] object-cover rounded hover:opacity-60 hover:scale-104 transition-all duration-200 cursor-pointer"
                    src={template}
                    alt="template"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <img
                  className="w-full h-full object-contain rounded"
                  src={template}
                  alt="template detail"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function UserPage({ userData, loading, refreshUser }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email] = useState("");

  useEffect(() => {
    if (!loading && userData?.userId) {
      setName(userData.userId.name);
      setUsername(userData.userId.username);
      // email is read-only
    }
  }, [loading, userData]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await updateUserProfile({
        token,
        userId: { name, username },
      });
      if (response && response.data.message) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Profile creation failed:", err.message);
    }
  };

  if (loading) return <p>Loading user profile...</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <div className="flex flex-col gap-6 md:gap-10 h-[90vh]">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">User</h1>
        <p className="text-neutral-400 text-base md:text-lg">
          You can seamlessly change your information without any delay!
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap w-full gap-4 md:gap-10">
        <div className="flex flex-col w-full md:w-1/3">
          <Label className="text-md">Name</Label>
          <input
            className="outline-none border border-neutral-600 px-2 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3">
          <Label className="text-md">Username</Label>
          <input
            className="outline-none border border-neutral-600 px-2 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        <Label className="text-md">Email</Label>
        <input
          className="outline-none border border-neutral-600 px-2 py-2 rounded"
          value={userData.userId.email}
          readOnly
        />
      </div>

      <Button
        className="rounded w-fit cursor-pointer"
        variant="secondary"
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default DashboardIndex;
