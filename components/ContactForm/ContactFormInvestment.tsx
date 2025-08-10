import { Button } from "@/components/ui/button";
import createLeadInSupabase from "@/utils/SupaBase/supabase";

// Server Action
async function createLeadInvestment(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const product = formData.get("product") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  // Here you would typically send the data to your backend
  // For now, we'll just log it
  console.log("Form submitted:", { name, email, product, phone, message });
  createLeadInSupabase(
    { name, email, product, phone, message },
    "leads-investment"
  );
  // You could send to an API endpoint, database, or email service
}

export function ContactFormInvestment() {
  return (
    <div className="min-h-screen bg-secundario pt-20">
      {/* Header Section */}
      <div className="text-center mb-12 px-4">
        <p className="text-destacado  text-sm font-medium mb-2">
          ESTAMOS AQUÍ PARA AYUDARTE
        </p>
        <h1 className="text-white text-2xl font-normal mb-2">
          ¿Necesitas más información?
        </h1>
        <h2 className="text-white text-4xl font-bold">
          No dudes en escribirnos
        </h2>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6 " action={createLeadInvestment}>
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-800 font-bold mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jane Smith"
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
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="janesmith@gmail.com"
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Product Field */}
            <div>
              <label
                htmlFor="product"
                className="block text-gray-800 font-bold mb-2"
              >
                Producto
              </label>
              <input
                type="product"
                id="product"
                name="product"
                placeholder="janesmith@gmail.com"
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-800 font-bold mb-2"
              >
                Teléfono
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

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-800 font-bold mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Escribe tu mensaje..."
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 mx-auto"
              >
                Enviar Mensaje
                <div className="w-6 h-6 bg-white rounded-full border border-blue-500 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17l9.2-9.2M17 17V7H7"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Contact Information */}
      <div className="max-w-2xl mx-auto px-4 mt-4 pb-12 ">
        <div className="flex flex-col lg:flex-row justify-between items-center text-white">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">Email:</span>
            <span>contacto@frgroup.cl</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-medium">Telefono:</span>
            <span>+569 123 44 56</span>
          </div>
        </div>
      </div>
    </div>
  );
}
