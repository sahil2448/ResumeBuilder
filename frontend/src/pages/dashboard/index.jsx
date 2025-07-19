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

  useEffect(() => {
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
    fetchUser();
  }, []);

  const components = [
    <ResumesPage userData={userData} loading={loading} key="resumes" />,
    <UserPage userData={userData} loading={loading} key="user" />,
  ];

  return (
    <UserLayout>
      <div className="flex gap-10">
        <div className="w-[20%] py-5 flex flex-col gap-3">
          {sideBarItems.map((item, idx) => (
            <div
              key={idx}
              className={`cursor-pointer px-5 py-3 ${
                activeIdx === idx ? "bg-neutral-900" : ""
              }`}
              onClick={() => setActiveIdx(idx)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="w-[80%]">
          {error && <p className="text-red-500">Error: {error}</p>}
          {loading ? <p>Loading user data...</p> : components[activeIdx]}
        </div>
      </div>
    </UserLayout>
  );
}

function ResumesPage({ userData, loading }) {
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
      console.log("YES");
      const response = await updateUserProfile({
        token,
        bio,
        currentPost,
        education,
        pastWork,
      });
      console.log("YES2");
      console.log(response);
      if (response && response.data.message) {
        getAboutUser({ token: localStorage.getItem("token") });
        console.log(response);
      } else {
        console.log("NO");
      }
      // if (!response.ok) {
      //   throw new Error(response.data?.message || "Failed to update profile");
      // }
    } catch (err) {
      console.error("Profile creation failed:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading resumes...</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <ScrollArea className=" h-[90vh] w-[100%] mx-auto border-none rounded-md py-4 px-10 ">
      <div className="h-full w-full py-5">
        <div className="mb-4">
          <div className="font-bold text-3xl pb-3">Resumes</div>
          <p>Welcome, {userData.userId.name}! Create a new resume below.</p>
        </div>
        <div className="flex">
          {" "}
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <div className="w-[10rem] h-[13rem] group bg-neutral-900/80 flex justify-center items-center hover:bg-neutral-900 cursor-pointer transition-all duration-300">
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
              <DialogContent className="sm:max-w-[40%]  sm:min-h-[90vh]">
                <ScrollArea className=" h-[90vh] w-[100%] mx-auto border-none rounded-md py-4 px-10 ">
                  <DialogHeader>
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
                        <div
                          key={idx}
                          className="grid gap-1 border p-2 rounded"
                        >
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
                        onClick={() =>
                          setEducation([
                            ...education,
                            { school: "", degree: "", fieldOfStudy: "" },
                          ])
                        }
                      >
                        + Add Education
                      </Button>
                    </div>

                    <div className="grid gap-2">
                      <Label>Work Experience</Label>
                      {pastWork.map((job, idx) => (
                        <div
                          key={idx}
                          className="grid gap-1 border p-2 rounded"
                        >
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
                            placeholder="Year"
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
                        onClick={() =>
                          setPastWork([
                            ...pastWork,
                            { company: "", position: "", Year: "" },
                          ])
                        }
                      >
                        + Add Work
                      </Button>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={submitting}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="cursor-pointer"
                      onClick={() => handleProfileSubmit()}
                      disabled={submitting}
                    >
                      {submitting ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </ScrollArea>
              </DialogContent>
            </form>
          </Dialog>
          <ResumePreview profile={userData} />
        </div>
      </div>
      <div className="py-5">
        <div className="mb-4">
          <div className="font-bold text-3xl pb-3">Templates</div>
          <p>
            {userData.userId.name}! You can choose any of the templates below,
            all are ATS friendly, so this is the one stop solution for you.
          </p>
        </div>

        <div className="flex flex-row  gap">
          {templates.map((template, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <div className="w-full">
                  <img
                    className="w-[10rem] h-[13rem] hover:opacity-60 hover:scale-104 transition-all duration-200 cursor-pointer"
                    src={template}
                    alt="template"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <img
                  className="w-full h-full"
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

function UserPage({ userData, loading }) {
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
    console.log("Saving:", { name, username });
  };

  if (loading) return <p>Loading user profile...</p>;
  if (!userData) return <p>No user data available.</p>;

  return (
    <div className="flex flex-col gap-10 ">
      <div>
        <h1 className="font-bold text-3xl">User</h1>
        <p className="text-neutral-400">
          You can seamlessly change your information without any delay!
        </p>
      </div>

      <div className="flex flex-wrap w-full gap-10">
        <div className="flex flex-col w-[30%]">
          <Label className="text-md">Name</Label>
          <input
            className="outline-none border-1 border-neutral-600 px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[30%]">
          <Label className="text-md">Username</Label>
          <input
            className="outline-none border-1 border-neutral-600 px-2 py-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col w-[30%]">
        <Label className="text-md">Email</Label>
        <input
          className="outline-none border-1 border-neutral-600 px-2 py-1"
          value={userData.userId.email}
          readOnly
        />
      </div>

      <Button
        className="rounded-none w-fit cursor-pointer"
        variant="secondary"
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default DashboardIndex;
