import Link from "next/link";
import Navbar from "@/app/component/navbar/navbar.module";

import Footer from "@/app/component/molecules/footer.module";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Sarah has over 15 years of experience in the events industry and founded Eventify to make event discovery easier.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Chen",
    role: "CTO",
    bio: "David leads our technology team and has built multiple successful platforms in the past.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Operations",
    bio: "Maria ensures that all events on our platform meet our quality standards and run smoothly.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "James Wilson",
    role: "Marketing Director",
    bio: "James develops our marketing strategies to connect event organizers with attendees.",
    image: "/placeholder.svg?height=300&width=300",
  },
];

const values = [
  {
    title: "Community First",
    description:
      "We believe in the power of bringing people together through meaningful events.",
  },
  {
    title: "Quality Experiences",
    description:
      "Every event on our platform is vetted to ensure it provides value to attendees.",
  },
  {
    title: "Accessibility",
    description:
      "We strive to make events accessible to everyone, regardless of background.",
  },
  {
    title: "Innovation",
    description:
      "We continuously improve our platform to better serve event organizers and attendees.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar /> {/* Tambah bg-white di sini */}
      <main className="flex-1 flex flex-col space-y-16">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6 text-black">
              About Eventify
            </h1>
            <p className="text-xl mx-auto text-black font-semibold">
              We're on a mission to connect people through memorable events and
              experiences.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="bg-[#172B4D] py-16">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                Our Story
              </h2>
              <p className="mb-4">
                Eventify was founded in 2020 with a simple idea: make it easier
                for people to discover and attend events they'll love.
              </p>
              <p className="mb-4">
                What started as a small platform for local events has grown into
                a comprehensive event marketplace serving thousands of event
                organizers and attendees across the country.
              </p>
              <p>
                Our platform helps event organizers reach their target audience
                while providing attendees with a seamless experience from
                discovery to attendance.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Eventify team"
                className="w-full h-auto max-w-md bg-white"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-black">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1 text-black">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3 text-black">
                      {member.role}
                    </p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-[#172B4D] py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-white">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-black">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Ready to discover amazing events?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-black">
              Join thousands of people who use Eventify to find and attend
              events they love.
            </p>
            <Link
              href="/events"
              className="inline-block bg-primary text-black font-semibold px-6 py-3 rounded-md text-lg hover:bg-primary/90"
            >
              Browse Events
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
