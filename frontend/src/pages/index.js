import UserLayout from "@/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Download, Eye, Star } from "lucide-react";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();
  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Professional Templates",
      description:
        "Choose from dozens of ATS-friendly resume templates designed by hiring experts.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Content",
      description:
        "Get intelligent suggestions for bullet points and optimize your resume content.",
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Multiple Formats",
      description:
        "Download your resume in PDF, Word, or plain text format instantly.",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview feature.",
    },
  ];

  const stats = [
    { number: "2M+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "500K+", label: "Happy Users" },
    { number: "4.9/5", label: "User Rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content:
        "This resume builder helped me land my dream job at a Fortune 500 company. The templates are modern and ATS-friendly!",
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      content:
        "The AI suggestions were incredibly helpful. I got 3x more interview calls after using this platform.",
    },
    {
      name: "Emily Rodriguez",
      role: "Data Analyst",
      content:
        "Clean, professional, and easy to use. I created my resume in under 30 minutes!",
    },
  ];

  return (
    <UserLayout>
      <div className="min-h-screen  text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-6 bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              <Star className="h-4 w-4 mr-2" />
              Trust to authenticity
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Build Your Perfect Resume
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create professional, ATS-friendly resumes that get you noticed.
              Land your dream job with our AI-powered resume builder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Start Building Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 hover:bg-black hover:text-white px-8 py-4 text-lg bg-transparent cursor-pointer"
              >
                View Templates
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Simple 3-Step Process
              </h2>
              <p className="text-xl text-gray-300">
                Get your professional resume ready in minutes, not hours.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Choose Template",
                  description:
                    "Select from our collection of professional, ATS-optimized templates.",
                },
                {
                  step: "02",
                  title: "Add Your Info",
                  description:
                    "Fill in your details with AI-powered suggestions and content optimization.",
                },
                {
                  step: "03",
                  title: "Download & Apply",
                  description:
                    "Export your resume in multiple formats and start applying to jobs.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-6xl font-bold text-gray-600 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </UserLayout>
  );
}

export default HomePage;
