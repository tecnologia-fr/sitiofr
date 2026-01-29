import { Button } from "@/components/ui/button";
import createLeadInSupabase from "@/utils/SupaBase/supabase";
import { redirect } from "next/navigation";
import { Resend } from "resend";

// Server Action
async function createLeadCorredora(formData: FormData) {
  "use server";
  const resend = new Resend(process.env.RESEND_KEY);
  const name = formData.get("name") as string;
  const last_name = formData.get("last_name") as string;
  const rut = formData.get("rut") as string;
  const email = formData.get("email") as string;
  const interest_area = formData.get("interest_area") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const cv = formData.get("cv") as File;

  // Convert File to Buffer for Resend
  let cvBuffer: Buffer | null = null;
  let cvFilename = "cv.pdf";

  if (cv && cv.size > 0) {
    const arrayBuffer = await cv.arrayBuffer();
    cvBuffer = Buffer.from(arrayBuffer);
    cvFilename = cv.name || "cv.pdf";
  }

  // Here you would typically send the data to your backend
  // For now, we'll just log it
  await createLeadInSupabase(
    { name, last_name, rut, email, interest_area, phone, message },
    "leads-trabajo"
  );

  const emailOptions: any = {
    from: "informaciones@frgroup.cl",
    to: "seleccion@frgroup.cl",
    bcc: " tecnologia@frgroup.cl ",
    subject: "New WORK WITH US lead",
    html: `
      <h1>New WORK WITH US lead</h1>
      <table cellpadding="6" cellspacing="0" border="0" style="font-family:sans-serif; font-size:16px; color:#232323;">
        <tr>
          <td style="font-weight:bold;">Name:</td>
          <td>${name ? name : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Last Name(s):</td>
          <td>${last_name ? last_name : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">ID Number:</td>
          <td>${rut ? rut : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Email:</td>
          <td>${email ? email : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Phone:</td>
          <td>${phone ? phone : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Area of Interest:</td>
          <td>${interest_area ? interest_area : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Message:</td>
          <td>${message ? message : ""}</td>
        </tr>
      </table>
    `,
  };

  // Only add attachment if file exists
  if (cvBuffer) {
    emailOptions.attachments = [
      {
        filename: cvFilename,
        content: cvBuffer,
      },
    ];
  }

  const { data, error } = await resend.emails.send(emailOptions);
  if (error) {
    console.log("error", error);
  }

  redirect("/corredores-de-seguros/trabaja-con-nosotros/gracias");

  // You could send to an API endpoint, database, or email service
}

export function ContactFormTrabajaConNosotros() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[800px] lg:h-[900px]"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/contacto.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-start items-center  text-center px-4 pt-20 lg:pt-44">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
            Job Opportunities
          </h1>
          <p className="text-white lg:text-2xl text-xl  mb-8 font-light">
            Enter your information and we will consider you in future selection
            processes.
          </p>
        </div>

        {/* Floating Contact Form Card */}
        <div className="absolute lg:bottom-0 -bottom-16 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-6xl px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 ">
            <div className="grid gap-12 items-start">
              {/* Right Panel - Contact Form */}
              <div>
                <form
                  className="space-y-6"
                  action={createLeadCorredora}
                  encType="multipart/form-data"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Apellidos Field */}
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Last Name(s)*
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Enter your last name"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rut"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      ID Number (without dots)*
                    </label>
                    <input
                      type="text"
                      id="rut"
                      name="rut"
                      placeholder="E.g.: 16210745-2"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-primarui font-bold mb-2"
                    >
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+569 1234 5678"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="E.g.: juan.rodriguez@falabella.com"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Motive Field */}
                  <div>
                    <label
                      htmlFor="motive"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Area of Interest*
                    </label>
                    <select
                      id="interest_area"
                      name="interest_area"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="Administration">Administration</option>
                      <option value="Finance">Finance</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Commercial General Insurance">
                        Commercial General Insurance
                      </option>
                      <option value="Commercial Life and Health Insurance">
                        Commercial Life and Health Insurance
                      </option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Management Control">
                        Management Control
                      </option>
                      <option value="Risks">Risks</option>
                      <option value="Operations">Operations</option>
                      <option value="Technology">Technology</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Write your message..."
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* CV Field */}

                  <div>
                    <label
                      htmlFor=""
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Attach CV
                    </label>
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept="application/pdf, application/msword"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500 text-xs block mt-1">
                      PDF files only. Maximum size: 1MB.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      showArrow={true}
                      size="lg"
                      className={`cursor-pointer text-lg bg-destacado text-white p-0 my-2 btn-light  lg:text-base py-6 pl-8 pr-0 rounded-full font-bold hover:text-white  w-fit`}
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section to provide space for the floating form */}
      <div className="bg-white pt-32 pb-16 h-[48rem]">
        {/* Additional content can go here */}
      </div>
    </div>
  );
}
