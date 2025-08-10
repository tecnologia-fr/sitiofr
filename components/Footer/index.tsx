import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primario relative overflow-hidden">
      {/* Background building overlay */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='40' height='40'/%3E%3Crect x='40' y='0' width='40' height='40'/%3E%3Crect x='80' y='0' width='40' height='40'/%3E%3Crect x='120' y='0' width='40' height='40'/%3E%3Crect x='160' y='0' width='40' height='40'/%3E%3Crect x='0' y='40' width='40' height='40'/%3E%3Crect x='40' y='40' width='40' height='40'/%3E%3Crect x='80' y='40' width='40' height='40'/%3E%3Crect x='120' y='40' width='40' height='40'/%3E%3Crect x='160' y='40' width='40' height='40'/%3E%3Crect x='0' y='80' width='40' height='40'/%3E%3Crect x='40' y='80' width='40' height='40'/%3E%3Crect x='80' y='80' width='40' height='40'/%3E%3Crect x='120' y='80' width='40' height='40'/%3E%3Crect x='160' y='80' width='40' height='40'/%3E%3Crect x='0' y='120' width='40' height='40'/%3E%3Crect x='40' y='120' width='40' height='40'/%3E%3Crect x='80' y='120' width='40' height='40'/%3E%3Crect x='120' y='120' width='40' height='40'/%3E%3Crect x='160' y='120' width='40' height='40'/%3E%3Crect x='0' y='160' width='40' height='40'/%3E%3Crect x='40' y='160' width='40' height='40'/%3E%3Crect x='80' y='160' width='40' height='40'/%3E%3Crect x='120' y='160' width='40' height='40'/%3E%3Crect x='160' y='160' width='40' height='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Office Information */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-8">Nuestras Oficinas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Santiago (Casa Matriz)
                  </h4>
                  <p className="text-sm mb-1">
                    La Concepción 141, Piso 8, Oficina 801, Providencia.
                  </p>
                  <p className="text-sm">Teléfono: 2 2484 0000</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Viña del Mar</h4>
                  <p className="text-sm mb-1">
                    7 Norte N° 645, Piso 9, Of. N° 914, Edificio Centro
                    Libertad.
                  </p>
                  <p className="text-sm">Teléfono: 32 2235 320 / 32 2353010</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Antofagasta</h4>
                  <p className="text-sm mb-1">
                    Uribe 636, Piso 8, Of, N° 802, Edificio Centro de Negocios.
                  </p>
                  <p className="text-sm">Teléfono: 55 2466 2208</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Concepción</h4>
                  <p className="text-sm mb-1">
                    Av. Arturo Prat 199, Torre B. Piso 9, Of. Nº 905.
                  </p>
                  <p className="text-sm">Teléfono: 41 3800080</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Call to Action */}
          <div className="text-white">
            <div className="text-right lg:text-left">
              <p className="text-destacado font-bold text-sm mb-4">FR GROUP</p>
              <h2 className="text-3xl font-bold mb-2">¿Tienes dudas?</h2>
              <h1 className="text-5xl font-black mb-6">contáctanos</h1>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 mt-12 pt-6">
          <p className="text-white text-center text-sm">
            © 2023 FR GROUP TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
